<template>
  <div>
    <label-component for="event-host-name" text="Host Name"></label-component>

    <input-component
      id="event-host-name"
      placeholder="Enter Host Name"
      v-model="eventHostName"
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
export default class EventHostNameComponent extends Vue {
  @Prop(String) public readonly value !: string;

  get eventHostName() {
    return this.value;
  }

  set eventHostName(value) {
    this.$emit('input', value);
  }
}
</script>
