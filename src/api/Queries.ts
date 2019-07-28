import { gql } from 'apollo-boost';

export const ORGANIZATION = gql`
  query($organizationId: UUID!){
    organization(id: $organizationId){
      name status
    }
  }`;

export const TICKET_DEFINITIONS: any = gql`
  query($eventId: UUID!){
    ticketDefinitions(eventId: $eventId) {
      id name status price quantity limitMaximum ticketStart ticketEnd
    }
  }`;

export const TICKET_DEFINITION: any = gql`
  query($id: UUID!){
    ticketDefinition(id: $id) {
      id name status price quantity limitMaximum ticketStart ticketEnd
    }
  }`;

export const TICKET_EMBED: any = gql`
  query ($id: UUID!) {
    event(id: $id) {
      ticketEmbedSettings {
        showEventTime showEventLocation showEventImage showEventDescription
        theme buttonText buttonSize buttonBgColor buttonTextColor
      }
    }
  }`;

export const LIST_PEER2PEER = gql`
  query($organizationId: UUID!) {
    organization(id: $organizationId) {
      name
      p2pPrograms(statuses: [ACTIVE]) {
        value: id
        text: name
      }
    }
  }`;

export const LIST_COUNTRIES = gql`
  query($organizationId: UUID!) {
    organization(id: $organizationId){
      supportedCountries {
        code: id
        label: text
      }
    }
  }`;

export const PROMO_CODES = gql`
    query($id: UUID!) {
      event(id: $id){
        name
        promoCodes {
          value: id
          text: name
          code quantity discountPercent discountFlat promoStart promoEnd
        }
      }
    }`;

export const LIST_CAMPAIGN = gql`
    query($organizationId: UUID!) {
      organization(id: $organizationId){
        name status
        campaigns(isActive:true) {
          value: id
          text: title
        }
      }
    }`;

export const LIST_EMBED = gql`
    query($organizationId: UUID!) {
      organization(id: $organizationId){
        name status
        embeds(statuses: [ACTIVE]) {
          value: id
          text: name
        }
      }
    }`;

export const EVENTS_LIST: any = gql`
    query($organizationId: UUID!){
      events(organizationId: $organizationId) {
        id name slug status eventStart eventEnd
        terms campaignId webUrl venueName
        venueAddress {
          street street2 city state zip country
        }
      }
    }`;

export const EVENTS: any = gql`
    query($organizationId: UUID!){
      events(organizationId: $organizationId) {
        id name slug status eventStart eventEnd
        terms campaignId webUrl venueName
        venueAddress {
          street street2 city state zip country
        }
      }
    }`;

export const EVENT: any = gql`
  query($id: UUID!) {
    event(id: $id) {
      sponsorTier1Name sponsorTier2Name sponsorTier3Name
      receiptSubject receiptContent id name slug eventStart
      eventEnd webUrl capacity hostName hostEmail summary
      description terms ticketStart ticketEnd isPrivate posterMode
      posterUrl coverImageUrl mainLogoImageUrl taxNumber enableTax
      footerLogoImageUrl emailLogoImageUrl receiptLogoImageUrl
      enableCheckoutDonation enableBuyerClaimAll enableBranding
      footerBgColor buttonText buttonTextColor buttonBgColor taxRate
      embedId campaignId p2pProgramId cartTimeoutSeconds venueName
      status enablePublicGuestList sendTicketsWithConfirmationEmail
      venueAddress { street street2 city state zip country }
    }
  }`;

export const EVENT_TICKET_LIST: any = gql`
  query($id: UUID!) {
    event(id: $id) {
      ticketDefinitions {
        id name quantity ticketStart ticketEnd status promoCode { id, code }
      }
    }
  }`;


export const SURVEYS: any = gql`
  query($id: UUID!) {
    event(id: $id) {
      surveys {
        id name questionCount
        ticket: ticketDefinition { name }
      }
    }
  }`;

export const SURVEY: any = gql`
  query ($id: UUID!, $surveyId: UUID!) {
    event(id: $id) {
      survey(id: $surveyId) {
      name  questionCount
      questions { id  questionType question choices } }
    }
  }`;

export const EVENTS_DASHBOARD: any = gql`
  query($organizationId: UUID!) {
    eventsDashboard(organizationId: $organizationId) {
      events {
        id
        name
        eventStart
        attendeeCount
        venueName
        revenue
        status
      }
    }
  }`;

export const EVENT_SALES_REPORT: any = gql`
  query($id: UUID!) {
      event(id: $id) {
        id
        name
        emailSubscribers {
          email
          interval
        }
        salesReport {
          tickets {
            name
            totalSalesCount
            totalSalesValue
            refundedCount
            refundedValue
            compCount
          }
          overview {
            grossProceeds
            netProceeds
            regularAttendeeCount
            compAttendeeCount
          }
        }
      }
  }`;



