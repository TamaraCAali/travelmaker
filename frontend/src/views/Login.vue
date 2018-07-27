<template>
      <section >
          <div class="back-login"></div>
          <div class="login">
            <h1>Sign In</h1>
          <form  @submit.prevent="login">
            <input class="input-login" type="text" v-model="ChekcIn.username" placeholder="username">
            <input class="input-login" type="text" v-model="ChekcIn.password" placeholder="password">
            <button class="btn-submit" type="submit">Login</button>
          </form>
            <p>Or login with</p>
                <div class="flex justify-center" >
					<a href="#" class="login-social-icon">
						<i class="fab fa-facebook-f"></i>
					</a>
					<a href="#" class="login-social-icon">
						<img src="../assets/img/icon-google.png">
					</a>
				</div>
                <a href="#" >
						Open new account
					</a>
          </div>
          
      </section>
</template>

<script>
import { LOGIN } from '../store.js';

export default {
  name: 'Login',
  data() {
    return {
      ChekcIn: {
        username: null,
        password: null
      }
    };
  },
  mounted() {},
  computed: {},
  methods: {
    login() {
      let user = { ...this.ChekcIn };
      this.$store.dispatch(LOGIN, { user }).then(_ => this.$router.push('/'));
    }
  }
};
</script>

<style scoped lang="scss">
body,
.back-login {
  position: fixed !important;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url(/img/login_Backg.97ba7aa0.jpg);
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
  top: 40px;
  width: 300px;
  border-radius: 29px;
  margin: 0 auto;
  padding: 20px;
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
  -moz-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -o-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -ms-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
}

.login-social-icon img {
  width: 26px;
}

.login-social-icon:hover {
  color: #3b5998;
  box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.2);
  -o-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.2);
  -ms-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.2);
}
</style>