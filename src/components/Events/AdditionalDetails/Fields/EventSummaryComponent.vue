<template>
  <div>
    <div>
      <label-component for="event-summary" text="Event Summary"></label-component>

      <b-tooltip
        placement="right"
        target="btn-tooltip-event-summary"
      >
        <img src="@/assets/icons/page.svg">
      </b-tooltip>

      <a href="#" id="btn-tooltip-event-summary" class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 text-white">?</a>
    </div>

    <text-editor-component
      id="event-summary"
      name="event-summary"
      inputPlaceholder="Enter a brief summary regarding your event"
      :class="(errors.has('event-summary')) ? 'input-error' : ''"
      :showCharsCount="true"
      v-validate="'required'"
      v-model="eventSummary"
    ></text-editor-component>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import TextEditorComponent from '@/components/TextEditorComponent.vue';

@Component({
  components: {
    LabelComponent,
    TextEditorComponent,
  },
})
export default class EventSummaryComponent extends Vue {
  @Prop({ default: '<p></p>', type: String }) public value!: string;

  get eventSummary() {
    return this.value;
  }

  set eventSummary(value) {
    this.$emit('input', value);
  }
}
</script>
