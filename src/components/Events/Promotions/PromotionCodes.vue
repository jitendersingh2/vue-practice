<template>
  <div>
    <b-row>
      <b-col></b-col>

      <b-col md='6'>
        <h4 class="font-weight-semibold mb-0 text-center text-primary">PROMOTIONAL CODES</h4>
      </b-col>

      <b-col class="text-right">
        <a class="font-weight-semibold mr-4" href="#" @click="handleType('new', null, null)">+ Create New</a>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <div class="mt-4 mb-5 table-standard">
          <b-table
            responsive
            head-variant="light"
            :items='promotionsList'
            :fields='promotionsListFields'
            :filter='filter'
          >
            <template slot='promoCode' slot-scope='promoListData'>
              <span class='free-stuff'>{{ promoListData.item.code }}</span>
              <br>
              <span class='general-adult'>{{ getAppliesField(promoListData.item.appliesTo) }}</span>
            </template>

            <template slot='pricing' slot-scope='promoListData'>
              <span class='upper-price'>${{ promoListData.item.pricing }}</span>
              <br>
              <span class='lower-price'>$5.00</span>
            </template>

            <template slot='starts' slot-scope='promoListData'>
              <span>{{ dateFormatFunction(promoListData.item.promoStartDate) }}</span>
              <br>
              <span>{{ promoListData.item.promoStartTime.dateTime | moment('LT') }}</span>
            </template>

            <template slot='ends' slot-scope='promoListData'>
              <span>{{ dateFormatFunction(promoListData.item.promoEndDate) }}</span>
              <br>
              <span>{{ promoListData.item.promoEndTime.dateTime | moment('LT') }}</span>
            </template>

            <template slot='action' slot-scope='promoListData'>
              <span class='cursor' @click="handleType('edit', promoListData.item, promoListData.index)">
                <img src='@/assets/icons/edit-icon.svg' height='15px' width='25'>
              </span>
              
              <span
                class='cursor'
                @click='handleDeleteItem(promoListData.index)'
                v-b-modal.delete-promo-ticket-modal
              >
                <img src='@/assets/icons/delete-icon.svg' height='35px' width='30'>
              </span>

              <img
                class='cursor'
                @click='handlePlay(promoListData.item, promoListData.index)'
                v-if="promoListData.item.status==='Open'"
                src='@/assets/icons/pause-icon.svg'
                width='30'
                height='30px'
              >
              
              <img
                class='cursor'
                @click='handlePlay(promoListData.item, promoListData.index)'
                v-if="promoListData.item.status==='Paused'"
                src='@/assets/icons/vector.svg'
                width='25'
                height='16px'
              >
            </template>
          </b-table>
        </div>
      </b-col>
    </b-row>

    <promo-code-modal
      id='promo-code-modal'
      :type='type'
      :item='listItem'
      :itemIndex='index'
      v-model='listItem'
      @addNewPromoCode='addNewPromoCode'
      @editPromoCode='editPromoCode'
      @updatePromoCode='updatePromoCode'
    ></promo-code-modal>

    <delete-promo-ticket-modal
      id='delete-promo-ticket-modal'
      :deleteIndex='deleteIndex'
      @deleteItem='deleteItem'
    ></delete-promo-ticket-modal>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';

import DeletePromoTicketModal from './modals/DeletePromoTicketModal.vue';
import PromoCodeModal from './modals/PromoCodeModal.vue';
import BaseEventVue from '@/components/Events/BaseEventVue';
import PromoCodeDTO from '@/api/model/PromoCodeDTO';
import ApiUtils from '@/api/ApiUtils';

@Component({
  components: {
    DeletePromoTicketModal,
    PromoCodeModal,
  },
})
export default class PromotionCodes extends BaseEventVue {
  private filter: string = '';
  private type: string = 'new';
  private index: any = null;
  private deleteIndex: any = null;
  private eventId: string = '';

  private listItem: any = new PromoCodeDTO();

  // private promotionsList: any[] = [
  //   {
  //     promoCode: 'FREE STUFF',
  //     pricing: 135.00,
  //     startDate: new Date().toISOString(),
  //     startTime: {
  //       dateTime: moment().format(),
  //       timezone: '',
  //     },
  //     endDate: new Date().toISOString(),
  //     endTime: {
  //       dateTime: moment().format(),
  //       timezone: '',
  //     },
  //     qty: 'Unlimited',
  //     used: '1',
  //     status: 'Open',
  //     appliesTo: 'General Adult',
  //   },
  //   {
  //     promoCode: 'FREE STUFF',
  //     pricing: 135.00,
  //     startDate: new Date().toISOString(),
  //     startTime: {
  //       dateTime: moment().format(),
  //       timezone: '',
  //     },
  //     endDate: new Date().toISOString(),
  //     endTime: {
  //       dateTime: moment().format(),
  //       timezone: '',
  //     },
  //     qty: 'Unlimited',
  //     used: '2',
  //     status: 'Open',
  //     appliesTo: 'General Adult',
  //   },
  //   {
  //     promoCode: 'FREE STUFF',
  //     pricing: 135.00,
  //     startDate: new Date().toISOString(),
  //     startTime: {
  //       dateTime: moment().format(),
  //       timezone: '',
  //     },
  //     endDate: new Date().toISOString(),
  //     endTime: {
  //       dateTime: moment().format(),
  //       timezone: '',
  //     },
  //     qty: '320',
  //     used: '3',
  //     status: 'Open',
  //     appliesTo: 'General Adult',
  //   },
  //   {
  //     promoCode: 'FREE STUFF',
  //     pricing: 135.00,
  //     startDate: new Date().toISOString(),
  //     startTime: {
  //       dateTime: moment().format(),
  //       timezone: '',
  //     },
  //     endDate: new Date().toISOString(),
  //     endTime: {
  //       dateTime: moment().format(),
  //       timezone: '',
  //     },
  //     qty: 'Unlimited',
  //     used: '4',
  //     status: 'Paused',
  //     appliesTo: 'General Adult',
  //   },
  //   {
  //     promoCode: 'FREE STUFF',
  //     pricing: 135.00,
  //     startDate: new Date().toISOString(),
  //     startTime: {
  //       dateTime: moment().format(),
  //       timezone: '',
  //     },
  //     endDate: new Date().toISOString(),
  //     endTime: {
  //       dateTime: moment().format(),
  //       timezone: '',
  //     },
  //     qty: 'Unlimited',
  //     used: '5',
  //     status: 'Open',
  //     appliesTo: 'General Adult',
  //   },
  // ];
  private promotionsList: any[] = [];

