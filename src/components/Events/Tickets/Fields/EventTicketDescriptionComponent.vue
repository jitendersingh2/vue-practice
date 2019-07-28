<template>
  <div>
    <label-component for="ticket-description" text="Description"></label-component>
    <textarea-component
      id="ticket-description"
      inputClass="rounded-standard-semi"
      placeholder="Enter your description"
      showCharsCount
      v-model="ticketDescription"
    ></textarea-component>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import TextareaComponent from '@/components/FormElements/TextareaComponent.vue';

@Component({
  components: {
    LabelComponent,
    TextareaComponent,
  },
})
export default class EventTicketDescriptionComponent extends Vue {
  @Prop({ default: '<p></p>', type: String }) public value!: string;

  get ticketDescription() {
    return this.value;
  }

  set ticketDescription(value) {
    this.$emit('input', value);
  }
}
</script>
