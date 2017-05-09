<template>
  <div class="top">
    <div class="wrap-content">
        <div v-if="seller.supports" class="suportcount" v-on:click="showDetail">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>    
        <div class="avatar">
          <img  width="64" height="64" :src="seller.avatar">
        </div>
        <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="description">
            {{seller.description}}/{{seller.deliveryTime}}分钟送达
          </div>
          <div v-if="seller.supports" class="support">
            <span class="icon" :class="classMap[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
    </div>
    <div class="wrap-bulletin" v-on:click="showDetail">
      <span class="title"></span><span class="text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>   
    </div>
    <div class="background"><img :src="seller.avatar" width="100%" height="100%"></div>
<transition name="fade">
    <div v-show="detailShow" class="detail">
      <div class="detail-wrap clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrap">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="(item, index) in seller.supports">
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon-close" v-on:click="hideDetail"></i>
      </div>
      
    </div>
</transition>    
  </div>
</template>

<script>
import Star from '../star/star';

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false
    };
  },
  methods: {
    showDetail () {
      this.detailShow = true;
    },
    hideDetail () {
      this.detailShow = false;
    }
  },
  created() {
    this.classMap = [ 'decrease', 'discount', 'special', 'invoice', 'guarantee' ];
  },
  components: {
    'star': Star
  }
};

</script>

<style scoped>
.top { color:#fff; position: relative; background: rgba(7,17,27,0.5); overflow:hidden; width: 100%;}
.top .wrap-content { padding: 24px 12px 18px 24px;font-size: 0; position: relative; }
.top .wrap-content .avatar { display: inline-block; vertical-align: top; }
.top .wrap-content .avatar img { border-radius: 2px; }
.top .wrap-content .content { display: inline-block;font-size: 14px; margin-left: 16px; }
.top .wrap-content .content .title { margin: 2px 0 8px 0;}
.top .wrap-content .content .title .brand { 
  display: inline-block; 
  vertical-align: top;
  width: 30px; 
  height: 18px; 
  background: url(img/brand@2x.png); 
  background-size: 30px 18px; 
  background-repeat: no-repeat;
} 
.top .wrap-content .content .title .name { 
  margin-left: 6px; 
  font-size: 16px; 
  font-weight: bold;
   line-height: 18px;
 } 
.top .wrap-content .content .description { 
  margin-bottom: 10px; 
  font-size: 12px; 
  line-height: 12px;
 } 
.top .wrap-content .content .support { 
} 
.top .wrap-content .content .support .icon {
  display: inline-block;
  vertical-align: top;
  width: 12px;
  height: 12px;
  margin-right: 4px;
  background-size: 12px 12px;
  background-repeat: no-repeat;
}
.top .wrap-content .content .support .decrease {
  background: url(img/decrease_1@2x.png);background-size: 12px 12px;
}
.top .wrap-content .content .support .discount {
  background: url(img/discount_1@2x.png);background-size: 12px 12px;
}
.top .wrap-content .content .support .guarantee {
  background: url(img/guarantee_1@2x.png);background-size: 12px 12px;
}
.top .wrap-content .content .support .invoice {
  background: url(img/invoice_1@2x.png);background-size: 12px 12px;
}
.top .wrap-content .content .support .special {
  background: url(img/special_1@2x.png);background-size: 12px 12px;
}
.top .wrap-content .content .support .text {
  line-height: 12px;
  font-size: 10px;
}
.top .wrap-content .suportcount {
  position: absolute;
  right: 12px;
  bottom: 18px;
  padding: 0 8px;
  height: 24px;
  line-height: 24px;
  border-radius: 14px;
  background: rgba(0,0,0,0.2);
  text-align: center; 
}
.top .wrap-content .suportcount .count {
  vertical-align: top;
  font-size: 10px;
}
.top .wrap-content .suportcount .icon-keyboard_arrow_right {
  margin-left: 2px;
  line-height: 24px;
  font-size: 10px;
}
.top .wrap-bulletin {
  height: 28px;
  line-height: 28px;
  padding: 0 22px 0 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  background: rgba(7,17,27,0.2);
}
.top .wrap-bulletin .title {
  display: inline-block;
  vertical-align: top;
  width: 22px;
  height: 12px;
  background: url(img/bulletin@2x.png);
  background-size: 22px 12px;
  background-repeat:no-repeat;
  margin-top: 7px; 
}
.top .wrap-bulletin .text {
  vertical-align: top;
  margin: 0 4px;
  font-size: 10px;
}
.top .wrap-bulletin .icon-keyboard_arrow_right {
  position: absolute;
  right: 12px; 
  top: 8px;
  font-size: 10px;
}
.top .background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: blur(10px);
}
.top .detail {
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100%;
  overflow: auto;
  top: 0;
  left: 0;
  transition: all 0.5s;
  background: rgba(7,17,27,0.8);
  backdrop-filter:(10px);
}
.fade-enter {
  opacity: 0;
  background: rgba(7,17,27,0);
}
.fade-enter-active {
  opacity: 1;
  background: rgba(7,17,27,0.8);
}
.fade-leave {
  opacity: 1;
  background: rgba(7,17,27,0.8);

}
.fade-leave-active {
  opacity: 0;
  background: rgba(7,17,27,0);
}


