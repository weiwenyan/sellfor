<template>
<div class="seller" id="seller" ref="seller">
  <div class="seller-content">
    <div class="overview">
      <div class="title">{{seller.name}}</div>
      <div class="desc">
        <star :size="36" :score="seller.score"></star>
        <span class="text">({{seller.ratingCount}})</span>
        <span class="text">月售{{seller.sellCount}}单</span>        
      </div>
      <ul class="remark">
        <li class="block">
          <h2>起送价</h2>
          <div class="content">
            <span class="stress">{{seller.minPrice}}</span>元     
          </div>
        </li>
        <li class="block">
          <h2>商家配送</h2>
          <div class="content">
            <span class="stress">{{seller.deliveryPrice}}</span>元       
          </div>
        </li>
        <li class="block">
          <h2>平均配送时间</h2>
          <div class="content">
            <span class="stress">{{seller.deliveryTime}}</span>元      
          </div>
        </li>        

      </ul>
    </div>
    <split></split>
    <div class="bulletin">
      <h1>公告与活动</h1>
      <div class="content-wrap">
        <p class="content">{{seller.bulletin}}</p>
      </div>
    </div>
    <ul v-if="seller.supports" class="supports">
      <li class="support-item" v-for="(item, index) in supportinfo">
        <span class="icon" :class="classMap[supportinfo[index].type]"></span>
        <span class="text">{{supportinfo[index].description}}</span>
      </li>
    </ul>
    <split></split>
    <div class="pics">
      <h1>商家实景</h1>
      <div class="pic-wrap" id="ic-wrap" ref="ic-wrap">
      <ul class="pic-list" ref="piclist">
        <li class="pic-item" v-for="pic in seller.pics">
          <img :src="pic" width="120" height="80">
        </li>
      </ul> 
      </div>
    </div>
    <split></split>
    <div class="info">
      <h1>商家信息</h1>
      <div class="content">
        <ul>
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>    
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll';
import Star from '../star/star';
import Split from '../split/split';

var appData = require('../../../data.json');
var sellerdata = appData.seller;

export default {
  data() {
    return {
      seller: [],
      classMap: {},
      supportinfo: []
    };
  },
  created() {
    this.seller = sellerdata;
  },
  watch: {
    seller(curVal, oldVal) {
      this.initDetailscroll();
      this.classList(this.$refs);
      this.picScroll();
    }
  },
  ready() {},
  methods: {
    classList() {
      this.supportinfo = this.seller.supports;
      this.classMap = [ 'decrease', 'discount', 'special', 'invoice', 'guarantee' ];
    },
    initDetailscroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(document.getElementById('seller'), {
          scrollY: true,
          probeType: 3,
          click: true
        });
      } else {
        this.scroll.refresh();
      }
    },
    picScroll() {
      if (this.seller.pics) {
        let picWidth = 120;
        let marginRight = 6;
        let Width = (picWidth + marginRight) * this.seller.pics.length - marginRight;
        this.$refs.piclist.style.width = Width + 'px';
        this.$nextTick(() => {
            if (!this.picsroll) {
              this.picsroll = new BScroll(document.getElementById('ic-wrap'), {
                scrollX: true,
                probeType: 3,
                click: true
              });
            } else {
              this.picsroll.refresh();
            }
        });
      }
    }
  },
  components: {
    'star': Star,
    'split': Split
  }
};
</script>

<style scoped>
.seller{
  position:absolute;
  top: 174px;
  left: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  background: #fff; 
}
.seller .seller-content{}
.seller .overview{
  padding: 18px 18px 0 18px; 
}
.seller .overview .title{
  margin-bottom: 8px;
  line-height: 14px;
  color: rgb(7,17,27);
  font-size: 14px;
}
.seller .overview .desc{
  padding-bottom: 16px;
  color: rgb(7,17,27);
  font-size: 0;
  position: relative;

}
.seller .overview .desc:after{
  content:"";
  border-bottom: 1px solid rgba(7,17,27,0.1);
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
}
.seller .overview .desc div{
  display: inline-block;
  vertical-align: top;
  margin-right: 8px; 
}
.seller .overview .desc .text{
  display: inline-block;
  vertical-align: top;
  margin-right: 8px; 
  font-size: 10px;
  color: rgb(74,85,93);
  line-height: 18px;
}
.seller .overview .remark{
  display: flex;
  padding: 18px 0;
}
.seller .overview .remark .block{
  flex: 1;
  text-align: center;
  border-right: 1px solid rgba(7,17,27,0.1);
}
.seller .overview .remark .block:last-child{
  border-right: none;
}
.seller .overview .remark .block h2{
  margin-bottom: 4px;
  line-height: 10px;
  font-size: 10px;
  color: rgb(147,153,159);
}
.seller .overview .remark .block .content{
  line-height: 24px;
  font-size: 10px;
  color: rgb(7,17,27);
}
.seller .overview .remark .block .stress{
  font-size: 24px;
}

