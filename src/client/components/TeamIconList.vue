<template>
  <div class="icon-bar">
    <ul class="nav-flex-container">
      <li v-for="team in this.teamList" :key=team.id class="team-icon-li">
        <router-link :to="{ name: 'Player', query: { id: team.id } }">
          <img :src=team.icon_path class="team-icon">
        </router-link>
      </li>
    </ul>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TeamIconList extends Vue {
  private teamId: string[] = ['g', 'db', 't', 'c', 'd', 's', 'l', 'h', 'e', 'm', 'f', 'b']
  private teamList: Object[] = [];

  private async created() {
    this.teamId.forEach((e, i) => {
      this.teamList[i] = {
        id: e,
        icon_path: require(`@/assets/logo_${e}_m.gif`), 
      };
    });
  }
}


</script>

<style scoped>
  .nav-flex-container {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    padding-inline-start: 100px;
    padding-inline-end: 100px;
  }
  .team-icon-li {
    list-style: none;
  }
  .team-icon{
    width: 50px;
    height: 50px;
  }
</style>
