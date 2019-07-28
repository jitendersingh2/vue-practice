<template>
  <div>
    <b-row>
      <b-col class="text-center header-text text-uppercase">SALES BREAKDOWN</b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col md="6">
        <b-card class="ctm-card">
          <div class="text-center font-weight-bold h5 ctm-title">
             <img src="@/assets/icons/proceeds.svg" class="action mr-1" height="20px"> Proceeds
          </div>
          <b-row class="no-gutters">
            <b-col class="font-weight-bold text-center col-md-4 pb-3">
              <div class="vl mt-1"></div>
              <span data-font="12">Ticket Sale</span>
              <br>
              <span data-font="20">$ 480.00</span>
            </b-col>
            <b-col class="font-weight-bold text-center col-md-4 pb-3">
              <div class="vl mt-1"></div>
              <span data-font="12">Donations</span>
              <br>
              <span data-font="20">$ 480.00</span>
            </b-col>
            <b-col class="font-weight-bold text-center col-md-4 pb-3">
              <div class="vl mt-1"></div>
              <span data-font="12">Total Proceeds</span>
              <br>
              <span data-font="20">$ 20.00</span>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col md="6">
        <b-card class="ctm-card">
          <div class="text-center font-weight-bold h5 ctm-title">
            <img src="@/assets/icons/fairmarket.svg" class="action mr-1" height="20px"> Fair Market
          </div>
          <b-row class="no-gutters">
            <b-col class="font-weight-bold text-center col-md-4 pb-3">
              <div class="vl mt-1"></div>
              <span data-font="12">Ticket Price</span>
              <br>
              <span data-font="20">$ 480.00</span>
            </b-col>
            <b-col class="font-weight-bold text-center col-md-4 pb-3">
              <div class="vl mt-1"></div>
              <span data-font="12">Fair Market Value</span>
              <br>
              <span data-font="20">$ 480.00</span>
            </b-col>
            <b-col class="font-weight-bold text-center col-md-4 pb-3">
              <div class="vl mt-1"></div>
              <span data-font="12">Charitable Contributions</span>
              <br>
              <span data-font="20">$ 20.00</span>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class SaleBreakdown extends Vue {}
</script>