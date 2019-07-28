<template>
  <b-modal :id='id' ref='modal' centered hide-footer hide-header>
    <div class='p-2'>
      <span class='d-block text-primary text-center symbol'>
        <i class='fas fa-exclamation-circle'></i>
      </span>

      <h2 class='text-center font-weight-bold mb-1'>Are You Sure?</h2>
      <p class='lead text-center'>You won't be able to revert this!</p>

      <div class='row'>
        <div class='col text-center mb-2'>
          <button
            type='button'
            class='btn btn-primary btn-lg rounded-pill text-uppercase'
            @click='submitForm'
          >Yes Delete It!</button>
        </div>

        <div class='col text-center mb-2'>
          <button
            type='button'
            class='btn btn-secondary btn-lg rounded-pill text-uppercase'
            @click="$refs['modal'].hide()"
          >Cancel</button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DeletePromoTicketModal extends Vue {
  public $refs!: {
    modal: any;
  };

  @Prop(String) public readonly id!: string;
  @Prop(Number) public deleteIndex!: number;

  private submitForm() {
    this.$emit('deleteItem', this.deleteIndex);

    // Hide modal once the ticket has been deleted.
    this.$refs.modal.hide();
  }
}
</script>

<style scoped>
.symbol {
  font-size: 48px;
}
button.btn.btn-secondary.btn-lg.rounded-pill.text-uppercase {
  padding: 9px 50px;
  background: #cecece;
  border: none;
}
p.lead.text-center {
  font-size: 23px;
  color: #7b7b7b;
  font-weight: 300;
}
</style>
