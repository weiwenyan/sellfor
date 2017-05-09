<template>
<transition name="move">
  <div class="food-detail" v-show="showFlag" id="food-detail" ref="food-detail">
    <div class="foodcontent">
      <div class="header-img">
      <img :src="food.image">
      <div class="back" @click="back"><i class="icon-arrow_lift"></i></div>
      </div>
      <div class="content">
        <h1 class="name">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="sell-rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">￥{{food.price}}</span>
          <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>        
        </div>
        <div class="cartcontrol-wrap">
           <cartcontrol :food="food"></cartcontrol>
        </div>
        <transition name="buy">
          <div class="buy" v-show="!food.count || food.count===0" @click.stop.prevent="addFrist">加入购物车</div> 
        </transition>       
      </div>
      <split v-show="food.info"></split>
      <div class="info" v-show="food.info">
        <h1 class="title">商品信息</h1>
        <p class="text">{{food.info}}</p>
      </div>
      <split></split>
      <div class="rating">
        <h1 class="title">商品评价</h1>
        <ratingselect :ratings="ratings" :desc="desc" v-on:select="select" v-on:toggleContent="toggleContent"></ratingselect>
        <div class="rating-warp">
          <ul>
            <li v-for="item in food.ratings" class="rating-item" v-show="needShow(item.rateType,item.text)">
              <div class="user">             
                <span class="name">{{item.username}}</span>
                <span class="avatar"><img :src="item.avatar"></span>               
              </div>
              <div class="time">{{item.rateTime | formateDate}}</div>
              <p class="text">
              <span :class="{'icon-thumb_up':item.rateType===0,'icon-thumb_down':item.rateType===1}"></span>{{item.text}}</p>
            </li>
          </ul>
          <div class="no-rating" v-show="!ratings & !ratings.length">暂无评价</div>
        </div>
      </div>
      </div>
    </div>
  </div>
  </div>
</transition>
</template>

<script>

import Vue from 'vue';
import BScroll from 'better-scroll';
import Cartcontrol from '../carcontrol/carcontrol';
import Split from '../split/split';
import Ratingselect from '../ratingselect/ratingselect';

// const POSITIVE = 0;
// const NEGATIVE = 1;
const ALL = 2;

export default {
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: false,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      },
      ratings: [],
      noneShow: false
    };
  },
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    show() {
      this.showFlag = true;
      this.selectType = ALL;
      this.onlyContent = false;
      this.$nextTick(() => {
        this._initDetailscroll();
        this.ratings = this.food.ratings;
      });
    },
    back() {
      this.showFlag = false;
    },
    _initDetailscroll() {
      if (!this.detailScroll) {
        this.detailScroll = new BScroll(document.getElementById('food-detail'), {
          scrollY: true,
          probeType: 3,
          click: true
        });
      } else {
        this.detailScroll.refresh();
      }
    },
    addFrist(event) {
      if (!event._constructed) {
        return false;
      }
      Vue.set(this.food, 'count', 1);
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    },
    select(type) {
      this.selectType = type;
    },
    toggleContent(type) {
      this.onlyContent = type;
    }
  },
  components: {
    'cartcontrol': Cartcontrol,
    'split': Split,
    'ratingselect': Ratingselect
  }
};
Vue.filter('formateDate', function (value) {
    function changeTime(m) {
        return m < 10 ? '0' + m : m;
    }
    var time = new Date(parseInt(value));
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var M = time.getMinutes();
    // var s = time.getSeconds();
    return y + '.' + changeTime(m) + '.' + changeTime(d) + ' ' + changeTime(h) + ':' + changeTime(M);
});
</script>

