<template>
  <div>
    <b-row class="mb-4">
      <b-col>
        <div class="d-flex align-items-center">
          <div class="w-100 mr-3">
            <v-select
              class="complementary-tickets-search-field"
              :options="ticketIDList"
              v-model="dropdownFilter"
              placeholder="#Tickets"
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

      <b-col md="5">
        <h3 class="font-weight-semibold text-center text-primary">COMPLEMENTARY TICKETS</h3>
      </b-col>

      <b-col class="text-right">
        <a
          class="font-weight-semibold mr-4"
          href="#"
          v-b-modal.new-complementary-ticket-modal
        >+ Create New</a>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <div class="table-standard">
          <b-table
            responsive
            head-variant="light"
            :items="complementaryList"
            :fields="complementaryFieldsList"
            thead-class="header"
            :filter="filter"
            :filter-function="filterFunction"
            @row-clicked="rowClickHandler"
          >
            <template slot="action" slot-scope="compTicket">
              <span @click="handleOrderModal(compTicket.item)" class="order-img">
                <img src="@/assets/icons/order.svg" height="20px" />
              </span>
            </template>
          </b-table>
        </div>

        <new-complementary-ticket-modal
          id="new-complementary-ticket-modal"
          v-model="ticketItem"
          @addNewCompTicket="addNewCompTicket"
        ></new-complementary-ticket-modal>

        <order-modal
          id="order-modal"
          v-model="ticketItem"
          :itemIndex="index"
          @editCompItem="editCompItem"
        ></order-modal>
      </b-col>
    </b-row>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import vSelect from 'vue-select';
import NewComplementaryTicketModal from './modals/NewComplementaryTicketModal.vue';
import OrderModal from './modals/OrderModal.vue';
import IComplementaryTicket from './types/IComplementaryTicket';

@Component({
  components: {
    vSelect,
    NewComplementaryTicketModal,
    OrderModal,
  },
})
export default class ComplementaryTickets extends Vue {
  private filter: any = null;
  private dropdownFilter: any = { label: 'Ticket#', value: 'ticketId' };

  private ticketItem = {
    ticketId: '',
    fName: '',
    lName: '',
    email: '',
    ticketType: '',
    address: '',
    qty: '',
  };

  private ticketIDList: any[] = [
    { label: 'Ticket#', value: 'ticketId' },
    { label: 'First Name', value: 'fName' },
    { label: 'Last Name', value: 'lName' },
    { label: 'Email', value: 'email' },
  ];

  private searchFilter: string = '';
  private index: any = null;

  private complementaryList: any[] = [
    {
      ticketId: 'A9229D50D11DBE',
      fName: 'Wade',
      lName: 'Wiggs',
      email: 'mrogers@email.com',
      ticketType: 'General Adult',
      address:
        '101 Davidson Street \n The Colony, Texas 75007 \n United States',
      qty: '',
    },
    {
      ticketId: 'A9229D50D12DBE',
      fName: 'Wade',
      lName: 'Wiggs',
      email: 'mrogers@email.com',
      ticketType: 'General Adult',
      address:
        '101 Davidson Street \n The Colony, Texas 75007 \n United States',
      qty: '',
    },
    {
      ticketId: 'A9229D50D13DBE',
      fName: 'Wade',
      lName: 'Wiggs',
      email: 'mrogers@email.com',
      ticketType: 'General Adult',
      address:
        '101 Davidson Street \n The Colony, Texas 75007 \n United States',
      qty: '',
    },
    {
      ticketId: 'A9229D50D14DBE',
      fName: 'Wade',
      lName: 'Wiggs',
      email: 'mrogers@email.com',
      ticketType: 'General Adult',
      address:
        '101 Davidson Street \n The Colony, Texas 75007 \n United States',
      qty: '',
    },
    {
      ticketId: 'A9229D50D15DBE',
      fName: 'Wade',
      lName: 'Wiggs',
      email: 'mrogers@email.com',
      ticketType: 'General Adult',
      address:
        '101 Davidson Street \n The Colony, Texas 75007 \n United States',
      qty: '',
    },
  ];

  private complementaryFieldsList: any[] = [
    {
      key: 'ticketId',
      label: 'Ticket#',
    },
    {
      key: 'fName',
      label: 'First Name',
    },
    {
      key: 'lName',
      label: 'Last Name',
    },
    {
      key: 'email',
    },
    {
      key: 'ticketType',
      label: 'Ticket',
    },
    {
      key: 'action',
      label: 'Order',
    },
  ];

  private tickets: IComplementaryTicket[] = [
    {
      id: 1,
      fName: 'Advanced Child',
      lName: '',
      type: '',
      quantity: '',
      email: '',
    },
    {
      id: 2,
      fName: 'General Adult',
      lName: '',
      type: '',
      quantity: '',
      email: '',
    },
  ];

  get ticketsList() {
    return this.tickets.map((ticket) => ({
      text: ticket.fName,
      value: ticket.id,
    }));
  }

  private filterFunction(x, y) {
    if (
      this.dropdownFilter &&
      x[this.dropdownFilter.value].toLowerCase().includes(y.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  }

  private rowClickHandler(item, index, event) {
    this.index = index;
  }

  private addNewCompTicket() {
    let item = this.ticketItem;
    item = {
      ...item,
      ...{ ticketId: 'A9229D50D1DBE', ticketType: 'Advanced Child' },
    };
    this.complementaryList.push(item);
  }

  private handleOrderModal(item) {
    this.ticketItem = Object.assign({}, { ...this.ticketItem, ...item });
    this.$bvModal.show('order-modal');
  }

  private editCompItem(index, item) {
    this.complementaryList.splice(index, 1, item);
  }
}
</script>

<style lang="scss" scoped>
.searchbox input {
  height: 32px;
}
</style>

<style lang="scss">
.complementary-tickets-search-field {
  .vs__clear {
    display: none;
  }

  .vs__dropdown-toggle {
    background-color: #f8f9fa !important;
    border-radius: 10px;
  }
}

.searchbox .icon {
  right: 10px !important;
  top: 5px !important;
}
</style>
