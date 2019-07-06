<template>
	<div class="wit_wrap">
		<!-- 头部组件 -->
		<With-Header custom-title="账户提现" custom-fixed>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</With-Header>
        <div class="content">
            <div class="hd_wrap">
				<div class="back">
                    <div class="k_box">
                        <p class="can">可提现金额</p>
                        <div class="sum">
                            <span>￥</span><span>{{data.money}}</span>
                        </div>
                    </div>
                </div>
				<!-- 提现方式 -->
				<div class="way_wrap">
					<router-link to="/user/bankcard">
                        <div class="mode">
                        <h4>提现方式</h4>
                        <span>></span>
                    </div>
                    </router-link>
					<!-- 选择方式 -->
					<!-- <div class="mode">
						<div class="wechat" v-for="(item,index) in pay" :key="index" @click="cur=index" :class="{on:cur==index}">
							<img :src="item.img"/>
						</div>
					</div> -->
					<div class="play_wrap">
						<!-- 微信/支付宝-提现金额 -->
						<div class="sum_wrap">
							<h4>提现金额</h4>
							<!-- 支付宝账号编辑 -->
							<div class="put">
                                <span class="dollars">￥</span>
								<div class="inp">
									<input type="text" v-model="num" @input="In" placeholder="请输入提现金额"/>
								</div>
								<div class="all_btn" @click="all()">全部提现</div>
							</div>
							<!-- 手续费 -->
							<div class="fee_wrap">
								<div class="fee">
									<span>手续费:</span>
									<span>{{poundage}}</span>
								</div>
								<div class="unit">元</div>
							</div>
							<!-- 实际到账 -->
							<div class="fee_wrap">
								<div class="fee">
									<span>实际到账:</span>
									<span>{{reality}}</span>
								</div>
								<div class="unit">元</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 申请提现按钮 -->
				<div class="apply_btn" @click="apply">申请提现</div>
			</div>
		</div>
	</div>
</template>

<script>
	import WithHeader from "@/pages/common/header/TopHeader"
	export default {
        name: 'withdrawal',
        components: {
			WithHeader,
		},
		data() {
			return{
                data:'',
                num:'',
                poundage:'',
                reality:''
			}
        },
        created(){
            if(!this.$route.params.item){
                return false;
            }
            this.item = this.$route.params.item;
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
                    _this.data = response.data.data;
                    console.log(_this.data)
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            all(){
                this.num = this.data.money;
                this.In();
            },
            In(){
                if(Number(this.num)>Number(this.data.money)&&Number(this.num)<this.data.withdraw_max){
                    this.num = this.data.money;
                }
                let cny = this.data.withdraw_rate;
                this.poundage = Math.floor(this.num*cny*100)/1e4;
                this.reality = Math.floor((this.num-this.poundage)*100)/100;
            },
            apply(){
                let _this = this;
                if(!_this.item){
                    alert('请选择提现方式')
                    return false;
                }
                this.$axios.post('home/withdraw',{
                    token:_this.$store.state.token,
                    type:_this.item.type,
                    card_id:_this.item.card_id,
                    money:_this.reality
                })
                .then(function(response){
                    console.log(response);
                })
                .catch(function(error){
                    console.log(error);
                })
            }
        }
	}
</script>

<style lang="stylus" scoped>
.wit_wrap
    width 100%
    height 100%
    .content
        padding 88px 0 0
        .hd_wrap
            margin 21px 24px 30px
        .back
            padding 90px 0
            width 100%
            background url('/static/images/user/of.png') no-repeat
            background-size 100% 100%
        .k_box
            text-align center
            line-height 55px
            .sum
                font-size 36px
                color #fff
            .can
                font-size 30px
                color #ffe1e2
        .way_wrap
            .mode
                h4
                    color #151515
                    font-size 26px
                    display inline-block
                    margin 22px 0 40px
                span
                    float right
                    margin-top 22px
            .sum_wrap
                .sum_wrap
                .put
                    padding 22px 0
                    border-bottom 1.1px solid #e6e6e6
                .dollars
                    font-size 30px
                    line-height 50px
                    font-weight 600    
                .put .inp,.all_btn
                    display inline-block
                    vertical-align top
                    font-size 24px
                    color #151515
                .inp input
                    width 550px
                    height 45px
                    font-size 26px
                    color #151515
                    .inp input::-webkit-input-placeholder
                        font-size 26px
                        color #717171
                .all_btn
                    float right
                    line-height 45px
                .fee_wrap
                    padding 22px 0
                    line-height 45px
                    border-bottom 1.1px solid #e6e6e6
                .fee_wrap .fee,.unit
                    display inline-block
                    vertical-align top
                    font-size 26px
                    color #151515
                .unit
                    float right
                .icon
                    margin 16px 0 0 
                    width 25px
                    height 25px
                    background url('/static/images/user/address/address-edit-icon.png') no-repeat
                    background-size 100% 100%
        .apply_btn
            position absolute
            bottom 50px
            left 0
            right 0
            margin auto
            width 702px
            height 88px
            background #ff4d4d
            border-radius 44px
            font-size 30px
            color #fff
            text-align center
            line-height 88px
            letter-spacing 4px

</style>