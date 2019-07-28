<template>
  <div>
    <div>
      <label-component for="event-url" text="Custom Url"></label-component>

      <b-tooltip
        placement="right"
        target="btn-tooltip-event-url"
        title="Enter your event url here"
      ></b-tooltip>

      <a href="#" id="btn-tooltip-event-url" class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 text-white">?</a>
    </div>

    <input-component
      id="event-url"
      placeholder="Enter your event URL"
      :showCharsCount="true"
      v-model="eventURL"
      name="eventURL" 
      :class="(errors.has('eventURL'))? 'input-error' : ''"
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
export default class EventUrlComponent extends Vue {
  @Prop(String) public readonly value!: string;

  get eventURL() {
    return this.value;
  }

  set eventURL(value) {
    this.$emit('input', value);
  }
}
</script>
