<template>
    <div class="Order">
        <TopHeader custom-title="订单详情" custom-fixed>
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</TopHeader>
        <div class="height-88"></div>
        <div class="first_wrap">
              <img  src="/static/images/order/00order-goods-img01.png" class="shop_img"/>               
              <div class="shop_dec">
                  <p class="shop_decname">商品简介商品简介商品简介商品简介商品简介商品简介商品简介商品简介商品简介商品简介商品简介商品简介</p>
                  <p class="shop_decprice"><span class="qian">$32</span><span class="num">x2</span></p>
              </div>  


        </div>

    </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'Order',
    components: {
        TopHeader
    },
    data(){
        return{
        
        }
    },
    mounted(){
      
    },
    methods:{
        
    }
    

}
</script>

<style lang="stylus" scoped>
.first_wrap
    width 700px
    height 300px
    margin  0 auto  
    border 1px solid green 
    .shop_img
        width 140px;
        height 140px
    .shop_dec
        margin-left 20px
        display inline-block
        vertical-align top
        width 500px
        .shop_decname
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap; 







</style>
