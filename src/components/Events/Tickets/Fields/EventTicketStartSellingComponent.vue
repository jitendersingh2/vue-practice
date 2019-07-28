<template>
  <div>
    <div class="row">
      <div class="col-sm col-md-4">
        <label-component
          for="event-ticket-start-selling-date"
          text="Start Selling"
        ></label-component>
      </div>

      <div class="col-sm text-right">
        <div class="custom-control custom-checkbox">
          <input
            id="event-ticket-start-selling-immediate"
            class="custom-control-input text-muted"
            name="event-ticket-start-selling-immediate"
            type="checkbox"
            :disabled="isDisabled"
            v-model="sellImmediately"
          >

          <label-component
            class="custom-control-label text-muted"
            for="event-ticket-start-selling-immediate"
            text="Immediate"
            :isBold="false"
          ></label-component>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md mb-3">
        <div class="flex-even input-with-icon icon-left border rounded-pill mr-2">
          <input
            type="text"
            class="form-control border-0 pl-5"
            placeholder="Select Start Date"
            disabled
            v-if="isDisabled"
          >

          <input
            type="text"
            class="form-control border-0 pl-5"
            placeholder="Select Start Date"
            :value="moment(ticketStartSellingDate).format('DD MMM YYYY')"
            disabled
            v-else-if="sellImmediately"
          >

          <date-picker-component
            class="pl-5"
            inputPlaceholder="Select Start Date"
            v-model="ticketStartSellingDate"
            v-else
          />

          <span class="icon">
            <img src="@/assets/icons/calender-2.svg">
          </span>
        </div>
      </div>

      <div class="col-md mb-3">
        <div class="flex-even input-with-icon icon-left border rounded-pill mr-2">
          <input
            type="text"
            class="form-control border-0 pl-5"
            placeholder="Select Start Time"
            disabled
            v-if="isDisabled"
          >

          <input
            type="text"
            class="form-control border-0 pl-5"
            placeholder="Select Start Time"
            :value="moment(ticketStartSellingTime.dateTime).format('LT')"
            disabled
            v-else-if="sellImmediately"
          >

          <time-picker-component
            input-class="form-control border-0 pl-5"
            input-placeholder="Select Start Time"
            :selectedDate="ticketStartSellingDate"
            v-model="ticketStartSellingTime"
            v-else
          ></time-picker-component>

          <span class="icon">
            <img src="@/assets/icons/clock.svg">
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import moment from 'moment';

import DatePickerComponent from '@/components/FormElements/DatePickerComponent.vue';
import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import TimePickerComponent from '@/components/FormElements/TimePickerComponent.vue';

interface DateTime {
  dateTime: string;
  timezone: string;
}

@Component({
  components: {
    DatePickerComponent,
    LabelComponent,
    TimePickerComponent,
  },
})
export default class EventTicketStartSellingComponent extends Vue {
  @Prop(Object) public readonly value!: DateTime;
  @Prop(Boolean) public readonly isDisabled!: boolean;
  @Prop(Boolean) public readonly isImmediate!: boolean;

  private moment = moment;

  get ticketStartSellingDate() {
    return this.value.dateTime;
  }

  get sellImmediately() {
    return this.isImmediate;
  }

  set sellImmediately(value) {
    this.$emit('update-is-immediate', value);
  }

  set ticketStartSellingDate(value: string) {
    const current = moment(this.value.dateTime);
    const updated = moment(value).toObject();

    current.set({
      date: updated.date,
      months: updated.months,
      years: updated.years,
    });

    const data = {
      dateTime: current.format(),
      timezone: this.value.timezone,
    };

    this.$emit('input', data);
  }

  get ticketStartSellingTime() {
    return this.value;
  }

  set ticketStartSellingTime(value: DateTime) {
    const current = moment(this.value.dateTime);
    const updated = moment(value.dateTime).toObject();

    current.set({
      hours: updated.hours,
      milliseconds: updated.milliseconds,
      minutes: updated.minutes,​
      seconds: updated.seconds,
    });

    const data = {
      dateTime: current.format(),
      timezone: value.timezone,
    };

    this.$emit('input', data);
  }

  @Watch('isImmediate')
  public monitorIsImmediate(isImmediate: boolean) {
    if (isImmediate) {
      const dateTime = moment().format();
      const timezone = this.value.timezone;

      const data = { dateTime, timezone };

      this.$emit('input', data);
    }
  }
}
</script>
