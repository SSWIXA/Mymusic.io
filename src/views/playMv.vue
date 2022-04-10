<!-- mv详情页 -->
<template>
  <div class="layout">
    <div class="fluid">
      <div class="my-detail container">
        <div class="left shadow">
          <div class="video-container">
            <video
              controls
              autoplay
              controlslist="nodownload"
              :src="mvurl"
            ></video>
          </div>
          <div class="video-foot">
            <h2 class="title flex-row">
              <i class="el-icon-s-data"></i>
              {{ Mvpage.name }}
            </h2>
            <div class="tag"></div>
            <p class="flex-row">
              <span>发布：{{ Mvpage.publishTime }}</span>
              <span>播放次数:{{ Mvpage.subCount | capiton }}</span>
            </p>
            <div class="follow">
              <div class="box">
                <i class="el-icon-picture-outline-round"></i>
                {{ like }}
              </div>
              <div class="box">
                <i class="el-icon-star-off"></i>
                {{ Mvpage.subCount }}
              </div>
              <div class="box">
                <i class="el-icon-share"></i>
                {{ Mvpage.shareCount }}
              </div>
            </div>
          </div>
          <div class="comments">
            <div class="title flex-row">
              <i class="el-icon-chat-dot-round"></i>
              Comments |
              <span class="noticom">
                <a>{{ Mvpage.commentCount }}条评论</a>
              </span>
            </div>
            <div class="comment-list" v-if="page === 1">
              <h3>精彩评论</h3>
              <ul>
                <li
                  class="item"
                  v-for="item in hotComments"
                  :key="item.commentId"
                >
                  <div class="avatar">
                    <img :src="item.user.avatarUrl" alt="" />
                  </div>
                  <div class="info">
                    <h2 class="flex-between">
                      <span>
                        {{ item.user.nickname }}
                        <small>{{ item.time | times }}</small>
                      </span>
                      <div class="tool flex-row">
                        <i class="el-icon-trophy"></i>
                        <span>{{ item.likedCount }}</span>
                        |<i class="el-icon-chat-dot-round"></i>
                      </div>
                    </h2>
                    <div class="content">
                      {{ item.content }}
                      <div class="beReqlied" v-if="item.beReplied.length != 0">
                        <small>@{{ item.beReplied[0].user.nickname }}</small>
                        {{ item.beReplied[0].content }}
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="comment-list">
              <h3>最新评论</h3>
              <ul>
                <li class="item" v-for="item in comments" :key="item.commentId">
                  <div class="avatar">
                    <img :src="item.user.avatarUrl" alt="" />
                  </div>
                  <div class="info">
                    <h2 class="flex-between">
                      <span>
                        {{ item.user.nickname }}
                        <small>{{ item.time | times }}</small>
                      </span>
                      <div class="tool flex-row">
                        <i class="el-icon-trophy"></i>
                        <span>{{ item.likedCount }}</span>
                        |<i class="el-icon-chat-dot-round"></i>
                      </div>
                    </h2>
                    <div class="content">
                      {{ item.content }}
                      <div class="beReqlied" v-if="item.beReplied.length != 0">
                        <small>@{{ item.beReplied[0].user.nickname }}</small>
                        {{ item.beReplied[0].content }}
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="page-wrap">
              <!-- @current-change是事件  :current-page当前页数 :page-size每页显示条数 :total总条数-->
              <el-pagination
                :background="true"
                :current-page="page"
                :page-size="limit"
                @current-change="currentChange"
                :total="Mvpage.commentCount"
              >
              </el-pagination>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="profile module shadow">
            <div class="card-header flex-row">
              <span>视频简介</span>
            </div>
            <div class="content">
              <p>{{ Mvpage.desc }}</p>
            </div>
          </div>
          <div class="related module shadow">
            <div class="card-header flex-row">
              <span>相关推荐</span>
            </div>
            <ul>
              <li
                v-for="(item, index) in correlation"
                :key="item.id"
                @mouseenter="show(index)"
                @mouseleave="slide(index)"
              >
                <div class="avatar">
                  <img :src="item.cover" alt="" />
                  <div class="action" ref="action">
                    <button title="播放" class="play flex-center">
                      <i></i>
                    </button>
                  </div>
                </div>
                <div class="info">
                  <h2 class="flex-row ellipsis">
                    <i class="el-icon-s-data"></i>
                    {{ item.name }}
                  </h2>
                  <div class="author">
                    by.
                    <span>
                      <small>{{ item.artistName }}</small>
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  filters: {
    capiton: function(value) {
      value = (value / 100).toFixed(1) + "万";
      return value;
    },
    times: function(date) {
      date = new Date(date);
      let YY = date.getFullYear() + "-";
      let MM =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let hh =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      let mm =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      let ss =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return YY + MM + DD + " " + hh + mm + ss;
    },
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      id: "",
      Mvpage: "",
      mvurl: "",
      like: "",
      hotComments: [],
      comments: [],
      correlation: [],
      total: 0,
      page: 1,
      limit: 20,
      true: true,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    show: function(index) {
      this.$refs.action[index].style.display = "block";
    },
    slide: function(index) {
      this.$refs.action[index].style.display = "none";
    },
    currentChange(val) {
      this.page = val;
      this.getComment();
    },
    getComment() {
      this.$axios
        .get("/comment/mv", {
          params: {
            id: this.id,
            offset: (this.page - 1) * this.limit,
            limit: this.limit,
          },
        })
        .then((res) => {
          this.hotComments = res.hotComments;
          this.comments = res.comments;
        });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.id = this.$route.params.id;
    //mv播放的请求
    this.$axios
      .get("/mv/url", {
        params: {
          id: this.id,
        },
      })
      .then((res) => {
        this.mvurl = res.data.url;
      });
    //mv的信息数据
    this.$axios
      .get("/mv/detail", {
        params: {
          mvid: this.id,
        },
      })
      .then((res) => {
        this.Mvpage = res.data;
      });
    //mv的点赞数据
    this.$axios
      .get("/mv/detail/info", {
        params: {
          mvid: this.id,
        },
      })
      .then((res) => {
        this.like = res.likedCount;
      });
    //mv评论
    this.getComment();
    //相关mv
    this.$axios
      .get("/simi/mv", {
        params: {
          mvid: this.id,
        },
      })
      .then((res) => {
        this.correlation = res.mvs;
      });
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
<style lang="less" scoped>
::v-deep {
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: red;
    color: #fff;
  }
}
*,
:after,
:before {
  box-sizing: border-box;
}
.layout {
  min-height: calc(100vh - 252px);
  z-index: 998;
  width: auto;
  min-width: 1024px;
  padding-top: 70px;
  font-size: 12px;
  .fluid {
    padding: 20px 0;
  }
}
.my-detail {
  display: flex;
  .left {
    flex: 1;
    width: 950px;
    padding: 15px;
    border-radius: 8px;
    margin-right: 20px;
    .video-container {
      position: relative;
      padding-top: 56.25%;
      video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
      }
    }
    .video-foot {
      margin-top: 8px;
      .title {
        margin-bottom: 10px;
        position: relative;
        font-size: 16px;
        font-weight: 600px;
        i {
          margin-right: 5px;
        }
      }
      p {
        span {
          margin-right: 30px;
          font-size: 12px;
          color: #999;
        }
      }
      .tag {
        margin-bottom: 8px;
      }
      .follow {
        display: flex;
        margin-top: 10px;
        .box {
          width: auto;
          border-radius: 15px;
          padding: 0 15px;
          background: #f2f2f2;
          margin-right: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #161e27;
          cursor: pointer;
          i {
            font-size: 24px;
            color: #161e27;
            margin-right: 6px;
          }
        }
      }
    }
    .comments {
      margin-top: 25px;
      .title {
        width: 100%;
        height: 50px;
        border-radius: 3px;
        padding: 0 3px;
        border-bottom: 1px solid #f1f1f1;
        margin-bottom: 10px;
        position: relative;
        i {
          color: #666;
          font-size: 18px;
          margin-right: 10px;
          margin-top: 1px;
          margin-left: -3px;
        }
        span {
          margin-left: 5px;
        }
      }
      .comment-list {
        margin-top: 20px;
        h3 {
          margin-bottom: 15px;
          font-size: 16px;
        }
        ul {
          li {
            padding: 10px 0;
            width: 100%;
            display: flex;
            .avatar {
              width: 45px;
              height: 45px;
              border-radius: 50%;
              margin-right: 12px;
              flex-shrink: 0;
              img {
                width: 100%;
                border-radius: 50%;
              }
            }
            .info {
              flex: 1;
              h2 {
                font-size: 15px;
                margin-right: 5px;
                margin-bottom: 10px;
                .tool {
                  i {
                    font-size: 24px;
                    font-weight: 100;
                    margin-left: 10px;
                    cursor: pointer;
                    transition: all 0.4s;
                  }
                  span {
                    font-size: 12px;
                    margin-top: 2px;
                    color: #666;
                    font-weight: 200;
                    position: relative;
                    margin-right: 10px;
                  }
                }
                span {
                  small {
                    font-size: 12px;
                    color: #a5a5c1;
                    font-weight: 200;
                  }
                }
              }
              .content {
                width: 100%;
                font-size: 12px;
                color: #4a4a4a;
                line-height: 1.6;
                padding: 8px 10px;
                background: #f5f5f5;
                margin-top: 5px;
                border-radius: 3px;
                .beReqlied {
                  margin-top: 10px;
                  background: #fff;
                  padding: 8px 10px;
                  border-radius: 3px;
                  color: #666;
                  small {
                    color: #fa2800;
                  }
                }
              }
            }
          }
        }
      }
      .page-wrap {
        margin-top: 20px;
      }
    }
  }
  .right {
    width: 350px;
    flex-shrink: 0;
    .module {
      padding: 15px;
      width: 100%;
      border-radius: 8px;
      margin-bottom: 20px;
      .card-header {
        border-left: 3px solid #fa2800;
        height: 20px;
        padding-left: 1rem;
        margin-bottom: 15px;
        font-weight: 700;
      }
    }
    .related {
      padding-bottom: 5px;
      ul {
        li {
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;
          .avatar {
            width: 100%;
            margin-right: 15px;
            flex-shrink: 0;
            position: relative;
            img {
              width: 100%;
            }
            .action {
              display: none;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              .play {
                width: 32px;
                height: 32px;
                padding: 0;
                border: none;
                border-radius: 50%;
                color: #fff;
                cursor: pointer;
                background-color: #fa2800;
                i {
                  display: block;
                  width: 0;
                  height: 0;
                  border-style: solid;
                  border-width: 6px 0 6px 10px;
                  border-color: transparent transparent transparent #fff;
                  margin-left: 12px;
                }
              }
            }
          }
          .info {
            height: 50px;
            width: calc(100% - 50px);
            flex: 1;
            display: flex;
            justify-content: center;
            flex-direction: column;
            h2 {
              font-size: 14px;
              margin-bottom: 3px;
              margin-top: 5px;
              width: 100%;
              min-height: 20px;
              i {
                margin-right: 5px;
              }
            }
            .author {
              font-size: 12px;
              color: #a5a5c1;
              .span {
                font-size: 12px;
                color: #a5a5c1;
                .small {
                  font-size: 12px;
                  color: #a5a5c1;
                }
              }
            }
          }
        }
      }
    }
  }
}
.container {
  max-width: 1380px;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.shadow {
  background-color: #fff;
  box-shadow: 0 5px 40px -1px rgba(2, 10, 18, 0.1);
}
.flex-row {
  flex-direction: row;
  display: flex;
  align-items: center;
}
.flex-between {
  justify-content: space-between;
  display: flex;
  align-items: center;
}
a {
  text-decoration: none;
  color: #161e27;
}
img {
  height: auto;
  max-width: 100%;
  border-style: none;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.slide {
  display: none;
}
p {
  font-size: 14px;
  text-indent: 10px;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: red;
  color: #fff;
}
</style>
