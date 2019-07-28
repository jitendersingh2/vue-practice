<template>
  <b-modal
    :id='id'
    ref='modal'
    size='xl'
    modal-class='purchase-modal'
    body-classcentered
    hide-footer
    hide-header
  >
    <div class='close-div'>
      <span @click="$refs['modal'].hide()" class='close-new'>x</span>
    </div>

    <form action='#' @submit.prevent='submitForm'>
      <b-form-row class='order-form'>
        <div class='form-data'>
          <b-col cols='12' md='auto' class='modal-title py-2'>

            <div class='mb-4 text-center'>
              <h3 class='mb-4 purchaser'>PURCHASER</h3>
            </div>

            <b-col class='pl-0 mb-3'>
              <label-component class="text-light" for='comp-ticket-fName' text='First Name'></label-component>
              <input-component
                id='comp-ticket-fName'
                placeholder='Enter First Name'
                v-model='value.fName'
                required
              ></input-component>
            </b-col>

            <b-col class='pl-0 mb-3'>
              <label-component class="text-light" for='comp-ticket-lName' text='Last Name'></label-component>
              <input-component
                id='comp-ticket-lName'
                placeholder='Enter Last Name'
                v-model='value.lName'
                required
              ></input-component>
            </b-col>

            <b-col class='pl-0 mb-3'>
              <label-component class="text-light" for='comp-ticket-email' text='Email'></label-component>
              <input-component
                id='comp-ticket-fName'
                placeholder='Enter Email Address'
                v-model='value.email'
                type='email'
                required
              ></input-component>
            </b-col>

            <b-col mb-4 class='pl-0 mb-3'>
              <label-component class="text-light text-address" for='comp-ticket-email' text='Address'></label-component>
              <b-form-textarea
                id='textarea-address'
                v-model='value.address'
                :value='value.address'
                placeholder='Enter Your Address'
                rows='3'
              ></b-form-textarea>
            </b-col>

            <b-col class='mt-5'>
              <button type='submit' class='btn btn-lg rounded-pill text-uppercase update'>Update</button>
            </b-col>

          </b-col>
        </div>

        <b-col col class="p-3">
          <b-col md='12'>
            <b-row>
              <b-col md='8' class='pl-0 mt-1'>
                <div class='payment-process mt-2 ml-0'>
                  <img src='@/assets/icons/payment-card.svg' height='35px' width='35px'>
                  <p class='payment-text'>
                    Payment Processed On
                    <br>
                    <span class='payment-below'>Mar 28, 2019 6:55:29 PM</span>
                    <span class='paid mr-4'>PAID</span>
                  </p>
                  <hr>
                  <table class='w-100 tiket-data'>
                    <tr>
                      <td>Ticket Sales</td>
                      <td class='text-right'>$60.00</td>
                    </tr>
                    <tr>
                      <td>Gross</td>
                      <td class='text-right'>$60.00</td>
                    </tr>
                    <tr>
                      <td>Net</td>
                      <td class='text-right'>USD $60.00</td>
                    </tr>
                  </table>
                </div>
              </b-col>
              <b-col md='4 text-center mt-3 button-text'>
                <a
                  href='#'
                  class='mt-4 py-2 btn btn-outline-primary px-4 mr-1 mb-4 w-100 rounded-pill text-uppercase'
                >Refund Order</a>
                <a
                  href='#'
                  class='py-2 btn btn-outline-primary px-1 mr-1 mb-4 w-100 rounded-pill text-uppercase'
                >Resend Order Confirmation</a>
              </b-col>
            </b-row>
          </b-col>

          <div class='event py-2'>ATTENDEES</div>
          <b-row ml-4>
            <b-table
              responsive
              id='order-table'
              :items='attendeeTicketsList'
              :fields='attendeeTicketsFieldsList'
              thead-class='header'
              tbody-class='table-data'
              :tbody-tr-class='rowClass'
            >
              <template slot='attendee' slot-scope='list'>
                <b-col>
                  <span
                    :id='`tooltip-mail-${list.index}`'
                    class='free-stuff'
                  >{{ `${list.item.fName} ${list.item.lName}` }}</span>
                  <br>
                  <span class='free-stuff-new'>{{ list.item.ticketId }}</span>
                </b-col>
                <b-tooltip
                  :target='`tooltip-mail-${list.index}`'
                  class='details'
                >{{ `${list.item.email}` }}</b-tooltip>
              </template>

              <template slot='action' slot-scope='row'>
                <span class='edit-details' @click="editAction('hideTR', row)">Edit</span>
              </template>

              <template slot='row-details' slot-scope='row'>
                <b-row>
                  <b-col md3>
                    <input-component
                      id='comp-ticket-fName'
                      placeholder='Enter First Name'
                      v-model='selectedRow.fName'
                      required
                    ></input-component>
                  </b-col>

                  <b-col md3>
                    <input-component
                      id='comp-ticket-fName'
                      placeholder='Enter Last Name'
                      v-model='selectedRow.lName'
                      required
                    ></input-component>
                  </b-col>

                  <b-col md3>
                    <input-component
                      id='comp-ticket-fName'
                      placeholder='Enter Company'
                      v-model='selectedRow.address'
                      required
                    ></input-component>
                  </b-col>

                  <b-col md3>
                    <input-component
                      id='comp-ticket-fName'
                      placeholder='Enter Email'
                      v-model='row.item.email'
                      type='email'
                      required
                    ></input-component>
                  </b-col>

                  <b-col md3 @click="editAction('save', row)">
                    <i class='fa fa-check fa-2x' aria-hidden='true'></i>
                  </b-col>
 
                  <b-col md3 @click="editAction('close', row)">
                    <i class='fa fa-times fa-2x' aria-hidden='true'></i>
                  </b-col>

                </b-row>
              </template>

            </b-table>
          </b-row>

        </b-col>
      </b-form-row>
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
export default class OrderModal extends Vue {
  public $refs!: {
    modal: any;
  };

