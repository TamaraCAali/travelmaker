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
                <input class="input-login" type="text" v-model="user.userName" placeholder="user name" required>
                <input class="input-login" type="text" v-model="user.name.first" placeholder="first name" required>
                <input class="input-login" type="text" v-model="user.name.last" placeholder="last name" required>
                <input class="input-login" type="text" v-model="user.password" placeholder="password" required>
                <input class="input-login" type="email" v-model="user.email" placeholder="name@xxx.com" >
                <input class="input-login" type="number" v-model="user.age" placeholder="age" required>
                <textarea class="input-login" v-model="user.about.desc" placeholder="write something about you.." rows="10" cols="30"></textarea>
                    <h4>My Interests</h4>                
                        <div class="interests">
                        <label><input type="checkbox" v-model="user.about.interests" value="Reading"> Reading</label>
                        <label><input type="checkbox" v-model="user.about.interests" value="Drawing"> Drawing</label>
                        <label><input type="checkbox" v-model="user.about.interests" value="Cooking"> Cooking</label>
                        <label><input type="checkbox" v-model="user.about.interests" value="Sport"> Sport</label>
                        <label><input type="checkbox" v-model="user.about.interests" value="Music"> Music</label>
                        <label><input type="checkbox" v-model="user.about.interests" value="Juggling"> Juggling</label>
                        <label><input type="checkbox" v-model="user.about.interests" value="Gaming"> Gaming</label>
                        <label><input type="checkbox" v-model="user.about.interests" value="Fishing"> Fishing</label>
                        <label><input type="checkbox" v-model="user.about.interests" value="Dancing"> Dancing </label>
                        </div>
                    <h4>Next Destinations</h4>
                        <div class="next-dest">
                        <label><input type="checkbox" v-model="user.about.nextDest" value="Africa"> Africa</label>
                        <label><input type="checkbox" v-model="user.about.nextDest" value="Antarctica"> Antarctica</label>
                        <label><input type="checkbox" v-model="user.about.nextDest" value="Asia"> Asia</label>
                        <label><input type="checkbox" v-model="user.about.nextDest" value="Europe"> Europe</label>
                        <label><input type="checkbox" v-model="user.about.nextDest" value="North America"> North America</label>
                        <label><input type="checkbox" v-model="user.about.nextDest" value="Australia/Oceania"> Australia/Oceania</label>
                        <label><input type="checkbox" v-model="user.about.nextDest" value="South America"> South America</label>
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
      user: {
        password: '',
        userName: '',
        isActive: true,
        img:
          'https://cdn-images-1.medium.com/max/1600/1*l9eqA179Bw1QoMA8iwBvHw.png',
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
            this.$router.push('/');
            EventBusService.$emit(SHOW_MSG, {
              txt: `Login successfully`,
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
      }
    },
    hendleFileSelected(ev) {
      console.log('jojoj');
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
</style>
