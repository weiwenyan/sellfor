<template>
<div class="shopcart">
<div id="example-4">
  <button @click="show = !show">
    Toggle
  </button>

  <div class="" v-for="ball in balls">
<transition-group
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave"
  >
    <p v-show="show">
      Demo
    </p>
  </transition>
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
      ]
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
   }
  },
  methods: {
    beforeEnter: function (el) {
      el.style.opacity = 0;
      el.style.transformOrigin = 'left';
    },
    enter: function (el, done) {
      el.style.opacity = 1;
      el.style.transformOrigin = 'right';
    },
    leave: function (el, done) {
      el.style.opacity = 0;
      el.style.transformOrigin = 'left';
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
  height: 300px;
  width: 100%;
  background: #fff;
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

