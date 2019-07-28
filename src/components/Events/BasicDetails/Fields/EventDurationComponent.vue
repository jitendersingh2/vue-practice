<template>
  <div>
    <div class="row mb-3">
      <div class="col-sm col-md-4">
        <div class="custom-control custom-radio">
          <input
            id="event-range-1"
            class="custom-control-input"
            name="event-range"
            type="radio"
            value="single-day"
            v-model="value.eventRange"
            required
          >

          <label-component
            class="custom-control-label"
            for="event-range-1"
            text="Single Day"
            :isBold="false"
          ></label-component>
        </div>
      </div>

      <div class="col-sm">
        <div class="custom-control custom-radio">
          <input
            id="event-range-2"
            class="custom-control-input"
            name="event-range"
            type="radio"
            value="date-range"
            v-model="value.eventRange"
            required
          >

          <label-component
            class="custom-control-label"
            for="event-range-2"
            text="Date Range"
            :isBold="false"
          ></label-component>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md mb-3">
        <div class="flex-even input-with-icon icon-left border rounded-pill mr-2" :class="(errors.has('startDate'))? 'input-error' : ''">
          <date-picker-component
            class="pl-5"
            inputPlaceholder="Start Date *"
            v-model="value.startDate"
            name="startDate" 
            v-validate="'required'"
          />

          <span class="icon">
            <img src="@/assets/icons/calender.svg">
          </span>
        </div>
      </div>

      <div class="col-md mb-3">
        <div class="flex-even input-with-icon icon-left border rounded-pill mr-2">
          <time-picker-component
            input-class="form-control border-0 pl-5"
            input-placeholder="Start Time *"
            :selectedDate="value.startDate"
            v-model="value.startTime"
          ></time-picker-component>

          <span class="icon">
            <img src="@/assets/icons/clock.svg">
          </span>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md mb-3" v-if="value.eventRange !== 'single-day'">
        <div class="flex-even input-with-icon icon-left border rounded-pill mr-2">
          <date-picker-component
            class="pl-5"
            inputPlaceholder="End Date"
            v-model="value.endDate"
            name="endDate" 
          />

          <span class="icon">
            <img src="@/assets/icons/calender.svg">
          </span>
        </div>
      </div>

      <div class="col-md mb-3">
        <div class="flex-even input-with-icon icon-left border rounded-pill mr-2">
          <time-picker-component
            input-class="form-control border-0 pl-5"
            input-placeholder="End Time"
            :selectedDate="value.endDate"
            v-model="value.endTime"
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
import { Component, Prop, Vue } from 'vue-property-decorator';
import IEventDuration from '@/components/Events/BasicDetails/IEventDuration';

import DatePickerComponent from '@/components/FormElements/DatePickerComponent.vue';
import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import TimePickerComponent from '@/components/FormElements/TimePickerComponent.vue';

@Component({
  components: {
    DatePickerComponent,
    LabelComponent,
    TimePickerComponent,
  },
})
export default class EventDurationComponent extends Vue {
  @Prop(Object) public readonly value !: IEventDuration;
}
</script>
