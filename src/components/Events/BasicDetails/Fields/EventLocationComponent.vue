<template>
  <div>
    <div class="mb-3">
      <label-component for="event-venue-name" text="Venue"></label-component>
      <input-component
        id="event-venue-name"
        placeholder="Enter your venue"
        v-model="eventLocation.venue"
        name="venue" 
        :class="(errors.has('venue'))? 'input-error' : ''"
        v-validate="'required'"
      ></input-component>
    </div>

    <div class="mb-3">
      <label-component for="event-address-1" text="Address 1"></label-component>

      <input-component
        id="event-address-1"
        placeholder="Enter your address 1"
        v-model="eventLocation.street"
      ></input-component>
    </div>

    <div class="mb-3">
      <label-component for="event-address-2" text="Address 2"></label-component>

      <input-component
        id="event-address-2"
        placeholder="Enter your address 2"
        v-model="eventLocation.street2"
      ></input-component>
    </div>

    <div class="row">
      <div class="col-md mb-3">
        <label-component for="event-city" text="City"></label-component>

        <input-component
          id="event-city"
          placeholder="Enter City"
          v-model="eventLocation.city"
        />
      </div>

      <div class="col-md mb-3">
        <label-component for="event-state" text="State/Prov"></label-component>

        <v-select
          id="event-state"
          class="location-dropdown"
          placeholder="Choose State"
          :options="states"
          v-model="eventLocation.state"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-md mb-3">
        <label-component for="event-country" text="Country"></label-component>

        <v-select
          id="event-country"
          class="location-dropdown"
          placeholder="Choose Country"
          :options="countries"
          v-model="eventLocation.country"
          :on-change="changeRegion()"
        />
      </div>

      <div class="col-md mb-3">
        <label-component for="event-zip-code" text="Zip Code"></label-component>
        <input-component
          id="event-zip-code"
          name="event-zip-code"
          placeholder="Enter ZIP code here"
          :input-class="{ 'border-danger text-danger': errors.has('event-zip-code') }"
          v-validate="'numeric'"
          v-model="eventLocation.zip"
        ></input-component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import IEventLocation from '@/components/Events/BasicDetails/IEventLocation';
import { EventApi } from '@/api/EventApi';
import vSelect from 'vue-select';
import * as EventConstants from '@/api/EventConstants';
import BaseVue from '@/components/BaseVue';

import InputComponent from '@/components/FormElements/InputComponent.vue';
import LabelComponent from '@/components/FormElements/LabelComponent.vue';

@Component({
  components: {
    InputComponent,
    LabelComponent,
    vSelect,
  },
})
export default class EventLocationComponent extends BaseVue {
  @Prop(Object) public readonly value!: IEventLocation;

  public countryRegionData = require('country-region-data');
  public states: any = [];
  public countries: any = [];

  public mounted() {
    this.api.getCountriesList(this.$store.getters.organizationId)
    .then((res) => this.countries = res.data.organization.supportedCountries);
  }

  public changeRegion() {
    const country = (!this.value.country || !this.value.country.code)
      ? 'US' : this.value.country.code;

    const regions: any = this.countryRegionData.filter((obj) => obj.countryShortCode === country)[0].regions;
    const options: any = [];
    for (const region of regions) {
        options.push({code: region.shortCode, label: region.name});
    }
    this.states = options;
  }


  get eventLocation() {
    return this.value;
  }

  set eventLocation(value) {
    this.$emit('input', value);
  }
}
</script>

<style lang="scss">
.location-dropdown {
  .vs__dropdown-toggle {
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E") no-repeat right .75rem center/8px 10px;
    border-color: #ced4da;
    border-radius: 50px;

    .vs__actions {
      display: none;
    }
  }

  .vs__search {
    margin: 10px 0 5px;
    padding-left: 15px;
  }

  input {
    font-size: .9rem;
    font-weight: 400;
    line-height: 1.6;
    color: #495057;
  }
}
</style>
