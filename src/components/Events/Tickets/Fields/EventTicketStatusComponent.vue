<template>
  <div>
    <label-component for="ticket-status" text="Status"></label-component>

    <select-component
      id="ticket-status"
      name="ticket-status"
      :class="(errors.has('ticket-status')) ? 'input-error' : ''"
      defaultOptionText="-- Status of Ticket --"
      :options="statusList"
      v-model="ticketStatus"
      v-validate="'required'"
    ></select-component>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import SelectComponent from '@/components/FormElements/SelectComponent.vue';

@Component({
  components: {
    LabelComponent,
    SelectComponent,
  },
})
export default class EventTicketStatusComponent extends Vue {
  @Prop(String) public readonly value!: string;

  private statusList = [
    {
      text: 'Open',
      value: 'OPEN',
    },
    {
      text: 'Hidden',
      value: 'HIDDEN',
    },
    {
      text: 'Closed',
      value: 'CLOSED',
    },
  ];

  get ticketStatus() {
    return this.value;
  }

  set ticketStatus(value) {
    this.$emit('input', value);
  }
}
</script>
