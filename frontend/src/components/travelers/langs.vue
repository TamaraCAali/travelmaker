<template>
  <p class="langs">
      {{langs}}
  </p>
</template>

<script>
export default {
  name: 'langs',
  props: {
    langs: String
  },
  methods: {}
};
</script>

<style scoped lang="scss">
p {
  border: solid 1px #35495e;
  border-radius: 50%;
  padding: 5px;
  margin: 0 5px 0 5px;
  font-size: 0.7em;
  font-weight: bold;
  background-color: #41b88361;
  display: inline-block;
  width: 30px;
  height: 26px;
  text-align: center;
  font-weight: bold;
}
</style>