  @Prop(String) public readonly id!: string;
  @Prop(Object) public value!: any;
  @Prop(Number) public itemIndex!: number;

  private hideTR: boolean = false;
  private selectedRow = {
    ticketId: '',
    fName: '',
    lName: '',
    email: '',
    ticketType: '',
    address: '',
    qty: '',
  };

  private ticketItem = {
    ticketId: '',
    fName: '',
    lName: '',
    email: '',
    ticketType: '',
    address: '',
    qty: '',
  };

  private attendeeTicketsList: any[] = [
    {
      ticketId: 'A9229D50D11DBE',
      email: 'mrogers@email.com',
      ticketType: 'General Adult',
      price: '$25.00',
      tax: '$0.00',
      total: '$35.00',
      date: 'Sat, Aug 31 2018',
      fName: 'Wade',
      lName: 'Wiggs',
      address: 'USA',
    },
    {
      ticketId: 'A9229D50D12DBE',
      price: '$25.00',
      tax: '$0.00',
      total: '$35.00',
      email: 'mrogers@email.com',
      ticketType: 'General Child',
      date: 'Sat, Aug 31 2018',
      fName: 'Wade',
      lName: 'Wiggs',
      address: 'USA',
    },
    {
      ticketId: 'A9229D50D13DBE',
      ticketType: 'General Adult',
      price: '$25.00',
      tax: '$0.00',
      total: '$35.00',
      email: 'mrogers@email.com',
      date: 'Sat, Aug 31 2018',
      fName: 'Wade',
      lName: 'Wiggs',
      address: 'USA',
    },
    {
      ticketId: 'A9229D50D14DBE',
      ticketType: 'General Child',
      price: '$25.00',
      tax: '$0.00',
      total: '$35.00',
      email: 'mrogers@email.com',
      date: 'Sat, Aug 31 2018',
      fName: 'Wade',
      lName: 'Wiggs',
      address: 'USA',
    },
    {
      ticketId: 'A9229D50D15DBE',
      ticketType: 'General Adult',
      price: '$25.00',
      tax: '$0.00',
      total: '$35.00',
      email: 'mrogers@email.com',
      date: 'Sat, Aug 31 2018',
      fName: 'Wade',
      lName: 'Wiggs',
      address: 'USA',
    },
  ];

  private attendeeTicketsFieldsList: any[] = [
    {
      key: 'attendee',
    },
    {
      key: 'ticketType',
      label: 'Ticket',
    },
    {
      key: 'date',
      label: 'Ticket Date',
    },
    {
      key: 'price',
    },
    {
      key: 'tax',
    },
    {
      key: 'total',
      label: 'Ticket',
    },
    {
      key: 'action',
      label: '',
    },
  ];

  private selectedIndex: any = null;

  private editAction(type, row) {
    if (type === 'hideTR') {
      this.selectedRow = Object.assign(
        {},
        { ...this.selectedRow, ...row.item },
      );
      this.selectedIndex = row.index;
      this.hideTR = !this.hideTR;
    } else if (type === 'save') {
      const index = row.index;
      this.attendeeTicketsList.splice(index, 1, this.selectedRow);
    } else if (type === 'close') {
      this.selectedRow = this.ticketItem;
      this.selectedIndex = null;
    }
    row.toggleDetails();
  }

