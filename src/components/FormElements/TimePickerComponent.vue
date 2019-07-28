<template>
  <div v-click-outside="handleOutSideTimePickerClick">
    <div class="timepicker" :class="{ 'd-none': !displayTimePicker }">
      <div class="row no-gutters time">
        <div class="col-sm px-1">
          <select class="form-control custom-select font-weight-semibold text-center" v-model="hours">
            <option
              v-for="(hour) in 12"
              :index="hour"
              :key="hour"
              :value="hour"
              :disabled="disableHour(hour)"
              v-text="hour"
            ></option>
          </select>
        </div>

        <div class="col-sm px-1">
          <select class="form-control custom-select font-weight-semibold text-center" v-model="minutes">
            <option
              v-for="(minutes) in 60"
              :index="minutes"
              :key="minutes"
              :value="(minutes - 1).toString().padStart(2, 0)"
              :disabled="disableMinute(minutes)"
              v-text="(minutes - 1).toString().padStart(2, 0)"
            ></option>
          </select>
        </div>

        <div class="col-sm px-1">
          <select class="form-control custom-select font-weight-semibold text-center" v-model="meridiem">
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <select class="form-control custom-select font-weight-semibold" v-model="timezone">
            <option value='' disabled>Select Timezone</option>
            <option
              v-for="(_timezone, index) in timezonesList"
              :index="index"
              :key="index"
              :value="_timezone"
              v-text="_timezone"
            ></option>
          </select>
        </div>
      </div>
    </div>

    <input
      type="text"
      :class="inputClass"
      :placeholder="inputPlaceholder"
      @click="displayTimePicker = true"
      :value="time"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { isEmpty } from 'lodash';
import moment from 'moment-timezone';

interface DateTime {
  dateTime: string;
  timezone: string;
}

@Component
export default class TimePickerComponent extends Vue {
  @Prop({ default: '', type: String }) public readonly inputClass!: string;
  @Prop({ default: '', type: String }) public readonly inputPlaceholder!: string;
  @Prop(String) public readonly selectedDate!: string;
  @Prop(Object) public readonly value!: DateTime;

  private displayTimePicker: boolean = false;
  private timezonesList = moment.tz.names();

  @Watch('selectedDate', { immediate: true })
  monitorDate(date) {
    const selectedDate = moment(date);
    const selectedTime = moment(this.value.dateTime);

    this.setTime(selectedTime.date(selectedDate.date()).format());
  }

  private created() {
    if (isEmpty(this.timezone)) {
      this.setTimeZone('GMT');
    }
  }

  get meridiem() {
    const [time, meridiem] = this.time.split(' ');

    return meridiem;
  }

  set meridiem(meridiem) {
    const current = moment(this.value.dateTime);

    if (meridiem.toUpperCase() === 'AM' && current.hours() > 12) {
      current.hours(current.hours() - 12);
    } else if (meridiem.toUpperCase() === 'PM' && current.hours() <= 12) {
      current.hours(current.hours() + 12);
    }

    this.setTime(current.format());
  }

  get hours() {
    const [time, meridiem] = this.time.split(' ');
    const [hours, mins] = time.split(':');

    return hours;
  }

  set hours(hours) {
    const current = moment(this.value.dateTime);
    const [time, meridiem] = this.time.split(' ');

    if (meridiem.toUpperCase() === 'PM') {
      hours += 12;
    }

    current.set({ hours });

    this.setTime(current.format());
  }

  get minutes() {
    const [time, meridiem] = this.time.split(' ');
    const [hours, mins] = time.split(':');

    return mins;
  }

  set minutes(minutes) {
    const current = moment(this.value.dateTime);

    current.set({ minutes });

    this.setTime(current.format());
  }

  get time() {
    return moment(this.value.dateTime).format('LT');
  }

  get timezone() {
    return this.value.timezone;
  }

  set timezone(timezone) {
    this.setTimeZone(timezone);
  }

  private disableHour(hour) {
    const selectedTime = moment(this.value.dateTime);
    const [time, meridiem] = this.time.split(' ');

    if (meridiem.toUpperCase() === 'PM') {
      hour += 12;
    }

    selectedTime.hour(hour);

    return moment().subtract(1, 'hours').isAfter(selectedTime);
  }

  private disableMinute(min) {
    const selectedTime = moment(this.value.dateTime);
    const [time, meridiem] = this.time.split(' ');

    selectedTime.minute(min);

    return moment().subtract(1, 'min').isAfter(selectedTime);
  }

  private handleOutSideTimePickerClick() {
    if (this.displayTimePicker === true) {
      this.displayTimePicker = false;
    }
  }

  private setTime(dateTime: string) {
    const timezone = this.timezone;

    const data = { dateTime, timezone };

    this.$emit('input', data);
  }

  private setTimeZone(timezone: string) {
    const dateTime = moment(this.value.dateTime).format();

    const data = { dateTime, timezone };

    this.$emit('input', data);
  }
}
</script>

<style lang="scss" scoped>
.timepicker {
  background-color: var(--primary);
  border-radius: 10px;
  padding: 15px;
  position: absolute;
  left: calc(50% - 125px);
  top: -132px;
  width: 250px;
  z-index: 9;

  .time .custom-select {
    background: none;
    background-color: #FFF;
    padding: 0;
  }

  &:after {
    content: '';
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 15px solid var(--primary);
    display: block;
    height: 0;
    position: absolute;
    bottom: -15px;
    left: calc(50% - 15px);
    width: 0;
  }
}
</style>
