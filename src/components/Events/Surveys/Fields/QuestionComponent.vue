<template>
  <div class="py-4 px-5">
    <div class="row">
      <div class="col-md">
        <h5 class="font-weight-bold" v-text="questionTitle"></h5>
        <span
          class="font-weight-bold text-muted text-capitalize"
          v-text="questionType.split('-').join(' ')"
        ></span>
      </div>

      <div class="col-md d-flex align-items-center justify-content-end">
        <span
          class="btn btn-white btn-sm rounded-circle mr-3"
          v-b-modal="'event-survey-question-delete-modal-' + index"
        >
          <i class="far fa-trash-alt text-primary"></i>
        </span>

        <span class="cursor-pointer" style="font-size: 24px;" @click="isExpanded = !isExpanded">
          <span class="fa" :class="{'fa-chevron-up': isExpanded, 'fa-chevron-down': !isExpanded}"></span>
        </span>
      </div>
    </div>

    <div v-if="isExpanded">
      <div class="row mt-3">
        <div class="col-md">
          <div class="mb-3">
            <div class="d-flex align-item-center justify-content-between">
              <label-component for="event-survey-question" text="Question"></label-component>

              <div>
                <div class="custom-control custom-checkbox">
                  <input
                    id="survey-question-is-required"
                    class="custom-control-input text-muted"
                    name="survey-question-is-required"
                    type="checkbox"
                    v-model="isQuestionRequired"
                  >

                  <label-component
                    class="custom-control-label text-muted"
                    for="survey-question-is-required"
                    text="Required"
                    :isBold="false"
                  ></label-component>
                </div>
              </div>
            </div>

            <input-component
              id="event-survey-question"
              placeholder="Enter Survey Question"
              required
              v-model="questionTitle"
            ></input-component>
          </div>
        </div>

        <div class="col-md">
          <label-component for="event-survey-question-type" text="Question Type"></label-component>

          <select-component
            id="event-survey-question-type"
            defaultOptionText="-- No Question Type --"
            :options="questionTypes"
            v-model="questionType"
            required
          ></select-component>
        </div>
      </div>

      <div class="question-options" v-if="questionOptions.length > 0">
        <div class="mb-3" v-for="(option, index) in questionOptions" :index="index" :key="index">
          <label-component :for="'question-option-' + (index + 1)" :text="'Answer ' + (index + 1 )"></label-component>

          <div class="row">
            <div class="col-md-6">
              <div class="d-flex align-item-center">
                <input-component
                  :id="'question-option-' + (index + 1)"
                  placeholder="Enter answer here"
                  required
                  :value="option.value"
                  @input="value => updateQuestionOption(value, index)"
                ></input-component>

                <span
                  class="btn btn-white icon-action btn-sm rounded-circle mx-3 cursor-pointer"
                  @click="deleteQuestionOption(index)"
                >
                  <i class="fa fa-minus"></i>
                </span>

                <span
                  class="btn btn-white icon-action btn-sm rounded-circle cursor-pointer"
                  @click="addQuestionOption"
                  v-if="(index + 1) == questionOptions.length"
                >
                  <i class="fa fa-plus"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <event-survey-question-delete-modal-component
      :id="'event-survey-question-delete-modal-' + index"
      @form-submitted="deleteQuestion"
    ></event-survey-question-delete-modal-component>
  </div>
</template>

<script lang="ts">
import _ from 'lodash';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import IQuestion from './../IQuestion';
import IQuestionOption from './../IQuestionOption';

import EventSurveyQuestionDeleteModalComponent from '@/components/Events/Surveys/EventSurveyQuestionDeleteModalComponent.vue';
import InputComponent from '@/components/FormElements/InputComponent.vue';
import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import SelectComponent from '@/components/FormElements/SelectComponent.vue';

@Component({
  components: {
    EventSurveyQuestionDeleteModalComponent,
    InputComponent,
    LabelComponent,
    SelectComponent,
  },
})
export default class QuestionComponent extends Vue {
  @Prop(Object) public readonly question!: IQuestion;
  @Prop(Number) public readonly index!: number;

  private isExpanded: boolean = false;
  private questionTypes = [
    {
      text: 'Textarea',
      value: 'TEXT',
    },
    {
      text: 'Fill in the blank',
      value: 'FILL_BLANKS',
    },
    {
      text: 'Multiple Choice',
      value: 'MULTIPLE_CHOICE',
    },
    {
      text: 'Multiple Choice Dropdown',
      value: 'MULTIPLE_CHOICE_DROPDOWN',
    },
    {
      text: 'Multiple Answers',
      value: 'MULTIPLE_ANSWER',
    },
  ];

  @Watch('questionType', { immediate: true })
  public monitorQuestionType(questionType: string) {
    const options: IQuestionOption[] = [];

    if (
      questionType === 'MULTIPLE_CHOICE' ||
      questionType === 'MULTIPLE_CHOICE_DROPDOWN' ||
      questionType === 'MULTIPLE_ANSWER'
    ) {
      options.push({ value: '' });
      options.push({ value: '' });
    }

    const question: IQuestion = {
      title: this.question.title,
      isRequired: this.question.isRequired,
      options,
      type: this.question.type,
    };

    this.$emit('input', question);
  }

  get isQuestionRequired() {
    return this.question.isRequired;
  }

  set isQuestionRequired(value: boolean) {
    const question: IQuestion = {
      title: this.question.title,
      isRequired: value,
      options: this.question.options,
      type: this.question.type,
    };

    this.$emit('input', question);
  }

  get questionOptions() {
    return this.question.options;
  }

  get questionTitle() {
    return this.question.title;
  }

  set questionTitle(value: string) {
    const question: IQuestion = {
      title: value,
      isRequired: this.question.isRequired,
      options: this.question.options,
      type: this.question.type,
    };

    this.$emit('input', question);
  }

  get questionType() {
    return this.question.type;
  }

  set questionType(questionType: string) {
    const question: IQuestion = {
      title: this.question.title,
      isRequired: this.question.isRequired,
      options: this.question.options,
      type: questionType,
    };

    this.$emit('input', question);
  }

  private addQuestionOption() {
    const options = _.cloneDeep(this.question.options);

    options.push({ value: '' });

    const question: IQuestion = {
      title: this.question.title,
      isRequired: this.question.isRequired,
      options,
      type: this.question.type,
    };

    this.$emit('input', question);
  }

  private deleteQuestionOption(index: number) {
    if (
      this.question.type === 'MULTIPLE_CHOICE' ||
      this.question.type === 'MULTIPLE_CHOICE_DROPDOWN' ||
      this.question.type === 'MULTIPLE_ANSWER'
    ) {
      if (this.question.options.length <= 2) {
        return;
      }
    }

    const options = _.cloneDeep(this.question.options);

    options.splice(index, 1);

    const question: IQuestion = {
      title: this.question.title,
      isRequired: this.question.isRequired,
      options,
      type: this.question.type,
    };

    this.$emit('input', question);
  }

  private deleteQuestion() {
    this.$emit('delete-question');
  }

  private updateQuestionOption(value: string, index: number) {
    const options = _.cloneDeep(this.question.options);

    options[index].value = value;

    const question: IQuestion = {
      title: this.question.title,
      isRequired: this.question.isRequired,
      options,
      type: this.question.type,
    };

    this.$emit('input', question);
  }
}
</script>

<style lang="scss" scoped>
.icon-action {
  align-items: center;
  border: 2px solid;
  display: flex;
  justify-content: center;
  padding: 0px 13px;
}
</style>
