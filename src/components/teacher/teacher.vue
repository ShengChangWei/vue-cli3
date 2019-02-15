<template>
	<div id="map" :style="{color:textColor}">

	</div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    // import { mapState } from 'vuex';
    // import loadEsriModules from '@/components/map/mapLoader';

    @Component
    export default class Index extends Vue {
        // textColor: any = this.$store.state.primary;
        // map: any;
        window: any;

        get textColor() {
            return this.$store.state.primary;
        }

        mounted() {
            window['require'](["esri/map", "dojo/domReady!"], (Map: any) => {
                new Map("map", {
                    basemap: "topo",
                    center: [-122.45, 37.75],
                    zoom: 13
                });
            });
        }


    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	#map {
		height: 100%;
	}
</style>
