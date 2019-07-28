<template>
  <label :class="{ 'font-weight-semibold': isBold }" v-text="text"></label>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class LabelComponent extends Vue {
  @Prop({ default: true, type: Boolean }) public readonly isBold!: boolean;
  @Prop(String) public readonly text!: string;
}
</script>

<style lang="scss" scoped>
label {
  color: #344349;
}
</style>
