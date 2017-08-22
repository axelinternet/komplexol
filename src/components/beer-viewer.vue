import Vue from 'vue'
import beerViewerTemplate from './beer-viewer.template'
import * as firebase from "firebase"
import * as VueFire from "vuefire"
import config from '../../firebase_secrets.js'

firebase.initializeApp(config)


const beerRef = firebase.database().ref('path/')

const getDatabaseSnapshot = function() {
	firebase.database().ref('/path').once('value').then(function(snapshot) {
	  const value = snapshot.val()
	});
}

Vue.use(VueFire)

const beerViewer = {
	template: beerViewerTemplate,
 	data: () => {
 		return {
 			header: "Cool360"
 		}
 	},
 	firebase: {
 		beers: beerRef
 	}
}

export default beerViewer