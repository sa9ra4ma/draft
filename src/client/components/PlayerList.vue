<template>
  <div class="player-list">
    <!-- <table>
      <tbody>
        <tr v-for="(p, index) in playerList" :key=index>
          <td>
            <b-btn variant="outline-info" @click="shimei(p.player.ID)">
              <i class="far fa-thumbs-up"></i>
            </b-btn>
          </td>
          <td>
            <b-btn :variant="p.keep ? 'warning' : 'outline-warning'" @click="keep(p, index)">
              <i :class="p.keep ? 'far fa-check-circle fa-lg' : 'fas fa-arrow-alt-circle-down fa-lg'"></i>
            </b-btn>
          </td>
          <td>
            <router-link :to="{name: 'Profile', params:{id: p.player.ID}}">{{p.player.名前}}</router-link>
          </td>
        </tr>
      </tbody>
    </table> -->
    <b-table striped hover :items="playerList" :fields="fields">
      <template v-slot:cell(keep)="data">
        <b-btn :variant="data.item.keep ? 'warning' : 'outline-warning'" @click="keep(data.item, data.index)">
          <i :class="data.item.keep ? 'far fa-check-circle fa-lg' : 'fas fa-arrow-alt-circle-down fa-lg'"></i>
        </b-btn>
      </template>
      <template v-slot:cell(指名)="data">
        <b-btn :variant="data.item.keep ? 'warning' : 'outline-warning'" @click="nomination(data.item, data.index)">
          <i :class="data.item.keep ? 'far fa-check-circle fa-lg' : 'fas fa-arrow-alt-circle-down fa-lg'"></i>
        </b-btn>
      </template>
      <template v-slot:cell(名前)="data">
        <router-link :to="{name: 'Profile', params:{id: data.item.ID}}">{{data.item.名前}}</router-link>
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { TPlayerSummary, TEnterInfo } from '../../common/types';           // TODO: @でパスの指定ができない（tsconfig.client.jsonがみれてない？）
import { getPlayerSummary } from '../api';
import { getEvents, postEvents } from '../api';

interface DispPlayerSummary extends TPlayerSummary {
  shimei: boolean;
  keep: boolean;
}

@Component
export default class PlayerList extends Vue {
  @Prop() private id!: string;
  @Prop() private drafting?: boolean = false;
  @Prop() private enterInfo?: TEnterInfo;

  private playerList: DispPlayerSummary[] = [];
  private keepList: TPlayerSummary[] = [];
  private fields = this.drafting
                    ? ['keep', '指名', '背番号', '名前', '生年月日', '守備', '投打']
                    : ['keep', '背番号', '名前', '生年月日', '守備', '投打'];
  
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
            ...e,
            shimei: shimei,
            keep: keep
          }
          this.playerList.push(player);
        })
      })
      .catch(e => console.error(e));
  }

  @Watch('drafting', { immediate: true })
  async draftingChange() {
    this.fields = this.drafting
                    ? ['keep', '指名', '背番号', '名前', '生年月日', '守備', '投打']
                    : ['keep', '背番号', '名前', '生年月日', '守備', '投打'];
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
        if (e.ID === p.ID)
        this.keepList.splice(i, 1);
      });
    } else {
      // まだキープされていない場合はキープ
      this.keepList.push(p);
    }

    localStorage.keepPlayer = JSON.stringify(this.keepList);
    this.playerList[i].keep = p.keep ? false : true;
  }

  private async nomination(p: DispPlayerSummary, i: number) {
    const contentObj = {
      room_id: this.enterInfo!.roomId,
      member_id: this.enterInfo!.memberId,
      turn: 1,
      duplicate_turn: 1,
      nomination_id: p.ID,
      nomination_time: new Date()
    }
    const content = JSON.stringify(contentObj);

    const res = await postEvents(this.enterInfo!, '60', content);
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
