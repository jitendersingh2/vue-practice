<template>
  <b-modal :id="id" ref="modal" centered hide-footer hide-header>
    <div>
      <div class="p-3">
        <div class="mb-4 text-center text-success">
          <i class="fas fa-check-circle icon-success"></i>
        </div>

        <h3 class="mb-4 font-weight-semibold text-center">Do you want publish<br>the event?</h3>

        <div class="row">
          <div class="col text-left">
            <button
              type="button"
              class="btn btn-primary btn-lg rounded-pill text-uppercase w-100"
              @click="archiveEvent"
            >Yes</button>
          </div>

          <div class="col text-right">
            <button
              type="button"
              class="btn btn-secondary btn-lg rounded-pill text-uppercase w-100"
              @click="cancel"
            >No</button>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class EventPublishConfirmationModalComponent extends Vue {
  public $refs!: {
    modal: any;
  };

  @Prop(String) public readonly id!: string;

  private archiveEvent() {
    // Do some processing ...

    this.$emit('publish-event');

    this.$refs.modal.hide();
  }

  private cancel() {
    this.$refs.modal.hide();
  }
}
</script>

<style lang="scss" scoped>
.icon-success {
    font-size: 72px;
}
</style>
