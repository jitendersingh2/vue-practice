<template>
  <nav class="nav nav-pills">
    <tab-list-item-component
      class="nav-item"
      v-for="(item, index) in items"
      :index="index"
      :key="item.name"
      :isActive="activeRouteIndex === index"
      :isComplete="activeRouteIndex > index"
      :item="item"
    ></tab-list-item-component>
  </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ITabItem from './ITabItem';

import TabListItemComponent from './TabListItemComponent.vue';

@Component({
  components: {
    TabListItemComponent,
  },
})
export default class TabListComponent extends Vue {
  @Prop(Array) public readonly items!: ITabItem[];

  get activeRouteIndex() {
    return this.items.findIndex((item: ITabItem) => {
      if (item.routeName === this.$route.name) {
        return true;
      }

      if (item.children !== undefined && item.children.length > 0) {
        return item.children.filter((child) => child.routeName === this.$route.name).length > 0;
      }

      return false;
    });
  }
}
</script>

<style lang="scss" scoped>
.nav-item {
  max-width: 110px;
  position: relative;
  width: 100%;

  &:not(:last-child) {
    &::before {
      background-color: var(--primary);
      content: "";
      display: block;
      height: 5px;
      position: absolute;
      left: 82.5px;
      top: 25px;
      width: 50%;
    }
  }
}
</style>
