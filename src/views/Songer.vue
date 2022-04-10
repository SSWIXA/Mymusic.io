<!-- 歌手部分 -->
<template>
  <div class="songer container">
    <div class="songer-index">
      <ul class="country">
        <li
          :class="{ active: item.id === countryid }"
          v-for="item in area"
          @click="countryAcitve(item.id)"
          :key="item.id"
        >
          {{ item.name }}
        </li>
      </ul>
      <ul class="sex">
        <li
          :class="{ active: item.id === sexid }"
          v-for="item in type"
          @click="sexAcitve(item.id)"
          :key="item.id"
        >
          {{ item.name }}
        </li>
      </ul>
      <ul class="char">
        <li
          :class="{ active: item.id === charid }"
          v-for="item in initial"
          @click="charAcitve(item.id)"
          :key="item.id"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="songer-conten">
      <figure
        v-for="item in artists"
        :key="item.id"
        @click="getSongerId(item.id)"
      >
        <img :src="item.img1v1Url" alt="" />
        <figcaption>
          <span>{{ item.name }}</span>
          <strong>单曲数{{ item.musicSize }}</strong>
        </figcaption>
      </figure>
      <div class="load-bottom" ref="loadBottom">
        <div class="loading flex-column">
          <div class="loader"></div>
          <span>~努力加载中~</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {

    this.$axios
      .get("/artist/list", {
        params: {
          limit: 30,
          type: this.sexid,
          area: this.countryid,
          initial: this.charid,
        },
      })
      .then((result) => {
        // console.log(result.artists);
        this.artists = result.artists;
      })
      // .catch((err) => {
      //   console.log(err);
      // });
  },
  mounted() {
    window.addEventListener("scroll", this.scrollMore);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollMore);
  },
  data() {
    return {
      // allplaylist:[],
      load: false,
      page: 1,
      scroll: "",
      before: 0,
      next: 12,
      allsong: [],
      countryid: -1,
      sexid: -1,
      charid: -1,
      artists: [],
      area: [
        {
          id: -1,
          name: "全部",
        },
        {
          id: 7,
          name: "华语",
        },
        {
          id: 96,
          name: "欧美",
        },
        {
          id: 8,
          name: "日本",
        },
        {
          id: 16,
          name: "韩国",
        },
        {
          id: 0,
          name: "其他",
        },
      ],
      type: [
        {
          id: -1,
          name: "全部",
        },
        {
          id: 1,
          name: "男歌手",
        },
        {
          id: 2,
          name: "女歌手",
        },
        {
          id: 3,
          name: "乐队",
        },
      ],
      initial: [
        {
          id: -1,
          name: "热门",
        },
        {
          id: "a",
          name: "A",
        },
        {
          id: "b",
          name: "B",
        },
        {
          id: "c",
          name: "C",
        },
        {
          id: "d",
          name: "D",
        },
        {
          id: "e",
          name: "E",
        },
        {
          id: "f",
          name: "F",
        },
        {
          id: "g",
          name: "G",
        },
        {
          id: "h",
          name: "H",
        },
        {
          id: "i",
          name: "I",
        },
        {
          id: "j",
          name: "J",
        },
        {
          id: "k",
          name: "K",
        },
        {
          id: "l",
          name: "L",
        },
        {
          id: "m",
          name: "M",
        },
        {
          id: "n",
          name: "M",
        },
        {
          id: "o",
          name: "O",
        },
        {
          id: "p",
          name: "P",
        },
        {
          id: "q",
          name: "Q",
        },
        {
          id: "r",
          name: "R",
        },
        {
          id: "s",
          name: "S",
        },
        {
          id: "t",
          name: "T",
        },
        {
          id: "u",
          name: "U",
        },
        {
          id: "v",
          name: "V",
        },
        {
          id: "w",
          name: "W",
        },
        {
          id: "x",
          name: "X",
        },
        {
          id: "y",
          name: "Y",
        },
        {
          id: "z",
          name: "Z",
        },
        {
          id: "#",
          name: "其他",
        },
      ],
    };
  },

  methods: {
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
            .get("/artist/list", {
              params: {
                limit: 30,
                type: this.sexid,
                area: this.countryid,
                initial: this.charid,
                offset: (this.page - 1) * 30,
              },
            })
            .then((result) => {
              // console.log(result.artists);
              this.load=false
              this.artists =this.artists.concat(result.artists.slice(0,12)) ;
            })
            // .catch((err) => {
            //   console.log(err);
            // });
        }, 2000);
      }
    },

    countryAcitve: function(e) {
      this.countryid = e;
      // console.log(e);
      this.$axios
        .get("/artist/list", {
          params: {
            limit: 30,
            type: this.sexid,
            area: this.countryid,
            initial: this.charid,
          },
        })
        .then((result) => {
          // console.log(result.artists);
          this.artists = result.artists;
        })
        // .catch((err) => {
        //   console.log(err);
        // });
    },
    sexAcitve: function(e) {
      this.sexid = e;
      // console.log(e);
      this.$axios
        .get("/artist/list", {
          params: {
            limit: 30,
            type: this.sexid,
            area: this.countryid,
            initial: this.charid,
          },
        })
        .then((result) => {
          // console.log(result.artists);
          this.artists = result.artists;
        })
        // .catch((err) => {
        //   console.log(err);
        // });
    },
    charAcitve: function(e) {
      this.charid = e;
      // console.log(e);
      this.$axios
        .get("/artist/list", {
          params: {
            limit: 30,
            type: this.sexid,
            area: this.countryid,
            initial: this.charid,
          },
        })
        .then((result) => {
          // console.log(result.artists);
          this.artists = result.artists;
        })
        // .catch((err) => {
        //   console.log(err);
        // });
    },
    getSongerId: function(e) {
      // console.log(e);
      // console.log(this.$store);
      this.$store.commit("details", e);
      this.$router.push("/Details");
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  max-width: 1380px;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.active {
  background: #fa2800;
  font-weight: 700;
  color: #fff;
}
.songer {
  position: relative;
  padding-top: 70px;
  .songer-index {
    ul.country {
      display: flex;
      margin-top: 20px;
      margin-bottom: 20px;
      li {
        width: auto;
        padding: 0 15px;
        // width: 56px;
        height: 28px;
        line-height: 29px;
        font-size: 13px;
        text-align: center;
        border-radius: 14px;
        cursor: pointer;
        margin-right: 6px;
      }
    }

    ul.sex {
      display: flex;
      margin-top: 20px;
      margin-bottom: 20px;
      li {
        width: auto;
        padding: 0 15px;
        // width: 56px;
        height: 28px;
        line-height: 29px;
        font-size: 13px;
        text-align: center;
        border-radius: 14px;
        cursor: pointer;
        margin-right: 6px;
      }
    }

    ul.char {
      display: flex;
      margin-top: 20px;
      margin-bottom: 20px;
      li {
        width: auto;
        padding: 0 15px;
        // width: 56px;
        height: 28px;
        line-height: 29px;
        font-size: 13px;
        text-align: center;
        border-radius: 14px;
        cursor: pointer;
        margin-right: 6px;
      }
    }
  }
  .songer-conten {
    display: flex;
    flex-wrap: wrap;
    margin: 30px -15px 0;
    figure {
      max-width: 10%;
      padding: 0 15px 30px;
      flex: 0 0 10%;

      img {
        width: 108px;
        height: 108px;
        border-radius: 50%;
      }
      &:hover {
        color: #fa2800;
      }
      figcaption {
        display: flex;
        flex-direction: column;
        text-align: center;
        span {
          font-weight: 700;
          font-size: 14px;
          line-height: 18px;
          word-break: break-word;
        }

        strong {
          font-size: 12px;
          margin-top: 10px;
          color: #fa2800;
        }
      }
    }
  }
  .load-bottom {
    width: 100%;
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
}
</style>
