<!-- mv -->
<template>
  <div class="layout">
    <div class="fluid">
      <div class="mv-wrap container">
        <div class="filter">
          <ul class="tag-lang">
            <li
              @click="handleClick(item.text, null, null)"
              v-for="item in areas"
              :key="item.id"
              :class="{ active: area === item.text }"
            >
              {{ item.text }}
            </li>
          </ul>
          <ul class="tag-lang tag-type">
            <li
              @click="handleClick(null, item.msg, null)"
              v-for="item in types"
              :key="item.id"
              :class="{ active: type === item.msg }"
            >
              {{ item.msg }}
            </li>
          </ul>
          <ul class="tag-lang">
            <li
              @click="handleClick(null, null, item.solt)"
              v-for="item in orders"
              :key="item.id"
              :class="{ active: order === item.solt }"
            >
              {{ item.solt }}
            </li>
          </ul>
        </div>
        <div class="load-more">
          <div class="mv-box">
            <ul class="mv-list">
              <li
                v-for="(item, index) in mv"
                :key="item.id"
                @mouseenter="show(index)"
                @mouseleave="slide(index)"
              >
                <div class="cover">
                  <div class="image">
                    <el-image lazy :src="item.cover"></el-image>
                  </div>
                  <div class="count">
                    <i class="arrow"></i>
                    <span>{{ item.playCount | capiton }}</span>
                  </div>
                  <div class="action" ref="action">
                    <button
                      title="播放"
                      class="play flex-center"
                      @click="skip(item.name)"
                    >
                      <i></i>
                    </button>
                  </div>
                  <div class="foot">
                    <p>{{ item.artistName }}</p>
                    <p>{{ item.duration | times }}</p>
                  </div>
                </div>
                <div class="info">
                  <h2 class="title ellipsis">{{ item.name }}</h2>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="load-bottom" ref="loadBottom">
          <div class="loading flex-column">
            <div class="loader"></div>
            <span>~努力加载中~</span>
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
  //import引入的组件需要注入到对象中才能使用
  components: {},
  filters: {
    capiton: function(value) {
      if (parseInt(value) > 10000) {
        value = parseInt(value / 10000) + "万";
      }
      return value;
    },
    times: function(value) {
      let min = parseInt(value / 1000 / 60);
      let sec = (value / 1000) % 60;
      let src = min + "分" + sec + "秒";
      return src;
    },
  },
  data() {
    //这里存放数据
    return {
      id: "",
      mv: [],
      area: "全部",
      type: "全部",
      order: "上升最快",
      areas: [
        { id: 1, text: "全部" },
        { id: 2, text: "内地" },
        { id: 3, text: "港台" },
        { id: 4, text: "欧美" },
        { id: 5, text: "日本" },
        { id: 6, text: "韩国" },
      ],
      types: [
        { id: 11, msg: "全部" },
        { id: 12, msg: "官方版" },
        { id: 13, msg: "原生" },
        { id: 14, msg: "现场版" },
        { id: 15, msg: "网易出品" },
      ],
      orders: [
        { id: 21, solt: "上升最快" },
        { id: 22, solt: "最热" },
        { id: 23, solt: "最新" },
      ],
      load: false,
      page: 1,
      scroll:'',
      before: 0,
      next: 12,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    skip: function(name) {
      this.$axios
        .get("/cloudsearch", {
          params: {
            keywords: name,
            type: 1004,
          },
        })
        .then((res) => {
          this.id = res.result.mvs[0].id;
          // console.log(this.id);
          this.$router.push({
            name: "playMv",
            params: {
              id: this.id,
            },
          });
        });
    },
    show: function(index) {
      this.$refs.action[index].style.display = "block";
    },
    slide: function(index) {
      this.$refs.action[index].style.display = "none";
    },
    handleClick: function(o, p, q) {
      this.area = o || this.area;
      this.type = p || this.type;
      this.order = q || this.order;
      this.$axios
        .get("/mv/all", {
          params: {
            area: this.area,
            type: this.type,
            order: this.order,
            limit: 12,
          },
        })
        .then((res) => {
          this.mv = res.data;
        });
    },
    getList: function() {
      this.$axios
        .get("/mv/all", {
          params: {
            area: this.area,
            type: this.type,
            order: this.order,
            limit: 12,
          },
        })
        .then((res) => {
          this.mv = res.data;
          this.num = res.data.length;
        });
    },
    scrollMore: function() {
      // 当前在工作区的距离为到页面顶部距离减去页面滚动距离
      this.scroll =
        this.$refs.loadBottom.offsetTop - document.documentElement.scrollTop; 
        // console.log(this.scroll)
      if (this.scroll >= 660 && this.load === false) {
        this.load = true;
        this.page += 1;
        setTimeout(() => {
          this.$axios
            .get("/mv/all", {
              params: {
                area: this.area,
                type: this.type,
                order: this.order,
                limit: 12,
                offset: (this.page - 1) * 12,
              },
            })
            .then((res) => {
              this.load = false;
              // console.log(res.data.slice(0, 12));
              this.mv = this.mv.concat(res.data.slice(0, 12));
              // console.log("滚动");
            });
        }, 2000);
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getList();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    window.addEventListener("scroll", this.scrollMore);
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {
    window.removeEventListener("scroll", this.scrollMore)
  }, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
* {
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
    .mv-wrap {
      margin-top: -20px;
      .filter {
        .tag-lang {
          margin: 20px 0;
          display: flex;
          li {
            width: 56px;
            height: 28px;
            line-height: 29px;
            font-size: 13px;
            text-align: center;
            margin-right: 6px;
            border-radius: 14px;
            cursor: pointer;
          }
          .active {
            background: #fa2800;
            font-weight: 700;
            color: #fff;
          }
        }
      }
      .load-more {
        .mv-box {
          padding: 15px 0;
          .mv-list {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            margin: 0 -15px;
            li {
              padding: 0 15px 30px;
              flex: 0 0 25%;
              max-width: 25%;
              &:hover .action {
                display: block;
              }
              .cover {
                position: relative;
                z-index: 2;
                padding-top: 56%;
                border-radius: 2px;
                background-color: #000;
                .image {
                  position: absolute;
                  top: 0;
                  left: 0;
                  overflow: hidden;
                  width: 100%;
                  height: 100%;
                  border-radius: 2px;
                }
                .count {
                  position: absolute;
                  right: 16px;
                  top: 1px;
                  height: 24px;
                  padding-left: 9px;
                  background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png)
                    no-repeat 0;
                  background-size: cover;
                  color: #fff;
                  font-size: 12px;
                  font-weight: 700;
                  line-height: 24px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  &::after {
                    content: "";
                    position: absolute;
                    right: -14px;
                    top: 0;
                    width: 14px;
                    height: 24px;
                    background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png)
                      no-repeat 100%;
                    background-size: cover;
                  }
                  .arrow {
                    display: block;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 4px 0 4px 6px;
                    border-color: transparent transparent transparent #fff;
                    margin-right: 5px;
                  }
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
                    outline: none;
                    i {
                      display: block;
                      width: 0;
                      height: 0;
                      border-style: solid;
                      border-width: 6px 0 6px 10px;
                      border-color: transparent transparent transparent #fff;
                      margin-left: 3px;
                    }
                  }
                }
                .foot {
                  width: 100%;
                  height: 35px;
                  background: rgba(0, 0, 0, 0.6);
                  position: absolute;
                  left: 0;
                  bottom: 0;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  padding: 0 10px;
                  p {
                    color: #fff;
                  }
                }
              }
              .info {
                margin-top: 15px;
                .title {
                  font-size: 14px;
                  font-weight: 500;
                  display: block;
                  line-height: 1.3;
                }
                .ellipsis {
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
            }
          }
        }
      }
    }
  }
}
.load-bottom {
  padding-bottom: 20px;
  height: 120px;
}
.my-list > li:hover .action {
  display: block;
}
.loader {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 3em;
  display: inline-block;
  position: relative;
  vertical-align: middle;
  background: #fa2800;
  animation: base 1s ease-in-out infinite;
  &::after {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
  }
}
@keyframes base {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
.loading {
  span {
    margin-top: -30px;
    font-size: 12px;
  }
}
.flex-column {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.container {
  max-width: 1380px;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
