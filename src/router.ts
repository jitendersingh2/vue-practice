import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'edit-event-email-updates',
      path: '/events/:eventId/email-updates',
      component: () => import('@/views/Events/EditEventEmailUpdates.vue'),
    },
    {
      name: 'event-guestlist',
      path: '/events/:eventId/guestlist',
      component: () => import('@/views/Events/EventGuestlist.vue'),
    },
    {
      name: 'event-orders',
      path: '/events/:eventId/orders',
      component: () => import('@/views/Events/EventOrders.vue'),
    },
    {
      name: 'event-preview',
      path: '/events/:eventId/preview',
      component: () => import('@/views/Events/EventPreview.vue'),
    },
    {
      name: 'event-promotions',
      path: '/events/:eventId/promotions',
      component: () => import('@/views/Events/EventPromotions.vue'),
    },
    {
      name: 'event-sales',
      path: '/events/:eventId/sales',
      component: () => import('@/views/Events/EventSales.vue'),
    },
    {
      path: '/events',
      component: () => import('@/views/Events/EventBoilerplate.vue'),
      children: [
        {
          name: 'events',
          path: '',
          component: () => import('@/views/Events/Events.vue'),
        },
        {
          path: 'new',
          component: () => import('@/views/Events/EditEvent.vue'),
          children: [
            {
              name: 'new-event',
              path: '',
              component: () => import('@/views/Events/EditEventBasicDetails.vue'),
            },
          ],
        },
        {
          path: ':eventId',
          component: () => import('@/views/Events/EditEvent.vue'),
          children: [
            {
              name: 'edit-event',
              path: 'edit',
              component: () => import('@/views/Events/EditEventBasicDetails.vue'),
            },
            {
              name: 'edit-event-details',
              path: 'edit/details',
              component: () => import('@/views/Events/EditEventAdditionalDetails.vue'),
            },
            {
              name: 'edit-event-design',
              path: 'edit/design',
              component: () => import('@/views/Events/EditEventDesign.vue'),
            },
            {
              path: 'edit/tickets',
              component: () => import('@/views/Events/EventTicketBoilerplate.vue'),
              children: [
                {
                  name: 'event-tickets',
                  path: '',
                  component: () => import('@/views/Events/EventTickets.vue'),
                },
                {
                  name: 'new-event-ticket',
                  path: 'new',
                  component: () => import('@/views/Events/EditEventTicket.vue'),
                },
                {
                  name: 'edit-event-ticket',
                  path: ':ticketId',
                  component: () => import('@/views/Events/EditEventTicket.vue'),
                },
              ],
            },
            {
              path: 'edit/surveys',
              component: () => import('@/views/Events/EventSurveyBoilerplate.vue'),
              children: [
                {
                  name: 'event-surveys',
                  path: '',
                  component: () => import('@/views/Events/EventSurveys.vue'),
                },
                {
                  name: 'new-event-survey',
                  path: 'new',
                  component: () => import('@/views/Events/EditEventSurvey.vue'),
                },
                {
                  name: 'edit-event-survey',
                  path: ':surveyId',
                  component: () => import('@/views/Events/EditEventSurvey.vue'),
                },
              ],
            },
            {
              name: 'edit-event-ticket-embed',
              path: 'edit/embed',
              component: () => import('@/views/Events/EditEventTicketEmbed.vue'),
            },
            {
              name: 'edit-order-confirmation',
              path: 'edit/order-confirmation',
              component: () => import('@/views/Events/EditOrderConfirmation.vue'),
            },
            {
              name: 'edit-event-communication-and-sharing',
              path: 'edit/communication-and-sharing',
              component: () => import('@/views/Events/EditEventCommunicationAndSharing.vue'),
            },
            {
              name: 'edit-event-sponsors',
              path: 'edit/sponsors',
              component: () => import('@/views/Events/EditEventSponsors.vue'),
            },
            {
              name: 'edit-event-settings',
              path: 'edit/settings',
              component: () => import('@/views/Events/EditEventSettings.vue'),
            },
          ],
        },
      ],
    },
  ],
});
