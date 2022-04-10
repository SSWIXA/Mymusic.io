<!-- ranklist -->
<!-- 排行榜部分 -->
<template>
    <div class="fluid">
        
        <div class="container">
            <!--云音乐特色榜-->
                <div class="module">
                    <h2 class="flex-row"><span class="span1"></span>
                        云音乐特色榜
                        </h2>
                        <div class="class1">
                            <div class="class2" v-for="(item,index) in ranklist"  :key="index" @click="handClick(item.id)">
                            <a href="#"><img :src="item.coverImgUrl"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">{{item.name}}</h3>
                            </div>
                        </div>
                </div>
            <!--全球媒体榜单-->
                <!-- <div class="module2">
                    <h2 class="flex-row"><span class="span1"></span>
                        全球媒体榜 
                        </h2>
                        <div class="class1">
                            <div class="class2" v-for="(item,index) in ranklistone"  :key="index" @click="handClick(item.id)">
                            <a href="#"><img :src="item.coverImgUrl"></a><p class="p11"></p><p class="p22"></p><p class="p33"></p><p class="p44"></p>
                            <h3 class="h31">{{item.name}}</h3>
                            </div>
                        </div>
                </div> -->
            </div>
        </div>
</template>
<script>
export default {
  data() {
    return {
        ranklist:[],
    };
  },
  computed:{
    
  },
  components: {
    
  },
  methods: {
      handClick:function(id){
        //   console.log(id);
          this.$store.commit("LIST",id)
          this.$router.push('/index')
      }
  },
 //生命周期 当前可以访问this
  created() {
      this.$axios.get('/toplist/detail').then(res=>{
        //   console.log(res.list)
          this.ranklist=res.list
          
      })
  },

};
</script>
<style lang='less' scoped>
    .fluid{
        background: #f5f5f6;
        padding: 20px 0;
    }
    .container{
        padding-top: 70px;
        max-width: 1380px;
        // width: 100%;
        // padding-right: 15px;
        // padding-left: 15px;
        // margin-right: auto;
        margin: 0 auto;
    }
    .module{
        box-sizing: border-box;
        margin-bottom: 2px;
    }
    .span1{
        width: 3px;
        height: 20px;
        background: #f62700;
        margin-right: 12px;
    }
    .flex-row{
        display: flex;
        font-weight: bold;
        color: #494949;
        font-size: 15px;
        margin-bottom: 19px;
    }
    .class1{
        display: flex;
        flex-wrap: wrap;
    }
    .h31{
        display: flex;
        line-height: 49px;
        font-size: 14px;
        color: #000;
        width: 190px;
    }
    .class2 img{
        float: left;
        width: 132.5px;
        height: 132.5px;
    }
    .class2{
        margin-bottom: 14px;
        position: relative;
    }

    .p11{
        width: 4px;
        height: 113px;
        background: #d9d9d9;
        // position: absolute;
        float: left;
        margin-top: 10px;
    }
    .p22{
        width: 2px;
        height: 97px;
        background: #ececec;
        float: left;
        margin-top: 18px;
    }
    .p33{
        position: absolute;
        width: 6px;
        height: 113px;
        background: #fedfd9;
        top: 10px;
        float: left;
        left: 133px;
        display: none;
    }
    .p44{
        position: absolute;
        width: 4px;
        height: 97px;
        background: #fff4f2;
        top: 18px;
        float: left;
        left: 139px;
        display: none;
    }
    .class2:hover .p33{
        display: block;
    }
    .class2:hover .p44{
        display: block;
    }
</style>

