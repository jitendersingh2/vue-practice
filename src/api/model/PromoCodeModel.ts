import moment from 'moment';

export default class PromoCodeModel {

  public id: string = '';
  public name: string = '';
  public code: string = '';
  public quantity: number | string = '';
  public discountPercent: number | string = '';
  public discountFlat: number | string = '';
  public promoStart: string = '';
  public promoEnd: string = '';

  public discountAmount: number | string = '';
  public ticketId: string = '';
}

