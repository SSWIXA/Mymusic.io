<template>
  <div id="outbox">
    <div class="nav">
      <div class="mid">
          <div class="fast">热门标签：</div>
        <div class="mid-list" 
        @click = "getSongList(item.tag)"
        v-for="item in lists" 
        :key="item.id"
        :class="{  active: item.tag === list }"
        >
          {{ item.tag }}
        </div>
      </div>
    </div>
    <div class="inner">
      <div class="inner-list" v-for = "item in code" v-bind:key="item.id"
      @click="getNewSong(item.id)"
      >
        <img :src="item.coverImgUrl" alt="" />
        <div class="changeclolor"></div>
        <div class="changeclolor2"></div>
        <div class="num">
          <p>🎧 {{item.playCount}}</p>
        </div>
        <div class="text">
          <p>{{item.name}}</p>
        </div>
      </div>    
    </div>
  </div>
</template>

<script>

export default {
 
  data() {
    return {
      code:[],
      list:-1,
      lists: [
        {id:"1",tag:"华语"},
        {id:"2",tag:"流行"},
        {id:"3",tag:"摇滚"},
        {id:"4",tag:"民谣"},
        {id:"5",tag:"电子"},
        {id:"6",tag:"轻音乐"},
        {id:"7",tag:"综艺"},
        {id:"8",tag:"影视原声"},
      ], 
       show : false,  
       codeID:[]
    };    
  },
   methods:{
      /*  isShow(){
        this.Show = !this.Show       
      }, */
      getSongList:function(e){
      this.list=e
      console.log(this.list)
      this.$axios.get("https://nicemusic-api.lxhcool.cn/top/playlist",{
        params: {
            cat: this.list,
          },
      }).then((result)=>{
          this.code=result.playlists
      })
      }, 
      getNewSong:function(id){
      //  console.log (id)  
        this.$store.commit("LIST",id)
        this.$router.push('/index')
      },
      handTime:function(e){
        if(e < 100000){
          return e 
        } else if (e > 100000 && e < 100000000) {
           let time = parseInt(e/10000)+"万" 
          return time 
        } else {
           let times = parseInt(e/100000000)+"亿" 
          return times 
        }
       
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
 
 
}
 
</script>
 
<style>
* {
  margin: 0;
  padding: 0;
}
html,
body {
  background: #eff0f1;
}
#outbox {
  padding-top: 70px;
  width: 1350px;
  margin: auto;
}
.active {
  font-weight: 700;
  color: #fff;
}
.nav {
  width: 1350px;
  height: 40px;
  background: #fdfdfd;
  display: flex;
  margin-top:20px;
}
.inner {
  width: 1350px;
  height:850px;
  background:  #fdfdfd;
  margin-top: 24px;
  display:flex;
  justify-content:space-between;
  flex-wrap: wrap;
  box-sizing: border-box;
  overflow:hidden;
 
}
.inner-list {
  width: 142px;
  height: 215px;
  background: #fdfdfd;
  position: relative;
  cursor: pointer;
 
}
.inner-list :nth-child(2) {
  width: 5px;
  height: 113px;
  background: #d9d9d9;
  position: absolute;
  left: 133px;
  top: 10px;
  border-radius: 1px;
}
.inner-list :nth-child(3) {
  width: 3px;
  height: 97px;
  background: #eeefef;
  position: absolute;
  left: 137px;
  top: 18px;
  border-radius: 1px;
}
.inner-list img {
  width: 133px;
  height: 136px;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 5px;
  cursor: pointer;
}
.inner-list:hover .changeclolor {
  left: 134px;
  background: #fedfe9;
}
.inner-list:hover .changeclolor2 {
  left: 138px;
  background: #fff4f2;
}
.num { 
  height: 16px;
  border-radius: 0 5px 0 5px;
  background: black;
  position: absolute;
  top: 9px;
  right: 18px;
  color: white;
  font-size: 12px;
}
.text {
  width: 130px;
  height: 30px;
  position: absolute;
  bottom: 33px;
  left: 5px;
  color: black;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
}
.showIn {
  width: 90px;
  height: 40px;
  background: red;
  border-radius: 5px 0 5px 5px;
  text-align: center;
  line-height: 40px;
  color: white;
  font-size: 14px;
  display: flex;
  box-sizing: border-box;
  padding: 0 15px;
  cursor: pointer;
}
.showIn :nth-child(1) {
  margin-right: 10px;
}
.mid {
  width: 650px;
  height: 40px;
  background: #fdfdfd;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-left: 10px;
}
.mid-list {
  color: black;
  cursor: pointer;
}
.mid-list:hover {
  color: rgb(165, 152, 152);
}
.right {
  width: 100px;
  height: 26px;
  display: flex;
  margin-top: 7px;
  margin-left: 460px;
  justify-content: space-between;
}
.right :nth-child(1) {
  width: 44px;
  height: 26px;
  background: red;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  text-align: center;
  line-height: 26px;
  cursor: pointer;
}
.right :nth-child(2) {
  width: 44px;
  height: 26px;
  background: #ccc;
  border-radius: 4px; 
  color: white;
  font-size: 14px;
  text-align: center;
  line-height: 26px;
  cursor: pointer;
}
.show-list{
    width:720px;
    height:390px;
    background:hotpink;
    position:absolute;
    top:150px;
    z-index: 999;
    border-radius: 10px;
}
.red{
    color:red;
}
.fade-enter-active,.fade-enter-to{
       /*  transform: translateY(-10px); */
        transition: all .5s linear;
    }
    .fade-leave-active{
       
        transition:all .5s cubic-bezier(1.0.0.5,0.8,1.0);
    }
    .fade-enter,.fade-leave-to{
        transition: all .5s linear;
        transform: translateY(10px);
       
        opacity: 0;
    }

</style>