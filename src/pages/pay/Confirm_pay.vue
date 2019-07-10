<template>
    <div class="confrim-order">
      	<!-- 头部组件 -->
		<TopHeader custom-title="支付订单" custom-fixed>
            <i slot="backBtn" class="iconfont iconfanhui"></i>
		</TopHeader>
        <div class="height-88"></div>
        <div class="content">
            <!-- <div class="tips">目前仅支持余额支付哦~</div> -->
            <van-radio-group v-model="radio">
                <van-cell-group>
                    <van-cell :title="item.pay_name" clickable @click="che(key,$event)" v-for="(item,key) in pay_type" :key="key" :data-id="item.pay_type" >
                        <van-radio slot="right-icon" :name="key" /> 
                        <p class="-list2-msg" v-if="radio == 1 && key == indx">余额：{{list.balance}}</p>
                        <span v-if="radio == 1 && key == indx">输入密码</span>
                        <input type="password" v-model="pwd" placeholder="请输入密码" v-if="radio == 1 && key == indx">
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </div>
        <div class="payment" @click="payment()">立即付款</div>
    </div>
</template>
<script>
import TopHeader from "@/pages/common/header/TopHeader"
import { Toast } from 'vant';

export default {
    data() {
        return {
          indx:'',
          pay_type:'',
          list:'',
          radio:'',
          pwd:''
        };
    },
    components:{
        TopHeader
    },
    created(){
        if(this.$route.params==''){
            return false;
        }
        this.address_id = this.$route.params.address_id.id||this.$route.params.address_id.address_id;
        this.user_note = this.$route.params.user_note;
        this.order_id = this.$route.params.order_id;
        console.log(this.address_id,this.user_note,this.order_id)
        console.log(this.$route)
    },
    mounted(){
        this.requestData();
    },
    methods:{
        che(key,e){
            for(var i =0 ;i<this.pay_type.length;i++){
                this.indx = key
            }
        },
        requestData(){
            let _this = this;
            let url = null;
            if(this.address_id){
                url = 'order/temporary'
            }else{
                url = 'order/order_go_pay'
            }
			this.$axios.post(url,{
                token:_this.$store.state.token,
                order_id:_this.order_id,
                address_id:_this.address_id,
			})
			.then(function(response){
                console.log(response);
                if(response.data.status == 1){
                    _this.pay_type = response.data.data.pay_type;
                    _this.list = response.data.data
                }
				console.log(_this.data)
			})
			.catch(function(error){
				console.log(error);
			})
        },
        payment(){
            let _this = this;
            let pay_type = null;
            let url = null;
            if(_this.indx===''){
                Toast('请选择支付方式');
                return false;
            }
            if(_this.indx==1&&_this.pwd==''){
                Toast('请输入支付密码');
                return false;
            }
            switch(_this.indx){
                case 0:
                   pay_type = 2;
                   break;
                case 1:
                   pay_type = 1;
                   break;
                case 2:
                   pay_type = 4;
                   break;
                case 3:
                   pay_type = 4;
                   break;
            }
            console.log(_this.address_id,_this.indx,_this.order_id,6666)
            if(_this.address_id){
                url = 'order/submitOrder';
            }else{
                url = 'order/order_pay';
            }
            this.$axios.post(url,{
                token:_this.$store.state.token,
                address_id:_this.address_id,
                order_id:_this.order_id,
                pay_type:pay_type,
                pwd:_this.pwd,
                user_note:_this.user_note
            })
            .then(function(response){
                console.log(response);
                if(response.data.status == 1){
                    if(pay_type==2){
                        _this.weixin(response.data.data)
                    }else{
                        Toast.success('支付成功');
                        _this.$router.replace({path:'/Order/OrderDetail',query:{'order_id':response.data.data.order_id}})
                    }

                    // else{
                    //     Toast.success('下单成功');
                    //     _this.$router.replace({path:'/Order/OrderDetail',query:{'order_id':response.data.data}})
                    // }
                }
            })
            .catch(function(error){
                console.log(error);
            })
        },
        // 微信支付
        weixin(data){
            var _this= this;
            //下面是解决WeixinJSBridge is not defined 报错的方法
            if (typeof WeixinJSBridge == "undefined"){//微信浏览器内置对象。参考微信官方文档
            if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', _this.wxpay(data), false);
            }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', _this.wxpay(data));
                document.attachEvent('onWeixinJSBridgeReady',_this.wxpay(data));
            }
            }else{
                _this.wxpay(data);
            }
    
        },
        wxpay(data){
            let _this = this;
            WeixinJSBridge.invoke(
            'getBrandWCPayRequest',{//下面参数内容都是后台返回的
                debug:true,
                "appId":data.appId,//公众号名称，由商户传入
                "timeStamp":data.timeStamp,//时间戳
                "nonceStr":data.nonceStr,//随机串
                "package":data.package,//预支付id
                "signType":data.signType,//微信签名方式
                "paySign":data.paySign,//微信签名
            },
            function(res){
                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                if(res.err_msg == "get_brand_wcpay_request:ok" ){         
                    Toast.success('支付成功');
                    _this.$router.replace({path:'/Order/OrderDetail',query:{'order_id':data.order_id}})
                }else{           
                    Toast('支付失败');
                }
            });
        },
    },
    
}
</script>

<style lang="stylus" scoped>

    .colorRed
        color #f70a0a
    .size-20
        font-size 20px
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
        box-sizing border-box
        -moz-box-sizing border-box
        -webkit-box-sizing border-box
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
                        border  2px solid #e6e6e6
                        width  200px
                        height  40px
                        line-height  40px
                        display  flex
                        align-items  center
                        justify-content space-between
                        border-radius  20px
                        text-align center
                        margin-left 115px
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
.payment
    position absolute
    left 0
    right 0
    bottom 50px
    margin auto
    width 60%
    height 60px
    text-align center
    line-height 60px
    color #fff
    background red
    border-radius 20px
.tips
    color #ff0000
    line-height 100px















</style>



