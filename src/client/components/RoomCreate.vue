<template>
  <div>
    <Modal @close="closeRoomCreate" v-if="createModal">
      <template slot="header">
        ルーム作成
      </template>
      <div>ルーム名<input v-model="roomName"></div>
      <div>ユーザー名<input v-model="userName"></div>
      <template slot="footer">
        <button @click="clickRoomCreate">作成</button>
      </template>
    </Modal>
    
    <Modal v-if="createSuccess" @close="createSuccess=false">
      <template slot="header"/>
      <div>部屋が作成されました！</div>
      <template slot="footer"/>
    </Modal>

    <Modal v-if="errorModal" @close="errorModal=false">
      <template slot="header"/>
      <div v-html="errorMessage"></div>
      <template slot="footer"/>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Modal from '@/components/Modal.vue';
import { createRoom, enterRoom } from '../api/';
import { TEnterInfo } from '../../common/types';

@Component({
  components: {
    Modal,
  },
})
export default class RoomCreate extends Vue {
  private roomName: string = '';
  private userName: string = '';
  private errorMessage: string = '';
  private createSuccess: boolean = false;
  private createModal: boolean = true;
  private errorModal: boolean = false;

  // 作成ボタン押下時イベント
  private async clickRoomCreate() {

    // 各情報が入力されているかチェック
    if (!this.roomName) {
      this.errorMessage += '部屋名を入力してください！<br>';
    }
    if (!this.userName) {
      this.errorMessage += 'ユーザー名を入力してください！';
    }

    // 入力されていない場合、入力を促すモーダルを表示
    if (this.errorMessage) {
      this.errorModal = true;
      setTimeout(() => {
        this.errorModal = false;
        this.errorMessage = '';
      }, 3000);
      return;
    }

    // TODO★: 入力値のチェック

    const createObj = {
      name: this.roomName
    }
    
    try {
      // 部屋作成API呼び出し
      const res = await createRoom(createObj);
      const enterObj = {
        name: this.userName,
        roomId: res[0]
      }
      // 入室API呼び出し
      const enterRes = await enterRoom(enterObj);

      // 作成成功メッセージを表示
      this.createSuccess = true;

      const emitInfo: TEnterInfo = {
        roomId: res[0],
        memberId: enterRes[0]
      }

      // 成功メッセージと部屋作成モーダルを少しずらして閉じる
      setTimeout(() => {
        this.createSuccess = false;
      }, 1000);
      setTimeout(() => {
        this.closeRoomCreate(emitInfo);
      }, 1500);

    } catch(e) {
      console.error(e);
    }
  }

  // 部屋作成モーダルを閉じる
  private async closeRoomCreate(info?: any){
    this.createModal = false;
    
    // すぐにcloseイベントを親に渡すとモーダルが消えるアニメーションが見えなくなるので、1秒後にemitする
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
