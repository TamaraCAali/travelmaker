<template>
    <section class="chat-window">
      <ol class="chat" >
            <li 
              v-if="chat.msgs.length > 0"
              class="chat-msg-area"
              v-for="msg in chat.msgs"
              :msg="msg"
              :key="msg.at" 
              :class="[(msg.creator._id === selfUser._id)? 'self' : 'other']"
            >
                <div class="avatar">
                  <img :src="getImgByCreatorId(msg.creator._id)" draggable="false"/>
                </div>
                <div class="msg">
                  <p>
                    {{msg.txt}}
                  </p>  
                  <time>{{getMomentTime(msg.at)}}</time>
                </div>
            </li>

                            <!-- <examples>
                              

                                      <li class="other">
                                          <div class="avatar"><img src="https://i.imgur.com/DY6gND0.png" draggable="false"/></div>
                                        <div class="msg">
                                          <p>Hola!</p>
                                          <p>Te vienes a cenar al centro? <emoji class="pizza"/></p>
                                          <time>20:17</time>
                                        </div>
                                      </li>
                                      <li class="self">
                                          <div class="avatar"><img src="https://i.imgur.com/HYcn9xO.png" draggable="false"/></div>
                                        <div class="msg">
                                          <p>Puff...</p>
                                          <p>Aún estoy haciendo el contexto de Góngora... <emoji class="books"/></p>
                                          <p>Mejor otro día</p>
                                          <time>20:18</time>
                                        </div>
                                      </li>
                                      <li class="other">
                                          <div class="avatar"><img src="https://i.imgur.com/DY6gND0.png" draggable="false"/></div>
                                        <div class="msg">
                                          <p>Qué contexto de Góngora? <emoji class="suffocated"/></p>
                                          <time>20:18</time>
                                        </div>
                                      </li>

                            </examples> -->
            <li ref="bottom" style="width:100%; height:50px;"></li>
      </ol>

        <form action="">
          <input class="textarea " type="text" v-model="newMsgTxt" placeholder="Type here!"/>
          <div class="emojis"></div>
          <button @click.prevent="addNewMsg" v-show="false">Send</button>
        </form>


        <div class="menu">
            <div class="back" @click="backClicked">
              <i class="fa fa-chevron-left"></i> 
              <img :src="otherUser.img" draggable="false"/>
            </div>
            <div class="name">{{otherUser.name.first}}</div>
            <!-- <div class="last">last seen at 18:09</div> -->
        </div>
   
    </section>
</template>

<script>
import chatService from '@/services/chatService';
import userService from '@/services/userService';
import moment from 'moment';
import store, { UPDATE_USER } from '@/store';
import eventBusService, {
  TOGGLE_CHAT,
  PUSH_NOTIFICATION
} from '@/services/eventBusService';
// TODOS: 1. Implement the emoji selector and apply it.
//        2. Implement last seen.
//        3. Possible: change the key to the otherUser Id

