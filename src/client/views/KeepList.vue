<template>
  <div class="player-list">
    <TeamIconList></TeamIconList>
    <button @click="clearAllKeepPlayer()">全削除</button>

    <table>
      <tbody>
      <tr v-for="(player, index) in playerList" :key=index>
        <td>
          <router-link :to="{name: 'Profile', params:{id: player.ID}}">{{player.名前}}</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { TPlayerSummary } from '../../common/types';           // TODO: @でパスの指定ができない（tsconfig.client.jsonがみれてない？）
import TeamIconList from '@/components/TeamIconList.vue';

@Component({
  components: {
    TeamIconList,
  },
})
export default class PlayerList extends Vue {
  @Prop() private id!: string;

  private playerList: TPlayerSummary[] = [];

  private created() {
    this.playerList = JSON.parse(localStorage.keepPlayer);
  }

  private clearAllKeepPlayer() {
    this.playerList = [];
    localStorage.keepPlayer = this.playerList;
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
