import Vue from 'vue'
import * as firebase from "firebase"
import * as VueFire from "vuefire"
import config from '../../firebase_secrets.js'
import {email, password} from '../../firebase_secrets.js'

import winnerViewerTemplate from './winner-viewer.template'
import winnerCard from './winner-card.vue'

// Login to firebase, could this be a service instead?
firebase.initializeApp(config, 'winnerApp') 
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  const errorCode = error.code
  const errorMessage = error.message
  console.log(errorCode, errorMessage)
});

const winnerViewer = {
 	props: ['winner', 'runnerUp'],
 	template: winnerViewerTemplate,
 	components: {
 		'winner-card': winnerCard
 	},
 	data: function () {
 		return {winners: []}
 	},
 	firebase: {
 		drinkers: firebase.database().ref('drinker/')
	},
 	computed: {
 		winningTeam: function() {
 			return this.filterByTeam(this.winner)
 		},
 		runnerUpTeam: function() {
 			return this.filterByTeam(this.runnerUp)
 		}
 	},
 	methods: {
 		filterByTeam: function(teamNumber) {
 			let team = this.drinkers.map((drinker) => {
 				if (drinker.team == teamNumber) { return drinker.name }
 			})
 			team = team.filter(drinker => drinker)
 			return team
 		}
 	}
}

export default winnerViewer