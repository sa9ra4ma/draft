<template>
  <div class="main-header">
    <div class="main-header-list">
      <div class="header-flex-1">
        <router-link :to="{ name: 'Home' }">
          <img alt="Vue logo" src="@/assets/draft_logo.png" class="logo">
        </router-link>
      </div>
      <div class="header-flex-4">
        <h1>
          2020年ドラフト会議 supported by Tabibito
        </h1>
      </div>
      <div class="header-flex-2">
        <router-link :to="{ name: 'KeepList' }">
          キープ
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
  @Prop() private msg?: string;

  private userName: string = "";

  private login() {
    document.cookie = `user-name=${this.userName}`;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main-header {
    background-color: gold;
  }
  .main-header-list {
    margin: 0px 100px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
  }
  .header-flex-1 {
    flex-grow: 1;
  }
  .header-flex-2 {
    flex-grow: 2;
  }
  .header-flex-3 {
    flex-grow: 3;
  }
  .header-flex-4 {
    flex-grow: 4;
  }
  .logo {
    width: 100px;
    height: 100px;
  }

</style>
