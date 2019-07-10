<template>
    <div class="Order">
        <TopHeader custom-title="订单详情" custom-fixed>
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</TopHeader>
        <div class="height-88"></div>
        <div class="first_wrap"  v-for="(item,index) in goods" :key="index">
              <img  :src="item.img" class="shop_img"/>               
              <div class="shop_dec">
                  <p class="shop_decname">{{item.goods_name}}</p>
                  <p class="shop_guige" v-if="item.spec_key_name!='[]'">{{item.spec_key_name}}</p>
                  <p class="shop_decprice"><span class="qian">￥{{item.goods_price}}</span><span class="num">x{{item.goods_num}}</span></p>
              </div>  
        </div>
        <div class="second_wrap">
             <p class="jiben">基本信息</p>
             <p class="xinxi"><span class="second_title">订单编号</span><span class="second_zhi">{{xiang.order_sn}}</span></p>
             <p class="xinxi"><span class="second_title">下单时间</span><span class="second_zhi">{{xiang.add_time}}</span></p>
             <p class="xinxi"><span class="second_title">收货地址</span><span class="second_zhi">{{xiang.address}}</span></p>
             <p class="xinxi"><span class="second_title">收货人</span><span class="second_zhi">{{xiang.consignee}}</span></p>
             <p class="xinxi"><span class="second_title">支付方式</span><span class="second_zhi">{{xiang.pay_type}}</span></p>  
             <p class="xinxi"><span class="second_title"> 配送方式</span><span class="second_zhi">{{xiang.shipping_name}}</span></p>
             <p class="xinxi"><span class="second_title">买家备注</span><span class="second_zhi">{{xiang.user_note}}</span></p>
        </div>
        <div class="three_wrap">
             <p class="jiben">价格信息</p>
             <p class="xinxi"><span class="second_title">商品总价</span><span class="second_zhi">{{xiang.goods_total_amount}}</span></p>
             <p class="xinxi"><span class="second_title">余额</span><span class="second_zhi">{{xiang.user_money}}</span></p>
             <p class="xinxi"><span class="second_title">运费</span><span class="second_zhi">{{xiang.shipping_price}}</span></p>
             <p class="xinxi"><span class="second_title">积分</span><span class="second_zhi">{{xiang.integral}}</span></p>
             <p class="xinxi"><span class="second_title">订单总额</span><span class="second_zhi">{{xiang.order_amount}}</span></p>       
        </div>
        
        
        
        <div class="bottom_bar">
                <p class="fukuang" v-if="xiang.order_status == 1 && xiang.pay_status == 0" @click="pay" >立即付款</p>
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
           xiang:[],
           goods:[]
        }
    },
    mounted(){
        this.$axios({
            method:'post',
            url: '/order/order_detail?order_id='+this.$route.query.order_id,
            data: {
                    'token':this.$store.state.token,
                }
            })
            .then((res) => {
                console.log(res.data.data)
                this.xiang=res.data.data
                this.goods=res.data.data.goods_res
            })
    },
    methods:{
        pay(){
            this.$router.replace({name:'Confirm_pay',params:{address_id:false,user_note:this.xiang.user_note,order_id:this.xiang.order_id}})
        }
    }

}
</script>

<style lang="stylus" scoped>
.first_wrap
    width 94%
    height 180px
    margin  0 auto  
    background white
    border-radius 20px
    margin 20px 3%
    padding 20px 20px
    box-sizing border-box
    .shop_img
        width 142px;
        height 100%
    .shop_dec
        margin-left 20px
        display inline-block
        vertical-align top
        width 460px
        .shop_decname
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
            font-size 30px
        .shop_guige
            font-size 24px
            color #ccc
            padding-top 10px
        .shop_decprice
            padding-top 20px
            .qian
                color red
                font-size 35px
            .num
                padding-left 50px
                font-size 30px
.second_wrap
    background white
    width 94%
    margin 0 3% 20px 3%
    padding 20px 20px
    box-sizing border-box
    border-radius 20px
    .jiben
        font-size 30px
        font-weight bolder
    .xinxi
        height 60px
        line-height 60px
        font-size 27px
        .second_title
            display inline-block
            width 30%
            vertical-align top
        .second_zhi
            display inline-block
            vertical-align top
            width 70%
            text-align right 
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap 
.three_wrap
    background white
    width 94%
    margin 0 3% 40px 3%
    padding 20px 20px
    box-sizing border-box
    border-radius 20px
    .jiben
        font-size 30px
        font-weight bolder
    .xinxi
        height 60px
        line-height 60px
        font-size 27px
        .second_title
            vertical-align top 
            display inline-block
            width 30%
        .second_zhi
            vertical-align top 
            display inline-block
            width 70%
            text-align right 
            text-align right 
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap  
.bottom_bar
    position fixed
    bottom 0
    width 100%
    height 108px
    line-height 108px
    background white
    .fukuang
        width 200px
        height 100%
        text-align center
        background red
        color white
        float right
        font-size 30px
    


</style>
