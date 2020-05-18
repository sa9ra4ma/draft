<template>
  <div class="login">
    <router-link to="/home" class="button">Login</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Home from '@/views/Home.vue';

@Component ({
  components: {
    Home,
  },
})
export default class Login extends Vue {
}

</script>

<style scoped>
.button {
  display: block;
  position: relative;
  margin: 0 auto;
  width: 70pt;
  border: solid 1px silver;
  border-radius: 0.5rem 0.5rem;
  padding: 0.5rem 1.5rem;
  margin-top: 1rem;
  text-decoration: none;
}


</style>