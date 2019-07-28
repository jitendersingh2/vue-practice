import moment from 'moment';

export default class ITicketData {
// Match Schema
  public id: string = '';
  public name: string = '';
  public quantity: string | number = 'unlimited';
  // public ticketStart = {
  //   dateTime: moment().format(),
  //   timezone: '',
  // };
  public ticketStart = 'ABCD';
  get ticketStartX() {
    return 'ABCD'; // moment(moment(), 'MM-DD-YYYY');
  }
  public ticketEnd = {
    dateTime: moment().format(),
    timezone: '',
  };
  public ticketEndTimeZone: string = '';
  public promoCode: object = {
    code: '',
  };
  public status: string = '';
  public description: string = '';
  public accessCode: string = '';
  public showRemainingQuantity: boolean = true;
  public promoCodeId: string = '';
  public surveyId: string = '';


 // Doesnt match
  public ticketPrice = {
    price: 0,
    fairMarketValue: 0,
  };
  public ticketStartDate: string = moment().format();
  public ticketStartTime: string = moment().format('HH:mm:ss');
  public ticketEndDate: string = moment().format();
  public ticketEndTime: string = moment().format('HH:mm:ss');

  // Extension
  public isPriceFree: boolean = false;
  public isImmediate: boolean = false;
  public isEventDate: boolean = false;
}

