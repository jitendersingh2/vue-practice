<template>
  <div>
    <div class="p-4">
      <h2 class="h4 mb-0 font-weight-semibold text-primary text-uppercase">Sponsors</h2>
    </div>

    <div class="accordion" id="sponsors">
      <event-tier-component
        v-for="(tier, index) in tiers"
        :index="index"
        :key="index"
        :tier="tier"
        @add-sponsor="addSponsor"
        @delete-sponsor="deleteSponsor"
        @update-sponsor="updateSponsor"
        @update-tier-name="name => updateTierName(name, index)"
      ></event-tier-component>
    </div>

    <div class="row">
      <div class="col-md">
        <div class="px-5 py-3">
          <a
            href="#"
            class="btn btn-light btn-back btn-lg border font-weight-semibold rounded-pill shadow-sm text-uppercase"
            @click="$router.push({ name: 'edit-order-confirmation' })"
          >Back</a>
        </div>
      </div>

      <div class="col-md text-right">
        <div class="px-5 py-3">
          <button
            type="submit"
            class="btn btn-sky-blue btn-save btn-lg border font-weight-semibold rounded-pill shadow-sm text-uppercase w-100"
            @click="$router.push({ name: 'edit-event-settings' })"
          >Save &amp; Continue</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ISponsor from '@/components/Events/Sponsors/ISponsor';
import ITier from '@/components/Events/Sponsors/ITier';
import EventModel from '@/api/model/EventModel';
import IEventData from '@/api/model/IEventData';
import BaseEventVue from '@/components/Events/BaseEventVue';

import EventTierComponent from '@/components/Events/Sponsors/EventTierComponent.vue';

@Component({
  components: {
    EventTierComponent,
  },
})
export default class EditEventSponsors extends BaseEventVue {
  // @Task: Update -> lastConfigurationStep: this.PAGE,
  private readonly PAGE: number = 8;
  private eventId: string = '';

  private tiers: ITier[] = [
    {
      name: 'Tier - 1',
      sponsors: [],
    },

    {
      name: 'Tier - 2',
      sponsors: [],
    },

    {
      name: 'Tier - 3',
      sponsors: [],
    },
  ];

  private created() {
    this.onPageCreated(this.PAGE);
    this.eventId = this.$route.params.eventId;

    this.api.getEvent(this.$route.params.eventId)
      .then((res) => {
        const eventUpdate = this.handleSuccess(res, 'data.event', this.ERROR_UPDATE_PATH);
        this.event = Object.assign(new IEventData(), EventModel.getSponsor(eventUpdate));
          // this.$msgbox(JSON.stringify(this.event), 'event');
        }).catch(this.handleFailure);
    }

  private addSponsor(index: number) {
    // this.$msgbox('Hi');
    const sponsor: ISponsor = {
      id: 'A',
      imageUrl: 'B',
      name: 'C',
      webUrl: 'D',
    };

    this.tiers[index].sponsors.push(sponsor);
  }

  private deleteSponsor(data: any) {
    const {sponsorIndex, tierIndex} = data;
    const sponsorId = this.tiers[tierIndex].sponsors[sponsorIndex].id;

    this.api.deleteSponsor(this.event.id, sponsorId)
    .then(this.handleMessage).catch(this.handleFailure);
  }

  private updateSponsor(data: any) {
    const {sponsor, sponsorIndex, tierIndex} = data;

    this.$set(this.tiers[tierIndex].sponsors, sponsorIndex, sponsor);
  }

  private updateTierName(name: string, index: number) {
    this.$set(this.tiers[index], 'name', name);
  }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 768px) {
  .btn-back {
    width: 100%;
  }
}
</style>
