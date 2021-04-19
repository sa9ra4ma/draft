<template>
  <div>
    <Modal @close="closeChat" v-if="chatModal">
      <template slot="header">
        チャット
      </template>
      <div v-for="event in events" :key="event._id">
        {{event.content}}
      </div>
      <div><input v-model="content"><button @click="sendMessage()">Send!</button></div>
      <template slot="footer">
      </template>
    </Modal>
    
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Modal from '@/components/Modal.vue';
import { getEvents, postEvents } from '../api';
import { TEnterInfo } from '../../common/types';

@Component({
  components: {
    Modal,
  },
})
export default class Chat extends Vue {
  @Prop() private enterInfo!: TEnterInfo;
  private errorMessage: string = '';
  private chatModal: boolean = true;
  private errorModal: boolean = false;
  private events: any[] = [];
  private content: string = '';
  private order: number = 0;
  private intervalId: any;

  private async created() {
    // X秒間隔でルーム内の情報を取得しに行く
    // 2回目以降は前回取得した情報より後のイベント情報を取得するようにする
    this.intervalId = setInterval(async () => {
      try {
        const res = await getEvents(this.enterInfo.roomId, this.order);
        if (res.length) {
          this.events = this.events.concat(res);
          this.order = res[res.length-1].event_order;
        }
      } catch(err) {
        console.error(err);
      }
    }, 3000)
  }

  private async sendMessage() {
    try { 
      const res = await postEvents(this.enterInfo, '30', this.content);
      this.content = '';
    } catch(err) {
      console.error(err);
    }
  }

  @Watch('enterInfo', { immediate: false, deep: true })
  async changeMemberId() {
    this.events = []
    this.order = 0;
    clearInterval(this.intervalId);
  }

  // チャットモーダルを閉じる
  private async closeChat(){
    this.chatModal = false;
    clearInterval(this.intervalId);
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
