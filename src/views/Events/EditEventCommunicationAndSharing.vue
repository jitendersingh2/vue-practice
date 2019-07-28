<template>
  <form action="#" method="POST" @submit.prevent="updateEventSettings">
    <div class="row no-gutters">
      <div class="col-md">
        <div class="p-4 p-md-5">
          <h4 class="font-weight-semibold label-standard-primary mb-4 text-center text-uppercase">Communication And Sharing</h4>
          <div class="row p-3 btn-collapse rounded-pill text-secondary font-weight-semibold" v-if="!isCommAndSharingContentVisible">
            <div class="text-right col-md-8">
              Who Can Participate Reach Out To?
            </div>
            <div class="text-right col-md-4">
              <span class="text-secondary cursor-pointer" @click="toggleContentVisibility()"><i class="fa" :class="{'fa-chevron-up': isCommAndSharingContentVisible, 'fa-chevron-down': !isCommAndSharingContentVisible}"></i></span>
            </div>
          </div>
          <p-2-p-participation-component :toggleContentVisibility="toggleContentVisibility" :setCommunicationAndSharingDetails="setCommunicationAndSharingDetails" v-if="isCommAndSharingContentVisible"></p-2-p-participation-component>
        </div>
      </div>
    </div>

    <div class="row no-gutters">
      <div class="col-md">
        <div class="p-4 p-md-5">
          <h4 class="font-weight-semibold label-standard-primary mb-4 text-center text-uppercase">Nurturing</h4>
          <div class="row p-3 btn-collapse rounded-pill font-weight-semibold" variant="light" v-if="!isNurturingContentVisible">
            <div class="col-md-6">
              Email
            </div>
            <div class="col-md-2">
              Status
            </div>
            <div class="col-md-2">
              Option
            </div>
            <div class="text-right col-md-2">
              <span class="text-secondary cursor-pointer" @click="toggleContentVisibility('nurturing')"><i class="fa" :class="{'fa-chevron-up': isNurturingContentVisible, 'fa-chevron-down': !isNurturingContentVisible}"></i></span>
            </div>
          </div>
          <p-2-p-table-component
            class="mb-4 table-standard"
            :emails="nurturingItems"
            :updateEmail="updateEmail"
            :sendEmail="sendEmail"
            :sendStatusEmail="sendStatusEmail"
            :toggleContentVisibility="toggleContentVisibility"
            :type="'nurturing'"
            v-if="isNurturingContentVisible"
          >
          </p-2-p-table-component>
        </div>
      </div>
    </div>

    <div class="border-bottom row no-gutters">
      <div class="col-md">
        <div class="p-4 p-md-5">
          <h4 class="font-weight-semibold label-standard-primary mb-4 text-center text-uppercase">Suggested Participants Templates</h4>
          <div class="row p-3 btn-collapse rounded-pill font-weight-semibold" variant="light" v-if="!isSuggestedTemplatesContentVisible">
            <div class="col-md-6">
              Email
            </div>
            <div class="col-md-2">
              Status
            </div>
            <div class="col-md-2">
              Option
            </div>
            <div class="text-right col-md-2">
              <span class="text-secondary cursor-pointer" @click="toggleContentVisibility('suggestedTemplates')"><i class="fa" :class="{'fa-chevron-up': isSuggestedTemplatesContentVisible, 'fa-chevron-down': !isSuggestedTemplatesContentVisible}"></i></span>
            </div>
          </div>
          <p-2-p-table-component
            class="mb-4 table-standard"
            :orders="suggestedTemplates"
            :updateEmail="updateEmail"
            :sendEmail="sendEmail"
            :sendStatusEmail="sendStatusEmail"
            :toggleContentVisibility="toggleContentVisibility"
            :type="'suggestedTemplates'"
            v-if="isSuggestedTemplatesContentVisible"
          >
          </p-2-p-table-component>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md">
        <div class="px-5 py-3">
          <a
            href="#"
            class="btn btn-light btn-back btn-lg border font-weight-semibold rounded-pill shadow-sm text-uppercase"
            @click="$router.go(-1)"
          >Back</a>
        </div>
      </div>

      <div class="col-md text-right">
        <div class="px-5 py-3">
          <button
            type="submit"
            class="btn btn-grey btn-lg border font-weight-semibold rounded-pill shadow-sm text-uppercase w-100"
          >Save &amp; Continue</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ITax from '@/components/Events/Settings/ITax';

