<template>
  <div class="curr-loc">
    <div class="search-input"><i class="fas fa-map-marker-alt"></i>
    <span>What's good in </span>
    <input  type="text" v-model="searchInput" :placeholder="currLocName" @keydown.enter="changeLoc">
    </div>
  </div>
</template>

<script>
import { LOAD_CURR_LOC } from '../store.js';
import { SEARCHED_LOC } from '../store.js';

import locService from '../services/locationService.js';

export default {
  name: 'CurrLoc',
  data() {
    return {
      searchInput: ''
    };
  },
  created() {
    this.loadLoc();
  },
  computed: {
    currLocName() {
      return this.$store.getters.getCurrLoc.name;
    }
  },
  methods: {
    loadLoc() {
      this.$store
        .dispatch(LOAD_CURR_LOC)
        .then()
        .catch(err => {
          console.log('err in load loc');
        });
    },
    changeLoc() {
      let searchInput = this.searchInput;
      this.$store
        .dispatch(SEARCHED_LOC, { searchInput })
        .then()
        .catch(err => {
          console.log('err in load new loc');
        });
    }
  }
};
</script>

<style scoped lang="scss">
.search-input {
  margin: 10px 0;
  text-align: center;
}
.search-input input {
  border: none;
  background-color: transparent;
  font-size: 1em;
  border-bottom: 1px solid lightgray;
  color: gray;
}
.fa-map-marker-alt:before {
  padding: 5px;
  color: #35495e;
}
</style>
