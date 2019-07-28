<template>
  <b-modal :id="id" ref="modal" centered hide-footer hide-header>
    <form action="#" @submit.prevent="submitForm">
      <div class="p-3">
        <div class="mb-4 text-center">
          <h3 class="font-weight-bold mb-4">Create Survey</h3>
          <img class="icon-survey" src="@/assets/icons/icon-survey.svg">
        </div>

        <div class="mb-3">
          <label-component for="event-survey-name" text="Survey Name"></label-component>

          <input-component
            id="event-survey-name"
            placeholder="Enter Survey Name"
            v-model="name"
            required
          ></input-component>
        </div>

        <div class="mb-4">
          <label-component for="event-tickets" text="Assign To"></label-component>

          <select-component
            id="event-campaign"
            defaultOptionText="-- No Ticket --"
            :options="ticketsList"
            v-model="ticketId"
            required
          ></select-component>
        </div>

        <div class="row">
          <div class="col text-left">
            <button
              type="button"
              class="btn btn-secondary btn-lg rounded-pill text-uppercase w-100"
              @click="$refs['modal'].hide()"
            >Cancel</button>
          </div>

          <div class="col text-right">
            <button
              type="submit"
              class="btn btn-primary btn-lg rounded-pill text-uppercase w-100"
            >Continue</button>
          </div>
        </div>
      </div>
    </form>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import InputComponent from '@/components/FormElements/InputComponent.vue';
import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import SelectComponent from '@/components/FormElements/SelectComponent.vue';
import ITicket from '../Tickets/ITicket';

@Component({
  components: {
    InputComponent,
    LabelComponent,
    SelectComponent,
  },
})
export default class CreateEventSurveyModalComponent extends Vue {
  public $refs!: {
    modal: any;
  };

  @Prop(String) public readonly id!: string;

  private name: string = '';
  private ticketId: string = '';
  private tickets: ITicket[] = [
    {
      id: 1,
      name: 'Advanced Child',
      quantity: 100,
      startSelling: '2019-06-21',
      stopSelling: '2019-06-23',
      promoCode: 'FREE STUFF',
      status: 'OPEN',
    },
    {
      id: 2,
      name: 'General Admission',
      quantity: 100,
      startSelling: '2019-06-21',
      stopSelling: '2019-06-23',
      promoCode: 'FREE STUFF',
      status: 'OPEN',
    },
  ];

  get ticketsList() {
    return this.tickets.map((ticket) => ({
      text: ticket.name,
      value: ticket.id,
    }));
  }

  private submitForm() {
    this.$router.push({
      name: 'new-event-survey',
      query: { name: this.name, ticketId: this.ticketId },
    });
  }
}
</script>

<style lang="scss" scoped>
.icon-survey {
  height: 62px;
}
</style>
