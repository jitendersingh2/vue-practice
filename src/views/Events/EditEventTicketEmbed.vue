<template>
  <form action="#" method="POST" @submit.prevent="updateEventTicketEmbed">
    <div class="d-none d-md-block">
      <div class="row">
        <div class="col-md">
          <div class="pt-5 pb-2 px-md-5">
            <h4 class="font-weight-semibold mb-4 text-center text-primary text-uppercase">Ticket Widget</h4>
          </div>
        </div>

        <div class="col-md">
          <div class="pt-5 pb-2 px-md-5">
            <h4 class="font-weight-semibold mb-4 text-center text-primary text-uppercase">Button</h4>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md">
          <div class="px-md-5 mb-4 text-center">
            <p class="mb-0">Add the Ticket Widget to your site or blog to display a preview of your event's available tickets and allow attendees to start their transaction on your site before confirming the order on Picatic.</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="border-bottom row no-gutters">
      <div class="col-md border-right">
        <div class="p-4 p-md-5">
          <div class="d-md-none">
            <h4 class="font-weight-semibold mb-4 text-center text-primary text-uppercase">Ticket Widget</h4>

            <p class="text-muted">Add the Ticket Widget to your site or blog to display a preview of your event's available tickets and allow attendees to start their transaction on your site before confirming the order on Picatic.</p>  
          </div>
          
          <event-time-component class="mb-1" v-model="event.ticketEmbed.showEventTime"></event-time-component>
          <event-location-component class="mb-1" v-model="event.ticketEmbed.showEventLocation"></event-location-component>
          <event-image-component class="mb-1" v-model="event.ticketEmbed.showEventImage"></event-image-component>
          <event-ticket-description-component class="mb-3" v-model="event.ticketEmbed.showEventDescription"></event-ticket-description-component>
          <event-theme-component @copy-preview-code="copyPreviewCode" v-model="event.ticketEmbed.theme"></event-theme-component>
        </div>
      </div>

      <div class="col-md">
        <div class="p-4 p-md-5">
          <h4 class="d-md-none font-weight-semibold mb-4 text-center text-primary text-uppercase">Button</h4>

          <event-button-text-component class="mb-3" v-model="event.ticketEmbed.buttonText"></event-button-text-component>
          <event-button-size-component class="mb-3" v-model="event.ticketEmbed.buttonSize"></event-button-size-component>
          <event-button-background-color-component class="mb-3" v-model="event.ticketEmbed.buttonBgColor"></event-button-background-color-component>
          <event-button-text-color-component class="mb-5" v-model="event.ticketEmbed.buttonTextColor"></event-button-text-color-component>
        
          <div class="d-flex align-items-center justify-content-center text-center">
            <button
              class="btn btn-rounded"
              :class="buttonSize"
              :style="{ 'background-color': event.ticketEmbed.buttonBgColor, 'color': event.ticketEmbed.buttonTextColor }"
              v-text="event.ticketEmbed.buttonText"
            ></button>

            <span
              class="copy-event-ticket-preview-code d-flex align-items-center justify-content-center ml-4 rounded-circle text-primary"
              placement="right"
              title="Copy Code"
              @click="copyButtonCode"
              v-b-tooltip.hover
            >
              <i class="far fa-copy"></i>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md">
        <div class="px-5 py-3">
          <a
            href="#"
            class="btn btn-light btn-back btn-lg border font-weight-semibold rounded-pill shadow-sm text-uppercase"
            @click="$router.push({ name: 'event-tickets' })"
          >Back</a>
        </div>
      </div>

      <div class="col-md text-right">
        <div class="px-5 py-3">
          <button
            type="submit"
            class="btn btn-sky-blue btn-save btn-lg border font-weight-semibold rounded-pill shadow-sm text-uppercase w-100"
          >Save &amp; Continue</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import EventButtonBackgroundColorComponent from '@/components/Events/TicketEmbed/Fields/EventButtonBackgroundColorComponent.vue';
import EventButtonSizeComponent from '@/components/Events/TicketEmbed/Fields/EventButtonSizeComponent.vue';
import EventButtonTextColorComponent from '@/components/Events/TicketEmbed/Fields/EventButtonTextColorComponent.vue';
import EventButtonTextComponent from '@/components/Events/TicketEmbed/Fields/EventButtonTextComponent.vue';
import EventImageComponent from '@/components/Events/TicketEmbed/Fields/EventImageComponent.vue';
import EventLocationComponent from '@/components/Events/TicketEmbed/Fields/EventLocationComponent.vue';
import EventThemeComponent from '@/components/Events/TicketEmbed/Fields/EventThemeComponent.vue';
import EventTicketDescriptionComponent from '@/components/Events/TicketEmbed/Fields/EventTicketDescriptionComponent.vue';
import EventTimeComponent from '@/components/Events/TicketEmbed/Fields/EventTimeComponent.vue';
import BaseEventVue from '@/components/Events/BaseEventVue';
import IEventData from '@/api/model/IEventData';

@Component({
  components: {
    EventButtonBackgroundColorComponent,
    EventButtonSizeComponent,
    EventButtonTextComponent,
    EventButtonTextColorComponent,
    EventImageComponent,
    EventLocationComponent,
    EventThemeComponent,
    EventTicketDescriptionComponent,
    EventTimeComponent,
  },
})
export default class EditEventTicketEmbed extends BaseEventVue {
  private readonly PAGE: number = 6;
  private eventId: string = '';

  private created() {
    this.onPageCreated(this.PAGE);
    this.eventId = this.$route.params.eventId;

    this.api.getTicketEmbed(this.eventId)
      .then((res) => {
        const tktEmbed = this.handleSuccess(res, 'data.event.ticketEmbedSettings', 'data.event.errors');
        this.event.ticketEmbed = Object.assign(new IEventData().ticketEmbed, tktEmbed);
        // this.$msgbox(JSON.stringify(this.event), 'event');
      }).catch(this.handleFailure);
  }


  get buttonSize() {
    if (this.event.ticketEmbed.buttonSize === 'small') {
      return 'btn-sm';
    } else if (this.event.ticketEmbed.buttonSize === 'large') {
      return 'btn-lg';
    }
  }

  private copyButtonCode() {
    // Copy button code...
  }

  private copyPreviewCode() {
    // Copy preview code...
  }

  private updateEventTicketEmbed() {
    const that = this;
    const evt = this.event;
    const mutation = {
      lastConfigurationStep: this.PAGE,
      ticketEmbedSettings: evt.ticketEmbed,
    };

    this.api.updateEvent(this.eventId, mutation)
      .then(success).catch(this.handleFailure);

    function success(res) {
      that.updateEventAndProceed('edit-order-confirmation', res);
    }
  }
}
</script>

<style lang="scss" scoped>
.copy-event-ticket-preview-code {
  border: 2px solid var(--primary);
  cursor: pointer;
  margin-top: -3px;
  height: 40px;
  width: 40px;
}
</style>
