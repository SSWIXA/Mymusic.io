<!-- 歌手详情页 -->
<template>
  <div class="details">
    <div class="details-top">
      <div class="top-mask">
        <div class="top-content flex-center flex-column">
          <div class="personimg transition">
            <img :src="songerdata.artist.cover" alt="" />
          </div>
          <p>{{ songerdata.artist.name }}</p>
          <div class="attention flex-center transition">关注TA</div>
          <div class="personmsg">{{ songerdata.artist.briefDesc }}</div>
          <ul class="musicsize flex-center">
            <li v-for="item in size" :key="item.id">
              <p class="num">{{ item.size }}</p>
              <p class="title">{{ item.name }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="bottom-trangle"></div>
    </div>
    <div class="details-und container">
      <div class="content">
        <div class="artist-box">
          <div class="tool-head">
          </div>
          <table class="artist-table">
            <thead class="table-head">
              <tr>
                <th v-for="item in thhead" :key="item.id">{{ item.name }}</th>
              </tr>
            </thead>
            <tbody class="table-body">
              <tr v-for="(item, index) in songs" :key="item.id">
                <td>
                  <div class="index-container flex-center">
                    <i class="el-icon-video-pause"></i
                    ><i class="el-icon-video-play" @click="playing(item)"></i
                    ><span class="index-text">{{ index }}</span>
                  </div>
                </td>
                <td>
                  <div class="name-container">
                    <div class="avatar"><img :src="item.songpic" alt="" /></div>
                    <span>{{ item.songname }}</span>
                  </div>
                </td>
                <td>
                  <p>{{ item.songar }}</p>
                </td>
                <td>
                  <p>{{ item.songal }}</p>
                </td>
                <td>
                  <p>{{ item.songdt }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
   
  </div>
</template>
<script>
export default {
  created() {
    this.$axios
      .get("/artist/detail", {
        params: {
          id: this.$store.state.idstatus,
        },
      })
      .then((result) => {
        // console.log(this.$store.state.idstatus)
        // console.log(result.data.artist);
        if (!(result.data.artist.musicSize === undefined)) {
          let data = result.data.artist.musicSize;
          // console.log(result.data.artist.musicSize);
          // console.log(this.size);
          this.size.push({
            size: data,
            name: "单曲数",
          });
        }
        if (!(result.data.artist.albumSize === undefined)) {
          // console.log(result.data.artist.albumSize);
          let data = result.data.artist.albumSize;
          this.size.push({
            size: data,
            name: "专辑数",
          });
        }
        if (!(result.data.artist.mvSize === undefined)) {
          let data = result.data.artist.mvSize;
          // console.log(result.data.artist.mvSize);
          this.size.push({
            size: data,
            name: "MV数",
          });
        }

        this.songerdata = result.data;
      })
      // .catch((err) => {
      //   console.log(err);
      // });
    this.$axios
      .get("/artist/top/song", {
        params: {
          id: this.$store.state.idstatus,
          limit: 51,
        },
      })
      .then((result) => {
        // console.log(result.songs);
        //歌手歌单处理
        result.songs.forEach((item) => {
          // console.log(item);
          let songid = item.id;
          let picurl = item.al.picUrl;
          let songname = item.name;
          let songar = item.ar
            .map((item) => {
              // console.log(item.name);
              return item.name;
            })
            .toString()
            .split(",")
            .join("/");
          let songal = item.al.name;
          let songdt = this.computetimer(item.dt);

          this.songs.push({
            songpic: picurl,
            songar: songar,
            songname: songname,
            songal: songal,
            songdt: songdt,
            songid: songid,
          });
        });
      })
      // .catch((err) => {
      //   console.log(err);
      // });
  },
  data() {
    return {
      songs: [],
      licurrent: "songs",
      songerabout: [
      ],
      thhead: [
        {
          id: "index",
          name: "序号",
        },
        {
          id: "song",
          name: "歌曲",
        },
        {
          id: "songer",
          name: "歌手",
        },
        {
          id: "album",
          name: "专辑",
        },
        {
          id: "timeout",
          name: "时长",
        },
      ],
      size: [],
      songerdata: {
        artist: {
          cover: "",
        },
      },
    };
  },

  methods: {
    //点击播放音乐
    playing: async function(e) {
      // console.log(e.songid);
      let arr=[]
      let player = true;
      // this.$refs.player.style.display=flex

      let data = await this.$axios.get("/song/url", {
        params: {
          id: e.songid,
        },
      });
      let music = {
        title: e.songname,
        artist: e.songar,
        src: data.data[0].url,
        pic: e.songpic,
      };
      arr.push(player,music)
      this.$store.commit("playerstate",arr)
    },
    changeTab: function(e) {
      // console.log(e);
      this.licurrent = e;
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
};
</script>
<style lang="less" scoped>
.details {
  padding-top: 70px;
  width: 100vw;
  position: relative;
  .details-top {
    position: relative;
    width: 100vw;
    height: 580px;
    background: url("../assets/detailsbg.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    .top-mask {
      width: 100vw;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      .top-content {
        height: 100%;
        position: relative;
        margin: 0 auto;
        padding-top: 10px;
        text-align: center;
        z-index: 2;

        justify-content: center;
        .personimg {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          position: relative;
          overflow: hidden;
          img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: #fff;
            border: 3px solid rgba(255, 255, 255, 0.6);
          }
        }

        p {
          margin-top: 20px;
          font-size: 24px;
          font-weight: 700;
          color: #fff;
          line-height: 24px;
        }

        .attention {
          margin: 24px 0 30px;
          padding: 0;
          height: 36px;
          width: 96px;
          font-size: 12px;
          line-height: 36px;
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.6);
          cursor: pointer;
          border-radius: 18px;
        }

        .personmsg {
          margin: 0 auto 24px;
          width: 740px;
          height: 48px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 24px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          font-weight: 700;
        }

        ul.musicsize {
          margin: 0 auto;
          width: 100%;
          li {
            margin: 0 50px;
            text-align: center;
            font-size: 14px;
            .num {
              margin-bottom: 8px;
              font-size: 24px;
              line-height: 24px;
              font-weight: 100;
              color: #fff;
            }
            .title {
              margin-top: 20px;
              color: #fff;
              line-height: 24px;
              font-size: 14px;
            }
          }
        }
      }
    }

    .bottom-trangle {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 137px;
      background: url("../assets/detailstog.png");
      background-position: center;
      z-index: 1;
    }
  }

  .details-und {
    .nav {
      margin: 30px 0;
      .nav-item {
        margin: 0 20px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
      }
    }
    .content {
      .artist-box {
        width: 100%;
        .tool-head {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin: 15px 0;
          .item {
            background: #f2f2f2;
            color: #333;
            padding: 7px 15px;
            border-radius: 50px;
            cursor: pointer;
            margin-left: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.4s;
          }
          .play-item {
            background: #fa2800;
            color: #fff;
          }
        }
        .artist-table {
          border-collapse: collapse;
          border-spacing: 0;
          table-layout: fixed;
          width: 100%;
          .table-head {
            width: 100%;
            height: 50px;
            line-height: 50px;
            background: #fafafa;
            color: #999;
            tr {
              th {
                font-size: 14px;
                padding: 0 9px;
                text-align: left;
                font-weight: 300;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                &:nth-child(1) {
                  width: 10%;
                  text-align: center;
                }
                &:nth-child(2) {
                  width: 40%;
                }
                &:nth-child(3) {
                  width: 40%;
                }
                &:nth-child(4) {
                  width: 15%;
                }
                &:nth-child(5) {
                  width: 15%;
                  text-align: right;
                  padding-right: 40px;
                }
              }
            }
          }
          .table-body {
            tr {
              &:nth-child(2n) {
                background: #f7f7f7;
              }
              &:hover {
                background: #e8e9ed;
                td {
                  &:first-child {
                    .index-text {
                      display: none;
                    }
                    .el-icon-video-play {
                      color: red;
                      display: block;
                    }
                  }
                }
              }

              height: 50px;
              line-height: 50px;
              transition: background-color 0.2s linear;
              td {
                font-size: 14px;
                padding: 0 9px;
                text-align: left;
                font-weight: 300;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                vertical-align: top;
                .name-container {
                  display: flex;
                  align-items: center;
                  .avatar {
                    width: 35px;
                    height: 35px;
                    border-radius: 5px;
                    flex-shrink: 0;
                    margin-right: 10px;
                    img {
                      width: 35px;
                      height: 35px;
                      border-radius: 5px;
                    }
                  }
                }
                &:first-child {
                  position: relative;

                  .el-icon-video-pause {
                    display: none;
                    position: absolute;
                    top: 20px;
                    font-size: 20px;
                    left: 47px;
                  }
                  .el-icon-video-play {
                    display: none;
                    position: absolute;
                    font-size: 20px;
                    top: 20px;
                    left: 47px;
                  }
                }
                &:last-child {
                  text-align: right;
                  padding-right: 35px;
                  position: relative;
                }
              }
            }
          }
        }
      }
    }
  }
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.transition {
  -webkit-transition: all 0.15s ease-in-out;
}
.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container {
  max-width: 1380px;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.active {
  color: #fa2800;
}
</style>
