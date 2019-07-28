<template>
  <div>
    <label-component for="email-subject" text="Subject"></label-component>

    <input-component
      id="email-subject"
      placeholder="Enter subject here"
      v-model="emailSubject"
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
export default class EmailSubjectComponent extends Vue {
  @Prop(String) public readonly value !: string;

  get emailSubject() {
    return this.value;
  }

  set emailSubject(value) {
    this.$emit('input', value);
  }
}
</script>
