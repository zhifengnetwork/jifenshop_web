<template>
    <div class="confrim-order">
      	<!-- 头部组件 -->
		<TopHeader custom-title="订单确认" custom-fixed>
            <i slot="backBtn" class="iconfont iconfanhui"></i>
            <router-link slot="rightBtn" to="/User">我的</router-link>
		</TopHeader>
        <div class="height-88"></div>
        <div class="content">
            <div class="user-info-wrap mb-10">
                 <router-link  :to="{name:'Address',params:{Address:'Address'}}" replace class="user-info">
                    <i class="iconfont iconweizhi"></i>
                    <div class="-info-list" v-if="addr_res!=''">
                        <p class="-list-a">
                            <strong class="mr-44">{{addr_res.consignee}}</strong>
                            <strong>{{addr_res.mobile}}</strong>
                        </p>
                        <p class="-list-b">{{addr_res.address}}</p>
                    </div>
                    <div class="-info-list" v-if="addr_res==''">
                        <p class="-list-a">
                            请添加地址
                        </p>
                    </div>
                    <div class="-list-edit"><i class="iconfont iconbianji"></i></div>
                </router-link>
                <img class="-info-img" src="/static/images/order/color_line.png" />
            </div>
            <!-- GOODS START -->
            <div class="goods-list"  v-for="(item,index) in goods" :key="index">
                <!-- to="/Details" -->
                <router-link  :to="{path:'/Details',query:{id:item.goods_id}}"  class="g-list-a">
                    <img class="-list-img" :src="item.img" />
                    <div class="-detial-">
                        <p class="-d-msg apostrophe">{{item.goods_name}}</p>
                        <p class="-d-msg2">
                            <span>￥ {{item.goods_price}}</span>
                            <span>x {{item.goods_num}}</span>
                        </p>
                    </div>
                </router-link>
                
                <div class="g-list-b">
                    <div class="-list-1">

                        <span class="-b-subtitle">购买数量</span>
                        <span class="-option-">
                            <!-- <i class="subling iconfont iconjian" @click="reducingNumber()"></i> -->
                            <input class="inp" type="text" :value="item.goods_num" @change="changNumber($event)" disabled/>
                            <!-- <i class="puls iconfont iconjia"  @click="addNumber()"></i> -->
                        </span>
                    </div>
                    <div class="-list-1">
                        <span class="-b-subtitle">配送方式</span>
                        <span class="-b-msg">普通配送</span>
                        <span class="">快递:{{list.shipping_price}}</span>
                    </div>
                    <div class="-list-1">
                        <span class="-b-subtitle">订单备注</span>
                        <input type="text"  placeholder-class="placehor" v-model="user_note" placeholder="选填 请先和商家协商一致" />  
                    </div>
                    <div class="goods-price">
                        <span>共{{item.goods_num}}件</span>
                        <span>共计：</span>
                        <span>￥ {{item.goods_price*item.goods_num+Number(list.shipping_price)  | numFilter}}</span>
                    </div>
                </div>
            </div>
            <!--  -->
            <!-- <div class="goods-list goods-list2" v-for="(item,key) in pay_type" :key="key">
                <div>
                    <strong>{{item.pay_name}}</strong>
                    <p class="-list2-msg" v-show="checked">余额：{{item.balance}}</p>
                </div>
                <van-checkbox v-model="checked" @click="che($event)" :data-id="item.pay_type"></van-checkbox>
            </div> -->



            <!-- <van-radio-group v-model="radio">
                <van-cell-group>
                    <van-cell :title="item.pay_name" clickable @click="che(key,$event)" v-for="(item,key) in pay_type" :key="key" :data-id="item.pay_type" >
                            <van-radio slot="right-icon" :name="key" /> 
                                 <p class="-list2-msg" v-if="radio == 1 && key == indx">余额：{{list.balance}}</p>
                                 <span v-if="radio == 1 && key == indx">输入密码</span>
                                 <input type="password" v-model="password" placeholder="请输入密码" v-if="radio == 1 && key == indx">
                    </van-cell>
                </van-cell-group>
            </van-radio-group> -->
        </div>
        <!-- FOOTER START -->
        <div class="footer-height"></div>
        <div class="footer">
            <div class="footer-a">
                <strong class="f-a-a"> 实付款：</strong>
                <div class="f-a-b">
                    <span class="colorRed size-20">￥<strong class="size-36">{{updatePrice}}</strong></span>
                    <span class="han">(含运费)</span>
                </div>
            </div>
            <div class="footer-b" @click="zhifu()">立即付款</div>
        </div>
    </div>
