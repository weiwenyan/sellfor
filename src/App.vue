<template>
  <div id="app">
     <vheader :seller="seller"></vheader>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
    <router-view :seller="seller"></router-view>
    </keep-alive> 
  </div>
</template>

<script>
import hello from '@/components/header/header';
var appData = require('../data.json');
var sellerdata = appData.seller;

export default {
  data() {
    return {
      seller: {}
    };
  },
  created() {
    this.seller = sellerdata;
  },
  components: {
    'Vheader': hello
  }
};
</script>

<style>
#app { width: 100%;}
.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  position: relative;
}
.tab .tab-item {
  flex: 1;
  text-align: center;
}
.tab .tab-item > a {
  display: block;
  font-size: 14px;
  color: #4d555d;
  text-decoration: none;
}
.tab .tab-item > a.active {
  color: rgb(240,20,20);
}
.border-1px {
    
}
.tab:after {
  content:"";
  border-bottom: 1px solid #ccc;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>
