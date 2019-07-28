<template>
  <form action='#' method='POST' enctype='multipart/form-data' @submit.prevent='updateMoreDetails'>
    <div class='border-bottom row no-gutters'>
      <div class='col-md border-right'>
        <div class='p-4 p-md-5'>
          <h4
            class='font-weight-semibold label-standard-primary mb-4 text-uppercase'
          >Additional Details</h4>

          <event-summary-component class='mb-4' v-model='event.summary'></event-summary-component>
          <event-poster-component class='mb-4' v-model="event.poster"></event-poster-component>
          <event-website-component class='mb-4' v-model='event.webUrl'></event-website-component>
        </div>
      </div>

      <div class='col-md'>
        <div class='p-4 p-md-5'>
          <event-description-component class='event-description mb-4' v-model='event.description'></event-description-component>
          <event-tac-component class='event-tac mb-4' v-model='event.terms'></event-tac-component>
          <event-donation-component class='mb-4' v-model='event.embedId'></event-donation-component>
        </div>
      </div>
    </div>

    <div class='row'>
      <div class='col-md'>
        <div class='px-5 py-3'>
          <a
            href='#'
            class="btn btn-light btn-back font-weight-semibold btn-lg border rounded-pill shadow-sm text-uppercase"
            @click="$router.push({ name: 'edit-event' })"
          >Back</a>
        </div>
      </div>

      <div class='col-md text-right'>
        <div class='px-5 py-3'>
          <button
            type='submit'
            class='btn btn-secondary font-weight-semibold btn-sky-blue btn-lg border rounded-pill shadow-sm text-uppercase w-100'
          >Save And Continue</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

import EventDescriptionComponent from '@/components/Events/AdditionalDetails/Fields/EventDescriptionComponent.vue';
import EventDonationComponent from '@/components/Events/AdditionalDetails/Fields/EventDonationComponent.vue';
import EventPosterComponent from '@/components/Events/AdditionalDetails/Fields/EventPosterComponent.vue';
import EventSummaryComponent from '@/components/Events/AdditionalDetails/Fields/EventSummaryComponent.vue';
import EventTacComponent from '@/components/Events/AdditionalDetails/Fields/EventTacComponent.vue';
import EventWebsiteComponent from '@/components/Events/AdditionalDetails/Fields/EventWebsiteComponent.vue';
import SelectComponent from '@/components/FormElements/SelectComponent.vue';
import IEventData from '@/api/model/IEventData';
import EventModel from '@/api/model/EventModel';
import BaseEventVue from '@/components/Events/BaseEventVue';
import { EventApi } from '@/api/EventApi';
import IEventPoster from '@/components/Events/AdditionalDetails/IEventPoster';

@Component({
  components: {
    EventDescriptionComponent,
    EventDonationComponent,
    EventPosterComponent,
    EventSummaryComponent,
    EventTacComponent,
    EventWebsiteComponent,
    SelectComponent,
  },
})
export default class EditAdditionalEventDetails extends BaseEventVue {
  private readonly PAGE: number = 2;

  private created() {
    this.onPageCreated(this.PAGE);

    this.api.getEvent(this.$route.params.eventId)
      .then((res) => {
        const eventUpdate = this.handleSuccess(res, 'data.event', this.ERROR_UPDATE_PATH);
        this.event = Object.assign(new IEventData(), EventModel.getAdditional(eventUpdate));
      }).catch(this.handleFailure);
  }

  private updateMoreDetails() {
    const that = this;
    const evt = this.event;
    const promises: any = [];

    const mutation = {
        lastConfigurationStep: this.PAGE,
        description: evt.description,
        webUrl: evt.webUrl,
        summary: evt.summary,
        terms: evt.terms,
        embedId: evt.embedId,     // @Note: Throwing errors. Informed Patrick
        posterUrl: evt.posterUrl,
        // posterMode: 'NONE',   @Note: Not exposed from PosterComponent. Abishek is working on this
    };

    this.$children.forEach((vm) => promises.push(vm.$validator.validateAll()));

    Promise.all(promises).then((validations) => {
      // If one validation has failed, we stop here
      if (validations.some((validation) => validation === false)) { return; }

      // Everything is valid
      this.api.updateEvent(evt.id, mutation)
        .then(success).catch(this.handleFailure);
    });

    function success(res) {
      that.updateEventAndProceed('edit-event-design', res);
    }
  }
}
</script>

<style lang='scss' scoped>
@media only screen and (min-width: 768px) {
  .event-description {
    margin-top: 55px !important;
  }
}
</style>


// private abcd: IEventPoster = {
// type: 'VIDEO_EMBED',
// data:  'test',
// }
// this.$msgbox(this.eventPoster, 'a');
