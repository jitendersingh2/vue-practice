<template>
  <div>
    <form action="#" method="POST" @submit.prevent="updateOrderDetails">
      <div class="border-bottom row no-gutters">
        <div class="col-md-4 bg-primary">
          <div class="p-3">
            <h5 class="font-weight-semibold mb-3 text-center text-uppercase text-white">Purchaser</h5>
            
            <div class="mb-3">
              <label-component class="text-white" for="event-order-first-name" text="First Name"></label-component>

              <input-component
                id="event-order-first-name"
                placeholder="Enter your first name"
                inputClass="bg-transparent text-white"
                v-model="editedOrderDetails.firstName"
                required
              ></input-component>
            </div>

            <div class="mb-3">
              <label-component class="text-white" for="event-order-last-name" text="Last Name"></label-component>
            
              <input-component
                id="event-order-last-name"
                placeholder="Enter your last name"
                inputClass="bg-transparent text-white"
                v-model="editedOrderDetails.lastName"
                required
              ></input-component>
            </div>

            <div class="mb-3">
              <label-component class="text-white" for="event-order-email" text="Email"></label-component>
            
              <input-component
                id="event-order-email"
                name="event-order-email"
                type="email"
                placeholder="Enter your email"
                :input-class="{
                  'border-danger text-danger': errors.has('event-order-email'),
                  'text-white': !errors.has('event-order-email'),
                  'bg-transparent': true
                }"
                v-validate="'email'"
                v-model="editedOrderDetails.email"
                required
              ></input-component>
            </div>

            <div class="mb-3">
              <label-component class="text-white" for="event-order-address" text="Address"></label-component>
            
              <textarea-component
                id="event-order-address"
                placeholder="Enter your address"
                inputClass="bg-transparent text-white rounded-standard p-3"
                v-model="editedOrderDetails.address"
              ></textarea-component>
            </div>

            <div class="text-center">
              <b-button type="submit" class="btn-light btn-standard rounded-pill text-primary text-uppercase w-100" variant="white" style="max-width: 150px;">Update</b-button>
            </div>
          </div>
        </div>

        <div class="col-md-8 shadow-inner">
          <div class="p-4">
            <div class="row mb-5">
              <div class="col-md-8">
                <div class="border p-2 rounded">
                  <div class="row border-bottom mb-2 no-gutters pb-2">
                    <div class="col-md-8 d-flex">
                      <img class="mr-2" src="@/assets/icons/payment-card.svg" height="35px" width="35px" />
                    
                      <div class="flex-grow-1 payment-process-details">
                        <span class="d-block" style="font-size: 14px;">Payment Processed On</span>
                        <span class="d-block text-muted" style="font-size: 12px;">Mar 28, 2019 6:55:29 PM</span>
                      </div>
                    </div>

                    <div class="col-md-4 d-flex align-items-center justify-content-end">
                      <b-button
                        class="btn-sm btn-success text-uppercase"
                        variant="white"
                        @click="() => {}"
                      >Paid</b-button>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 text-left" style="font-size: 12px;">Ticket Sales</div>
                    <div class="col-md-6 text-right" style="font-size: 14px;">$60</div>
                  </div>
                  
                  <div class="row">
                    <div class="col-md-6 text-left" style="font-size: 12px;">Gross</div>
                    <div class="col-md-6 text-right" style="font-size: 14px;">$60</div>
                  </div>
                  
                  <div class="row">
                    <div class="col-md-6 text-left" style="font-size: 12px;">Net</div>
                    <div class="col-md-6 text-right" style="font-size: 14px;">USD $60</div>
                  </div>
                </div>
              </div>

              <div class="col-md-4 d-flex align-items-center">
                <div>
                  <div class="mb-2 text-uppercase text-center">
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-standard rounded-pill text-uppercase w-100"
                      v-b-modal="'refund-modal'"
                    >Refund Order</button>
                  </div>
                
                  <div class="mb-2 text-uppercase text-center">
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-standard rounded-pill text-uppercase w-100"
                      @click="() => {}"
                    >Resend Order Confirmation</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12 font-weight-semibold mb-3 text-center text-primary text-uppercase">Attendees</div>

              <div class="col-md-12">
                <attendees-list-component></attendees-list-component>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <refund-modal-component id="refund-modal"></refund-modal-component>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import AttendeesListComponent from './AttendeesListComponent.vue';
import RefundModalComponent from './RefundModalComponent.vue';
import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import InputComponent from '@/components/FormElements/InputComponent.vue';
import TextareaComponent from '@/components/FormElements/TextareaComponent.vue';

@Component({
  components: {
    AttendeesListComponent,
    RefundModalComponent,
    LabelComponent,
    InputComponent,
    TextareaComponent,
  },
})
export default class EditOrderComponent extends Vue {
  @Prop(Object) public readonly editedOrder!: any;
  @Prop(Function) public readonly updateOrder!: any;
  private editedOrderDetails = { ...this.editedOrder };

  private updateOrderDetails() {
    this.updateOrder(this.editedOrderDetails);
  }
}
</script>
