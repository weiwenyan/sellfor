<template>
<div class="shopcart">
  <div class="content">
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
    <div class="cont-right">
      <div class="pay" :class="payClass">{{payDesc}}</div>
    </div>   
  </div>
  <div class="ball-wrap" ref="ball-wrap">
    <div ref="child">
      <transition-group name="drop" tag="div">
        <div class="ball" v-for="ball in balls" v-show="ball.show" v-bind:key="ball" >
          <div class="inner inner-hook"></div>
        </div>
      </transition-group>
    </div>
  </div>
</div>
</template>

<script>
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
      dropBall: []
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
    },
    cartFoods: {
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
    }
  },
  methods: {
    drop() {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.ball[i];
        if (!ball.show) {
          ball.show = true;
          ball.event = this.cartFoods;
          console.log(this.cartFoods);
          this.dropBall.push[ball];
          return;
        }
      }
    },
    dropbeforeEnter(event) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.ball[count];
        let rect = ball.el.getBoundingClinetRect();
        let x = rect.left - 32;
        let y = (window.innerHeight - rect.y - 22);
        event.style.display = '';
        event.style.webkitTransform = 'translate3d(0,' + y + 'px,0)';
        event.style.transform = 'translate3d(0,' + y + 'px,0)';
        let ballList = this.$refs.child.children;
        let inner = ballList[0].children;
        inner.style.webkitTransform = 'translate3d(' + x + 'px,0,0)';
        inner.style.transform = 'translate3d(' + x + 'px,0,0)';
      }
    },
    dropenter(event) {
      /* eslint-disable no-unused-wars */
      // let rf = event.offsetHeight;
      this.$nextTickt(() => {
        event.style.webkitTransform = 'translate3d(0,0,0)';
        event.style.transform = 'translate3d(0,0,0)';
        let ballList = this.$refs.child.children;
        let inner = ballList[0].children;
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
      });
    },
    afterEnter(event) {
      let ball = this.dropBall.shift();
      if (ball) {
        ball.show = false;
        event.style.display = 'none';
      }
    }  

  },
  transition: {
    drop: {
      beforeEnter(event) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.ball[count];
          let rect = ball.el.getBoundingClinetRect();
          let x = rect.left - 32;
          let y = (window.innerHeight - rect.y - 22);
          event.style.display = '';
          event.style.webkitTransform = 'translate3d(0,' + y + 'px,0)';
          event.style.transform = 'translate3d(0,' + y + 'px,0)';
          let ballList = this.$refs.child.children;
          let inner = ballList[0].children;
          inner.style.webkitTransform = 'translate3d(' + x + 'px,0,0)';
          inner.style.transform = 'translate3d(' + x + 'px,0,0)';
        }
      },
      enter(event) {
        /* eslint-disable no-unused-wars */
        // let rf = event.offsetHeight;
        this.$nextTickt(() => {
          event.style.webkitTransform = 'translate3d(0,0,0)';
          event.style.transform = 'translate3d(0,0,0)';
          let ballList = this.$refs.child.children;
          let inner = ballList[0].children;
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
        });
      },
      afterEnter(event) {
        let ball = this.dropBall.shift();
        if (ball) {
          ball.show = false;
          event.style.display = 'none';
        }
      }
    }
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

.drop-enter{

  opacity: 0;
  transform: rotate(0) translateX(0);
}
.drop-enter-active{
  opacity: 0;
  transform: translateX(24px) rotate(180deg);
}
.drop-leave{
  opacity: 0;
  transform: rotate(0) translateX(0);
}
.drop-leave-active {
  opacity: 0;
  transform: translateX(24px) rotate(180deg);
}

</style>

