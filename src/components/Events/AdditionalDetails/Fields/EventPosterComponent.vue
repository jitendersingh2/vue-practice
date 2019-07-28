<template>
  <div>
    <input ref="poster" type="file" :accept="acceptPosterType" @change="onFileChange" hidden>

    <div>
      <label-component for="event-poster" text="Event Poster"></label-component>

      <a class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 text-white" @mouseover="showTip = true" @mouseleave="showTip = false">?</a>
    </div>

    <div class="text-center">
      <div class="bg-light mb-4 rounded-standard">
        <div v-if="posterType === 'IMAGE'">
          <div v-show="posterURL.length > 0">
            <vue-croppie
              class="poster-thumbnail"
              ref="croppie" 
              :enableOrientation="true"
              :viewport="{ width: 200, height: 200, type: 'square' }"
              @result="result"
              @update="update"
            />

            <div class="btn-group">
              <span class="btn btn-sm btn-dark mb-3" @click="crop()">Crop</span>
              <span class="btn btn-sm btn-dark mb-3" @click="rotate(-90)">Rotate Left</span>
              <span class="btn btn-sm btn-dark mb-3" @click="rotate(90)">Rotate Right</span>
            </div>
          </div>

          <div class="cursor-pointer p-5" @click="selectPoster" v-show="posterURL.length === 0">
            <img src="@/assets/icons/add-image.svg" height="35px">

            <p class="lead my-2 text-muted" style="font-size: 14px;">Drag &amp; Drop or Click here to upload poster.</p>

            <div class="tooltip-text text-center" v-if="showTip">
              <p class="mb-1" style="font-size: 12px;">Supported formats: (.jpg,  &amp; .png). Recommended resolution: (700px x 300px). Maximum file size: {{ maxFileSize }}MB.</p>
            </div>
          </div>
        </div>

        <div class="p-3" v-else-if="posterType === 'VIDEO_EMBED'">
          <input type="url" class="form-control rounded-pill" placeholder="Enter Vimeo or YouTube URL" v-model="posterURL">
        </div>

        <div class="p-5" v-else>
          <img src="@/assets/icons/add-image.svg" height="35px">

          <p class="lead my-2 text-muted" style="font-size: 14px;">No poster can be selected.</p>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col">
          <div class="custom-control custom-radio">
            <input
              id="poster-image"
              class="custom-control-input"
              name="poster-type"
              type="radio"
              value="IMAGE"
              v-model="posterType"
            >

            <label-component
              class="custom-control-label"
              for="poster-image"
              text="Image"
              :isBold="false"
            ></label-component>
          </div>
        </div>

        <div class="col">
          <div class="custom-control custom-radio">
            <input
              id="poster-video"
              class="custom-control-input"
              name="poster-type"
              type="radio"
              value="VIDEO_EMBED"
              v-model="posterType"
            >

            <label-component
              class="custom-control-label"
              for="poster-video"
              text="Video"
              :isBold="false"
            ></label-component>
          </div>
        </div>

        <div class="col">
          <div class="custom-control custom-radio">
            <input
              id="poster-none"
              class="custom-control-input"
              name="poster-type"
              type="radio"
              value="HIDDEN"
              v-model="posterType"
            >

            <label-component
              class="custom-control-label"
              for="poster-none"
              text="None"
              :isBold="false"
            ></label-component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import IEventPoster from '@/components/Events/AdditionalDetails/IEventPoster';

type PosterType = 'IMAGE' | 'VIDEO_EMBED' | 'HIDDEN';

@Component({
  components: {
    LabelComponent,
  },
})
export default class EventPosterComponent extends Vue {
  @Prop(Object) public readonly value!: IEventPoster;

  public $refs!: {
    croppie: any;
    poster: HTMLElement;
  };

  private acceptedImageTypes = [
    '.png',
    '.jpg',
  ];
  private maxFileSize: number = 4; // MB

  private showTip: boolean = false;

  get posterType() {
    return this.value.type;
  }

  set posterType(type) {
    const poster: IEventPoster = {
      data: '',
      type,
    };

    this.$emit('input', poster);
  }

  get posterURL() {
    return this.value.data;
  }

  set posterURL(url) {
    const poster: IEventPoster = {
      data: url,
      type: this.posterType,
    };

    this.$emit('input', poster);
  }

  get acceptPosterType() {
    if (this.posterType === 'IMAGE') {
      return this.acceptedImageTypes.join(',');
    }

    return this.value.type + '/*';
  }

  private onFileChange(e: any) {
    const files = e.target.files || e.dataTransfer.files;

    if (!files.length) {
      return;
    }

    const file = files[0];
    const fileType = file.type.split('/')[0];

    if (file.size > (this.maxFileSize * 1024 * 1024)) {
      alert('The selected file is too large.');
      return;
    }

    const poster = URL.createObjectURL(file);

    this.$refs.croppie.bind({
      url: poster,
    });

    this.result(poster);
  }

  private crop() {
    this.$refs.croppie.result({ format: 'jpeg' }, (output) => {
      const poster = output;

      this.$refs.croppie.bind({
        url: poster,
      });

      this.result(poster);
    });
  }

  private result(url) {
    const poster: IEventPoster = {
      data: url,
      type: this.posterType,
    };

    this.$emit('input', poster);
  }

  private rotate(angle) {
    this.$refs.croppie.rotate(angle);
  }

  private update(val) {
    // Update the image ...
    // this.$msgbox('Val:' + val + 'Poster:' + this.poster);
  }

  private selectPoster() {
    if (this.posterType === 'HIDDEN') {
      return;
    }

    this.$refs.poster.click();
  }

  get eventPoster() {
    return this.value;
  }

  set eventPoster(value) {
    this.$emit('input', value);
  }
}
</script>

<style lang="scss" scoped>
.poster-thumbnail {
  width: 100%;
}

.tooltip-text p {
  font-size: 12px;
}
</style>

<style lang="scss">
.poster-thumbnail.croppie-container .cr-boundary {
  min-height: 250px;
}
</style>
