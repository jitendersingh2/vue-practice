<template>
  <div>
    <label-component for="public-guest-list" text="Public Guest List"></label-component>

    <div class="row mb-3">
      <div class="col d-flex align-items-center">
        <p class="mb-0 mt-1 text-muted">Allow other purchasers to see who is attending this event</p>
      </div>

      <div class="col-md-2 text-right">
        <toggle-button class="mb-0" :labels="btnToggleLabels" v-model="publicGuestList"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ToggleButton } from 'vue-js-toggle-button';

import LabelComponent from '@/components/FormElements/LabelComponent.vue';

@Component({
  components: {
    LabelComponent,
    ToggleButton,
  },
})
export default class EventPublicGuestListComponent extends Vue {
  @Prop(Boolean) public readonly value!: boolean;

  private btnToggleLabels = {
    checked: 'ON',
    unchecked: 'OFF',
  };

  get publicGuestList() {
    return this.value;
  }

  set publicGuestList(value: boolean) {
    this.$emit('input', value);
  }
}
</script>

<style lang="scss" scoped>
p {
  font-size: 12px;
}
</style>
