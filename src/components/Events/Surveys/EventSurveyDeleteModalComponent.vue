<template>
  <b-modal :id="id" ref="modal" centered hide-footer hide-header>
    <div class="p-5">
      <span class="d-block text-primary text-center symbol">
        <i class="fas fa-exclamation-triangle"></i>
      </span>

      <h2 class="text-center font-weight-bold mb-3">Are You Sure?</h2>
      <p class="lead text-center">You won't be able to revert this!</p>

      <div class="row">
        <div class="col text-right">
          <button
            type="button"
            class="btn btn-primary font-weight-semibold rounded-pill text-uppercase w-100"
            @click="submitForm"
          >Yes Delete It!</button>
        </div>

        <div class="col text-left">
          <button
            type="button"
            class="btn btn-secondary font-weight-semibold rounded-pill text-uppercase w-100"
            @click="$refs['modal'].hide()"
          >Cancel</button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ISurveyData from './ISurveyData';

@Component
export default class EventSurveyDeleteModalComponent extends Vue {
  public $refs!: {
    modal: any;
  };

  @Prop(String) public readonly id!: string;
  @Prop(Object) public readonly survey!: ISurveyData;

  private submitForm() {
    this.$emit('confirmed', this.survey);

    // Hide modal once the question has been deleted.
    this.$refs.modal.hide();
  }
}
</script>

<style lang="scss" scoped>
.symbol {
  font-size: 48px;
}
</style>
