import { gql } from 'apollo-boost';
import { DocumentNode } from 'graphql';


// ****************************************
// CREATE
// ****************************************

export const CREATE_EVENT = gql`
  mutation ($id: UUID!, $event: CreateEventInput!) {
    organization(id: $id) {
      createEvent(event: $event) {
        errors event { id status }
      }
    }
  }`;

export const CREATE_TICKET_DEFINITION = gql`
  mutation ($id: UUID!, $ticket: CreateTicketDefinitionInput!) {
    event(id: $id) {
      createTicketDefinition(ticketDefinition: $ticket) {
        errors
        ticketDefinition { id status }
      }
    }
  }`;

export const CREATE_SURVEY = gql`
  mutation ($id: UUID!, $name: String!) {
    event(id: $id) {
      createSurvey(eventSurvey: {name: $name }) {
        errors
        survey { id name }
      }
    }
  }`;

export const ADD_EMAIL_SUBSCRIBER = gql`
  mutation ($id: UUID!, $subscriber: EventEmailSubscriberInput!) {
    event(id: $id) {
      addEmailSubscriber(subscriber: $subscriber) {
        errors subscriber { email interval }
      }
    }
  }`;

export const UPDATE_EMAIL_SUBSCRIBER = gql`
  mutation ($id: UUID!, $email: String!, $subscriber: UpdateEmailSubscriber!) {
    event(id: $id) {
      updateEmailSubscriber(email: $email, subscriber: $subscriber) {
        errors subscriber { email interval }
      }
    }
  }`;

export const CREATE_PROMO_CODE = gql`
  mutation ($id: UUID!, $promoCode: CreatePromoCodeInput) {
    event(id: $id) {
      createPromoCode(promoCode: $promoCode) {
        errors }
    }
  }`;

export const CREATE_SPONSOR = gql`
  mutation ($id: UUID!, $sponsor: EventSponsor) {
    event(id: $id) {
      createSponsor(sponsor: $sponsor ) {
        errors sponsor { id }
      }
    }
  }`;

export const CREATE_SURVEY_QUESTION = gql`
  mutation ($id: UUID!, $surveyId: UUID!, $question: SurveyQuestionInput!) {
    event(id: $id) {
      createSurveyQuestion(eventSurveyId: $surveyId, surveyQuestion: $question) {
        errors question { id } }
    }
  }`;

// ****************************************
// UPDATE
// ****************************************

export const UPDATE_EVENT = gql`
  mutation ($id: UUID!, $event: EventInput!) {
    event(id: $id) {
      update(event: $event) {
        errors event { id status }
      }
    }
  }`;

export const UPDATE_SURVEY_QUESTION = gql`
  mutation ($id: UUID!, $surveyQuestionId: UUID!, $question: SurveyQuestionInput!) {
    event(id: $id) {
      updateSurveyQuestion(id: $surveyQuestionId, surveyQuestion: $question) {
        errors question { id } }
    }
  }`;

export const UPDATE_SURVEY = gql`
  mutation ($id: UUID!, $surveyId: UUID!, $survey: EventSurveyInput!) {
    event(id: $id) {
      updateSurvey(eventSurvey: $survey, id: $surveyId) {
        errors
        survey { id name }
      }
    }
  }`;

export const UPDATE_PROMO_CODE = gql`
  mutation ($id: UUID!, $promoCodeId: UUID!, $promoCode: PromoCodeInput) {
    event(id: $id) {
      updateupdatePromoCode(id: $promoCodeId, promoCode: $promoCode) {
        errors }
    }
  }`;

export const UPDATE_TICKET_DEFINITION = gql`
  mutation ($id: UUID!, $ticketId:  UUID!, $ticket: TicketDefinitionInput!) {
    event(id: $id) {
      updateTicketDefinition(id: $ticketId, ticketDefinition: $ticket) {
        errors
        ticketDefinition { id status }
      }
    }
  }`;

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      filename
    }
  }`;

export function UploadFileGQL(field: string) {
    return gql`
    mutation uploadFile($file: Upload!) {
        uploadFile(file: $file) {
            ${field}
        }
  }`;
}

export const UPLOAD_TESTING_ISSUE = gql`
mutation ($id: UUID!, $file: Upload!) {
  event(id: $id) {
    update(event: { coverImage: $file }) {
      errors event { id status }
    }
  }
}`;

export const UPDATE_EMAIL_SUBCRIBER = gql`
  mutation ($id: UUID!, $email: String, $subscriber: EventEmailSubscriberInput!) {
    event(id: $id) {
      updateEmailSubscriber(subscriber: $subscriber) {
        errors subscriber { email interval }
      }
    }
  }`;

// ****************************************
// DELETE
// ****************************************

export const DELETE_EMAIL_SUBSCRIBER = gql`
  mutation ($id: UUID!, $email: String!) {
    event(id: $id) {
      deleteEmailSubscriber(email: $email) {
        errors }
    }
  }`;

export const DELETE_TICKET_DEFINITION = gql`
  mutation ($id: UUID!, $ticketId: UUID!) {
    event(id: $id) {
      deleteTicketDefinition(id: $ticketId)
        {
        errors
      }
    }
  }`;

export const DELETE_SPONSOR = gql`
  mutation ($eventId: UUID!, $sponsorId: UUID!) {
    event(id: $eventId) {
      deleteSponsor(id: $sponsorId) { errors }
    }
  }`;

export const DELETE_SURVEY = gql`
  mutation ($id: UUID!, $surveyId: UUID!) {
    event(id: $id) {
      deleteSurvey(id: $surveyId) { errors }
    }
  }`;

export const DELETE_PROMO_CODE = gql`
  mutation ($id: UUID!, $surveyId: UUID!) {
    event(id: $id) {
      deletePromoCode(id: $surveyId) { errors }
    }
  }`;

export const DELETE_SURVEY_QUESTION = gql`
  mutation ($id: UUID!, $surveyQuestionId: UUID!) {
    event(id: $id) {
      deleteSurveyQuestion(id: $surveyQuestionId) { errors }
    }
  }`;

export const DELETE_DASHBOARD_EVENTS = gql`
  mutation ($id: UUID!) {
    event(id: $id) {
      delete { errors }
    }
  }`;

// ****************************************
// ACTIONS
// ****************************************

export const SEND_EMAIL = gql`
  mutation ($id: UUID!, $emailUpdate: EmailUpdateInput) {
    event(id: $id) {
      sendEmailUpdate(emailUpdate: $emailUpdate) {
        errors }
    }
  }`;


export const SEND_EMAIL_TEST = gql`
  mutation ($id: UUID!, $emailUpdate: EmailUpdateInput) {
    event(id: $id) {
      sendEmailUpdateTest(emailUpdate: $emailUpdate) {
        errors }
    }
  }`;
