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
                <b-row class="mb-3">
                  <b-col>
                    <div class="d-flex align-items-center">
                      <div class="w-100 mr-3">
                        <v-select
                          class="guestlist-search-field"
                          :options="ticketIDList"
                          v-model="dropdownFilter"
                          placeholder="Ticket #"
                        />
                      </div>

                      <div class="searchbox input-with-icon icon-right">
                        <input
                          type="text"
                          class="form-control bg-light rounded-standard-semi"
                          placeholder="Search"
                          v-model="filter"
                        />
                        <span class="icon text-muted">
                          <i class="fas fa-search"></i>
                        </span>
                      </div>
                    </div>
                  </b-col>

                  <b-col md="4">
                    <h3 class="font-weight-semibold text-center text-primary">Guest List</h3>
                  </b-col>

                  <b-col class="text-right">
                    <download-excel
                      class="btn btn-primary rounded-standard-semi"
                      :data="exportItems"
                      worksheet="My Worksheet"
                      name="filename.xls"
                    >
                      Download List
                      <img
                        src="@/assets/icons/download.svg"
                        height="22px"
                        width="24px"
                      />
                    </download-excel>
                  </b-col>
                </b-row>

                <b-row class="mb-4">
                  <b-col>
                    <div class="table-standard">
                      <guestlist-component
                        :guestList="guestList"
                        :items="filteredItems"
                        :perPage="showGuestsPerPage"
                        :currentPage="currentPage"
                        @update-guest="updateGuest"
                      ></guestlist-component>
                    </div>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col md="4" class>
                    <div class="col-md d-flex align-items-center">
                      <span class="mr-2">Show</span>

                      <select-component
                        class="select-per-page"
                        :options="showGuestsPerPageList"
                        v-model="showGuestsPerPage"
                      ></select-component>

                      <span class="ml-2">per page</span>
                    </div>
                  </b-col>

                  <b-col md="4" class>
                    <b-pagination
                      class="paginate-events"
                      :total-rows="filteredItems.length"
                      :per-page="showGuestsPerPage"
                      v-model="currentGuestPage"
                      prev-text="<"
                      next-text=">"
                      align="center"
                      hide-goto-end-buttons
                    />
                  </b-col>
                </b-row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import { cloneDeep } from 'lodash';
import JsonExcel from 'vue-json-excel';
import vSelect from 'vue-select';

import EventHeaderComponent from '@/components/Events/EventHeaderComponent.vue';
import EventTabsComponent from '@/components/Events/EventTabsComponent.vue';
import GuestlistComponent from '@/components/Events/Guestlist/GuestlistComponent.vue';
import SelectComponent from '@/components/FormElements/SelectComponent.vue';

Vue.component('downloadExcel', JsonExcel);

@Component({
  components: {
    EventHeaderComponent,
    EventTabsComponent,
    GuestlistComponent,
    SelectComponent,
    vSelect,
  },
})
export default class EventGuestlist extends Vue {
  private event = {
    name: 'Back to the Ballpark 2019',
  };
  private currentGuestPage: number = 1;
  private showGuestsPerPage = '10';
  private currentPage: number = 1;
  private filter: string = '';
  private orderBy: string = '';
  private dropdownFilter: any = { label: 'Ticket#', value: 'ticket' };
  private notes = '';
  private dropdown = 'S';
  private checked = ['Spelnder'];
  private selected = 'pizza';
  private selected2 = 's';

  private ticketIDList: any[] = [
    { label: 'Ticket#', value: 'ticket' },
    { label: 'First Name', value: 'firstName' },
    { label: 'Last Name', value: 'lastName' },
    { label: 'Email', value: 'email' },
    { label: 'Ticket Type', value: 'ticketType' },
  ];

