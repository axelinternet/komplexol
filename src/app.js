import Vue from 'vue'
import videoPlayer from './components/video-player.vue'
import beerViewer from './components/beer-viewer.vue'
import './style.css'

const app = new Vue({
  el: '#app',
  components: {
  	'video-player': videoPlayer,
  	'beer-viewer': beerViewer
  },
  data: {
    message: 'nejtack',
   	playedVideos: [],
  },
  template: '<div><beer-viewer></beer-viewer></div>'
})