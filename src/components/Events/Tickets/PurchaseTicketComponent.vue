<template>
  <div class="ticket bg-white p-3">
    <div class="d-flex align-items-center justify-content-between">
      <div>
        <div>
          <p class="font-weight-bold">
            {{ ticket.name }}

            <span class="text-primary ml-2" style="font-size: 10px; font-weight: 500;" v-if="hasDiscount">${{ discountedAmount }} Discount Applied</span>
          </p>
        </div>

        <div class="d-flex align-items-center">
          <h5 class="mb-0" v-if="hasDiscount"><strike>$ {{ ticket.price }}</strike></h5>
          <h5 class="mb-0" v-else>$ {{ ticket.price }}</h5>

          <h5 class="mb-0 ml-3" v-if="hasDiscount">$ {{ parseFloat(ticket.price) - discountedAmount }}</h5>
        </div>
      </div>

      <div class="d-flex align-items-center justify-content-end">
        <div style="width: 100px;" v-if="isTicketSold">
          <button type="button" class="btn btn-secondary rounded-0 w-100" disabled>Sold Out</button>
        </div>

        <div style="width: 100px;" v-else-if="! isTicketPurchased">
          <button type="button" class="btn btn-primary rounded-0 w-100" @click="addTicket">Add</button>
        </div>

        <div class="d-flex align-items-center" v-else>
          <span
            class="badge badge-primary py-1 px-2 mr-2"
            v-text="remainingTickets + ' Remaining'"
            v-if="ticket.showRemainingCount"
          ></span>

          <div style="width: 100px;">
            <span
              class="btn btn-sm rounded-circle border border-primary cursor-pointer"
              @click="removeTicket"
            >
              <i class="fa fa-minus text-primary"></i>
            </span>

            <span class="font-weight-semibold mx-3" v-text="timesTicketPurchased"></span>

            <span
              class="btn btn-sm rounded-circle border border-primary cursor-pointer"
              @click="addTicket"
              v-if="this.remainingTickets > 0"
            >
              <i class="fa fa-plus text-primary"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ITicket from './ITicket';

@Component
export default class PurchaseTicketComponent extends Vue {
  @Prop(Array) public readonly promoCodes!: string[];
  @Prop(Array) public readonly purchasedTickets!: ITicket[];
  @Prop(Object) public readonly ticket!: ITicket;

  get discountedAmount() {
    let discount = 0;

    if (this.ticket.promoCode.length > 0) {
      const coupon = this.promoCodes.findIndex((promoCode) => promoCode === this.ticket.promoCode);

      if (coupon > -1) {
        const promoCodeDiscount = parseFloat(this.ticket.promoCodeDiscountRate);
        const amount = parseFloat(this.ticket.price);

        discount = (amount / 100) * promoCodeDiscount;
      }
    }

    return discount;
  }

  get hasDiscount() {
    return this.discountedAmount > 0;
  }

  get remainingTickets() {
    return this.ticket.quantity as number - this.timesTicketPurchased;
  }

  get isTicketPurchased() {
    return !!(
      this.purchasedTickets.findIndex((ticket) => ticket.id === this.ticket.id) >
      -1
    );
  }

  get isTicketSold() {
    return !!(this.ticket.quantity < 1);
  }

  get timesTicketPurchased() {
    return this.purchasedTickets.filter((ticket) => ticket.id === this.ticket.id)
      .length;
  }

  private addTicket() {
    this.$emit('add-ticket', this.ticket);
  }

  private removeTicket() {
    this.$emit('remove-ticket', this.ticket);
  }
}
</script>

<style lang="scss" scoped>
.ticket {
  border-radius: 10px;
}
</style>
