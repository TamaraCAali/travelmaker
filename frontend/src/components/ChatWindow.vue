<template>
    <section class="chat-window">
        <h1>Chatty chat</h1>
        <ul>
            <li 
            class="chat-msg-area"
            v-for="msg in chat.msgs"
            :msg="msg"
            :key="msg.createdAt" 
            :class="[{dark: msg.creator}]"
            >
            <h4>
                {{msg}}
            </h4>
            </li>
        </ul>
        <form action="">
          <input type="text" v-model="newMsgTxt"/>
          <button @click.prevent="addNewMsg">Send</button>
        </form>
    </section>
</template>

<script>
// import ChatMsgArea from '@/components/chat/ChatMsgArea.vue';
// import { LOAD_CHAT } from '@/storeModules/chatModule.js';
import chatService from '@/services/chatService';

export default {
  data() {
    return {
      chat: {
        _id: 'chat-room-mongo_id',
        room: '5b58aa7616f42101ded3362c5b58aa7616f42101ded3362d',
        usernames: ['Beatrice', 'Short'],
        msgs: [
          {
            creator: 1,
            txt: 'Lochets',
            at: 1532595342052,
            room: '5b58aa7616f42101ded3362c5b58aa7616f42101ded3362d'
          },
          {
            creator: 0,
            txt: 'Whattt',
            at: 1532595423061,
            room: '5b58aa7616f42101ded3362c5b58aa7616f42101ded3362d'
          },
          {
            creator: 1,
            txt: 'Yes',
            at: 1532595787693,
            room: '5b58aa7616f42101ded3362c5b58aa7616f42101ded3362d'
          }
        ]
      },
      newMsgTxt: '',
      currUserId: ''
    };
  },
  computed: {},
  created() {
    console.log(Date.now());

    this.loadChat();
  },
  methods: {
    loadChat(room = '5b58aa7616f42101ded3362c5b58aa7616f42101ded3362d') {
      chatService.getByRoom(room).then(chat => (this.chat = chat));
    },
    saveToDB(){
      // TODO: save chat to chat collection at DB
    },
    addNewMsg() {
      console.log('this.newMsg', this.newMsgTxt);
      this.$socket.emit('assignMsg', {
        txt: this.newMsgTxt,
        at: Date.now(),
        room: this.chat.room,
        author: 'Moshe',
        creator: 0
      });
    }
  },
  sockets: {
    renderMsg(msg) {
      console.log('msg from socket', msg);
      this.chat.msgs.push(msg);
      this.saveToDB()
    }
  },
  components: {}
};
</script>
    
<style lang="scss" scoped>
.chat-window {
  background: lightskyblue;
}

.chat-msg-area {
  background: wheat;
  color: blueviolet;
}

.chat-msg-area.dark {
  background: blueviolet;
  color: wheat;
}
</style>
