<template>
  <div>
    <Modal @close="closeSearchRoom" v-if="searchModal">
      <template slot="header">
        ルーム検索
      </template>
      <div v-for="room in roomList" :key="room._id">
        {{room.name}}
        <button @click="inputName(room)">入室</button>
      </div>
        
      <template slot="footer">
        <button @click="closeSearchRoom">閉じる</button>
      </template>
    </Modal>

    <Modal @close="inputNameModal=false" v-if="inputNameModal">
      <template slot="header">
        名前を入力してください
      </template>
      <div>名前<input v-model="name"></div>
      <template slot="footer">
        <button @click="enterRoom">入室</button>
      </template>
    </Modal>
    
    <Modal v-if="enterSuccessModal" @close="closeSuccess">
      <template slot="header"/>
      <div>入室します！</div>
      <template slot="footer"><div/></template>
    </Modal>

    <Modal v-if="errorModal" @close="errorModal = false">
      <template slot="header"/>
      <div>入室に失敗しました…</div>
      <template slot="footer"><div/></template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Modal from '@/components/Modal.vue';
import { getListOfAllRooms, getRoom, enterRoom } from '../api';
import { TRoom, TEnterInfo } from '../../common/types';

@Component({
  components: {
    Modal,
  },
})
export default class RoomCreate extends Vue {
  private inputNameModal: boolean = false;
  private searchModal: boolean = true;
  private enterSuccessModal: boolean = false;
  private errorModal: boolean = false;
  private roomList: TRoom[] = [];
  private name: string = '';
  private targetRoom: TRoom | null = null;

  private async created() {
    try {
      this.roomList = await getListOfAllRooms();
    } catch(e) {
      console.error(e);
    }
  }

  private async inputName(room: TRoom) {
    this.targetRoom = room;
    this.inputNameModal = true;
  }

  private async enterRoom() {
    try {
      if (!this.targetRoom?._id || !this.name) {
        throw new Error('need more infomation');
      }

      const enterObj = {
        name: this.name,
        roomId: this.targetRoom?._id
      }
      const enterRes = await enterRoom(enterObj);

      this.enterSuccessModal = true;

      const emitInfo: TEnterInfo = {
        roomId: (this.targetRoom?._id as string),
        memberId: enterRes
      }

      setTimeout(() => {
        this.enterSuccessModal = false;
        this.closeSearchRoom(emitInfo);
      }, 1000)
    } catch(err) {
      // エラーモーダル表示
      this.errorModal = true;
      console.error(err);
      setTimeout(() => {
        this.errorModal = false;
      }, 3000);
    }
  }

  private async closeSuccess() {
    this.enterSuccessModal = false;
    this.closeSearchRoom();
  }

  // 部屋検索モーダルを閉じる
  private async closeSearchRoom(info?: TEnterInfo){
    setTimeout(() => {
      this.inputNameModal = false;
    }, 100);
    setTimeout(() => {
      this.searchModal = false;
    }, 200);
    
    // すぐにcloseイベントを親に渡すとモーダルが消えるアニメーションが見えなくなるので、少しずらしてemitする
    setTimeout(() => {
      this.$emit('close', info);
    }, 1000);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modal-window {
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
}

.modal-content {
  padding: 10px 20px;
}

.modal-footer {
  background: #ccc;
  padding: 10px;
  text-align: right;
}

.modal-footer button {
  background: #eb516b;
  border: none;
  border-radius: 2px;
  padding: 4px 16px;
  color: #fff;
  transition: background-color .25s;
  cursor: pointer;
}

/* // オーバーレイのトランジション */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.4s;
}

/* // オーバーレイに包含されているモーダルウィンドウのトランジション */
.modal-enter-active .modal-window, .modal-leave-active .modal-window {
  transition: opacity 0.4s, transform 0.4s;
}

/* // ディレイを付けるとモーダルウィンドウが消えた後にオーバーレイが消える */
.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.modal-enter, .modal-leave-to {
  opacity: 0;
}

.modal-enter .modal-window, .modal-leave-to .modal-window {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
