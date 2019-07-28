<template>
  <div>
    <div id="main" class="site-content">
      <div class="row no-gutters">
        <div class="col-md">
          <div>
            <event-header-component :event="event"></event-header-component>

            <div class="px-4 px-md-5 py-4 py-md-5">
              <div class="row">
                <div class="col-md">
                  <event-tabs-component class="mb-5"></event-tabs-component>
                </div>

                <div class="col-md-3 text-right">
                  <a href="#" class="btn btn-primary btn-lg download-list rounded-standard-semi">
                    Download List <img class="ml-2" src="@/assets/icons/download.svg">

                    <div class="bg-dark p-2">
                      <a href="#">Promo Code</a>
                      <a href="#">Comp Ticket</a>
                    </div>
                  </a>
                </div>
              </div>

              <div class="border overflow-hidden p-4 rounded-standard shadow-standard">
                <promotion-codes/>
                
                <hr>
                
                <complementary-tickets class="mt-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import vSelect from 'vue-select';

import ComplementaryTickets from '@/components/Events/Promotions/ComplementaryTickets.vue';
import EventHeaderComponent from '@/components/Events/EventHeaderComponent.vue';
import EventTabsComponent from '@/components/Events/EventTabsComponent.vue';
import PromotionCodes from '@/components/Events/Promotions/PromotionCodes.vue';
import BaseEventVue from '@/components/Events/BaseEventVue';

@Component({
  components: {
    ComplementaryTickets,
    EventHeaderComponent,
    EventTabsComponent,
    PromotionCodes,
  },
})
export default class EventPromotions extends BaseEventVue {
  private eventId = '';

  private downLoadTableAsEXCEL(type) {
    const ShowLabel: boolean = true;
    let array: any[] = [];
    if (type === 'Comp') {
      array = [
        {
          'Ticket#': 'A9229D50D11DBE',
          'F Name': 'Wade',
          'L Name': 'Wiggs',
          'Email': 'mrogers@email.com',
          'Ticket': 'General Adult',
        },
        {
          'Ticket#': 'A9229D50D12DBE',
          'F Name': 'Wade',
          'L Name': 'Wiggs',
          'Email': 'mrogers@email.com',
          'Ticket': 'General Adult',
        },
        {
          'Ticket#': 'A9229D50D13DBE',
          'F Name': 'Wade',
          'L Name': 'Wiggs',
          'Email': 'mrogers@email.com',
          'Ticket': 'General Adult',
        },
        {
          'Ticket#': 'A9229D50D14DBE',
          'F Name': 'Wade',
          'L Name': 'Wiggs',
          'Email': 'mrogers@email.com',
          'Ticket': 'General Adult',
        },
        {
          'Ticket#': 'A9229D50D15DBE',
          'F Name': 'Wade',
          'L Name': 'Wiggs',
          'Email': 'mrogers@email.com',
          'Ticket': 'General Adult',
        },
      ];
    } else {
      array = [
        {
          'Promo Code': 'FREE STUFF',
          'Pricing': '$35.00',
          'Starts': '05-15-2019',
          'Ends': '05-15-2019',
          'Qty': 'Unlimited',
          'Used': '3',
          'Status': 'Open',
        },
        {
          'Promo Code': 'FREE STUFF',
          'Pricing': '$35.00',
          'Starts': '05-15-2019',
          'Ends': '05-15-2019',
          'Qty': 'Unlimited',
          'Used': '3',
          'Status': 'Open',
        },
        {
          'Promo Code': 'FREE STUFF',
          'Pricing': '$35.00',
          'Starts': '05-15-2019',
          'Ends': '05-15-2019',
          'Qty': 'Unlimited',
          'Used': '3',
          'Status': 'Open',
        },
        {
          'Promo Code': 'FREE STUFF',
          'Pricing': '$35.00',
          'Starts': '05-15-2019',
          'Ends': '05-15-2019',
          'Qty': 'Unlimited',
          'Used': '3',
          'Status': 'Open',
        },
        {
          'Promo Code': 'FREE STUFF',
          'Pricing': '$35.00',
          'Starts': '05-15-2019',
          'Ends': '05-15-2019',
          'Qty': 'Unlimited',
          'Used': '3',
          'Status': 'Open',
        },
      ];
    }

    let CSV = '';

    if (ShowLabel) {
      let row = '';

      for (const index in array[0]) {
        if (array[0].hasOwnProperty(index)) {
          row += index + ',';
        }
      }

      row = row.slice(0, -1);
      CSV += row + '\r\n';
    }

    for (const i of array) {
      let row = '';

      for (const keys in i) {
        if (i.hasOwnProperty(keys)) {
          row += '"' + i[keys] + '",';
        }
      }

      row.slice(0, row.length - 1);
      CSV += row + '\r\n';
    }

    if (CSV === '') {
      alert('Invalid data');
      return;
    }

    let fileName = '';
    if (type === 'Comp') {
      fileName = 'Complementary Tickets';
    } else {
      fileName = 'Promotional Codes';
    }

    fileName = fileName.replace(/ /g, '_');
    const uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    const link = document.createElement('a');
    link.href = uri;
    link.download = fileName + '.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
</script>

<style lang="scss" scoped>
.download-list {
  position: relative;

  &:hover > div {
    display: block;
  }

  > div {
    border-radius: 5px;
    display: none;
    position: absolute;
    left: calc(230px - 100%);
    max-width: 150px;
    width: 100%;
    top: 50px;
    z-index: 999;

    a {
      color: #FFF;
      display: block;
      font-size: 12px;
      font-weight: 500;
      width: 100%;
      padding: 5px 0;

      &:not(:last-child) {
        border-bottom: 1px solid #FFF;
      }
    }

    &::before {
      content: '';
      display: block;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid #343a40;
      position: absolute;
      left: 67px;
      top: -5px;
      width: 0;
    }
  }
}
</style>