</template>
<script>
import TopHeader from "@/pages/common/header/TopHeader"
import { Toast } from 'vant';

export default {
    data() {
        return {
            checked: false,
            list: '',
            addr_res:'',
            goods:'',
            pay_type:'',
            radio:'',
            address_id:'',
            indx: '',
            password:'',
            site: '',
            user_note: ''
        };
    },
    methods:{
        // 减数量
        reducingNumber(){
            var val =parseInt(this.goods.goods_num) - 1 
           if(val<=1){val =1}
           this.goods.goods_num=val
           console.log(val)
        },
        // 输入框输入数量
        changNumber(e){
            var val =e.target.value;
            if(val<1){return;}
            this.goods.goods_num=val
            console.log(val)
        },
        // 加数量
        addNumber(){
            var val =parseInt(this.goods.goods_num) + 1
            this.goods.goods_num=val
            console.log(val)
        },
        che(key,e){
            for(var i =0 ;i<this.pay_type.length;i++){
                console.log(this.radio)
                this.indx = key
            }
        },
        //立即付款按钮
        zhifu(){
            this.$router.push({name:'Confirm_pay',params:{address_id:this.addr_res,user_note:this.user_note,order_id:this.order_id}})
                // let that = this;
                // // this.address_id = this.addr_res.address_id
                // console.log(this.indx)
                // // this.$toast("添加成功,可直接去购物车下单")
                // this.$axios({
                // method:'post',
                // url: 'order/submitOrder',
                // data: {
                //     address_id: this.address_id,
                //     pay_type: this.indx,
                //     pwd: this.password,
                //     "token":that.$store.state.token 
                // }
                // })
                // .then((res) => {
                //    if(res.data.status == 1){
                //        console.log(res)
                //         console.log(res.data.data)
                //         if(this.indx==1){
                //             Toast.success('购买成功');
                //             this.$router.replace({path:'/Order/OrderDetail',query:{'order_id':res.data.data.order_id}})
                //         }else{
                //             Toast.success('下单成功');
                //             this.$router.replace({path:'/Order/OrderDetail',query:{'order_id':res.data.data}})
                //         }
                //    }else if(res.status == 0){
                //         Toast({
                //             message: '余额不足',
                //             icon: 'fail'
                //         });
                //    }
                //     })
        }
    },
    filters: {
        numFilter (value) {
            // 截取当前数据到小数点后两位
            let realVal = parseFloat(value).toFixed(2)
            return realVal
        }
        },
    computed:{
        // 计算总价格
        updatePrice(){
            // var totalPrice =new Number(this.goods.goods_num) * new Number(this.goods.goods_price)
            // return totalPrice.toFixed(2)
                var  totalPrice=0; 
                for(var i=0;i<this.goods.length;i++){
                    totalPrice= totalPrice + (this.goods[i].goods_num*this.goods[i].goods_price+Number(this.list.shipping_price))
                }

             
               return totalPrice.toFixed(2)
             

        }
    },
    created: function(){
            let that = this;
            this.$axios({
            method:'post',
            url: 'order/temporary',
            data: {
                "token":that.$store.state.token
            }
            })
            .then((res) => {
            this.list = res.data.data
            this.goods = this.list.goods
            this.addr_res = this.list.addr_res[0]
            this.address_id = this.addr_res.address_id
            this.pay_type = this.list.pay_type
        
            if(this.site){
                this.addr_res = this.$route.params.address_id;
                this.address_id = this.site.id
            }else{
                console.log(this.site)
                this.addr_res = this.list.addr_res[0]
                this.address_id = this.addr_res.address_id
            }
                })
        if(this.$route.params.address_id){
            this.site = this.$route.params.address_id;
        }
        // else{
        //     this.site = this.$route.params.address_id;
        // console.log(this.site)
        // }
        
    },
    mounted() {
        // order/temporary

    },
    components:{
        TopHeader
    }
}
</script>

