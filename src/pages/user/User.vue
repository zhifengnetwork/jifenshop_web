<template>
    <div class="user">
        <div class="header">
            <div class="info_wrap">
                <router-link class="my_look" to="/user/personalData">
                    <div class="portrait">
                        <img :src="data.avatar"/>
                    </div>
                </router-link>    
                <div class="name_wrap">
                    <p class="name">{{data.nickname}}</p>
                    <p class="id">ID：{{data.id}}</p>
                    <!-- <p class="joinDate">加入时间：2019.06.12</p> -->
                </div>
            </div>

            <div class="members">{{data.level}}</div>

            <div class="article">
                <div class="user_item">
                    <div class="earnings">
                         <!-- <router-link class="look" to="/user/shouyilist"> -->
                        <router-link class="look" to="/user/jifeng">
                            <div class="number">{{data.point}}</div>
                            <div>
                                积分
                                <i class="right_arrow"></i>
                            </div>
                        </router-link>
                    </div>
                    <div class="balance">
                        <router-link class="look" to="/user/theAccountBalance">
                            <div class="number">{{data.money}}</div>
                            <div>
                                余额
                                <i class="right_arrow"></i>
                            </div>
                        </router-link>
                    </div>
                    <router-link to="/user/Collect" class="collection">
                        <div class="number">{{data.collect}}</div>
                        <div>
                            收藏
                            <i class="right_arrow"></i>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="content">
            <!-- 我的订单 -->
            <div class="order_wrap">
                <router-link class="look" to="/order?type=0">
                    <div class="title_wrap">
                        <h2>我的订单</h2>
                        <div class="check">
                                查看全部订单
                            <i class="right_icon"></i>
                        </div>
                    </div>
                </router-link>
                <div class="item_wrap">
                    <ul class="item">
                        <li v-for="(item,index) in order" :key="index">
                            <!-- '/order?type='+Number(index+1) -->
                            <!-- /Order/ReturnGoods -->
                            <!-- /order?type='+Number(index+1)' -->
                            <!-- :to="Number(index+1)==5?'/Order/ReturnGoods':'/order?type='+Number(index+1)" -->
                            <router-link class="look" :to="Number(index+1)==5?'/Order/ReturnGoods':'/order?type='+Number(index+1)">
                                <div class="img">
                                    <img :src="item.img"/>
                                    <div class="info-icon van-info" v-if="item.icon">{{item.icon}}</div>
                                </div>
                                <div>{{item.text}}</div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 我的团队 -->
            <div class="my_team">
                <router-link class="my_look" to="/user/myTeam">
                    <div class="my_team_title">
                        <p>我的团队</p>
                        <p>查看明细<i class="iconfont iconyou"></i></p>
                    </div>
                    <div class="my_team_content">
                        <div class="my_team_item">
                            <p>{{data.team_underling}}</p>
                            <p>总人数</p>
                        </div>
                        <div class="my_team_item">
                            <p>{{data.team_point}}</p>
                            <p>推荐奖励积分</p>
                        </div>
                        <div class="my_team_item">
                            <p>{{data.team_today}}</p>
                            <p>今日新增人数</p>
                        </div>
                    </div>
                </router-link>
            </div>
            <!--  -->
            <div class="list_wrap">
                <!-- <div class="arr_wrap">
                    <router-link class="my_look" to="/user/receiptInformation">
                        <span>收款信息</span>
                        <span class="right_ico"></span>
                    </router-link> 
                </div> -->
                <div class="arr_wrap">
                    <router-link class="my_look" to="/user/phone">
                        <span>手机号绑定</span>
                        <span class="cell">{{data.mobile}}</span>
                        <span class="right_ico"></span>
                    </router-link>
                </div>
                <div class="arr_wrap">
                    <router-link class="my_look" to="/user/Address">
                        <span>地址管理</span>
                        <span class="right_ico"></span>
                    </router-link>
                </div>
                <div class="arr_wrap">
                    <span>商家入驻</span>
                    <span class="right_ico"></span>
                </div>
                <div class="arr_wrap">
                    <router-link class="my_look" to="/user/mySharing">
                        <span>我的分享</span>
                        <span class="right_ico"></span>
                    </router-link>
                </div>
            </div>
        </div>
        <!-- 底部 -->
        <user-Footer></user-Footer>
    </div>
</template>

<script>
    import userFooter from "@/pages/common/footer/Navigate";
    import { Toast } from 'vant';
    export default {
        name: "user",
        data() {
            return {
                data: '',
                order:[
                    {
                        img:'/static/images/user/payment.png',
                        text:'待付款',
                        icon:''
                    },
                    {
                        img:'/static/images/user/dropShipping.png',
                        text:'待发货',
                        icon:''
                    },
                    {
                        img:'/static/images/user/goods.png',
                        text:'待收货',
                        icon:''
                    },
                    {
                        img:'/static/images/user/evaluation.png',
                        text:'待评价',
                        icon:''
                    },
                    {
                        img:'/static/images/user/return.png',
                        text:'退货',
                        icon:''
                    },
                ]
            };
        },
        components: {
            userFooter,
        },
        mounted(){
            let _this = this;
            let ord = ['waitPay','waitSend','waitReceive','waitComment','return']
            var token = window.localStorage.getItem("token");
			if(!token){
				token = this.$store.state.token;
            }
            console.log('User line 188 token:'+token)
            //不存在就跳回首页
            if(!token){
                window.location.href = document.location.protocol+'//'+window.location.host;
                return false;
            }
            this.$axios.get('home/index',{
                params:{
                    token:token
                }
            })
            .then(function(response){
                if(response.data.status==1){
                    console.log(response);
                    _this.data = response.data.data;
                    for(let i=0;i<ord.length;i++){
                        _this.order[i].icon = response.data.data[ord[i]];
                        sessionStorage.setItem('mobile',response.data.data.mobile)
                    }
                    console.log(_this.data)
                }else{
                    Toast(response.data.msg)
                }
            })
            .catch(function(error){
                console.log(error);
            })
        }
    };
