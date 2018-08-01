<template>
      <section >
          <div class="back-login"></div>

          <div class="login">
        <router-link class="btn-submit try-us" to="/user/edit/:userId"><span >Open new account</span></router-link>
            <h1>Sign In</h1>      
          <form  @submit.prevent="login">
            <input class="input-login" type="text" v-model="ChekcIn.userName" placeholder="user name">
            <input class="input-login" type="password" v-model="ChekcIn.password" placeholder="password">
            <button class="btn-submit" type="submit">Login</button>
          </form>
            <p>Or login with</p>
              <div class="flex justify-center" >
                <!-- <FBLogin ></FBLogin>   -->
                <a href="#" class="login-social-icon">
						      <i class="fab fa-facebook-f"></i>
					      </a>
                <a href="#" class="login-social-icon">
                  <img src="../assets/img/icon-google.png">
                </a>
				      </div>
          </div>
          
      </section>
</template>

<script>
import { LOGIN } from '../store.js';
import { FB_LOGIN } from '../store.js';

import { SET_GUEST } from '../store.js';
import EventBusService, {
  SHOW_MSG,
  FB_LOGIN_MSG
} from '../services/eventBusService.js';
import FBLogin from '@/components/Logins/FBLogin.vue';

export default {
  name: 'Login',
  components: {
    FBLogin
  },
  data() {
    return {
      ChekcIn: {
        userName: null,
        password: null
      }
    };
  },
  created() {
    EventBusService.$on(FB_LOGIN_MSG, fbUser => {
      this.fbLogin(fbUser);
    });
  },
  computed: {},
  methods: {
    login() {
      let user = { ...this.ChekcIn };
      this.$store
        .dispatch(LOGIN, { user })
        .then(_ => {
          EventBusService.$emit(SHOW_MSG, {
            txt: `Login successfully as ${user.userName}`,
            type: 'success'
          });

          this.$router.push('/');
        })
        .catch(err => {
          console.log('err', err);
          EventBusService.$emit(SHOW_MSG, {
            txt: err,
            type: 'danger'
          });
        });
    },
    // setGuest() {
    //   console.log('set setGuest');
    //   this.$store
    //     .dispatch(SET_GUEST)
    //     .then(_ => {
    //       console.log('here');
    //       EventBusService.$emit(SHOW_MSG, {
    //         txt: `Login as guest`,
    //         type: 'success'
    //       });
    //       this.$router.push('/');
    //     })
    //     .catch(err => {
    //       console.log('err', err);
    //       EventBusService.$emit(SHOW_MSG, {
    //         txt: err,
    //         type: 'danger'
    //       });
    //     });
    // },
    fbLogin(user) {
      this.$store
        .dispatch(FB_LOGIN, { user })
        .then(_ => {
          EventBusService.$emit(SHOW_MSG, {
            txt: `Login successfully as ${user.name}`,
            type: 'success'
          });
          this.$router.push('/');
        })
        .catch(err => {
          console.log('err', err);
          EventBusService.$emit(SHOW_MSG, {
            txt: err,
            type: 'danger'
          });
        });
    }
  }
};
</script>

<style scoped lang="scss">
body,
.back-login {
  position: fixed !important;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url('../assets/img/login_Backg.jpg');
  height: 700px;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-transition: all 1s ease;
  transition: all 1s ease;
  opacity: 0.65;
  background-position: center;
}
.login {
  color: #41b883;
  position: relative;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 85px;
  width: 300px;
  border-radius: 29px;
  margin: 0 auto;
  padding: 30px;
}
.input-login {
  font-size: 1.1em;
  display: block;
  background: transparent;
  padding: 20px;
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
  margin: 0 auto;
  min-width: 110px;
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

.login-social-icon {
  font-size: 25px;
  color: #3b5998;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
  margin: 5px;
  box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
}

.login-social-icon img {
  width: 26px;
}

.login-social-icon:hover {
  color: #3b5998;
  box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.2);
}
.try-us {
  background-color: #35495ed1;
  min-width: 160px;
  height: 50px;
}

.try-us:hover {
  background-color: #35495e;
}
h1 {
  margin: 20px 0 0 0;
}
.new-acount {
  font-size: 1.3em;
  text-align: center;
  transition: all 0.4s;
}

.new-acount:hover {
  font-size: 1.4em;
  color: #438467;
}
</style>