<template>
	<div class="acc_wrap">
		<!-- 头部组件 -->
		<Acc-Header custom-title="账户余额" custom-fixed>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</Acc-Header>
        <div class="content">
            <div class="the_wrap">
                <div class="back">
                    <div class="center_box">
                        <p class="can">金额</p>
                        <div class="sum">
                            <span>￥</span><span>{{data.money}}</span>
                        </div>
                    </div>
                </div>
                <!-- 充值、提现按钮 -->
                <div class="btn_wrap" v-if="data.show==1">
                    <!-- 提现 -->
                    <router-link to="/user/withdrawal">
                        <div class="draw">提现</div>
                    </router-link>    
                </div>
                <!-- 明细 -->
                <div class="detail_wrap">
                    <!-- 提现 -->
                    <router-link to="/user/theWithdrawal">
                        <div class="dep">
                            <div class="the">提现明细</div>
                            <div class="icon"></div>
                        </div>
                    </router-link>   
                    <!-- 账单 -->
                    <router-link to="/user/zhangdandetail">
                        <div class="dep">
                            <div class="the">账单明细</div>
                            <div class="icon"></div>
                        </div>
                    </router-link>    
                </div>
            </div>
        </div>
	</div>
</template>

<script>
	import AccHeader from "@/pages/common/header/TopHeader"
	export default {
        name: 'theAccountBalance',
        components: {
			AccHeader,
		},
		data() {
			return{
                data:''
			}
		},
		mounted(){
            this.requestData();//请求数据
        },
        methods:{
            // 请求数据
            requestData(){
                let _this = this;
                this.$axios.get('home/get_user_info',{
                    params:{
                        token:_this.$store.state.token
                    }
                })
                .then(function(response){
                    console.log(response);
                    if(response.data.status == 1){
                        _this.data = response.data.data;
                    }
                    console.log(_this.data)
                })
                .catch(function(error){
                    console.log(error);
                })
            },
        }
	}
</script>

<style lang="stylus" scoped>
    .acc_wrap
        width 100%
        height 100%
        .content
            padding-top 88px
            .the_wrap
                margin 22px 24px
                .back
                    padding 90px 0
                    width 100%
                    background url('/static/images/user/of.png') no-repeat
                    background-size 100% 100%
                    border-radius 10px
                .back .center_box
                    text-align center
                .sum
                    font-size 36px
                    color #fff
                    line-height 85px
                .can
                    font-size 30px
                    color #ffe1e2
                    line-height 45px
                .btn_wrap
                    margin 25px auto 30px
                .btn_wrap .draw
                    width 100%
                    height 80px
                    margin 0 auto
                    border-radius 44px
                    font-size 30px
                    text-align center
                    line-height 80px
                    letter-spacing 4px
                    background #ff4d4d
                    color #fff
            .detail_wrap
                margin 55px 0
                .dep div
                    display inline-block
                    vertical-align middle
                .dep
                    margin 0 0 15px 0
                    padding 0 33px
                    font-size 30px
                    background #fff
                    color #151515
                    line-height 88px
                    border-radius: 10px;    
                .icon
                    float right
                    margin 36px 0 0 
                    width 8px
                    height 14px
                    background url('/static/images/user/leftArrow1.png') no-repeat
                    background-size 100% 100%

</style>