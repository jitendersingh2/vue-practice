<template>
  <div>
    <div class="px-5 pt-5 pb-3">
      <div class="row">
        <div class="col-md">
          <h2 class="font-weight-bold mb-0 text-primary text-uppercase">Events</h2>
        </div>

        <div class="col-md align-middle d-inline-block text-right">
          <a href="#" class="btn btn-outline-primary btn-standard mr-3 rounded-pill text-uppercase" v-b-modal.event-help-modal>Event Help</a>
        
          <router-link
            class="btn btn-primary btn-standard rounded-pill text-uppercase"
            :to="{ name: 'new-event' }"
          >New Event</router-link>
        </div>
      </div>
    </div>

    <div class="px-5 pt-3 pb-0">
      <div class="row">
        <div class="col-md-8">
          <div class="rounded graph p-3">
            <div class="row mb-4">
              <div class="col-md-4 d-flex align-items-center">
                <span class="font-weight-semibold">Sales Overview</span>
              </div>

              <div class="col-md">
                <div class="d-flex align-items-center flex-wrap">
                  <div class="flex-even btn-sales-overview-filter input-with-icon icon-right border mr-2 pl-3">
                    <date-picker-component
                      id="sales-from-date"
                      inputPlaceholder="From Date"
                      v-model="fromDate"
                    />

                    <span class="icon">
                      <img src="@/assets/icons/calender.svg">
                    </span>
                  </div>

                  <div class="flex-even btn-sales-overview-filter input-with-icon icon-right border mr-2 pl-3">
                    <date-picker-component
                      id="sales-to-date"
                      inputPlaceholder="To Date"
                      v-model="toDate"
                    />

                    <span class="icon">
                      <img src="@/assets/icons/calender.svg">
                    </span>
                  </div>

                  <div class="flex-even btn-sales-overview-filter border">
                    <select-component
                      class="border-0 rounded-0"
                      :options="salesReportDurationList"
                      v-model="salesReportDuration"
                      required
                    ></select-component>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <event-sales-report-overview-chart-component
                  class="sales-report-overview-chart"
                  :datasets="filteredSalesReportDatasets"
                ></event-sales-report-overview-chart-component>
              </div>
            </div>
          </div>

          <div class="p-3">
            <p class="mb-0">Note: Data displayed here is for 06/04/2018 to 06/04/2019 for both Active &amp; Archived events</p>
          </div>
        </div>

        <div class="col-md">
          <div class="mb-3 p-3 rounded total-revenue">
            <span class="font-weight-semibold">Total Revenue</span>
            <h1 class="my-5 text-center text-success" v-text="totalRevenue"></h1>
          </div>

          <div class="p-3 rounded total-attendees">
            <span class="font-weight-semibold">Total Attendees</span>
            <h1 class="my-5 text-center text-success" v-text="totalAttendees"></h1>
          </div>
        </div>
      </div>
    </div>

    <div class="px-5 py-3">
      <div class="row mb-4">
        <div class="col-md-3 mb-3"></div>

        <div class="col-md-6 d-flex align-items-center justify-content-center mb-3">
          <div class="btn-group border rounded-pill">
            <b-button
              :class="[ showEventWithStatus === 'ACTIVE' ? 'btn-primary' : '' ]"
              class="btn-report-status text-uppercase"
              variant="white"
              @click="() => showEventWithStatus = 'ACTIVE'"
            >Active</b-button>

            <b-button
              :class="[ showEventWithStatus === 'DRAFT' ? 'btn-primary' : '' ]"
              class="btn-report-status text-uppercase"
              variant="white"
              @click="() => showEventWithStatus = 'DRAFT'"
            >Drafts</b-button>

            <b-button
              :class="[ showEventWithStatus === 'ARCHIVED' ? 'btn-primary' : '' ]"
              class="btn-report-status text-uppercase"
              variant="white"
              @click="() => showEventWithStatus = 'ARCHIVED'"
            >Archived</b-button>
          </div>
        </div>

        <div class="col-md-3 mb-3 text-right">
          <div class="searchbox input-with-icon icon-right">
            <input type="text" class="form-control bg-light" placeholder="Search" v-model="filter">
            <span class="icon text-muted">
              <i class="fas fa-search"></i>
            </span>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <events-list-component
            class="mb-4 table-standard"
            :events="filteredEventsWithStatus"
            :filter="filter"
            :currentPage="currentEventPage"
            :perPage="showEventsPerPage"
            @copy-event="copyEvent"
            @delete-event="deleteEvent"
          ></events-list-component>

          <div class="row">
            <div class="col-md d-flex align-items-center">
              <span class="mr-2">Show</span>

              <select-component
                class="select-per-page"
                :options="showEventsPerPageList"
                v-model="showEventsPerPage"
              ></select-component>

              <span class="ml-2">per page</span>
            </div>
            
            <div class="col-md">
              <b-pagination
                class="paginate-events"
                :total-rows="filteredEventsWithStatus.length"
                :per-page="showEventsPerPage"
                v-model="currentEventPage"
                prev-text="<"
                next-text=">"
                align="center"
                hide-goto-end-buttons
              />
            </div>

            <div class="col-md"></div>
          </div>
        </div>
      </div>
    </div>

    <event-help-modal-component id="event-help-modal"></event-help-modal-component>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { cloneDeep } from 'lodash';
