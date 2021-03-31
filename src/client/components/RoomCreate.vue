<template>
  <div>
    <Modal @close="closeRoomCreate" v-if="createModal">
      <template slot="header">
        ルーム作成
      </template>
      <div>ルーム名<input v-model="roomName"></div>
      <template slot="footer">
        <button @click="clickRoomCreate">作成</button>
      </template>
    </Modal>
    
    <Modal v-if="createSuccess" @close="createSuccess=false">
      <template slot="header"/>
      <p>部屋が作成されました！</p>
      <template slot="footer"/>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Modal from '@/components/Modal.vue';
import { createRoom } from '../api/';

@Component({
  components: {
    Modal,
  },
})
export default class RoomCreate extends Vue {
  private roomName: string = '';
  private createSuccess: boolean = false;
  private createModal: boolean = true;

  private async clickRoomCreate() {
    // TODO★: 入力値のチェック

    const createObj = {
      name: this.roomName
    }
    
    try {
      // 部屋作成API呼び出し
      const res = await createRoom(createObj);

      // 作成成功メッセージを表示
      this.createSuccess = true;

      // 成功メッセージと部屋作成モーダルを少しずらして閉じる
      setTimeout(() => {
        this.createSuccess = false;
      }, 1000);
      setTimeout(() => {
        this.closeRoomCreate();
      }, 1500);

    } catch(e) {
      console.error(e);
    }
  }

  // 部屋作成モーダルを閉じる
  private async closeRoomCreate(){
    this.createModal = false;
    
    // すぐにcloseイベントを親に渡すとモーダルが消えるアニメーションが見えなくなるので、1秒後にemitする
    setTimeout(() => {
      this.$emit('close');
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
