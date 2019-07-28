<template>
  <div>
    <label-component for="event-website" text="Event Website"></label-component>

    <input-component
      id="event-website"
      placeholder="Enter your event website url"
      type="URL"
      v-model="eventWebsite"
    ></input-component>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import InputComponent from '@/components/FormElements/InputComponent.vue';
import LabelComponent from '@/components/FormElements/LabelComponent.vue';

@Component({
  components: {
    InputComponent,
    LabelComponent,
  },
})
export default class EventWebsiteComponent extends Vue {
  @Prop(String) public value!: string;

  get eventWebsite() {
    return this.value;
  }

  set eventWebsite(value) {
    this.$emit('input', value);
  }
}
</script>
