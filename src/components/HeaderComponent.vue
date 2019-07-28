<template>
  <header id="header" class="py-2">
    <div class="container-fluid">
      <navbar-component/>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavbarComponent from './Navigation/NavbarComponent.vue';

@Component({
  components: {
    NavbarComponent,
  },
})
export default class HeaderComponent extends Vue {}
</script>

<style lang="scss" scoped>
#header {
  background: #18d6e4;

  &::after {
    clear: both;
    content: "";
    display: table;
    opacity: 1;
    visibility: hidden;
  }
}
</style>
