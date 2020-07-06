<template>
  <div class="profile">
    <TeamIconList></TeamIconList>
    <b-table striped hover :items="playerData" :fields="fields">
    </b-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { TPitcherData,  TFielderData } from '../../common/types';           // TODO: @でパスの指定ができない（tsconfig.client.jsonがみれてない？）
import { getPlayerDetail } from '../api';
import TeamIconList from '@/components/TeamIconList.vue';

@Component({
  components: {
    TeamIconList,
  },
})export default class Profile extends Vue {
  private id: string = "";
  private playerData: TPitcherData[] | TFielderData[] = [];
  private fields = ['年度','試合','勝利','敗北','セーブ','ホールド','HP','完投','完封勝','無四球','打者','投球回','被安打','被本塁打','与四球','与死球','奪三振','暴投','ボーク','失点','自責点','防御率','WHIP'];

  @Watch('$route', { immediate: true })
  async queryIdChange() {
    this.id = this.$route.params.id as string;
    try {
      this.playerData = await getPlayerDetail(this.id);
      this.playerData.sort((a:any, b:any) => {
        if( a.年度 < b.年度 ) return -1;
        if( a.年度 > b.年度 ) return 1;
        return 0;
      })
    } catch (e) {
      console.error(e)
    }
  }

}
</script>
