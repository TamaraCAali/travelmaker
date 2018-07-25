<template>
  <div class="curr-loc">
    <div class="search-input"><i class="fas fa-map-marker-alt"></i> <input  type="text"></div>   
  </div>
</template>

<script>
export default {
  name: 'CurrLoc'
};
</script>

<style scoped lang="scss">
.search-input {
  margin: 10px 0 0 0;
  text-align: center;
}
.fa-map-marker-alt:before {
  padding: 5px;
  color: #35495e;
}
</style>