  private guestList: any[] = [
    {
      ticket: 'A9329D50D1DD1',
      salutation: 'Salutation',
      firstName: 'Hugh',
      lastName: 'Seizer',
      contact: '9998887776',
      address: 'Address',
      company: 'Company',
      email: 'jared@jared.com',
      ticketType: 'General Adult',
      _showDetails: false,
      details: [
        {
          que: 'Enter Note',
          ans: this.notes,
          type: 'textarea',
        },
        {
          que: 'Type of meal',
          ans: this.selected,
          type: 'radio',
        },
        {
          que: 'T-shirt size',
          ans: this.dropdown,
          type: 'dropdown',
        },
        {
          que: 'Bike Type',
          ans: this.checked,
          type: 'checkbox',
        },
      ],
    },
    {
      ticket: 'A9329D50D1DD2',
      salutation: 'Salutation',
      firstName: 'joly',
      lastName: 'Seizer',
      contact: '9998887776',
      address: 'Address',
      company: 'Company',
      email: 'joly@jared.com',
      ticketType: 'General Adult',
      _showDetails: false,
      details: [
        {
          que: 'Enter Note',
          ans: this.notes,
          type: 'textarea',
        },
        {
          que: 'Type of meal',
          ans: this.selected,
          type: 'radio',
        },
        {
          que: 'T-shirt size',
          ans: this.dropdown,
          type: 'dropdown',
        },
        {
          que: 'Bike Type',
          ans: this.checked,
          type: 'checkbox',
        },
      ],
    },
    {
      ticket: 'A9329D50D1DD3',
      salutation: 'Salutation',
      firstName: 'Bill',
      lastName: 'Andorson',
      contact: '9998887776',
      address: 'Address',
      company: 'Company',
      email: 'billA@gmail.com',
      ticketType: 'General Adult',
      _showDetails: false,
      details: [
        {
          que: 'Enter Note',
          ans: this.notes,
          type: 'textarea',
        },
        {
          que: 'Type of meal',
          ans: this.selected,
          type: 'radio',
        },
        {
          que: 'T-shirt size',
          ans: this.dropdown,
          type: 'dropdown',
        },
        {
          que: 'Bike Type',
          ans: this.checked,
          type: 'checkbox',
        },
      ],
    },
    {
      ticket: 'A9329D50D1DD4',
      salutation: 'Salutation',
      firstName: 'Ruby',
      lastName: 'McCollumn',
      contact: '9998887776',
      address: 'Address',
      company: 'Company',
      email: 'ruby@gmail.com',
      ticketType: 'General Adult',
      _showDetails: false,
      details: [
        {
          que: 'Enter Note',
          ans: this.notes,
          type: 'textarea',
        },
        {
          que: 'Type of meal',
          ans: this.selected,
          type: 'radio',
        },
        {
          que: 'T-shirt size',
          ans: this.dropdown,
          type: 'dropdown',
        },
        {
          que: 'Bike Type',
          ans: this.checked,
          type: 'checkbox',
        },
      ],
    },
  ];

  private showGuestsPerPageList = [
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

  private guestExcelFields = {
    'Ticket': 'ticket',
    'Salutation': 'salutation',
    'First Name': 'firstName',
    'Last Name': 'lastName',
    'Contact': 'contact',
    'Address': 'address',
    'Email': 'email',
    'Ticket Type': 'ticketType',
    'Company': 'company',
    'Details': 'details',
  };

  get exportItems() {
    const list: any = [];

    this.filteredItems.forEach((item) => {
      const ITEM = cloneDeep(item);

      if (item && item.details && item.details.length > 0) {
        item.details.forEach((data, index) => {
          ITEM['que' + (index + 1)] = data.que;
          ITEM['ans' + (index + 1)] = data.ans;
        });
      }

      list.push(ITEM);
    });

    return list;
  }

  get filteredItems() {
    if (this.filter) {
      const orderBy = this.dropdownFilter
        ? this.dropdownFilter.value
        : 'ticket';

      return this.guestList.filter((el) => {
        return (
          el[orderBy].toLowerCase().indexOf(this.filter.toLowerCase()) !== -1
        );
      });
    }

    return this.guestList;
  }

  private updateGuest({ index, guest }) {
    this.$set(this.guestList, index, guest);
  }
}
</script>

<style lang="scss" scoped>
.searchbox input {
  height: 32px;
}

.searchbox .icon {
  right: 10px !important;
  top: 5px !important;
}
</style>

<style lang="scss">
.guestlist-search-field {
  .vs__clear {
    display: none;
  }

  .vs__dropdown-toggle {
    background-color: #f8f9fa !important;
    border-radius: 10px;
  }
}
</style>
