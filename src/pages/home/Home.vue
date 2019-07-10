<template>
	<div class="Home">
		<div v-if="data!=''">	
			<!-- 搜索 -->
			<router-link class="top-bar" to="/Home/search">
				<div class="search">
					<span class="search-icon"></span>
					<span class="text">搜索</span>
				</div>
			</router-link>
			<!-- 轮播图 -->
			<div class="banner">
				<van-swipe :autoplay="3000" indicator-color="white">
					<van-swipe-item v-for="(item,index) in data.banner" :key="index">
						<router-link :to="item.url" :pid="item.id">
							<img :src="item.picture"/>
						</router-link>
					</van-swipe-item>
				</van-swipe>
			</div>

			<!-- 公告 -->
			<div class="notice" v-for="(item,index) in data.notice" :key="index">
				<van-notice-bar
					:text="item.value"
					left-icon="volume-o"
					color="#ffffff"
					background="#f92a0f"
				/>
			</div>
			<!-- 分类 -->
			<div class="classify">
				<div class="classify_btn" v-for="(item,index) in data.catenav" :key="index">
					<router-link :to="item.url">
						<div class="btn_imgWrap">
							<img class="btn_img" :src="item.image">
						</div>
						<div class="btn_text">
							{{item.title}}
						</div>
					</router-link>
				</div>
			</div>

			<!-- 会员 -->
			<div class="five" v-if="!card.number">
				<router-link to="Vip">
					<div class="five_title">
						抢购会员卡
					</div>
					<div class="five_info">
						<p>会员卡</p>
						<p>￥{{card.money}}</p>
						<span class="buy">立即购买></span>
					</div>
				</router-link>
				
			</div>
			<!-- 查看会员卡 -->
			<div class="fiveing" v-if="card.number">
				<router-link :to="'Vip?card='+card.number">
					<div class="five_title">
						臻致康健康商城
					</div>
					<div class="five_info">
						NO:{{card.number}}
					</div>
					<div class="buy">查看详情></div>
				</router-link>
			</div>
			<!-- 热销商品 -->
			<div class="hot-wrap">
				<div class="heading">
					<i class="icon"><img src="/static/images/home/hot-icon.png"></i>
					<h3>热销商品</h3>
				</div>
				<div class="hot-list">
					<div class="single-item" v-for="(item,index) in data.hotgoods" :key="index">
						<router-link :to="{path:'/Details',query:{id:item.goods_id}}">
							<div class="img-wrap">
								<img :src="item.picture" />
							</div>
							<div class="main">
								<h3>{{item.goods_name}}</h3>
								<div class="price">
									<p class="discount-price">￥{{item.price}}</p>
									<p class="original-price">原价:<s>￥{{item.original_price}}</s></p>
								</div>
							</div>
						</router-link>
					</div>
				</div>
			</div>
			
			<!-- 推荐商品 -->
			<div class="recommend-wrap">
				<div class="heading">
					<i class="icon"><img src="/static/images/home/recommend-icon.png"></i>
					<h3>推荐商品</h3>
				</div>
				<div class="recommend-list">
					<div class="single-item" v-for="(item,index) in data.commendgoods" :key="index">
						<router-link :to="{path:'/Details',query:{id:item.goods_id}}">
							<div class="img-wrap">
								<img :src="item.picture" />
							</div>
							<div class="main">
								<h3>{{item.goods_name}}</h3>
								<div class="price">
									<p class="discount-price">￥{{item.price}}</p>
									<p class="original-price">原价:<s>￥{{item.original_price}}</s></p>
								</div>
							</div>
						</router-link>
					</div>
				</div>
			</div>

			<!-- 底部导航 -->
			<Navigate></Navigate>
		</div>
		<!-- load -->
		<div class="load" v-if="data==''">
			<van-loading size="44px" color="#1989fa" />
		</div>
	</div>
</template>

<script>
import Navigate from "@/pages/common/footer/Navigate";
import { Loading } from 'vant';
export default {
	name: "home",
	data() {
		return {
			data:'',
			card:''
		};
	},
	components: {
		Navigate
	},
	mounted(){
		let _this = this;
		//url 里有 code ，延时1秒再执行
		setTimeout(function(){
			console.log("Home before line 127 "+Date.now())
			
			var token = window.localStorage.getItem("token");
			if(!token){
				token = this.$store.state.token;
			}
			console.log('首页token:'+token)
			_this.$axios.get('index?token='+token)
			.then(function(response){
				console.log(response.data);
				console.log("Home after line 127 "+Date.now())

				if(response.data.status == 1){
					_this.data = response.data.data;
					_this.card = response.data.data.card;
				}
			})
			.catch(function(error){
				console.log(error);
			})

		},1000)
		
	}
};
</script>


