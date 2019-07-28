<template>
  <form action="#" method="POST" enctype="multipart/form-data" @submit.prevent="updateOrderConfirmation">
    <div class="border-bottom row no-gutters">
      <div class="col">
        <div class="p-4 p-md-5">
          <h4 class="font-weight-semibold label-standard-primary mb-4 text-center text-uppercase">Order Confirmation</h4>
        
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
              <a href="#" class="btn btn-grey btn-equal-width font-weight-semibold rounded-pill text-uppercase text-white mr-md-4 my-3" @click="testEmail">Test</a>
              <a href="#" class="btn btn-primary btn-equal-width font-weight-semibold rounded-pill text-uppercase my-3" @click="sendEmail">Send</a>
            </div>
          </div>

          <div class="row">
            <div class="col-md"></div>

            <div class="col-md-8">
              <div class="my-4 p-4 rounded-pill text-center" style="background-color: #F1F1F1;">
                <p class="font-weight-bold mb-0">The maximum send limit is 250. If your list exceeds 250 unique email addresses we recommend using <a href="#">MailChimp</a>.</p>
              </div>
            </div>
            
            <div class="col-md"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md">
        <div class="px-5 py-3">
          <a
            href="#"
            class="btn btn-light btn-back btn-lg border font-weight-semibold rounded-pill shadow-sm text-uppercase"
            @click="$router.push({ name: 'edit-event-ticket-embed' })"
          >Back</a>
        </div>
      </div>

      <div class="col-md text-right">
        <div class="px-5 py-3">
          <button
            type="submit"
            class="btn btn-secondary btn-save btn-sky-blue btn-lg border font-weight-semibold rounded-pill shadow-sm text-uppercase w-100"
          >Save &amp; Continue</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import EmailContentComponent from '@/components/Events/OrderConfirmation/Fields/EmailContentComponent.vue';
import EmailLogoComponent from '@/components/Events/OrderConfirmation/Fields/EmailLogoComponent.vue';
import EmailSubjectComponent from '@/components/Events/OrderConfirmation/Fields/EmailSubjectComponent.vue';

import BaseEventVue from '@/components/Events/BaseEventVue';
import IEventData from '@/api/model/IEventData';
import EventModel from '@/api/model/EventModel';

@Component({
  components: {
    EmailContentComponent,
    EmailLogoComponent,
    EmailSubjectComponent,
  },
})
export default class EditOrderConfirmation extends BaseEventVue {
  private readonly PAGE: number = 7;
  private eventId = '';

  private created() {
    this.onPageCreated(this.PAGE);
    this.eventId = this.$route.params.eventId;

    this.api.getEvent(this.$route.params.eventId)
      .then((res) => {
        const eventUpdate = this.handleSuccess(res, 'data.event', this.ERROR_UPDATE_PATH);
        this.event = Object.assign(new IEventData(), EventModel.getOrderEmail(eventUpdate));
        }).catch(this.handleFailure);
  }

  private sendEmail() {
    this.sendEmailOperation(this.eventId, this.event);
  }

  private testEmail() {
    this.sendEmailOperation(this.eventId, this.event, true);
  }

  private updateOrderConfirmation() {
    // Do some processing...
    const that = this;
    const evt = this.event;
    let mutation = {
      lastConfigurationStep: this.PAGE,
      receiptSubject: evt.receiptSubject,
      receiptContent: evt.receiptContent,
    };
    mutation = Object.assign(mutation, (evt.receiptLogoImageUrl !== null) ? {receiptLogoImage: evt.receiptLogoImageUrl } : null);

    this.api.updateEvent(this.eventId, mutation)
      .then(success).catch(this.handleFailure);

    function success(res) {
      that.updateEventAndProceed(res, '', 'edit-event-sponsors');
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-equal-width {
  max-width: 180px;
  width: 100%;
}
</style>
