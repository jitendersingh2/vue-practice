<template>
  <div>
    <div class="row">
      <div class="col">
        <label-component for="ticket-quantity" text="Quantity"></label-component>
      </div>

      <div class="col text-right">
        <div class="custom-control custom-checkbox">
          <input
            id="ticket-quantity-unlimited"
            class="custom-control-input text-muted"
            name="ticket-quantity-unlimited"
            type="checkbox"
            v-model="isUnlimited"
          >

          <label-component
            class="custom-control-label text-muted"
            for="ticket-quantity-unlimited"
            text="No limit"
            :isBold="false"
          ></label-component>
        </div>
      </div>
    </div>

    <input
      id="ticket-quantity"
      class="form-control rounded-pill border"
      name="ticket-quantity"
      type="number"
      min="1"
      placeholder="Enter no. of Tickets"
      :disabled="isUnlimited"
      v-model="ticketQuantity"
      required
    >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import LabelComponent from '@/components/FormElements/LabelComponent.vue';

@Component({
  components: {
    LabelComponent,
  },
})
export default class EventTicketQuantityComponent extends Vue {
  @Prop(String) public readonly value !: string;

  private isUnlimited: boolean = false;

  get ticketQuantity() {
    return this.value;
  }

  set ticketQuantity(value) {
    this.$emit('input', value);
  }

  @Watch('isUnlimited')
  public monitorUnlimitedTickets(isUnlimited: boolean) {
    if (isUnlimited) {
      this.$emit('input', 'unlimited');
    } else {
      this.$emit('input', '1');
    }
  }

  @Watch('value', { immediate: true })
  public monitorLimitedTickets(value: string) {
    this.isUnlimited = value === 'unlimited';
  }
}
</script>
