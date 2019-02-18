<template>
	<div>
		<button class="btn btn-primary" @click="changeNum">点击</button>
	</div>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

    @Component
    export default class EmitService {
        num: number = 0;

        @Emit('changeNum') changeN(val?: any) {}

        changeNum() {
            this.num++;
            this.changeN(this.num);
        }
    }
</script>

<style lang="ts" scoped>

</style>f