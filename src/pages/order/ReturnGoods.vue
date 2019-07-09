<template>
    <div class="ReturnGoods">
        <TopHeader custom-title="退货" custom-fixed>
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</TopHeader>
        <div class="height-88"></div>
        <!-- 内容 -->
        <div class="content">
            <!-- No INFO START -->
            <div v-if="data.length==0" class="no-info">
                <Nodata :nodatas="nodatas"></Nodata>
            </div>
            <div class="item-card" v-for="(item,index) in data" :key="index">
                <div class="card-head">
                    <span class="order-date">{{item.add_time}}</span>
                    <span class="order-state">{{status[item.status]}}</span>
                </div>
                <div class="goods-item">
                    <div class="img-wrap">
                        <img :src="item.img" />
                    </div>
                    <div class="text">
                        <h3>{{item.goods_name}}</h3>
                        <div class="good-sku">
                            <span class="sku-coll">{{item.spec_key_name}}</span>
                            <span class="price">￥{{item.goods_price}}</span>
                        </div>
                    </div>
                </div>
                <div class="total-bar">
                    <div class="total-count">共{{item.goods_num}}件商品</div>
                    <div class="payment">
                        <span class="label">合计 : </span>
                        <span class="price">￥{{item.goods_price*item.goods_num}}</span>
                    </div>
                </div>
                <div class="order-btn">
                    <router-link class="btn" :to="{path:'/Order/OrderDetail',query:{order_id:item.order_id}}" >查看详情</router-link>
                    <span class="btn red"  v-if="item.order_status == 1 &&　item.pay_status == 0">取消订单</span>
                    <router-link class="btn red" to='/Order/Express' v-if="item.order_status == 1 &&　item.pay_status == 1 && item.shipping_status == 1">查询物流</router-link>
                    <router-link class="btn red" :to="{path:'/Order/Evaluate',query: {id: item.order_id}}" v-if="item.order_status == 4 &&　item.pay_status == 1">去评价</router-link>
                        
                    
                </div>
            </div>

            <!-- 数据加载完提示 -->
            <div class="end-wrap" v-if="flag">
                <p>我是有底线哦~~</p>
            </div>

        </div>

    </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
import Nodata from "@/pages/common/nodata/Nodata";
export default {
    name:'returnGoods',
    components: {
        TopHeader,
        Nodata
    },
    data(){
        return {
            data:[],
            flag:false,
            nodatas:{
                'imgSrc':'/static/images/cart/cart_icon.png',
                'text':'清单空空如也~',
                'link':'/Hone'
            },
            status:['','待付款','待发货','待收货','待评价','已取消','待退款','已退款','拒绝退款'],
            page:1
        }
    },
    mounted(){
        this.nowIndex = this.$route.query.type
        this.requestData();
        window.addEventListener('scroll', this.scrollBottom);
    },
    methods:{
        requestData(){
            let _this = this;
            this.$axios.post('order/order_list',{
                token:_this.$store.state.token,
                type:'tk',
                page:_this.page
            })
            .then(function(response){
                console.log(response.data);
                if(response.data.status===1){
                    for(let i=0;i<response.data.data.length;i++){
                        if(response.data.data.length<9){
                            _this.flag = true;
                        }
                        _this.data.push(response.data.data[i]);
                    }
                }
                console.log(_this.data)
            })
            .catch(function(error){
                console.log(error);
            })
        },
        scrollBottom(){
            let _this = this;
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            if(scrollTop + windowHeight == scrollHeight){
                _this.page++;
                _this.requestData();
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.content
    margin-top 30px
    .item-card
        width 702px
        background-color #ffffff
        border-radius 8px
        box-shadow 0 0 8px #e6e6e6
        margin 0 auto 15px
        .card-head
            height 55px
            border-bottom 2px solid #e6e6e6
            display flex
            align-items center
            justify-content space-between
            padding 0 36px
            box-sizing border-box
            .order-date
                font-size 22px
                color #151515
            .order-state
                font-size 24px
                color #f20c0c
        .goods-item
            display flex
            padding 17px 38px 0
            box-sizing border-box
            .img-wrap
                width 160px
                height 160px
                text-align center
                margin-right 40px
                img 
                    max-width 100%
            .text
                flex 1
                h3
                    font-size 28px
                    line-height 40px
                    font-weight normal
                    margin-bottom 30px
                    overflow hidden
                    text-overflow ellipsis
                    display -webkit-box
                    -webkit-line-clamp 2
                    -webkit-box-orient vertical
                .good-sku
                    color #151515
                    font-size 24px
                    display flex
                    justify-content space-between
                    .sku-coll
                        font-size 22px
        .total-bar
            height 40px
            color #6f6f6f
            display flex
            justify-content flex-end
            align-items center
            padding 0 38px
            box-sizing border-box
            .total-count
                line-height 40px
            .payment
                margin-left 20px
                font-size 30px
                line-height 40px
                .label
                    font-size 22px
                    position relative
                    top -2px
                .price
                    color #151515
                    font-size 30px
    .end-wrap
        font-size 18px
        color #888888
        text-align center
        margin 30px auto
.order-btn
    margin-top 20px
    display flex
    justify-content flex-end
    padding 0 38px 36px
    box-sizing border-box
    .btn
        width 130px
        height 40px
        line-height 40px
        color #151515
        text-align center
        display inline-block
        font-size 26px
        border-radius 15px
        border 2px solid #151515
        margin-left 26px
        &.red
            color #f20c0c
            border-color #f20c0c
            background-color #faf8f5
</style>