export default {
  name: 'ChatWindow',
  props: {
    otherUser: Object
  },
  data() {
    return {
      chat: {
        room: 'loading-room',
        users: [this.otherUser._id, 'self'],
        msgs: []
      },
      newMsgTxt: '',
      selfUser: {},
      otherNtfs: []
    };
  },
  computed: {},
  created() {
    this.selfUser = { ...this.$store.getters.loggedinUser };
    this.chat.room =
      this.selfUser._id > this.otherUser._id
        ? this.selfUser._id + this.otherUser._id
        : this.otherUser._id + this.selfUser._id;
    this.setOtherNtfsMap();
    this.loadChat(this.chat.room);
    this.$socket.emit('joinRoom', this.chat.room);
  },
  methods: {
    loadChat(room) {
      //  check if prev. room exists. if not: create a new one from scratch and save to DB
      chatService.getByRoom(room).then(chat => {
        if (chat) {
          this.chat = chat;
          let lastMsg = chat.msgs[this.chat.msgs.length - 1];
          // if(!lastMsg.isSeen && lastMsg.creator._id === this.otherUser._id)
        } else {
          // create new room and add it to the collection and save to DB
          this.chat = {
            room,
            users: [this.otherUser._id, this.selfUser._id],
            msgs: []
          };
          chatService.add(this.chat).then(chat => (this.chat = chat));
        }
      });
    },
    getMomentTime(timestamp) {
      return moment(timestamp).format('MMM DD, YYYY HH:mm');
    },
    setOtherNtfsMap() {
      if (this.otherUser.chatNtfsMap[this.selfUser._id]) {
        this.otherNtfs = this.otherUser.chatNtfsMap[this.selfUser._id].slice();
      }
    },
    updateOtherUserNtfsMap(objMsg) {
      this.otherNtfs.push(objMsg);
      let otherUserUpdated = { ...this.otherUser };
      otherUserUpdated.chatNtfsMap[this.selfUser._id] = this.otherNtfs;
      userService
        .updateOtherUser(otherUserUpdated)
        .then(_ => console.log('user Updated'));
    },
    addNewMsg() {
      let objMsg = {
        txt: this.newMsgTxt,
        room: this.chat.room,
        at: Date.now(),
        //maybe add a picture of the user here.
        creator: {
          _id: this.selfUser._id,
          img:
            'https://romero.co.il/wp-content/uploads/2018/01/%D7%A8%D7%95%D7%9E%D7%A8%D7%95-%D7%9C%D7%91-%D7%90%D7%99%D7%99%D7%A7%D7%95%D7%9F-300x300.png',
          // After applying cloudinary service=>
          //      img: this.selfUser.img,
          fullName: this.selfUser.name.first + ' ' + this.selfUser.name.last
        }
        // isSeen: false
      };
      // console.log('this.newMsg in client', objMsg);
      this.$socket.emit('assignMsg', objMsg);
      //DB notification
      this.updateOtherUserNtfsMap(objMsg);
      //socket notification
      let pushNtf = {
        ntfRoom: 'ntf-' + this.otherUser._id,
        chatRoom: this.chat.room,
        title: 'TravelMaker',
        options: {
          body: 'You have a new message from ' + this.selfUser.name.first,
          icon:
            'data:image/png;base64,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',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          }
          // actions: [
          //   {
          //     action: 'explore',
          //     title: 'Explore this new world',
          //     icon: 'images/checkmark.png'
          //   },
          //   {
          //     action: 'close',
          //     title: 'Close notification',
          //     icon: 'images/xmark.png'
          //   }
          // ]
        }
      };
      this.$socket.emit('assignPushNtf', pushNtf);
      this.newMsgTxt = '';
    },
    backClicked() {
      eventBusService.$emit(TOGGLE_CHAT, null);
    },
    getImgByCreatorId(userId) {
      return userId === this.selfUser._id
        ? this.selfUser.img
        : this.otherUser.img;
    },
    clearSelfNtfsMap() {
      if (this.selfUser.chatNtfsMap[this.otherUser._id]) {
        delete this.selfUser.chatNtfsMap[this.otherUser._id];
        this.$store.dispatch({ type: UPDATE_USER, user: this.selfUser });
      }
    }
  },
  destroyed() {
    //update the selfUser chatNtfsMap in this room as read.
    console.log('Chat Destroyed.', this.chat);
    this.clearSelfNtfsMap();
    chatService.update(this.chat);

    // Possible senario - leaving the room when destroyed, and then we
    // know when to send push-Notification:
    // another possibility is to create a room with the otherUser room and
    //  keep him connected to this room whenever he's logged in
    this.$socket.emit('leaveRoom', this.chat.room);
  },
  sockets: {
    connect() {
      // console.log('socket connected');
    },
    renderMsg(msg) {
      // console.log('msg from socket: ', msg);
      if (
        msg.creator._id === this.selfUser._id ||
        msg.creator._id === this.otherUser._id
      ) {
        this.chat.msgs.push(msg);
        this.$refs.bottom.scrollIntoView();
        chatService
          .update(this.chat)
          .then(chat => console.log(chat.room, 'Updated!'));
      }
      // if (msg.creator._id === this.otherUser._id) {
      //   let title = 'TravelMaker';
      //   let options = {
      //     body: 'You have a new message!'
      //   };
      //   eventBusService.$emit(PUSH_NOTIFICATION, { title, options });
      // }
    }
  },
  components: {},
  computed: {}
};
</script>
    
