<!-- 歌曲 -->
<template>
  <div class="song container">
    <h2>推荐新歌曲</h2>
    <div class="song-list">
      <div class="song-list-item" v-for="(item,index) in song" :key="index" @click="handleClick(item)">
        <div class="item-text">
          <span @click="musicSrc(item.id)">{{index+1}}</span>
        </div>
        <div class="item-img">
          <img
            :src="item.picUrl"
            alt=""
          />
        </div>
        <div class="item-obj">
          <p>{{item.name}}</p>
          <p>{{item.song.artists[0].name}}</p>
        </div>
        <p class="album">《{{item.name}}》</p>
        <p class="time">{{item.song.duration}}</p>
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
        song:[],
        time:[]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleClick:async function(e){
      // console.log(e)
       let arr=[]
      let player = true;
      // this.$refs.player.style.display=flex

      let data = await this.$axios.get("/song/url", {
        params: {
          id:e.song.id,
        },
      });
      let music = {
        title: e.name,
        artist: e.song.artists[0].name,
        src: data.data[0].url,
        pic: e.picUrl,
      };
      arr.push(player,music)
      this.$store.commit("playerstate",arr)
    },
    // musicSrc:function(name){
    //   console.log(name)
    // },
    //音频时间处理
    computetimer: function(e) {
      let time = parseInt(e / 1000);
      // 得到分钟
      let minute = time / 60;
      let minutes = parseInt(minute);
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      //得到秒
      let second = time % 60;
      let seconds = Math.round(second);
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      //音频时长
      let allTime = minutes + ":" + seconds;
      return allTime;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
      this.$axios.get('/personalized/newsong',{
        withCredentials: true
      }).then(res=>{
          this.song=res.result;
          // console.log(res.result)
          this.time=res.result.map(item=>{
            item.song.duration=this.computetimer(item.song.duration)
          })
      });
      
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  
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
.song {
  h2 {
    margin: 0 0 15px 0;
    font-size: 16px;
    font-weight: 200;
  }
  .song-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .song-list-item {
       margin-bottom: 20px;
      display: flex;
      align-items: center;
      width: 660px;
      height: 80px;
      background: #fff;
      padding: 0 4%;
      .item-text {
        width: 30px;
        margin-right: 20px;
        span {
          font-size: 15px;
          color: #4a4a4a;
          font-weight: 700;
        }
      }
      .item-img {
        width: 55px;
        height: 55px;
        border-radius: 5px;
        margin-right: 30px;
        img {
           width: 55px;
        height: 55px;
          border-radius: 5px;
        }
      }
      .item-obj {
          width: 15%;
       
        p {
          font-size: 14px;
          color: #333;
          font-weight: 700;
          margin-bottom: 10px;
          overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
        }
      }
      .album {
        font-size: 14px;
        color: #333;
        font-weight: 700;
        margin-left: 80px;
        flex: 1;
      }
      .time {
        font-size: 14px;
        color: #333;
        font-weight: 700;
        margin-left: 80px;
      }
    }
  }
}
</style>