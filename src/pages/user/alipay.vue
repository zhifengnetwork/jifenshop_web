<template>
	<div class="alipay_wrap">
		<!-- 头部组件 -->
		<Pay-Header custom-title="添加支付宝账号" custom-fixed>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</Pay-Header>
        <div class="content">
			<div class="row_wrap">
				<!-- 支付宝账号 -->
				<div class="name_wrap">
					<div class="name">支付宝账号</div>
					<div class="inp_wrap">
						<input type="text" placeholder="请输入支付宝账号" v-model="Num" />
					</div>
				</div>
				<!-- 真实姓名 -->
				<div class="name_wrap">
					<div class="name">真实姓名</div>
					<div class="inp_wrap">
						<input type="text" placeholder="请输入真实姓名" v-model="Name" />
					</div>
				</div>
			</div>
			<!-- 确认按钮 -->
			<div class="submit_btn" @click="btn">确认</div>
		</div>

	</div>
</template>

<script>
	import PayHeader from "@/pages/common/header/TopHeader"
	import { Toast } from 'vant';
	export default {
		name: "alipay",
		data() {
			return{
				list: '',
				Num: '',
				Name: ''
			}
		},
		components: {
			PayHeader,
		},
		methods:{
			btn:function (){
				if(this.Num==''){
					Toast('请输入支付宝账号');
					return false;
				}
				if(this.Name==''){
					Toast('请输入真实姓名');
					return false;
				}
				let that = this;
				// console.log(this.abc)
					this.$axios({
				method: 'post',
				url: 'home/bind_alipay',
				data: {
					number: this.Num,
					name: this.Name,
					"token": that.$store.state.token
				}
			})
			.then((res) => {
				if(res.data.status == 1){
					Toast.success('添加成功');
					that.$router.push({name:'bankcard'})
				}
				console.log(res)
			})
		}
			
		}
	}
</script>

<style lang="stylus" scoped>
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
					padding 25px 0
					background #fff	
				.name_wrap .name,.inp_wrap
					display inline-block
					vertical-align top
				.name
					width 200px
					font-size 30px
					color #151515
					text-align right
					line-height 65px
				.inp_wrap
					margin-left 45px	
				.inp_wrap input
					width 400px
					border none
					outline none
					font-size 26px
					color #151515
					line-height 65px
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