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
const drinkerRef = firebase.database().ref('drinker/')

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
 		beers: beerRef,
    drinkers: drinkerRef
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
    }, 
    realName: function(bi) {
      console.log("BI",bi)
      return "Lennart"
    }
  },
  methods: {
    setLameNames: function() {
      console.log("YAYA")
      for (let items in this.beers) {
          const uid = this.beers[items].uid
          const names = ["Nisse", "Bengt", "Olof", "Anders", "Tommy", "Eva", "Marcus", "Axel", "Nisse"]
          console.log(this.$firebaseRefs.drinkers.child(uid))
          this.$firebaseRefs.drinkers.child(uid).child("name").set(names[Math.round(Math.random()) * 8])
      }
    }
  }

}

export default beerViewer
