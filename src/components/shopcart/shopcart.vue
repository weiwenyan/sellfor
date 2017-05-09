<template>
<div class="shopcart">
  <div class="content" @click="toggleList">
    <div class="cont-left">
      <div class="cart-logo">
        <div class="logo" :class="{'active':totalCount>0}">
          <i class="icon-shopping_cart"></i>
        </div>
        <div class="number" v-show="totalCount>0">{{totalCount}}</div>
      </div>
      <div class="price" :class="{'active':totalPrice>0}">￥{{totalPrice}}</div>
      <div class="desc">另需配送费{{deliveryPrice}}元</div>
    </div>
    <div class="cont-right" @click.stop.prevent="pay">
      <div class="pay" :class="payClass">{{payDesc}}</div>
    </div>   
  </div>

  <div class="ball-wrap">
      <transition 
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:leave="afterEnter"
          >
          <div class="ball" v-show="ballshow">
            <div class="inner inner-hook"></div>
          </div>
      </transition>
  </div>

<transition name="shopcartList">
  <div class="cartlist-wrap" v-show="listShow">
      <div class="listhead">
        <h1 class="title">购物车</h1><span class="empty" @click="empty">清空</span>
      </div>
      <div class="listcontent" id="listcontent" ref="listcontent">
        <ul>
          <li class="food" v-for="food in selectFoods">
            <div class="name">{{food.name}}</div>
            <div class="price">
                <span>￥{{food.price*food.count}}</span>
            </div> 
            <div class="cartcontrol"><cartcontrol :food="food"></cartcontrol></div>
          </li>
        </ul>      
      </div>
    </div>
</transition>

<transition name="masker">
  <div class="list-mask" v-show="listShow" @click="closeList"></div>
</transition>

</div>
</template>


<script>
import BScroll from 'better-scroll';
import Cartcontrol from '../carcontrol/carcontrol';
export default {
  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBall: [],
      ballshow: false,
      listShow: false
    };
  },
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [{
          price: 10,
          count: 1
        }];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return this.minPrice + '元起送';
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return '还差' + diff + '元起送';
      } else {
        return '去结算';
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough';
      } else {
        return 'enough';
      }
    },
    listShow() {
      if (!this.totalCount) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    beforeEnter: function (el) {
      /* eslint-disable no-unused-wars */
      // let rf = event.offsetHeight;
     this.$nextTick(() => {
     //   this.drop();
     //   let child
     //   console.log(el);
// console.log(el.children);
        // let inner = el.children;
       el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        // let ballList = el.children;
       let inner = el.children;
       inner[0].style.webkitTransform = 'translate3d(0,0,0)';
       inner[0].style.transform = 'translate3d(0,0,0)';
     });
    },
    enter: function (el, done) {
     // let count = this.balls.length;
      // while (count--) {
        this.$nextTick(() => {
        let inner = el.children;
        el.style.display = '';
        el.style.webkitTransform = 'translate3d(0,' + this.balls.posY + 'px,0)';
        el.style.transform = 'translate3d(0,' + this.balls.posY + 'px,0)';
        // let ballList = this.children;
        // let inner = ballList[0].children;
        inner[0].style.webkitTransform = 'translate3d(' + this.balls.posX + 'px,0,0)';
        inner[0].style.transform = 'translate3d(' + this.balls.posX + 'px,0,0)';
     // }
        });
        done();
    },
    afterEnter: function (el) {
      this.ballshow = false;
       // el.style.webkitTransform = 'translate3d(0,0,0)';
       // el.style.transform = 'translate3d(0,0,0)';
        // let ballList = el.children;
        // let inner = ballList[0];
       //  el.children.style.webkitTransform = 'translate3d(0,0,0)';
      //  el.children.style.transform = 'translate3d(0,0,0)';
     // });
       // done();
    },
    drop(el) {
      this.ballshow = true;
      this.dropOffset(el);
    },
    dropOffset(el) {
      let y = Math.abs(el.offsetX);
      // let y = (window.innerHeight - z - 22);
      this.balls.posY = y;
      // console.log(this.balls.posY);
      let x = Math.abs(el.offsetY);
      // let x = v - 32;
      this.balls.posX = x;
      // console.log(this.balls.posX);
    },
    toggleList() {
      if (!this.totalCount) {
        return;
      }
      this.listShow = !this.listShow;
      if (this.listShow) {
        this.$nextTick(() => {
          if (!this.scroll) {
              this.scroll = new BScroll(document.getElementById('listcontent'), {
                  click: true
                });
          } else {
            this.scroll.refresh();
          }
        });
      }
    },
    empty() {
      this.selectFoods.forEach((food) => {
        food.count = 0;
        this.listShow = false;
      });
    },
    closeList() {
      this.listShow = false;
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return;
      }
      window.alert('去支付' + this.totalPrice);
    }
  },
  components: {
    'cartcontrol': Cartcontrol
  }
};
</script>

<style scoped>

