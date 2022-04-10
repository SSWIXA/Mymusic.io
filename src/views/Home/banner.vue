<!--  -->
<template>
<div class='banner container'>
    <div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide banner-img">
            <img src="http://p1.music.126.net/DhoJNtA7-kFYhWE1u8i_0g==/109951165661479480.jpg" alt="">
        </div>
        <div class="swiper-slide banner-img">
             <img src="http://p1.music.126.net/OTrq8rNQhAPqUx_AnXxGtg==/109951165661501675.jpg" alt="">
        </div>
        <div class="swiper-slide banner-img">
              <img src="http://p1.music.126.net/o4hKmNqlIisi24iZR9yNLA==/109951165656234645.jpg" alt="">
        </div>
         <div class="swiper-slide banner-img">
              <img src="http://p1.music.126.net/UUvScwW0_k6vCvH22SDvOg==/109951165966359570.jpg?imageView&quality=89" alt="">
        </div>
         <div class="swiper-slide banner-img">
              <img src="http://p1.music.126.net/BJY4oGMvTh9y_qdj7Z8UGA==/109951165965818391.jpg?imageView&quality=89" alt="">
        </div>
         <div class="swiper-slide banner-img">
              <img src="http://p1.music.126.net/QoqvZkco5Q5Qch18seYnag==/109951165966533055.jpg?imageView&quality=89" alt="">
        </div>
         <div class="swiper-slide banner-img">
              <img src="http://p1.music.126.net/bpAb8qGCiVJxt4-b_31s4A==/109951165966529816.jpg?imageView&quality=89" alt="">
        </div>
         <div class="swiper-slide banner-img">
              <img src="http://p1.music.126.net/ahEOj3RCUQY9bXIc0zbxEg==/109951165966569081.jpg?imageView&quality=89" alt="">
        </div>
         <div class="swiper-slide banner-img">
              <img src="http://p1.music.126.net/p6bQoOu0eE7oEq8lSNS2cA==/109951165966331967.jpg?imageView&quality=89" alt="">
        </div>
    </div>

    <!-- 如果需要分页器 -->
    <div class="banner-tion"></div>
    <div class="swiper-pagination "></div>
</div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
   Banner:[]
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
   this.$axios.get('/banner',{
       withCredentials: true
   }).then(res=>{
    //    console.log(res.banners)
       this.Banner=res.banners
       console.log(res.banners)
   })
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    new Swiper ('.swiper-container', {
    loop: true, // 循环模式选项
    slidesPerView : 3,
    slidesPerGroup : 3,
    
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
    autoplay: {
        autoplay:2000,
        autoplayStopOnLast:true,
        disableOnInteraction:false,
    },
  })  
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  scoped>
.container {
    max-width: 1380px;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}
.banner{
    height: 190px;
}
.swiper-container {
    height: 190px;
}  
.banner-img{
    width: 430px;
    height: 170px;
    padding-right: 30px;
}
.banner-img img{
     height: 100%;
     width: 100%;
     border-radius: 3px
}
.banner-tion{
   width: 100%;
    height: 10px;
    background-color: blue;
    z-index: 6666;
}
.swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction {
    bottom: 0px;
    left: 0;
    width: 100%;
}
</style>