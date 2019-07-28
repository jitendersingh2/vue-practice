<template>
  <div>
    <b-table head-variant="light" :items="surveys" :fields="fields">
      <template slot="name" slot-scope="data">
        <router-link :to="{ 'name': 'edit-event-survey', params: { surveyId: data.item.id } }" v-text="data.item.name" />
      </template>

      <template slot="questions" slot-scope="data">
        <span v-text="data.item.questionCount"></span>
      </template>

      <template slot="actions" slot-scope="data">
        <router-link class="btn btn-white btn-sm rounded-circle mx-2" :to="{ 'name': 'edit-event-survey', params: { surveyId: data.item.id } }">
          <i class="fas fa-pencil-alt text-primary"></i>
        </router-link>

        <a class="btn btn-white btn-sm rounded-circle mx-2" href="#" @click="displayConfirmDeletionModal(data.item)">
          <i class="far fa-trash-alt text-primary"></i>
        </a>

        <event-survey-delete-modal-component
          :id="'event-survey-delete-modal-' + data.item.id"
          :survey="data.item"
          @confirmed="deleteSurvey"
        ></event-survey-delete-modal-component>
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import ISurveyData from './ISurveyData';

import EventSurveyDeleteModalComponent from './EventSurveyDeleteModalComponent.vue';

@Component({
  components: {
    EventSurveyDeleteModalComponent,
  },
})
export default class EventSurveysListComponent extends Vue {
  @Prop(Array) public readonly surveys!: ISurveyData[];

  private fields = [
    {
      key: 'name',
      label: 'Survey Name',
      sortable: true,
    },
    {
      key: 'questionCount',
      label: 'Questions',
      sortable: true,
    },
    {
      key: 'ticket.name',
      label: 'Assigned To',
      sortable: true,
    },
    'actions',
  ];

  private deleteSurvey(survey: ISurveyData) {
    this.$emit('delete-survey', survey);
  }

  private displayConfirmDeletionModal(survey: ISurveyData) {
    this.$bvModal.show('event-survey-delete-modal-' + survey.id);
  }
}
</script>
