<template>
  <section class="events-filter">
    Radius: 
    <el-input-number v-model="radiusInput" size="mini" 
      :step="100" :min="200" :max="10000000">
    </el-input-number>
    <div class="filter-btn" @click="onFilter">
      <i class="fas fa-search"></i>
    </div>
  </section>
</template>
<script>
import { SET_RADIUS } from '../storeModules/eventModule.js';


export default {
  name: 'EventsFilter',
  data() {
    return {
      radiusInput: null,
    }
  },
  created() {
    this.radiusInput = this.$store.getters.eventsRadius;
  },
  computed: {
  },
  methods: {
    onFilter() {
      let ratio = 2.74086
      this.$store.dispatch(SET_RADIUS, {radius: this.radiusInput * ratio})

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
  padding: 10px;
}


.filter-btn {
  cursor: pointer;
  padding: 5px;
}

</style>
