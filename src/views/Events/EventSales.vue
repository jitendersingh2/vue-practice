<template>
  <div>
    <div id="main" class="site-content">
      <div class="row no-gutters">
        <div class="col-md">
          <div>
            <event-header-component :event="event"></event-header-component>

            <div class="px-4 px-md-5 py-4 py-md-5">
              <event-tabs-component class="mb-5"></event-tabs-component>

              <div class="border overflow-hidden p-4 rounded-standard shadow-standard">
                <b-row>
                  <b-col md="7" class="graph">
                    <b-card class="rounded shadow-sm p-3 m-0 shadow">
                      <b-card-body class="p-0">
                        <div class="sales-chart-wrap">
                          <bar
                            :height="width > 760 ? 220 : 500"
                            :chartdata="chartData"
                            chart-id="sales-chart"
                            :options="chartOptions"
                          />
                        </div>
                      </b-card-body>
                    </b-card>
                  </b-col>

                  <b-col md="5">
                    <sale-process />
                  </b-col>
                </b-row>

                <hr />

                <sales-summary />

                <hr />

                <sales-breakdown />

                <hr class="mt-4 mb-2" />

                <sale-report-subscribers
                  :subscribers="subscribers"
                  :deleteSubscriber="deleteSubscriberShow"
                  :showEditSubscriber="showEditSubscriber"
                />

                <new-subscriber
                  id="new-subscriber"
                  :edit="updateSubscriber"
                  :init="updateSubscriberBuffer"
                  @input="addSubscriber"
                  @close="() => this.$bvModal.hide('new-subscriber')"
                />

                <delete-modal id="delete-subscriber" @submit="deleteSubscriber" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { EventApi } from '@/api/EventApi';

import BaseEventVue from '@/components/Events/BaseEventVue';
import Bar from '@/components/Charts/BarChart.vue';
import DeleteModal from '@/components/Events/Sales/DeleteModal.vue';
import EventHeaderComponent from '@/components/Events/EventHeaderComponent.vue';
import EventTabsComponent from '@/components/Events/EventTabsComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import IEventData from '@/api/model/IEventData';
import * as EventConstants from '@/api/EventConstants';
import NewSubscriber from '@/components/Events/Sales/CreateSubscriber.vue';
import SalesBreakdown from '@/components/Events/Sales/Breakdown.vue';
import SaleProcess from '@/components/Events/Sales/Process.vue';
import SaleReportSubscribers from '@/components/Events/Sales/Subcribers.vue';
import SalesSummary from '@/components/Events/Sales/Summary.vue';

@Component({
  components: {
    Bar,
    DeleteModal,
    EventHeaderComponent,
    EventTabsComponent,
    NewSubscriber,
    SalesBreakdown,
    SaleProcess,
    SaleReportSubscribers,
    SalesSummary,
  },
})
export default class EventSales extends BaseEventVue {
  public event: IEventData = new IEventData();
  private width: number = 1200;
  private subscribers: any[] = [];
  private chartData = {
    labels: [
      'Advanced Child',
      'Advanced Adult',
      'General Child',
      'General Adult',
      'General Admission',
      'Hey Child',
      'Hey Adult',
    ],
    datasets: [
      {
        label: 'Total Sales',
        backgroundColor: '#50E3C2',
        data: [40, 30, 3, 12, 1, 39, 10],
      },
      {
        label: 'Refunded',
        backgroundColor: '#F5A623',
        data: [20, 15, 42, 3, 10, 6, 12],
      },
      {
        label: 'Complementary',
        backgroundColor: '#03BD5B',
        data: [1, 50, 52, 39, 10, 9, 5],
      },
    ],
  };
  private chartOptions = {
    responsive: true,
    tooltips: {
      enabled: true,
    },
    legend: {
      labels: {
        usePointStyle: true,
      },
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            color: 'transparent',
          },
        },
      ],
    },
  };
  private updateSubscriber: boolean = false;
  private deleteSubscriberIdx: number = -1; // index of subscriber to delete
  private updateSubscriberBuffer: any = {};
  private intervalOptions = EventConstants.INTERVALS;

  public getsSubscribersList() {
    this.api.getEventSalesReport(this.$route.params.eventId)
      .then((res: any) => {
        const results = res.data.event.emailSubscribers;
        this.subscribers = results;
      });
  }

  public mounted() {
    window.onresize = () => {
      this.width = window.innerWidth;
    };
  }

  private created() {
    this.getsSubscribersList();
  }

  private showEditSubscriber(idx: number) {
    this.$bvModal.show('new-subscriber');
    this.updateSubscriber = true;
    const doc = this.subscribers[idx];
    this.updateSubscriberBuffer = {
      index: idx,
      ...doc,
      interval: doc.interval,
    };
  }
  private addSubscriber(subscriber) {
    const interval = {
      value: subscriber.interval,
      text: (this.intervalOptions.find(
        (s) => s.value === subscriber.interval,
      ) as any).text,
    };
    if (this.updateSubscriber) {
      const { index } = this.updateSubscriberBuffer;
      this.editSubscriber(index, subscriber);
    } else {
      this.api.addEmailSubscriber(this.$route.params.eventId, subscriber)
        .then(this.getsSubscribersList())
        .catch(this.handleFailure);
    }
    this.$bvModal.hide('new-subscriber');
  }

  private editSubscriber(idx: number, data: any) {
    this.api.updateEmailSubscriber(this.$route.params.eventId,
    this.updateSubscriberBuffer.email, data)
        .then(this.getsSubscribersList())
        .catch(this.handleFailure);

    this.$bvModal.hide('new-subscriber');
    this.updateSubscriber = false;
  }

  private deleteSubscriberShow(idx: number) {
    if (idx >= 0) {
      this.deleteSubscriberIdx = idx;
      this.$bvModal.show('delete-subscriber');
    }
  }

  private deleteSubscriber() {
    const email = this.subscribers[this.deleteSubscriberIdx].email;
    this.api.deleteEmailSubscriber(this.$route.params.eventId, email)
        .then(this.getsSubscribersList())
        .catch(this.handleFailure);
  }
}
</script>
