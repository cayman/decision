<template>
    <td nowrap>
        <svg  version="1.1"
              width="40" height="100"
              viewBox="0 0 40 100"
              baseProfile="full"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns:ev="http://www.w3.org/2001/xml-events">
            <g>

                <line x1="0" v-for="(item,index) in 10" :y1="index*10" x2="30" :y2="index*10" style="stroke:rgba(173, 170, 170, 0.3);stroke-width:1" />

                <!--rgba(124, 194, 125, 1);rgba(81, 207, 83, 1); rgba(31, 38, 140, 0.9) -->
                <rect x="3" :y="0" width="1" :height="top/point" fill="rgba(81, 207, 83, 0.6)"  stroke="rgba(81, 207, 83, 0.9)" stroke-width="1"/>
                <rect x="3" :y="top/point" width="1" :height="-bottom/point" fill="rgba(244,47,39, 0.6)"  stroke="rgba(244,47,39, 0.9)" stroke-width="1"/>

                <text v-if="top>0" x="6" y="6" fill="rgba(81, 207, 83, 0.7)" font-family="'Verdana'" font-size="9" stroke="rgba(81, 207, 83, 0.9)" stroke-width="0.5">{{ top }}</text>
                <text x="6" :y="top/point + (top>-bottom?-3:8)" fill="rgba(111, 115, 168, 0.7)" font-family="'Verdana', cursive" font-size="9" stroke="rgba(111, 115, 168, 0.9)" stroke-width="0.5">0</text>
                <text v-if="bottom<0" x="6" y="100" fill="rgba(244,47,39, 0.7)" font-family="'Verdana', cursive" font-size="9" stroke="rgba(244,47,39, 0.9)" stroke-width="0.5">{{ bottom }}</text>

                <rect x="0" :y="100+bottom/point - (top>0?1:0) " width="40" height="1" fill="rgba(40, 47, 143, 0.6)"  stroke="rgba(40, 47, 143, 0.9)" stroke-width="0"/>
            </g>
        </svg>
    </td>
</template>

<script>
export default {
    name:'indicator-svg',
    props: ['top', 'max', 'min', 'bottom', 'point'],
    data(){
        return {
            height: this.top - this.bottom,
        }
    },
    computed: {

    }
}
</script>
