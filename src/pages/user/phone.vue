<template>
	<div class="alipay_wrap">
		<!-- 头部组件 -->
		<Pay-Header custom-title="绑定手机号" custom-fixed>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</Pay-Header>
        <div class="content">
			<div class="row_wrap">
				<!-- 手机号码 -->
				<div class="name_wrap">
					<div class="name">手机号码</div>
					<div class="inp_wrap">
						<input type="text" placeholder="请输入手机号" v-model="mobile" />
					</div>
				</div>
				<!-- 验证码 -->
				<div class="name_wrap" style="width:65%;float:left;">
					<div class="name">验证码</div>
					<div class="inp_wrap"  style="width:55%;">
						<input type="text" placeholder="请输入验证码" v-model="cod" />
					</div>
				</div>
                <!-- 验证码按钮 -->
                <div class="code_btn" :style="flag?'':'pointer-events:none;border-color:#ccc;color:#ccc;'" @click="code">
                    {{but}}
                </div>
			</div>
			<!-- 确认按钮 -->
			<div class="submit_btn" @click="send">确认</div>
		</div>

	</div>
</template>

<script>
	import PayHeader from "@/pages/common/header/TopHeader"
	export default {
		name: "alipay",
		data() {
			return{
				mobile: '',
                cod: '',
                but: '获取验证码',
                flag: true
			}
		},
		components: {
			PayHeader,
		},
		methods:{
			code(){
                // 获取验证码
                if(this.mobile==''){
                    alert('手机号不能为空');
                    return false;
                }else if(this.mobile.length<11){
                    alert('手机号格式错误');
                    return false;
                }
                let _this = this;
                let s = 60;
                let time = setInterval(function(){
                    s--;
                    _this.flag = false;
                    _this.but = s+'秒后重新获取';
                    if(s==0){
                        _this.but = '获取验证码'
                        _this.flag = true;
                        clearInterval(time)
                    }
                },1000)
                console.log(_this.mobile)
                this.$axios.post('home/send_sms',{
                    token:_this.$store.state.token,
                    mobile:_this.mobile
                })
                .then(function(response){
                    if(response.data.status==1){
                        console.log(response);
                    }else{
                        alert(response.data.msg)
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            send(){
                // 发送请求
                let _this = this;
                this.$axios.post('home/bind_mobile',{
                    token:_this.$store.state.token,
                    mobile:_this.mobile,
                    code:_this.cod
                })
                .then(function(response){
                    if(response.data.status==1){
                        console.log(response);
                    }else{
                        alert(response.data.msg)
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
    .name_wrap
        border-radius 20px
        border: 2px solid #ccc
    .code_btn
        float right
        width 220px
        height 88px
        line-height 88px
        text-align center
        color #1195e9
        background #ffffff
        border-radius 10px
        border 2px solid #1195e9
	.alipay_wrap
		width 100%
		height 100%
		.content
			padding-top 88px
			.row_wrap
				margin 15px 24px
				border-radius 6px
				.name_wrap
					margin-bottom 30px
					background #fff	
				.name_wrap .name,.inp_wrap
					display inline-block
					vertical-align top
				.name
					width 150px
					font-size 30px
					color #151515
					text-align right
					line-height 88px
				.inp_wrap
					margin-left 45px	
				.inp_wrap input
					width 100%
					border none
					outline none
					font-size 26px
					color #151515
					line-height 88px
				.inp_wrap input::-webkit-input-placeholder
					font-size 24px
					color #a0a0a0
			.submit_btn
				position absolute
				bottom 50px
				left 0
				right 0
				margin auto
				width 702px
				height 88px
				background #ff4d4d
				border-radius 44px
				color #fff
				font-size 36px
				text-align center
				line-height 88px
				letter-spacing 4px
			.map_wrap
				margin 10px 24px 50px
				img
					display block
					margin 0 auto 
					max-width 100%
					border-radius 10px		

</style>