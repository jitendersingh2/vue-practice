<template>
  <div>
    <b-table
      :items="items"
      :fields="fields"
      head-variant="light"
      table-class="table-guest-list"
      :current-page="currentPage"
      :responsive="true"
      :per-page="perPage"
      @row-clicked="rowClickHandler"
    >
      <template slot="ticket" slot-scope="row">
        <div class="font-weight-semibold">{{ row.item.ticket }}</div>
      </template>

      <template slot="showDetails" slot-scope="row" class="test">
        <span @click="handleGuestListModal(row.item, row.index)" class="order-img">
          <img src="@/assets/icons/order.svg" height="20px" width="20px" />
        </span>

        <span
          class="btn btn-white btn-sm rounded-circle text-primary mx-2 pointer"
        >
          <i class="fas fa-pencil-alt" @click="editGuest = row.item" v-if="!row.detailsShowing"></i>
          <i class="fas fa-chevron-up guest-collapse" v-if="row.detailsShowing"></i>
        </span>
      </template>

      <template slot="row-details">
        <b-row class="mb-2 toggle-row toggle-row1-padding">
          <b-col md="5">
            <div class="d-flex">
              <input
                type="text"
                class="form-control form-control-sm mr-3 rounded-pill"
                placeholder="Salutation"
                v-model="editGuest.salutation"
              />

              <input
                type="text"
                class="form-control form-control-sm rounded-pill"
                placeholder="First Name"
                v-model="editGuest.firstName"
              />
            </div>
          </b-col>

          <b-col md="5" class="d-flex">
            <input
              type="text"
              class="form-control form-control-sm mr-2 rounded-pill"
              placeholder="Last Name"
              v-model="editGuest.lastName"
            />

            <input
              name="guest-contact"
              type="text"
              class="form-control form-control-sm rounded-pill"
              :class="{ 'border-danger text-danger': errors.has('guest-contact') }"
              v-validate="'numeric|max:10'"
              placeholder="Contact"
              v-model="editGuest.contact"
            />
          </b-col>

          <b-col md="2" class="text-right">
            <i class="fa fa-times icon-close text-muted mr-5" @click="cancelSaveData"></i>
          </b-col>
        </b-row>

        <b-row class="toggle-row toggle-row2-padding">
          <b-col md="5" class="input-block-left">
            <input
              type="text"
              class="form-control form-control-sm rounded-pill"
              placeholder="Address"
              v-model="editGuest.address"
            />
          </b-col>

          <b-col md="5" class="d-flex">
            <input
              name="guest-email"
              type="text"
              class="form-control form-control-sm mr-2 rounded-pill"
              :class="{ 'border-danger text-danger': errors.has('guest-email') }"
              placeholder="Email"
              v-validate="'email'"
              v-model="editGuest.email"
            />

            <input
              type="text"
              class="form-control form-control-sm rounded-pill"
              placeholder="Company"
              v-model="editGuest.company"
            />
          </b-col>

          <b-col md="2" class="text-right">
            <b-button
              class="btn-save font-weight-semibold"
              variant="primary"
              pill
              size="sm"
              @click="saveData"
            >Save</b-button>
          </b-col>
        </b-row>
      </template>
    </b-table>

    <order-modal-component id="order-modal" :ticket="ticket" :ticketIndex="ticketIndex"></order-modal-component>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { cloneDeep, isEmpty } from 'lodash';

import OrderModalComponent from './OrderModalComponent.vue';
import SelectComponent from '@/components/FormElements/SelectComponent.vue';

@Component({
  components: {
    OrderModalComponent,
    SelectComponent,
  },
})
export default class GuestListComponent extends Vue {
  @Prop(Array) public readonly items!: [];
  @Prop(Array) public readonly guestList!: [];
  @Prop(Number) public readonly currentPage!: number;
  @Prop(String) public readonly perPage!: string;
  public isActive: any = false;

  private ticket = {
    ticketId: '',
    firstName: '',
    lastName: '',
    email: '',
    ticketType: '',
    address: '',
  };
  private ticketIndex = -1;
  private index: any = 0;
  private notes = '';
  private dropdown = 'S';
  private checked = ['Splendor'];
  private selected = 'pizza';
  private selected2 = 's';

  private editGuest = {};

  private fields: any[] = [
    {
      key: 'ticket',
      variant: 'secondary-light',
      label: 'Ticket #',
      sortable: true,
    },
    {
      key: 'firstName',
      label: 'First Name',
      sortable: true,
    },
    {
      key: 'lastName',
      label: 'Last Name',
      sortable: true,
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
    },
    {
      key: 'ticketType',
      label: 'Ticket Type',
      sortable: true,
    },
    {
      key: 'showDetails',
      label: '',
    },
  ];

  private rowClickHandler(item) {
    let guest = {};

    this.guestList.forEach((data: any, index) => {
      let isVisible = false;

      if (data.ticket === item.ticket) {
        if (! data.hasOwnProperty('_showDetails') || data._showDetails === undefined) {
          isVisible = true;
        } else {
          isVisible = ! data._showDetails;
        }
      }

      if (isEmpty(guest) && isVisible) {
        guest = cloneDeep(this.guestList[index]);
      }

      this.$set(this.guestList[index], '_showDetails', isVisible);
    });

    this.editGuest = guest;
  }

  private handleGuestListModal(item, index) {
    this.ticket = this.items[index];
    this.ticketIndex = index;

    this.$bvModal.show('order-modal');
  }

  private saveData() {
    const promises: any = [];
    promises.push(this.$validator.validateAll());

    Promise.all(promises).then((validations) => {
      // If one validation has failed, we stop here
      if (validations.some((validation) => validation === false)) { return; }

      const index = this.guestList.findIndex((data: any) => data._showDetails === true);

      this.$emit('update-guest', { index, guest: this.editGuest });

      this.editGuest = {};
      this.$set(this.guestList[index], '_showDetails', false);
    });
  }

  private cancelSaveData() {
    this.editGuest = {};
    this.guestList.forEach((data: any, index) => this.$set(this.guestList[index], '_showDetails', false));
  }
}
</script>

<style lang="scss" scoped>
input {
  font-weight: 600;
  
  &:not(:only-child) {
    max-width: 49%;
  }
}

.icon-close {
  font-size: 22px;
}

.btn-save {
  margin-right: 2rem;
}

.toggle-row {
  margin-right: -10px;
  margin-left: -8px;
}

.toggle-row1-padding {
  padding-top: 6px;
  padding-bottom: 3px;
}

.toggle-row2-padding {
  padding-top: 6px;
  padding-bottom: 7px;
}
</style>

<style>
.table-guest-list .tablebody .b-table-has-details {
  box-shadow: 1px 6px 5px -1px #bbb;
}

.table-guest-list .tablebody .table-secondary-light {
  background-color: #f1f1f1;
}

.table-guest-list .tablebody .b-table-has-details,
.table-guest-list .tablebody .b-table-has-details .table-secondary-light {
  background-color: rgba(174, 213, 239, 1) !important;
}

.table-guest-list .pointer {
  cursor: pointer;
}
</style>
