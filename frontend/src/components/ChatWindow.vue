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
          <input type="text" v-model="newMsg"/>
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
        room: 'activeUser_id + desireduser_id',
        usernames: ['Moshe', 'Omer'],
        msgs: [
          { creator: 1, msg: 'Lochets', at: 1532595342052 },
          { creator: 0, msg: 'Whattt', at: 1532595423061 },
          { creator: 1, msg: 'Yes', at: 1532595787693 }
        ]
      },
      newMsg : '',
      currUserId:''
    };
  },
  computed: {},
  created() {
    console.log(Date.now());

    this.loadChat()
  },
  methods: {
    loadChat(room = '5b58aa7616f42101ded3362c5b58aa7616f42101ded3362d') {
     return chatService.getByRoom(room)
             .then(chat => this.chat = chat)
    },
    addNewMsg(){
      console.log('this.newMsg',this.newMsg)
      // this.$socket.emit('updateMsg', )
    }
  },
  sockets: {
    dodo(data) {
      console.log('data', data);
    }
  },
  components: {
  }
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