import P2PTableComponent from '@/components/Events/P2PTableComponent.vue';
import P2PParticipationComponent from '@/components/Events/P2PParticipationComponent.vue';

import BaseEventVue from '@/components/Events/BaseEventVue';
import IEventData from '@/api/model/IEventData';
import EventModel from '@/api/model/EventModel';

@Component({
  components: {
    P2PTableComponent,
    P2PParticipationComponent,
  },
})
export default class EditEventSettings extends BaseEventVue {
  private readonly PAGE: number = 9;
  private eventId: string = '';
  private isCommAndSharingContentVisible: boolean = true;
  private isNurturingContentVisible: boolean = false;
  private isSuggestedTemplatesContentVisible: boolean = false;
  private communicationAndSharingDetails: any = null;
  private nurturingItems: any = [
    {
      id: 1,
      email: 'jared@jared.com',
      emailSubject: 'Thank you for registering First Follow Next Steps',
      emailBody: 'Thank you for registering First Follow Next Steps... Thank you for registering...',
      status: 'OFF',
    },
    {
      id: 2,
      email: 'jared@jared.com',
      emailSubject: 'Thank you for registering First Follow Next Steps',
      emailBody: 'Thank you for registering First Follow Next Steps',
      status: 'OFF',
    },
    {
      id: 3,
      email: 'jared@jared.com',
      emailSubject: 'Thank you for registering First Follow Next Steps',
      emailBody: 'Thank you for registering First Follow Next Steps',
      status: 'OFF',
    },
    {
      id: 4,
      email: 'jared@jared.com',
      emailSubject: 'Thank you for registering First Follow Next Steps',
      emailBody: 'Thank you for registering First Follow Next Steps',
      status: 'OFF',
    },
    {
      id: 5,
      email: 'jared@jared.com',
      emailSubject: 'Thank you for registering First Follow Next Steps',
      emailBody: 'Thank you for registering First Follow Next Steps',
      status: 'OFF',
    },
  ];

  private suggestedTemplates = [
    {
      id: 1,
      email: 'jared@jared.com',
      emailSubject: 'Ask For Donation',
      emailBody: 'Ask For Donation... Ask For Donation... Thank you for registering...',
      status: 'OFF',
    },
    {
      id: 2,
      email: 'jared@jared.com',
      emailSubject: 'Ask For Donation',
      emailBody: 'Ask For Donation',
      status: 'OFF',
    },
    {
      id: 3,
      email: 'jared@jared.com',
      emailSubject: 'Ask For Donation',
      emailBody: 'Ask For Donation',
      status: 'OFF',
    },
    {
      id: 4,
      email: 'jared@jared.com',
      emailSubject: 'Ask For Donation',
      emailBody: 'Ask For Donation',
      status: 'OFF',
    },
    {
      id: 5,
      email: 'jared@jared.com',
      emailSubject: 'Ask For Donation',
      emailBody: 'Ask For Donation',
      status: 'OFF',
    },
  ]

  private setCommunicationAndSharingDetails(data) {
    this.communicationAndSharingDetails = data;
  }
  
  private toggleContentVisibility(type) {
    console.log('type- ', type);
    if(!type) {
      this.isCommAndSharingContentVisible = !this.isCommAndSharingContentVisible;
    } else {
      if(type === 'nurturing') {
        this.isNurturingContentVisible = !this.isNurturingContentVisible;
      } else {
        this.isSuggestedTemplatesContentVisible = !this.isSuggestedTemplatesContentVisible;
      }
    }
  }

  private updateEmail(updatedEmail, type) {
    const key = type === 'nurturing' ? 'nurturingItems' : 'suggestedTemplates';
    this[key] = this[key].map((email) => {
      if (updatedEmail.id === email.id) {
        email = updatedEmail;
      }

      return email;
    });

    this.$bvModal.show('save-modal');
  }

  private sendEmail(emailContent) {
    // const { email, emailSubject, emailBody } = emailContent;
    // const link = document.createElement('a');
    // link.href = `mailto:${email}?subject=${emailSubject}&body=${emailBody}`;
    // link.click();
    this.$bvModal.show('test-modal');
  }

  private sendStatusEmail(status, type) {
    console.log('status- ', status, type);
  }
}
</script>

<style lang="scss" scoped>
.btn-collapse {
  background-color: #e2e6ea;
  border-color: #dae0e5;
  margin: 0px;
}
</style>