<style lang="stylus" scoped>
.Home
	padding-bottom 114px
	.top-bar
		width 100%
		height 76px
		background-color #f57121
		display flex
		align-items center
		justify-content center
		position fixed
		left 0
		top 0
		z-index 9
		.search
			width 700px
			height 60px
			background-color #ffffff
			border-radius 25px
			display flex
			align-items center
			justify-content center
			.search-icon
				width 26px
				height 24px
				background url(/static/images/home/search-icon.png) no-repeat 
				background-size 100%
				margin-right 10px
			.text
				color #a7a7a7
				font-size 28px
	.banner
		width 100%
		line-height 40px
		padding-top 76px
		img 
			width 100% 
			display block
	.notice
		margin-bottom 20px
		.van-notice-bar
			height 40px
		.van-notice-bar >>> .van-icon 
			width 33px
			height 27px
			background url(/static/images/home/notice-icon.png) no-repeat 
			background-size 100%
			margin-right 20px
		.van-notice-bar >>>	.van-icon-volume-o:before
			content ''
		.van-notice-bar >>> .van-notice-bar__left-icon, .van-notice-bar__right-icon
			min-width 33px
	.classify
		margin 0 30px
		display -webkit-box
		display  -moz-box
		display  -ms-flexbox
		display  -webkit-flex
		display  flex
		-webkit-justify-content space-around	
		justify-content space-around
		-moz-box-pack space-around
		box-pack space-around
		.classify_btn
			width 20%
			.btn_imgWrap
				margin auto
				width 88px
				height 88px
				border-radius 50%
				overflow hidden
				.btn_img
					width 100%
					height 100%
			.btn_text
				color #151515
				line-height 50px
				text-align center
	.five
		position relative
		margin  20px 24px 0
		height 262px
		background url('/static/images/home/five_bg.png')
		background-size cover
		text-align center
		font-size 30px
		font-weight bold
		.five_title
			color #151515
			text-align center
			line-height 88px
		.five_info
			color #151515
			margin-top 40px
			line-height 50px
		.buy
			position absolute
			right 20px
			bottom 10px
			color #151515
	.fiveing
		position relative
		margin  20px 24px 0
		height 262px
		background url('/static/images/home/VIP.png')
		background-size cover
		text-align center
		font-size 30px
		font-weight bold
		border-radius 20px
		a
			display block
			width 100%
			height 100%
		.five_title
			position absolute
			left 50px
			top 40px
			color #692c07
		.five_info
			position absolute
			left 50px
			bottom 40px
			color #867759
		.buy
			position absolute
			right 30px
			bottom 30px
			color #151515
	.heading
		height 82px
		display flex
		align-items center
		.icon
			width 28px
			height 28px
			display inline-block
			margin-right 12px
			img 
				max-width 100%
				max-height 100%
				display inline-block
		h3
			font-size 30px
			color #151515	
	.hot-wrap
		padding 0 .25rem
		box-sizing border-box
		.hot-list
			display flex
			flex-wrap wrap
			.single-item
				width 48%
				height 494px
				background-color #fff
				border-radius 8px
				overflow hidden
				margin 0 20px 20px 0
				padding 10px
				box-sizing border-box
				&:nth-child(2n)
					margin-right 0
				.img-wrap
					width 320px
					height 320px
					overflow hidden
					img 
						max-width 100%
						max-height 100%
				.main
					flex 1
					h3
						font-size 22px
						color #151515
						height 64px
						-webkit-box-orient vertical
						-webkit-line-clamp 2
						display -webkit-box
						overflow hidden
						text-overflow ellipsis
					.price
						.discount-price
							font-size 30px
							color #ed0d0d
							line-height 50px
						.original-price
							font-size 24px
							color #a1a1a1
	.recommend-wrap
		padding 0 .25rem
		box-sizing border-box
		.recommend-list
			.single-item
				width 100%
				height 324px
				background-color #fff
				border-radius 8px
				overflow hidden
				margin-bottom 12px
				padding 12px
				box-sizing border-box
				a
					display flex
					align-items center
					.img-wrap
						width 300px
						height 300px
						overflow hidden
						margin-right 28px
						img 
							max-width 100%
							max-height 100%
					.main
						h3
							height 70px
							font-size 26px
							color #151515
							-webkit-box-orient vertical
							-webkit-line-clamp 2
							display -webkit-box
							overflow hidden
							text-overflow ellipsis
							margin-bottom 80px
						.price
							display flex
							align-items center
							justify-content space-between
							margin-right 26px
							.discount-price
								font-size 30px
								color #ed0d0d
							.original-price
								margin-left 20px
								font-size 24px
								color #a1a1a1
.load
	position absolute
	left 0
	right 0
	bottom 0
	top 0
	margin auto
	width 100px
	height 100px
</style>
