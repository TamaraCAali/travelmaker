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
            <i v-else class="el-icon-upload2 avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div class="event-header">
        <h2>
          <el-input placeholder="Please input" v-model="event.name"></el-input>
        </h2>
        <h2 class="event-time">
          <input type="date" v-model="event.date">
        </h2>
        <!-- <h2 class="event-time">
          <datetime type="datetime" v-model="event.date"></datetime>
        </h2> -->
      </div>
      <div class="details-container">
        At: {{event.loc.title}}
      </div>
      <p class="event-description">
        <el-input
          type="textarea"
          autosize
          placeholder="Enter event description"
          v-model="event.desc">
        </el-input>
      </p>
      <div class="est-time-container">
        <i class="fas fa-walking"></i>
        {{eventLvl}}
      </div>
      <div class="difficulty-lvl-container">
        <i class="far fa-clock"></i>  
        Takes About: {{ event.estTime | stringifyEstTime }}
      </div>
      <div v-if="event" class="map" ref="map"></div>
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
      user: null,
      eventAddress: '',
      showUploadIcon: false
    };
  },
  created() {
    let idFromParams = this.$route.params.eventId;
    eventService.getById(idFromParams).then(res => {
      console.log('got event:', res);
      res.date = moment(res.date).format()
      return (this.event = JSON.parse(JSON.stringify(res)));
    });
    this.user = this.$store.getters.getUser;
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
    toggleEventAttendence() {
      if (this.userIsAttending) {
        console.log('leaving');
        let userIdx = this.event.attends.findIndex(id => id === this.user._id);
        this.event.attends.splice(userIdx, 1);
        eventService.update(this.event);
        let eventIdx = this.user.activity.events.findIndex(
          id => id === this.event._id
        );
        this.user.activity.events.splice(eventIdx, 1);
        userService.update(this.user);
      } else {
        console.log('attending');
        this.event.attends.push(this.user._id);
        eventService.update(this.event);
        this.user.activity.events.push(this.event._id);
        userService.update(this.user);
      }
    },
    shareEvent() {
      console.log('sharing the event');
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
    }
  },
  computed: {
    eventLvl() {
      if (this.event.lvl === 0) {
        return 'Easy walk';
      }
      if (this.event.lvl === 1) {
        return 'Moderate walk';
      } else if (this.event.lvl === 2) {
        return 'Demanding walk';
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
    }
    // event() {
    //   this.initMap()
    // }
  },
  watch: {
    event() {
      this.initMap();
      // console.log('is user attending?', this.userIsAttending);
    }
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

<style>
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
  margin: 0 auto;
  display: flex;
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
.event-time {
  width: 4em;
  text-align: center;
}

.details-container {
  align-self: flex-start;
  padding: 0 10px;
}

.event-description {
  width: 90%
}

.map {
  width: 100%;
  height: 250px;
  margin: 10px;
}
</style>
