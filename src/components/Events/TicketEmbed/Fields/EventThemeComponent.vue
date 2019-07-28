<template>
  <div>
    <label-component for="event-theme" text="Theme"></label-component>

    <div class="row">
      <div class="col-8">
        <select-component
          id="event-theme"
          :options="themes"
          v-model="eventTheme"
          required
        ></select-component>
      </div>

      <div class="col">
        <span
          class="copy-event-ticket-preview-code d-flex align-items-center justify-content-center rounded-circle text-primary"
          placement="right"
          title="Copy Code"
          @click="$emit('copy-preview-code')"
          v-b-tooltip.hover
        >
          <i class="far fa-copy"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import SelectComponent from '@/components/FormElements/SelectComponent.vue';

@Component({
  components: {
    LabelComponent,
    SelectComponent,
  },
})
export default class EventThemeComponent extends Vue {
  @Prop(String) public readonly value!: string;

  private themes = [
    {
      text: 'Light',
      value: 'light',
    },
    {
      text: 'Dark',
      value: 'dark',
    },
  ];

  get eventTheme() {
    return this.value;
  }

  set eventTheme(value) {
    this.$emit('input', value);
  }
}
</script>

<style lang="scss" scoped>
.copy-event-ticket-preview-code {
  border: 2px solid var(--primary);
  cursor: pointer;
  margin-top: -3px;
  height: 40px;
  width: 40px;
}
</style>
