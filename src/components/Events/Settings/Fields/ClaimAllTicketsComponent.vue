<template>
  <div>
    <label-component for="claim-all-tickets" text="Claim Tickets"></label-component>

    <div class="row mb-3">
      <div class="col d-flex align-items-center">
        <p class="mb-0 mt-1 text-muted">Allow the buyer to claim all tickets</p>
      </div>

      <div class="col-md-2 text-right">
        <toggle-button class="mb-0" :labels="btnToggleLabels" v-model="claimTickets"/>
      </div>
    </div>

    <p class="text-muted">Give buyers the option to copy details to all tickets in an order.</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ToggleButton } from 'vue-js-toggle-button';

import LabelComponent from '@/components/FormElements/LabelComponent.vue';

@Component({
  components: {
    LabelComponent,
    ToggleButton,
  },
})
export default class ClaimAllTicketsComponent extends Vue {
  @Prop(Boolean) public readonly value!: boolean;

  private btnToggleLabels = {
    checked: 'ON',
    unchecked: 'OFF',
  };

  get claimTickets() {
    return this.value;
  }

  set claimTickets(value: boolean) {
    this.$emit('input', value);
  }
}
</script>

<style lang="scss" scoped>
p {
  font-size: 12px;
}
</style>
