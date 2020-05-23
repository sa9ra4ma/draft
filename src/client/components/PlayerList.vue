<template>
  <div class="player-list">
    <ul>
      <li v-for="(player, index) in playerList" :key=index>
        <router-link to="/profile">{{player.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TPlayerSummary } from '../types';           // TODO: @でパスの指定ができない（tsconfig.client.jsonがみれてない？）

@Component
export default class PlayerList extends Vue {
  @Prop() private id!: string;

  private playerList: TPlayerSummary[] = [
    {
      id: 1,
      name: '菅野 智之',
      number: '18',
      main_position: '投手',
    },
    {
      id: 2,
      name: '丸 佳浩',
      number: '8',
      main_position: '中堅手',
    },
    {
      id: 3,
      name: '坂本 勇人',
      number: '6',
      main_position: '遊撃手',
    },
  ];
  private i: number = 0;

  private async activated() {
    this.i++;
  }

  private clickbutton() {
    this.i++;
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
