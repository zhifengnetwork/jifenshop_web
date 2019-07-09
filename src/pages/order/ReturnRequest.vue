<template>
    <div class="ReturnRequest">
        <TopHeader custom-title="退款申请" custom-fixed>
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</TopHeader>
        <div class="height-88"></div>
        <!-- 主内容 -->
        <div class="content">
            <!-- 商品信息 -->
            <div class="goods-item">
                <div class="img-wrap">
                    <img :src="goods[0].img" />
                </div>
                <div class="text">
                    <h3>{{goods[0].goods_name}}</h3>
                     <div class="good-sku">
                        <span class="sku-coll" v-if="goods[0].spec_key_name!='[]'">{{goods[0].spec_key_name}}</span>
                        <span class="price">￥{{goods[0].goods_price}}</span>
                    </div>
                    <div class="count">x{{goods[0].goods_num}}</div>
                </div>
            </div>

            <!-- 退款原因 -->
            <div class="reason-wrap">
                <textarea placeholder="退款原因" v-model="refund_reason"></textarea>
            </div>

            <!-- 退款金额 -->
            <div class="refund-amount">
                <span class="label">退款金额</span>
                <span class="amount">￥{{goods[0].goods_price*goods[0].goods_num}}</span>
            </div>
            <!-- 选择退款方式 -->
            <van-radio-group v-model="radio">
                <van-cell-group>
                  <van-cell title="退款" clickable @click="radio = '0'">
                    <van-radio slot="right-icon" name="0" />
                  </van-cell>
                  <van-cell title="退款至余额" clickable @click="radio = '1'">
                    <van-radio slot="right-icon" name="1" />
                  </van-cell>
                </van-cell-group>
            </van-radio-group>
            <!-- 按钮 -->
            <div class="refundBtn" @click="reimburse">提交申请</div>

        </div>

    </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
import { Toast } from 'vant';
export default {
    name:'ReturnRequest',
    components: {
        TopHeader
    },
    data(){
        return {
            goods:'',
            refund_reason:'',
            radio:'',
            cancel_remark:''
        }
    },
    created(){
        this.order_id = this.$route.params.order_id;
    },
    mounted(){
        if(!this.order_id){
            this.$router.go(-1);
            return false;
        }
        this.requestData();
    },
    methods:{
        requestData(){
            let _this = this;
            this.$axios.post('order/order_detail',{
                token:_this.$store.state.token,
                order_id:_this.order_id
            })
            .then(function(response){
                console.log(response.data);
                if(response.data.status==1){
                    _this.goods = response.data.data.goods_res;
                }
                console.log(_this.goods);
            })
            .catch(function(error){
                console.log(error);
            })
        },
        reimburse(){
            let _this = this;
            console.log(_this.order_id,_this.refund_reason,_this.radio)
            this.$axios.post('order/apply_refund',{
                token:_this.$store.state.token,
                order_id:_this.order_id,
                refund_reason:_this.refund_reason,
                refund_type:_this.radio,
                cancel_remark:_this.cancel_remark
            })
            .then(function(response){
                if(response.data.status==1){
                    Toast.success(response.data.msg);
                    setTimeout(function(){   //设置延迟执行
                        location.reload();
                    },1000);
                }
                console.log(response.data);
            })
            .catch(function(error){
                console.log(error);
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.content
    padding 28px 24px
    box-sizing border-box
    .goods-item
        display flex
        background-color #ffffff
        box-shadow 0 0 8px #e6e6e6
        margin-bottom 20px
        padding 35px 40px
        box-sizing border-box
        .img-wrap
                width 160px
                height 160px
                text-align center
                margin-right 44px
                img 
                    max-width 100%
            .text
                flex 1
                h3
                    font-size 24px
                    line-height 34px
                    font-weight normal
                    overflow hidden
                    text-overflow ellipsis
                    display -webkit-box
                    -webkit-line-clamp 2
                    -webkit-box-orient vertical
                    margin-bottom 15px
                .good-sku
                    color #151515
                    font-size 24px
                    display flex
                    justify-content space-between
                    .sku-coll
                        font-size 22px
                .count
                    text-align right 
                    font-size 24px
    .reason-wrap
        width 100%
        min-height 360px
        background-color #f8f8f8
        margin-bottom 20px
        textarea
            width 100%
            min-height 360px
            font-size 26px
            color #151515
            border-radius 10px
            resize none
            padding 20px 
            box-sizing border-box
            &::-webkit-input-placeholder
                color #a4a4a4
                opacity 1
    .refund-amount
        height 80px
        font-size 30px
        color #151515
        background-color #ffffff
        display flex
        align-items center
        justify-content space-between
        padding 0 30px
        box-sizing border-box
        .amount
            color #f20c0c
    .refundBtn
        width 92%
        height 88px
        line-height 88px
        color #ffffff
        font-size 30px
        text-align center
        background-color #ff4d4d
        border-radius 40px
        position fixed
        left 50%
        bottom 68px
        margin-left -46%



</style>
