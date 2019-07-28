<template>
  <div class="mt-4 mr-2 ml-2">
    <b-row>
      <b-col offset="3" md="6" class="text-center header-text text-uppercase">Report Subcribers</b-col>
      <b-col md="3" class="text-right">
        <a
          href class="btn text-primary font-weight-bold"
          data-pt-remove="5"
          @click="openNewSubscriberDialog"
          >+ Create New</a>
      </b-col>
    </b-row>
    <b-row data-pt-remove="5">
      <b-table
        :items="subscribers"
        :responsive="true"
        :fields="subcriberListFields"
        thead-class="header"
        class="my-4 table-shadow remove-table-margin-bottom"
        foot-variant="light"
        :small="true"
        tbody-tr-class="subscriber"
      >
        <div slot="HEAD_email" slot-scope="data" class="text-left pl-2" data-width="350">
          <span>{{ data.label }}</span>
        </div>

        <div slot="email" slot-scope="data" class="text-left pl-2">
            {{ data.item.email }}
        </div>

        <div slot="HEAD_interval" slot-scope="data" class="text-center pl-2" data-width="350">
          <span>{{ data.label }}</span>
        </div>

        <div slot="interval" slot-scope="data" class="text-center">
            {{ data.item.interval }}
        </div>

        <template slot="actions" slot-scope="data">
          <div class="text-center pr-2">
            <img src="@/assets/icons/edit.svg" class="action mr-1" height="21px" @click="() => showEditSubscriber(data.index)">
            <img src="@/assets/icons/delete.svg" class="action ml-1" height="34px" @click="() => deleteSubscriber(data.index)">
          </div>
        </template>

      </b-table>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Subcribers extends Vue {
  @Prop(Array) public readonly subscribers!: any[];
  @Prop(Function) public readonly showEditSubscriber;
  @Prop(Function) public readonly deleteSubscriber;
  private subcriberListFields: any[] = [
    {
      key: 'email',
      thClass: 'email',
    },
    {
      key: 'interval',
      thClass: 'interval',
    },
    {
      key: 'actions',
    },
  ];
  private openNewSubscriberDialog(e) {
    e.preventDefault();
    this.$bvModal.show('new-subscriber');
  }
}
</script>
<style>
  @import "../../../assets/css/Card.css";
  @import "../../../assets/css/Table.css";
  @import "../../../assets/css/Global.css";
  .action{
    cursor: pointer;
  }
  .subscriber{
    height: 35px;
  }
  .email{
    width: 300px;
  }
  .interval{
    width: 500px;
  }
</style>

