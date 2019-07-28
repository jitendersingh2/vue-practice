<template>
  <div>
    <label-component for="event-donation" text="Event Donation Form"></label-component>

    <select-component
      id="event-donation"
      defaultOptionText="Embed"
      :options="embedList"
      v-model="eventEmbed"
    ></select-component>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import SelectComponent from '@/components/FormElements/SelectComponent.vue';
import { EventApi } from '@/api/EventApi';
import BaseVue from '@/components/BaseVue';

@Component({
  components: {
    LabelComponent,
    SelectComponent,
  },
})
export default class EventEmbedsComponent extends BaseVue {
  @Prop({ default: '', type: String }) public readonly value!: string;

  private embedList: any = [];

  private created() {
     this.api.getEmbedList(this.$store.getters.organizationId)
     .then((res: any) => this.embedList = res.data.organization.embeds);
  }

  get eventEmbed() {
    return this.value;
  }

  set eventEmbed(value) {
    this.$emit('input', value);
  }
}
</script>
