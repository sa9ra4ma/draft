<template>
  <div class="player-list">
    <ul>
      <li v-for="(player, index) in playerList" :key=index>
        <router-link :to="{name: 'Profile', params:{id: player.ID}}">{{player.名前}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { TPlayerSummary } from '../../common/types';           // TODO: @でパスの指定ができない（tsconfig.client.jsonがみれてない？）
import { getPlayerSummary } from '../api';

@Component
export default class PlayerList extends Vue {
  @Prop() private id!: string;

  private playerList: TPlayerSummary[] = [];
  
  @Watch('id', { immediate: true })
  async idChange() {
    this.playerList= [];

    getPlayerSummary(this.id)
      .then(res => this.playerList = res)
      .catch(e => console.error(e));
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
