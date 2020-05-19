<template>
  <div class="player">
    <TeamIconList></TeamIconList>
    <PlayerList :id=this.id></PlayerList>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import PlayerList from '@/components/PlayerList.vue';
import TeamIconList from '@/components/TeamIconList.vue';

@Component({
  components: {
    PlayerList,
    TeamIconList,
  },
})
export default class Player extends Vue {
  private id: string = "";

  // URLのクエリが変更になるのを検知する
  // immediateを付与すると、監視直後（まだ変更なし）の場合にも1回呼ばれることになる
  @Watch('$route', { immediate: true })
  queryIdChange() {
    this.id = this.$route.query.id as string;
  }
}

</script>
