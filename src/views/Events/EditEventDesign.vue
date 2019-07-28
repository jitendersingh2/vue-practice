<template>
  <form action="#" method="POST" enctype="multipart/form-data" @submit.prevent="updateEventDesign">
    <div class="border-bottom row no-gutters">
      <div class="col-md border-right">
        <div class="border-bottom p-4 p-md-5">
          <div class="cover-image-label d-flex align-items-center mb-4">
            <h4 class="font-weight-semibold label-standard-primary mb-0 text-uppercase">Cover Image</h4>

            <b-tooltip
              placement="right"
              target="btn-tooltip-event-cover"
              title="Select event cover here"
            ></b-tooltip>

            <a href="#" id="btn-tooltip-event-cover" class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 text-white">?</a>
          </div>

          <event-cover-component class="mb-3" @imageSelected="image => eventCover = image"></event-cover-component>
        </div>

        <div class="p-4 p-md-5">
          <h4 class="font-weight-semibold label-standard-primary mb-4 text-uppercase">Footer</h4>

          <event-owner-footer-logo-component
            class="mb-4"
            @imageSelected="image => eventOwnerFooterLogo = image"
          ></event-owner-footer-logo-component>

          <event-footer-background-component
            class="mb-3"
            v-model="event.footerBgColor"
          ></event-footer-background-component>
        </div>
      </div>

      <div class="col-md">
        <div class="p-4 p-md-5 border-bottom">
          <h4 class="font-weight-semibold label-standard-primary mb-4 text-uppercase">Branding</h4>

          <event-owner-logo-component
            class="event-owner-logo mb-3"
            @imageSelected="image => eventOwnerLogo = image"
          ></event-owner-logo-component>
        </div>

         <div class="p-4 p-md-5">
          <h4 class="font-weight-semibold label-standard-primary mb-4 text-uppercase">Button</h4>

          <event-button-text-component class="mb-3" v-model="event.buttonText"></event-button-text-component>
          <event-button-background-color-component class="mb-3" v-model="event.buttonBgColor"></event-button-background-color-component>
          <event-button-text-color-component class="mb-5" v-model="event.buttonTextColor"></event-button-text-color-component>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md">
        <div class="px-5 py-3">
          <a
            href="#"
            class="btn btn-light btn-back font-weight-semibold btn-lg border rounded-pill shadow-sm text-uppercase"
            @click="$router.push({ name: 'edit-event-details' })"
          >Back</a>
        </div>
      </div>

      <div class="col-md text-right">
        <div class="px-5 py-3">
          <button
            type="submit"
            class="btn btn-secondary font-weight-semibold btn-sky-blue btn-lg border rounded-pill shadow-sm text-uppercase w-100"
          >Save And Continue</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import EventButtonBackgroundColorComponent from '@/components/Events/Design/Fields/EventButtonBackgroundColorComponent.vue';
import EventButtonTextColorComponent from '@/components/Events/Design/Fields/EventButtonTextColorComponent.vue';
import EventButtonTextComponent from '@/components/Events/Design/Fields/EventButtonTextComponent.vue';
import EventCoverComponent from '@/components/Events/Design/Fields/EventCoverComponent.vue';
import EventFooterBackgroundComponent from '@/components/Events/Design/Fields/EventFooterBackgroundComponent.vue';
import EventOwnerFooterLogoComponent from '@/components/Events/Design/Fields/EventOwnerFooterLogoComponent.vue';
import EventOwnerLogoComponent from '@/components/Events/Design/Fields/EventOwnerLogoComponent.vue';
import IEventData from '@/api/model/IEventData';
import BaseEventVue from '@/components/Events/BaseEventVue';
import { EventApi } from '@/api/EventApi';
import EventModel from '@/api/model/EventModel';

@Component({
  components: {
    EventButtonBackgroundColorComponent,
    EventButtonTextColorComponent,
    EventButtonTextComponent,
    EventCoverComponent,
    EventFooterBackgroundComponent,
    EventOwnerFooterLogoComponent,
    EventOwnerLogoComponent,
  },
})
export default class EditEventDesign extends BaseEventVue {
  private readonly PAGE: number = 3;

  private eventCover: string = '';
  private eventOwnerFooterLogo: string = '';
  private eventOwnerLogo: string = '';

  private created() {
    this.onPageCreated(this.PAGE);

    this.api.getEvent(this.$route.params.eventId)
      .then((res) => {
        const eventUpdate = this.handleSuccess(res, 'data.event', this.ERROR_UPDATE_PATH);
        // this.$msgbox(JSON.stringify(EventModel.getAdditional(eventUpdate)), 'event Update');
        this.event = Object.assign(new IEventData(), EventModel.getDesign(eventUpdate));
        // this.$msgbox(JSON.stringify(this.event), 'event');
      }).catch(this.handleFailure);
  }

  private updateEventDesign() {
    // @Test Uploads are failling
    // this.api.uploadTestingIssue(this.event.id, this.eventCover);

    const that = this;
    const evt = this.event;
    const mutation = {
      lastConfigurationStep: this.PAGE,
      footerBgColor: evt.footerBgColor,
      buttonBgColor: evt.buttonBgColor,
      buttonText: evt.buttonText,
      buttonTextColor: evt.buttonTextColor,
    };
    // Do some processing...
    this.api.updateEvent(evt.id, mutation)
      .then(success).catch(this.handleFailure);

    function success(res) {
      that.updateEventAndProceed('event-surveys', res);
    }

  }
}
</script>

<style lang="scss" scoped>
@media only screen and (min-width: 1024px) {
  .cover-image-label {
    margin-bottom: 65px !important;
  }
}
</style>
