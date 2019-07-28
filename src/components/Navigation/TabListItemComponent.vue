<template>
  <li
    class="tab-item text-center"
    :class="{
      active: isActive,
      complete: isComplete,
    }"
  >
    <h5 class="border border-primary d-flex align-items-center justify-content-center rounded-circle p-3">
      <span class="fas fa-check text-white" v-if="isComplete"></span>
      <span v-text="index + 1" v-else></span>
    </h5>

    <span class="nav-link text-uppercase text-dark" v-text="item.name"></span>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ITabItem from './ITabItem';

@Component
export default class TabListItemComponent extends Vue {
  @Prop(Number) public readonly index!: number;
  @Prop(Boolean) public readonly isActive!: boolean;
  @Prop(Boolean) public readonly isComplete!: boolean;
  @Prop(Object) public readonly item!: ITabItem;
}
</script>

<style lang="scss" scoped>
.tab-item {
  h5 {
    color: var(--primary);
  }

  &.active h5 {
    background-color: var(--primary);
    color: var(--white);
  }

  &.complete h5 {
    background-color: var(--primary);
    color: var(--white);
  }

  h5 {
    border-width: 5px !important;
    height: 100%;
    margin: 0 auto;
    max-height: 55px;
    max-width: 55px;
    width: 100%;
  }

  .nav-link {
    font-size: 12px;
  }
}
</style>