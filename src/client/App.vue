<template>
  <div id="app">
    <Header @enterLeave="enterLeave"></Header>
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
    <router-view :enterInfo="this.enterInfo"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import { TEnterInfo } from '../common/types';

@Component({
  components: {
    Header,
  },
})
export default class App extends Vue {
  private enterInfo: TEnterInfo = { roomId: '', memberId: '' };

  private enterLeave(enterInfo: TEnterInfo) {
    this.enterInfo = enterInfo;
  }
}

  
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

body {
  margin: 0;
}
</style>
