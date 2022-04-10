# 网易云pc端项目

### 项目支持

- Vue
- Vue-cli
- Element-UI
- Axios
- vue-aplayer
- Vuex
- Vue-router
- swiper

### 项目初始化

1. vue create cloud-music
2. npm init-y
3. 配置Vue-router 
4. 配置Axios
5. 配置 Element-UI组件库
6. 配置 swiper 插件
7. 配置vue-aplayer
8. 初始化远程仓库

### [部分效果预览地址](http://119.29.133.61/music/) 

### [网易云在线接口地址](https://nicemusic-api.lxhcool.cn/)

### [网易云本地API远程仓库](https://github.com/Binaryify/NeteaseCloudMusicApi)

### 模块划分

| 网易云音乐pc端    | 负责人 |
| :---------------- | ------ |
| 发现音乐/歌单详情 | 曾宪发 |
| 歌手/歌手详情     | 谢宜嘉 |
| mv/mv详情         | 方芳   |
| 歌单              | 章其琛 |
| 排行榜            | 李庆辉 |



### 功能模块

------

> 本项目的目的是开发一个可以播放主流的音乐文本，及相关MV格式的播放器。设计的主要实现功能是播放MP3，MP5等格式的音频，并且能控制播放，暂停，停止，音量控制，歌曲列表文件的渲染，及相关歌手的信息描述，不同种类音乐，和mv间的切换

#### 发现音乐

------

##### 流程：

1. banner图的实现
2. 不同分区的页面渲染
3. 样式的处理优化

##### 代码：

```js
//banner图的部分代码
created() {
   this.$axios.get('/banner',).then(res=>{
       console.log(res.banners)
       this.Banner=res.banners
   })
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    new Swiper ('.swiper-container', {
    loop: true, // 循环模式选项
    slidesPerView : 3,
  slidesPerGroup : 3,
    
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
  })  
},
//分区的部分代码
  handClick:function(id){
        this.$store.commit("LIST",id)
        this.$router.push('/index')
      },
      handTime:function(e){
        let time = parseInt(e/10000)+"万"
        return time
      }
 this.$axios.get('/personalized',{
           params:{
               limit:24
           }
       }).then(res=>{
           this.list=res.result
           console.log(res.result[0].playCount)
           res.result.map(item=>{
            item.playCount=this.handTime(item.playCount)
           })
       })
 this.$axios.get('/top/artists',{
          params:{
              limit:30
          }
      }).then(res=>{
          this.singer=res.artists
      })
  this.$axios.get('/personalized/newsong').then(res=>{
          this.song=res.result;
          console.log(res.result)
          this.time=res.result.map(item=>{
            item.song.duration=this.computetimer(item.song.duration)
          })
      });
```

##### 视图

![image-20210127210713927](C:\Users\xieyijia\AppData\Roaming\Typora\typora-user-images\image-20210127210713927.png)

![image-20210127210745282](C:\Users\xieyijia\AppData\Roaming\Typora\typora-user-images\image-20210127210745282.png)

#### 歌单详情页

##### 流程：

1. 从vuex里获取歌单id状态
2. 通过的得到的参数进行数据的不同接口的请求与转换
3. 渲染页面数据

##### 代码：

```js
 this.$axios
      .get("/playlist/detail", {
        params: {
          id: this.$store.state.id,
        },
      })
      .then((res) => {
        this.recommend = res.playlist;
        this.recommendId=res.playlist.trackIds.map(item=>{
          return item.id
         })
            this.recommendId.map(iten=>{
          this.$axios.get('song/detail',{
            params:{
              ids:iten
            }
          }).then(res=>{
            this.recommendSong.push(res)
            res.songs.map(item=>{            
             res.songs[0].dt=this.computetimer(item.dt)
            })
          })
          
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
        this.recommendRemark=res.comments
      });
```

##### 视图

![image-20210127211437945](C:\Users\xieyijia\AppData\Roaming\Typora\typora-user-images\image-20210127211437945.png)

#### 歌手

##### 流程

1. 发送接口请求歌手数据
2. 对数据出路优化
3. 实现歌手类别分类
4. 存储歌手id状态

##### 代码

```js
 countryAcitve: function(e) {
      this.countryid = e;
      console.log(e);
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
          console.log(result.artists);
          this.artists = result.artists;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sexAcitve: function(e) {
      this.sexid = e;
      console.log(e);
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
          console.log(result.artists);
          this.artists = result.artists;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    charAcitve: function(e) {
      this.charid = e;
      console.log(e);
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
        .catch((err) => {
          console.log(err);
        });
    },
    getSongerId: function(e) {
      // console.log(e);
      // console.log(this.$store);
      this.$store.commit("details", e);
      this.$router.push("/Details");
    },
  },
};
```

##### 图示

![image-20210128160630623](C:\Users\xieyijia\AppData\Roaming\Typora\typora-user-images\image-20210128160630623.png)

#### MV

##### 流程

1. 请求数据接口
2. 对数据做相关的优化处理
3. 添加数据懒加载
4. 板块分类功能
5. 存储相关数据

##### 代码

```js
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
          console.log(this.id);
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
```

##### 图示

![image-20210128161117849](C:\Users\xieyijia\AppData\Roaming\Typora\typora-user-images\image-20210128161117849.png)

![image-20210128161139327](C:\Users\xieyijia\AppData\Roaming\Typora\typora-user-images\image-20210128161139327.png)

#### 歌单

##### 流程

1. 接口数据获取
2. 数据优化处理
3. 页面布局渲染
4. 歌单页面跳转处理

##### 代码

