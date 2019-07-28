<template>
  <div>
    <div class="btn-group border border-primary rounded-pill">
      <router-link
        class="btn btn-standard"
        :class="{ 'btn-primary': $route.name === 'event-sales', 'text-primary': $route.name !== 'event-sales' }"
        :to="{ name: 'event-sales' }"
      >Sales Report</router-link>

      <router-link
        class="btn btn-standard"
        :class="{ 'btn-primary': $route.name === 'event-orders', 'text-primary': $route.name !== 'event-orders' }"
        :to="{ name: 'event-orders' }"
      >Orders</router-link>

      <router-link
        class="btn btn-standard"
        :class="{ 'btn-primary': $route.name === 'event-guestlist', 'text-primary': $route.name !== 'event-guestlist' }"
        :to="{ name: 'event-guestlist' }"
      >Guest List</router-link>

      <router-link
        class="btn btn-standard"
        :class="{ 'btn-primary': $route.name === 'event-promotions', 'text-primary': $route.name !== 'event-promotions' }"
        :to="{ name: 'event-promotions' }"
      >Promotions</router-link>

      <router-link
        class="btn btn-standard"
        :class="{ 'btn-primary': $route.name === 'edit-event-email-updates', 'text-primary': $route.name !== 'edit-event-email-updates' }"
        :to="{ name: 'edit-event-email-updates' }"
      >Email Updates</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class EventTabsComponent extends Vue {}
</script>

<style lang="scss" scoped>
.btn-group {
  overflow: hidden;

  .btn:not(:last-child) {
    border-right: 1px solid var(--primary);
  }
}
</style>
