<template>
  <div>
    <div>
      <label-component for="email-content" text="Content"></label-component>

      <b-tooltip
        placement="right"
        target="btn-email-content"
        title="Enter content for the email here"
      ></b-tooltip>

      <a href="#" id="btn-email-content" class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 text-white">?</a>
    </div>

    <text-editor-component id="email-content" v-model="emailContent"></text-editor-component>
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
export default class EmailContentComponent extends Vue {
  @Prop({ default: '<p></p>', type: String }) public value!: string;

  get emailContent() {
    return this.value;
  }

  set emailContent(value) {
    this.$emit('input', value);
  }
}
</script>
