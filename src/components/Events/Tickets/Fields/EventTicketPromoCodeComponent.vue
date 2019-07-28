<template>
  <div>
    <div class="mb-2">
      <label-component class="mb-0" for="ticket-promo-code" text="Promo Code (If any)"></label-component>

      <b-tooltip
        placement="right"
        target="btn-tooltip-ticket-promo-code"
        title="Enter ticket promo code here"
      ></b-tooltip>

      <a href="#" id="btn-tooltip-ticket-promo-code" class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 text-white">?</a>
    </div>

    <select-component
      id="ticket-promo-code"
      :options="promoCodes"
      v-model="ticketPromoCode"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import SelectComponent from '@/components/FormElements/SelectComponent.vue';

@Component({
  components: {
    LabelComponent,
    SelectComponent,
  },
})
export default class EventTicketPromoCodeComponent extends Vue {
  @Prop(String) public readonly value !: string;

  private promoCodes = [
    {
      text: 'FREE STUFF',
      value: 'FREE STUFF',
    },
    {
      text: 'PROMO 30',
      value: 'PROMO 30',
    },
  ];

  get ticketPromoCode() {
    return this.value;
  }

  set ticketPromoCode(value) {
    this.$emit('input', value);
  }
}
</script>