<style scoped>
.food-detail{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  z-index: 25;
  width: 100%;
  background: #fff;
  transition: all 0.2s linear;
}
.move-enter{
  opacity: 0;
  transform: translateX(0);
}
.move-enter-active{
  opacity: 0;
  transform: translateX(100%);
}
.move-leave{
  opacity: 0;
  transform: rotate(0);
}
.move-leave-active {
  opacity: 0;
  transform: translateX(100%);
}
.food-detail .header-img{
  position:relative;
  width: 100%;
  height: 0;
  padding-top:100%;
}
.food-detail .header-img img{
  position:absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.food-detail .back{
  position: absolute;
  top: 10px;
  left: 0;
}

.food-detail .back .icon-arrow_lift{
  display: block;
  padding: 10px;
  font-size: 20px;
  color: #fff;
}
.food-detail .foodcontent .content{
  padding: 18px;
  position: relative;
}
.food-detail .foodcontent .content .name{
  padding: 8px 0;
  line-height: 14px;
  font-size: 14px;
  font-weight: 700;
  color: rgb(7,17,27);
}
.food-detail .foodcontent .content .detail{
  margin-bottom: 8px;
  line-height: 10px;
  font-size: 0;
}

.food-detail .foodcontent .content .detail .sell-count{
  font-size: 10px;
  color: rgb(147,153,159);
  margin-right: 12px;
}
.food-detail .foodcontent .content .detail .sell-rating{
  font-size: 10px;
  color: rgb(147,153,159);
}
.food-detail .foodcontent .content .price .now{
  margin-right: 8px;
  font-size: 14px;
  color: rgb(240,20,20);

}
.food-detail .foodcontent .content .price .old{
  text-decoration: line-through;
  font-size: 10px;
  color: rgb(147,153,159); 
}
.food-detail .foodcontent .content .cartcontrol-wrap{
  position: absolute;
  right: 12px;
  bottom: 12px;
}
.food-detail .foodcontent .content .buy{
  position: absolute;
  right: 18px;
  bottom: 18px;
  z-index: 10;
  height: 24px;
  line-height: 24px;
  padding: 0 12px;
  box-sizing: border-box;
  border-radius: 12px;
  font-size: 10px;
  color: #fff;
  background: rgb(0,160,220);
  transition: all 0.2s;
}
.buy-enter{
  opacity: 1;
}
.buy-enter-active{
  opacity: 1;
}
.buy-leave{
  opacity: 0;
}
.buy-leave-active {
  opacity: 1;
}
.food-detail .foodcontent .info{
  padding: 18px;
}
.food-detail .foodcontent .info .title{
  line-height: 14px;
  margin-bottom: 6px;
  font-size: 14px;
  color: rgb(7,17,27);
}
.food-detail .foodcontent .info .text{
  line-height: 24px;
  padding: 0 8px;
  font-size: 12px;
  color: rgb(77,85,93);
}
.food-detail .foodcontent .rating{
  padding-top: 18px;
}
.food-detail .foodcontent .rating .title{
  line-height: 14px;
  margin-left: 18px;
  font-size: 14px;
  color: rgb(7,17,27);
}
.food-detail .foodcontent .rating .rating-warp{
  padding: 0 9px;
}
.food-detail .foodcontent .rating .rating-warp .rating-item{
  position: relative;
  padding: 8px 0;
}
.food-detail .foodcontent .rating .rating-warp .rating-item:after{
  content:"";
  border-bottom: 1px solid rgba(7,17,27,0.1);
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
}
.food-detail .foodcontent .rating .rating-warp .rating-item .user{
  position: absolute;
  right: 0px;
  bottom: 16px;
  font-size: 0;
  line-height: 12px;
}
.food-detail .foodcontent .rating .rating-warp .rating-item .user .name{
  display: inline-block;
  vertical-align: top;
  font-size: 10px;
  color: rgb(147,153,159);
  margin-right: 6px;
}
.food-detail .foodcontent .rating .rating-warp .rating-item .user .avatar{
  display: inline-block;
  vertical-align: top;
}
.food-detail .foodcontent .rating .rating-warp .rating-item .user .avatar img{
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.food-detail .foodcontent .rating .rating-warp .rating-item .time{
  margin-bottom: 6px;
  line-height: 12px;
  font-size: 10px;
  color: rgb(147,153,159);  
}
.food-detail .foodcontent .rating .rating-warp .rating-item .text{
  line-height: 16px;
  font-size: 10px;
  color: rgb(7,17,27);  
}
.food-detail .foodcontent .rating .rating-warp .rating-item .text .icon-thumb_up{
  line-height: 16px;
  font-size: 12px;
  margin-right: 4px;
  color: rgb(0,160,220);  
}
.food-detail .foodcontent .rating .rating-warp .rating-item .text .icon-thumb_down{
  line-height: 16px;
  font-size: 12px;
  margin-right: 4px;
  color: rgb(147,153,159); 
}
.no-rating{
  padding: 16px 0;
  font-size: 12px;
  color: rgb(147,153,159); 
}

</style>

