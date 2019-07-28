<template>
  <div class="bg-white px-4 px-md-4 py-3 shadow-sm">
    <div class="align-middle d-inline-block w-50">
      <b-col xs="12">
        <h2 class="h5 font-weight-bold mb-0 text-dark">
          Event Ticketing
          <span class="text-muted">/ Event Creation</span>
        </h2>
      </b-col>
    </div>

    <div class="align-middle d-inline-block w-50 mr-0 text-right">
      <a href="#" class="btn btn-outline-primary px-3 mr-1 rounded-pill text-uppercase">Event Help</a>
      <a href="#" class="btn btn-outline-primary px-3 mr-1 rounded-pill text-uppercase">Preview</a>
      <a href="#" class="btn btn-primary rounded-pill px-3 text-uppercase mr-1">ARCHIVE</a>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class EventSubHeaderComponent extends Vue {}
</script>
