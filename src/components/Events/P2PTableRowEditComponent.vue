<template>
  <div>
    <form action="#" method="POST" @submit.prevent="updateEmailDetails">
      <div class="border-bottom row no-gutters">
        <div class="col-md-12 bg-grey">
          <div class="p-3">
            
            <div class="mb-12 text-right">
              <b-button class="table-btn table-btn-test btn-primary btn-sm btn-standard rounded-pill text-white w-100" variant="white" @click="sendTestEmail()">Test</b-button>
              <b-button type="submit" class="table-btn btn-primary btn-sm btn-standard rounded-pill text-white w-100" variant="white">Save</b-button>
            </div>
            
            <div class="mb-12">
              <label-component class="" for="subject-line" text="Subject Line"></label-component>

              <input-component
                id="subject-line"
                readonly="true"
                placeholder="Enter your first name"
                inputClass="bg-white"
                v-model="editedEmailDetails.emailSubject"
                required
              ></input-component>
            </div>

            <div class="mb-12">
              <label-component class="" for="email-body" text="Email Body"></label-component>
            
              <textarea-component
                id="email-body"
                placeholder="Enter Email Body"
                inputClass="bg-white email-body p-3"
                v-model="editedEmailDetails.emailBody"
              ></textarea-component>
            </div>
          </div>
        </div>
      </div>
    </form>
    <p-2-p-modal-component id="test-modal" content="A test email has been sent to your mail id"></p-2-p-modal-component>
    <p-2-p-modal-component id="save-modal" content="The data has been saved successfully"></p-2-p-modal-component>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import InputComponent from '@/components/FormElements/InputComponent.vue';
import TextareaComponent from '@/components/FormElements/TextareaComponent.vue';

import P2PModalComponent from './P2PModalComponent.vue';

@Component({
  components: {
    P2PModalComponent,
    LabelComponent,
    InputComponent,
    TextareaComponent,
  },
})
export default class P2PTableRowEditComponent extends Vue {
  @Prop(String) public readonly type!: any;
  @Prop(Object) public readonly editEmail!: any;
  @Prop(Function) public readonly updateEmail!: any;
  @Prop(Function) public readonly sendEmail!: any;
  private editedEmailDetails = { ...this.editEmail };

  private updateEmailDetails() {
    this.updateEmail(this.editedEmailDetails, this.type);
  }

  private sendTestEmail() {
    this.sendEmail(this.editedEmailDetails);
  }
}
</script>

<style lang="scss" scoped>
.bg-grey {
  background-color: rgba(222, 222, 222, 0.5);
  border-color: rgba(222, 222, 222, 0.5);
}
.table-btn {
  max-width: 100px;
  max-height: 25px;
}
.table-btn-test {
  margin-right: 20px;
}
</style>
