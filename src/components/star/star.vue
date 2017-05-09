<template>
  <div class="star" :class="starType">
    <span v-for="itemclass in itemclasses" :class="itemclass" class="star-item" track-by="$index"></span>
  </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';
export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType() {
      return 'star' + this.size + ' ' + this.score;
    },
    itemclasses() {
      let result = [];
      let score = Math.floor(this.score * 2) / 2;
      let hasDecimal = score % 1 !== 0;
      let integer = Math.floor(score);
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      for (let i = result.length; i < LENGTH; i++) {
        result.push(CLS_OFF);
      }
      return result;
    }
  }
};
</script>

<style scoped>
.star { font-size: 0; }
.star .star-item {
  display: inline-block;
  background-repeat: no-repeat;
}
.star .star-item:last-child {
  margin-right: 0;
}
.star48 span{
  width: 20px;
  height: 20px;
  margin-right: 22px;
}
.star48 .on {
  background: url(img/star48_on@2x.png);
  background-size: 20px 20px;
}
.star48 .half {
  background: url(img/star48_half@2x.png);
  background-size: 20px 20px;
}
.star48 .off {
  background: url(img/star48_off@2x.png);
  background-size: 20px 20px;
}

.star36 span{
  width: 15px;
  height: 15px;
  margin-right: 6px;
}
.star36 .on {
  background: url(img/star36_on@2x.png);
  background-size: 15px 15px;
}
.star36 .half {
  background: url(img/star36_half@2x.png);
  background-size: 15px 15px;
}
.star36 .off {
  background: url(img/star36_half@2x.png);
  background-size: 15px 15px;
}

.star24 span{
  width: 10px;
  height: 10px;
  margin-right: 3px;
}
.star24 .on {
  background: url(img/star24_on@2x.png);
  background-size: 10px 10px;
}
.star24 .half {
  background: url(img/star24_half@2x.png);
  background-size: 10px 10px;
}
.star24 .off {
  background: url(img/star24_half@2x.png);
  background-size: 10px 10px;
}


@media only screen and (-webkit-min-device-pixel-ratio: 3),only screen and (min-device-pixel-ratio: 3)
{
  .star .star48 .on {
    background: url(img/star48_on@3x.png);  background-size: 20px 20px;
  }
  .star .star48 .half {
    background: url(img/star48_half@3x.png);  background-size: 20px 20px;
  }
  .star .star48 .off {
    background: url(img/star48_off@3x.png);  background-size: 20px 20px;
  }
  .star .star36 .on {
    background: url(img/star36_on@3x.png);  background-size: 15px 15px;
  }
  .star .star36 .half {
    background: url(img/star36_half@3x.png);  background-size: 15px 15px;
  }
  .star .star36 .off {
    background: url(img/star36_off@3x.png);  background-size: 15px 15px;
  }
  .star .star24 .on {
    background: url(img/star24_on@3x.png);  background-size: 10px 10px;
  }
  .star .star24 .half {
    background: url(img/star24_half@3x.png);  background-size: 10px 10px;
  }
  .star .star24 .off {
    background: url(img/star24_off@3x.png);  background-size: 10px 10px;
  }

}  
</style>

