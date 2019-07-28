<template>
  <div>
    <label-component class="mb-2" for="event-button-background-color" text="Button Background Colour"></label-component>

    <div class="row no-gutters border rounded-pill shadow">
      <div class="col-sm">
        <p class="mt-3 mb-0 ml-3">Pick Your Color</p>
      </div>

      <div class="col-sm p-2 text-center d-flex align-items-center">
        <input-component
          class="w-100"
          input-class="input-color"
          type="color"
          v-model="eventButtonBackgroundColor"
        />
      </div>

      <div class="col-sm p-2">
        <input-component
          id="event-button-background-color"
          class="w-100"
          placeholder="#000000"
          v-model="eventButtonBackgroundColor"
        ></input-component>
      </div>
    </div>
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
export default class EventButtonBackgroundColorComponent extends Vue {
  @Prop(String) public readonly value!: string;

  get eventButtonBackgroundColor() {
    return this.value;
  }

  set eventButtonBackgroundColor(value) {
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
