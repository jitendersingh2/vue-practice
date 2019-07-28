import moment from 'moment';
import ApiUtils from '../ApiUtils';

export default class EventModel {

  public static getBasic(obj: EventModel) {
    if (obj.venueAddress === null) {
      obj.venueAddress = {};
    }
    return {
      id:  obj.id, name:  obj.name, slug:  obj.slug,
      campaignId: obj.campaignId, p2pProgramId: obj.p2pProgramId,
      location: {
        venue: obj.venueName, street: obj.venueAddress.street,
        street2: obj.venueAddress.street2, city: obj.venueAddress.city,
        state: obj.venueAddress.state, country: obj.venueAddress.country,
        zip: obj.venueAddress.zip,
      },
      duration: {
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
      },
    };
  }

  public static getAdditional(obj: EventModel) {
    return {
      id:  obj.id, webUrl:  obj.webUrl, summary:  obj.summary,
      terms: obj.terms, description: obj.description,
      embedId: obj.embedId, posterUrl: obj.posterUrl,
    };
  }

  public static getDesign(obj: EventModel) {
    return {
      id: obj.id, buttonText: obj.buttonText, footerBgColor: obj.footerBgColor,
      buttonBgColor: obj.buttonBgColor, buttonTextColor: obj.buttonTextColor,
    };
  }

  public static getEmbed(obj: EventModel) {
    return {
      id: obj.id, buttonText: obj.buttonText, footerBgColor: obj.footerBgColor,
      buttonBgColor: obj.buttonBgColor, buttonTextColor: obj.buttonTextColor,
    };
  }

  public static getOrderEmail(obj: EventModel) {
    return {
      id: obj.id, name: obj.name,
      receiptLogoImageUrl: obj.receiptLogoImageUrl,
      receiptContent: ApiUtils.nullToEmpty(obj.receiptContent),
      receiptSubject: ApiUtils.nullToEmpty(obj.receiptSubject),
    };
  }

  public static getSponsor(obj: EventModel) {
    return {
      id: obj.id, sponsorTier1Name: ApiUtils.nullToEmpty(obj.sponsorTier1Name),
      sponsorTier2Name: ApiUtils.nullToEmpty(obj.sponsorTier2Name),
      sponsorTier3Name: ApiUtils.nullToEmpty(obj.sponsorTier3Name),
    };
  }

  public static getSettings(obj: EventModel) {
    return {
      id: obj.id, cartTimeoutSeconds: obj.cartTimeoutSeconds,
      hostEmail: obj.hostEmail, hostName: obj.hostName,
      tax: { taxRate: 100 * obj.taxRate, taxNumber: obj.taxNumber },
      enableBuyerClaimAll: obj.enableBuyerClaimAll, capacity: obj.capacity,
      enablePublicGuestList: obj.enablePublicGuestList,
      sendTicketsWithConfirmationEmail: obj.sendTicketsWithConfirmationEmail,
    };
  }


  public sponsorTier1Name: string = '';
  public sponsorTier2Name: string = '';
  public sponsorTier3Name: string = '';
  public receiptSubject: string = '';
  public receiptContent: string = '';
  public id: string = '';
  public name: string = '';
  public status: string = 'DRAFT';
  public slug: string = '';
  public venueName: string = '';
  public venueAddress: any = {};
  public eventStart: string = '';
  public eventEnd: string = '';
  public webUrl: string = '';
  public capacity: number = 0;
  public hostName: string = '';
  public hostEmail: string = '';
  public summary: string = '';
  public description: string = '';
  public terms: string = '';
  public ticketStart: string = '';
  public ticketEnd: string = '';
  public posterMode: string = 'NONE';
  public posterUrl: string = '';
  public coverImageUrl: string = '';
  public mainLogoImageUrl: string = '';
  public footerLogoImageUrl: string = '';
  public emailLogoImageUrl: string = '';
  public receiptLogoImageUrl: string = '';
  public enableBranding: boolean = false;
  public enableCheckoutDonation: boolean = false;
  public enableBuyerClaimAll: boolean = false;
  public enablePublicGuestList: boolean = false;
  public enableTax: boolean = false;
  public footerBgColor: string = '';
  public buttonText: string = '';
  public buttonTextColor: string = '';
  public buttonBgColor: string = '';
  public taxRate: number = 0;
  public taxNumber: string = '';
  public isPrivate: boolean = false;
  public cartTimeoutSeconds: number = 0;
  public embedId: string = '';
  public campaignId: string = '';
  public p2pProgramId: string = '';
  public sendTicketsWithConfirmationEmail: boolean = false;
  public promoCodes: any = [];
  public emailSubscribers: any = [];
  public surveys: any = [];
  public sponsorTiers: any = [];
}

  // eventStart eventEnd ticketStart ticketEnd isPrivate
  // posterUrl coverImageUrl  mainLogoImageUrl
  // footerLogoImageUrl emailLogoImageUrl
  // enableCheckoutDonation  enableTax
  // posterMode status enableBranding
