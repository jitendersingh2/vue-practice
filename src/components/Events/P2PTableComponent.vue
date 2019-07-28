<template>
    <b-table
      head-variant="light"
      :responsive="true"
      :items="emails"
      :fields="fields"
      :filter="filter"
    >
        <!-- A custom formatted header cell for field 'name' -->
      <template slot="HEAD_action" slot-scope="data">
        <span class="text-secondary cursor-pointer" @click="toggleContentVisibilityByType()"><i class="fa fa-chevron-up"></i></span>
      </template>
      <template slot="email" slot-scope="data">
        <div class="text-left">
          <div class="font-weight-semibold">{{ data.item.emailSubject }}</div>
          <div class="email-body">{{ data.item.emailBody }}</div>
        </div>
      </template>

      <template slot="status" slot-scope="data">
        <div class="text-left">
          <toggle-button class="mb-0" :labels="btnToggleLabels" v-model="data.item.status === 'ON' ? true : false" @change="sendStatusEmailByType($event)" />
        </div>
      </template>

      <template slot="options" slot-scope="data">
        <span class="btn btn-white btn-sm rounded-circle text-primary mx-2" @click="data.toggleDetails">
          <i v-if="!data.item._showDetails" class="fas fa-pencil-alt cursor-pointer"></i>
          <i v-if="data.item._showDetails" class="fas fa-chevron-up order-collapse cursor-pointer"></i>
        </span>
      </template>
      
      <template slot="row-details" slot-scope="row">
        <p-2-p-table-row-edit-component class="border reverse-margin" :type="type" :editEmail="row.item" :updateEmail="updateEmail" :sendEmail="sendEmail"></p-2-p-table-row-edit-component>
      </template>
    </b-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ToggleButton } from 'vue-js-toggle-button';

import P2PTableRowEditComponent from './P2PTableRowEditComponent.vue';

@Component({
  components: {
    ToggleButton,
    P2PTableRowEditComponent,
  },
})
export default class P2PTableComponent extends Vue {
  @Prop(String) public readonly type!: any;
  @Prop(Array) public readonly emails!: any;
  @Prop(String) public readonly filter!: string;
  @Prop(Function) public readonly updateEmail;
  @Prop(Function) public readonly sendEmail;
  @Prop(Function) public readonly sendStatusEmail;
  @Prop(Function) public readonly toggleContentVisibility;

  private isContentVisible: boolean = false;

  private btnToggleLabels = {
    checked: 'ON',
    unchecked: 'OFF',
  };

  private fields = [
    {
      key: 'email',
      label: 'Email',
      sortable: false,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: false,
    },
    {
      key: 'options',
      label: 'Options',
      sortable: false,
    },
    {
      key: 'action',
      label: '',
      sortable: false,
    },
  ];

  private toggleContentVisibilityByType() {
    this.toggleContentVisibility(this.type);
  }

  private sendStatusEmailByType(event) {
    console.log('event- ', event);
    this.sendStatusEmail(event.value, this.type);
  }

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

.email-body {
  font-size: 12px;
  color: #dedede;
}
</style>
