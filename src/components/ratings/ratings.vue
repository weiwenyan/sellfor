<template>
<div class="ratings"  id="ratings" ref="ratings">
  <div class="ratings-wrap">
      <div class="ragting-content">
        <div class="overview">
          <div class="view-left">
            <h1 class="score">{{seller.score}}</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家{{seller.rankRate}}%</div>
          </div>
          <div class="view-right">
            <div class="score-wrap">
              <span class="title">服务态度</span>
              <star :size="36" :score="seller.serviceScore"></star>
              <span class="score">{{seller.serviceScore}}</span>
            </div>
            <div class="score-wrap">
              <span class="title">商品评分</span>
              <star :size="36" :score="seller.foodScore"></star>
              <span class="score">{{seller.foodScore}}</span>   
            </div>
            <div class="delivery-wrap">
              <span class="title">送达时间</span>
              <span class="score">{{seller.deliveryTime}}分钟</span>   
            </div>        
          </div>      
        </div>
      </div>
      <split></split>
  <ratingselect :ratings="ratings" :desc="desc" v-on:select="select" v-on:toggleContent="toggleContent"></ratingselect>
      <div class="ratinglist-wrap">
        <ul>
          <li v-for="item in ratings" class="rating-item" v-show="needShow(item.rateType,item.text)">
            <div class="avatar"><img :src="item.avatar" width="28" height="28"></div>

            <div class="content">
              <h1 class="name">{{item.username}}</h1>
              <div class="star-wrap">
                <star :size="24" :score="item.score"></star>
                <span class="delivery" v-show="item.deliveryTime">{{item.deliveryTime}}分钟到达</span>
              </div>
              <div class="text">
                <p>{{item.text}}</p>
              </div>
              <div class="recom" v-show="item.recommend || item.recommend.length">
                <span class="icon-thumb_up"></span>
                <span v-for="text in item.recommend" class="text">{{text}}</span>
              </div>
              <div class="time">{{item.rateTime | formateDate}}</div>
            </div>
          </li>
        </ul>
      </div>  
  </div>
</div>
</template>

<script>
import Vue from 'vue';
import BScroll from 'better-scroll';
import Star from '../star/star';
import Split from '../split/split';
import Ratingselect from '../ratingselect/ratingselect';

var appData = require('../../../data.json');
var ratingsdata = appData.ratings;

const ALL = 2;

export default {
  data() {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '满意',
        negative: '不满意'
      }
    };
  },
  props: {
    seller: {
      type: Object
    }
  },
  created() {
        this.ratings = ratingsdata;
        this.$nextTick(() => {
          this.initDetailscroll();
        });
  },
  methods: {
    select(type) {
      this.selectType = type;
    },
    toggleContent(type) {
      this.onlyContent = type;
    },
    initDetailscroll() {
      let ratingScroll = new BScroll(document.getElementById('ratings'), {
        scrollY: true,
        probeType: 3,
        click: true
      });
      ratingScroll.on('scroll', (pos) => {});
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
    }
  },
  components: {
    'star': Star,
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
.ratings{
  position:absolute;
  top: 174px;
  left: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  background: #fff;
}
.ratings-wrap{
}
.ratings .overview{
  display: flex;
  padding: 18px 0;
}
.ratings .overview .view-left{
  flex: 0 0 137px;
  width: 137px;
  text-align: center;
  border-right: 1px solid rgba(7,17,27,0.1);
  padding: 6px 0;
}
.ratings .overview .view-left .score{
  font-size: 24px;
  line-height: 28px;
  color: rgb(255,153,0);
  margin-bottom: 6px;
}
.ratings .overview .view-left .title{
  font-size: 12px;
  line-height: 12px;
  color: rgb(7,17,27);
  margin-bottom: 8px;
}
.ratings .overview .view-left .rank{
  font-size: 10px;
  line-height: 10px;
  color: rgb(147,153,159);
}

.ratings .overview .view-right{
  flex: 1;
  padding-left: 24px;
  margin-top: 6px
}

.ratings .overview .view-right .score-wrap{
  margin-bottom: 8px;
  font-size: 0;
}
.ratings .overview .view-right .score-wrap div{
  display: inline-block; 
  margin: 0 6px;
}
.ratings .overview .view-right .title{
  display: inline-block;
  vertical-align: top;
  font-size: 12px;
  color: rgb(7,17,27); 
  line-height: 16px; 
}
.ratings .overview .view-right .score{
  display: inline-block;
  vertical-align: top; 
  margin: 0 12px;
  font-size: 12px;
  color: rgb(255,153,0);
  line-height: 18px;    
}
@media only screen and (max-width: 320px) {
  .ratings .overview .view-left{
    flex: 0 0 120px;
    width: 120px;
  }
  .ratings .overview .view-right{
    padding-left: 10px;
  } 
  .ratings .overview .view-right .score{
    margin: 0 2px;
  }
  .ratings .overview .view-right .score-wrap div{
    margin: 0 4px;
  }
}

.ratings .ratinglist-wrap{
  padding: 0 18px;  
}
.ratings .ratinglist-wrap .rating-item{
  display: flex;
  padding: 18px 0;
  position: relative;
}
.ratings .ratinglist-wrap .rating-item:after{
  content:"";
  border-bottom: 1px solid rgba(7,17,27,0.1);
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.ratings .ratinglist-wrap .rating-item .avatar{
  flex: 0 0 28px;
  padding: 0 0 18px 0;
  width: 28px;
  margin-right: 12px;
}
.ratings .ratinglist-wrap .rating-item .avatar img{
  border-radius: 50%;
  width: 28px;
  height: 28px;
}
.ratings .ratinglist-wrap .rating-item .content{
  position: relative;
  flex: 1;
}
.ratings .ratinglist-wrap .rating-item .content .name{
  margin-bottom: 4px;
  line-height: 12px;
  font-size: 10px;
  color: rgb(7,17,27);
}
.ratings .ratinglist-wrap .rating-item .content .star-wrap{
  margin-bottom: 6px;
  font-size: 0px;
}
.ratings .ratinglist-wrap .rating-item .content .star-wrap div{
  margin-right: 6px;
  vertical-align: top;
  display: inline-block;
}

.ratings .ratinglist-wrap .rating-item .content .star-wrap .delivery{
  margin-right: 6px;
  vertical-align: top;  
  display: inline-block;
  line-height: 10px;
  font-size: 10px;
  color: rgb(147,153,159); 
}
.ratings .ratinglist-wrap .rating-item .content .text{
  margin-bottom: 8px;
  font-size: 12px;
  line-height: 18px;
  color: rgb(7,17,27); 
}
.ratings .ratinglist-wrap .rating-item .content .recom{
  line-height: 16px;
  font-size: 0;
}
.ratings .ratinglist-wrap .rating-item .content .recom .text{
  display: inline-block;
  margin: 0 4px 4px 0;
  font-size: 12px;
  padding: 0 6px;
  border: 1px solid rgba(7,17,27,0.1);
}
.ratings .ratinglist-wrap .rating-item .content .recom .icon-thumb_up{
  color: rgb(0,160,220); 
  background: #fff;
  font-size: 12px;
  margin-right: 4px;
}
.ratings .ratinglist-wrap .rating-item .content .time{
  position: absolute;
  right: 0px;
  top: 0px;
  font-size: 10px;
  line-height: 10px;


}
</style>

