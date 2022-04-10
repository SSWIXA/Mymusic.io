<!-- 详情页 -->
<template>
  <div class="particulars">
    <div class="music-index container">
      <div class="part-left">
        <div class="part-left-top">
          <div class="part-img">
            <img :src="recommend.coverImgUrl" alt="" />
          </div>
          <div class="part-text">
            <div class="text1">
              <span>{{ recommend.name }}</span>
            </div>
            <div class="text2">
              <div class="text-img">
                <img
                  src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4231135949,2436830505&fm=26&gp=0.jpg"
                  alt=""
                />
              </div>
              <p>nicemusic</p>
              <p>2017-09-19创建</p>
            </div>
            <div class="text3">
              标签
              <span>华语</span>
            </div>
            <div class="text4">
              <p>
                {{ recommend.description }}
              </p>
            </div>
          </div>
        </div>
        <div class="part-left-center">
        </div>
        <div class="part-left-right">
          <div class="part-left-span">
            <span>序号</span>
            <span>歌曲</span>
            <span>歌手</span>
            <span>专辑</span>
            <span>时长</span>
          </div>
          <div class="part-left-list">
            <div
              class="part-list-item"
              v-for="(item, index) in recommendSong" @click="handleClick(item)"
              :key="index"
            >
              <span>{{ index + 1 }}</span>
              <span>
                <div>
                  <img :src="item.songs[0].al.picUrl" alt="" />
                </div>
                <p>{{ item.songs[0].name }}</p>
              </span>
              <span>{{ item.songs[0].ar[0].name }}</span>
              <span>{{ item.songs[0].al.name }}</span>
              <span>{{ item.songs[0].dt }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="part-right">
        <div class="part-right-top divit">
          <div class="part-right-text">
            <span>喜欢这个歌单的人</span>
          </div>
          <ul>
            <li v-for="(item, index) in recommendImg" :key="index">
              <img :src="item.avatarUrl" alt="" />
            </li>
          </ul>
        </div>
        <div class="part-right-center divit">
          <div class="part-right-text">
            <span>相关推荐</span>
          </div>
          <ul>
            <li v-for="(item, index) in recommendText" :key="index">
              <div class="avatar">
                <img :src="item.coverImgUrl" alt="" />
              </div>
              <div class="inif">
                <h2>{{ item.name }}</h2>
                <span
                  >By.
                  <small data-v-50817125="">{{
                    item.creator.nickname
                  }}</small></span
                >
              </div>
            </li>
          </ul>
        </div>
        <div class="part-right-right divit">
          <div class="part-right-text">
            <span>精彩评论</span>
          </div>
          <ul>
            <li v-for="(item, index) in recommendRemark" :key="index">
              <div class="avatar">
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <div class="init">
                <h2>
                  {{ item.user.nickname
                  }}<small data-v-50817125=""> · 9分钟前</small>
                </h2>
                <p>{{ item.content }}</p>
              </div>
            </li>
          </ul>
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

  data() {
    //这里存放数据
    return {
      recommend: {},
      recommendId: [], //获取歌单id
      recommendImg: [], //获取收藏歌单头像
      recommendText: [], //获取相关推荐歌单
      recommendRemark: [], //获取歌单评论
      recommendSong: [], //获取歌单歌曲
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleClick:async function(e) {
      // console.log(e);
      let arr = [];
      let player = true;
      // this.$refs.player.style.display=flex

      let data = await this.$axios.get("/song/url", {
        params: {
          id: e.songs[0].id,
        },
      });
      let music = {
        title: e.songs[0].name,
        artist: e.songs[0].ar[0].name,
        src: data.data[0].url,
        pic: e.songs[0].al.picUrl,
      };
      arr.push(player, music);
      this.$store.commit("playerstate", arr);
    },
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
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // console.log(this.$store.state.id);
    this.$axios
      .get("/playlist/detail", {
        params: {
          id: this.$store.state.id,
        },
      })
      .then((res) => {
        this.recommend = res.playlist;
        this.recommendId = res.playlist.trackIds.map((item) => {
          return item.id;
        });
        this.recommendId.map((iten) => {
          this.$axios
            .get("song/detail", {
              params: {
                ids: iten,
              },
            })
            .then((res) => {
              this.recommendSong.push(res);
              res.songs.map((item) => {
                res.songs[0].dt = this.computetimer(item.dt);
              });
            });
        });
      });

    //获取收藏歌单头像
    this.$axios
      .get("/playlist/subscribers", {
        params: {
          id: this.$store.state.id,
          limit: 28,
        },
      })
      .then((res) => {
        this.recommendImg = res.subscribers;
      });
    //获取相关推荐歌单
    this.$axios
      .get("/related/playlist", {
        params: {
          id: this.$store.state.id,
        },
      })
      .then((res) => {
        this.recommendText = res.playlists;
      });
    //获取歌单评论
    this.$axios
      .get("/comment/playlist", {
        params: {
          id: this.$store.state.id,
        },
      })
      .then((res) => {
        this.recommendRemark = res.comments;
      });
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
<style scoped lang="less">
.container {
  max-width: 1380px;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.music-index {
  display: flex;
  min-height: 600px;
  padding-top: 70px;
  .part-left {
    width: 950px;
    padding: 15px;
    background: #fff;
    border-radius: 8px;
    margin-right: 20px;
    .part-left-top {
      display: flex;
      .part-img {
        width: 200px;
        height: 200px;
        border-radius: 8px;
        margin-right: 30px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 8px;
        }
      }
      .part-text {
        width: 422px;
        .text1 {
          width: 100%;
          line-height: 24px;
          margin-top: 15px;
          margin-bottom: 20px;
          overflow: hidden;
          span {
            font-weight: 700;
            font-size: 24px;
          }
        }
        .text2 {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          .text-img {
            width: 30px;
            height: 30px;
            margin-right: 15px;
            cursor: pointer;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          p {
            font-size: 14px;
            margin-right: 30px;
            cursor: pointer;
          }
        }
        .text3 {
          span {
            background: #fa2800;
            font-size: 12px;
            padding: 4px 12px;
            border-radius: 15px;
            color: #fff;
            margin-left: 10px;
          }
        }
        .text4 {
          margin-top: 15px;
          p {
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            height: 44px;
            overflow: hidden;
          }
        }
      }
    }
    .part-left-center {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin: 15px 0;
      div:nth-child(1) {
        background: #fa2800;
        color: #fff;
        padding: 7px 15px;
        border-radius: 50px;
      }
      div:nth-child(2) {
        background: #f2f2f2;
        padding: 7px 15px;
        border-radius: 50px;
        margin-left: 15px;
        color: #333;
      }
    }
    .part-left-right {
      width: 920px;
      min-height: 600px;
      .part-left-span {
       background: #f7f7f7;
        width: 100%;
        display: flex;
        line-height: 50px;
        span {
          padding: 0 9px;
          font-weight: 300;
          color: #999;
          font-size: 14px;
        }
        span:nth-child(1) {
          width: 10%;
          text-align: center;
        }
        span:nth-child(2) {
          width: 40%;
        }
        span:nth-child(3) {
          width: 25%;
        }
        span:nth-child(4) {
          width: 15%;
        }
        span:nth-child(5) {
          width: 15%;
        }
      }
      .part-left-list {
        width: 920px;

        .part-list-item {
          display: flex;
          height: 50px;
          background: white;
          line-height: 50px;
          &:nth-child(2n) {
           background: #f7f7f7;;
          }

          span {
            padding: 0 9px;
            font-weight: 300;
            color: #4a4a4a;
            font-size: 14px;
          }
          span:nth-child(1) {
            width: 10%;
            text-align: center;
          }
          span:nth-child(2) {
            width: 40%;
            align-items: center;
            display: flex;
            div {
              width: 35px;
              height: 35px;
              margin-right: 10px;
              img {
                width: 100%;
                height: 100%;
                border-radius: 5px;
              }
            }
            p {
              height: 50px;
              overflow: hidden;
            }
          }
          span:nth-child(3) {
            width: 25%;
          }
          span:nth-child(4) {
            width: 15%;
            overflow: hidden;
          }
          span:nth-child(5) {
            width: 15%;
          }
        }
      }
    }
  }
  .part-right {
   
    width: 350px;
    .divit {
      padding: 15px;
      width: 100%;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .part-right-top {
      background: #fff;
      .part-right-text {
        border-left: 3px solid #fa2800;
        height: 20px;
        padding-left: 1rem;
        margin-bottom: 15px;
        font-weight: 700;
        span {
          font-weight: 700;
        }
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          padding: 0 4px 10px;
          img {
            width: 37px;
            height: 37px;
          }
        }
      }
    }
    .part-right-center {
        background: #fff;
      .part-right-text {
        border-left: 3px solid #fa2800;
        height: 20px;
        padding-left: 1rem;
        margin-bottom: 15px;
        font-weight: 700;
        span {
          font-weight: 700;
        }
      }
      ul {
        li {
          display: flex;
          margin-bottom: 15px;
          .avatar {
            width: 50px;
            height: 50px;
            border-radius: 3px;
            margin-right: 15px;
            flex-shrink: 0;
            img {
              width: 100%;
              height: 100%;
              border-radius: 3px;
            }
          }
          .inif {
            height: 50px;
            width: calc(100% - 60px);
            flex: 1;
            display: flex;
            justify-content: center;
            flex-direction: column;
            h2 {
              font-size: 14px;
              margin-bottom: 10px;
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
    .part-right-right {
        background: #fff;
      .part-right-text {
        border-left: 3px solid #fa2800;
        height: 20px;
        padding-left: 1rem;
        margin-bottom: 15px;
        font-weight: 700;
        span {
          font-weight: 700;
        }
      }
      ul {
        li {
          display: flex;
          padding: 10px 0;
          width: 100%;
          .avatar {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            margin-right: 12px;
            flex-shrink: 0;
            cursor: pointer;
            img {
              width: 45px;
              height: 45px;
              border-radius: 50%;
            }
          }
          .init {
            flex: 1;
            h2 {
              font-size: 15px;
              margin-right: 5px;
              margin-bottom: 10px;
              small {
                font-size: 12px;
                color: #a5a5c1;
                font-weight: 200;
              }
            }
            p {
              width: 100%;
              font-size: 12px;
              color: #666;
              line-height: 1.6;
              padding: 5px 10px;
              background: #f5f5f5;
              margin-top: 5px;
              border-radius: 3px;
            }
          }
        }
      }
    }
  }
}
</style>
