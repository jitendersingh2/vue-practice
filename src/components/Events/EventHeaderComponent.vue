<template>
  <div class="bg-white px-4 px-md-5 py-3 shadow-sm">
    <div class="align-middle d-inline-block w-50">
      <p class="font-weight-semibold mb-0 text-dark">
        <router-link :to="{ name: 'events' }" class="text-dark">Events Dashboard</router-link> / Manage Event
        <router-link :to="{ name: 'edit-event', params: { eventId: '1' } }" class="text-muted">/ {{ event.name }}</router-link>
      </p>
    </div>

    <div class="align-middle d-inline-block w-50 text-right">
      <button class="btn btn-outline-primary btn-standard font-weight-semibold mr-2 rounded-pill text-uppercase" type="button">Event Help</button>
      <button class="btn btn-outline-primary btn-standard font-weight-semibold mr-2 rounded-pill text-uppercase" type="button" v-b-modal.event-preview-modal>Preview</button>
      <button class="btn btn-primary btn-standard font-weight-semibold rounded-pill text-uppercase" type="button" v-b-modal.event-archive-confirmation-modal>Archive</button>
    </div>

    <event-archive-confirmation-modal-component id="event-archive-confirmation-modal" @archive-event="archiveEvent"></event-archive-confirmation-modal-component>
    <event-preview-modal-component id="event-preview-modal" :event="event"></event-preview-modal-component>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import EventArchiveConfirmationModalComponent from './EventArchiveConfirmationModalComponent.vue';
import EventPreviewModalComponent from './EventPreviewModalComponent.vue';

@Component({
  components: {
    EventArchiveConfirmationModalComponent,
    EventPreviewModalComponent,
  },
})
export default class EventHeaderComponent extends Vue {
    @Prop(Object) public readonly event!: object;

    private archiveEvent() {
      // Do something ...
    }
}
</script>
