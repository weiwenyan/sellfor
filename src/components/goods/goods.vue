<template>
  <div class="goods">
    <div class="menu-wrap" id="menu-wrap" ref="menu-wrap">
      <ul ref="child">
        <li v-for="(item, index) in goods" class="menu-item" :class="{'current':index===currentIndex}">
          <span class="text"><span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="goods-wrap" id="goods-wrap" ref="goods-wrap">
      <ul>
        <li v-for="item in goods" class="foods-list food-list-hook">
        <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" @click="chioceActFood(food,$event)">
              <div class="icon"><img :src="food.icon" width="57" height="57"></div>
              <div class="content">
                <h1 class="name">{{food.name}}</h1>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>                  
                </div>
                <div class="cartcontrol-wrap">
                  <cartcontrol :food="food" v-on:cartClick="cartClick"></cartcontrol>
                </div>
                <div class="buy" v-show="!food.count || food.count === 0"></div>
              </div>     
            </li>
          </ul>
        </li>
      </ul>
    </div>
<shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :selectFoods="selectFoods" ref="shopcart"></shopcart>
<food :food="food" ref="food"></food>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import Shopcart from '../shopcart/shopcart';
import Cartcontrol from '../carcontrol/carcontrol';
import FoodDetail from '../food/food';

var appData = require('../../../data.json');
var goodsdata = appData.goods;

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      ScrollY: 0,
      isActive: false,
      clickFoods: '',
      food: {}
    };
  },
  created() {
        this.goods = goodsdata;
        this.$nextTick(() => {
          this._initGscroll();
          this._foodslistHeight();
        });
    this.classMap = [ 'decrease', 'discount', 'special', 'invoice', 'guarantee' ];
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.ScrollY >= height1 && this.ScrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  methods: {
    _initGscroll() {
      let menuScroll = new BScroll(document.getElementById('menu-wrap'), {
        scrollY: true,
        probeType: 3
      });
      menuScroll.on('scroll', (pos) => {});
      let goodsScroll = new BScroll(document.getElementById('goods-wrap'), {
        scrollY: true,
        probeType: 3,
        click: true
      });
      goodsScroll.on('scroll', (pos) => {
        this.ScrollY = Math.abs(Math.round(pos.y));
      });
    },
    _foodslistHeight() {
      let foodList = this.$refs.child.children;
      let fheight = 0;
      this.listHeight.push(fheight);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        fheight += item.clientHeight;
        this.listHeight.push(fheight);
      }
    },
    cartClick(event) {
      this.$refs.shopcart.drop(event);
      // this.$emit('cartClick', event.target);
    },
    chioceActFood(food, event) {
      if (!event._constructed) {
        return false;
      }
      this.food = food;
      this.$refs.food.show();
    }
  },
  components: {
    'shopcart': Shopcart,
    'cartcontrol': Cartcontrol,
    'food': FoodDetail
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
.goods .menu-wrap .current{ 
  position: relative;
  z-index: 10;
  margin-top: -1px;
  background: #fff;
  font-weight: 700;
}
.goods .menu-wrap .current .text:after{ 
  border-bottom: none;
}

.goods .menu-wrap .menu-item { 
  display: table;
  height: 54px;
  width: 56px;
  line-height: 14px;
  padding: 0 12px;
}
.goods .menu-wrap .menu-item .icon { 
  display: inline-block;
  vertical-align: top;
  width: 12px;
  height: 12px;
  margin-right: 2px;
  background-size: 12px 12px;
  background-repeat: no-repeat;
}

.goods .menu-wrap .menu-item .text { 
  position: relative;
  display: table-cell;
  vertical-align: middle;
  font-size: 12px;
  width: 56px;
}
.goods .menu-wrap .menu-item .text:after {
  content:"";
  border-bottom: 1px solid rgba(7,17,27,0.1);
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
}
.goods .menu-wrap .menu-item .decrease {
  background: url(img/decrease_3@2x.png);background-size: 12px 12px;
}
.goods .menu-wrap .menu-item .discount {
  background: url(img/discount_3@2x.png);background-size: 12px 12px;
}
.goods .menu-wrap .menu-item .guarantee {
  background: url(img/guarantee_3@2x.png);background-size: 12px 12px;
}
.goods .menu-wrap .menu-item .invoice {
  background: url(img/invoice_3@2x.png);background-size: 12px 12px;
}
.goods .menu-wrap .menu-item .special {
  background: url(img/special_3@2x.png);background-size: 12px 12px;
}

.goods .goods-wrap {
  flex: 1;
}
.goods .goods-wrap .foods-list .title{
  line-height: 14px;
  height: 26px;
  line-height: 26px;
  border-left: 2px solid #d9dde1;
  font-size: 12px;
  color: rgb(147,153,159);
  background: #f3f5f7;
  padding-left: 16px;

}
.goods .goods-wrap .foods-list .food-item{
  position: relative;
  display: flex;
  margin: 18px;
  padding-bottom: 18px;
}
.goods .goods-wrap .foods-list .food-item:after {
  content:"";
  border-bottom: 1px solid rgba(7,17,27,0.1);
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
}
.goods .goods-wrap .foods-list .food-item:last-child{
    border-bottom: 0;
    margin-bottom: 0;
}
.goods .goods-wrap .foods-list .food-item .icon{
  flex: 0 0 57px;
  margin-right: 10px;
}
.goods .goods-wrap .foods-list .food-item .content{
  flex: 1;
}
.goods .goods-wrap .foods-list .food-item .content .name{
  margin: 2px 0 8px 0;
  height: 14px;
  line-height: 14px;
  font-size: 14px;
  color: rgb(7,17,27);  
}
.goods .goods-wrap .foods-list .food-item .content .desc{
  margin-bottom: 8px;
  line-height: 10px;
  font-size: 10px;
  color: rgb(147,153,159);

}
.goods .goods-wrap .foods-list .food-item .content .extra{
  line-height: 10px;
  font-size: 10px;
  color: rgb(147,153,159); 
}
.goods .goods-wrap .foods-list .food-item .content .extra .count{
  margin-right: 8px;
}

.goods .goods-wrap .foods-list .food-item .content .price{
  font-weight: 700;
  line-height: 24px;
}
.goods .goods-wrap .foods-list .food-item .content .price .now{
  margin-right: 8px;
  font-size: 14px;
  color: rgb(240,20,20);

}
.goods .goods-wrap .foods-list .food-item .content .price .old{
  text-decoration: line-through;
  font-size: 10px;
  color: rgb(147,153,159); 
}
.goods .goods-wrap .foods-list .food-item .content .cartcontrol-wrap{
  position: absolute;
  right: 0;
  bottom: 12px;


}

@media only screen and (-webkit-min-device-pixel-ratio: 3),only screen and (min-device-pixel-ratio: 3)
{
  .goods .menu-wrap .menu-item .decrease {
    background: url(img/decrease_3@3x.png);background-size: 12px 12px;
  }
  .goods .menu-wrap .menu-item .discount {
    background: url(img/discount_3@3x.png);background-size: 12px 12px;
  }
  .goods .menu-wrap .menu-item .guarantee {
    background: url(img/guarantee_3@3x.png);background-size: 12px 12px;
  }
  .goods .menu-wrap .menu-item .invoice {
    background: url(img/invoice_3@3x.png);background-size: 12px 12px;
  }
  .goods .menu-wrap .menu-item .special {
    background: url(img/special_3@3x.png);background-size: 12px 12px;
  }

}  
</style>
