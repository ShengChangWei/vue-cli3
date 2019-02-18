<template>
	<div>
		{{msg}}
	</div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class ChildrenDemo extends Vue {
        @Prop() msg!: any;
    }
</script>

<style scoped lang="ts">

</style>