<style lang="scss" scoped>
ul li p {
  white-space: pre;
}

// IMPORTED

@import url(https://fonts.googleapis.com/css?family=Lato:100,300,400,700);
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css);

::selection {
  background: rgba(82, 179, 217, 0.3);
  color: inherit;
}
a {
  color: rgba(82, 179, 217, 0.9);
}

/* M E N U */

.menu {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  height: 50px;
  background: #41b883;
  z-index: 100;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.back {
  position: absolute;
  width: 90px;
  height: 50px;
  top: 0px;
  left: 0px;
  color: #fff;
  line-height: 50px;
  font-size: 30px;
  padding-left: 10px;
  cursor: pointer;
}
.back img {
  position: absolute;
  top: 5px;
  left: 30px;
  width: 40px;
  height: 40px;
  object-fit: cover;
  background-color: rgba(255, 255, 255, 0.98);
  border-radius: 100%;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  -ms-border-radius: 100%;
  margin-left: 15px;
}
.back:active {
  background: rgba(255, 255, 255, 0.2);
}
.name {
  position: absolute;
  top: 3px;
  left: 110px;
  font-family: 'Lato';
  font-size: 25px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.98);
  cursor: default;
}
.last {
  position: absolute;
  top: 30px;
  left: 115px;
  font-family: 'Lato';
  font-size: 11px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  cursor: default;
}

/* M E S S A G E S */

