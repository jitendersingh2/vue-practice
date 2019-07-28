<template>
  <div>
    <div>
      <label-component for="event-tac" text="Terms &amp; Conditions"></label-component>

      <b-tooltip
        placement="right"
        target="btn-tooltip-event-tac"
        title="Enter your terms and conditions here"
      ></b-tooltip>

      <a href="#" id="btn-tooltip-event-tac" class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 text-white">?</a>
    </div>

    <text-editor-component id="event-tac" v-model="eventTac"></text-editor-component>
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
export default class EventTacComponent extends Vue {
  @Prop({ default: '<p></p>', type: String }) public value!: string;

  get eventTac() {
    return this.value;
  }

  set eventTac(value) {
    this.$emit('input', value);
  }
}
</script>
