<template>
    <div class="Details">
        <!-- 头部组件 -->
		<TopHeader custom-title="商品详情" custom-fixed v-if="head">
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</TopHeader>
        <TopHeader custom-title="" custom-fixed  v-if="!head" style="background:transparent;color:rgba(200,200,200,.45);">
			<i slot="backBtn" class="iconfont iconfanhui1" style="font-size:24px;"></i>
		</TopHeader>
        <!-- <div class="height-88"></div> -->
        <!-- 产品图轮播 -->
        <div class="detailsSwiper">
            <van-swipe :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(item,key) in datalist.img" :key="key" >
                    <img :src="item.picture" />
                </van-swipe-item>
                <!-- <van-swipe-item>
                    <img src="/static/images/details/00detailsSwiper-img01.png" />
                </van-swipe-item>
                <van-swipe-item>
                    <img src="/static/images/details/00detailsSwiper-img01.png" />
                </van-swipe-item>
                <van-swipe-item>
                    <img src="/static/images/details/00detailsSwiper-img01.png" />
                </van-swipe-item> -->
            </van-swipe>
        </div>

         <!-- 主内容 -->
        <div class="content">
            <div class="price">
                <span class="discount-price">￥{{goodsinfo.price}}</span>
                 <s style="color:#ccc" v-show="goodsinfo.original_price>0">原价￥{{goodsinfo.original_price}}</s>
                <span class="discount_tag" v-if="!goodsinfo.is_own===0">自营商品</span>
                <!-- <span class="original-price">原价￥569.00</span> -->
            </div>
            <div class="goodsInfo">
                <!-- 商品名称 -->
                <div class="goodsName">
                    <h1>{{goodsinfo.goods_name}}</h1>
                </div>

                <div class="group-warp">
                    <!-- 配送地区 -->
                    <div class="sendArea module-wrap">
                        <van-cell-group class="goods-cell-group">
                            <van-cell is-link @click="areaSelect">
                                <template slot="title">
                                    <span class="label">配送</span>
                                    <span class="text" style="text-align:right;width:80%;display:inline-block">{{address}}</span>
                                </template>
                            </van-cell>
                        
                            <van-popup v-model="areaShow" position="bottom">
                                <van-area :area-list="areaList" @confirm="onAddrConfirm" @cancel="onAddrCancel" />
                            </van-popup>
                        </van-cell-group>
                    </div>

                    <!-- 运费 -->
                    <div class="postArea module-wrap">
                        <van-cell-group class="goods-cell-group">
                            <van-cell is-link  @click="freightShow = true">
                                <template slot="title">
                                    <span class="label">运费</span>
                                    <span class="text">{{datalist.freight}}</span>
                                </template>
                            </van-cell>
                        </van-cell-group>
                    </div>

                    <!-- 规格 -->
                    <div class="sku-wrap module-wrap">
                        <van-cell-group class="goods-cell-group">
                            <van-cell is-link @click="handleBtn()">
                                <template slot="title">
                                    <span class="label">规格</span>
                                    <span class="wayText size22">默认规格显示</span>
                                </template>
                            </van-cell>
                        </van-cell-group>
                    </div>
                </div>

            </div>

            <!-- tab切换 -->
            <div class="tab-content">
                <van-tabs v-model="tabActive">
                    <van-tab title="商品详情">
                        <div class="details-wrap" v-html="goodsinfo.content">
                            <!-- <img src="/static/images/details/00details-img01.png" /> -->
                            {{goodsinfo.content}}
                        </div>
                    </van-tab>
                    
                    <van-tab title="参数">
                        <div class="params-wrap" v-show="zhuangtai">
                            <ul class="param-list">
                                <li v-for="(item,key) in datalist.parameter" :key="key">
                                    <div class="param-name">{{item.spec_name}}</div>
                                    <div class="param-value">{{item.val_name}}</div>
                                </li>
                            </ul>
                        </div>
                    </van-tab>
                    <!-- 评论 -->
                    <!-- {{this.comment_count}} -->
                    <van-tab :title="this.comment_count">
                        <div class="comment-wrap">
                            <!-- {{commentlist}} -->
                            <ul class="comment-list">
                                <li v-for="(item,key) in commentlist" :key="key" v-if="commentlist!='暂无评论！'">
                                    <div class="eval-user">
                                        <div class="user">
                                            <div class="avatar">
                                                <img :src="item.avatar" />
                                            </div>
                                            <div class="text">
                                                <span class="name">{{item.nickname}}</span>
                                                <span class="date">{{item.add_time}}</span>
                                            </div>
                                        </div>
                                        <div class="score">
                                            <van-rate
                                                v-model="item.star_rating"
                                                icon="like-o"
                                                void-icon="like-o"
                                                color="#f70a0a"
                                                readonly
                                            />
                                        </div>
                                                       






                                    </div> 
                                    <div class="eval-content">
                                        <p>{{item.content}}</p>
                                    </div>
                                    <div class="imgView">
                                        <span v-for="(img,index) in item.img" :key="index"><img :src="img"></span>
                                    </div>
                                </li>
                                <li v-if="commentlist == '暂无评论！'" style="text-align:center">
                                    {{commentlist}}
                                </li>
                            </ul>

                             <!-- 数据加载完提示 -->
                            <div class="end-wrap">
                                <p>我是有底线哦~~</p>
                            </div>

                        </div>
                    </van-tab>
                </van-tabs>
            </div>

        </div>
        <!-- 商品规格 -->
        <!-- <van-sku
        v-model="showBase"
        :sku="sku"
        :goods="sku.goods"
        /> -->
        <!-- 底部菜单 -->
        <div class="bottom-bar">
            
            <van-goods-action>
                <van-goods-action-icon
                    icon="shop-o"
                    text="店铺"
                     @click="home()"
                />
                <van-goods-action-icon
                    :style="{'color': ( this.datalist.collection == '1' ? 'red':'')}"
                    icon="like-o"
                    icon-class="like-red"
                    text="收藏"
                    @click="shoucang()"
                />
                <van-goods-action-icon
                    icon="chat-o"
                    text="客服"
                />
                <van-goods-action-button
                    type="warning"
                    text="加入购物车"
                    @click="addToCart()"
                />
                <van-goods-action-button
                    type="danger"
                    text="立即购买"
                    @click="toBay()"
                />
            </van-goods-action>
        </div>
         <!-- <div class="productConten">
        <div class="product-delcom" v-for="(ProductItem,n) in simulatedDATA.specifications">
            <p>{{ProductItem.name}}</p>
            <ul class="product-footerlist clearfix">
                <li v-for="(oItem,index) in ProductItem.item" v-on:click="specificationBtn(oItem.name,n,$event,index)" v-bind:class="[oItem.isShow?'':'noneActive',subIndex[n] == index?'productActive':'']">{{oItem.name}}</li>
            </ul>
        </div> -->

        <div v-show="guige" id="guige">
            <div class="guige" @click="guanbi()" ></div>
            <div class="guige_box">
              <div class="gun">
                <div class="guibox" v-for="(ProductItem,n) in spec.spec_attr" :key="n" >
                    <h3>{{ProductItem.spec_name}}</h3>
                    <ul>
                        <li :data-id="oItem.attr_id" v-for="(oItem,index) in ProductItem.res" :key="index" @click="specificationBtn(oItem.attr_id,n,$event,index)" :class="[oItem.isShow?'':'noneActive',subIndex[n] == index?'productActive':'']">{{oItem.attr_name}}</li>
                    </ul>
                </div>
               </div> 
                <div class="guigenum">
                    <h3>购买数量</h3>
                    <span class="-option-">
                        <i class="subling iconfont iconjian" @click="reducingNumber()"></i>
                        <input class="inp" type="text" :value="goodsNumber" @change="changNumber($event)"/>
                        <i class="puls iconfont iconjia"  @click="addNumber()"></i>
                    </span>
                </div>
                <div class="guigegd" @click="confirm()">确定</div>
                <div class="guige_bottom" @click="guanbi()">&times</div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import AreaList from './area'
