import RestApi from './RestApi';
import GraphQLApi from './GraphQLApi';
import * as Queries from './Queries';
import * as Mutations from './Mutations';

import IEventData from '@/api/model/IEventData';
import { Upload } from 'element-ui';


export class EventApi {
  private gql: GraphQLApi;
  private rest: RestApi = new RestApi();

  constructor(baseUrl: string, sessionKey: string) {
    this.gql = new GraphQLApi(baseUrl, sessionKey);
  }

  // ****************************************
  // QUERIES
  // ****************************************
  public getCountriesList(organization: string) {
    return this.gql.query(Queries.LIST_COUNTRIES, { organizationId: organization });
  }

  public getPeerToPeerList(organization: string) {
    return this.gql.query(Queries.LIST_PEER2PEER, { organizationId: organization });
  }

  public getCampaignList(organization: string) {
    return this.gql.query(Queries.LIST_CAMPAIGN, { organizationId: organization });
  }

  public getEmbedList(organization: string) {
    return this.gql.query(Queries.LIST_EMBED, { organizationId: organization });
  }

  public getEvents(organization: string) {
    return this.gql.query(Queries.EVENTS, { organizationId: organization });
  }

  public getEvent(id: string) {
    return this.gql.query(Queries.EVENT, { id });
  }

  public getOrganization(organization: string) {
    return this.gql.query(Queries.ORGANIZATION, {organizationId: organization} );
  }
  public getPromoCodes(eventId: string) {
    return this.gql.query(Queries.PROMO_CODES, {id: eventId});
  }

  public getTicketDefinitions(event: string) {
    return this.gql.query(Queries.TICKET_DEFINITIONS, {eventId: event});
  }

  public getTicketDefinition(ticketId: string) {
    return this.gql.query(Queries.TICKET_DEFINITION, {id: ticketId});
  }

  public getSurveys(eventId: string) {
    return this.gql.query(Queries.SURVEYS, {id: eventId});
  }

  public getSurvey(eventId: string, survey: string) {
    return this.gql.query(Queries.SURVEY, {id: eventId, surveyId: survey});
  }
  public getTicketEmbed(eventId: string) {
    return this.gql.query(Queries.TICKET_EMBED, {id: eventId});
  }

  public getEventTicketList(eventId: string) {
    return this.gql.query(Queries.EVENT_TICKET_LIST, {id: eventId});
  }

  public readBasicDetails() {
    const data: IEventData = new IEventData();
    return data;
  }

  public getEventsData(organization: string) {
    return this.gql.query(Queries.EVENTS_LIST, { oid: organization });
  }

  /* Event Dashboard*/
  public getDashboardEventsList(organization: string) {
    return this.gql.query(Queries.EVENTS_DASHBOARD, { organizationId: organization });
  }

  public getEventSalesReport(eventId: string) {
    return this.gql.query(Queries.EVENT_SALES_REPORT, { id: eventId });
  }
  /* Event Dashboard*/

  // ****************************************
  // QUERIES END
  // ****************************************

  // ****************************************
  // MUTATIONS
  // ****************************************
  public uploadFile(field: string, file: Upload) {
    return this.gql.mutate(Mutations.UploadFileGQL(field), { file });
  }

  public uploadTestingIssue(eventId: string, data: any) {
    return this.gql.mutate(Mutations.UPLOAD_TESTING_ISSUE,
      { id: eventId, file: data });
  }

  public createEvent(organizationId: string, data: any) {
    return this.gql.mutate(Mutations.CREATE_EVENT, { id: organizationId, event: data });
  }

  public updateEvent(id: string, data: any) {
    return this.gql.mutate(Mutations.UPDATE_EVENT, { id, event: data });
  }

  public deleteDashboardEvent(id: string) {
    return this.gql.mutate(Mutations.DELETE_DASHBOARD_EVENTS, { id });
  }


  public createSurvey(eventId: string, surveyName: string) {
    return this.gql.mutate(Mutations.CREATE_SURVEY, { id: eventId, name: surveyName });
  }

  public updateSurvey(eventId: string, survey: string, data: any) {
    return this.gql.mutate(Mutations.UPDATE_SURVEY, { id: eventId, surveyId: survey, survey: data });
  }

  public deleteSurvey(eventId: string, survey: string) {
    return this.gql.mutate(Mutations.DELETE_SURVEY, { id: eventId, surveyId: survey });
  }

  public createTicketDefinition(eventId: string, data: any) {
    return this.gql.mutate(Mutations.CREATE_TICKET_DEFINITION,
      { id: eventId, ticket: data });
  }

  public updateTicketDefinition(eventId: string, ticket: string, data: any) {
    return this.gql.mutate(Mutations.UPDATE_TICKET_DEFINITION,
      { id: eventId, ticketId: ticket, ticket: data });
  }

  public deleteTicketDefinition(eventId: string, ticket: string) {
    return this.gql.mutate(Mutations.DELETE_TICKET_DEFINITION,
      { id: eventId, ticketId: ticket });
  }

  public createSponsor(eventId: string, data: string) {
    return this.gql.mutate(Mutations.CREATE_SPONSOR, { id: eventId, sponsor: data });
  }

  public deleteSponsor(eventId: string, sponsor: string) {
    return this.gql.mutate(Mutations.DELETE_SPONSOR,
      { id: eventId, sponsorId: sponsor });
  }
  public createPromoCode(eventId: string, data: any) {
    return this.gql.mutate(Mutations.CREATE_PROMO_CODE, { id: eventId, promoCode: data });
  }

  public updatePromoCode(eventId: string, promoCode: string, data: any) {
    return this.gql.mutate(Mutations.UPDATE_PROMO_CODE, { id: eventId, promoCodeId: promoCode, promoCode: data });
  }

  public deletePromoCode(eventId: string, promoCode: string) {
    return this.gql.mutate(Mutations.DELETE_PROMO_CODE, { id: eventId, promoCodeId: promoCode });
  }

  public createSurveyQuestion(eventId: string, survey: string, data: any) {
    return this.gql.mutate(Mutations.CREATE_SURVEY, { id: eventId, surveyId: survey, question: data });
  }

  public updateSurveyQuestion(eventId: string, surveyQuestion: string, data: any) {
    return this.gql.mutate(Mutations.UPDATE_SURVEY, { id: eventId, surveyQuestionId: surveyQuestion, question: data });
  }

  public deleteSurveyQuestion(eventId: string, surveyQuestion: string) {
    return this.gql.mutate(Mutations.DELETE_SURVEY, { id: eventId, surveyQuestionId: surveyQuestion });
  }

  public addEmailSubscriber(eventId: string, data: any) {
    return this.gql.mutate(Mutations.ADD_EMAIL_SUBSCRIBER, { id: eventId, subscriber: data });
  }

  public updateEmailSubscriber(eventId: string, oldEmail: string, data: any) {
    return this.gql.mutate(Mutations.UPDATE_EMAIL_SUBSCRIBER, { id: eventId, email: oldEmail, subscriber: data });
  }

  public deleteEmailSubscriber(eventId: string, emailAddress: string) {
    return this.gql.mutate(Mutations.DELETE_EMAIL_SUBSCRIBER, { id: eventId, email: emailAddress });
  }

  public sendEmail(eventId: string, data: any) {
    return this.gql.mutate(Mutations.SEND_EMAIL, { id: eventId, emailUpdate: data });
  }

  public sendEmailTest(eventId: string, data: any) {
    return this.gql.mutate(Mutations.SEND_EMAIL_TEST, { id: eventId, emailUpdate: data });
  }
}
