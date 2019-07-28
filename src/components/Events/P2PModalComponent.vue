<template>
  <b-modal :id="id" ref="modal" centered hide-footer hide-header>
    <div class='close-div text-right'>
      <span @click="$refs['modal'].hide()" class='fas fa-times cursor-pointer'></span>
    </div>
    <form action="#" @submit.prevent="submitForm">
      <div class="p-3">
        <div class="mb-4 text-center">
          <span>
            <i class="modal-success-icon fas fa-check-circle"></i>
          </span>
        </div>

        <div class="mb-3 text-center">
          <div class="modal-content-label-1 font-weight-bold">Well Done!</div>
        </div>

        <div class="mb-4 text-center">
          <div class="modal-content-label-2">{{ content }}</div>
        </div>
      </div>
    </form>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class P2PModalComponent extends Vue {
  public $refs!: {
    modal: any;
  };

  @Prop(String) public readonly id!: string;
  @Prop(String) public readonly content!: string;

  private submitForm() {
    this.$refs.modal.hide();
  }
}
</script>

<style lang="scss" scoped>
.modal-success-icon {
  font-size: 80px;
  color: #2284c3;
  cursor: pointer;
}

.modal-content-label-1 {
  font-size: 34px;
}

.modal-content-label-2 {
  font-size: 12px;
  color: #4c6570;
}
</style>


