<template>
  <div class="team-detail">
    <h1 @click="click()">{{id}}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TeamDetail extends Vue {
  @Prop() private id?: string;

  private click(){
    console.log(`id:${this.id}`)
  }
}

</script>
