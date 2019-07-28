<template>
  <b-modal :id="id" ref="modal" centered hide-footer hide-header>
    <div>
      <div class="p-3">
        <div class="mb-4 text-center">
          <img src="@/assets/icons/exclaimation.svg">
        </div>

        <h3 class="mb-4 font-weight-semibold text-center">Do you want to<br>create P2P?</h3>

        <div class="row">
          <div class="col text-left">
            <button
              type="button"
              class="btn btn-primary btn-lg rounded-pill text-uppercase w-100"
              @click="createP2P"
            >Yes</button>
          </div>

          <div class="col text-right">
            <button
              type="button"
              class="btn btn-secondary btn-lg rounded-pill text-uppercase w-100"
              @click="declineP2P"
            >No</button>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import InputComponent from '@/components/FormElements/InputComponent.vue';
import LabelComponent from '@/components/FormElements/LabelComponent.vue';

@Component({
  components: {
    InputComponent,
    LabelComponent,
  },
})
export default class CreateP2PModalComponent extends Vue {
  public $refs!: {
    modal: any;
  };

  @Prop(String) public readonly id!: string;

  private createP2P() {
    // Do some processing ...

    this.$emit('create-p2p');

    this.$refs.modal.hide();
  }

  private declineP2P() {
    // Do some processing ...

    this.$emit('declined-p2p');

    this.$refs.modal.hide();
  }
}
</script>

