import Vue from 'vue'
import winnerViewerTemplate from './winner-viewer.template'
const winnerViewer = Vue.component('winner-viewer', {
 	data: function () {
 		return {winners: []}
 	},
 	props: ['winner', 'runner-up'],
 	template: winnerViewerTemplate
})

export default winnerViewer