.seller .bulletin{
  padding: 18px 18px 0 18px; 
}
.seller .bulletin h1{
  margin-bottom: 8px;
  line-height: 14px;
  color: rgb(7,17,27);
  font-size: 14px;
}
.seller .bulletin .content-wrap{
   padding: 0 12px 16px 12px;  
}
.seller .bulletin .content-wrap:after{}
.seller .bulletin .content-wrap .content{
  line-height: 24px;
  font-size: 12px;
  color: rgb(240,20,20);  
}
 
.seller .supports {
 width: 84%;
 margin: 0 auto;
 padding-bottom: 5px;
}
.seller .supports:last-child{
  margin-bottom: 0;
}

.seller .supports .support-item {
  padding: 8px 12px;
  font-size: 0;
  position: relative;
}
.seller .supports .support-item:after{
  content:"";
  border-top: 1px solid rgba(7,17,27,0.1);
  width: 100%;
  position: absolute;
  left: 0;
  top: 0; 
}
.seller .supports .support-item .icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  vertical-align: top;
  margin-right: 6px;
  background-size: 16px 16px;
  background-repeat: no-repeat;
}
.seller .supports .support-item .text {
  line-height: 16px;
  font-size: 12px;
}

.seller .supports .decrease {
  background: url(./img/decrease_1@2x.png);background-size: 12px 12px;
}
.seller .supports .discount {
  background: url(./img/discount_1@2x.png);background-size: 12px 12px;
}
.seller .supports .guarantee {
  background: url(./img/guarantee_1@2x.png);background-size: 12px 12px;
}
.seller .supports .invoice {
  background: url(./img/invoice_1@2x.png);background-size: 12px 12px;
}
.seller .supports .special {
  background: url(./img/special_1@2x.png);background-size: 12px 12px;
}

@media only screen and (-webkit-min-device-pixel-ratio: 3),only screen and (min-device-pixel-ratio: 3)
{
  .top .wrap-content .content .support .decrease {
    background: url(./img/decrease_1@3x.png);background-size: 12px 12px;
  }
  .top .wrap-content .content .support .discount {
    background: url(./img/discount_1@3x.png);background-size: 12px 12px;
  }
  .top .wrap-content .content .support .guarantee {
    background: url(./img/guarantee_1@3x.png);background-size: 12px 12px;
  }
  .top .wrap-content .content .support .invoice {
    background: url(./img/invoice_1@3x.png);background-size: 12px 12px;
  }
  .top .wrap-content .content .support .special {
    background: url(./img/special_1@3x.png);background-size: 12px 12px;
  }
}  

.seller .pics{
  padding: 18px;
}
.seller .pics h1{
  margin-bottom: 12px;
  line-height: 14px;
  color: rgb(7,17,27);
  font-size: 14px;
}
.seller .pics .pic-wrap{
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  font-size: 0;
}
.seller .pics .pic-wrap .pic-item{
  display: inline-block;
  margin-right: 6px;
  width: 120px;
  height: 80px;
}
.seller .pics .pic-wrap .pic-item:last-child{
  margin-right: 0;
}

.seller .pics .pic-wrap .pic-item img{
  width: 120px;
  height: 80px;
}

.seller .info{
  padding: 18px;
}
.seller .info h1{
  margin-bottom: 12px;
  line-height: 14px;
  color: rgb(7,17,27);
  font-size: 14px;
}

.seller .info .info-item{
  padding: 8px 12px;
  font-size: 12px;
  position: relative;
}
.seller .info .info-item:after{
  content:"";
  border-top: 1px solid rgba(7,17,27,0.1);
  width: 100%;
  position: absolute;
  left: 0;
  top: 0; 
}


</style>

