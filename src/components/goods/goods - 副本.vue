<template>
	<div class="goods">
		<div class="menu-wrap"></div>
		<div class="goods-wrap"></div>
	</div>
</template>

<script>

export default {
	props: {
		seller: {
			type: Object
		}
	}
};

</script>

<style scoped>
.goods { 
	position: absolute; 
	width: 100%; 
	top: 174px; 
	bottom: 64px; 
	display: flex;
	overflow: hidden;

}
.goods .menu-wrap { 
	flex: 0 0 80px;
	width: 80px;
	background: #f3f5f7;
}
.goods .goods-wrap {
	flex: 1;
}


</style>
