<template>
  <div>
    <div>
      <label-component for="event-peer-to-peer" text="Peer 2 Peer"></label-component>

      <b-tooltip
        placement="right"
        target="btn-tooltip-event-peer-to-peer"
        title="Select your peer to peer here"
      ></b-tooltip>

      <a href="#" id="btn-tooltip-event-peer-to-peer" class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 text-white">?</a>
    </div>

    <select-component
      id="event-peer-to-peer"
      defaultOptionText="Choose Peer To Peer"
      :options="peerToPeerOptions"
      v-model="eventPeerToPeer"
    ></select-component>

    <p class="font-weight-semibold mb-0 mt-2" v-if="isCreateNewP2P">You will be directed to create a new P2P once you are done configuring Event.</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
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
export default class EventPeerToPeerComponent extends BaseVue {
  @Prop({ default: '', type: String }) public readonly value!: string;

  private peerToPeerOptions: any = [];
  private createOption = { text: 'Create Peer2Peer',
                          value: 'create-peer-2-peer' };

  get isCreateNewP2P() {
    return this.eventPeerToPeer === 'b8d3347c-bdc9-423d-ab4d-90a619f4f978';
  }

  private created() {
    this.api.getPeerToPeerList(this.$store.getters.organizationId)
     .then((res) => this.peerToPeerOptions = res.data.organization.p2pPrograms)
     .then(() => this.peerToPeerOptions.unshift(this.createOption));
  }

  get eventPeerToPeer() {
    return this.value;
  }

  set eventPeerToPeer(value) {
    this.$emit('input', value);
  }
}
</script>
