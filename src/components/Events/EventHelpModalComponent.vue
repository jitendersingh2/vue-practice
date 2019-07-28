<template>
  <b-modal :id="id" ref="modal" centered hide-footer hide-header>
    <form action="#" @submit.prevent="submitForm">
      <div class="p-3">
        <div class="mb-4 text-center">
          <h3 class="font-weight-bold">Event Help</h3>
        </div>

        <div class="mb-3">
          <label-component for="event-help-email-address" text="Email address"></label-component>

          <input-component
            id="event-help-email-address"
            placeholder="Enter your email address"
            v-model="emailAddress"
            required
          ></input-component>
        </div>

        <div class="mb-4">
          <label-component for="event-help-message" text="Message"></label-component>

          <textarea id="event-help-message" class="form-control" cols="30" rows="5" v-model="message"></textarea>
        </div>

        <div class="row">
          <div class="col text-left">
            <button
              type="submit"
              class="btn btn-primary btn-lg rounded-pill text-uppercase w-100"
            >Continue</button>
          </div>

          <div class="col text-right">
            <button
              type="button"
              class="btn btn-secondary btn-lg rounded-pill text-uppercase w-100"
              @click="$refs['modal'].hide()"
            >Cancel</button>
          </div>
        </div>
      </div>
    </form>
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
export default class EventHelpModalComponent extends Vue {
  public $refs!: {
    modal: any;
  };

  @Prop(String) public readonly id!: string;

  private emailAddress: string = '';
  private message: string = '';

  private submitForm() {
    // Do some processing ...

    this.$refs.modal.hide();
  }
}
</script>

