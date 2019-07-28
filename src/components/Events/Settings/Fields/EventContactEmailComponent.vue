<template>
  <div>
    <label-component for="event-contact-email" text="Contact Email"></label-component>

    <input-component
      id="event-contact-email"
      placeholder="Enter Your Email"
      type="email"
      v-model="eventContactEmail"
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
export default class EventContactEmailComponent extends Vue {
  @Prop(String) public readonly value !: string;

  get eventContactEmail() {
    return this.value;
  }

  set eventContactEmail(value) {
    this.$emit('input', value);
  }
}
</script>
