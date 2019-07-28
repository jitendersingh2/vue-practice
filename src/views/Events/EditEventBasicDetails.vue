<template>
  <form @submit.prevent="updateEvent">
    <div class="border-bottom row no-gutters">
      <div class="col-md border-right">
        <div class="border-bottom px-4 py-3 px-md-5 py-md-4">
          <h4 class="font-weight-semibold label-standard-primary mb-4 text-uppercase">Name &amp; URL</h4>

          <event-name-component class="mb-4" v-model="event.name"></event-name-component>
          <event-url-component class="mb-4" v-model="event.slug"></event-url-component>
          <event-campaign-component class="mb-4" v-model="event.campaignId"></event-campaign-component>
        </div>

        <div class="px-4 py-3 px-md-5 py-md-4">
          <h4 class="datetime-label font-weight-semibold label-standard-primary mb-4 text-uppercase">Date &amp; Time</h4>

          <event-duration-component class="mb-3" v-model="event.duration"></event-duration-component>
        </div>
      </div>

      <div class="col-md">
        <div class="border-bottom px-4 py-3 px-md-5 py-md-4">
          <h4 class="font-weight-semibold label-standard-primary mb-4 text-uppercase">Location</h4>

          <event-location-component class="mb-3" v-model="event.location"></event-location-component>
        </div>

        <div class="px-4 py-3 px-md-5 py-md-4">
          <h4 class="font-weight-semibold label-standard-primary mb-4 text-uppercase">Peer 2 Peer</h4>

          <event-peer-to-peer-component class="mb-3" v-model="event.p2pProgramId"></event-peer-to-peer-component>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md">
        <div class="px-5 py-3">
          <a
            href="#"
            class="btn btn-light btn-cancel font-weight-semibold btn-lg border rounded-pill shadow-sm text-uppercase"
            @click="$router.push({ name: 'events' })"
          >Cancel</a>
        </div>
      </div>

      <div class="col-md text-right">
        <div class="px-5 py-3">
          <button
            type="submit"
            class="btn btn-light btn-save font-weight-semibold btn-lg border rounded-pill shadow-sm text-uppercase w-100"
          >Save And Continue</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';
import IEventDuration from '@/components/Events/BasicDetails/IEventDuration';
import IEventLocation from '@/components/Events/BasicDetails/IEventLocation';
import BaseEventVue from '@/components/Events/BaseEventVue';

import EventCampaignComponent from '@/components/Events/BasicDetails/Fields/EventCampaignComponent.vue';
import EventDurationComponent from '@/components/Events/BasicDetails/Fields/EventDurationComponent.vue';
import EventLocationComponent from '@/components/Events/BasicDetails/Fields/EventLocationComponent.vue';
import EventNameComponent from '@/components/Events/BasicDetails/Fields/EventNameComponent.vue';
import EventPeerToPeerComponent from '@/components/Events/BasicDetails/Fields/EventPeerToPeerComponent.vue';
import EventUrlComponent from '@/components/Events/BasicDetails/Fields/EventUrlComponent.vue';
import VeeValidate from 'vee-validate';
import clone from 'lodash';
import IEventData from '@/api/model/IEventData';
import EventModel from '@/api/model/EventModel';
import ApiUtils from '@/api/ApiUtils';

Vue.use(VeeValidate);

@Component({
  components: {
    EventCampaignComponent,
    EventDurationComponent,
    EventLocationComponent,
    EventNameComponent,
    EventPeerToPeerComponent,
    EventUrlComponent,
  },
})
export default class EditEventBasicDetails extends BaseEventVue {
  private ERROR_ORG_PATH: string = 'data.organization.createEvent.errors';
  // @Discuss: campaignId and programId apparently cannot be null. Confirm with Patrick
  private readonly PAGE: number = 1;

  get isEventEditing() {
    return this.$route.name === 'edit-event';
  }

  private created() {
    this.onPageCreated(this.PAGE);

    if (this.isEventEditing) {
      this.api.getEvent(this.$route.params.eventId)
        .then((res) => {
          const eventUpdate = this.handleSuccess(res, 'data.event', this.ERROR_UPDATE_PATH);
          this.event = Object.assign(new IEventData(), EventModel.getBasic(eventUpdate));
          // this.$msgbox(JSON.stringify(this.event), 'event');
        })
        .catch(this.handleFailure);
    }
  }

  private updateEvent() {
    const evt = this.event;
    const loc = this.event.location;
    const promises: any = [];

    let mutation = {
      lastConfigurationStep: this.PAGE,
      name: evt.name,
      slug: evt.slug,
      venueName: evt.location.venue,
      venueAddress: evt.locationMinusVenue,
      eventStart: ApiUtils.toDate(evt.duration.startDate, evt.duration.startTime.dateTime),
    };
    // These conditional assignments CANNOT be included directly in the object
    mutation = Object.assign(mutation, BaseEventVue.isUUID(evt.campaignId) ? { campaignId: evt.campaignId } : null);
    mutation = Object.assign(mutation, BaseEventVue.isUUID(evt.p2pProgramId) ? {p2pProgramId: evt.p2pProgramId } : null);

    this.$children.forEach((vm) => promises.push(vm.$validator.validateAll()));

    Promise.all(promises).then((validations) => {
      // If one validation has failed, we stop here
      if (validations.some((validation) => validation === false)) { return; }

      if (this.isEventEditing) {
        this.api.updateEvent(this.$route.params.eventId, mutation)
          .then((res) => this.updateEventAndProceed('edit-event-details',
            res, this.ERROR_UPDATE_PATH, { eventId: this.$route.params.eventId }))
            .catch(this.handleFailure);
      } else {
        this.api.createEvent(this.$store.getters.organizationId, mutation)
          .then((res) => {
            evt.id = this.handleSuccess(res, 'data.organization.createEvent.event.id', this.ERROR_ORG_PATH);
            this.updateEventAndProceed('edit-event-details', res, this.ERROR_ORG_PATH, { eventId: evt.id });
            }).catch(this.handleFailure);
      }
    });
  }

}
</script>

<style lang="scss" scoped>
.btn-save {
  background: #D4D4D4;
}

@media only screen and (min-width: 1024px) {
  .datetime-label {
    margin-bottom: 105px !important;
  }
}
</style>
