<template>
  <div>
    <div class="row mb-3">
      <div class="col d-flex align-items-center">
        <p class="font-weight-semibold mb-0 mt-1 text-muted">Send tickets with Confirmation Email</p>
      </div>

      <div class="col-md-2 text-right">
        <toggle-button class="mb-0" :labels="btnToggleLabels" v-model="sendConfirmationEmail"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ToggleButton } from 'vue-js-toggle-button';

@Component({
  components: {
    ToggleButton,
  },
})
export default class SendTicketConfirmationEmailComponent extends Vue {
  @Prop(Boolean) public readonly value!: boolean;

  private btnToggleLabels = {
    checked: 'ON',
    unchecked: 'OFF',
  };

  get sendConfirmationEmail() {
    return this.value;
  }

  set sendConfirmationEmail(value: boolean) {
    this.$emit('input', value);
  }
}
</script>
