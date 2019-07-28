<template>
  <div class="card rounded-0">
    <div class="card-header bg-white border-bottom" :id="'heading-' + index">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <div class="mb-1 d-flex align-items-center">
            <h5 class="font-weight-bold mb-0 mr-3">Tier - {{ index + 1 }}</h5>

            <input
              type="text"
              class="form-control rounded-pill"
              placeholder="Tier name"
              style="max-width: 180px;"
              :value="tier.name"
              @change="event => updateTierName(event.target.value)"
            >
          </div>

          <div>
            <span class="text-muted">{{ tier.sponsors.length }} Sponsors</span>
          </div>
        </div>

        <div>
          <button
            class="btn btn-link text-dark"
            type="button"
            style="font-size: 28px;"
            @click="isTierOpen = !isTierOpen"
            v-b-toggle="'collapse-' + index"
          >
            <i class="fa" :class="{'fa-chevron-up': isTierOpen, 'fa-chevron-down': !isTierOpen}"></i>
          </button>
        </div>
      </div>
    </div>

    <b-collapse :id="'collapse-' + index">
      <div class="card-body d-flex flex-wrap">
        <sponsor-component
          class="sponsor mb-3 mx-2"
          v-for="(sponsor, index) in tier.sponsors"
          :index="index"
          :key="index"
          :sponsor="sponsor"
          @delete-sponsor="index => deleteSponsor(index)"
          @update-sponsor="sponsor => updateSponsor(sponsor, index)"
        ></sponsor-component>

        <div class="sponsor sponsor-add mx-2">
          <div class="image-placeholder bg-light border rounded mb-3" @click="addSponsor">
            <p class="font-weight-bold text-muted">Upload Image</p>
            <img src="@/assets/icons/add-image.svg">
          </div>

          <p class="tip text-muted mb-0">Recommended formats: (.JPG) &amp; (.PNG)</p>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ISponsor from './ISponsor';
import ITier from './ITier';

import SponsorComponent from './Fields/SponsorComponent.vue';

@Component({
  components: {
    SponsorComponent,
  },
})
export default class EventTierComponent extends Vue {
  @Prop(Object) public readonly tier!: ITier;
  @Prop(Number) public readonly index!: number;

  private isTierOpen: boolean = false;

  private addSponsor() {
    this.$emit('add-sponsor', this.index);
  }

  private deleteSponsor(sponsorIndex: number) {
    this.$emit('delete-sponsor', { sponsorIndex, tierIndex: this.index });
  }

  private updateSponsor(sponsor: ISponsor, index: number) {
    this.$emit('update-sponsor', {
      sponsor,
      sponsorIndex: index,
      tierIndex: this.index,
    });
  }

  private updateTierName(name: string) {
    this.$emit('update-tier-name', name);
  }
}
</script>

<style lang="scss" scoped>
.sponsor {
  width: 220px;

  &.sponsor-add {
    .image-placeholder {
      padding: 32px 50px;
      text-align: center;

      img {
        height: 38px;
        width: 38px;
      }
    }

    .tip {
      font-size: 12px;
      text-align: center;
    }
  }
}
</style>
