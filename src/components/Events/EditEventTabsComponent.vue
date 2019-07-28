<template>
  <div>
    <tab-list-component :items="tabs"></tab-list-component>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import ITabItem from '@/components/Navigation/ITabItem';

import TabListComponent from '@/components/Navigation/TabListComponent.vue';

@Component({
  components: {
    TabListComponent,
  },
})
export default class EditEventTabsComponent extends Vue {
  private tabs: ITabItem[] = [
    {
      routeName: 'new-event',
      name: 'Details',
    },
    {
      routeName: 'edit-event-details',
      name: 'Additional Details',
    },
    {
      routeName: 'edit-event-design',
      name: 'Design',
    },
    {
      routeName: 'event-surveys',
      name: 'Surveys',
      children: [
        {
          routeName: 'edit-event-survey',
        },
        {
          routeName: 'new-event-survey',
        },
      ],
    },
    {
      routeName: 'event-tickets',
      name: 'Tickets',
      children: [
        {
          routeName: 'edit-event-ticket',
        },
        {
          routeName: 'new-event-ticket',
        },
      ],
    },
    {
      routeName: 'edit-event-ticket-embed',
      name: 'Ticket Embeds',
    },
    {
      routeName: 'edit-order-confirmation',
      name: 'Order Confirmation',
    },
    {
      routeName: 'edit-event-communication-and-sharing',
      name: 'Communication And Sharing',
    },
    {
      routeName: 'edit-event-sponsors',
      name: 'Sponsors',
    },
    {
      routeName: 'edit-event-settings',
      name: 'Settings',
    },
  ];
}
</script>