// import {GoodsAction,GoodsActionBigBtn,GoodsActionMiniBtn,Toast,Sku } from 'vant'
import {GoodsAction,GoodsActionIcon,GoodsActionButton,Toast,Sku} from 'vant'

import TopHeader from "@/pages/common/header/TopHeader"

Vue.use(
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton,
    Toast,
    Sku
    )

export default {
    name:'Details',
    components:{
        TopHeader,
        GoodsAction,
        // GoodsActionIcon,
        // GoodsActionButton
    },
    data(){
        return {
            goodsNumber: 1,
            head:false,//头部隐藏
            goods_id:this.$route.query.id,//商品id
            tabActive: 0,//tab选中
            rateVal: 3,//评分当前分值
            areaShow:false,//省市区上拉
            address:'广州白云区',//地址
            areaList:AreaList,// 指定数据源
            couponShow:false,//优惠券上拉菜单
            value: 1,//步进器默认值
            datalist: '',
            showBase:false,
            goodsinfo: '',
            spec: '',
            commentlist:'',
            likeo: '',
            msg: '',
            guige: false,
            guigeNumber:'',
            sel: [],
            indexzhi:'',
            selectArr: [], //存放被选中的值
            shopItemInfo: {}, //存放要和选中的值进行匹配的数据
            subIndex: [],
            zong: '', //是否选中 因为不确定是多规格还是但规格，所以这里定义数组来判断
            immediatelyOrder: '',
            comment_count: '',
            zhuangtai:true
        }
    },
    methods:{
        // 省市区上拉
        areaSelect(){
            this.areaShow = true
        },
        //配送地区确定选择
        onAddrConfirm(val){  
            this.areaShow = false;
            this.address = val[0].name+ val[1].name +val[2].name
           
        },
        home(){
             this.$router.push({path:'/home/Home'});
        },
        //配送地区取消选择
        onAddrCancel(){  
            this.areaShow = false
        },
        // 显示规格
        handleBtn(){
            this.guige = !this.guige;
	        document.body.style.overflow='hidden';//禁止页面划动
        },
        //关闭规格
        guanbi(){
            this.guige = !this.guige;
            //关闭页面可以滚动
             document.body.style.overflow='';
        },
        specificationBtn: function (attr_id, n, event, index) {
            var self = this;
            if (self.selectArr[n] != attr_id) {
                self.selectArr[n] = attr_id;
                self.subIndex[n] = index;
 
            } else {
                self.selectArr[n] = "";
                self.subIndex[n] = -1; 
                //去掉选中的颜色 
            }
            self.checkItem();
            
        },
        checkItem: function () {
            var self = this;
            var option = self.spec.spec_attr;
            var result = [];  //定义数组存储被选中的值
            for (var i in option) {
                result[i] = self.selectArr[i] ? self.selectArr[i] : '';
            }
            for (var i in option) {
                var last = result[i];  //把选中的值存放到字符串last去
                for (var k in option[i].attr_id) {
                    result[i] = option[i].attr_id[k]; //赋值，存在直接覆盖，不存在往里面添加name值
                    option[i].attr_id[k].isShow = self.isMay(result); //在数据里面添加字段isShow来判断是否可以选择
                }
                result[i] = last;
                 //还原，目的是记录点下去那个值，避免下一次执行循环时避免被覆盖
 
            }
            self.$forceUpdate(); //重绘
            // console.log(self.selectArr)
            
            this.zong = self.selectArr
            console.log(this.zong)
        },
        isMay: function (result) {
            for (var i in result) { 
                if (result[i] == '') {
                    return true; //如果数组里有为空的值，那直接返回true
                }
            }
            return this.shopItemInfo[result].stock == 0 ? false : true; //匹配选中的数据的库存，若不为空返回true反之返回false
        },



        // 商品规格选择确定
        confirm(){

             this.guigeNumber = sessionStorage.getItem('guigeNumber');
             console.log("this.guigeNumber",this.guigeNumber)
            //点击确定关闭弹窗并使页面可以滚动
            this.guige = !this.guige;
            document.body.style.overflow='';
            // 对比
            for(var i=0;i<this.spec.goods_sku.length;i++){
                if(this.zong==this.spec.goods_sku[i].sku_attr1){
                    console.log(this.spec.goods_sku[i].sku_id,'666')
                    this.zongshu = this.spec.goods_sku[i].sku_id
                }
            }
        },
        handleScroll () {
            this.head = window.scrollY > 150;
        },
        // 收藏
        shoucang(){
            // this.goods_id = this.$route.query.id
             let that = this;
            this.$axios({
            method:'post',
            url: 'collection/collection',
            data: {
                  goods_id: this.goods_id,
                 "token":that.$store.state.token
            }
            })
            .then((res) => {
                this.likeo = res.data

                // 把获取到的数据储存到session中，每次点击收藏按钮保存同时改变msg的值  
                // sessionStorage.setItem("msg",this.likeo.msg);
                // this.msg = sessionStorage.getItem('msg'); 

                })
                this.datalist.collection = !this.datalist.collection
            
        },
        //点击加入到购物车
        addToCart(){
            console.log("this.goodsNumber", this.goodsNumber)
            if(this.spec.goods_sku.length>1){
                if(this.zongshu){
                let that = this;
                // this.$toast("添加成功,可直接去购物车下单")
                this.goodsNumber = sessionStorage.getItem('goodsNumber');
                this.$axios({
                method:'post',
                url: 'cart/addCart',
                data: {
                    sku_id: this.zongshu,
                    cart_number: this.goodsNumber,
                    "token":that.$store.state.token
                }
                })
                .then((res) => {
                    this.likeo = res.data
                    // 把获取到的数据储存到session中，每次点击收藏按钮保存同时改变msg的值  
                    sessionStorage.setItem("msg",this.likeo.msg);
                    this.msg = sessionStorage.getItem('msg'); 
                    })
                    Toast({
                    message: '加入购物车成功',
                    icon: 'success'
                    });
                }
                else{
                    this.guige = !this.guige;
	                document.body.style.overflow='hidden';//禁止页面划动
                }
               
                }
            
             else if(this.spec.goods_sku.length <= 1){
                Toast({
                    message: '加入购物车成功',
                    icon: 'success'
                    });
                let skuid = this.spec.goods_sku[0].sku_id
                let that = this;
                console.log(skuid)
                // this.$toast("添加成功,可直接去购物车下单")
                this.goodsNumber = sessionStorage.getItem('goodsNumber');
                
                this.$axios({
                method:'post',
                url: 'cart/addCart',
                data: {
                    sku_id: skuid,
                    cart_number: this.goodsNumber,
                    "token":that.$store.state.token
                }
                })
                .then((res) => {
                    console.log("dddddddddddddd")
                    console.log(this.guigeNumber)
                    this.likeo = res.data
                    // 把获取到的数据储存到session中，每次点击收藏按钮保存同时改变msg的值  
                    sessionStorage.setItem("msg",this.likeo.msg);
                    this.msg = sessionStorage.getItem('msg'); 
                    })
            }
            
           
        },
        // 立即购买
        toBay(){
            console.log("this.goodsNumber 666666", this.goodsNumber)
            if(this.spec.goods_sku.length>1){
                if(this.zongshu){
                    let that = this;
                    this.goodsNumber = sessionStorage.getItem('goodsNumber');
                    this.$axios({
                        method:'post',
                        url: 'order/immediatelyOrder',
                        data: {
                            sku_id: this.zongshu,
                            cart_number: this.goodsNumber,
                            "token":that.$store.state.token
                            }
                        })
                        .then((res) => {
                            this.immediatelyOrder = res.data
                            if(this.immediatelyOrder.status > 0){
                            this.$router.push({path: '/pay/ConfirmOrder',name:'ConfirmOrder'})
                            }
                            })
                 }else{
                    this.guige = !this.guige;
	                document.body.style.overflow='hidden';//禁止页面划动
                 }
                
                
            }else if(this.spec.goods_sku.length == 1){
                 console.log("this.goodsNumber 666666", this.goodsNumber)
                let skuid = this.spec.goods_sku[0].sku_id
                let that = this;
                this.goodsNumber = sessionStorage.getItem('goodsNumber');
                this.$axios({
                method:'post',
                url: 'order/immediatelyOrder',
                data: {
                    sku_id: skuid,
                    cart_number: this.goodsNumber,
                    "token":that.$store.state.token
                }
                })
                .then((res) => {
                    this.immediatelyOrder = res.data
                    if(this.immediatelyOrder.status > 0){
                    this.$router.push({path: '/pay/ConfirmOrder',name:'ConfirmOrder'})
                    }
                    })
            }
            
        },
         reducingNumber(){
            var val =parseInt(this.goodsNumber) - 1 
           if(val<=1){val =1}
           this.goodsNumber=val
           sessionStorage.setItem("guigeNumber",this.goodsNumber);
        },
        changNumber(e){
            var val =e.target.value;
            if(val<1){return;}
            this.goodsNumber=val
            sessionStorage.setItem("guigeNumber",this.goodsNumber);
        },
        addNumber(){
            var val =parseInt(this.goodsNumber) + 1
            this.goodsNumber=val
            sessionStorage.setItem("guigeNumber",this.goodsNumber);
            console.log(this.goodsNumber)
        },
    },
    //更新渲染前
        beforeUpdate() {
        var zhi=sessionStorage.setItem("goodsNumber",this.goodsNumber)
        // console.log("zhi" , this.goodsNumber)
        sessionStorage.setItem("guigeNumber", zhi);
    },
    // 挂载前
    beforeMount() {
        // 挂载前取出msg数据
        this.msg = sessionStorage.getItem('msg');
        console.log(this.msg)
        this.guigeNumber = sessionStorage.getItem('goodsNumber');
        // console.log("this.guigeNumber",this.guigeNumber)
    },
    mounted() {
        //监听页面滚动事件
        window.addEventListener('scroll', this.handleScroll);
    },
    created() {
        var that = this
        this.$axios({
            method:'post',
            url: 'goods/goodsDetail',
            data: {
                goods_id: this.goods_id,
                "token":that.$store.state.token
            }
            })
            .then((res) => {
                this.datalist = res.data.data
                
                
                console.log("--------------")
                if(this.datalist.parameter.length===1){
                   this.zhuangtai=false    
                }
                console.log(this.datalist.parameter.length)
                this.goodsinfo= res.data.data.goodsinfo
                this.spec = res.data.data.spec
                this.commentlist = res.data.data.commentlist
                this.comment_count = "商品评价" + "(" + res.data.data.comment_count + ")"
                console.log(this.commentlist)
            })

            ///////////////////////////////
            console.log(777)
            var self = this;
            for (var i in self.spec.goods_sku) {
                self.shopItemInfo[self.spec.goods_sku[i].sku_attr1] = self.spec.goods_sku[i]; 
                //修改数据结构格式，改成键值对的方式，以方便和选中之后的值进行匹配
                console.log(self.shopItemInfo)
            }
            self.checkItem();

    },
}
</script>

