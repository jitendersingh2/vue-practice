<template>
  <div>
    <div class="row">
      <div class="col-sm col-md-4">
        <label-component
          for="event-ticket-stop-selling-date"
          text="Stop Selling"
        ></label-component>
      </div>

      <div class="col-sm text-right">
        <div class="custom-control custom-checkbox">
          <input
            id="event-ticket-stop-selling-event-date"
            class="custom-control-input text-muted"
            name="event-ticket-stop-selling-event-date"
            type="checkbox"
            :disabled="isDisabled"
            v-model="sellOnEventDate"
          >

          <label-component
            class="custom-control-label text-muted"
            for="event-ticket-stop-selling-event-date"
            text="Event Date"
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
            placeholder="Select Stop Date"
            disabled
            v-if="isDisabled"
          >

          <input
            type="text"
            class="form-control border-0 pl-5"
            placeholder="Select Start Date"
            :value="moment(ticketStopSellingDate).format('DD MMM YYYY')"
            disabled
            v-else-if="sellOnEventDate"
          >

          <date-picker-component
            class="pl-5"
            inputPlaceholder="Select Stop Date"
            v-model="ticketStopSellingDate"
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
            placeholder="Select Stop Time"
            disabled
            v-if="isDisabled"
          >

          <input
            type="text"
            class="form-control border-0 pl-5"
            placeholder="Select Start Time"
            :value="moment(ticketStopSellingTime.dateTime).format('LT')"
            disabled
            v-else-if="sellOnEventDate"
          >

          <time-picker-component
            input-class="form-control border-0 pl-5"
            input-placeholder="Select Stop Time"
            :selectedDate="ticketStopSellingDate"
            v-model="ticketStopSellingTime"
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
export default class EventTicketStopSellingComponent extends Vue {
  @Prop(Object) public readonly value!: DateTime;
  @Prop(Boolean) public readonly isDisabled!: boolean;
  @Prop(Boolean) public readonly isEventDate!: boolean;

  private moment = moment;

  get ticketStopSellingDate() {
    return this.value.dateTime;
  }

  get sellOnEventDate() {
    return this.isEventDate;
  }

  set sellOnEventDate(value) {
    this.$emit('update-is-event-date', value);
  }

  set ticketStopSellingDate(value: string) {
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

  get ticketStopSellingTime() {
    return this.value;
  }

  set ticketStopSellingTime(value: DateTime) {
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

  @Watch('isEventDate')
  public monitorIsEventDate(isEventDate: boolean) {
    if (isEventDate) {
      const dateTime = moment().format();
      const timezone = this.value.timezone;

      const data = { dateTime, timezone };

      this.$emit('input', data);
    }
  }
}
</script>
