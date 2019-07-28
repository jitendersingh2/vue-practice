<template>
    <b-table
      head-variant="light"
      :responsive="true"
      :items="orders"
      :fields="fields"
      :filter="filter"
      :per-page="perPage"
      :current-page="currentPage"
    >
      <template slot="orderId" slot-scope="data">
        <div class="text-center">
          <div :id="'order-' + data.item.orderId" class="font-weight-semibold">{{ data.item.orderId.substring(0, 8) }}</div>
          <div>{{ data.item.ticketPurchaseDate }}</div>

          <b-tooltip
            placement="right"
            :target="'order-' + data.item.orderId"
            :title="data.item.orderId"
          ></b-tooltip>
        </div>
      </template>

      <template slot="firstName" slot-scope="data">
        <div class="text-center">
          <div :id="'first-name-' + data.item.orderId">{{ data.item.firstName }}</div>

          <b-tooltip
            placement="right"
            :target="'first-name-' + data.item.orderId"
            :title="data.item.firstName"
          ></b-tooltip>
        </div>
      </template>

      <template slot="actions" slot-scope="data">
        <span class="btn btn-white btn-sm rounded-circle text-primary mx-2" @click="data.toggleDetails">
          <i v-if="!data.item._showDetails" class="fas fa-pencil-alt cursor-pointer"></i>
          <i v-if="data.item._showDetails" class="fas fa-chevron-up order-collapse cursor-pointer"></i>
        </span>
      </template>
      
      <template slot="row-details" slot-scope="row">
        <edit-order-component class="border reverse-margin" :editedOrder="row.item" :updateOrder="updateOrder"></edit-order-component>
      </template>
    </b-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import EditOrderComponent from './EditOrderComponent.vue';


@Component({
  components: {
    EditOrderComponent,
  },
})
export default class EventOrdersListComponent extends Vue {
  @Prop(Number) public readonly currentPage!: number;
  @Prop(Array) public readonly orders!: any;
  @Prop(String) public readonly filter!: string;
  @Prop(String) public readonly perPage!: number;
  @Prop(Function) public readonly updateOrder;

  private fields = [
    {
      key: 'orderId',
      label: 'Order #',
      sortable: false,
      variant: 'light',
    },
    {
      key: 'firstName',
      label: 'First Name',
      sortable: false,
    },
    {
      key: 'lastName',
      label: 'Last Name',
      sortable: false,
    },
    {
      key: 'email',
      label: 'Email',
      sortable: false,
    },
    {
      key: 'paymentMethod',
      label: 'Method',
      sortable: false,
    },
    {
      key: 'amount',
      label: 'Amount',
      sortable: false,
    },
    {
        key: 'actions',
        label: '',
        sortable: false,
    },
  ];

  private editEvent(event) {
    // Do some processing ...
  }
}
</script>

<style lang="scss" scoped>
.order-collapse {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.5);
}

.reverse-margin {
  margin: -15px;
}
</style>