.chat {
  list-style: none;
  background: none;
  margin: 0;
  padding: 0 0 50px 0;
  margin-top: 60px;
  margin-bottom: 10px;
}
.chat li {
  padding: 0.5rem;
  overflow: hidden;
  display: flex;
}
.chat .avatar {
  width: 40px;
  height: 40px;
  position: relative;
  display: block;
  z-index: 2;
  border-radius: 100%;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  -ms-border-radius: 100%;
  background-color: rgba(255, 255, 255, 0.9);
}
.chat .avatar img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 100%;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  -ms-border-radius: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
.chat .day {
  position: relative;
  display: block;
  text-align: center;
  color: #c0c0c0;
  height: 20px;
  text-shadow: 7px 0px 0px #e5e5e5, 6px 0px 0px #e5e5e5, 5px 0px 0px #e5e5e5,
    4px 0px 0px #e5e5e5, 3px 0px 0px #e5e5e5, 2px 0px 0px #e5e5e5,
    1px 0px 0px #e5e5e5, 1px 0px 0px #e5e5e5, 0px 0px 0px #e5e5e5,
    -1px 0px 0px #e5e5e5, -2px 0px 0px #e5e5e5, -3px 0px 0px #e5e5e5,
    -4px 0px 0px #e5e5e5, -5px 0px 0px #e5e5e5, -6px 0px 0px #e5e5e5,
    -7px 0px 0px #e5e5e5;
  box-shadow: inset 20px 0px 0px #e5e5e5, inset -20px 0px 0px #e5e5e5,
    inset 0px -2px 0px #d7d7d7;
  line-height: 38px;
  margin-top: 5px;
  margin-bottom: 20px;
  cursor: default;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.other .msg {
  order: 1;
  border-top-left-radius: 0px;
  box-shadow: -1px 2px 0px #d4d4d4;
}
.other:before {
  content: '';
  position: relative;
  top: 0px;
  right: 0px;
  left: 40px;
  width: 0px;
  height: 0px;
  border: 5px solid #fff;
  border-left-color: transparent;
  border-bottom-color: transparent;
}

.self {
  justify-content: flex-end;
  align-items: flex-end;
}
.self .msg {
  background: #dcf8c6;
  order: 1;
  border-bottom-right-radius: 0px;
  box-shadow: 1px 2px 0px #d4d4d4;
}
.self .avatar {
  order: 2;
}
.self .avatar:after {
  content: '';

  position: absolute;
  display: inline-block;
  bottom: 0;
  right: 0;
  width: 0;
  left: 0;
  height: 0px;
  border: 5px solid #dcf8c6;
  border-right-color: transparent;
  border-top-color: transparent;
  box-shadow: 0px 2px 0px #d4d4d4;
}

.msg {
  background: white;
  min-width: 50px;
  padding: 10px;
  border-radius: 2px;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.07);
}
.msg p {
  font-size: 0.8rem;
  margin: 0 0 0.2rem 0;
  color: #777;
}
.msg img {
  position: relative;
  display: block;
  width: 450px;
  border-radius: 5px;
  box-shadow: 0px 0px 3px #eee;
  transition: all 0.4s cubic-bezier(0.565, -0.26, 0.255, 1.41);
  cursor: default;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
@media screen and (max-width: 800px) {
  .msg img {
    width: 300px;
  }
}
@media screen and (max-width: 550px) {
  .msg img {
    width: 200px;
  }
}

.msg time {
  font-size: 0.7rem;
  color: #ccc;
  margin-top: 3px;
  float: right;
  cursor: default;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
.msg time:before {
  content: '\f017';
  color: #ddd;
  font-family: FontAwesome;
  display: inline-block;
  margin-right: 4px;
}

emoji {
  display: inline-block;
  height: 18px;
  width: 18px;
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: -7px;
  margin-right: 2px;
  transform: translate3d(0px, 3px, 0px);
}
emoji.please {
  background-image: url(https://imgur.com/ftowh0s.png);
}
emoji.lmao {
  background-image: url(https://i.imgur.com/MllSy5N.png);
}
emoji.happy {
  background-image: url(https://imgur.com/5WUpcPZ.png);
}
emoji.pizza {
  background-image: url(https://imgur.com/voEvJld.png);
}
emoji.cryalot {
  background-image: url(https://i.imgur.com/UUrRRo6.png);
}
emoji.books {
  background-image: url(https://i.imgur.com/UjZLf1R.png);
}
emoji.moai {
  background-image: url(https://imgur.com/uSpaYy8.png);
}
emoji.suffocated {
  background-image: url(https://i.imgur.com/jfTyB5F.png);
}
emoji.scream {
  background-image: url(https://i.imgur.com/tOLNJgg.png);
}
emoji.hearth_blue {
  background-image: url(https://i.imgur.com/gR9juts.png);
}
emoji.funny {
  background-image: url(https://i.imgur.com/qKia58V.png);
}

-webikt-keyframes pulse {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.5;
  }
}

::-webkit-scrollbar {
  min-width: 12px;
  width: 12px;
  max-width: 12px;
  min-height: 12px;
  height: 12px;
  max-height: 12px;
  background: #e5e5e5;
  box-shadow: inset 0px 50px 0px rgba(82, 179, 217, 0.9),
    inset 0px -52px 0px #fafafa;
}

::-webkit-scrollbar-thumb {
  background: #bbb;
  border: none;
  border-radius: 100px;
  border: solid 3px #e5e5e5;
  box-shadow: inset 0px 0px 3px #999;
}

::-webkit-scrollbar-thumb:hover {
  background: #b0b0b0;
  box-shadow: inset 0px 0px 3px #888;
}

::-webkit-scrollbar-thumb:active {
  background: #aaa;
  box-shadow: inset 0px 0px 3px #7f7f7f;
}

::-webkit-scrollbar-button {
  display: block;
  height: 26px;
}

/* T Y P E */

input.textarea {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  height: 50px;
  z-index: 99;
  background: #fafafa;
  border: none;
  outline: none;
  padding-left: 55px;
  padding-right: 55px;
  color: #666;
  font-weight: 400;
}
.emojis {
  position: fixed;
  display: block;
  bottom: 8px;
  left: 7px;
  width: 34px;
  height: 34px;
  background-image: url(https://i.imgur.com/5WUpcPZ.png);
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 100;
  cursor: pointer;
}
.emojis:active {
  opacity: 0.9;
}

@media only screen and (min-width: 700px){
  .menu,
  .chat,
  .chat-window .textarea {
    width: 35vw;
  }
  .menu {
    top: 50px;
  }
  .chat {
    z-index: 81;
    position: fixed;
    top:40px;
    bottom: 0;
    right: 0;
    left: 0; 
    background-color: white;
    // border: 2px solid black;
    // padding: 0;
    // margin: 0;
    // position: fixed;
    // margin-top: 50vh;
    // padding: 50px 0 0 0;
  }
}
</style>
