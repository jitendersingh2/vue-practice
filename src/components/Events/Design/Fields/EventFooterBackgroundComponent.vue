<template>
  <div>
    <div>
      <label-component for="event-footer-background" text="Footer Background Colour"></label-component>

      <b-tooltip
        placement="right"
        target="btn-tooltip-event-footer-background"
        title="Enter footer background color here"
      ></b-tooltip>

      <a href="#" id="btn-tooltip-event-footer-background" class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 text-white">?</a>
    </div>

    <div class="row no-gutters border rounded-pill shadow">
      <div class="col-sm">
        <p class="mt-3 mb-0 ml-3">Pick Your Color</p>
      </div>

      <div class="col-sm p-2 text-center d-flex align-items-center">
        <input-component
          class="w-100"
          input-class="input-color"
          type="color"
          v-model="eventFooterBackgroundColor"
        />
      </div>

      <div class="col-sm p-2">
        <input-component
          id="event-footer-background"
          class="w-100"
          placeholder="#000000"
          v-model="eventFooterBackgroundColor"
        ></input-component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import InputComponent from '@/components/FormElements/InputComponent.vue';
import LabelComponent from '@/components/FormElements/LabelComponent.vue';

@Component({
  components: {
    InputComponent,
    LabelComponent,
  },
})
export default class EventFooterBackgroundComponent extends Vue {
  @Prop(String) public readonly value!: string;

  get eventFooterBackgroundColor() {
    return this.value;
  }

  set eventFooterBackgroundColor(value) {
    this.$emit('input', value);
  }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 576px) {
  .row {
    border: none !important;
    box-shadow: none !important; 
  }
}
</style>
