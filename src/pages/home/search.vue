<template>
    <div class="Order">
        
        <div  class="max_order">
            <div class="find_search" >
                <img src="/static/images/user/find.png" class="find" v-if="status"/>
                <input type="text" placeholder="请输入关键词进行搜索" v-model="mobile" class="inputzhi" v-on:input="change"/>
            </div>
            <!-- <span>取消</span> -->
            <span class="sousuo" @click="qu">搜索</span>
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
          mobile:''
        }
    },
    mounted(){
       
     


            },
   methods: {
    change() {
       if(this.mobile==''){

       }
    },
    qu:function(){
        if(this.mobile==''){
            alert("")
       }
    }
  }
            
   

}
</script>

<style lang="stylus" scoped>
.max_order
    width 692px
    text-align center
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
        left -40px
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
</style>