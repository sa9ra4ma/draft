<template>
  <!-- <div class="main-header">
    <div class="main-header-list">
      <div class="header-flex-1">
        <router-link :to="{ name: 'Home' }">
          <img alt="Vue logo" src="@/assets/draft_logo.png" class="logo">
        </router-link>
      </div>
      <div class="header-flex-4">
        <h1>
          2020年ドラフト会議 supported by Tabibito
        </h1>
      </div>
      <div class="header-flex-2">
        <router-link :to="{ name: 'KeepList' }">
          キープ
        </router-link>
      </div>
    </div>
  </div> -->
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand>
        <router-link :to="{ name: 'Home' }">
          <img alt="Vue logo" src="@/assets/mr_try.png" class="logo">
        </router-link>
      </b-navbar-brand>

      <div><strong>2020年ドラフト会議 supported by Tabibito</strong></div>
      <b-btn variant="success" v-if="entered" @click="chatModal = true">
        <i class="fas fa-door-open"></i>
      </b-btn>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown text="Menu" right>
          <b-dropdown-item>
            <router-link :to="{ name: 'KeepList' }">
              キープリスト
            </router-link>
          </b-dropdown-item>
          <b-dropdown-item @click="openRoomCreateModal">
            ルーム作成
          </b-dropdown-item>
          <b-dropdown-item @click="openRoomSearchModal">
            ルーム検索
          </b-dropdown-item>
        </b-nav-item-dropdown>

      </b-navbar-nav>
    </b-navbar>
    
    <Chat v-if="chatModal" @close="chatModal = false" :enterInfo="this.enterInfo">
    </Chat>

    <RoomCreate v-if="modal" @close="closeRoomCreateModal">
    </RoomCreate>

    <RoomSearch v-if="roomSearchModal" @close="closeRoomSearchModal">
    </RoomSearch>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import RoomCreate from '@/components/RoomCreate.vue';
import RoomSearch from '@/components/RoomSearch.vue';
import Chat from '@/components/Chat.vue';
import { TEnterInfo } from '../../common/types';

@Component({
  components: {
    RoomCreate,
    RoomSearch,
    Chat,
  },
})export default class Header extends Vue {
  @Prop() private msg?: string;
  private modal: boolean = false;
  private roomSearchModal: boolean = false;
  private chatModal: boolean = false;
  private enterInfo: TEnterInfo = { roomId: '', memberId: '' };
  private entered: boolean = false;

  private openRoomCreateModal(){
    this.modal = true;
  }
  private closeRoomCreateModal(enterInfo: TEnterInfo){
    this.modal = false;
    this.enterInfo = enterInfo || this.enterInfo;
  }

  private openRoomSearchModal(){
    this.roomSearchModal = true;
  }
  private closeRoomSearchModal(enterInfo: TEnterInfo){
    this.roomSearchModal = false;
    this.enterInfo = enterInfo || this.enterInfo;
  }
  
  // 部屋入室情報を監視
  @Watch('enterInfo', { immediate: false })
  async enterInfoChange() {
    // 部屋IDとメンバーIDがある場合、入室済みと判断
    if (this.enterInfo?.roomId && this.enterInfo?.memberId) this.entered = true;
    else this.entered = false;
    this.$emit('enterLeave', this.enterInfo);
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main-header {
    background-color: gold;
  }
  .main-header-list {
    margin: 0px 100px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
  }
  .header-flex-1 {
    flex-grow: 1;
  }
  .header-flex-2 {
    flex-grow: 2;
  }
  .header-flex-3 {
    flex-grow: 3;
  }
  .header-flex-4 {
    flex-grow: 4;
  }
  .logo {
    width: 40px;
    height: 40px;
  }

</style>