.shopcart{
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 40;
  height: 48px;
  width: 100%;
}
.shopcart .content{
  display: flex;
  background: #141d27;
  font-size: 0;
}
.shopcart .content .cont-left{
  flex: 1;
}
.shopcart .content .cont-left .cart-logo{
  display: inline-block;
  position: relative;
  top: -10px;
  margin: 0 12px;
  padding: 6px;
  width: 56px;
  height: 56px;
  vertical-align: top;
  box-sizing: border-box;
  border-radius: 50%;
  background: #141d27;
  z-index: 45;
}

.shopcart .content .cont-left .cart-logo .number{
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  background: rgb(240,20,20);
  border-radius: 16px;
  font-size: 9px;
  font-weight: 700;
  color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);

}
.shopcart .content .cont-left .cart-logo .logo{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #2b343c;
  text-align: center;
}
.shopcart .content .cont-left .cart-logo .active{
  background: rgb(0,160,220);
}
.shopcart .content .cont-left .cart-logo .logo .icon-shopping_cart{
  font-size: 24px;
  line-height: 44px;
  color: #80858a;
}
.shopcart .content .cont-left .cart-logo .active .icon-shopping_cart{
    color: #fff;
}
.shopcart .content .cont-left .price{
  display: inline-block;
  vertical-align: top;
  margin-top: 12px;
  padding-right: 12px;
  border-right: 1px solid rgba(255,255,255,0.1);
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  color: rgba(255,255,255,0.4);
}
.shopcart .content .cont-left .active{
  color: #fff;
}
.shopcart .content .cont-left .desc{
  display: inline-block;
  vertical-align: top;
  margin: 12px 0 0 12px;
  line-height: 24px;
  font-size: 10px;
  color: rgba(255,255,255,0.4);
}

.shopcart .content .cont-right{
  flex: 0 0 105px;
  width: 105px;
  background: #2b33b
}
.shopcart .content .cont-right .pay{
  height: 48px;
  line-height: 48px;
  text-align: center;
  font-size: 12px;
  color:rgba(255,255,255,0.4);
  font-weight: 700;
}
.shopcart .content .cont-right .not-enough{
  background: #2b333b;
}
.shopcart .content .cont-right .enough{
  color: #fff;
  background: #00b43c;
}
.shopcart .ball-wrap{
}
.shopcart .ball-wrap .ball{
  position: fixed;
  left: 32px;
  bottom: 22px;
  z-index: 200;
  transition: all 0.4s;
}
.shopcart .ball-wrap .ball .inner{
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgb(0,160,220);
  transition: all 0.4s;
}


.shopcart .cartlist-wrap{
  position: absolute;
  z-index:-1;
  left: 0;
  bottom: 48px;
  width: 100%;
  transition: all 0.5s;
}
.shopcart .cartlist-wrap .listhead{
  height: 40px;
  line-height: 40px;
  padding: 0 18px;
  background: #f3f5f7;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.shopcart .cartlist-wrap .listhead .title{
  float: left;
  font-size: 14px;
  color:rgb(7,17,27);
}
.shopcart .cartlist-wrap .listhead .empty{
  float: right;
  font-size: 12px;
  color:rgb(0,160,220);
}
.shopcart .cartlist-wrap .listcontent{
  padding: 0 18px;
  max-height: 217px;
  background: #fff;
  overflow: hidden;
}
.shopcart .cartlist-wrap .listcontent .food{
  position: relative;
  padding: 12px 0;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 14px;
}

.shopcart .cartlist-wrap .listcontent .food:after{
  content:"";
  border-bottom: 1px solid rgba(7,17,27,0.1);
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
}
.shopcart .cartlist-wrap .listcontent .food .name{
  font-size: 14px;
  line-height: 24px;
  color:rgb(7,17,27);
}
.shopcart .cartlist-wrap .listcontent .food .price{
  position: absolute;
  right: 90px;
  bottom: 12px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 700;
  color: rgb(240,20,20);
}
.shopcart .cartlist-wrap .listcontent .food .cartcontrol{
  position: absolute;
  right: 0;
  bottom: 6px;
}

.list-mask{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height:100%;
  z-index: -2;
  backdrop-filter:blur(10px);
  background: rgba(7,17,27,0.6);
  transition: all 0.5s;
}

.shopcartList-enter{
  opacity: 1;
  background: rgba(7,17,27,0);
}
.shopcartList-enter-active{
  opacity: 0;
  background: rgba(7,17,27,0.6);
}
.shopcartList-leave{
  opacity: 0;
  transform: translateY(0);
}
.shopcartList-leave-active {
  opacity: 1;
  background: rgba(7,17,27,0.6);
}

.masker-enter{
  opacity: 0;
  transform: translateY(0);
}
.masker-enter-active{
  opacity: 0;
  transform: translateY(100%);
}
.masker-leave{
  opacity: 0;
  transform: translateY(0);
}
.masker-leave-active {
  opacity: 0;
  transform: translateY(100%);
}


</style>

