<template>
  <form action="#" method="POST" @submit.prevent="updateTicket">
    <div class="border-bottom row no-gutters">
      <div class="col-md border-right">
        <div class="border-bottom p-4 p-md-5">
          <div class="row">
            <div class="col">
              <h4 class="font-weight-semibold label-standard-primary mb-4 text-uppercase">Ticket</h4>
            </div>

            <div class="col text-right" v-if="isTicketEditing">
              <a class="btn btn-primary btn-sm rounded-circle" href="#" v-b-modal.delete-event-ticket-modal>
                <i class="fas fa-trash"></i>
              </a>
            </div>
          </div>

          <event-ticket-name-component class="mb-3" v-model="ticket.name"></event-ticket-name-component>
          <event-ticket-promo-code-component class="mb-3" v-model="ticket.promoCode"></event-ticket-promo-code-component>
          <event-ticket-description-component class="mb-3" v-model="ticket.description"></event-ticket-description-component>
        </div>

        <div class="p-4 p-md-5">
          <h4 class="font-weight-semibold label-standard-primary mb-4 text-uppercase">Ticket Price</h4>

          <event-ticket-price-free-component class="mb-3" v-model="ticket.isPriceFree"></event-ticket-price-free-component>
          <event-ticket-price-component class="mb-3" v-model="ticket.ticketPrice"></event-ticket-price-component>
        </div>
      </div>

      <div class="col-md">
        <div class="border-bottom p-4 p-md-5">
          <div class="row mb-4">
            <div class="col">
              <h4 class="font-weight-semibold label-standard-primary mb-0 text-uppercase">Quantities</h4>
            </div>

            <div class="col-7 d-flex align-items-center justify-content-end">
              <span class="font-weight-semibold mr-3">Remaining Tickets</span>
              <toggle-button class="mb-0" :labels="btnToggleLabels" :disabled="ticket.quantity === 'unlimited'" :sync="true" v-model="ticket.showRemainingQuantity"/>
            </div>
          </div>

          <event-ticket-quantity-component class="mb-3" :isDisabled="!ticket.showRemainingQuantity" v-model="ticket.quantity"></event-ticket-quantity-component>
        </div>

        <div class="p-4 p-md-5">
          <h4 class="font-weight-semibold label-standard-primary mb-4 text-uppercase">Status And Availability</h4>

          <event-ticket-status-component class="mb-3" v-model="ticket.status"></event-ticket-status-component>
          <event-ticket-start-selling-component
            class="mb-3"
            :isDisabled="disableSellingDates"
            :isImmediate="ticket.isImmediate"
            @update-is-immediate="value => ticket.isImmediate = value"
            v-model="ticket.ticketStart"
          ></event-ticket-start-selling-component>
          <event-ticket-stop-selling-component
            class="mb-3"
            :isDisabled="disableSellingDates"
            :isEventDate="ticket.isEventDate"
            @update-is-event-date="value => ticket.isEventDate = value"
            v-model="ticket.ticketEnd"
          ></event-ticket-stop-selling-component>
          <event-ticket-assign-survey-component class="mb-3" :surveys="surveys" v-model="ticket.surveyId"></event-ticket-assign-survey-component>
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
            class="btn btn-sky-blue btn-save btn-lg border font-weight-semibold rounded-pill shadow-sm text-uppercase w-100"
          >Save &amp; Continue</button>
        </div>
      </div>
    </div>

    <ticket-delete-modal-component
      id="delete-event-ticket-modal"
      @confirmed="deleteTicket"
      v-if="isTicketEditing"
    ></ticket-delete-modal-component>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { ToggleButton } from 'vue-js-toggle-button';
import ISurvey from '@/components/Events/Surveys/ISurvey';
import ITicketPrice from '@/components/Events/Tickets/ITicketPrice';
import ITicketData from '@/components/Events/Tickets/ITicketData';

import EventTicketAssignSurveyComponent from '@/components/Events/Tickets/Fields/EventTicketAssignSurveyComponent.vue';
import EventTicketDescriptionComponent from '@/components/Events/Tickets/Fields/EventTicketDescriptionComponent.vue';
import EventTicketNameComponent from '@/components/Events/Tickets/Fields/EventTicketNameComponent.vue';
import EventTicketPriceFreeComponent from '@/components/Events/Tickets/Fields/EventTicketPriceFreeComponent.vue';
import EventTicketPriceComponent from '@/components/Events/Tickets/Fields/EventTicketPriceComponent.vue';
import EventTicketPromoCodeComponent from '@/components/Events/Tickets/Fields/EventTicketPromoCodeComponent.vue';
import EventTicketQuantityComponent from '@/components/Events/Tickets/Fields/EventTicketQuantityComponent.vue';
import EventTicketStartSellingComponent from '@/components/Events/Tickets/Fields/EventTicketStartSellingComponent.vue';
import EventTicketStatusComponent from '@/components/Events/Tickets/Fields/EventTicketStatusComponent.vue';
import EventTicketStopSellingComponent from '@/components/Events/Tickets/Fields/EventTicketStopSellingComponent.vue';
import TicketDeleteModalComponent from '@/components/Events/Tickets/TicketDeleteModalComponent.vue';
import BaseEventVue from '@/components/Events/BaseEventVue';

