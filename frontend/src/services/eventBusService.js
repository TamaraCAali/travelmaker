import Vue from 'vue';

export const SHOW_MSG = 'show-msg';
export const LOGIN = 'user/login';
export const TOGGLE_CHAT = 'toggle-chat';
export const PUSH_NOTIFICATION = 'send-notification';
export const FB_LOGIN_MSG = 'fb-login';

var bus = new Vue();

export default bus;
