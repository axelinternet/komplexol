import Vue from 'vue'

const bubble = {
    template: '<div class="foamBit" :style="foamDisplace"></div>',
    props: ["index"],
    computed: {
        foamDisplace: function() {
            var le = this.index*10
            return {
                marginTop: Math.round((Math.random()* 20) - 20) + "px",
                left: le -20 + "px",
                animationDelay: Math.random() + "s"
            }
        }
    }
}
export default bubble
