<template>
  <div>
    <label-component for="company-name" text="Guest Details"></label-component>

    <select-component
      id="company-name"
      defaultOptionText="-- Choose Company Name --"
      :options="companyNames"
      v-model="companyName"
      required
    ></select-component>

    <div class="company-details mt-3 ml-3">
      <p class="font-weight-bold mb-1">Company Name</p>
      <p class="mb-1">Saluation, Johnathan Hills</p>
      <p class="mb-1">johnathan@gmail.com</p>
      <p class="mb-1">347-928-4777</p>
      <p class="mb-1">3501 Briercliff Road, Queens, NY, 11101.</p>
    </div>
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
export default class CompanyNameComponent extends Vue {
  @Prop(String) public readonly value !: string;

  private companyNames = [
    {
      text: 'iDonate',
      value: 'idonate',
    },
  ];

  get companyName() {
    return this.value;
  }

  set companyName(value) {
    this.$emit('input', value);
  }
}
</script>

<style lang="scss" scoped>
.company-details p {
  font-size: 12px;
  line-height: 15px;

  &:not(.font-weight-bold) {
    font-weight: 500;
  }
}
</style>
