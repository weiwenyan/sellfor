<template>
  <div  id="example-1">


    <div class="carcontrol">
<div class="decrease">
        <transition name="move"><div class="inner icon-remove_circle_outline" v-show="show"></div></transition>
    </div>    
    <div class="count"></div> 
    <div class="add icon-add_circle" @click="xshow"></div>
</div>

</div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
   }
  },
  methods: {
    xshow() {
      console.log(this.show);
      if (!this.show) {
        this.show = true;
      }
      console.log(this.show);
    }
  }
};
</script>

<style scoped>
#example-1{
   width: 300px;
   height: 200px;
   position: absolute;
   z-index: 100;
   background: #fff;
   left: 0;
   top: 0;
}

.move-enter {
  transform: translateX(10px);
  opacity: 0;
}

.move-enter-active {
  transition: all 3s ease;
}
.move-leave-active {
  transition: all 5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  transform: translateX(10px);
  opacity: 0;
}


.carcontrol{
  font-size: 0;
}
.carcontrol .decrease{
  display: inline-block;
}
.carcontrol .decrease .inner{
  padding: 6px;
  font-size: 24px;
  line-height: 24px;
  color: rgb(0,160,220);
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
</style>

