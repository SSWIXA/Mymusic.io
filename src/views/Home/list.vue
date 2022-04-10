<!--歌单  -->
<template>
<div class='music-list container'>
   <h2>推荐歌单</h2>
   <div class="list-box">
       <div class="list-box-item" v-for="(item,index) in list" :key="index" @click="handClick(item.id)" >
           <div class="list-item-img">
               <img :src="item.picUrl" alt="">
           </div>
           <div class="list-item-text">
               <h2>{{item.name}}</h2>
           </div>
           <div class="list-time">
            <span>{{item.playCount}}</span>
            </div>
       </div>
       
</div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
        list:[]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
      handClick:function(id){
        this.$store.commit("LIST",id)
        this.$router.push('/index')
      },
      handTime:function(e){
        let time = parseInt(e/10000)+"万"
        return time
      }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
       this.$axios.get('/personalized',{
           params:{
               limit:24
           },
             withCredentials: true
       }).then(res=>{
           this.list=res.result
          //  console.log(res.result)
           res.result.map(item=>{
            item.playCount=this.handTime(item.playCount)
           })
           console.log(res)
       })
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
      
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style  scoped lang='less'>
.container {
  max-width: 1380px;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.music-list {
  h2 {
    margin: 0 0 15px 0;
    font-size: 16px;
    font-weight: 200;
  }
  .list-box {
   
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .list-box-item {
       position: relative;
      flex: 0 0 12.5%;
      max-width: 12.5%;
      padding: 0  15px  30px 0;
      cursor: pointer;
      .list-item-img {
        width: 132.5px;
        height: 132.5px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 2px;
        }
      }
    }
    .list-item-text {
      margin-top: 15px;
      h2 {
        width: 132.5px;
        overflow: hidden;
        font-weight: 700;
        line-height: 18px;
        font-size: 12px;
      }
    }
    .list-time{
    position: absolute;
    right: 43px;
    top: 1px;
    background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png) no-repeat 0;
    background-size: cover;
  
    span{
        color: #fff;
       font-size: 12px;
       font-weight: 700;
         width: 56px;
        height: 24px;
        display: block;
        text-align: center;
        line-height: 24px;
    }
  }
  }
}
</style>