.top .detail .detail-wrap {
  min-height: 100%;
  width: 100%;
}
.top .detail .detail-wrap .detail-main {
  margin-top: 64px;
  padding-bottom: 64px;
}
.top .detail .detail-wrap .detail-main h1 {
  line-height: 16px;
  font-size: 16px;
  text-align: center;
  font-weight: 700;
}
.top .detail .detail-wrap .detail-main .star-wrap {
  margin-top: 18px;
  padding: 2px 0;
  text-align: center;
}
.top .detail .detail-wrap .detail-main .title {
  display: flex;
  width: 80%;
  margin: 28px auto 24px auto;
}
.top .detail .detail-wrap .detail-main .title .line {
  flex: 1;
  position: relative;
  top: -6px;
  border-bottom: 1px solid rgba(255,255,255,0.2);
}
.top .detail .detail-wrap .detail-main .title .text {
  padding: 0 12px;
  font-size: 14px;
  font-weight: 700;
}
.top .detail .detail-wrap .detail-main .supports {
 width: 80%;
 margin: 0 auto;
}
.top .detail .detail-wrap .detail-main .supports:last-child{
  margin-bottom: 0;
}

.top .detail .detail-wrap .detail-main .supports .support-item {
  padding: 0 12px;
  margin-bottom: 12px;
  font-size: 0;
}
.top .detail .detail-wrap .detail-main .supports .support-item .icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  vertical-align: top;
  margin-right: 6px;
  background-size: 16px 16px;
  background-repeat: no-repeat;
}
.top .detail .detail-wrap .detail-main .supports .support-item .text {
  line-height: 16px;
  font-size: 12px;
}

.top .detail .detail-wrap .detail-main .bulletin {
  width: 80%;
  margin: 0 auto;
}
.top .detail .detail-wrap .detail-main .bulletin .content {
  padding: 0 12px;
  line-height: 24px;
  font-size: 12px;
}

.top .detail .detail-wrap .detail-main .supports .support-item .decrease {
  background: url(img/decrease_2@2x.png);background-size: 16px 16px;
}
.top .detail .detail-wrap .detail-main .supports .support-item .discount {
  background: url(img/discount_2@2x.png);background-size: 16px 16px;
}
.top .detail .detail-wrap .detail-main .supports .support-item .guarantee {
  background: url(img/guarantee_2@2x.png);background-size: 16px 16px;
}
.top .detail .detail-wrap .detail-main .supports .support-item .invoice {
  background: url(img/invoice_2@2x.png);background-size: 16px 16px;
}
.top .detail .detail-wrap .detail-main .supports .support-item .special {
  background: url(img/special_2@2x.png);background-size: 16px 16px;
}

.top .detail .detail-close {
  position: relative;
  width: 32px;
  height: 32px;
  margin: -64px auto 0 auto;
  clear: both;
  font-size: 32px;
}
@media only screen and (-webkit-min-device-pixel-ratio: 3),only screen and (min-device-pixel-ratio: 3)
{
  .top .wrap-content .content .title .brand { 
    background: url(img/brand@3x.png);   background-size: 22px 12px;
  } 
  .top .wrap-bulletin .title { 
    background: url(img/bulletin@3x.png);   background-size: 22px 12px;
  }
  .top .wrap-content .content .support .decrease {
    background: url(img/decrease_1@3x.png);background-size: 12px 12px;
  }
  .top .wrap-content .content .support .discount {
    background: url(img/discount_1@3x.png);background-size: 12px 12px;
  }
  .top .wrap-content .content .support .guarantee {
    background: url(img/guarantee_1@3x.png);background-size: 12px 12px;
  }
  .top .wrap-content .content .support .invoice {
    background: url(img/invoice_1@3x.png);background-size: 12px 12px;
  }
  .top .wrap-content .content .support .special {
    background: url(img/special_1@3x.png);background-size: 12px 12px;
  }

  .top .detail .detail-wrap .detail-main .supports .support-item .decrease {
    background: url(img/decrease_2@3x.png);background-size: 16px 16px;
  }
  .top .detail .detail-wrap .detail-main .supports .support-item .discount {
    background: url(img/discount_2@3x.png);background-size: 16px 16px;
  }
  .top .detail .detail-wrap .detail-main .supports .support-item .guarantee {
    background: url(img/guarantee_2@3x.png);background-size: 16px 16px;
  }
  .top .detail .detail-wrap .detail-main .supports .support-item .invoice {
    background: url(img/invoice_2@3x.png);background-size: 16px 16px;
  }
  .top .detail .detail-wrap .detail-main .supports .support-item .special {
    background: url(img/special_2@3x.png);background-size: 16px 16px;
  }

}  
</style>

