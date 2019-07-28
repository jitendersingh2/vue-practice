<template>
  <div>
    <div class="row align-items-center justify-content-between px-4 pt-4 pb-2">
      <div class="col-md"></div>

      <div class="col-md">
        <h2 class="h3 mb-0 font-weight-semibold text-center text-primary text-uppercase">Tickets</h2>
      </div>

      <div class="col-md text-right">
        <router-link :to="{ name: 'new-event-ticket' }" class="btn btn-primary rounded-standard-semi mr-md-3">+ Create New</router-link>
      </div>
    </div>

    <div class="px-4 pt-2 pb-4 border-bottom">
      <event-tickets-list-component class="table-standard" :tickets="tickets" @update-ticket="updateTicket"></event-tickets-list-component>
    </div>
  
    <div class="row">
      <div class="col-md">
        <div class="px-5 py-3">
          <a
            href="#"
            class="btn btn-light btn-back btn-lg border font-weight-semibold rounded-pill shadow-sm text-uppercase"
            @click="$router.push({ name: 'event-surveys' })"
          >Back</a>
        </div>
      </div>

      <div class="col-md text-right">
        <div class="px-5 py-3">
          <button
            type="submit"
            class="btn btn-secondary btn-save btn-sky-blue btn-lg border font-weight-semibold rounded-pill shadow-sm text-uppercase w-100"
            @click="$router.push({ name: 'edit-event-ticket-embed' });"
          >Save &amp; Continue</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ITicket from '@/components/Events/Tickets/ITicket';
import ITicketData from '@/components/Events/Tickets/ITicketData';

import EventTicketsListComponent from '@/components/Events/Tickets/EventTicketsListComponent.vue';
import BaseEventVue from '@/components/Events/BaseEventVue';

@Component({
  components: {
    EventTicketsListComponent,
  },
})
export default class EventTickets extends BaseEventVue {
  // @Task: Update -> lastConfigurationStep: this.PAGE,
  private readonly PAGE: number = 5;
  private tickets: ITicketData[] = [];
  private eventId = '';

  private created() {
    this.onPageCreated(this.PAGE);
    this.eventId = this.$route.params.eventId;

    this.api.getEventTicketList(this.eventId)
      .then((res) => {
        this.tickets = this.handleSuccess(res, 'data.event.ticketDefinitions', 'data.event.errors');
      }).catch(this.handleFailure);
  }

  private updateTicket(data: any) {
    const {index, attribute, value} = data;

    this.$set(this.tickets[index], attribute, value);
  }
}
</script>
