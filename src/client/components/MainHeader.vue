<template>
<div>header</div>
  <!-- <div class="header">
    <div class="header-flex-1">
      <img alt="Vue logo" src="@/assets/draft_logo.jpg" class="logo">
    </div>
    <div class="header-flex-4">
      <h1>
        2020年ドラフト会議 supported by Tabibito
        </h1>
    </div>
    <div class="header-flex-2">
      なんかのメニュー
    </div>
  </div> -->
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MainHeader extends Vue {
  private a: number = 1;
}


</script>

<style scoped>
  /* .header {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
  } */
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
  .team-icon{
    width: 50px;
    height: 50px;
  }
</style>
