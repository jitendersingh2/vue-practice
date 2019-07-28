<template>
  <div class="custom-control custom-checkbox">
    <input
      id="show-event-time"
      class="custom-control-input text-muted"
      name="show-event-time"
      type="checkbox"
      v-model="showEventTime"
    >

    <label-component
      class="custom-control-label"
      for="show-event-time"
      text="Show Event Time"
    ></label-component>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import LabelComponent from '@/components/FormElements/LabelComponent.vue';

@Component({
  components: {
    LabelComponent,
  },
})
export default class EventTimeComponent extends Vue {
  @Prop(Boolean) public readonly value!: boolean;

  get showEventTime() {
    return this.value;
  }

  set showEventTime(value) {
    this.$emit('input', value);
  }
}
</script>
