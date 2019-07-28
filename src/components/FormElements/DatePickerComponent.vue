<template>
  <datepicker
    input-class="form-control border-0 bg-transparent pl-0"
    :disabled-dates="disabledDates"
    :placeholder="inputPlaceholder"
    v-model="date"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';

@Component({
  components: {
    Datepicker,
  },
})
export default class DatePickerComponent extends Vue {
  @Prop({ default: 'Select Date', type: String }) public readonly inputPlaceholder!: string;
  @Prop(String) public readonly value!: string;

  private disabledDates = {
    to: new Date(),
  };

  get date() {
    return this.value;
  }

  set date(selectedDate) {
    this.$emit('input', moment(selectedDate).format());
  }
}
</script>
