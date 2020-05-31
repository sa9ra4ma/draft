<template>
  <div class="profile">
    <h1>{{this.playerData}}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { TPitcherData,  TFielderData } from '../../common/types';           // TODO: @でパスの指定ができない（tsconfig.client.jsonがみれてない？）
import { getPlayerDetail } from '../api';

@Component
export default class Profile extends Vue {
  private id: string = "";
  private playerData: TPitcherData[] | TFielderData[] = [];

  @Watch('$route', { immediate: true })
  async queryIdChange() {
    this.id = this.$route.params.id as string;
    try {
      this.playerData = await getPlayerDetail(this.id);
    } catch (e) {
      console.error(e)
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
