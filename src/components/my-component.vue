import Vue from 'vue'
// Just a small sample component I can use as a reference.
const myComponent = Vue.component('my-component', {
 	data: () => {
 		return {counter: 0}
 	},
 	template: '<h1> {{ counter }} </h1>'
})

export { myComponent }