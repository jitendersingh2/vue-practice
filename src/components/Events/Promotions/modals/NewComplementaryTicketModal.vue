<template>
  <b-modal :id='id' ref='modal' centered hide-footer hide-header>
    <form action='#' @submit.prevent='submitForm'>
      <div class='p-2'>
        <div class='mb-3 text-center'>
          <h3 class='font-weight-bold mb-3'>New Comp Ticket</h3>
        </div>

        <div class='mb-3'>
          <label-component for='comp-ticket-qty' text='Quantity'></label-component>

          <input-component
            id='comp-ticket-qty'
            placeholder='Enter Quantity'
            input-class="border text-left font-weight-normal pl-3"
            v-model='value.qty'
            type='number'
            required
          ></input-component>
        </div>

        <div class='mb-3'>
          <label-component for='comp-ticket-type' text='Ticket'></label-component>

          <select-component
            id='comp-ticket-type'
            defaultOptionText='-- Ticket Type --'
            :options='ticketsList'
            v-model='value.ticketType'
            required
          ></select-component>
        </div>

        <div class='mb-3'>
          <label-component for='comp-ticket-fName' text='First Name'></label-component>

          <input-component
            id='comp-ticket-fName'
            placeholder='Enter First Name'
            v-model='value.fName'
            required
          ></input-component>
        </div>

        <div class='mb-3'>
          <label-component for='comp-ticket-lName' text='Last Name'></label-component>

          <input-component
            id='comp-ticket-lName'
            placeholder='Enter Last Name'
            v-model='value.lName'
            required
          ></input-component>
        </div>

        <div class='mb-3'>
          <label-component for='comp-ticket-email' text='Email'></label-component>

          <input-component
            id='comp-ticket-email'
            placeholder='Enter Email Address'
            v-model='value.email'
            type='email'
            required
          ></input-component>
        </div>

        <div class='row'>
          <div class='col text-left'>
            <button
              type='submit'
              class='btn btn-primary btn-lg rounded-pill text-uppercase w-100'
            >Send</button>
          </div>

          <div class='col text-right'>
            <button
              type='reset'
              class='btn btn-primary btn-lg rounded-pill text-uppercase w-100 cancel'
              @click="$refs['modal'].hide()"
            >Cancel</button>
          </div>
        </div>
      </div>
    </form>
  </b-modal>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';

import InputComponent from '@/components/FormElements/InputComponent.vue';
import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import SelectComponent from '@/components/FormElements/SelectComponent.vue';
import IComplementaryTicket from '../types/IComplementaryTicket';

@Component({
  components: {
    InputComponent,
    LabelComponent,
    SelectComponent,
  },
})
export default class NewComplementaryTicketModal extends Vue {
  public $refs!: {
    modal: any;
  };

  @Prop(String) public readonly id!: string;
  @Prop(Object) public value!: any;

  private tickets: IComplementaryTicket[] = [
    {
      id: 1,
      fName: 'Advanced Child',
      lName: '',
      type: '',
      quantity: '',
      email: '',
    },
    {
      id: 2,
      fName: 'General Adult',
      lName: '',
      type: '',
      quantity: '',
      email: '',
    },
  ];

  get ticketsList() {
    return this.tickets.map((ticket) => ({
      text: ticket.fName,
      value: ticket.id,
    }));
  }

  private submitForm() {
    this.$emit('addNewCompTicket', this.value);
    this.$refs.modal.hide();
  }
}
</script>

<style lang='scss' scoped>
.icon-survey {
  height: 62px;
}

#order-modal.modal {
  background: rgba(255, 255, 255, 0.85);
  overflow-y: none !important;
}

.modal-content {
  border-radius: 1.3rem !important;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
}

button.btn.btn-primary.btn-lg.rounded-pill.text-uppercase.w-100.cancel {
  background: #cecece;
  border: none;
}
</style>
