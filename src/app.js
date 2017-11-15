import Vue from 'vue'
// Why does this not play nice if loaded in component?
import particlesJS from 'particles.js' 
import beerViewer from './components/beer-viewer.vue'
import worldCupHolder from './components/worldcup-holder.vue'
import appTemplate from './components/app.template'
import './style.css'

const app = new Vue({
  el: '#app',
  components: {
  	'worldcup-holder': worldCupHolder,
  	'beer-viewer': beerViewer
  },
  data: {
    currentGame: 'worldcup'
  },
  template: appTemplate,
  methods: {
    switchGame() {
      console.log("GOT IT")
      this.currentGame='beer'
    }
  }
})
