import Vue from 'vue';
export function formateDate() {
  Vue.filter('formateDate', function (value) {
      function changeTime(m) {
          return m < 10 ? '0' + m : m;
      }
      var time = new Date(parseInt(value));
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var M = time.getMinutes();
      // var s = time.getSeconds();
      return y + '.' + changeTime(m) + '.' + changeTime(d) + ' ' + changeTime(h) + ':' + changeTime(M);
  });
}

