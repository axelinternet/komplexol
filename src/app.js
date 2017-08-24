import Vue from 'vue'
import beerViewer from './components/beer-viewer.vue'
import worldCupHolder from './components/worldcup-holder.vue'
import './style.css'
import particlesJS from 'particles.js'


const app = new Vue({
  el: '#app',
  components: {
  	'worldcup-holder': worldCupHolder,
  	'beer-viewer': beerViewer
  },
  data: {
    message: 'nejtack',
   	playedVideos: [],
  },
  template: '<div><beer-viewer></beer-viewer></div>'
})
