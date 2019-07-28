<template>
  <div>
    <input ref="image" type="file" :accept="acceptImageType" @change="onFileChange" hidden />

    <div class="text-center">
      <div class="bg-light rounded-standard">
        <div v-show="image.length > 0">
          <vue-croppie
            class="event-cover-thumbnail"
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
          <p
            class="mb-1"
            style="font-size: 12px;"
          >Supported formats: (.jpg, &amp; .png). Recommended resolution: (700px x 300px). Maximum file size: {{ maxFileSize }}MB.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class EventCoverComponent extends Vue {
  public $refs!: {
    croppie: any;
    image: HTMLElement;
  };

  private image = '';
  private maxFileSize: number = 4; // MB

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

    if (file.size > this.maxFileSize * 1024 * 1024) {
      alert('The selected file is too large.');
      return;
    }

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
.event-cover-thumbnail.croppie-container .cr-boundary {
  min-height: 250px;
}
</style>
