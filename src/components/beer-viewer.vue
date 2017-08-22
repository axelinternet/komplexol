import Vue from 'vue'
import beerViewerTemplate from './beer-viewer.template'
import * as firebase from "firebase"
import * as VueFire from "vuefire"
import config from '../../firebase_secrets.js'
import {email, password} from '../../firebase_secrets.js'

firebase.initializeApp(config)

firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  const errorCode = error.code
  const errorMessage = error.message
  console.log(errorCode, errorMessage)
});

const beerRef = firebase.database().ref('path/')

const getDatabaseSnapshot = function() {
	firebase.database().ref('/path').once('value').then(function(snapshot) {
	  const value = snapshot.val()
	  console.log('VALUE: ', value)
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
 	},
 	methods: {
 		listen: () => {
 			this.$firebaseRefs.beers.on('value', function(snapshot) {
      	console.log(snapshot.val())
    	})
    }
 	}
}

export default beerViewer
