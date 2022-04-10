<!-- 网易云主页 -->
<template>
  <div class="home">
    <music-header></music-header>
    <router-view></router-view>
    <music-foot></music-foot>
    <Aplayer autoplay v-if="player" :music="music" />
  </div>
</template>

<script>
import Aplayer from "vue-aplayer";
import MusicHeader from "../components/MusicHeader.vue";
import MusicFoot from "../components/MusicFoot.vue";
// import { mapState } from "vuex"
export default {
  data() {
    return {};
  },
  // computed:mapState(['player','music']),
  computed:{
    player:function(){
      return this.$store.state.player;
    },
    music:function(){
      return this.$store.state.music;
    }
  },
  components: {
    "music-header": MusicHeader,
    "music-foot": MusicFoot,
     Aplayer,
  },
  methods: {},
  // beforeUpdate() {
  //   console.log("========"+this.$store.state.player)
  // },
};
</script>
<style lang="less" scoped>
.home {
  height: 100vh;
  width: 100vw;
  ::v-deep {
  .aplayer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 15px;
    z-index: 888;
  }
}
}
</style>
