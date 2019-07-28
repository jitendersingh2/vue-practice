<template>
  <form action="#" method="POST" @submit.prevent="updateSupportStaff">
    <div class="row no-gutters border rounded-standard shadow-standard">
      <div class="col-md">
        <div class="row grid-header p-3 btn-collapse text-secondary font-weight-semibold">
            <div class="text-right col-md-8">
                <h5>Who Can Participate Reach Out To?</h5>
            </div>
            <div class="text-right col-md-4">
              <span class="text-secondary cursor-pointer" @click="toggleContentVisibility()"><i class="fa fa-chevron-up"></i></span>
            </div>
        </div>
        <div class="px-4 py-3 px-md-5 py-md-4">
          <h4 class="font-weight-semibold mb-4">Email the Team when?</h4>
          <div class="row mb-4">
            <div class="col-md-6">
              <span>A New Registration is Created</span>
              <toggle-button class="mb-0 ml-4" :labels="btnToggleLabels" v-model="communicationAndSharingDetails.isRegistrationCreated" @change="toggleDefinedGoals($event.value, 'isRegistrationCreated')" />
            </div>
            <div class="col-md-6">
              <span>A Participant meets their defined Funding Goals</span>
              <toggle-button class="mb-0 ml-4" :labels="btnToggleLabels" v-model="communicationAndSharingDetails.isParticipantMeetTheirDefinedGoals" @change="toggleDefinedGoals($event.value, 'isParticipantMeetTheirDefinedGoals')" />
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-md-6">
              <span>A Participant meets their Funding Goals</span>
              <toggle-button class="mb-0 ml-4" :labels="btnToggleLabels" v-model="communicationAndSharingDetails.isParticipantMeetTheirGoals" @change="toggleDefinedGoals($event.value, 'isParticipantMeetTheirGoals')" />
            </div>
            <div class="col-md-6 amount-input">
              <!-- <img
                class="ml-2 text-muted rounded-standard"
                src="@/assets/icons/usd-currency.jpg"
                height="16px"
                width="16px"
              /> -->
              <input-component
                id="funding-amount"
                name="funding-amount"
                placeholder="Amount in USD"
                :inputClass="{
                  'border-danger text-danger': errors.has('funding-amount'),
                  'bg-white': true
                }"
                v-model="communicationAndSharingDetails.amount"
                v-validate="'numeric'"
                :disabled="isAmountDisabled"
                @input="toggleDefinedGoals($event, 'amount')"
                required
              ></input-component>
            </div>
          </div>
          <div class="row">
            <div class="col-md-10">
              <label-component class="" for="support-staff-email" text="Enter one or more email addresses. You can adjust email settings per user."></label-component>
              <input-component
                id="support-staff-email"
                name="support-staff-email"
                placeholder="Enter the mail Address"
                type="email"
                :inputClass="{
                  'border-danger text-danger': errors.has('support-staff-email'),
                  'bg-white': true
                }"
                v-validate="'email'"
                v-model="emailAddress"
                required
              ></input-component>
            </div>
            <div class="col-md-2 pt-2">
              <b-button type="submit" class="mt-4 table-btn btn-primary btn-sm btn-standard rounded-pill text-white text-uppercase w-100" variant="white">Add</b-button>
            </div>
          </div>
        </div>
        <div class="row m-0">
          <h5 class="font-weight-semibold mb-2 mt-3 pl-30">Support Staff</h5>
          <b-table
            head-variant="light"
            :responsive="true"
            :items="communicationAndSharingDetails.supportStaff"
            :fields="fields"
          >
            <template slot="email" slot-scope="data">
              <div class="text-left">
                <div class="font-weight-semibold">{{ data.item.email }}</div>
              </div>
            </template>

            <template slot="options" slot-scope="data">
              <span class="text-right btn btn-white btn-sm rounded-circle text-primary mx-2">
                <i v-if="!data.item._showDetails" class="fas fa-pencil-alt cursor-pointer" @click="data.toggleDetails"></i>
                <i v-if="!data.item._showDetails" class="ml-3 fas fa-trash-alt cursor-pointer" v-b-modal="'p2p-delete-modal'"></i>
                <i v-if="data.item._showDetails" class="fas fa-chevron-up cursor-pointer" @click="data.toggleDetails"></i>
              </span>
            </template>
        
            <template slot="row-details" slot-scope="row">
              <div class="border-bottom row no-gutters m-0">
                <div class="col-md-12 bg-grey">
                  <div class="row p-3">
                    <div class="col-md-10">
                      <label-component class="" for="support-staff-edit-email" text="Edit Email"></label-component>
                      <input-component
                        id="support-staff-edit-email"
                        name="support-staff-edit-email"
                        placeholder="Enter the mail Address"
                        type="email"
                        :inputClass="{
                          'border-danger text-danger': errors.has('support-staff-edit-email'),
                          'bg-white': true
                        }"
                        v-validate="'email'"
                        v-model="row.item.email"
                        required
                      ></input-component>
                    </div>
                    <div class="col-md-2 pt-2">
                      <b-button type="submit" class="mt-4 table-btn btn-primary btn-sm btn-standard rounded-pill text-white w-100" variant="white">Save</b-button>
                    </div>
                  </div>
                </div>
              </div> 
            </template>
          </b-table>
        </div>
      </div>
    </div>
    <p-2-p-delete-modal-component id="p2p-delete-modal" @click="deleteSupportStaff"></p-2-p-delete-modal-component>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ToggleButton } from 'vue-js-toggle-button';
