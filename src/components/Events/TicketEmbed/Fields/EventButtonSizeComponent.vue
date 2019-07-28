<template>
  <div>
    <label-component for="event-button-size" text="Button Size"></label-component>

    <select-component
      id="event-button-size"
      :options="buttonSizes"
      v-model="eventButtonSize"
      required
    ></select-component>
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
export default class EventButtonSizeComponent extends Vue {
  @Prop(String) public readonly value!: string;

  private buttonSizes = [
    {
      text: 'Small',
      value: 'small',
    },
    {
      text: 'Medium',
      value: 'medium',
    },
    {
      text: 'Large',
      value: 'large',
    },
  ];

  get eventButtonSize() {
    return this.value;
  }

  set eventButtonSize(value) {
    this.$emit('input', value);
  }
}
</script>
