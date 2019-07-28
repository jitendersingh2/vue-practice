<template>
  <div>
    <div class="row align-items-center justify-content-between px-4 pt-4 pb-2">
      <div class="col-md"></div>

      <div class="col-md">
        <h2 class="h3 mb-0 font-weight-semibold text-center text-primary text-uppercase">Surveys</h2>
      </div>

      <div class="col-md text-right">
        <router-link :to="{ name: 'new-event-survey' }" class="btn btn-primary rounded-standard-semi mr-md-3">Create New</router-link>
      </div>
    </div>

    <div class="px-4 pt-2 pb-4 border-bottom">
      <event-surveys-list-component class="table-standard" :surveys="surveys" @delete-survey="deleteSurvey"></event-surveys-list-component>
    </div>

    <div class="row">
      <div class="col-md">
        <div class="px-5 py-3">
          <a
            href="#"
            class="btn btn-light btn-back btn-lg border font-weight-semibold rounded-pill shadow-sm text-uppercase"
            @click="$router.push({ name: 'edit-event-design' });"
          >Back</a>
        </div>
      </div>

      <div class="col-md text-right">
        <div class="px-5 py-3">
          <button
            type="submit"
            class="btn btn-secondary btn-save btn-sky-blue btn-lg border font-weight-semibold rounded-pill shadow-sm text-uppercase w-100"
            @click="$router.push({ name: 'event-tickets' });"
          >Save &amp; Continue</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ISurveyData from '@/components/Events/Surveys/ISurveyData';

import EventSurveysListComponent from '@/components/Events/Surveys/EventSurveysListComponent.vue';
import BaseEventVue from '@/components/Events/BaseEventVue';

@Component({
  components: {
    EventSurveysListComponent,
  },
})
export default class EventSurveys extends BaseEventVue {
  // @Task: Update -> lastConfigurationStep: this.PAGE,
  private readonly PAGE: number = 4;
  private surveys: ISurveyData[] = [];
  private eventId = '';

  private created() {
    this.onPageCreated(this.PAGE);
    this.eventId = this.$route.params.eventId;

    this.api.getSurveys(this.eventId)
      .then((res) => {
        this.surveys = this.handleSuccess(res, 'data.event.surveys', 'data.event.errors');
      }).catch(this.handleFailure);
  }

  private deleteSurvey(survey: ISurveyData) {
    const that = this;
    const surveyId = survey.id;

    // Delete event ticket...
    this.api.deleteSurvey(this.eventId, surveyId)
    .then(this.handleMessage).catch(this.handleFailure);
  }
}
</script>
