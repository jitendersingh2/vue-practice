<template>
  <div>
    <div class="px-5 py-4 border-bottom">
      <div class="row">
        <div class="col-md">
          <div>
            <label-component for="survey-name" text="Survey Name"></label-component>
            
            <input-component
              id="survey-name"
              placeholder="Enter your survey name"
              v-model="surveyName"
              required
            ></input-component>
          </div>
        </div>

        <div class="col-md d-flex align-items-center justify-content-end">
          <button class="btn btn-primary rounded-pill text-uppercase" @click="addQuestion">Add Question</button>
        </div>
      </div>
    </div>

    <div class="questions" v-if="questions.length > 0">
      <question-component
        class="border-bottom"
        v-for="(question, index) in questions"
        :index="index"
        :key="index"
        :question="question"
        @input="data => updateQuestion(data, index)"
        @delete-question="deleteQuestion(index)"
      ></question-component>
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
            class="btn btn-secondary btn-save btn-sky-blue btn-lg border font-weight-semibold rounded-pill shadow-sm text-uppercase w-100"
            @click="$router.push({ name: 'event-surveys' });"
          >Save &amp; Continue</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import IQuestionData from '@/components/Events/Surveys/IQuestionData';

import InputComponent from '@/components/FormElements/InputComponent.vue';
import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import QuestionComponent from '@/components/Events/Surveys/Fields/QuestionComponent.vue';
import BaseEventVue from '@/components/Events/BaseEventVue';

@Component({
  components: {
    InputComponent,
    LabelComponent,
    QuestionComponent,
  },
})
export default class EditEventSurvey extends BaseEventVue {
   private readonly PAGE: number = 4;  // Same as parent
  private surveyId: string = '';
  private eventId: string = '';
  private surveyName: string = '';
  private prevSurveyName: string = '';
  private questions: IQuestionData[] = [];

  get isSurveyEditing() {
    return this.$route.name === 'edit-event-survey';
  }

  private created() {
    this.onPageCreated(this.PAGE);
    this.eventId = this.$route.params.eventId;

    if (this.isSurveyEditing) {
      this.surveyId = this.$route.params.surveyId;
      if (this.surveyId) {
        this.api.getSurvey(this.eventId, this.surveyId)
        .then((res) => {
          this.surveyName = BaseEventVue.getValueFromPath(res, 'data.event.survey.name');
          this.questions = BaseEventVue.getValueFromPath(res, 'data.event.survey.questions');
          })
        .catch(this.handleFailure);
      }
    }
  }

  private addQuestion() {
    if (!this.surveyName) {
      this.surveyName = 'Validate Name';
    }
    if (this.questions.length === 0) {
      this.api.createSurvey(this.eventId, this.surveyName)
      .then((res) =>
        this.surveyId = BaseEventVue.getValueFromPath(res, 'data.event.createSurvey.survey.id'))
        .catch(this.handleFailure);
    }

    const question: IQuestionData = {
      id: '',
      choices: [],
      question: 'Question',
      questionType: 'MULTIPLE_CHOICE',
    };

    this.questions.push(question);
  }

  private deleteQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  private updateQuestion(question: any, index: number) {
    this.$set(this.questions, index, question);
  }
}
</script>
