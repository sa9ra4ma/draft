<template>
  <div class="home">
    <TeamIconList></TeamIconList>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <router-link to="/playerlist">プロフィール</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import TeamIconList from '@/components/TeamIconList.vue';

@Component({
  components: {
    HelloWorld,
    TeamIconList,
  },
})
export default class Home extends Vue {
  @Prop() private msg?: string;
}

</script>
