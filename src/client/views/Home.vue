<template>
  <div class="home">
    <TeamIconList></TeamIconList>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <!-- Bootstrap test -->
    <!-- 同じボタンが表示される -->
    <!-- <button class="btn btn-primary">ボタン</button>
    <div class="col-3 border bg-secondary">
      <h2><i class="fas fa-database pr-1"></i>データ一覧</h2>
    </div>
    <b-btn variant="primary">ボタン</b-btn> -->
    <!-- Bootstrap test -->

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
