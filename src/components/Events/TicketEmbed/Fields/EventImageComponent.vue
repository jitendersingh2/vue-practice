<template>
  <div class="custom-control custom-checkbox">
    <input
      id="show-event-image"
      class="custom-control-input text-muted"
      name="show-event-image"
      type="checkbox"
      v-model="showEventImage"
    >

    <label-component
      class="custom-control-label"
      for="show-event-image"
      text="Show Event Image"
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
export default class EventImageComponent extends Vue {
  @Prop(Boolean) public readonly value!: boolean;

  get showEventImage() {
    return this.value;
  }

  set showEventImage(value) {
    this.$emit('input', value);
  }
}
</script>
