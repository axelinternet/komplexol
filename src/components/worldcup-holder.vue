import Vue from 'vue'
import worldCupHolderTemplate from './worldcup-holder.template'
import videoPlayer from './video-player.vue'
import winnerViewer from './winner-viewer.vue'
import videos from '../videos.json'

const getRandomVideo = function() {
	const randomVideoNumber = Math.round(Math.random())
	const videoArray = videos.videos.map((vid) => vid['video-file'])
	const selectedVideo = {
		race: videoArray[randomVideoNumber], 
		winner: videos.videos[randomVideoNumber]["winner"],
		runnerUp: videos.videos[randomVideoNumber]["runner-up"]
	}
	return selectedVideo
}

const worldCupHolder = {
 	data: function () {
 		return {
 			winners: [],
 			video: getRandomVideo()
 		}
 	},
 	components: {
 		'video-player': videoPlayer,
 		'winner-viewer': winnerViewer
 	},
 	template: worldCupHolderTemplate,
 	methods: {
    changeGame() {
      console.log("CLICKETYCLASCKCK")
      this.$emit('switchGame')
    }
  }
}

export default worldCupHolder