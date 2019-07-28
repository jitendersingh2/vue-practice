import moment from 'moment';

import IEventLocation from '@/components/Events/BasicDetails/IEventLocation';
import IEventDuration from '@/components/Events/BasicDetails/IEventDuration';
import ITax from '@/components/Events/Settings/ITax';
import ApiUtils from '../ApiUtils';

export default class IEventData {

  public id: string = '';

  // BASIC
  public name: string = '';
  public slug: string = '';
  public campaignId: string = '';
  public p2pProgramId: string = '';
  public dateAsTicketDate: boolean = false;
  public duration: IEventDuration = {
    eventRange: 'date-range',
    endDate: moment().format(),
    endTime: {
      dateTime: moment().format(),
      timezone: '',
    },
    startDate: moment().format(),
    startTime: {
      dateTime: moment().format(),
      timezone: '',
    },
  };

  public location: IEventLocation = {
    venue: '',
    street: '',
    street2: '',
    city: '',
    state: '',
    country: '',
    zip: '',
  };

// Additional details
  public summary: string = '';
  public description: string = '';
  public embedId: string = '';
  public poster = {
    data: '',
    type: 'IMAGE',
  };
  public webUrl: string = '';
  public terms: string = '';
  public posterUrl: string = '';


// Design
  public footerBgColor: string = '';
  public buttonBgColor: string = '#0C15A3';
  public buttonText: string = 'Get Tickets now';
  public buttonTextColor: string = '#DDF5FF';

 // Embed
  public ticketEmbed: any = {
     theme: 'light',
     showEventImage:  false,
     showEventLocation: false,
     showEventDescription: false,
     showEventTime:  false,
     buttonSize: 'small',
     buttonBgColor: '#0C15A3',
     buttonText: 'Buy now',
     buttonTextColor: '#DDF5FF',
  };

 // Order
 public receiptLogoImageUrl: string = '';
 public receiptSubject: string = '';
 public receiptContent: string = '';

 // Sponsor
 public sponsorTier1Name: string = '';
 public sponsorTier2Name: string = '';
 public sponsorTier3Name: string = '';


 // Settings
 public cartTimeoutSeconds: number = 600;
 public enableBuyerClaimAll: boolean = false;
 public capacity: number = 1;
 public hostEmail: string = '';
 public hostName: string = '';
 public sendTicketsWithConfirmationEmail: boolean = true;
 public tax: ITax = {
   taxRate: '',
   taxNumber: '',
 };
 public enablePublicGuestList: boolean = false;
 public companyName: string = 'NOT IN SCHEMA';

 public type: string = 'tickets';


 // Methods
 get locationMinusVenue() {
    const loc = this.location;
    return (!loc) ? {} : { street: loc.street, street2: loc.street2,
       zip: loc.zip, city: loc.city,
       state: ApiUtils.getPath(loc, 'loc.state.code'),
       country: ApiUtils.getPath(loc, 'loc.country.code'),
    };
  }
}


