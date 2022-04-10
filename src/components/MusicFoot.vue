<!-- 尾巴部分 -->
<template>
  <div class="music-foot ">
     <div class="music-foot-top container">
       <p class="desc">nicemusic</p>
       <p class="title">nicemusic</p>
     </div>
     
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  methods: {}
}

</script>
<style lang='less' scoped>
.container {
    max-width: 1380px;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}
.music-foot{
  width: 100%;
  background: #161e27;
  .music-foot-top{
    padding: 3rem 0;
    max-width: 1380px;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    .desc{
    position: relative;
    font-size: .9375rem;
    letter-spacing: 1px;
    color: #fff;
    margin-bottom: 1rem;
    padding: 0 1rem;
    }
    .desc::before{
      content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 3px;
    height: 15px;
    border-radius: 5px;
    background: #fa2800;
    transform: translateY(-50%);
    }
    .title{
      font-size: .8125rem;
    line-height: 1.8;
    color: #6d7685;
    }
  }
}
</style>