  private promotionsListFields: any[] = [
    {
      key: 'promoCode',
    },
    {
      key: 'pricing',
    },
    {
      key: 'starts',
    },
    {
      key: 'ends',
    },
    {
      key: 'quantity',
    },
    {
      key: 'used',
    },
    {
      key: 'status',
    },
    {
      key: 'action',
      label: '',
    },
  ];

  private getAppliesField(field) {
    if (typeof field === 'string') {
      return field;
    } else if (Array.isArray(field)) {
      return field[0].label;
    }
  }

  private getPricing(field) {
    if (field === null || field === undefined) {
      return '$0.00';
    } else if (field.includes('$')) {
      return field;
    } else {
      return `$${field}.00`;
    }
  }

  private timeFormatFunction(dateString) {
    if (dateString) {
      const date = new Date(dateString);
      return ApiUtils.formatTime(date);
    } else {
      const today = new Date();
      return ApiUtils.formatTime(today);
    }
  }

  private dateFormatFunction(dateString) {
    if (dateString === null || dateString === undefined) {
      return '';
    } else if (dateString) {
      const date = new Date(dateString);
      return this.formatDate(date);
    } else {
      const today = new Date();
      return this.formatDate(today);
    }
  }

  private formatDate(date) {
    let dd: string | number = date.getDate();
    let mm: string | number = date.getMonth() + 1;

    const yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return mm + '-' + dd + '-' + yyyy;
  }

  private handleDeleteItem(index) {
    this.deleteIndex = index;
  }

  private handleType(type, item, index) {
    if (type === 'new') {
      this.type = 'new';
      this.listItem = new PromoCodeDTO();
      this.$bvModal.show('promo-code-modal');
    } else if (type === 'edit') {
      this.type = 'edit';
      item = { ...item, ...{ used: '2' } };
      this.listItem = item;
      this.index = index;
      this.$bvModal.show('promo-code-modal');
    }
  }

  private deleteItem(index) {
    this.promotionsList.splice(index, 1);
  }

  private addNewPromoCode(item) {
    this.promotionsList.push(item);
  }

  private editPromoCode(index, item) {
    this.promotionsList.splice(index, 1, item);
  }

  private handlePlay(item, index) {
    if (item.status === 'Open') {
      const item1 = { ...item, status: 'Paused' };
      this.promotionsList.splice(index, 1, item1);
    } else if (item.status === 'Paused') {
      const item2 = { ...item, status: 'Open' };
      this.promotionsList.splice(index, 1, item2);
    }
  }

  private updatePromoCode({ key, value }) {
    this[key] = value;
  }

  private created() {
    this.eventId = this.$route.params.eventId;

    this.api.getPromoCodes(this.eventId)
      .then((res) => {
        const promos = this.handleSuccess(res, 'data.event.promoCodes');
        this.promotionsList = PromoCodeDTO.fromModel(promos);
        // this.$msgbox(JSON.stringify(this.promotionsList), 'X');
        })
      .catch(this.handleFailure);
  }
}
</script>
<style scoped>
span.free-stuff {
  color: #000000;
  font-weight: 700;
  font-size: 16px;
}

span.general-adult {
  font-weight: 500;
  font-size: 16px;
  margin-left: 10px;
}

span.upper-price {
  color: red;
  text-decoration: line-through;
  font-size: 16px;
}

span.lower-price {
  font-weight: 600;
  font-size: 15px;
}

i.fa {
  margin: 5px;
  color: #388cd0;
  background: #fff;
  padding: 5px;
  border-radius: 20px;
}

span.cursor img {
  cursor: pointer;
}

img.cursor {
  cursor: pointer;
}

@media (min-width: 1024px) {
  .event {
    margin-left: 133px;
  }
}

@media (max-width: 768px) {
  .event {
    display: block;
    text-align: center;
  }

  p.create span {
    text-align: center;
    display: block;
    margin: auto;
    width: 180%;
  }
}
</style>
