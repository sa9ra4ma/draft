<template>
  <div class="team">
    <TeamIconList></TeamIconList>
    <h1 @click="click()">team</h1>
    <TeamDetail :id=id></TeamDetail>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TeamDetail from '@/components/TeamDetail.vue';
import TeamIconList from '@/components/TeamIconList.vue';

@Component({
  components: {
    TeamDetail,
    TeamIconList,
  },
})
export default class Team extends Vue {
  private a: number = 0;
  private id: string = "";

  private async created(){
    this.id = this.$route.query.id as string;
  }

  private async click(){
    console.log("click");
  }
}

</script>
