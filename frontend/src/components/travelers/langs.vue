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
  border-radius: 50%;
  margin: 0 5px 0 0px;
  font-size: 0.8em;
  font-weight: bold;
  background-color: #59bc8aad;
  width: 25px;
  height: 25px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>
