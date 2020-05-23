<template>
  <div class="profile">
    <h1>{{this.playerDetail.name}}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TPlayerData } from '../types';           // TODO: @でパスの指定ができない（tsconfig.client.jsonがみれてない？）


@Component
export default class Profile extends Vue {
  @Prop() private id!: string;

  private playerDetail: TPlayerData = {
    id: 1,
    name: '菅野 智之',
    number: '18',
    main_position: '投手',
    old: 30,
  };
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
