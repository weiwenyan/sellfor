<template>
<div id="hei">
  <ul style="display: block;" ref="child">
  <li class="hook" >aa</li>
  <li class="hook" >bb</li>
  <li class="hook" >cc</li>
  </ul>
</div>
</template>

<script>
export default {
  mounted () {
    let namel = this.$refs.child.children;
    console.log(namel[0].clientHeight);
  }
};
</script>

<style scoped>
</style>
