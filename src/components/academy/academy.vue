<template>
	<div class="hello">
		<evueesrimap

				:mapUrl="mapUrl"></evueesrimap>
		<EmitService @changeNum="testEmit($event)"></EmitService>
		<div>{{num}}</div>
		<div v-if="num<6">
			<el-switch
					active-color="#13ce66"
					inactive-color="#ff4949">
			</el-switch>
		</div>

	</div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import evueesrimap from '@/components/e-vue-esrimap/e-vue-esrimap.vue';
    import EmitService from '@/components/emit-demo/emit-demo.vue';

    @Component({
        components: {
            evueesrimap,
            EmitService
        }
    })
    export default class Index extends Vue {
        @Prop() private msg!: string;
        testMsg: string = '测试组件传值,哈哈组件传值成功';
        isTrue: boolean;
        num: any = 0;
        mapUrl: any = ['img', 'cia'];

        testEmit(event) {
            console.log(event);
            this.num = event;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	h3 {
		margin: 40px 0 0;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42B983;
	}
</style>
