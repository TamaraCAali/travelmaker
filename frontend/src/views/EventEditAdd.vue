<template>
  <div class="event-details">
    <div v-if="!event" class="loader">
      Loading Event...
    </div>
    <template v-else>
      <div class="img-container" @mouseover="mouseOnImg" @mouseleave.self="mouseOffImg">
        <img class="event-img" :src="event.img"/>
        <div v-if="showUploadIcon" class="upload-img-hover">
          <el-upload
            class="event-img-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i  class="el-icon-upload2 avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div class="event-header">
        <h2>
          <el-input placeholder="Please input" v-model="event.name"></el-input>
          <input placeholder="lalal "/>
        </h2>
        <div class="times-container">
          <div class="event-time">
            <div>
              <span>Start date: </span><input type="date" v-model="eventStartDate"></input>
            </div>
            <div>
              <span>Start Time: </span><input type="time" v-model="eventStartTime"></input>
            </div>
          </div>
          <div class="event-time">
            <div>
              <span>End date: </span><input type="date" v-model="eventEndDate"></input>
            </div>
            <div>
              <span>End time: </span><input type="time" v-model="eventEndTime"></input>
            </div>
          </div>
        </div>
        <!-- <h2 class="event-time">
          <datetime type="datetime" v-model="event.date"></datetime>
        </h2> -->
      </div>
      <div class="event-loc">
        At: <el-input v-model="eventAddress" @change="eventLocChanged = true"></el-input>
      </div>
      <p class="event-description">
        <el-input
          type="textarea"
          autosize
          placeholder="Enter event description"
          v-model="event.desc">
        </el-input>
      </p>
      <div class="difficulty-lvl-container">
        <i v-if="showLvlInput" class="el-icon-remove-outline" @click="toggleEventLvl"></i>
        <i v-else class="el-icon-circle-plus-outline" @click="toggleEventLvl"></i>
        <i class="fas fa-walking"></i>
        <select v-show="showLvlInput" class="lvl-select" v-model="event.level">
          <option value="0">Easy</option>
          <option value="1">Light walking</option>
          <option value="2">Moderate trek</option>
          <option value="3">Advanced trek</option>
          <option value="4">Difficult trek</option>
        </select>
      </div>
      <div v-if="event" class="map" ref="map"></div>
      <div class="tags-container">
        <el-tag :key="tag" v-for="tag in dynamicTags" closable
          :disable-transitions="false" @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput"
          @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
        </el-input>
        <el-button class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </div>
      <el-button @click="validateAndSave">Save event</el-button>
    </template>
  </div>
</template>

<script>
import moment from 'moment';
import locService from '../services/locationService';
import eventService from '../services/eventService';
import userService from '../services/userService';

