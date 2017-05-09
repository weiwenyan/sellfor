<template>
  <div class="carcontrol">
    <transition name="move">   
      <div class="decrease" @click.stop.prevent="decreaseCart" v-show="food.count>0">
        <div class="inner icon-remove_circle_outline"></div>
      </div>
    </transition>
    <div class="count" v-show="food.count>0" >{{food.count}}</div> 
    <div class="add icon-add_circle" @click.stop.prevent="addCart" v-on:click="cartClick"></div>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart(event) {
      if (!event._constructed) {
        return false;
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
    },
    decreaseCart(event) {
      if (!event._constructed) {
        return false;
      }
      if (this.food.count) {
        this.food.count--;
      }
    },
    cartClick(event) {
      if (!event._constructed) {
        return false;
      } else {
        this.$emit('cartClick', event);
      }
    }
  }
};
</script>

<style scoped>
.carcontrol{
  font-size: 0;
}
.carcontrol .decrease{
  display: inline-block;
  transition: all 0.3s linear;
}
.carcontrol .decrease .inner{
  padding: 6px;
  font-size: 24px;
  line-height: 24px;
  color: rgb(0,160,220);
  display: inline-block;
  transition: all 0.3s linear;
  transform: rotate(0);
}
.carcontrol .count{
  display: inline-block;
  font-size: 10px;
  width: 12px;
  line-height: 24px;
  text-align: center;
  color: rgb(147,153,159);
  vertical-align: top;
  padding-top: 6px;
}
.carcontrol .add{
  display: inline-block;
  padding: 6px;
  font-size: 24px;
  line-height: 24px;
  color: rgb(0,160,220);
}
.move-enter{
  opacity: 0;
  transform: rotate(0) translateX(0);
}
.move-enter-active{
  opacity: 0;
  transform: translateX(24px) rotate(180deg);
}
.move-leave{
  opacity: 0;
  transform: rotate(0) translateX(0);
}
.move-leave-active {
  opacity: 0;
  transform: translateX(24px) rotate(180deg);
}

</style>

