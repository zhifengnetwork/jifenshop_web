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
					<div class="play_wrap" v-if="item!=''">
						<!-- 微信/支付宝-提现金额 -->
						<div class="sum_wrap">
							<h4>提现金额</h4>
							<!-- 支付宝账号编辑 -->
							<div class="put">
                                <span class="dollars">￥</span>
								<div class="inp">
									<input type="number" v-model="num" @input="In" @keyup="number" :placeholder="`请输入提现金额(金额为${data.times}的倍数)`"/>
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
                                <div class="unit" style="margin-right:20px;">手续费为提现金额的{{data.rate_percent}}%</div>
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
    import { Toast } from 'vant';
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
                reality:'',
                item:''
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
                this.$axios.get('home/withdrawal',{
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
            number(e){　　
                this.num = (e.target.value.match(/^[1-9]\d*/g,'')[0]) || null
        　　},
            all(){
                this.num = this.data.money;
                this.In();
            },
            In(){
                if(Number(this.num)>Number(this.data.money)){
                    this.num = this.data.money;
                }
                if(Number(this.num)>Number(this.data.max)){
                    this.num = this.data.max;
                }
                let cny = this.data.rate_percent;
                this.poundage = parseFloat(this.num*cny/100).toFixed(2);
                this.reality = parseFloat(this.num-this.poundage).toFixed(2);
            },
            apply(){
                let _this = this;
                if(!_this.item){
                    Toast('请选择提现方式')
                    return false;
                }
                if(this.num==''){
                    Toast('请输入提现金额')
                    return false;
                }
                if(this.num%50!=0){
                    Toast('请输入50的倍数')
                    return false;
                }
                this.$axios.post('home/withdraw',{
                    token:_this.$store.state.token,
                    type:_this.item.type,
                    card_id:_this.item.card_id,
                    money:_this.num
                })
                .then(function(response){
                    console.log(response);
                    if(response.data.status==1){
                        Toast.success('申请成功,等待审核');
                        _this.$router.go(-2);
                    }
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
            margin 320px auto 0
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