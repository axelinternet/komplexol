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
 	data: function() {
    return {
 			header: "Cool360",
      beerCheckInsObject: {}
 		}
 	},
  firebase: {
 		 beers: {
      source: beerRef,
      // optionally bind as an object
      asObject: true,
      // optionally provide the cancelCallback
      cancelCallback: function () {},
      // this is called once the data has been retrieved from firebase
      readyCallback: function () {
      }
    }
 	},
  computed: {
    topBeers: function() {

      const checkIns = this.beers
      const checkInsArr = Object.keys(checkIns).map(function (key) {
        return checkIns[key];
      });

      const result = {};
      checkInsArr.forEach(function(i) {
        if (!result.hasOwnProperty(i.uid)) {
          result[i.uid] = 0;
        }
        result[i.uid] +=1;
      });

      const newArrayA = Object.keys(result).map(function(k) {

        const o = {'uid':k, 'amount':result[k]}
        return o;
      })

      newArrayA.sort(function(a, b) {
        return b.amount - a.amount;
      });

      var ar = newArrayA.slice(0, 10);

      return ar

    },
    beerHeight: function() {

      const totalAmountBeers = 500;
      var amountBeers = Object.keys(this.beers).length;
      const beerPerPixel = 100/totalAmountBeers;
      const beerHeight = Math.round(amountBeers*beerPerPixel) + "%";
      return beerHeight
    }
  }
}

export default beerViewer