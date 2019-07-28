<template>
  <div>
    <div>
      <label-component for="event-name" text="Event name"></label-component>

      <b-tooltip
        placement="right"
        target="btn-tooltip-event-name"
        title="Enter your event name here"
      ></b-tooltip>

      <a href="#" id="btn-tooltip-event-name" class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 text-white">?</a>
    </div>

    <input-component
      id="event-name"
      placeholder="Enter your event name"
      :showCharsCount="true"
      v-model="eventName"
      name="eventName" 
      :class="(errors.has('eventName')) ? 'input-error' : ''"
      v-validate="'required'"
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
export default class EventNameComponent extends Vue {
  @Prop(String) public readonly value !: string;

  get eventName() {
    return this.value;
  }

  set eventName(value) {
    this.$emit('input', value);
  }
}
</script>