import { EventApi } from '@/api/EventApi';
import IEvent from '@/components/Events/IEvent';

import DatePickerComponent from '@/components/FormElements/DatePickerComponent.vue';
import EventHelpModalComponent from '@/components/Events/EventHelpModalComponent.vue';
import EventsListComponent from '@/components/Events/EventsListComponent.vue';
import EventSalesReportOverviewChartComponent from '@/components/Events/EventSalesReportOverviewChartComponent.vue';
import SelectComponent from '@/components/FormElements/SelectComponent.vue';
import BaseEventVue from '@/components/Events/BaseEventVue';
import ApiUtils from '../../api/ApiUtils';
type EventStatus = 'ACTIVE' | 'DRAFT' | 'ARCHIVED';

@Component({
  components: {
    DatePickerComponent,
    EventHelpModalComponent,
    EventsListComponent,
    EventSalesReportOverviewChartComponent,
    SelectComponent,
  },
})
export default class Events extends BaseEventVue {
  private buttonActive: number = 1;
  private fromDate: string = '';
  private toDate: string = '';
  private salesReportDuration: string = 'last-year';
  private salesReportDurationList = [
    {
      text: 'Last Year',
      value: 'last-year',
    },
    {
      text: 'Last Month',
      value: 'last-month',
    },
    {
      text: 'Last Week',
      value: 'last-week',
    },
    {
      text: 'Yesterday',
      value: 'yesterday',
    },
  ];
  private salesReportDatasets = [
    {
      label: 'Complimentary',
      backgroundColor: '#50E3C2',
      data: [150, 110, 260, 110, 170, 260, 280, 110, 110, 150, 250, 250],
    },
    {
      label: 'Refunded',
      backgroundColor: '#F5A623',
      data: [240, 290, 120, 60, 180, 110, 80, 180, 220, 160, 350, 150],
    },
    {
      label: 'Total Sales',
      backgroundColor: '#03BD5B',
      data: [380, 320, 290, 320, 420, 520, 480, 390, 320, 420, 500, 460],
    },
  ];
  private salesRevenue: string = '$1,540,239';
  private eventsAttendees: string = '12,125';
  private attendeesThisYear: string = '+185';
  private showEventWithStatus: string = 'DRAFT';
  private eventsList: IEvent[] = [];
  private showEventsPerPageList = [
    {
      text: '10',
      value: '10',
    },
    {
      text: '50',
      value: '50',
    },
    {
      text: '100',
      value: '100',
    },
    {
      text: '150',
      value: '150',
    },
    {
      text: '200',
      value: '200',
    },
  ];
  private currentEventPage: number = 1;
  private showEventsPerPage: string = '10';
  private currentPage: number = 1;
  private filter: string = '';
  private totalRevenue = '$1,540,239';
  private totalAttendees = '12,125';

  get filteredSalesReportDatasets() {
    // tslint:disable-next-line
    let fromDate = '';
    // tslint:disable-next-line
    let toDate = '';

    const dataset = this.salesReportDatasets;

    if (this.salesReportDuration.length < 1) {
      // Sort the dataset based on fromDate and toDate.
    } else {
      if (this.salesReportDuration === 'last-year') {
        // Sort based on last year.
      } else if (this.salesReportDuration === 'last-month') {
        // Sort based on last month.
      } else if (this.salesReportDuration === 'last-week') {
        // Sort based on last week.
      } else if (this.salesReportDuration === 'yesterday') {
        // Sort based on yesterday.
      }
    }
    return dataset;
  }

  get filteredEventsWithStatus() {
    return this.eventsList.filter((event) => event.status === this.showEventWithStatus);
  }

  private deleteEvent(event) {
    try {
      this.api.deleteDashboardEvent(event.id)
        .then((res: any) => {
          const index = this.eventsList.findIndex((e) => e.id === event.id);
          this.eventsList.splice(index, 1);
        });
    } catch (error) {
      // tslint:disable-next-line:no-console
      // console.log('error', error);
    }
  }

  private getEventList() {
    this.api.getDashboardEventsList(this.$store.getters.organizationId)
      .then((res: any) => this.eventsList = res.data.eventsDashboard.events);
  }

  private created() {
    ApiUtils.storeFrameInfo(this.$store);
    this.getEventList();
  }
}
</script>

<style lang="scss" scoped>
.btn {
  letter-spacing: 0.15em;
}

.btn-report-status {
  border-radius: 50px !important;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.15em;
}

.btn-sales-overview-filter {
  border-radius: 10px !important;

  select {
    height: 37px;
  }
}

.graph {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  height: 100%;
  max-height: 405px;
}

.searchbox {
  input {
    border-radius: 10px !important;
  }
  
  .icon {
    top: 8px;
  }
}

.total-revenue,
.total-attendees {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

@media only screen and (min-width: 768px) {
  .sales-report-overview-chart {
    max-height: 305px;
  }
}
</style>
