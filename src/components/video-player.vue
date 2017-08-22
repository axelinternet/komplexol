import Vue from 'vue'
import videos from '../videos.json'
import videoPlayerTemplate from './video-player.template'

const randomVideoNumber = Math.round(Math.random())
//const videoArray = ['c1r2.mp4', 'c1r3.mp4']

const videoArray = videos.videos.map((vid) => vid['video-file'])

const videoPlayer = {
	template: videoPlayerTemplate,
	data: () => {
		return {
			//videoSrc: '../video/' + videos.videos[randomVideoNumber]['video-file'],
			videoSrc: videoArray[randomVideoNumber],
			width: 768,
			isAutoPlayed: false, //TODO: Set to true later in dev cycle.
			winner: videos.videos[randomVideoNumber]["winner"],
			runnerUp: videos.videos[randomVideoNumber]["runner-up"]
		}
	}
}
export default videoPlayer
