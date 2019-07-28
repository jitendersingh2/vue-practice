<template>
  <select
    class="custom-select d-block w-100 rounded-pill"
    :value="value"
    v-on:change="$emit('input', $event.target.value)"
  >
    <option value v-text="defaultOptionText"></option>

    <option
      v-for="(item, index) in options"
      :index="index"
      :key="item.value"
      :value="item.value"
      v-text="item.text"
    ></option>
  </select>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

interface IOption {
  text: string;
  value: string;
}

@Component
export default class SelectComponent extends Vue {
  @Prop({ default: 'Choose', type: String })
  public readonly defaultOptionText!: string;
  @Prop({ default: () => [], type: Array }) public readonly options!: IOption[];
  @Prop(String) public readonly value!: string;
}
</script>

<style lang="scss" scoped>
select {
  font-size: 12px;
  height: 42px;
  -webkit-appearance: none;
}
</style>
