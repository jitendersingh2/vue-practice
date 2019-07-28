<template>
  <div>
    <input ref="image" type="file" :accept="acceptImageType" @change="onFileChange" hidden>

    <label-component for="email-logo" text="Email Logo"></label-component>

    <div class="row">
      <div class="col-md-6 text-center">
        <div class="bg-light mb-4 rounded-standard">
          <div v-show="image.length > 0">
            <vue-croppie
              class="event-email-logo-thumbnail"
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

          <div class="p-5" @click="selectImage" v-show="image.length === 0">
            <img src="@/assets/icons/add-image.svg" height="35px" />
          </div>
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
export default class EventEmailLogoComponent extends Vue {
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

<style lang="scss">
.event-email-logo-thumbnail.croppie-container .cr-boundary {
  min-height: 250px;
}
</style>
