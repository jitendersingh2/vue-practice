<template>
  <div>
    <input ref="sponsorImage" type="file" @change="onFileChange" hidden>

    <div v-show="croppieImage.length > 0">
      <vue-croppie
        class="event-sponsor-thumbnail"
        ref="croppie"
        :enableOrientation="true"
        :viewport="{ width: 100, height: 100, type: 'square' }"
        @result="result"
        @update="update"
      />

      <div class="btn-group">
        <span class="btn btn-sm btn-dark mb-3" @click="crop()">Crop</span>
        <span class="btn btn-sm btn-dark mb-3" @click="rotate(-90)">Rotate Left</span>
        <span class="btn btn-sm btn-dark mb-3" @click="rotate(90)">Rotate Right</span>
      </div>
    </div>

    <div v-show="croppieImage.length < 1">
      <div class="sponsor-image mb-3" v-if="sponsor.image.length > 0">
        <img class="rounded" :src="sponsor.image" :alt="sponsor.name" >

        <div class="delete-sponsor align-items-center justify-content-center">
          <button class="btn btn-transparent text-primary" role="button" @click="deleteSponsor">
            <i class="far fa-trash-alt"></i>
          </button>
        </div>
      </div>

      <div class="sponsor-image px-3 py-5 bg-light rounded mb-3 text-center" @click="selectSponsorImage" v-else>
        <img class="select-image" src="@/assets/icons/add-image.svg">
      </div>

      <div>
        <input type="text" class="form-control form-control-sm rounded-pill mb-2" placeholder="Enter name here" :value="sponsor.name" @change="event => updateSponsorName(event.target.value)">
        <input type="url" class="form-control form-control-sm rounded-pill" placeholder="Enter URL here" :value="sponsor.link" @change="event => updateSponsorLink(event.target.value)">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ISponsor from './../ISponsor';
import _ from 'lodash';

@Component
export default class SponsorComponent extends Vue {
  public $refs!: {
    croppie: any;
    sponsorImage: HTMLElement;
  };

  @Prop(Object) public readonly sponsor!: ISponsor;

  private croppieImage: string = '';

  private onFileChange(e: any) {
    const files = e.target.files || e.dataTransfer.files;

    if (!files.length) {
      return;
    }

    const file = files[0];
    const fileType = file.type.split('/')[0];

    this.croppieImage = URL.createObjectURL(file);

    this.$refs.croppie.bind({
      url: this.croppieImage,
    });
  }

  private selectSponsorImage() {
    this.$refs.sponsorImage.click();
  }

  private deleteSponsor() {
    this.$emit('delete-sponsor');
  }

  private crop() {
    this.$refs.croppie.result({ format: 'jpeg' }, (output) => {
      this.croppieImage = output;

      this.$refs.croppie.bind({
        url: this.croppieImage,
      });

      this.result(this.croppieImage);
      this.croppieImage = '';
    });
  }

  private result(output) {
    const sponsor = _.cloneDeep(this.sponsor);

    sponsor.image = output;

    this.$emit('update-sponsor', sponsor);
  }

  private rotate(angle) {
    this.$refs.croppie.rotate(angle);
  }

  private update(val) {
    // Update the image ...
  }

  private updateSponsorName(name: string) {
    const sponsor = _.cloneDeep(this.sponsor);
    sponsor.name = name;

    this.$emit('update-sponsor', sponsor);
  }

  private updateSponsorLink(link: string) {
    const sponsor = _.cloneDeep(this.sponsor);
    sponsor.link = link;

    this.$emit('update-sponsor', sponsor);
  }
}
</script>

<style lang="scss">
.event-sponsor-thumbnail.croppie-container .cr-boundary {
  min-height: 140px;
}
</style>

<style lang="scss" scoped>
img {
  height: 180px;
  object-fit: cover;
  object-position: center;
  width: 100%;
}

.fa-image {
  font-size: 48px;
}

.sponsor-image {
  position: relative;
  overflow: hidden;

  .select-image {
    height: 38px;
    width: 38px;
  }

  .delete-sponsor {
    background-color: rgba(0, 0, 0, 0.75);
    display: none;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
  }

  &:hover .delete-sponsor {
    display: flex;
  }
}
</style>
