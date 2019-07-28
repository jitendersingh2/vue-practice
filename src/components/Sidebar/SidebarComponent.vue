<template>
  <aside id="sidebar">
    <ul class="mt-2 nav flex-column">
      <navigation-item-component
        v-for="(item, index) in items"
        :index="index"
        :isActive="activeSidebarItem === item.name"
        :item="item"
        :key="item.name"
      ></navigation-item-component>
    </ul>
  </aside>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import INavItem from './INavItem';

import NavigationItemComponent from './NavigationItemComponent.vue';

@Component({
  components: {
    NavigationItemComponent,
  },
})
export default class SidebarComponent extends Vue {
  private items: INavItem[] = [
    {
      icon: require('@/assets/icons/dashboard.svg'),
      name: 'Dashboard',
    },
    {
      icon: require('@/assets/icons/donations.svg'),
      name: 'Donations',
    },
    {
      icon: require('@/assets/icons/campaigns.svg'),
      name: 'Campaigns',
    },
    {
      icon: require('@/assets/icons/embeds.svg'),
      name: 'Embeds',
    },
    {
      icon: require('@/assets/icons/goal.svg'),
      name: 'Goal Meter',
    },
    {
      icon: require('@/assets/icons/network.svg'),
      name: 'Peer-To-Peer',
    },
    {
      icon: require('@/assets/icons/landing-page.svg'),
      name: 'Landing Pages',
    },
    {
      icon: require('@/assets/icons/chat.svg'),
      name: 'Text',
    },
    {
      icon: require('@/assets/icons/coin-stack.svg'),
      name: 'Reconciliation',
    },
    {
      icon: require('@/assets/icons/event.svg'),
      name: 'Events',
    },
    {
      icon: require('@/assets/icons/idea.svg'),
      name: 'Organization',
    },
    {
      icon: require('@/assets/icons/help.svg'),
      name: 'Help',
    },
  ];

  get activeSidebarItem() {
    return 'Events';
  }
}
</script>

<style lang='scss' scoped>
#sidebar {
  background-color: #34434a;
  max-width: 225px;
  width: 100%;
}
</style>
