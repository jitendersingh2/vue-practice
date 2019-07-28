<template>
  <div>
    <label-component for="ticket-name" text="Ticket Name"></label-component>

    <input-component
      id="ticket-name"
      name="ticket-name"
      :class="(errors.has('ticket-name')) ? 'input-error' : ''"
      placeholder="Enter Your Ticket Name"
      :showCharsCount="true"
      v-model="ticketName"
      v-validate="'required'"
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
export default class EventTicketNameComponent extends Vue {
  @Prop(String) public readonly value !: string;

  get ticketName() {
    return this.value;
  }

  set ticketName(value) {
    this.$emit('input', value);
  }
}
</script>
