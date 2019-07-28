<template>
  <div>
    <h5 class="font-weight-semibold">{{ (index + 1) + '. ' + question.title }}<span class="ml-2" v-if="question.isRequired">*</span></h5>

    <div v-if="question.type === 'fill-in-the-blank'">
      <input type="text" class="form-control rounded-pill" :required="question.isRequired">
    </div>
    
    <div v-else-if="question.type === 'MULTIPLE_CHOICE'">
      <div
        class="custom-control custom-radio"
        v-for="(option, oIndex) in question.options"
        :index="oIndex"
        :key="oIndex"
      >
        <input type="radio" :id="'question-' + index + '-option-' + oIndex" :name="'question-' + index" class="custom-control-input" :value="option.value" :required="question.isRequired">
        <label class="custom-control-label" :for="'question-' + index + '-option-' + oIndex">{{ option.value }}</label>
      </div>
    </div>
    
    <div v-else-if="question.type === 'MULTIPLE_CHOICE_DROPDOWN'">
      <select class="custom-select" :required="question.isRequired">
        <option
          v-for="(option, oIndex) in question.options"
          :index="oIndex"
          :key="oIndex"
          :value="option.value"
          v-text="option.value"
        ></option>
      </select>
    </div>
    
    <div v-else-if="question.type === 'MULTIPLE_ANSWER'">
      <div
        v-for="(option, oIndex) in question.options"
        :index="oIndex"
        :key="oIndex"
      >
        <div class="custom-control custom-checkbox">
          <input
            :id="'question-' + index + '-option-' + oIndex"
            class="custom-control-input text-muted"
            type="checkbox"
            :required="question.isRequired"
          >

          <label
            class="custom-control-label text-muted"
            :for="'question-' + index + '-option-' + oIndex"
            v-text="option.value"
          ></label>
        </div>
      </div>
    </div>
    
    <div v-else-if="question.type === 'textarea'">
      <textarea cols="30" rows="4" class="form-control" :required="question.isRequired"></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import IQuestion from '@/components/Events/Surveys/IQuestion';

@Component
export default class TicketQuestionComponent extends Vue {
  @Prop(Object) public readonly question!: IQuestion;
  @Prop(Number) public readonly index!: number;
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

select {
  -moz-appearance: none;
}
</style>
