<template>
  <section class="events-filter">
    Radius (in Km): 
    <el-input-number v-model="radiusInput" 
      class="radius-input" :precision="3" 
      :step="0.1" :min="0.1" :max="500">
    </el-input-number>
    Keyword Search:
    <input type="text" v-model="filterBy.txt">
    <div class="filter-btn" @click="onFilter">
      <i class="fas fa-search"></i>
    </div>
  </section>
</template>

<script>
import { SET_RADIUS } from '../storeModules/eventModule.js';
import { SET_FILTER } from '../storeModules/eventModule.js';

export default {
  name: 'EventsFilter',
  data() {
    return {
      radiusInput: null,
      filterBy: {
        txt: ''
      }
    }
  },
  created() {
    this.radiusInput = this.$store.getters.eventsRadius / 1000;
  },
  computed: {
  },
  methods: {
    onFilter() {
      let radiusInputInMeters = this.radiusInput * 1000
      let ratio = 2.74086
      this.$store.dispatch(SET_RADIUS, {radius: radiusInputInMeters * ratio})

      this.$store.dispatch(SET_FILTER, {filterBy: this.filterBy})

      let searchedLoc = this.$store.getters.searchedLoc
      if (searchedLoc.lat) {
        console.log('filter says yes search');
        this.$store.dispatch(LOAD_EVENTS_BY_LOC, { loc })
        .then(events => {
          this.$emit('events-changed')
        })
        .catch(err => {
          console.log('err in load events', err);
        });
      }      
      else {
        console.log('filter says no search');
        this.$emit('just-radius-changed')
      }
    }
  }
};
</script>

<style scoped>
.events-filter {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;
}


.filter-btn {
  cursor: pointer;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  height: 2em;
  width: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s
}

.filter-btn:hover {
  background-color: #f5f7fa;
  /* background-color: rgba(0, 0, 0, 0.05) */
}

.radius-input {
  margin-right: 1em;
}

input {
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  color: #606266;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  margin: 0 0.5em;
}
</style>
