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
import { TPlayerSummary } from '../../common/types';           // TODO: @でパスの指定ができない（tsconfig.client.jsonがみれてない？）

@Component
export default class PlayerList extends Vue {
  @Prop() private id!: string;

  private playerList: TPlayerSummary[] = [
    {
      ID: '1',
      名前: '菅野 智之',
      背番号: '18',
      守備: '投手',
      生年月日: '',
      投打: '',
      球団: ''
    },
    {
      ID: '2',
      名前: '丸 佳浩',
      背番号: '8',
      守備: '外野手',
      生年月日: '',
      投打: '',
      球団: ''
    },
    {
      ID: '3',
      名前: '坂本 勇人',
      背番号: '6',
      守備: '内野手',
      生年月日: '',
      投打: '',
      球団: ''
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
