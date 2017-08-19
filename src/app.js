import Vue from 'vue'
import videoPlayer from './components/video-player.vue'

const app = new Vue({
  el: '#app',
  components: {
  	'video-player': videoPlayer
  },
  data: {
    message: 'nejtack',
   	playedVideos: []
  },
  template: '<div><h1>{{ message }}</h1><video-player></video-player></div>'
})