<template>
	<div ref="keyboardChart" class="echarts"/>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import echarts from 'echarts';
    import Animal from '@/components/TypeScript/typeScript-demo';


    @Component
    export default class Index extends Vue {
        keyboardChart: any;
        chart: any = null;
        animal: Animal = new Animal();

        constructor() {
            super();
            this.animal.getAnmailName();


        }

        mounted() {
            // this.animal = new Animal();
            this.animal.getAnmailName();
            this.initChart();
        }

        private initChart(): void {
            this.chart = echarts.init(this.$refs.keyboardChart);
            this.setOptions();
        }

        private setOptions(): void {
            const xAxisData = [];
            const data = [];
            const data2 = [];
            for (let i = 0; i < 50; i++) {
                xAxisData.push(i);
                data.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
                data2.push((Math.sin(i / 5) * (i / 5 + 10) + i / 6) * 3);
            }

            this.chart.setOption({
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                legend: {
                    data: ['销量']
                },
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.echarts {
		height: 100%;
		width: 100%;
	}
</style>