<style lang="stylus" scoped>
.Details
    background-color #ffffff
    // 产品主图轮播
    .detailsSwiper
        height 750px
        img 
            width 100%
            height  720px
            display block
    .content
        padding-bottom 128px
        box-sizing border-box
        .price
            position relative
            margin 0 24px
            height 60px
            line-height 60px
            .discount-price
                font-size 30px
                color #f30c0c
            .original-price
                font-size 26px
                color #838383
            .discount_tag
                position absolute
                top 0
                bottom 0
                right 24px
                margin auto
                height 34px
                line-height 34px
                padding 0 4px
                color #ff0000
                border 2px solid #ff0000
        .goodsInfo
            box-sizing border-box
            .goodsName
                margin 0 auto 30px
                padding 0 24px
                box-sizing border-box
                -moz-box-sizing border-box
                -webkit-box-sizing border-box
                h1
                    font-size 26px
                    color #151515
                    line-height 36px
                    font-weight normal
                    display -webkit-box
                    -webkit-box-orient vertical
                    -webkit-line-clamp 2
                    overflow hidden
            .group-warp
                background #f8f8f8
                border-radius 8px
                padding 10px 0
                box-sizing border-box
                -moz-box-sizing border-box
                -webkit-box-sizing border-box
                .module-wrap
                    padding 0 24px
                    background #fff
                    box-sizing border-box
                    -moz-box-sizing border-box
                    -webkit-box-sizing border-box
                .van-cell-group
                    font-size 24px
                    .van-cell
                        padding 4px 0
                        .label
                            width 100px
                            font-size 26px
                            margin-right 10px
                            display inline-block
                        .text
                            font-size 26px
                            color #575757
                        .size22
                            font-size 22px
                            float right
                .van-hairline--top-bottom::after,.van-cell:not(:last-child)::after
                    border none
                .select-wrap /deep/ .van-cell__value
                    flex none
                // 优惠券
                .detailCoupons
                    .van-actionsheet__content
                        padding-top 88px
                    .van-actionsheet__header
                        width 100%
                        height 88px
                        background #ffffff
                        position absolute
                        top 0
                        left 0
                    .coupon-list
                        height 600px
                        overflow-y auto
                        li
                            width 714px
                            height 222px
                            font-size 30px
                            display flex
                            align-items center
                            margin 0 auto
                            background url("~/static/images/details/coupon-bg.png") no-repeat
                            background-size 100%
                            margin-bottom 14px
                            &.new
                                background url("~/static/images/details/new-coupon-bg.png") no-repeat
                                background-size 100%
                            .full-reduction
                                width 260px
                                color #ffffff
                                text-align center
                                margin-right 30px
                                .coupon-amount
                                    font-size 90px
                                    .unit
                                        font-size 30px
                            .couponInfo
                                color #383838
                                .coupon-name
                                    font-size 30px
                                    margin-bottom 20px
                                .validity-date
                                    font-size 24px
                                    margin-bottom 30px
                                .useBtn
                                    width 366px
                                    height 50px
                                    line-height 50px
                                    font-size 24px
                                    text-align center
                                    color #ffffff
                                    background #ff5f58
                                    display block
                                    border-radius 5px
                    .none
                        text-align center
                        margin 50px auto
                        img
                            width 80px
                        p
                            font-size 24px
                            line-height 50px
        .tab-content
            .van-tabs >>> .van-hairline--top-bottom::after
                border none
            .van-tabs >>> .van-tabs__content
                margin-top 30px
            .van-tabs >>> .van-ellipsis
                width 100%
                height 100%
                font-size 30px
                background url("/static/images/details/line-right.png") right  center no-repeat
                background-size 2px 27px
            .van-tabs >>> .van-tab--active
                color #f70a0a
            .van-tabs >>> .van-tab:last-child span
                background none
            // 商品详情
            .details-wrap
                img
                    width 100% 
            // 参数
            .params-wrap
                width 100%
                padding 0 25px
                box-sizing border-box
                .param-list
                    li  
                        height 58px
                        font-size 26px
                        color #414040
                        display flex
                        align-items center
                        border 1px solid #c1c1c1
                        border-bottom none
                        &:last-child
                            border-bottom 1px solid #c1c1c1
                        .param-name
                            width 175px
                            height 100%
                            line-height 58px
                            border-right  1px solid #c1c1c1
                            padding-left 34px
                            box-sizing border-box
                            flex 1
                        .param-value
                            flex 4
                            padding-left 28px
                            box-sizing border-box
            // 商品评论
            .comment-wrap
                // padding 0 25px
                // box-sizing border-box
                .comment-list
                    li
                        color #4a4949
                        background-color #ffffff
                        border-radius 8px
                        margin-bottom 10px
                        border-bottom 2px solid #eeeeee
                        padding 30px 40px
                        box-sizing border-box
                        .eval-user
                            height 60px
                            display flex
                            justify-content space-between
                            align-items center
                            margin-bottom 20px
                            .user
                                display flex
                                align-items center
                                .avatar
                                    width 60px
                                    height 60px
                                    margin-right 20px
                                    img 
                                        width 100%
                                        display block
                                .text
                                    font-size 26px
                                    span 
                                        display block
                                        line-height 30px
                                    .date
                                        font-size 20px
                                        color #999 
                                        margin-top 10px
                        .eval-content
                            margin-bottom 20px
                            p
                                font-size 22px
                        .imgView
                            overflow hidden
                            height 200px
                            span
                                width 30%
                                height 100%
                                display flex
                                align-items center
                                justify-content center
                                float left
                                margin-right 20px
                                border-radius 5px
                                overflow hidden
                                img
                                    max-width 100%
                                    max-height 100%
                .end-wrap
                    font-size 20px
                    color #888888
                    text-align center
                    margin 30px auto
    .sku-wrap
        .sku-content
            padding 0 25px
            box-sizing border-box
            .sku-row
                border-bottom 1px solid #e6e6e6
                position relative
                .sku-row-title
                    font-size 30px
                    color #151515
                    margin 30px auto
                .sku-row-con
                    .sku-row-item
                        width 160px
                        height 40px
                        line-height 40px
                        background-color #f3f3f3
                        text-align center
                        margin-right 100px
                        margin-bottom 28px
                        display inline-block
                        border-radius 8px
                        &.active
                            background-color #ff0000
                            color #ffffff
                        &:nth-child(3n+3)
                            margin-right 0
                .stepper
                    position absolute
                    right 0
                    top 0
                        
            .confirmBtn
                width 100%
                height 50px
                line-height 50px
                border none
                border-radius 20px
                color #ffffff
                background linear-gradient(to right, #ff2d10 , #fa1c2c)
                margin 30px auto 10px

    .bottom-bar
        .van-goods-action
            z-index 99
    .guige
        height 58%
        width 100%
        position fixed
        top 0
        left 0
        background #000
        z-index 1000
        opacity 0.4
        scoll no
        // display flex
    .guige_box
        z-index 9999
        background #fff
        width 90%
        height 600px
        position fixed
        bottom 0
        left 0
        padding 5%
        .gun
            width 100%
            height 370px
            overflow scroll
            .guibox
                margin 20px 0
                overflow hidden
                h3
                    font-size 30px
                    line-height 60px
                ul
                    margin 20px
                    li
                        float left
                        width 160px
                        height 40px
                        font-size 26px
                        line-height 40px
                        background #f3f3f3
                        text-align center
                        margin 10px
                        color #151515;
                    .productActive
                        background #ff0000
                        color   #fff
        .guigenum
            height 100px
            width   90%
            position absolute
            bottom  180px
            h3
                font-size 30px
                line-height 100px
                float left
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
                position absolute
                right 50px
                top 50%;
                transform translate(0,-50%)
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
        .guigegd
            position absolute
            bottom 50px
            width  90%
            height  88px
            background #ff2d10
            line-height 88px
            font-size 30px
            text-align center
            border-radius 44px
            color #fff
        .guige_bottom
            position absolute
            top 50px
            right 50px
            width 50px
            height 50px
            border-radius 50px
            border 1px solid #5f5f5f
            color #5f5f5f
            font-size 40px
            line-height 50px
            text-align center
</style>
