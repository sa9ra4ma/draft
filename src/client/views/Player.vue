<template>
  <div class="home">
    <TeamIconList></TeamIconList>
    <PlayerList></PlayerList>
    <img alt="Vue logo" src="../assets/draft_logo.jpg">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <router-link to="/profile">プロフィール</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import PlayerList from '@/components/PlayerList.vue';
import TeamIconList from '@/components/TeamIconList.vue';

@Component({
  components: {
    PlayerList,
    TeamIconList,
  },
})
export default class Player extends Vue {
  @Prop() private msg?: string;
}

</script>
