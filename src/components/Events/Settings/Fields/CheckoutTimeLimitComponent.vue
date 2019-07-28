<template>
  <div>
    <label-component for="checkout-time-limit" text="Checkout Time Limit"></label-component>

    <div class="mb-2" style="max-width: 200px;">
      <select-component
        id="checkout-time-limit"
        defaultOptionText="Select minutes"
        :options="minutes"
        v-model="timeLimit"
        required
      ></select-component>
    </div>

    <p class="text-muted ml-3">Time to complete the order before selected tickets are returned to inventory.</p>
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
export default class CheckoutTimeLimtComponent extends Vue {
  @Prop(String) public readonly value!: string;

  private minutes = [
    {
      text: '5 minutes',
      value: '300',
    },
    {
      text: '10 minutes',
      value: '600',
    },
    {
      text: '15 minutes',
      value: '900',
    },
    {
      text: '20 minutes',
      value: '1200',
    },
    {
      text: '25 minutes',
      value: '1500',
    },
    {
      text: '30 minutes',
      value: '1800',
    },
  ];

  get timeLimit() {
    return this.value;
  }

  set timeLimit(value: string) {
    this.$emit('input', value);
  }
}
</script>

<style lang="scss" scoped>
p {
  font-size: 12px;
}
</style>