<style lang="stylus" scoped>
    .colorRed
        color #f70a0a
    .size-20
        font-size 20px
    .han
        font-size 20px
        color #ccc
    .size-36
        font-size 36px
    .placehor
        font-size 18px
        color #999
    .mr-44
        display block
        float left
        max-width 200px
        margin-right  44px
        text-overflow ellipsis
        white-space nowrap
        overflow hidden
    .mb-10
        margin-bottom 10px
    .content
        padding 24px
        color #151515
        .user-info-wrap
            position relative
            padding 20px 20px 25px
            background  #fff
            border-radius 10px
            .user-info
                display flex
                align-items  center
                .iconweizhi
                    font-size 40px
                    color  #43c439
                    margin-right 55px
                .-info-list
                    margin-right 20px
                    .-list-a
                        color #151515
                        font-size 28px
                        margin-bottom 25px
                    .-list-b
                        font-size 24px
                        color #555555
                .-list-edit
                    margin-left auto
                    .iconfont
                        font-size 30px
                        color #7f7f7f
            .-info-img
                width  94%
                height 10px
                position absolute
                bottom  0
        .goods-list      
            padding 20px
            border-radius 10px
            .g-list-a
                display inline-block
                display  flex
                align-items  center
                color  #151515
                height 240px
                .-list-img
                    width  220px
                    height 100%
                .-detial-
                    margin-left 25px
                    .-d-msg
                        font-size 28px
                        font-weight bold
                        margin-bottom  30px
                        oeverflow hidden
                    .-d-msg2
                        font-size 24px
                    
            .g-list-b
                margin-top 25px
                .-list-1
                    display  flex
                    align-items  center
                    margin-bottom 50px
                    .-b-subtitle
                        margin 0 25px 0 138px
                        font-size 26px
                    .-option-
                        // border  2px solid #e6e6e6
                        width  200px
                        height  40px
                        line-height  40px
                        display  flex
                        align-items  center
                        justify-content space-between
                        border-radius  20px
                        text-align center
                        // margin-left 115px
                        .iconfont
                            width 41px
                            height 100%
                            font-size  12px
                        .puls
                            border-left 1px solid #e6e6e6
                        .subling
                            border-right 1px solid #e6e6e6
                            
                        .inp
                            width 121px
                            text-align  center
                            height inherit
                            font-size 24px
                            font-weight bold
                    .-b-msg
                        color #999
                        margin-right 40px
                .goods-price
                    font-size 26px
                    text-align center
                    span:nth-child(1)
                        color #9d9d9d
                    span:nth-child(3)
                        font-size  30px
                        color  #ff112f
        .goods-list2
            margin-top 25px
            display flex
            align-items  center
            justify-content space-between
            font-size 30px
        .-list2-msg
            color #757575
            line-height 80px
            width 100%
            float left
            text-align left 
    .footer-height
        width  100%
        height 140px
    .footer
        position  fixed
        bottom 0
        width  100%
        height 120px
        left 0
        background #fff
        z-index  2
        box-shadow  0px 0px 5px 0px #cccccc
        display  flex
        align-items center
        .footer-a
            width 530px
            padding-left 28px
            display flex
            .f-a-a
                display flex
                align-items center
                margin-right  40px
            .f-a-b
                .-freight
                    margin 0 35px
                    font-size 24px
                    color  #757575
        .footer-b
            width 221px
            background #f30c0c
            color #fff
            line-height 120px
            text-align  center
            font-size 30px
            font-weight bold
.content >>> .van-cell__value
    position: relative;
    color: #969799;
    vertical-align: middle;
    display: block;
    width: 80%;
    height  150px
    text-align left
    // #box
    //     width   100px
    //     height  100px
    //     background red
    input 
        margin-left 20px
.content >>> .van-cell
    // position absolute!important
    // top 0
    // left 0
    // right 0
    // bottom 0
    display block
.content >>> .van-radio
    position absolute 
    top 50%
    transform translate(0,-50%)
    right 50px
.content >>> .van-cell__value
    height 2.7rem
.content >>> .van-cell__value input
    display block
    width 100%
    margin 0
// .van-radio {
//     display: inline;
//     position: absolute;
//     top: .2rem;
//     right: .3rem;
//     }
// .van-cell__value {
//     position: relative;
//     overflow: hidden;
//     color: #969799;
//     /* text-align: right; */
//     vertical-align: middle;
//     display: block;
//     width: 80%;
//     border: 1px solid red;
//     }

















</style>



