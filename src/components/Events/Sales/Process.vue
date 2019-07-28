<template>
  <div class="border p-3 rounded shadow">
    <div class="sale-proceeds d-flex mb-3">
      <div class="flex-even text-center p-3">
        <h5 class="font-weight-semibold text-muted mb-3">Gross Proceeds</h5>
        <h3 class="font-weight-semibold text-primary">${{eventProcessDetails.grossProceeds}}</h3>
      </div>

      <div class="flex-even text-center p-3">
        <h5 class="font-weight-semibold text-muted mb-3">Net Proceeds</h5>
        <h3 class="font-weight-semibold text-primary">${{eventProcessDetails.netProceeds}}</h3>
      </div>
    </div>

    <div>
      <h5 class="font-weight-semibold text-center text-muted mb-2">Attendees</h5>

      <div class="d-flex align-items-center justify-content-between">
        <div class="text-center">
          <h4 class="font-weight-semibold text-muted">{{eventProcessDetails.regularAttendeeCount}}</h4>
          <p class="mb-0">Regular</p>
        </div>

        <div class="text-center attendees-sum">
          <div class="circle"></div>

          <div class="total-wrapper">
            <h3 class="font-weight-semibold text-primary">{{eventProcessDetails.compAttendeeCount + eventProcessDetails.regularAttendeeCount}}</h3>
            <p class="label mb-0">TOTAL</p>
          </div>
        </div>

        <div class="text-center">
          <h4 class="font-weight-semibold text-muted">{{eventProcessDetails.compAttendeeCount}}</h4>
          <p class="mb-0">Comp</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { EventApi } from '@/api/EventApi';
import BaseVue from '@/components/BaseVue';

@Component
export default class Process extends BaseVue {
  private eventProcessDetails = [];

  private created() {
    this.getEventSalesReport();
  }

  private getEventSalesReport() {
    this.api.getEventSalesReport(this.$route.params.eventId)
      .then((res: any) => this.eventProcessDetails = res.data.event.salesReport.overview);
  }

}
</script>

<style lang="scss" scoped>
.sale-proceeds > div:first-child {
  border-right: 1px solid #CCC;
}

.attendees-sum {
  position: relative;
  max-width: 150px;
  width: 100%;

  .circle {
    border: 8px solid #44A0EA;
    border-bottom: 8px dashed #FFF;
    border-radius: 50%;
    height: 150px;
    margin: 0 auto;
    width: 150px;
  }

  .total-wrapper {
    position: absolute;
    left: 35px;
    top: 46px;

    .label {
      border: 2px solid #506883;
      border-radius: 50px;
      font-weight: 600;
      margin-top: 40px;
      padding: 2px 15px;
    }
  }
}
</style>
