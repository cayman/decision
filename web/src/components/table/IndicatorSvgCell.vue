<template>
    <td nowrap>
        <svg  version="1.1"
              width="30" height="100"
              viewBox="0 0 30 100"
              baseProfile="full"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns:ev="http://www.w3.org/2001/xml-events">
            <g v-if="value!==undefined">
                <rect x="0" :y="100+bottom-1" width="30" height="1" fill="black"  stroke="black" stroke-width="0"/>
                <!--rgba(124, 194, 125, 1);rgba(81, 207, 83, 1);-->
                <rect v-if="value>=0" x="8" :y="100 + bottom - height" width="15" :height="height" fill="rgba(81, 207, 83, 0.6)"  stroke="rgba(81, 207, 83, 0.9)" stroke-width="1"/>
                <rect v-else x="8" :y="100 + bottom" width="15" :height="height" fill="rgba(244,47,39, 0.6)"  stroke="rgba(244,47,39, 0.9)" stroke-width="1"/>
            </g>
        </svg>
    </td>
</template>

<script>
export default {
    name:'indicator-svg-cell',
    props: ['value', 'top', 'bottom', 'point'],
    data(){
        return {
            height: this.value ? Math.floor(Math.abs(this.value)/this.point) : 0,
        }
    },
    computed: {

    }
}
</script>
