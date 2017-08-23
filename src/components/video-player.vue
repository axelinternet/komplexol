import Vue from 'vue'
import videoPlayerTemplate from './video-player.template'

const videoPlayer = {
	template: videoPlayerTemplate,
	props: ['videoSrc', 'winner', 'runnerUp', 'isAutoPlayed'],
	data: () => {
		return {
			width: 768
		}
	}
}
export default videoPlayer