import BaseEventVue from '@/components/Events/BaseEventVue';
import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import InputComponent from '@/components/FormElements/InputComponent.vue';
import P2PDeleteModalComponent from '@/components/Events/P2PDeleteModalComponent.vue';

@Component({
  components: {
    ToggleButton,
    LabelComponent,
    InputComponent,
    P2PDeleteModalComponent,
  },
})
export default class P2PParticipationComponent extends Vue {
  @Prop(Function) public readonly toggleContentVisibility;
  @Prop(Function) public readonly setCommunicationAndSharingDetails;
  private isAmountDisabled: boolean = true;
  private emailAddress: string = '';
  private focusedItem: string = '';
  private communicationAndSharingDetails: any = {
    isRegistrationCreated: false,
    isParticipantMeetTheirDefinedGoals: false,
    isParticipantMeetTheirGoals: false,
    amount: '',
    supportStaff: [],
  };
  private btnToggleLabels = {
    checked: 'ON',
    unchecked: 'OFF',
  };
  private fields = [
    {
      key: 'email',
      label: 'Email',
      sortable: false,
    },
    {
      key: 'options',
      label: 'Options',
      sortable: false,
    },
  ];
  private toggleDefinedGoals(value, key) {
    console.log('event- ', event);
    if (key === 'isParticipantMeetTheirDefinedGoals') {
      this.isAmountDisabled = !value;
      if (!value) {
        this.communicationAndSharingDetails.amount = '';
      }
    }
    this.communicationAndSharingDetails[key] = value;
    this.setCommunicationAndSharingDetails(this.communicationAndSharingDetails);
  }

  private updateSupportStaff() {
    const supportStaffEmail = {
      email: this.emailAddress
    };
    this.communicationAndSharingDetails.supportStaff.push(supportStaffEmail);
    this.setCommunicationAndSharingDetails(this.communicationAndSharingDetails);
  }

  private showDeleteModal(email) {
    this.focusedItem = email;
    this.$bvModal.show('p2p-delete-modal');
  }

  private deleteSupportStaff() {
    console.log('delete', this.emailAddress);
    this.communicationAndSharingDetails.supportStaff = this.communicationAndSharingDetails.supportStaff.filter(supportStaffEmail => supportStaffEmail.email !== this.emailAddress);
    this.setCommunicationAndSharingDetails(this.communicationAndSharingDetails);
    this.$bvModal.hide('p2p-delete-modal');
  }

}
</script>

<style lang="scss" scoped>
.grid-header {
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}
.table-btn {
  max-width: 100px;
//   max-height: 25px;
}
.btn-collapse {
  background-color: #e2e6ea;
  border-color: #dae0e5;
  margin: 0px;
}
.bg-grey {
  background-color: rgba(222, 222, 222, 0.5);
  border-color: rgba(222, 222, 222, 0.5);
}
.amount-input {
  img {
    position: absolute;
    top: 12px;
  }
  ::-webkit-input-placeholder,::-moz-placeholder,:-ms-input-placeholder,::placeholder {
    margin-left: 10px;
  }
}
</style>
