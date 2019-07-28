<template>
  <div>
    <input ref="image" type="file" :accept="acceptImageType" @change="onFileChange" hidden />

    <div class="mb-2">
      <label-component for="event-owner-logo" text="Your Logo"></label-component>

      <b-tooltip
        placement="right"
        target="btn-tooltip-event-owner-logo"
        title="Select your logo here"
      ></b-tooltip>

      <a
        href="#"
        id="btn-tooltip-event-owner-logo"
        class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 text-white"
      >?</a>
    </div>

    <div class="text-center">
      <div class="bg-light rounded-standard shadow">
        <div v-show="image.length > 0">
          <vue-croppie
            class="event-owner-logo-thumbnail"
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

        <div class="select-event-owner-logo p-5" @click="selectImage" v-show="image.length === 0">
          <img src="@/assets/icons/add-image.svg" height="35px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import LabelComponent from '@/components/FormElements/LabelComponent.vue';

@Component({
  components: {
    LabelComponent,
  },
})
export default class EventOwnerLogoComponent extends Vue {
  public $refs!: {
    croppie: any;
    image: HTMLElement;
  };

  private image = '';

  get acceptImageType() {
    return 'image/*';
  }

  private onFileChange(e: any) {
    const files = e.target.files || e.dataTransfer.files;

    if (!files.length) {
      return;
    }

    const file = files[0];
    const fileType = file.type.split('/')[0];

    this.image = URL.createObjectURL(file);

    this.$refs.croppie.bind({
      url: this.image,
    });

    this.result(file);
  }

  private crop() {
    this.$refs.croppie.result({ format: 'jpeg' }, (output) => {
      this.image = output;

      this.$refs.croppie.bind({
        url: this.image,
      });

      this.result(this.image);
    });
  }

  private result(output) {
    this.$emit('imageSelected', output);
  }

  private rotate(angle) {
    this.$refs.croppie.rotate(angle);
  }

  private update(val) {
    // Update the image ...
  }

  private selectImage() {
    this.$refs.image.click();
  }
}
</script>

<style lang="scss" scoped>
.select-event-owner-logo {
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 175px;
}
</style>

<style lang="scss">
.event-owner-logo-thumbnail.croppie-container .cr-boundary {
  min-height: 250px;
}
</style>
