<template>
  <b-modal :id="id" ref="modal" centered hide-footer hide-header>
    <form action="#" @submit.prevent="submitForm">
      <div class="p-3">
        <div class="mb-4 text-center">
          <span>
            <i class="refund-icon fas fa-exclamation-circle"></i>
          </span>
        </div>

        <div class="mb-3 text-center">
          <div class="label-1 font-weight-bold">Are You Sure?</div>
        </div>

        <div class="mb-4 text-center">
          <div class="label-2">You won't be able to revert this!</div>
        </div>

        <div class="row">
          <div class="col text-left">
            <button
              type="submit"
              class="btn btn-primary btn-lg rounded-pill text-uppercase w-100"
              v-on:click="$emit('click')"
            >Yes Delete it!</button>
          </div>

          <div class="col text-right">
            <button
              type="button"
              class="btn btn-light btn-lg rounded-pill text-uppercase w-100"
              @click="$refs['modal'].hide()"
            >Cancel</button>
          </div>
        </div>
      </div>
    </form>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class P2PDeleteModalComponent extends Vue {
  public $refs!: {
    modal: any;
  };

  @Prop(String) public readonly id!: string;
  @Prop(Function) public readonly deleteItem;

  private submitForm() {
    // Do some processing ...

    this.$refs.modal.hide();
  }
}
</script>

<style lang="scss" scoped>
.refund-icon {
  font-size: 80px;
  color: #2284c3;
}

.label-1 {
  font-size: 34px;
}

.label-2 {
  font-size: 24px;
  color: #4c6570;
}
</style>


