<template>
  <div>
    <div class="row">
      <div class="col">
        <label-component for="event-capacity" text="Event Capacity"></label-component>
      </div>

      <div class="col text-right">
        <div class="custom-control custom-checkbox">
          <input
            id="event-capacity-unlimited"
            class="custom-control-input text-muted"
            name="event-capacity-unlimited"
            type="checkbox"
            v-model="isUnlimited"
          >

          <label-component
            class="custom-control-label text-muted"
            for="event-capacity-unlimited"
            text="No limit"
            :isBold="false"
          ></label-component>
        </div>
      </div>
    </div>

    <input
      id="event-capacity"
      class="form-control rounded-pill mb-2"
      name="event-capacity"
      type="number"
      min="1"
      placeholder="Enter no. of Tickets Limit"
      required
      :disabled="isUnlimited"
      v-model="eventCapacity"
    >

    <p class="text-muted ml-3">Once the tickets reach this limit - the sales of tickets will be closed.</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import LabelComponent from '@/components/FormElements/LabelComponent.vue';

@Component({
  components: {
    LabelComponent,
  },
})
export default class EventCapacityComponent extends Vue {
  @Prop(String) public readonly value !: string;

  private isUnlimited: boolean = false;

  get eventCapacity() {
    return this.value;
  }

  set eventCapacity(value) {
    this.$emit('input', value);
  }

  @Watch('isUnlimited')
  public monitorUnlimitedCapacity(isUnlimited: boolean) {
    if (isUnlimited) {
      this.$emit('input', 'unlimited');
    } else {
      this.$emit('input', '1');
    }
  }

  @Watch('value', { immediate: true })
  public monitorLimitedCapacity(value: string) {
    this.isUnlimited = value === 'unlimited';
  }
}
</script>

<style lang="scss" scoped>
p {
  font-size: 12px;
}
</style>
