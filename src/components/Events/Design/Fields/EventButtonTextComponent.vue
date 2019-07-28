<template>
  <div>
    <div class="mb-2">
      <label-component for="event-button-text" text="Button Text"></label-component>
    
      <b-tooltip
        placement="right"
        target="btn-tooltip-event-button-text"
        title="Enter your event button text here"
      ></b-tooltip>

      <a href="#" id="btn-tooltip-event-button-text" class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 text-white">?</a>
    </div>

    <input-component
      id="event-button-text"
      placeholder="Enter button text here"
      v-model="eventButtonText"
      required
    ></input-component>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import InputComponent from '@/components/FormElements/InputComponent.vue';
import LabelComponent from '@/components/FormElements/LabelComponent.vue';

@Component({
  components: {
    InputComponent,
    LabelComponent,
  },
})
export default class EventButtonTextComponent extends Vue {
  @Prop(String) public readonly value !: string;

  get eventButtonText() {
    return this.value;
  }

  set eventButtonText(value) {
    this.$emit('input', value);
  }
}
</script>
