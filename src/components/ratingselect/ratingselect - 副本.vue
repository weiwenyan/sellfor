<template>
<div class="ratingselect">
	<div class="rating-type">
      <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">47</span></span>
      <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">10</span></span>
      <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">2</span></span>
	</div>
	<div class="swich">
		<span class="icon-check_circle" :class="{'on':onlyContent}"></span>
		<span class="text">只看有内容的评价</span>
	</div>	
</div>
</template>

<script>
// const POSITIVE = 0;
// const NEGATIVE = 1;
 const ALL = 2;
export default {
  props: {
    ragings: {
      type: Object
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: true
    },
    desc: {
      type: Object
    }
  },
  methods: {
  	select(type,event) {
  		return false;
  	}
  }
};
</script>

<style scoped>
.ratingselect { 
}
.ratingselect .rating-type{
	padding: 18px 0;
	margin: 0 18px;
	font-size: 0;
}
.ratingselect .rating-type:after{
	content:"";
  border-bottom: 1px solid rgba(7,17,27,0.1);
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
}
.ratingselect .block{
	display: inline-block;
	padding: 8px 12px;
	margin-right: 8px;
	border-radius: 1px;
	color: rgb(77,85,93);
	font-size: 12px;
	line-height: 16px;
}
.ratingselect .positive{
	background: rgba(0,160,220,0.2);
}
.ratingselect .active{
	background: rgb(0,160,220);
	color: #fff;
}
.ratingselect .negative{
	background: rgba(77,85,93, 0.2);
}
.ratingselect .block .count{
	font-size: 8px;
	margin-left: 2px;
}
.ratingselect .swich{
	padding: 12px 18px;
	line-height: 24px;
	font-size: 12px;
  border-bottom: 1px solid rgba(7,17,27,0.1);
  font-size: 0;
}
.ratingselect .swich .icon-check_circle{
	display: inline-block;
	font-size: 24px;
	margin-right: 4px;
  color: rgb(147,153,159);	
}
.ratingselect .swich .text{
	vertical-align: top;
	display: inline-block;
	font-size: 12px;
  color: rgb(147,153,159);
}
.ratingselect .swich .on{
	color: #00c850;
}
</style>

