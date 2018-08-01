<template>
  <div class="traveler-edit-add">
        <div >
            <img class="user-img" :src="user.img">
        </div>


            <div class="input-file-container">
            <input  type="file" name="image" class="import-img input-file"
            @input="hendleFileSelected" multiple="false" accept="image/*" />
            <label tabindex="0" for="my-file" class="btn-submit">Select a file...</label>
             </div>


        <div class="user-details">
            <form @submit.prevent="SaveUser">
                <span>User Name</span><input class="input-login" type="text" v-model="user.userName" placeholder="user name" required>
                <span>First Mame</span><input class="input-login" type="text" v-model="user.name.first" placeholder="first name" required>
                <span>Last Name</span><input class="input-login" type="text" v-model="user.name.last" placeholder="last name" required>
                <span>Password</span><input class="input-login" type="text" v-model="user.password" placeholder="password" required>
                <span>Email Address</span><input class="input-login" type="email" v-model="user.email" placeholder="name@xxx.com" >
                <span>Age</span><input class="input-login" type="number" v-model="user.age" placeholder="age" required>
                <span>Write something about yourself</span><textarea class="input-login" v-model="user.about.desc" placeholder="write something about yourself.." rows="10" cols="30"></textarea>

                        <h4>My Interests</h4>   
                      <div class="tags-container">
                        <el-tag :key="interest" v-for="interest in user.about.interests" closable
                          :disable-transitions="false" @close="handleClose(interest)">
                          {{interest}}
                        </el-tag>
                        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput"
                          @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                        </el-input>
                        <el-button class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                      </div>

                        <h4>Next Destinations</h4>
                      <div class="tags-container">
                        <el-tag :key="dest" v-for="dest in user.about.nextDest" closable
                          :disable-transitions="false" @close="handleCloseDest(dest)">
                          {{dest}}
                        </el-tag>
                        <el-input class="input-new-tag" v-if="inputVisibleDest" v-model="inputValueDest" ref="saveTagInput"
                          @keyup.enter.native="handleInputConfirmDest" @blur="handleInputConfirmDest">
                        </el-input>
                        <el-button class="button-new-tag" size="small" @click="showInputDest">+ New Tag</el-button>
                      </div>

                       <h4>Languages</h4>                
                        <div class="langs">
                        <label><input type="checkbox" v-model="user.about.langs" value="AR"> Arabic</label>
                        <label><input type="checkbox" v-model="user.about.langs" value="CH"> Chinese</label>
                        <label><input type="checkbox" v-model="user.about.langs" value="EN"> English</label>
                        <label><input type="checkbox" v-model="user.about.langs" value="FR"> French</label>
                        <label><input type="checkbox" v-model="user.about.langs" value="DE"> German</label>
                        <label><input type="checkbox" v-model="user.about.langs" value="RU"> Russian</label>
                        <label><input type="checkbox" v-model="user.about.langs" value="ES"> Spanish</label>
                        <label><input type="checkbox" v-model="user.about.langs" value="HI"> Hindi</label>
                        <label><input type="checkbox" v-model="user.about.langs" value="HE"> Hebrew </label>
                        <label><input type="checkbox" v-model="user.about.langs" value="JA"> Japanese</label>
                        </div>

                <button class="btn-submit" type="submit">Save</button>
            </form>
        </div>
  </div>
</template>

<script>
import userService from '../services/userService';
import { ADD_USER } from '../store.js';
import { UPDATE_USER } from '../store.js';
import { LOAD_CURR_LOC } from '../store.js';

import EventBusService, { SHOW_MSG } from '../services/eventBusService.js';

