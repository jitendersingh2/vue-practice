<template>
  <form action="#" method="POST" @submit.prevent="updateEventSettings">
    <div class="border-bottom row no-gutters">
      <div class="col-md border-right">
        <div class="p-4 p-md-5">
          <h4 class="font-weight-semibold label-standard-primary mb-4 text-uppercase">Registration Settings</h4>

          <claim-all-tickets-component class="mb-3" v-model="event.enableBuyerClaimAll"></claim-all-tickets-component>
          <checkout-time-limit-component class="mb-3" v-model="event.cartTimeoutSeconds"></checkout-time-limit-component>
          <company-name-component class="mb-3" v-model="companyName"></company-name-component>
          <event-capacity-component class="mb-3" v-model="event.capacity"></event-capacity-component>
          <send-ticket-confirmation-email-component class="mb-3" v-model="event.sendTicketsWithConfirmationEmail"></send-ticket-confirmation-email-component>
        </div>
      </div>

      <div class="col-md">
        <div class="border-bottom p-4 p-md-5">
          <h4 class="font-weight-semibold label-standard-primary mb-0 text-uppercase">Payment Settings</h4>
          <p class="mb-4 text-muted" style="font-size: 12px;">(Collect taxes on your transaction)</p>

          <event-tax-component class="mb-3" v-model="event.tax"></event-tax-component>
        </div>

        <div class="border-bottom p-4 p-md-5">
          <h4 class="font-weight-semibold label-standard-primary mb-2 text-uppercase">Public Guests</h4>

          <event-public-guest-list-component class="mb-3" v-model="event.enablePublicGuestList"></event-public-guest-list-component>
        </div>

        <div class="p-4 p-md-5">
          <h4 class="font-weight-semibold label-standard-primary mb-4 text-uppercase">Event Host</h4>

          <event-host-name-component class="mb-3" v-model="event.hostName"></event-host-name-component>
          <event-contact-email-component class="mb-3" v-model="event.hostEmail"></event-contact-email-component>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md">
        <div class="px-5 py-3">
          <a
            href="#"
            class="btn btn-light btn-back btn-lg border font-weight-semibold rounded-pill shadow-sm text-uppercase"
            @click="$router.go(-1)"
          >Back</a>
        </div>
      </div>

      <div class="col-md text-right">
        <div class="px-5 py-3">
          <button
            type="submit"
            class="btn btn-sky-blue btn-lg border font-weight-semibold rounded-pill shadow-sm text-uppercase w-100"
          >Save &amp; Continue</button>
        </div>
      </div>
    </div>

    <create-p-2-p-modal-component id="create-p2p"></create-p-2-p-modal-component>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ITax from '@/components/Events/Settings/ITax';

import CheckoutTimeLimitComponent from '@/components/Events/Settings/Fields/CheckoutTimeLimitComponent.vue';
import ClaimAllTicketsComponent from '@/components/Events/Settings/Fields/ClaimAllTicketsComponent.vue';
import CompanyNameComponent from '@/components/Events/Settings/Fields/CompanyNameComponent.vue';
import CreateP2PModalComponent from '@/components/Events/CreateP2PModalComponent.vue';
import EventCapacityComponent from '@/components/Events/Settings/Fields/EventCapacityComponent.vue';
import EventContactEmailComponent from '@/components/Events/Settings/Fields/EventContactEmailComponent.vue';
import EventHostNameComponent from '@/components/Events/Settings/Fields/EventHostNameComponent.vue';
import EventPublicGuestListComponent from '@/components/Events/Settings/Fields/EventPublicGuestListComponent.vue';
import EventTaxComponent from '@/components/Events/Settings/Fields/EventTaxComponent.vue';
import SendTicketConfirmationEmailComponent from '@/components/Events/Settings/Fields/SendTicketConfirmationEmailComponent.vue';

import BaseEventVue from '@/components/Events/BaseEventVue';
import IEventData from '@/api/model/IEventData';
import EventModel from '@/api/model/EventModel';

@Component({
  components: {
    CheckoutTimeLimitComponent,
    ClaimAllTicketsComponent,
    CompanyNameComponent,
    CreateP2PModalComponent,
    EventCapacityComponent,
    EventContactEmailComponent,
    EventHostNameComponent,
    EventPublicGuestListComponent,
    EventTaxComponent,
    SendTicketConfirmationEmailComponent,
  },
})
export default class EditEventSettings extends BaseEventVue {
  private readonly PAGE: number = 9;
  private eventId: string = '';

  private created() {
    this.onPageCreated(this.PAGE);
    this.eventId = this.$route.params.eventId;

    this.api.getEvent(this.$route.params.eventId)
      .then((res) => {
        const eventUpdate = this.handleSuccess(res, 'data.event', this.ERROR_UPDATE_PATH);
        this.event = Object.assign(new IEventData(), EventModel.getSettings(eventUpdate));
        }).catch(this.handleFailure);
  }

  private updateEventSettings() {
    const that = this;
    const evt = this.event;
    const mutation = {
      lastConfigurationStep: this.PAGE,
      cartTimeoutSeconds: evt.cartTimeoutSeconds,
      enableBuyerClaimAll: evt.enableBuyerClaimAll,
      capacity: evt.capacity,
      hostEmail: evt.hostEmail,
      hostName: evt.hostName,
      taxRate: evt.tax.taxRate,
      taxNumber: evt.tax.taxNumber,
      enablePublicGuestList: evt.enablePublicGuestList,
      sendTicketsWithConfirmationEmail: evt.sendTicketsWithConfirmationEmail,
    };

    // Do some processing ...
    this.api.updateEvent(evt.id, mutation)
      .then(success).catch(this.handleFailure);

    function success(res) {
      const errors = res.data.event.update.errors;
      if (errors.length > 0) {
        that.$msgbox(errors, 'Errors');
      } else {
        that.$bvModal.show('create-p2p');
      }
    }
  }
}
</script>
