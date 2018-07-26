<template>
    <section class="chat-window">
        <h1>Chatty chat</h1>
        <ul>

            <li 
            class="chat-msg-area"
            v-for="msg in msgs"
            :msg="msg"
            :key="msg.createdAt" 
            :class="[{dark: msg.userId === users[0]._id}]"
            >
            <h4>
                {{msg}}
            </h4>
            </li>
        </ul>
    </section>
</template>

<script>
import ChatMsgArea from '@/components/chat/ChatMsgArea.vue';

export default {
  data() {
    return {
      users: [
        {
          _id: 1,
          name: 'Moshe',
          img:
            'https://images.haaretz.co.il/polopoly_fs/1.2508252.1418143862!/image/1282163234.png_gen/derivatives/landscape_96/1282163234.png'
        },
        {
          _id: 2,
          name: 'Bibi',
          img:
            'https://pbs.twimg.com/profile_images/963709458068144128/d2-HUCTf_normal.jpg'
        }
      ],
      msgs: [
        { userId: 1, msg: 'Lochets', createdAt: 1532595342052 },
        { userId: 2, msg: 'Whattt', createdAt: 1532595423061 },
        { userId: 1, msg: 'Yes', createdAt: 1532595787693 }
      ]
    };
  },
  computed: {},
  created() {
    console.log(Date.now());
    // this.loadUsers();
    // this.loadChat();
  },
  methods: {},
  components: {
    ChatMsgArea
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
