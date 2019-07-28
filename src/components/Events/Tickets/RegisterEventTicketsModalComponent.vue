<template>
  <b-modal body-class="p-0" :id="id" ref="modal" size="xl" centered tall hide-footer hide-header>
    <div class="close-modal">
      <i class="fas fa-times cursor-pointer text-white" @click="closeModal"></i>
    </div>

    <div v-if="step === 0">
      <div class="jumbotron mb-0">
        <div
          id="event-modal-background"
          :style="{ 'background-image': 'url(' + event.backgroundImage + ')' }"
        ></div>

        <div id="event-modal-header">
          <img class="event-logo mb-3" :src="event.ownerLogo" />

          <p class="font-weight-semibold mb-1 text-uppercase text-white">Impact Project Presents</p>
          <h4 class="font-weight-semibold mb-3 text-light">Back to the Ballpark 2019</h4>

          <div class="d-flex align-items-center justify-content-start mb-3">
            <span class="d-inline-block mr-4">
              <img src="@/assets/icons/calender-time.svg" />
              <span class="font-weight-semibold ml-2 text-light">Sat, Aug 31 3:00 PM</span>
            </span>

            <span class="d-inline-block">
              <img src="@/assets/icons/location-pin.svg" />
              <span class="font-weight-semibold ml-2 text-light">Globelife Park Stadium</span>
            </span>
          </div>

          <p
            class="text-light"
          >Come join us for a night at the ole ballpark. We'll cheer on the Rangers as they launch a new season.</p>
        </div>
      </div>

      <div id="event-ticket-content">
        <div class="row no-gutters">
          <div class="col-md-8 bg-light">
            <div class="bg-white p-3">
              <button
                class="btn btn-transparent font-weight-semibold"
                role="button"
                @click="closeModal"
              >
                <i class="fa fa-chevron-left mr-3"></i> Select Tickets
              </button>
            </div>

            <div class="p-3">
              <purchase-ticket-component
                class="mb-3"
                v-for="(ticket, index) in tickets"
                :index="index"
                :key="ticket.id"
                :ticket="ticket"
                :promoCodes="promoCodes"
                :purchasedTickets="purchaseTickets"
                @add-ticket="addTicket"
                @remove-ticket="removeTicket"
              ></purchase-ticket-component>

              <div class="donation bg-white p-3">
                <div class="row">
                  <div class="col-md">
                    <div>
                      <p class="font-weight-bold">Donation</p>
                      <p class="mb-0">Building Donation</p>
                    </div>
                  </div>

                  <div class="col-md d-flex align-items-center justify-content-end">
                    <div class="flex-even input-with-icon icon-left rounded-pill bg-light">
                      <input
                        name="event-donation"
                        type="text"
                        class="form-control bg-light border-0 rounded-0 pl-5"
                        :class="{ 'border-danger text-danger': errors.has('event-donation') }"
                        placeholder="0.00"
                        v-validate="'decimal:2|min_value:0'"
                        v-model="donation"
                      />

                      <span class="icon">
                        <i class="fas fa-dollar-sign"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md bg-primary">
            <div class="p-3 h-100">
              <div class="d-flex flex-column h-100">
                <div class="flex-grow-1">
                  <h5
                    class="font-weight-semibold mb-0 pt-2 pb-4 text-center text-white border-bottom"
                  >Order Summary</h5>

                  <div class="order-summary">
                    <div
                      class="order d-flex just-content-between text-light border-bottom py-3"
                      v-for="(order, index) in ticketOrders"
                      :index="index"
                      :key="index"
                    >
                      <div class="mr-4">
                        <span class="font-weight-semibold" v-text="order.ticketsCount"></span>
                      </div>

                      <div class="flex-grow-1">
                        <div class="d-flex align-items-center justify-content-between mt-1">
                          <h6 class="mb-0" v-text="order.ticketName"></h6>

                          <span class="d-block">
                            <h6 class="mb-0" style="color: #C4C4C4;" v-if="order.totalDiscount > 0">
                              <strike v-text="parseFloat(order.totalPrice)"></strike>
                            </h6>

                            <h6
                              class="mb-0 text-white"
                              v-text="parseFloat(order.totalPrice)"
                              v-else
                            ></h6>
                          </span>
                        </div>

                        <div class="d-flex align-items-center justify-content-between mt-1">
                          <p class="mb-0" v-text="order.eventDate"></p>
                          <h6
                            class="mb-0 text-white"
                            v-text="parseFloat(order.totalPrice) - parseFloat(order.totalDiscount)"
                            v-if="order.totalDiscount > 0"
                          ></h6>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="subtotal d-flex justify-content-between py-2 text-light">
                    <span>Subtotal</span>
                    <span v-text="orderSubtotal"></span>
                  </div>

                  <div class="tax d-flex justify-content-between py-2 text-light">
                    <span>Tax</span>
                    <span v-text="tax"></span>
                  </div>
                </div>

                <div>
                  <div class="tax d-flex justify-content-between py-2 text-light">
                    <span>Total</span>
                    <span class="font-weight-semibold">$ {{ orderTotal }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="event-ticket-footer" class="p-3">
        <div class="row">
          <div class="col-md-8 d-flex align-items-center">
            <div class="row">
              <div class="col-md-8 d-flex">
                <input
                  type="text"
                  class="form-control form-control-sm d-inline rounded-pill mr-2"
                  placeholder="Enter promo code"
                  v-model="promoCode"
                />

                <button
                  type="button"
                  class="btn btn-primary btn-sm btn-standard d-inline rounded-pill"
                  @click="submitPromoCode"
                >Apply</button>
              </div>
            </div>
          </div>

          <div class="col-md text-right">
            <button
              type="button"
              class="btn btn-primary btn-lg font-weight-semibold rounded-pill text-uppercase w-100"
              :disabled="purchaseTickets.length < 1"
              @click="processTicketPurchase"
            >Continue</button>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="step === 1">
      <div id="event-ticket-content">
        <div class="row no-gutters">
          <div class="col-md-8 bg-white">
            <div class="row no-gutters shadow">
              <div class="col">
                <div class="p-3">
                  <div class="row">
                    <div class="col d-flex align-items-center">
                      <button
                        class="btn btn-transparent font-weight-semibold"
                        role="button"
                        @click="step--"
                      >
                        <i class="fa fa-chevron-left mr-3"></i>
                      </button>
                    </div>

                    <div class="col-8 text-center">
                      <h5>Impact Project Presents</h5>
                      <h4 class="font-weight-semibold mb-0">Back to the Ballpark 2019</h4>
                    </div>

                    <div class="col"></div>
                  </div>

                  <div class="tickets mt-3">
                    <div
                      class="btn btn-primary btn-ticket btn-sm mr-2 rounded-pill cursor-pointer"
                      :class="{ 'is-active': index === activeTicket, 'is-completed': index < activeTicket }"
                      v-for="(ticket, index) in purchaseTickets"
                      :index="index"
                      :key="index"
                    >
                      <img class="icon" src="@/assets/icons/icon-check-rounded.svg" />
                      Ticket {{ index + 1 }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-4">
              <div class="d-flex justify-content-between">
                <h5 class="font-weight-semibold" v-text="purchaseTickets[activeTicket].name"></h5>
                <h5 class="font-weight-semibold" v-text="'$' + purchaseTickets[activeTicket].price"></h5>
              </div>

              <div class="owner-details">
                <div class="row mb-4">
                  <div class="col-md">
                    <label-component class="ml-3" for="ticket-owner-first-name" text="First name"></label-component>
                    <input
                      id="ticket-owner-first-name"
                      name="ticket-owner-first-name"
                      type="text"
                      class="form-control rounded-pill"
                      :class="{ 'border-danger text-danger': errors.has('ticket-owner-first-name') }"
                      placeholder="First name"
                      v-validate="'required'"
                      v-model="purchaseTickets[activeTicket].ownerDetails.firstName"
                    />
                  </div>

                  <div class="col-md">
                    <label-component class="ml-3" for="ticket-owner-last-name" text="Last name"></label-component>
                    <input
                      id="ticket-owner-last-name"
                      name="ticket-owner-last-name"
                      type="text"
                      class="form-control rounded-pill"
                      :class="{ 'border-danger text-danger': errors.has('ticket-owner-last-name') }"
                      placeholder="Last name"
                      v-validate="'required'"
                      v-model="purchaseTickets[activeTicket].ownerDetails.lastName"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md">
                    <label-component class="ml-3" for="ticket-owner-email" text="Email address"></label-component>
                    <input
                      id="ticket-owner-email"
                      name="ticket-owner-email"
                      type="text"
                      class="form-control rounded-pill"
                      :class="{ 'border-danger text-danger': errors.has('ticket-owner-email') }"
                      placeholder="Email address"
                      v-validate="'required|email'"
                      v-model="purchaseTickets[activeTicket].ownerDetails.email"
                    />
                  </div>
                </div>
              </div>

              <div class="questions mt-4">
                <ticket-question-component
                  class="question mb-3"
                  v-for="(question, qIndex) in purchaseTickets[activeTicket].survey.questions"
                  :index="qIndex"
                  :key="qIndex"
                  :question="question"
                ></ticket-question-component>
              </div>
            </div>
          </div>

          <div class="col-md bg-primary">
            <div class="p-3 h-100">
              <div class="d-flex flex-column h-100">
                <div class="flex-grow-1">
                  <h5
                    class="font-weight-semibold mb-0 pt-2 pb-4 text-center text-white border-bottom"
                  >Order Summary</h5>

                  <div class="order-summary">
                    <div
                      class="order d-flex just-content-between text-light border-bottom py-3"
                      v-for="(order, index) in ticketOrders"
                      :index="index"
                      :key="index"
                    >
                      <div class="mr-4">
                        <span class="font-weight-semibold" v-text="order.ticketsCount"></span>
                      </div>

                      <div class="flex-grow-1">
                        <div class="d-flex align-items-center justify-content-between mt-1">
                          <h6 class="mb-0" v-text="order.ticketName"></h6>

                          <span class="d-block">
                            <h6 class="mb-0" style="color: #C4C4C4;" v-if="order.totalDiscount > 0">
                              <strike v-text="parseFloat(order.totalPrice)"></strike>
                            </h6>

                            <h6
                              class="mb-0 text-white"
                              v-text="parseFloat(order.totalPrice)"
                              v-else
                            ></h6>
                          </span>
                        </div>

                        <div class="d-flex align-items-center justify-content-between mt-1">
                          <p class="mb-0" v-text="order.eventDate"></p>
                          <h6
                            class="mb-0 text-white"
                            v-text="parseFloat(order.totalPrice) - parseFloat(order.totalDiscount)"
                            v-if="order.totalDiscount > 0"
                          ></h6>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="subtotal d-flex justify-content-between py-2 text-light">
                    <span>Subtotal</span>
                    <span v-text="orderSubtotal"></span>
                  </div>

                  <div class="tax d-flex justify-content-between py-2 text-light">
                    <span>Tax</span>
                    <span v-text="tax"></span>
                  </div>
                </div>

                <div>
                  <div class="tax d-flex justify-content-between py-2 text-light">
                    <span>Total</span>
                    <span class="font-weight-semibold">$ {{ orderTotal }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="event-ticket-footer" class="p-3">
        <div class="row">
          <div class="col-md-8 d-flex align-items-center">
            <div class="row w-100">
              <div class="col-md-8">
                <div class="custom-control custom-checkbox">
                  <input
                    id="event-ticket-claim-all"
                    class="custom-control-input"
                    type="checkbox"
                    v-model="claimAllTickets"
                  />

                  <label-component
                    class="custom-control-label"
                    for="event-ticket-claim-all"
                    text="Claim All Tickets"
                    :isBold="false"
                  ></label-component>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md text-right">
            <button
              type="button"
              class="btn btn-primary btn-lg font-weight-semibold rounded-pill text-uppercase w-100"
              @click="moveToNextTicket"
              v-if="activeTicket < (purchaseTickets.length - 1)"
            >Next Ticket</button>

            <button
              type="button"
              class="btn btn-primary btn-lg font-weight-semibold rounded-pill text-uppercase w-100"
              @click="moveToBillingDetails"
              v-else
            >Continue</button>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div id="event-ticket-content">
        <div class="row no-gutters">
          <div class="col-md-8 bg-white">
            <div class="row no-gutters shadow">
              <div class="col">
                <div class="p-3">
                  <div class="row">
                    <div class="col d-flex align-items-center">
                      <button
                        class="btn btn-transparent font-weight-semibold"
                        role="button"
                        @click="step--"
                      >
                        <i class="fa fa-chevron-left mr-3"></i>
                      </button>
                    </div>

                    <div class="col-8 text-center">
                      <h5 class="mt-2 mb-0">Billing Details</h5>
                    </div>

                    <div class="col"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-4">
              <div class="billing-details">
                <div class="row mb-3">
                  <div class="col-md">
                    <label for="billing-details-full-name">
                      <span class="font-weight-semibold">Full Name</span> (Card Holder)
                    </label>

                    <input
                      id="billing-details-full-name"
                      name="billing-details-full-name"
                      type="text"
                      class="form-control rounded-pill"
                      :class="{ 'border-danger text-danger': errors.has('billing-details-full-name') }"
                      placeholder="Enter full name"
                      v-validate="'required'"
                    />
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md">
                    <label for="billing-details-email">
                      <span class="font-weight-semibold">Email Address</span>
                    </label>

                    <input
                      id="billing-details-email"
                      name="billing-details-email"
                      type="email"
                      class="form-control rounded-pill"
                      :class="{ 'border-danger text-danger': errors.has('billing-details-email') }"
                      placeholder="Enter email address"
                      v-validate="'required|email'"
                    />
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md">
                    <label for="billing-details-country">
                      <span class="font-weight-semibold">Country</span>
                    </label>

                    <select
                      id="billing-details-country"
                      name="billing-details-country"
                      class="custom-select rounded-pill"
                      :class="{ 'border-danger text-danger': errors.has('billing-details-country') }"
                      v-validate="'required'"
                    >
                      <option value>-- Select Country --</option>
                      <option>India</option>
                      <option>Australia</option>
                    </select>
                  </div>

                  <div class="col-md">
                    <label for="billing-details-state">
                      <span class="font-weight-semibold">State / Prov</span>
                    </label>

                    <select
                      id="billing-details-state"
                      name="billing-details-state"
                      class="custom-select rounded-pill"
                      :class="{ 'border-danger text-danger': errors.has('billing-details-state') }"
                      v-validate="'required'"
                    >
                      <option value>-- Select State --</option>
                      <option>Uttarakhand</option>
                      <option>Uttar Pradesh</option>
                    </select>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md">
                    <label for="billing-details-address">
                      <span class="font-weight-semibold">Address</span>
                    </label>

                    <input
                      id="billing-details-address"
                      name="billing-details-address"
                      type="text"
                      class="form-control rounded-pill"
                      :class="{ 'border-danger text-danger': errors.has('billing-details-address') }"
                      placeholder="Enter address"
                      v-validate="'required'"
                    />
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md">
                    <label for="billing-details-city">
                      <span class="font-weight-semibold">City</span>
                    </label>

                    <input
                      id="billing-details-city"
                      name="billing-details-city"
                      type="text"
                      class="form-control rounded-pill"
                      :class="{ 'border-danger text-danger': errors.has('billing-details-city') }"
                      placeholder="Enter city"
                      v-validate="'required'"
                    />
                  </div>

                  <div class="col-md">
                    <label for="billing-details-postal-code">
                      <span class="font-weight-semibold">Zip / Postal Code</span>
                    </label>

                    <input
                      id="billing-details-postal-code"
                      name="billing-details-postal-code"
                      type="text"
                      class="form-control rounded-pill"
                      :class="{ 'border-danger text-danger': errors.has('billing-details-postal-code') }"
                      v-validate="'required|numeric|min_value=0'"
                      placeholder="Enter Zip / Postal code"
                    />
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md">
                    <label for="billing-details-credit-card">
                      <span class="font-weight-semibold">Credit Card Number</span>
                    </label>

                    <input
                      id="billing-details-credit-card"
                      name="billing-details-credit-card"
                      type="text"
                      class="form-control rounded-pill"
                      :class="{ 'border-danger text-danger': errors.has('billing-details-credit-card') }"
                      placeholder="Enter Card Number"
                      v-validate="'required|numeric|min_value=0'"
                    />
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md">
                    <label for="billing-details-card-expiry">
                      <span class="font-weight-semibold">Expiry</span>
                    </label>

                    <input
                      id="billing-details-card-expiry"
                      name="billing-details-card-expiry"
                      type="text"
                      class="form-control rounded-pill"
                      :class="{ 'border-danger text-danger': errors.has('billing-details-card-expiry') }"
                      placeholder="MM / YY"
                      v-validate="'required'"
                    />
                  </div>

                  <div class="col-md">
                    <label for="billing-details-card-cvv">
                      <span class="font-weight-semibold">CVV</span>
                    </label>

                    <input
                      id="billing-details-card-cvv"
                      name="billing-details-card-cvv"
                      type="text"
                      class="form-control rounded-pill"
                      :class="{ 'border-danger text-danger': errors.has('billing-details-card-cvv') }"
                      placeholder="Enter CVV"
                      v-validate="'required|numeric|min_value=0'"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md bg-primary">
            <div class="p-3 h-100">
              <div class="d-flex flex-column h-100">
                <div class="flex-grow-1">
                  <h5
                    class="font-weight-semibold mb-0 pt-2 pb-4 text-center text-white border-bottom"
                  >Order Summary</h5>

                  <div class="order-summary">
                    <div
                      class="order d-flex just-content-between text-light border-bottom py-3"
                      v-for="(order, index) in ticketOrders"
                      :index="index"
                      :key="index"
                    >
                      <div class="mr-4">
                        <span class="font-weight-semibold" v-text="order.ticketsCount"></span>
                      </div>

                      <div class="flex-grow-1">
                        <div class="d-flex align-items-center justify-content-between mt-1">
                          <h6 class="mb-0" v-text="order.ticketName"></h6>

                          <span class="d-block">
                            <h6 class="mb-0" style="color: #C4C4C4;" v-if="order.totalDiscount > 0">
                              <strike v-text="parseFloat(order.totalPrice)"></strike>
                            </h6>

                            <h6
                              class="mb-0 text-white"
                              v-text="parseFloat(order.totalPrice)"
                              v-else
                            ></h6>
                          </span>
                        </div>

                        <div class="d-flex align-items-center justify-content-between mt-1">
                          <p class="mb-0" v-text="order.eventDate"></p>
                          <h6
                            class="mb-0 text-white"
                            v-text="parseFloat(order.totalPrice) - parseFloat(order.totalDiscount)"
                            v-if="order.totalDiscount > 0"
                          ></h6>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="subtotal d-flex justify-content-between py-2 text-light">
                    <span>Subtotal</span>
                    <span v-text="orderSubtotal"></span>
                  </div>

                  <div class="tax d-flex justify-content-between py-2 text-light">
                    <span>Tax</span>
                    <span v-text="tax"></span>
                  </div>
                </div>

                <div>
                  <div class="tax d-flex justify-content-between py-2 text-light">
                    <span>Total</span>
                    <span class="font-weight-semibold">$ {{ orderTotal }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="event-ticket-footer" class="p-3">
        <div class="row">
          <div class="col-md-8 d-flex align-items-center">
            <div class="row w-100">
              <div class="col-md-8">
                <div class="custom-control custom-checkbox">
                  <input id="event-ticket-accept-tac" class="custom-control-input" type="checkbox" />

                  <label class="custom-control-label" for="event-ticket-accept-tac">
                    Accept
                    <a href="#">Terms &amp; Conditions</a>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md text-right">
            <button
              type="button"
              class="btn btn-primary btn-lg font-weight-semibold rounded-pill text-uppercase w-100"
              @click="registerTicket"
            >Get Tickets</button>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script lang="ts">
import _ from 'lodash';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import ITicket from './ITicket';

import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import PurchaseTicketComponent from './PurchaseTicketComponent.vue';
import TicketQuestionComponent from './TicketQuestionComponent.vue';

@Component({
  components: {
    LabelComponent,
    PurchaseTicketComponent,
    TicketQuestionComponent,
  },
})
export default class RegisterEventTicketsModalComponent extends Vue {
  public $refs!: {
    modal: any;
  };

  @Prop(String) public readonly eventId!: string;
  @Prop(String) public readonly id!: string;

  private event = {
    backgroundImage: require('@/assets/images/demo-event-background.jpeg'),
    ownerLogo: require('@/assets/images/demo-event-owner-logo.png'),
  };
  private promoCode: string = '';
  private promoCodes: string[] = [];
  private tickets: ITicket[] = [
    {
      id: 1,
      name: 'Advanced Child',
      ownerDetails: {
        firstName: '',
        lastName: '',
        email: '',
      },
      quantity: 5,
      startSelling: new Date().toISOString(),
      stopSelling: new Date().toISOString(),
      promoCode: 'FREE AC',
      promoCodeDiscountRate: 5,
      price: '25.00',
      showRemainingCount: true,
      status: 'OPEN',
      survey: {
        id: 1,
        name: 'Survey 1',
        questions: [
          {
            answer: '',
            isRequired: false,
            options: [
              {
                value: 'Hot Dog',
              },

              {
                value: 'Hamburger',
              },

              {
                value: 'Pizza',
              },
            ],
            title: 'Type of meal',
            type: 'multiple-choice',
          },

          {
            answer: '',
            isRequired: true,
            options: [
              {
                value: 'S',
              },

              {
                value: 'M',
              },

              {
                value: 'L',
              },
            ],
            title: 'T-Shirt Size',
            type: 'multiple-choice',
          },
        ],
      },
    },

    {
      id: 2,
      name: 'Advanced Adult',
      ownerDetails: {
        firstName: '',
        lastName: '',
        email: '',
      },
      quantity: 5,
      startSelling: new Date().toISOString(),
      stopSelling: new Date().toISOString(),
      promoCode: 'FREE AD',
      promoCodeDiscountRate: 5,
      price: '25.00',
      showRemainingCount: false,
      status: 'OPEN',
      survey: {
        id: 2,
        name: 'Survey 2',
        questions: [
          {
            answer: '',
            isRequired: false,
            options: [
              {
                value: 'Hot Dog',
              },

              {
                value: 'Hamburger',
              },

              {
                value: 'Pizza',
              },
            ],
            title: 'Type of meal',
            type: 'multiple-answers',
          },

          {
            answer: '',
            isRequired: true,
            options: [],
            title: 'Favorite Colour ___',
            type: 'fill-in-the-blank',
          },
        ],
      },
    },

    {
      id: 3,
      name: 'General Child',
      ownerDetails: {
        firstName: '',
        lastName: '',
        email: '',
      },
      quantity: 5,
      startSelling: new Date().toISOString(),
      stopSelling: new Date().toISOString(),
      promoCode: 'FREE GC',
      promoCodeDiscountRate: 5,
      price: '35.00',
      showRemainingCount: false,
      status: 'OPEN',
      survey: {
        id: 3,
        name: 'Survey 3',
        questions: [
          {
            answer: '',
            isRequired: false,
            options: [
              {
                value: 'Hot Dog',
              },

              {
                value: 'Hamburger',
              },

              {
                value: 'Pizza',
              },
            ],
            title: 'Type of meal',
            type: 'multiple-answers',
          },

          {
            answer: '',
            isRequired: true,
            options: [],
            title: 'Favorite Colour ___',
            type: 'fill-in-the-blank',
          },
        ],
      },
    },

    {
      id: 4,
      name: 'General Adult',
      ownerDetails: {
        firstName: '',
        lastName: '',
        email: '',
      },
      quantity: 5,
      startSelling: new Date().toISOString(),
      stopSelling: new Date().toISOString(),
      promoCode: 'FREE GA',
      promoCodeDiscountRate: 5,
      price: '25.00',
      showRemainingCount: false,
      status: 'OPEN',
      survey: {
        id: 4,
        name: 'Survey 4',
        questions: [
          {
            answer: '',
            isRequired: false,
            options: [
              {
                value: 'Hot Dog',
              },

              {
                value: 'Hamburger',
              },

              {
                value: 'Pizza',
              },
            ],
            title: 'Type of meal',
            type: 'multiple-answers',
          },

          {
            answer: '',
            isRequired: true,
            options: [],
            title: 'Write something about you',
            type: 'textarea',
          },
        ],
      },
    },
  ];

  private donation: string = '';
  private purchaseTickets: ITicket[] = [];
  private tax: number = 25;

  private claimAllTickets: boolean = false;
  private activeTicket = 0;
  private step = 0;

  get orderSubtotal() {
    const totalPrice = _.sumBy(this.ticketOrders, 'totalPrice');
    const totalDiscount = _.sumBy(this.ticketOrders, 'totalDiscount');

    return totalPrice - totalDiscount;
  }

  get orderTotal() {
    let donation = parseFloat(this.donation);

    donation = isNaN(donation) ? 0 : donation;

    return this.orderSubtotal + this.tax + donation;
  }

  get ticketOrders() {
    const orders = _.groupBy(this.purchaseTickets, 'id');
    const result: object[] = [];

    for (const id in orders) {
      if (!orders.hasOwnProperty(id)) {
        continue;
      }

      const ticket = orders[id][0];
      const totalDiscount = this.getTicketDiscount(ticket) * orders[id].length;

      const order = {
        eventDate: '25.00 Sat, Aug 31 2019',
        ticketsCount: orders[id].length,
        ticketName: ticket.name,
        totalDiscount,
        totalPrice: _.sumBy(orders[id], (t) => parseFloat(t.price)),
      };

      result.push(order);
    }

    return result;
  }

  @Watch('claimAllTickets')
  public monitorClaimAllTickets(claimAll: boolean) {
    if (claimAll) {
      const firstTicket = this.purchaseTickets[0];

      this.purchaseTickets.forEach((ticket, index) => {
        if (index === 0) {
          return;
        }

        this.$set(
          this.purchaseTickets[index],
          'ownerDetails',
          firstTicket.ownerDetails,
        );

        if (ticket.id === firstTicket.id) {
          this.$set(this.purchaseTickets[index], 'survey', firstTicket.survey);
        }
      });
    }
  }

  private addTicket(ticket: ITicket) {
    this.purchaseTickets.push(ticket);
  }

  private getTicketDiscount(ticket: ITicket) {
    let discount = 0;

    if (ticket.promoCode.length > 0) {
      const coupon = this.promoCodes.findIndex(
        (promoCode) => promoCode === ticket.promoCode,
      );

      if (coupon > -1) {
        const promoCodeDiscount = parseFloat(ticket.promoCodeDiscountRate);
        const amount = parseFloat(ticket.price);

        discount = (amount / 100) * promoCodeDiscount;
      }
    }

    return discount;
  }

  private processTicketPurchase() {
    const promises: any = [];
    promises.push(this.$validator.validateAll());

    Promise.all(promises).then((validations) => {
      // If one validation has failed, we stop here
      if (validations.some((validation) => validation === false)) { return; }

      if (this.step === 0) {
        this.step++;
      }
    });
  }

  private moveToBillingDetails() {
    const promises: any = [];
    promises.push(this.$validator.validateAll());

    Promise.all(promises).then((validations) => {
      // If one validation has failed, we stop here
      if (validations.some((validation) => validation === false)) { return; }

      this.step++;
    });
  }

  private moveToNextTicket() {
    const promises: any = [];
    promises.push(this.$validator.validateAll());

    Promise.all(promises).then((validations) => {
      // If one validation has failed, we stop here
      if (validations.some((validation) => validation === false)) { return; }

      this.activeTicket++;
    });
  }

  private removeTicket(ticket: ITicket) {
    const index = this.purchaseTickets.findIndex(
      (pTicket) => pTicket.id === ticket.id,
    );

    this.purchaseTickets.splice(index, 1);
  }

  private registerTicket() {
    const promises: any = [];
    promises.push(this.$validator.validateAll());

    Promise.all(promises).then((validations) => {
      // If one validation has failed, we stop here
      if (validations.some((validation) => validation === false)) { return; }

      //
    });
  }

  private submitForm() {
    // Do some processing ...

    this.closeModal();
  }

  private submitPromoCode() {
    this.promoCodes.push(this.promoCode);
    this.promoCode = '';
  }

  private closeModal() {
    this.$refs.modal.hide();
  }
}
</script>

<style lang="scss" scoped>
.jumbotron {
  padding: 3rem 4rem 0.5rem;
  position: relative;

  #event-modal-background {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    overflow: hidden;

    &::after {
      content: "";
      background-color: rgba(0, 0, 0, 0.6);
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
    }
  }

  #event-modal-header {
    max-width: 460px;
    position: relative;
    z-index: 999;

    .event-logo {
      max-width: 160px;
    }
  }
}

.donation .input-with-icon {
  max-width: 100px;

  .icon {
    top: 7px;
  }
}

.tickets {
  .btn-ticket {
    padding: 5px 15px;
    position: relative;

    .icon {
      display: none;
      position: absolute;
      right: -2px;
      top: -5px;
    }

    &.is-active,
    &.is-completed {
      .icon {
        display: block;
      }
    }
  }
}

.billing-details,
.owner-details,
.questions {
  max-width: 500px;
}

select {
  -moz-appearance: none;
}

.close-modal {
  position: absolute;
  right: 10px;
  top: 5px;
  z-index: 9;
}
</style>
