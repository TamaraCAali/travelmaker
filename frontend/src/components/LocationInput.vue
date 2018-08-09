<template>
  <div class="curr-loc">
    <div class="search-input">
    <h1 class="title">What's good near </h1><i class="fas fa-map-marker-alt"></i>
    <input  type="text" v-model="searchInput" :placeholder="currLocName" @keydown.enter="changeLoc">
    </div>
  </div>
</template>

<script>
import { LOAD_CURR_LOC } from '../store.js';
import { SEARCHED_LOC } from '../store.js';
import { UPDATE_USER } from '../store.js';
import { LOAD_EVENTS_BY_LOC } from '../storeModules/eventModule.js';

import locService from '../services/locationService.js';

export default {
  name: 'CurrLoc',
  data() {
    return {
      searchInput: ''
    };
  },
  created() {
    // this.loadLoc();
  },
  computed: {
    currLocName() {
      return this.$store.getters.getCurrLoc.name;
    }
  },
  methods: {
    // loadLoc() {
    //   this.$store
    //     .dispatch(LOAD_CURR_LOC)
    //     .then(res => {
    //       var user = this.$store.getters.loggedinUser;
    //       console.log('user', user);
    //       if (user._id) this.$store.dispatch(UPDATE_USER, { user });
    //     })
    //     .catch(err => {
    //       console.log('err in load loc');
    //     });
    // },
    changeLoc() {
      let searchInput = this.searchInput;
      this.$store
        .dispatch(SEARCHED_LOC, { searchInput })
        .then(res => {
          this.searchInput = res.address;
          let loc = [res.lat, res.lng];
          this.$store
            .dispatch(LOAD_EVENTS_BY_LOC, { loc })
            .then(events => {
<<<<<<< HEAD
              console.log('loc input got:', events);

=======
>>>>>>> master
              this.$emit('events-changed');
            })
            .catch(err => {
              console.log('err in load events', err);
            });
        })
        .catch(err => {
          console.log('err in load new loc');
        });
    }
  }
};
</script>

<style scoped lang="scss">
.title {
  display: inline-block;
  margin: 0 1px 0 0;
  color: #41b883;
  font-family: BreeSerif;
}
.search-input {
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.search-input input {
  width: 100%;
  border: none;
  background-color: transparent;
  font-size: 1em;
  border-bottom: 1px solid lightgray;
  color: #35495e;
  text-align: center;
}
.fa-map-marker-alt:before {
  padding: 5px;
  color: #35495e;
}
</style>