export default {
  name: 'home',
  data() {
    return {
      imageUrl: '',
      event: {
        attends: [],
        loc: { lat: 33, lng: 35 }
      },
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      user: null,
      eventAddress: '',
      showUploadIcon: false,
      showLvlInput: true,
      eventStartDate: '',
      eventStartTime: '',
      eventEndDate: '',
      eventEndTime: '',
      eventLocChanged: false,
      estTimeUnit: ''
    };
  },
  created() {
    this.user = this.$store.getters.getUser;
    let idFromParams = this.$route.params.eventId;
    if (idFromParams === 'newEvent') {
      console.log('new event!');
      let emptyEvent = eventService.getEmptyEvent()
      this.event = JSON.parse(JSON.stringify(emptyEvent))
      this.event.creatorId = this.user._id
    }
    else {
      eventService.getById(idFromParams)
      .then(res => {
        console.log('got event:', res);
        res.date = moment(res.date).format()
        this.event = JSON.parse(JSON.stringify(res));
        this.initMap();
        if (!this.event.level) this.showLvlInput = false
        this.eventStartDate = moment(this.event.startTime).format('YYYY-MM-DD')
        this.eventStartTime = moment(this.event.startTime).format('HH:mm')
        this.eventEndDate = moment(this.event.endTime).format('YYYY-MM-DD')
        this.eventEndTime = moment(this.event.endTime).format('HH:mm')
        this.eventAddress = this.event.loc.title
        this.dynamicTags = this.event.tags
      });
    }
    
  },
  mounted() {
    this.initMap();
  },
  methods: {
    mouseOnImg() {
      this.showUploadIcon = true;
    },
    mouseOffImg() {
      this.showUploadIcon = false;
    },
    toggleEventLvl() {
      this.showLvlInput = !this.showLvlInput
    },
    initMap() {
      // if (!this.event || !this.event.loc) return
      var map = new google.maps.Map(this.$refs.map, {
        zoom: 4,
        center: this.event.loc
      });
      var marker = new google.maps.Marker({
        position: this.event.loc,
        map: map
      });
    },
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('Avatar picture must be JPG format!');
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!');
      }
      return isJPG && isLt2M;
    },
    getLocByName() {
      return locService.getPositionByName(this.eventAddress)
        .then(res => {
          this.eventAddress = res.address
          this.event.loc = {
            lat: res.lat,
            lng: res.lng,
            title: res.address
          }
          
          this.initMap();
        })
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },

    validateAndSave() {
      if (this.eventLocChanged) {
        this.getLocByName()
        .then(() => {
          this.saveEvent()
        })
        .catch(err => {
          this.$message.error('Can\'t find the address entered');
        })
      }
      else {
        console.log('got here!');     
        this.saveEvent()
      }
    },
    saveEvent() {
        this.event.startTime = +moment(this.eventStartDate + ' ' + this.eventStartTime).format('x');
        this.event.endTime = +moment(this.eventEndDate + ' ' + this.eventEndTime).format('x');
        this.event.tags = this.dynamicTags
        


        //TODO: rest setup of saving event

        console.log('saving event:', this.event);
    }
  },
  computed: {
    eventLvl() {
      if (this.event.lvl === 0) {
        return 'Easy';
      }
      if (this.event.lvl === 1) {
        return 'Light walking';
      }
      if (this.event.lvl === 2) {
        return 'Moderate trek';
      }
      if (this.event.lvl === 3) {
        return 'Advanced trek';
      }
      if (this.event.lvl === 4) {
        return 'Difficult trek';
      }
    },
    userIsAttending() {
      if (this.user && this.user._id)
        return this.event.attends.includes(this.user._id);
      else return false;
    },
    userIsAdmin() {
      return true;
      // return this.event.creatorId === this.user._id
    },
    eventEstTime() {
      return this.event.endTime
    },
  },
  watch: {
  },
  filters: {
    stringifyEstTime(val) {
      if (+val < 60) {
        return val + ' minutes';
      }
      if (+val > 1440) {
        let daysCount = +val / 720;
        daysCount = daysCount.toFixed() / 2; //Support .5 days
        return `About ${daysCount} days`;
      } else {
        let hoursCount = +val / 30;
        hoursCount = hoursCount.toFixed() / 2; //Support .5 hours
        return `About ${hoursCount} hours`;
      }
    },
    formatDate(val) {
      return moment().format('MMM Do');
    },
    formatHour(val) {
      return moment().format('HH:mm');
    }
  }
};
</script>

<style scoped>
.people-icon {
  width: 14px;
}

.event-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: beige;
  box-shadow: 0 0 5px #00000063;
  margin: 10px;
  padding: 10px;
  transition: all 0.3s;
}

.img-container {
  position: relative;
}

.event-img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.upload-img-hover {
  cursor: pointer;
  position: absolute;
  bottom: 3px;
  width: 100%;
  height: 250px;
  text-align: center;
  vertical-align: middle;
  line-height: 250px;   
  background-color: rgba(255, 255, 255, 0.3);
  opacity: 0.8;
}

.event-img-uploader {
  width: 100%;
}

.event-img-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
}
.event-img-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 3em;
  color:  rgba(0, 0, 0, 0.8);
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 250px;
  object-fit: cover;
}
.event-header {
  padding: 1em;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.edit-btn {
  margin: auto 1em;
  cursor: pointer;
}

.vdatetime input {
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  width: 100%;
}

.times-container {
  display: flex;
  flex-wrap: wrap;
  margin: 0.5em;
}

.event-time {
  /* width: 4em; */
  text-align: center;
  margin: 0.5em;
}

.event-time div {
 display: flex;
  width: fit-content;
  justify-content: space-between;
}

.event-time div span{
  width: 6em;
}

.event-time div input{
  align-self: flex-end;
}

.event-loc {
  align-self: flex-start;
  display: flex;
  align-items: center;
  padding: 0 10px;
  width: 100%
}

.event-loc .el-input input {
  width: 100%;
  font-family: inherit;
}

.event-description {
  width: 90%;
  height: 5em;
}

.difficulty-lvl-container {
  display: flex;
  align-items: center;
}

.difficulty-lvl-container p:first-of-type {
  width: 6em;
}

.tags-container {
 margin: 1em;
}

.tags-container span {
  margin: 0.5em;
}

.tags-container div {
  width: fit-content;
}

.lvl-select {
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  color: #606266;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  margin: 0 0.5em;
}

.map {
  width: 100%;
  height: 150px;
  margin: 10px;
}
</style>
