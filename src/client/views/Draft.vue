<template>
  <div class="draft">
    <!-- <TeamIconList></TeamIconList> -->
    <div class="tabs">
      <input id="main" type="radio" name="tab_item" checked>
      <label class="tab_item" for="main">MAIN</label>
      <input id="prayer" type="radio" name="tab_item">
      <label class="tab_item" for="prayer">PRAYER</label>
      <input id="keep" type="radio" name="tab_item">
      <label class="tab_item" for="keep">KEEP</label>
      <input id="history" type="radio" name="tab_item">
      <label class="tab_item" for="history">HISTORY</label>
      <input id="chat" type="radio" name="tab_item">
      <label class="tab_item" for="chat">CHAT</label>
      <div class="tab_content" id="prayer_content">
        <div class="tab_content_description">
          <TeamIconList :link="false" @teamChange='teamChange'></TeamIconList>
          <PlayerList :id="teamId" :drafting="drafting" :enterInfo="enterInfo"></PlayerList>
        </div>
      </div>
      <div class="tab_content" id="main_content">
        <div class="tab_content_description">
          <p class="c-txtsp">部屋のルールとか何巡目かとか残り時間とか</p>
          <div v-for="member in members" :key="member._id" class="message">
            {{member.member_info[0].name}}
          </div>
          <button v-if="roomHost" @click="startDraft()" :disabled="startBtnClicked">準備OK</button>
        </div>
      </div>
      <div class="tab_content" id="keep_content">
        <div class="tab_content_description">
          <p class="c-txtsp">キープ選手の表示</p>
        </div>
      </div>
      <div class="tab_content" id="history_content">
        <div class="tab_content_description">
          <p class="c-txtsp">指名履歴の表示</p>
          <div v-for="nomination in nominations" :key="nomination._id" class="message">
            {{nomination.content}}
          </div>
        </div>
      </div>
      <div class="tab_content" id="chat_content">
        <div class="tab_content_description">
          <p class="c-txtsp">チャット</p>
          <div class="chatMain">
            <div class="chatHistory">
              <div v-for="chat in chats" :key="chat._id" class="message" :class="chat.member_id===enterInfo.memberId ? 'from-me' : 'from-friend'">
                {{chat.content}}
              </div>
            </div>
            <div class="chatHooter">
              <input type="text" v-model="message">
              <button @click="sendMessage">送信</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Modal v-if="startDraftModal" @close="startDraftModal = false">
      <template slot="header"/>
      <div>ドラフトを開始します</div>
      <template slot="footer"><div/></template>
    </Modal>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TeamIconList from '@/components/TeamIconList.vue';
import PlayerList from '@/components/PlayerList.vue';
import { getEvents, postEvents } from '../api';
import { TEnterInfo } from '@/common/types';
import Modal from '@/components/Modal.vue';

@Component({
  components: {
    TeamIconList,
    PlayerList,
    Modal,
  },
})
export default class Draft extends Vue {
  @Prop() private enterInfo?: TEnterInfo;
  private teamId: string = 'g';
  private chats: any[] = [];
  private members: any[] = [];
  private nominations: any[] = [];
  private order: number = 0;
  private intervalId: any;
  private message: string = '';
  private startBtnClicked: boolean = false;
  private startBtnClickedCnt: number = 0;
  private startDraftModal: boolean = false;
  private roomHost: boolean = false;
  private drafting: boolean = false;


  private async created() {
    if (!this.enterInfo?.roomId || !this.enterInfo?.memberId) {
      this.enterInfo = {
        roomId: "60997b9b54165132b81771d6",
        memberId: "60997b9b54165132b81771d7"
      }
      // console.error('部屋の情報が正しくありません。');
      // return;
    }

    this.getEvent();

    // X秒間隔でルーム内の情報を取得しに行く
    // 2回目以降は前回取得した情報より後のイベント情報を取得するようにする
    this.intervalId = setInterval(async () => {
      this.getEvent();
    }, 3000)
  }

  private async getEvent() {
    try {
      const res = await getEvents(this.enterInfo!.roomId, this.order);
      res.forEach(r => {
        console.log("r: ", r)
        if (r.type === '30') this.chats.push(r)
        else if (r.type === '10') {
          this.members.push(r);
        } else if (r.type === '70') {
          this.nominations.push(r);
        } else if (r.type === '40') {
          this.startBtnClicked = false;
          this.startDraftModal = true;
          this.drafting = true;
          setTimeout(() => {
            this.startDraftModal = false;
          }, 1500);
        }
      })
      // ホストかどうか
      console.log(this.members[0])
      if (this.members[0].member_id === this.enterInfo?.memberId) {
        this.roomHost = true;
      }
      // イベント番最新設定
      if (res.length > 0) this.order = res[res.length-1].event_order;
    } catch(err) {
      console.error(err);
    }
  }

  private teamChange(teamId: string){
    this.teamId = teamId;
  }

  private async sendMessage() {
    try { 
      const res = await postEvents(this.enterInfo!, '30', this.message);
      this.message = '';
    } catch(err) {
      console.error(err);
    }
  }

  private async startDraft() {
    try { 
      const res = await postEvents(this.enterInfo!, '40', '');
      this.startBtnClicked = true;
    } catch(err) {
      console.error(err);
    }
  }
}



</script>


<style scoped>

  /*タブ切り替え全体のスタイル*/
  .tabs {
    margin-top: 50px;
    padding-bottom: 40px;
    background-color: #fff;
    /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); */
    width: 100%;
    margin: 0 auto;}

  /*タブのスタイル*/
  .tab_item {
    width: calc(100%/5);
    height: 50px;
    border-bottom: 3px solid #5ab4bd;
    background-color: #d9d9d9;
    line-height: 50px;
    font-size: 16px;
    text-align: center;
    color: #565656;
    display: block;
    float: left;
    text-align: center;
    font-weight: bold;
    transition: all 0.2s ease;
  }
  .tab_item:hover {
    opacity: 0.75;
  }

  /*ラジオボタンを全て消す*/
  input[name="tab_item"] {
    display: none;
  }

  /*タブ切り替えの中身のスタイル*/
  .tab_content {
    display: none;
    clear: both;
    overflow: hidden;
  }


  /*選択されているタブのコンテンツのみを表示*/
  #main:checked ~ #main_content,
  #prayer:checked ~ #prayer_content,
  #keep:checked ~ #keep_content,
  #history:checked ~ #history_content,
  #chat:checked ~ #chat_content {
    display: block;
  }

  /*選択されているタブのスタイルを変える*/
  .tabs input:checked + .tab_item {
    background-color: #5ab4bd;
    color: #fff;
  }


  .chatMain {
    height: 400px;
    width: 800px;
    margin: auto;
  }
  .chatHistory {
    height: 350px;
    overflow-y: scroll;
    border: solid;
  }
  .chatHooter {
    height: 50px;
    border: solid;
  }
  .message {
    height: 50px;
  }
  .from-me {
    margin-right: 20px;
    text-align: right;
  }
  .from-friend {
    margin-left: 20px;
    text-align: left;
  }
</style>