</script>

<style lang="stylus" scoped>
    .user
        width 100%
        height 100%
        .header
            position relative
            height 339px
            background url(/static/images/user/top_bj.png) no-repeat
            background-size 100% 100%
            .info_wrap
                padding 56px 0 0 24px
            .info_wrap .portrait,.name_wrap
                display inline-block
                vertical-align middle
            .portrait
                width 110px
                height 100px
                border-radius 50%
                img
                    border-radius 50%
            .name_wrap
                margin 0 0 0 22px
                p
                    color #fff
            .name_wrap .name,.id
                font-size 30px
                .joinDate
                    font-size 24px
            .members
                position absolute
                top 85px
                right 0
                width 155px
                height 50px
                background-image linear-gradient(0deg, 
                    #1791e7 0%, 
                    #26bfff 100%), 
                linear-gradient(
                    #f77383, 
                    #f77383)
                background-blend-mode normal, 
                    normal
                border-radius 25px 0px 0px 25px
                font-size 24px
                color #fff
                text-align center
                line-height 50px
            .article
                margin 70px 24px 0
                background #ffffff
                border-radius 10px
                font-size 0
                .user_item
                    padding 30px 0 35px 0
                .user_item .earnings,.balance,.collection
                    display inline-block
                    vertical-align top
                    width 33.18%
                    font-size 28px
                    color #151515
                    text-align center
                    line-height 55px    
                    .right_arrow 
                        margin 0 0 0 10px
                        display inline-block
                        vertical-align middle
                        width 7px
                        height 11px
                        background url(/static/images/user/leftArrow1.png) no-repeat
                        background-size 100% 100%
                .user_item .earnings,.balance
                    border-right 1.5px solid #efece9    
                .number
                    font-size 36px
                    color #e06f14
        .content
            .order_wrap
                margin 87px 24px 14px 24px
                background #fff
                border-radius 10px           
                .title_wrap
                    margin 0 18px
                    border-bottom 1.5px solid #e6e6e6
                    h2
                        display inline-block
                        font-size 28px
                        line-height 65px
                    .check
                        float right
                        display inline-block
                        font-size 24px
                        color #525252
                        line-height 65px
                        .right_icon
                            margin 0 0 0 17px
                            display inline-block
                            vertical-align middle
                            width 8px
                            height 14px
                            background url(/static/images/user/leftArrow.png) no-repeat
                            background-size 100% 100%
            .item_wrap
                margin 16px 0 0
                padding 0 0 22px
                font-size 0
                .item li 
                    display inline-block
                    width 19.8%
                    color #2f2f2f
                    font-size 26px
                    text-align center
                    line-height 55px
                    border-right 1.5px solid #e6e6e6
                .item li:last-child
                    border none   
                .img 
                    position relative
                    margin 0 auto
                    width 48px
                    height 38px 
                    .info-icon
                        position absolute
                        border 2px solid #fc822e
                        right 15%
                        top -35%
                        font-size 20px
                        color #fea15a
                        background #ffffff
                        text-align center
        .my_team
            margin 20px 24px
            padding 20px
            background #fff
            border-radius 10px
            box-sizing border-box
            -moz-box-sizing border-box
            -webkit-box-sizing border-box
            .my_team_title
                color #151515
                line-height 58px
                border-bottom 2px solid #ccc
                display -webkit-box
                display  -moz-box
                display  -ms-flexbox
                display  -webkit-flex
                display  flex
                -webkit-justify-content space-between	
                justify-content space-between
                -moz-box-pack space-between
                box-pack space-between
            .my_team_content
                height 120px
                text-align center
                color #151515
                display -webkit-box
                display  -moz-box
                display  -ms-flexbox
                display  -webkit-flex
                display  flex
                -webkit-justify-content space-between	
                justify-content space-between
                -moz-box-pack space-between
                box-pack space-between
                .my_team_item
                    margin-top 20px
                    width 30%
                    line-height 50px
                    &:nth-last-of-type({2})
                        width 40%
                        border-left 2px solid #ccc
                        border-right 2px solid #ccc
        .list_wrap
            margin 0 24px 116px 24px
            padding 16px 22px
            background #fff                               
            border-radius 10px
            font-size 28px
            color #525252
            line-height 80px
            .my_look
                display block
                color #525252
            .arr_wrap
                border-bottom 1.5px solid #e6e6e6
                .right_ico
                    margin 34px 0 0
                    float right
                    display inline-block
                    width 8px
                    height 14px
                    background url(/static/images/user/leftArrow.png) no-repeat
                    background-size 100% 100%
                .cell 
                    margin-left 282px
            .arr_wrap:last-child
                border none



img
    display block
    margin 0 auto
    max-width 100%
    height 100%
.look
    color #525252    
</style>
