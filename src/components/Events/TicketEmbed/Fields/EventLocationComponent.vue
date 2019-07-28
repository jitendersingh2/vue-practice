<template>
  <div class="custom-control custom-checkbox">
    <input
      id="show-event-location"
      class="custom-control-input text-muted"
      name="show-event-location"
      type="checkbox"
      v-model="showEventLocation"
    >

    <label-component
      class="custom-control-label"
      for="show-event-location"
      text="Show Event Location"
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
export default class EventLocationComponent extends Vue {
  @Prop(Boolean) public readonly value!: boolean;

  get showEventLocation() {
    return this.value;
  }

  set showEventLocation(value) {
    this.$emit('input', value);
  }
}
</script>
