<template>
  <div class="player-list">
    <table>
      <tbody>
      <tr v-for="(p, index) in playerList" :key=index>
        <td>
          <button @click="shimei(p.player.ID)">指名する</button>
        </td>
        <td>
          <button @click="keep(p, index)">{{p.keep ? "削除する" : "キープする"}}</button>
        </td>
        <td>
          <router-link :to="{name: 'Profile', params:{id: p.player.ID}}">{{p.player.名前}}</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { TPlayerSummary } from '../../common/types';           // TODO: @でパスの指定ができない（tsconfig.client.jsonがみれてない？）
import { getPlayerSummary } from '../api';

interface DispPlayerSummary {
  player: TPlayerSummary;
  shimei: boolean;
  keep: boolean;
}

@Component
export default class PlayerList extends Vue {
  @Prop() private id!: string;

  private playerList: DispPlayerSummary[] = [];
  private keepList: TPlayerSummary[] = [];
  
  @Watch('id', { immediate: true })
  async idChange() {
    this.playerList= [];

    getPlayerSummary(this.id)
      .then(res => {
        res.forEach((e: TPlayerSummary) => {
          let shimei: boolean = false;
          let keep: boolean = false;
          for (let p of this.keepList) {
            if (p.ID === e.ID) {
              keep = true;
              break;
            }
          }
          const player: DispPlayerSummary = {
            player: e,
            shimei: shimei,
            keep: keep
          }
          this.playerList.push(player);
        })
      })
      .catch(e => console.error(e));
  }

  private created() {
    this.keepList = localStorage.keepPlayer ? JSON.parse(localStorage.keepPlayer) : [];
  }

  private shimei(id: string) {
    console.log(`指名されました${id}`);
  }

  private keep(p: DispPlayerSummary, i: number) {
    if (p.keep) {
      // 既にキープされている場合、削除
      this.keepList.forEach((e, i) => {
        if (e.ID === p.player.ID)
        this.keepList.splice(i, 1);
      });
    } else {
      // まだキープされていない場合はキープ
      this.keepList.push(p.player);
    }

    localStorage.keepPlayer = JSON.stringify(this.keepList);
    this.playerList[i].keep = p.keep ? false : true;
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
