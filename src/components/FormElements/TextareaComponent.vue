<template>
  <div :class="{ 'd-chars-count': showCharsCount }">
    <textarea
      v-bind="$attrs"
      class="form-control"
      :class="inputClass"
      cols="30"
      rows="5"
      :value="value"
      v-on:input="$emit('input', $event.target.value)"
    ></textarea>

    <span class="chars-count text-muted" v-text="charsCount" v-if="showCharsCount"></span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  inheritAttrs: false,
})
export default class TextareaComponent extends Vue {
  @Prop({ default: '', type: String }) public readonly inputClass!: string;
  @Prop({ default: 255, type: Number }) public readonly maxChars!: number;
  @Prop({ default: false, type: Boolean }) public readonly showCharsCount!: boolean;
  @Prop({ default: '<p></p>', type: String }) public readonly value!: string;

  get charsCount() {
    return this.value.length + ' / ' + this.maxChars;
  }
}
</script>

<style lang="scss" scoped>
.d-chars-count {
  position: relative;

  form-control {
    padding-right: 70px;
  }

  .chars-count {
    font-size: 14px;
    position: absolute;
    bottom: 25px;
    right: 25px;
  }
}
</style>
