<template>
  <div class="custom-control custom-checkbox">
    <input
      id="ticket-free"
      class="custom-control-input text-muted"
      name="ticket-free"
      type="checkbox"
      v-model="eventFreeTicket"
    >

    <label-component
      class="custom-control-label text-muted"
      for="ticket-free"
      text="Check this box if your ticket is free of cost."
      :isBold="false"
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
export default class EventTicketPriceFreeComponent extends Vue {
  @Prop(Boolean) public readonly value!: boolean;

  get eventFreeTicket() {
    return this.value;
  }

  set eventFreeTicket(value) {
    this.$emit('input', value);
  }
}
</script>
