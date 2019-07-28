import moment from 'moment';
import PromoCodeModel from './PromoCodeModel';
import ApiUtils from '@/api/ApiUtils';

export default class PromoCodeDTO {

  public static fromModel(objs: PromoCodeModel[]) {
    const data: PromoCodeDTO[] = [];
    for (const obj of objs) {
      const datum: PromoCodeDTO = {
        id:  obj.id,
        promoStartDate: '', promoStartTime: {},
        promoEndDate: '', promoEndTime: {},
        code: obj.code, quantity: obj.quantity,
        used: 'Missing', status: 'Missing',
        appliesTo: 'Unknown',
        pricing: obj.discountFlat,
        limit: obj.quantity === null,
        immediately: obj.promoStart === null,
        eventDate: obj.promoEnd === null,
        discountAmount: 0,
        discountPercent: 0,
      };
      data.push(datum);
    }
    return data;
  }

  public static toModel(obj: PromoCodeDTO) {
    const data: any = {
        id:  obj.id,
        code: obj.code,
        quantity: obj.limit ? null : obj.quantity,
        promoStart: obj.immediately ? null : ApiUtils.toDate(obj.promoStartDate, obj.promoStartTime.dateTime),
        promoEnd: obj.immediately ? null : ApiUtils.toDate(obj.promoEndDate, obj.promoEndTime.dateTime),
        used: obj.used, status: obj.status,
        appliesTo: 'Unknown',
        discountPercent: +obj.discountPercent / 100,
        discountFlat: obj.pricing,
    };
    return Object.assign(new PromoCodeModel(), data);
  }

  // Needs clarity\
  // public name: string = '';
  public discountPercent: number | string = '';
  public discountAmount: number | string = '';
  public id: string = '';

  // Currently used for pricing
  public pricing: number | string = '';

  public promoStartDate: string = '';
  public promoStartTime: any = {
    dateTime: moment().format(),
    timezone: '',
  };
  public promoEndDate: string = '';
  public promoEndTime: any = {
    dateTime: moment().format(),
    timezone: '',
  };

  public appliesTo: any = '';
  public code: string = '';
  public quantity: number | string = '';

  public limit: boolean = false;
  public immediately: boolean = false;
  public eventDate: boolean = false;

  // Needs sourcing
  public used: string = 'Missing';
  public status: string = 'Missing';
}
