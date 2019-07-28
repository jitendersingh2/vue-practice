<template>
  <li class="nav-item">
    <a
      class="d-block p-3"
      :class="{
        'bg-white': isActive,
        'text-dark': isActive,
        'text-light': !isActive
      }"
      href="#"
    >
      <img class="align-middle d-inline-block mr-3" :src="item.icon" :alt="item.name">
      <span class="align-middle d-inline-block" v-text="item.name"></span>
    </a>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import INavItem from './INavItem';

@Component
export default class NavigationItemComponent extends Vue {
  @Prop(Boolean) public readonly isActive!: boolean;
  @Prop(Object) public readonly item!: INavItem;
}
</script>

<style lang="scss" scoped>
a {
  padding-left: 30px !important;

  img {
    height: 18px;
    width: 18px;
  }

  span {
    font-size: 14px;
  }
}
</style>
