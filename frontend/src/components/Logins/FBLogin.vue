<template>
<div class="login-social-icon">
  <fb-signin-button
    :params="fbSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError">
    <i class="fab fa-facebook-f"></i>

  </fb-signin-button>
  </div>
</template>
 
<script>
import EventBusService, {
  SHOW_MSG,
  FB_LOGIN_MSG
} from '../../services/eventBusService.js';

export default {
  data() {
    return {
      fbSignInParams: {
        scope: 'email,user_likes',
        return_scopes: true
      },
      fbUser: null
    };
  },
  created() {},
  methods: {
    onSignInSuccess(response) {
      FB.api('/me', { fields: ['id', 'name', 'picture'] }, function(response) {
        this.fbUser = response;
        EventBusService.$emit(FB_LOGIN_MSG, this.fbUser);
      });
    },
    onSignInError(error) {
      console.log('OH NOES', error);
    }
  }
};
</script> 
 
<style>
.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
}

.fb-signin-button {
  font-size: 25px;
  color: #3b5998;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #fff;
  margin: 5px;
  box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
}

.login-social-icon:hover {
  color: #3b5998;
  box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.2);

  cursor: pointer;
}
</style> 