@Component({
  components: {
    EventTicketAssignSurveyComponent,
    EventTicketDescriptionComponent,
    EventTicketNameComponent,
    EventTicketPriceFreeComponent,
    EventTicketPriceComponent,
    EventTicketPromoCodeComponent,
    EventTicketQuantityComponent,
    EventTicketStartSellingComponent,
    EventTicketStatusComponent,
    EventTicketStopSellingComponent,
    TicketDeleteModalComponent,
    ToggleButton,
  },
})
export default class EditEventTicket extends BaseEventVue {
  get disableSellingDates() {
    return this.ticket.status === 'CLOSED';
  }

  get isTicketEditing() {
    return this.$route.name === 'edit-event-ticket';
  }

  // @Task: Survey is a stub
  // @Issue: Stubbed out status because its failing on backend

  private readonly PAGE: number = 5;  // Same as parent
  private ticketId;
  private ticket = new ITicketData();
  private surveys: any;

  private btnToggleLabels = {
    checked: 'ON',
    unchecked: 'OFF',
  };

  @Watch('ticket.quantity', { immediate: true })
  public monitorTicketQuantity(quantity) {
    if (quantity === 'unlimited') {
      this.ticket.showRemainingQuantity = false;
    }
  }

  private created() {
    // this.eventId = this.$store.getters.event.id;

      // this.onPageCreated(this.PAGE);
      // this.api.getSurveys(this.event.id)
      //    .then((res) => {
      //    const errors = res.data.event.errors;
      //    if (errors.length > 0) {
      //      this.$msgbox(errors, 'Error');
      //    } else {
      //      this.surveys = res.data.surveys;
      //    }})
      //    .catch(this.handleFailure);

      // if (this.isTicketEditing) {
      //  this.ticketId = this.$route.params.ticketId;
      //  this.api.getTicketDefinition(this.ticketId)
      //    .then((res) => {
      //    const errors = res.data.event.errors;
      //    if (errors.length > 0) {
      //      this.$msgbox(errors, 'Error');
      //    } else {
      //      this.ticket = res.data.ticketDefinition;
      //    }})
      //    .catch(this.handleFailure);
      // }

    this.onPageCreated(this.PAGE);
    this.api.getSurveys(this.event.id)
        .then((res) => this.surveys = this.handleSuccess(res, 'data.surveys', 'data.event.surveys.errors')
        .catch(this.handleFailure));

    if (this.isTicketEditing) {
      this.ticketId = this.$route.params.ticketId;
      this.api.getTicketDefinition(this.ticketId)
      .then((res) => this.ticket = this.handleSuccess(res, 'data.ticketDefinition', 'data.event.ticketDefinition.errors')
      .catch(this.handleFailure));
    }
  }

  private updateTicket() {
    const that = this;
    const tkt = this.ticket;

    const mutation = {
      name: tkt.name,
      accessCode: tkt.accessCode,
      description: tkt.description,
      showRemainingQuantity: tkt.showRemainingQuantity,
      status: tkt.status,
      // quantity: tkt.quantity=='unlimited' ? ,
      // limitMaximum: tkt..isLimitless ? null : tkt.ticketPrice.fairMarketValue,

      price: tkt.isPriceFree ? null : tkt.ticketPrice.price,
      fairMarketValue: tkt.isPriceFree ? null : tkt.ticketPrice.fairMarketValue,
      // The next 2 are currently failing
      // promoCodeId: BaseEventVue.isUUID(tkt.promoCodeId) ? tkt.promoCodeId : null,
      // surveyId: BaseEventVue.isUUID(tkt.surveyId) ? tkt.surveyId : null,

      // ticketStart: isImmediate ? null : new Date()
      // Set null to follow Event start date (immediately if Event has started)
      // ticketEnd: DateTime
      // Set null to follow Event end date

      // public ticketStartDate: string = '';
      // public ticketStartTime: string = '';
      // public ticketEndDate: string = '';
      // public ticketEndTime: string = '';

      // // Extension
      // public isEventDate: boolean = false;
    };

    // Do some processing...
    if (this.isTicketEditing) {
      this.api.updateTicketDefinition(this.event.id, this.ticketId, mutation)
        .then((res) => success(res, 'data.event.updateTicketDefinition.errors'))
        .catch(this.handleFailure);
    } else {
      this.api.createTicketDefinition(this.event.id, mutation)
        .then((res) => success(res, 'data.event.createTicketDefinition.errors'))
        .catch(this.handleFailure);
    }

    function success(res, errorPath) {
      that.updateEventAndProceed('event-tickets', res, errorPath);
    }
  }

  private deleteTicket() {
    const that = this;

    // Delete event ticket...
    this.api.deleteTicketDefinition(this.event.id, this.ticketId)
    .then(success).catch(this.handleFailure);

    function success(res) {
      that.updateEventAndProceed('event-tickets', res, 'data.event.deleteTicketDefinition.errors');
    }
  }
}
</script>
