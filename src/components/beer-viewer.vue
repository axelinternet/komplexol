import Vue from 'vue'
import beerViewerTemplate from './beer-viewer.template'
import bubble from './bubble.vue'
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

const getDatabaseSnapshot = function() {
	firebase.database().ref('/path').once('value').then(function(snapshot) {
	  const value = snapshot.val()
	  console.log('VALUE: ', value)
	});
}

Vue.use(VueFire)

const beerViewer = {
  components: {
    "bubble": bubble

  },
	template: beerViewerTemplate,
 	data: function() {
    return {
 			header: "Cool360",
      beerCheckInsObject: {},
      foamArr: [51, 12, 42, 29, 14, 22, 50, 27, 39, 4, 16, 2, 15, 5, 24, 42, 3, 28, 19, 20, 47, 22, 12, 45, 8, 40, 20, 27, 43, 8, 2, 16, 46, 11, 34, 29, 41, 6, 20, 30, 20, 22, 31, 41, 29, 42, 17, 30, 19,51, 12, 42, 29, 14, 22, 50, 27, 39, 4, 16, 2, 15, 5, 24, 42, 3, 28, 19, 20, 47, 22, 12, 45, 8, 40, 20, 27, 43, 8, 2, 16, 46, 11, 34, 29, 41, 6, 20, 30, 20, 22, 31, 41, 29, 42, 17, 30, 19,51, 12, 42, 29, 14, 22, 50, 27, 39, 4, 16, 2, 15, 5, 24, 42, 3, 28, 19, 20, 47, 22, 12, 45, 8, 40, 20, 27, 43, 8, 2, 16, 46, 11, 34, 29, 41, 6, 20, 30, 20, 22, 31, 41, 29, 42, 17, 30, 19,51, 12, 42, 29, 14, 22, 50, 27, 39, 4, 16, 2, 15, 5, 24, 42, 3, 28, 19, 20, 47, 22, 12, 45, 8, 40, 20, 27, 43, 8, 2, 16, 46, 11, 34, 29, 41, 6, 20, 30, 20, 22, 31, 41, 29, 42, 17, 30, 19, 4]
 		}
 	},
  mounted () {
  	this.$nextTick(() => {
    	this.initParticleJS()
    })
  },
  methods: {
  	initParticleJS () {
      particlesJS('particleJS-container', {
          "particles": {
            "number": {
              "value": 380,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": "#fff"
            },
            "shape": {
              "type": "circle",
              "stroke": {
                "width": 0,
                "color": "#000000"
              },
              "polygon": {
                "nb_sides": 5
              }
            },
            "opacity": {
              "value": 0.5,
              "random": false,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 3,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": false,
              "distance": 150,
              "color": "#ff0000",
              "opacity": 0.4,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 6,
              "direction": "top",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
              },
              "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": false,
                "mode": "grab"
              },
              "onclick": {
                "enable": false,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 140,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
              },
              "repulse": {
                "distance": 200,
                "duration": 0.4
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true
        });
      }
    },
  firebase: {
 		 beers: beerRef,
     drinkers: drinkerRef
 	},
  computed: {
    topBeers: function() {

      const drinkArray = this.drinkers

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

        var name = "no one"

        for(var i in drinkArray) {

            if(k == drinkArray[i][".key"]) {
              name = drinkArray[i].name
            }
        }


        const o = {'uid':k, 'amount':result[k], 'name': name}
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
    namn: function() {
      const names = ["Aaran", "Aaren", "Aarez", "Aarman", "Aaron", "Aaron-James", "Aarron", "Aaryan", "Aaryn", "Aayan", "Aazaan", "Abaan", "Abbas", "Abdallah", "Abdalroof", "Abdihakim", "Abdirahman", "Abdisalam", "Abdul", "Abdul-Aziz", "Abdulbasir", "Abdulkadir", "Abdulkarem", "Abdulkhader", "Abdullah", "Abdul-Majeed", "Abdulmalik", "Abdul-Rehman", "Abdur", "Abdurraheem", "Abdur-Rahman", "Abdur-Rehmaan", "Abel", "Abhinav", "Abhisumant", "Abid", "Abir", "Abraham", "Abu", "Abubakar", "Ace", "Adain", "Adam", "Adam-James", "Addison", "Addisson", "Adegbola", "Adegbolahan", "Aden", "Adenn", "Adie", "Adil", "Aditya", "Adnan", "Adrian", "Adrien", "Aedan", "Aedin", "Aedyn", "Aeron", "Afonso", "Ahmad", "Ahmed", "Ahmed-Aziz", "Ahoua", "Ahtasham", "Aiadan", "Aidan", "Aiden", "Aiden-Jack", "Aiden-Vee", "Aidian", "Aidy", "Ailin", "Aiman", "Ainsley", "Ainslie", "Airen", "Airidas", "Airlie", "AJ", "Ajay", "A-Jay", "Ajayraj", "Akan", "Akram", "Al", "Ala", "Alan", "Alanas", "Alasdair", "Alastair", "Alber", "Albert", "Albie", "Aldred", "Alec", "Aled", "Aleem", "Aleksandar", "Aleksander", "Aleksandr", "Aleksandrs", "Alekzander", "Alessandro", "Alessio", "Alex", "Alexander", "Alexei", "Alexx", "Alexzander", "Alf", "Alfee", "Alfie", "Alfred", "Alfy", "Alhaji", "Al-Hassan", "Ali", "Aliekber", "Alieu", "Alihaider", "Alisdair", "Alishan", "Alistair", "Alistar", "Alister", "Aliyaan", "Allan", "Allan-Laiton", "Allen", "Allesandro", "Allister", "Ally", "Alphonse", "Altyiab", "Alum", "Alvern", "Alvin", "Alyas", "Amaan", "Aman", "Amani"];

      const ind = Math.floor((Math.random() * names.length) + 1);
      return names[ind]
    },
    names: function() {
      return this.drinker
    }
  }
}

export default beerViewer
