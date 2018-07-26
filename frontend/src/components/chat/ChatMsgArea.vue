<template>
    <li class="chat-msg-area flex">
        <pre>
            {{msg}}
        </pre>
        <h4>
            {{msg}}
        </h4>
    </li>
</template>

<script>
export default {
  props: { 'msg': Object },

};
</script>

<style>
</style>
