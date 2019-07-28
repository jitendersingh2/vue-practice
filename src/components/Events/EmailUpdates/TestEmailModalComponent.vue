<template>
  <b-modal :id="id" ref="modal" centered hide-footer hide-header>
    <div class="p-3">
      <h3 class="mb-4 font-weight-semibold text-center">Test Email</h3>

      <div class="row">
        <div class="col-md">
          <label-component for="test-email-adress" text="Email address"></label-component>

          <input-component
            id="test-email-address"
            class="mb-3"
            placeholder="Enter your email address"
            v-model="emailAddress"
            required
          ></input-component>
        </div>
      </div>

      <div class="row">
        <div class="col text-left">
          <button
            type="button"
            class="btn btn-primary btn-lg rounded-pill text-uppercase w-100"
            @click="sendMail"
          >Send</button>
        </div>

        <div class="col text-right">
          <button
            type="button"
            class="btn btn-secondary btn-lg rounded-pill text-uppercase w-100"
            @click="declineMail"
          >Cancel</button>
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
export default class TestEmailModalComponent extends Vue {
  public $refs!: {
    modal: any;
  };

  @Prop(String) public readonly id!: string;
  @Prop(String) public readonly value!: string;

  get emailAddress() {
    return this.value;
  }

  set emailAddress(value) {
    this.$emit('input', value);
  }

  private sendMail() {
    // Do some processing ...

    this.$emit('send-mail');

    this.$refs.modal.hide();
  }

  private declineMail() {
    this.$refs.modal.hide();
  }
}
</script>

