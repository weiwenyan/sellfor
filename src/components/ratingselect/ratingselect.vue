<template>
<div class="ratingselect">
  <div class="rating-type">
      <span v-on:click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{allLength}}</span></span>
      <span v-on:click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span v-on:click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
  </div>
  <div class="swich" v-on:click="toggleContent">
    <span class="icon-check_circle" :class="{'on':onlyContent}"></span>
    <span class="text">只看有内容的评价</span>
  </div>  
</div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
  data() {
    return {
      selectType: ALL,
      onlyContent: false
    };
  },
  props: {
    ratings: {
      type: Array
    },
    desc: {
      type: Object
    }
  },
  computed: {
    allLength() {
      return this.ratings.length;
    },
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE;
      });
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE;
      });
    }
  },
  methods: {
    select(typeNumber, event) {
      if (!event._constructed) {
        return false;
      }
      this.selectType = typeNumber;
      this.$emit('select', typeNumber);
    },
    toggleContent(event) {
      if (!event._constructed) {
        return false;
      }
      this.onlyContent = !this.onlyContent;
      this.$emit('toggleContent', this.onlyContent);
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
.ratingselect .negative{
  background: rgba(77,85,93, 0.2);
}
.ratingselect .active{
  background: rgb(0,160,220);
  color: #fff;
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

