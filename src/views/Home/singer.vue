<!-- singer歌手 -->
<template>
  <div class="singer container">
    <h2>歌手</h2>
    <ul>
      <li v-for="(item,index) in singer" @click="getSongerId(item.id)" :key="index">
        <div class="singer-img">
          <img
            :src="item.picUrl"
            alt=""
          />
        </div>
        <div class="singer-text">
          <p class="p1">{{item.name}}</p>
          <p class="p2">单曲数{{item.musicSize}}</p>
        </div>
      </li>
    </ul>
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
        singer:[]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
       getSongerId: function(e) {
      // console.log(e);
      // console.log(this.$store);
      let arr=[false,{}]
      this.$store.commit("playerstate", arr);
      this.$store.commit("details", e);
      
      this.$router.push("/Details");
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
      this.$axios.get('/top/artists',{
          params:{
              limit:30
          },
          withCredentials: true
      }).then(res=>{
          this.singer=res.artists
      })
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
.singer {
  h2 {
    margin: 0 0 15px 0;
    font-size: 16px;
    font-weight: 200;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px 0 -15px;
    li {
      padding: 0 15px 30px;
      flex: 0 0 10%;
      max-width: 10%;
      .singer-img {
        width: 108px;
        height: 108px;
        z-index: 2;
        padding-top: 100%;
        border-radius: 50%;
        background-color: #d9d9d9;
        position: relative;
        border: 1px solid #ccc;
        img {
           width: 108px;
          height: 108px;
           border-radius: 50%;
           position: absolute;
           top: 0;
           left: 0;
          
        }
      }
      .singer-text {
        margin-top: 15px;
        text-align: center;
        .p1 {
          font-weight: 700;
          font-size: 14px;
          line-height: 18px;
          word-break: break-word;
        }
        .p2 {
          font-size: 12px;
          margin-top: 10px;
          color: #fa2800;
        }
      }
    }
  }
}
</style>