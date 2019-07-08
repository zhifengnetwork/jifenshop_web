<template>
    <div class="Order">
        
        <div  class="max_order">
            <div class="find_search" >
                <img src="/static/images/user/find.png" class="find" v-if="status"/>
                <input type="text" placeholder="请输入关键词进行搜索" v-model="mobile" class="inputzhi" v-on:input="change"/>
            </div>
            <!-- <span>取消</span> -->
            <span>搜索</span>
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
    }
  }
            
   

}
</script>

<style lang="stylus" scoped>
.max_order
    width 702px
    margin 0 auto
    border 1px solid green
    text-align center
    .find_search
        border 3px solid #cccccc
        width 572px
        height 60px
        line-height 60px
        margin 0 auto 
        border-radius 30px
        margin-top 40px
        text-align center
        font-size 27px
        display flex
        align-items center
        display inline-block
        .find
            width 5%
            height 40px
            vertical-align center
            margin-left 30px
        .inputzhi
            z-text-indent 15px;
            display inline-block
            margin-left 3%
            flex 1
</style>