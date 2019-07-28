<template>
  <div>
    <edit-event-header-component></edit-event-header-component>

    <div class="px-4 px-md-5 py-4 py-md-5">
      <edit-event-tabs-component class="mb-4"></edit-event-tabs-component>

      <div class="border rounded-standard shadow-standard">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import EditEventHeaderComponent from '@/components/Events/EditEventHeaderComponent.vue';
import EditEventTabsComponent from '@/components/Events/EditEventTabsComponent.vue';

@Component({
  components: {
    EditEventHeaderComponent,
    EditEventTabsComponent,
  },
})
export default class EditEvent extends Vue {}
</script>
