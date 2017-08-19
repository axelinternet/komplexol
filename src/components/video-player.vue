import Vue from 'vue'
import videos from '../videos.json'

const videoPlayer = Vue.component('video-player', {
	template: '<video :src=videoSrc :width=width preload v-bind:autoplay=isAutoPlayed></video>',
	data: () => {
		return {
			videoSrc: '../video/' + videos.videos[Math.round(Math.random())]['video-file'],
			width: 768,
			isAutoPlayed: false //TODO: Set to true later in dev cycle.
		}
	}
})

export { videoPlayer }