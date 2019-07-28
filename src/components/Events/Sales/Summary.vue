<template>
  <div>
    <b-row>
      <b-col offset="4" md="4" class="text-center header-text text-uppercase mt-2">Sales Summary</b-col>
      <b-col md="4" class="text-right">
        <b-button variant="primary" class="download mr-3">
          <span class="text" @click="download">Download List</span><i class="fa fa-download" aria-hidden="true"></i>
        </b-button>
      </b-col>
    </b-row>

    <b-row>
      <b-table
        table-class="event-sales-summary"
        :responsive="true"
        :items="saleList"
        :fields="saleListFields"
        thead-class="header"
        class="table-shadow summary_table remove-table-margin-bottom">
      </b-table>
    </b-row>
  </div>
</template>

<style lang="scss" scoped>
.download {
  background: #2080BF;
  border: 1px solid #2080BF;
  border-radius: 10px;
  box-sizing: border-box;

  .text {
    margin-right: 10px;
  }
}

.summary_table {
  margin: 30px 16px;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { EventApi } from '@/api/EventApi';
import BaseVue from '@/components/BaseVue';
import XLSX from 'xlsx';

@Component
export default class SaleSummary extends BaseVue {
  private saleList: any[] = [];

  private saleListFields: any[] = [
    {
      key: 'tickets',
      variant: 'secondary-light',
    },
    {
      key: 'qty',
    },
    {
      key: 'price',
      label: 'Price',
      formatter: (value, key, item) => {
        if (value.length < 1) { return; }

        return '$' + value;
      },
    },
    {
      key: 'sold',
      label: 'Sold',
    },
    {
      key: 'compCount',
      label: 'Comp',
    },
    {
      key: 'refundedValue',
      label: 'Refunded',
    },
    {
      key: 'amount',
      label: 'Amount',
      formatter: (value, key, item) => {
        return '$' + value;
      },
    },
  ];

  public getSalesList() {
    this.api.getEventSalesReport(this.$route.params.eventId)
      .then((res: any) => this.saleList = res.data.event.salesReport.tickets);
  }

  public download() {
    const sheet = XLSX.utils.json_to_sheet(this.saleList);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, 'data');
    XLSX.writeFile(wb, 'summary.xlsx');
  }

  public mounted() {
    const compSum = this.saleList.reduce((a, c) => a + c.comp, 0);
    const refundedSum = this.saleList.reduce((a, c) => a + c.refunded, 0);
    const amountSum = this.saleList.reduce((a, c) => a + c.amount, 0);
    const qtySum = this.saleList.reduce((a, c) => a + c.qty, 0);
    const soldSum = this.saleList.reduce((a, c) => a + c.sold, 0);
    this.saleList.push({
      tickets: 'TOTAL',
      qty: qtySum,
      price: '',
      sold: soldSum,
      comp: 5,
      refunded: 0,
      amount: 250,
    });
  }

  private created() {
    this.getSalesList();
  }

}
</script>

<style lang="scss">
.event-sales-summary tbody tr:last-child td {
  border-top: 1px solid #000;
  font-weight: 600;
}
</style>