  private rowClass(item, type) {
    if (this.hideTR) {
      return 'row-toggle';
    } else if (this.selectedRow && this.selectedRow.ticketId === item.ticketId) {
      return 'row-toggle';
    } else {
      return;
    }
  }
  private submitForm() {
    this.$emit('editCompItem', this.itemIndex, this.value);
    this.$refs.modal.hide();
  }
}
</script>

<style scoped>
.purchase-modal {
  max-width: 1018px;
  margin-right: 100px;
}
.form-control,
.modal-title {
  background-color: #3a8dc2;
  color: #fff;
}
.edit-details {
  padding: 2px 10px;
  background: #2284c3;
  border-radius: 6px;
  font-size: 13px;
  color: #fff;
  cursor: pointer;
}
a.btn.btn-outline-primary.px-4.mr-1.mb-2.w-100.rounded-pill.text-uppercase {
  font-size: 13px;
}
.payment-process {
  width: 90%;
  background: #fff;
  padding: 10px;
  display: inline-block;
  border-radius: 6px;
  border: 2px solid #d3d7da;
}
span.paid {
  background: #03bd5b;
  color: #fff;
  padding: 0 18px;
  position: absolute;
  font-size: 12px;
  border-radius: 6px;
  right: 53px;
  top: 28px;
}
p.payment-text {
  display: inline-table;
  font-size: 15px;
  color: #403c3cde;
  margin-left: 5px;
  margin-bottom: 0px;
}
p.payment-text span.payment-below {
  font-size: 11px;
  line-height: 13px;
  display: block;
}
.button-text a {
  font-size: 12px;
  white-space: nowrap;
}
table.tiket-data,
.payment-text {
  color: #687b8c;
  font-weight: 500;
}
#textarea-address {
  border-radius: 20px;
}
.fa-check {
  color: #038037;
  cursor: pointer;
}
.fa-times {
  color: #ccc;
  cursor: pointer;
}
.form-control input#comp-ticket-fName {
  background: #2080bf;
  color: #fff;
}
.event {
  text-align: center;
  font-size: 16px;
}
.table-responsive {
  display: block;
  width: 100%;
  overflow-x: auto;
  height: 324px;
  -webkit-overflow-scrolling: touch;
}
span.free-stuff {
  font-weight: 600;
  font-size: 15px;
  color: #111;
}
span.free-stuff-new {
  color: #7ec89d;
  font-size: 14px;
  font-weight: 500;
}
tbody.table-data tr td {
  color: #808080;
}
.purchaser {
  font-size: 18px;
  font-weight: 500;
}
.form-data {
  width: 26%;
}
.form-control {
  background: #3a8dc2;
  color: #fff;
}
.order-form {
  box-shadow: inset -2px 7px 6px -3px #cdd2d4;
}
button.update {
  background: #fff;
  color: #2080bf;
  font-size: 16px;
  padding: 6px 40px;
  margin: auto;
  display: block;
  margin-bottom: 12px;
}
::-webkit-scrollbar {
  width: 5px;
  min-height: 10px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #c4c6c8;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
span.close-new {
  position: relative;
  font-size: 26px;
  display: block;
  left: 98%;
  font-weight: 600;
  color: #111;
  cursor: pointer;
  top: -15px;
  margin-bottom: -15px;
}
@media (max-width: 768px) {
  .form-data {
    width: 100%;
  }
  .payment-process {
    width: 123%;
    margin-left: -21px !important;
  }
  span.paid {
    right: -30px;
    top: 45px;
  }
}
</style>
<style>
.modal-open #order-modal.modal {
  background: rgba(255, 255, 255, 0.85);
  overflow-y: hidden !important;
}
.modal-dialog.modal-xl {
  margin-top: 17px !important;
}
.row-toggle .col,
.table-data tr .col {
  padding-left: 2px;
  padding-right: 3px;
}
#order-table #comp-ticket-fName {
  width: 143px;
  height: 32px;
  padding-top: 0;
  padding-bottom: 0;
}
.b-table-has-details {
  display: none !important;
}
.modal-dialog.modal-xl .modal-content {
  margin-left: 26px;
  width: 93%;
  border-radius: 1.3rem !important;
  box-shadow: 0 4px 20px;
}
.modal-title #comp-ticket-fName,
.modal-title #comp-ticket-lName {
  background-color: #3a8dc2;
  font-weight: 500;
  color: #fff;
}
#order-table {
  margin-left: 6px;
  margin-right: 6px;
}
.order-form .table-responsive {
  overflow-x: hidden !important;
}
.tiket-data .text-right {
  padding-right: 24px !important;
}
@media (max-width: 768px) {
  .modal-dialog.modal-xl .modal-content {
    margin-left: 0px;
  }
}
</style>