```js
 Show(){
        this.isShow = !this.isShow       
      },
      getSongList(){
      
      }, 
      getNewSong:function(id){
       console.log (id)  
        this.$store.commit("LIST",id)
        this.$router.push('/index')
      },
      handTime:function(e){
        let time = parseInt(e/10000)+"万" 
        return time 
      }    
  },
  created(){
         this.$axios.get("https://nicemusic-api.lxhcool.cn/top/playlist?order=hot&cat=全部",{
           
         }).then((result)=>{
          this.code=result.playlists;
       
          result.playlists.map(item=>{
            item.playCount = this.handTime(item.playCount)
            this.codeID.push(item.id)
          })
         
            
         })
  },
 
```

##### 图示

![image-20210128161721932](C:\Users\xieyijia\AppData\Roaming\Typora\typora-user-images\image-20210128161721932.png)

#### 排行榜

##### 流程

1. 数据渲染

##### 代码

```js
<template>
    <div class="fluid">
        
        <div class="container">
            <!--云音乐特色榜-->
                <div class="module">
                    <h2 class="flex-row"><span class="span1"></span>
                        云音乐特色榜
                        </h2>
                        <div class="class1">
                            <div class="class2">
                            <a href=""><img src="../assets/img/a1.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">飙升榜</h3>
                            </div>
                            <div class="class2">
                            <a href=""><img src="../assets/img/a2.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">新歌榜</h3>
                            </div>
                            <div class="class2">
                            <a href=""><img src="../assets/img/a3.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">原创榜</h3>
                            </div>
                            <div class="class2">
                            <a href=""><img src="../assets/img/a4.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">热歌榜</h3>
                            </div>
                            </div>
                    </div>
            <!--全球媒体榜单-->
                <div class="module2">
                    <h2 class="flex-row"><span class="span1"></span>
                        全球媒体榜 
                        </h2>
                        <div class="class1">
                            <div class="class2">
                            <a href=""><img src="../assets/img/1.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">黑胶VIP爱听榜</h3>
                            </div>
                            <div class="class2">
                            <a href=""><img src="../assets/img/2.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">云音乐说唱榜</h3>
                            </div>
                            <div class="class2">
                            <a href=""><img src="../assets/img/3.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">云音乐古典榜</h3>
                            </div>
                            <div class="class2">
                            <a href=""><img src="../assets/img/4.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">云音乐电音榜</h3>
                            </div>
                            <div class="class2">
                            <a href=""><img src="../assets/img/5.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">抖音排行榜</h3>
                            </div>
                            <div class="class2">
                            <a href=""><img src="../assets/img/6.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">云音乐ACG榜</h3>
                            </div>
                            <div class="class2">
                            <a href=""><img src="../assets/img/7.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">云音乐韩语榜</h3>
                            </div>
                            <div class="class2">
                            <a href=""><img src="../assets/img/8.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">云音乐国电榜</h3>
                            </div>
                            </div>

                            <div class="class1">
                            <div class="class2">
                            <a href=""><img src="../assets/img/9.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">UK排行榜周榜</h3>
                            </div>
                            <div class="class2">
                            <a href=""><img src="../assets/img/10.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">美国Bilboard榜</h3>
                            </div>
                            <div class="class2">
                            <a href=""><img src="../assets/img/11.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">Beatport电子舞曲榜</h3>
                            </div>
                            <div class="class2">
                            <a href=""><img src="../assets/img/12.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">KTV唛榜</h3>
                            </div>
                            <div class="class2">
                            <a href=""><img src="../assets/img/13.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">iTunes榜</h3>
                            </div>
                            <div class="class2">
                            <a href=""><img src="../assets/img/14.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">日本Oricon榜</h3>
                            </div>
                            <div class="class2">
                            <a href=""><img src="../assets/img/15.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">云音乐欧美热歌榜</h3>
                            </div>
                            <div class="class2">
                            <a href=""><img src="../assets/img/16.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">云音乐欧美新歌榜</h3>
                            </div>
                            </div>

                            <div class="class1">
                            <div class="class2">
                            <a href=""><img src="../assets/img/17.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">发过 NRJ Vos Hits 周榜</h3>
                            </div>
                            <div class="class2">
                            <a href=""><img src="../assets/img/18.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">云音乐ACG游戏榜</h3>
                            </div>
                            <div class="class2">
                            <a href=""><img src="../assets/img/19.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">云音乐ACG VOCALOID榜</h3>
                            </div>
                            <div class="class2">
                            <a href=""><img src="../assets/img/20.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">中国新相册音乐排行榜</h3>
                            </div>
                            <div class="class2">
                            <a href=""><img src="../assets/img/21.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">云音乐日语榜</h3>
                            </div>
                            <div class="class2">
                            <a href=""><img src="../assets/img/22.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">云音乐摇滚榜</h3>
                            </div>
                            <div class="class2">
                            <a href=""><img src="../assets/img/23.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">云音乐摇滚榜</h3>
                            </div>
                            <div class="class2">
                            <a href=""><img src="../assets/img/24.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">云音乐古风榜</h3>
                            </div>
                            </div>
                            
                            <div class="class1">
                            <div class="class2">
                            <a href=""><img src="../assets/img/25.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">潜力爆款榜</h3>
                            </div>
                            <div class="class2">
                            <a href=""><img src="../assets/img/26.png"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">云音乐民谣榜</h3>
                            </div>
                            
                            </div>
                    </div>
            </div>
            
        </div>
</template>
```

#### 其他板块

1. ##### 歌单详情页

2. ##### 歌手详情页

3. ##### mv详情页

