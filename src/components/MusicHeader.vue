<!-- 头部部分 -->
<template>
  <div class="music-header ">
    <div class="header-content container shadow">
      <div class="content-left">
        <div class="logo"><img src="@/assets/logo.png" alt="" /></div>
        <ul class="nav">
          <li
            :class="{ current: active === item.id }"
            @click="changeCurrent(item.id)"
            v-for="item in navdata"
            :key="item.id"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$router.push('/findmusic')
  },
  data() {
    return {
      active: "findmusic",
      navdata: [
        {
          id: "findmusic",
          name: "发现音乐",
        },
        {
          id: "ranklist",
          name: "排行榜",
        },
        {
          id: "songlist",
          name: "歌单",
        },
        {
          id: "songer",
          name: "歌手",
        },
        {
          id: "movie",
          name: "MV",
        },
      ],
    };
  },

  methods: {
    changeCurrent: function(e) {
      this.active = e;
       let arr=[false,{}]
      this.$store.commit("playerstate", arr);
      this.$router.push("/"+e)
    },
  },
};
</script>
<style lang="less" >
.container {
  max-width: 1380px;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.music-header {
  position: fixed;
  width: 100vw;
  background: #fff;
  z-index: 999;

  .header-content.container {
    display: flex;
    justify-content: space-between;
    height: 70px;
    align-items: center;
    font-size: 14px;

    .content-left {
      display: flex;
      align-items: center;
      .logo {
        margin-right: 30px;
      }
      ul.nav {
        display: flex;

        li {
          cursor: pointer;
          height: 40px;
          line-height: 40px;
          padding: 0 15px;
        }
      }
    }
    .content-right{
      display: flex;
    }
  }
}
.current {
  position: relative;
  color: red;
}
.current::after {
  content: "•";
  position: absolute;
  font-size: 16px;
  left: 48%;
  top: 20px;
  height: 0;
  color: red;
}
</style>
