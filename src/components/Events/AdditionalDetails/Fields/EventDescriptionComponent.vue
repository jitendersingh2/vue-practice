<template>
  <div>
    <div>
      <label-component for="event-description" text="Event Description"></label-component>

      <b-tooltip
        placement="right"
        target="btn-tooltip-event-description"
        title="Enter your event description here"
      ></b-tooltip>

      <a href="#" id="btn-tooltip-event-description" class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 text-white">?</a>
    </div>

    <text-editor-component
      id="event-description"
      inputPlaceholder="Enter a brief description regarding your event"
      :showCharsCount="true"
      v-model="eventDescription"
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
export default class EventDescriptionComponent extends Vue {
  @Prop({ default: '<p></p>', type: String }) public value!: string;

  get eventDescription() {
    return this.value;
  }

  set eventDescription(value) {
    this.$emit('input', value);
  }
}
</script>
