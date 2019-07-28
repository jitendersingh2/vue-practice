<template>
  <div>
    <div id="main" class="site-content">
      <div class="row no-gutters">
        <div class="col-md">
          <div>
            <event-header-component :event="event"></event-header-component>

            <div class="px-4 px-md-5 py-4 py-md-5">
              <event-tabs-component class="mb-5"></event-tabs-component>

              <div class="border overflow-hidden rounded-standard shadow-standard">
                <form action="#" method="POST" enctype="multipart/form-data" @submit.prevent="updateEmailConfiguration">
                  <div class="border-bottom row no-gutters">
                    <div class="col">
                      <div class="p-4 p-md-5">
                        <h4 class="font-weight-semibold label-standard-primary mb-4 text-center text-uppercase">Email Updates</h4>
                      
                        <div class="row">
                          <div class="col-md-4">
                            <email-subject-component class="mb-3" v-model="event.receiptSubject"></email-subject-component>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col">
                            <email-logo-component class="mb-3" v-model="event.receiptLogoImageUrl"></email-logo-component>
                            <email-content-component class="mb-3" v-model="event.receiptContent"></email-content-component>
                          
                            <hr>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col text-center">
                            <a href="#" class="btn btn-grey btn-equal-width font-weight-semibold rounded-pill text-uppercase text-white mr-md-4 my-3" v-b-modal.test-email-modal>Test</a>
                            <a href="#" class="btn btn-primary btn-equal-width font-weight-semibold rounded-pill text-uppercase my-3" @click="sendEmail">Send</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="bg-light p-3">
                    <p class="mb-0 font-weight-bold">The maximum send limit is 250. If your list exceeds 250 unique email addresses we recommend using <a href="#">MailChimp</a>.</p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <test-email-modal-component id="test-email-modal" v-model="testEmailAddress"></test-email-modal-component>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import EmailContentComponent from '@/components/Events/EmailUpdates/Fields/EmailContentComponent.vue';
import EmailLogoComponent from '@/components/Events/EmailUpdates/Fields/EmailLogoComponent.vue';
import EmailSubjectComponent from '@/components/Events/EmailUpdates/Fields/EmailSubjectComponent.vue';
import EventHeaderComponent from '@/components/Events/EventHeaderComponent.vue';
import EventTabsComponent from '@/components/Events/EventTabsComponent.vue';
import TestEmailModalComponent from '@/components/Events/EmailUpdates/TestEmailModalComponent.vue';
import BaseEventVue from '@/components/Events/BaseEventVue';
import IEventData from '@/api/model/IEventData';
import EventModel from '@/api/model/EventModel';

@Component({
  components: {
    EmailContentComponent,
    EmailLogoComponent,
    EmailSubjectComponent,
    EventHeaderComponent,
    EventTabsComponent,
    TestEmailModalComponent,
  },
})
export default class EditEventEmailUpdates extends BaseEventVue {
  private testEmailAddress: string = '';
  private eventId: string = '';

  private created() {
    this.eventId = this.$route.params.eventId;

    this.api.getEvent(this.$route.params.eventId)
      .then((res) => {
        const eventUpdate = this.handleSuccess(res, 'data.event', this.ERROR_UPDATE_PATH);
        this.event = Object.assign(new IEventData(), EventModel.getOrderEmail(eventUpdate));
        }).catch(this.handleFailure);
  }

  private updateEmailConfiguration() {
    // Do some processing here...
    const evt = this.event;
    let mutation = {
      receiptSubject: evt.receiptSubject,
      receiptContent: evt.receiptContent,
    };
    mutation = Object.assign(mutation, (evt.receiptLogoImageUrl !== null) ? {receiptLogoImage: evt.receiptLogoImageUrl } : null);

    this.api.updateEvent(this.eventId, mutation)
      .then(this.handleMessage).catch(this.handleFailure);
  }

  private sendEmail() {
    // Do some processing here...
    this.sendEmailOperation(this.eventId, this.event);
  }
}
</script>

<style lang="scss" scoped>
.btn-equal-width {
  max-width: 180px;
  width: 100%;
}
</style>
