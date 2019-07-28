<template>
  <div>
    <div class="row">
      <div class="col-md">
        <label-component for="event-tax-rate" text="Tax Rates"></label-component>
        
        <input-component
          :input-class="{ 'border-danger text-danger': errors.has('event-tax-rate') }"
          id="event-tax-rate"
          name="event-tax-rate"
          placeholder="% Enter Tax Rate"
          v-validate="'required|decimal:2|min_value:0'"
          v-model="eventTaxRate"
          required
        ></input-component>
      </div>

      <div class="col-md">
        <label-component for="event-tax-number" text="Tax Number"></label-component>

        <input-component
          :input-class="{ 'border-danger text-danger': errors.has('event-tax-number') }"
          id="event-tax-number"
          name="event-tax-number"
          placeholder="Enter Tax Number"
          v-validate="'required|numeric|min_value:0'"
          v-model="eventTaxNumber"
          required
        ></input-component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ITax from '@/components/Events/Settings/ITax';

import InputComponent from '@/components/FormElements/InputComponent.vue';
import LabelComponent from '@/components/FormElements/LabelComponent.vue';

@Component({
  components: {
    InputComponent,
    LabelComponent,
  },
})
export default class EventTaxComponent extends Vue {
  @Prop(Object) public readonly value !: ITax;

  get eventTaxRate() {
    return this.value.taxRate;
  }

  set eventTaxRate(taxRate: string) {
    const data: ITax = {
      taxRate,
      taxNumber: this.eventTaxNumber,
    };

    this.$emit('input', data);
  }

  get eventTaxNumber() {
    return this.value.taxNumber;
  }

  set eventTaxNumber(taxNumber: string) {
    const data: ITax = {
      taxRate: this.eventTaxRate,
      taxNumber,
    };

    this.$emit('input', data);
  }
}
</script>
