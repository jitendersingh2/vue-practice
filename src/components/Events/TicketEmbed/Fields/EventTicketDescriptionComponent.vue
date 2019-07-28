<template>
  <div class="custom-control custom-checkbox">
    <input
      id="show-event-ticket-description"
      class="custom-control-input text-muted"
      name="show-event-ticket-description"
      type="checkbox"
      v-model="showEventTicketDescription"
    >

    <label-component
      class="custom-control-label"
      for="show-event-ticket-description"
      text="Show Ticket Description"
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
export default class EventTicketDescriptionComponent extends Vue {
  @Prop(Boolean) public readonly value!: boolean;

  get showEventTicketDescription() {
    return this.value;
  }

  set showEventTicketDescription(value) {
    this.$emit('input', value);
  }
}
</script>
