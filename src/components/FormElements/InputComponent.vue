<template>
  <div :class="{ 'd-chars-count': showCharsCount }">
    <input
      class="form-control rounded-pill"
      v-bind="$attrs"
      :class="inputClass"
      :type="type"
      :value="value"
      v-on:input="$emit('input', $event.target.value)"
    >

    <span class="chars-count text-muted" v-text="charsCount" v-if="showCharsCount"></span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  inheritAttrs: false,
})
export default class InputComponent extends Vue {
  @Prop({ default: '', type: [String, Object] }) public readonly inputClass!: string | object;
  @Prop({ default: 80, type: Number }) public readonly maxChars!: number;
  @Prop({ default: false, type: Boolean }) public readonly showCharsCount!: boolean;
  @Prop({ default: 'text', type: String }) public readonly type!: string;
  @Prop(String) public readonly value!: string;

  get charsCount() {
    return this.value.length + ' / ' + this.maxChars;
  }
}
</script>

<style lang="scss" scoped>
input {
  font-size: 12px;
  height: 42px;
}

.d-chars-count {
  position: relative;

  input {
    padding-right: 70px;
  }

  .chars-count {
    font-size: 14px;
    position: absolute;
    right: 15px;
    top: 10px;
  }
}
</style>