export default {
  name: 'TravelerEditAdd',
  data() {
    return {
      inputVisible: false,
      inputValue: '',
      inputVisibleDest: false,
      inputValueDest: '',
      user: {
        password: '',
        userName: '',
        isActive: true,
        img:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjvdv8INW6OzjzPL8JyQlDbYOxZjabXx8xcNlhroqSHOMZh4C35g',
        age: null,
        name: {
          first: '',
          last: ''
        },
        email: '',
        about: {
          interests: [],
          nextDest: [],
          langs: [],
          desc: ''
        },
        activity: {
          events: [],
          chatRooms: []
        }
      }
    };
  },
  computed: {},
  created() {
    var loggeduser = this.$store.getters.getUser;
    if (loggeduser) this.user = loggeduser;
  },
  methods: {
    handleClose(interest) {
      this.user.about.interests.splice(
        this.user.about.interests.indexOf(interest),
        1
      );
    },
    handleCloseDest(dest) {
      this.user.about.nextDest.splice(
        this.user.about.nextDest.indexOf(dest),
        1
      );
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    showInputDest() {
      this.inputVisibleDest = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.user.about.interests.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    handleInputConfirmDest() {
      let inputValueDest = this.inputValueDest;
      if (inputValueDest) {
        this.user.about.nextDest.push(inputValueDest);
      }
      this.inputVisibleDest = false;
      this.inputValueDest = '';
    },
    SaveUser() {
      if (this.user._id) {
        console.log('inside update user');
        const user = JSON.parse(JSON.stringify(this.user));
        this.$store
          .dispatch(UPDATE_USER, { user })
          .then(_ => {
            this.$router.push('/');
            EventBusService.$emit(SHOW_MSG, {
              txt: `Updated successfully`,
              type: 'success'
            });
          })
          .catch(err => {
            console.log('err', err);
            EventBusService.$emit(SHOW_MSG, {
              txt: 'Could not save changes, please change picture type',
              type: 'danger'
            });
          });
      } else {
        console.log('inside create user');
        const user = JSON.parse(JSON.stringify(this.user));
        console.log('user details', user);
        this.$store
          .dispatch(ADD_USER, { user })
          .then(_ => {
            console.log('inside add', user);
            this.$router.push('/');
            this.$message.success('Login successfully');
          })
          .catch(err => {
            console.log('err', err);
            this.$message.error(err);
          });
      }
    },
    hendleFileSelected(ev) {
      var files = ev.target.files;
      var reader = new FileReader();
      var urlUpload = '';
      reader.onload = (file => {
        return e => {
          urlUpload = e.target.result;
          this.user.img = urlUpload;
        };
      })(files[0]);
      reader.readAsDataURL(files[0]);
      console.log(urlUpload);
      console.log('úser', this.user);
    }
  }
};
</script>
<style scoped lang="scss">
.traveler-edit-add {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: beige;
  box-shadow: 0 0 5px #00000063;
  margin: 10px;
  padding: 10px;
  transition: all 0.3s;
}
.user-img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.interests label,
.next-dest label,
.langs label {
  margin: 5px;
  cursor: pointer;
  display: inline-block;
}
.input-login {
  font-size: 1.1em;
  display: block;
  width: 75%;
  padding: 10px;
  margin: 10px;
  border-radius: 15px;
  border: none;
  box-shadow: 0 5px 30px 0px rgba(0, 0, 0, 0.1);
  color: #888888;
}

.btn-submit {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  margin: 10px auto;
  min-width: 160px;
  height: 50px;
  background-color: #41b883;
  border: none;
  border-radius: 25px;
  font-size: 14px;
  color: #fff;
  line-height: 1.2;
  text-transform: uppercase;
  transition: all 0.4s;
  box-shadow: 0 10px 30px 0px rgba(65, 184, 131, 0.5);
}
.btn-submit:hover {
  background-color: #438467;
}

.note-img {
  padding: 10px;
  background-color: var(--note-bg-color);
  box-shadow: 0 0 9px black;
}
.preview-note-img img,
.note-img img {
  width: 150px;
}

.note-img-item {
  margin: 0 0 10px;
}
/* input file */

.input-file-container {
  position: relative;
  width: 225px;
  margin: 0 0 5px;
}

.input-file-trigger {
  display: block;
  padding: 14px 45px;

  background: #cfa78a;
  color: white;
  font-size: 1em;
  transition: all 0.4s;
  cursor: pointer;
}
.input-file {
  position: absolute;
  top: 0;
  left: 0;
  width: 225px;
  opacity: 0;
  padding: 14px 0;
  cursor: pointer;
}
.input-file:hover + .input-file-trigger,
.input-file:focus + .input-file-trigger,
.input-file-trigger:hover,
.input-file-trigger:focus {
  background: #96584a;
  color: #fff;
}

.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.inputfile + label {
  font-size: 1.25em;
  font-weight: 700;
  color: white;
  background-color: black;
  display: inline-block;
}

.inputfile:focus + label,
.inputfile + label:hover {
  background-color: red;
}

h4 {
  margin: 0;
}
.tags-container {
  margin: 1em;
}

.tags-container span {
  margin: 0.5em;
}

.tags-container div {
  width: fit-content;
}
</style>
