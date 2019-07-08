<template>
    <div class="Order">
        
        <div  class="max_order">
            <div class="find_search" >
                <img src="/static/images/user/find.png" class="find" v-if="status"/>
                <input type="text" placeholder="请输入关键词进行搜索" v-model="mobile" class="inputzhi" v-on:input="change"/>
            </div>
            <!-- <span>取消</span> -->
            <!-- to='/Home/searchdetail' -->
            <div class="sousuo" @click="qu" >搜索</div>
            <p class="hids">历史记录</p>
            <div class="history">
                <span class="history_item" @click = "clickfun($event)" v-for="(item,index) in yi" :key="index">{{item.keyword}}</span>
            </div>
        </div>



    </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'search',
    components: {
        TopHeader
    },
    data(){
        return{
          status:true,
          mobile:'',
          yi:[]
        }
    },
    mounted(){
        this.$axios({
                    method:'post',
                    url: '/goods/search_history',
                    data: {
                      'token':this.$store.state.token,
                    }
                    })
                    .then((res) => {
                       console.log(res.data.data)
                       this.yi=res.data.data
                    })
            },
   methods: {
    change() {
      
    },
    qu:function(){
        if(this.mobile!=''){
         //this.$toast('搜索内容不能为空');
         this.$router.push({  //核心语句
            path:'/Home/searchdetail',   //跳转的路径
            query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            text:this.mobile,  
            }
        })
       }
    },
    clickfun:function(e){
        console.log(e.target.innerHTML)
        this.mobile=e.target.innerHTML
        this.$router.push({  //核心语句
            path:'/Home/searchdetail',   //跳转的路径
            query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            text:this.mobile,  
            }
        })
    }
  }
            
   

}
</script>

<style lang="stylus" scoped>
.max_order
    width 692px
    margin 0 auto
    .find_search
        border 3px solid #cccccc
        width 572px
        height 60px
        line-height 60px 
        border-radius 30px
        margin-top 40px
        text-align center
        font-size 27px
        display flex
        align-items center
        display inline-block
        position relative
        left 20px
        .find
            width 5%
            height 40px
            vertical-align center
            margin-left 30px
            position absolute
            top 10px
            left 0px
        .inputzhi
            width 450px
            display inline-block
            margin-left 3%
            flex 1
            position absolute
            left 60px
    .sousuo
        position absolute
        top 54px  
        right  50px   
        font-size 30px 
        color black 
    .hids
        padding 25px 0 0 20px
        font-size 30px
    .history_item
        background #cccccc
        display inline-block
        padding 20px 20px
        border-radius 20px
        margin 26px 24px 0 0


</style>