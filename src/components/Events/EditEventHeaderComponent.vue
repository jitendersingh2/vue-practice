<template>
  <div class="bg-white px-4 px-md-5 py-3 shadow-sm">
    <div class="align-middle d-inline-block w-50">
      <h2 class="h5 font-weight-semibold mb-0 text-dark">
        <router-link :to="{ name: 'events' }" class="text-dark">Events Dashboard</router-link> / <router-link :to="{ name: 'event-sales' }" class="mr-1 text-dark">Manage Event</router-link>
        <span class="text-muted">/ Event Creation</span>
      </h2>
    </div>

    <div class="align-middle d-inline-block w-50 text-right">
      <button class="btn btn-outline-primary font-weight-semibold mr-2 rounded-pill text-uppercase" type="button">Event Help</button>
      <button class="btn btn-outline-primary font-weight-semibold mr-2 rounded-pill text-uppercase" type="button" :disabled="!isPreviewable" v-b-modal.event-preview-modal>Preview</button>
      <button class="btn btn-outline-primary font-weight-semibold mr-2 rounded-pill text-uppercase" type="button">Save Draft</button>
      <button class="btn btn-primary font-weight-semibold rounded-pill text-uppercase" type="button" :disabled="!isPublishable" v-b-modal.event-publish-confirmation-modal>Publish</button>
    </div>

    <event-preview-modal-component id="event-preview-modal" :event="event"></event-preview-modal-component>
    <event-publish-confirmation-modal-component id="event-publish-confirmation-modal" @publish-event="publishEvent"></event-publish-confirmation-modal-component>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import EventPreviewModalComponent from './EventPreviewModalComponent.vue';
import EventPublishConfirmationModalComponent from './EventPublishConfirmationModalComponent.vue';

@Component({
  components: {
    EventPreviewModalComponent,
    EventPublishConfirmationModalComponent,
  },
})
export default class EditEventHeaderComponent extends Vue {
  private event = {
    backgroundImage: require('@/assets/images/demo-event-background.jpeg'),
    ownerLogo: require('@/assets/images/demo-event-owner-logo.png'),
  };

  get isPreviewable() {
    if (this.$route.name === 'new-event') {
      return false;
    } else if (this.$route.name === 'edit-event') {
      return false;
    }

    return true;
  }

  get isPublishable() {
    if (this.$route.name === 'new-event') {
      return false;
    } else if (this.$route.name === 'edit-event') {
      return false;
    }

    return true;
  }

  private publishEvent() {
    // Do something ...
  }
}
</script>

<style lang="scss" scoped>
.btn {
  font-size: 12px;
  line-height: 24px;
  letter-spacing: 0.15em;
}
</style>
