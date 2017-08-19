import Vue from 'vue'
import videos from '../videos.json'

let templateString = '<div>'
templateString = templateString.concat('<video :src=videoSrc :width=width preload v-bind:autoplay=isAutoPlayed></video>',
	'<p><b>Winner:</b> {{ winner }}</p>',
	'<p><b>Runner up:</b> {{ runnerUp }}</p>',
	'</div>')

const randomVideoNumber = Math.round(Math.random())

const videoPlayer = {
	template: templateString,
	data: () => {
		return {
			videoSrc: '../video/' + videos.videos[randomVideoNumber]['video-file'],
			width: 768,
			isAutoPlayed: false, //TODO: Set to true later in dev cycle.
			winner: videos.videos[randomVideoNumber]["winner"],
			runnerUp: videos.videos[randomVideoNumber]["runner-up"]
		}
	}
}

export default videoPlayer