<template>
  <div>
    <div>
      <label-component for="event-campaign" text="Campaign"></label-component>
      
      <b-tooltip
        placement="right"
        target="btn-tooltip-event-campaign"
        title="Select your event url here"
      ></b-tooltip>

      <a href="#" id="btn-tooltip-event-campaign" class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 mr-2 text-white">?</a>
    </div>

    <select-component
      id="event-campaign"
      defaultOptionText="-- No Campaign --"      
      v-model="eventCampaign"
      name="eventCampaign"
      v-validate="'required'"
      :class="(errors.has('eventCampaign'))? 'input-error' : ''"
      :options="campaignList"
    >
    </select-component>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { EventApi } from '@/api/EventApi';
import BaseVue from '@/components/BaseVue';

import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import SelectComponent from '@/components/FormElements/SelectComponent.vue';

@Component({
  components: {
    LabelComponent,
    SelectComponent,
  },
})
export default class EventCampaignComponent extends BaseVue {
  @Prop(String) public readonly value!: string;

  private campaignList: any = [];

  private created() {
     this.api.getCampaignList(this.$store.getters.organizationId)
     .then((res: any) => this.campaignList = res.data.organization.campaigns);
  }

  get eventCampaign() {
    return this.value;
  }

  set eventCampaign(value) {
    this.$emit('input', value);
  }
}
</script>
