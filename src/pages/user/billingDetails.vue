<template>
	<div class="zd_wrap">
		<!-- 头部组件 -->
		<Bill-Header custom-title="积分记录" custom-fixed>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</Bill-Header>
		<div class="content">
			<div class="ft_wrap">
				<div class="tit_wrap">
					<ul>
						<li v-for="(item,index) in tabList" 
						:key="index" 
						:class="{on:index === nowIndex}" 
						@click="handleClick(index)">{{item.tabTitle}}</li>
					</ul>
				</div>
				<div class="item_wrap">
					<div class="title">
						<ul>
							<li v-show="nowIndex===0">订单</li>
							<li v-show="nowIndex===1">下级昵称</li>
							<li>日期</li>
							<li>金额</li>
							<li>备注</li>
						</ul>
					</div>
					<div class="list" v-show="nowIndex===0">
						<ul v-for="(tes,index) in reduce" :key="index">
							<li style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{tes.no}}</li>
							<li style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{tes.date}}</li>
							<li style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{tes.point}}</li>
							<li style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{tes.note}}</li>
						</ul>
					</div>
					<div class="list" v-show="nowIndex===1">
						<ul v-for="(tes,index) in increase" :key="index">
							<li style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{tes.nickname}}</li>
							<li style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{tes.date}}</li>
							<li style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{tes.point}}</li>
							<li style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{tes.note}}</li>
						</ul>
					</div>

				</div>

			</div>
		</div>
		<div class="foot" v-if="flag">我是有底线的哦~~</div>
    </div>    
</template>

<script>
	import BillHeader from "@/pages/common/header/TopHeader"
	export default {
        name: 'billingDetails',
		data() {
			return{
				reduce:'',
				increase:'',
                tabList:[
					{
						tabTitle:"消费"
					},
					{
						tabTitle:"赚取"
					}
				],
				nowIndex:0,
				page:1,
				flag:false
			}
		},
		components: {
			BillHeader,
		},
		mounted(){
			this.requestData();
			window.addEventListener('scroll', this.scrollBottom);
		},
		methods: {
            handleClick(index){
				this.nowIndex = index;
				this.page = 1;
				this.flag = false;
				this.requestData();
			},
			requestData(){
				let _this = this;
				this.$axios.post('home/point_log',{
					token:_this.$store.state.token,
					type:_this.nowIndex,
					p:_this.page
				})
				.then(function(response){
					console.log(response);
					if(response.data.status == 1){
						if(_this.page>1){
							for(let i=0;i<response.data.data.length;i++){
								if(response.data.data.length<20){
									_this.flag = true;
								}
								if(_this.nowIndex==0){
									_this.reduce.push(response.data.data[i]);
								}else{
									_this.increase.push(response.data.data[i]);
								}
							}
						}else{
							if(_this.nowIndex==0){
								_this.reduce = response.data.data;
							}else{
								_this.increase = response.data.data;
							}
						}
					}
					console.log(_this.reduce)
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
			},
		
	},
	destroyed: function () {
		window.removeEventListener('scroll', this.scrollBottom);
	},

}
</script>

<style lang="stylus" scoped>
.zd_wrap
    width 100%
    height 100%
    .content
        padding 88px 0 0
        .ft_wrap
            margin 20px 24px
            .tit_wrap
                font-size 0
                background #fff
            .tit_wrap ul li
                display inline-block
                width 50%
                font-size 30px
                text-align center
                line-height 65px
                font-weight 550
            .tit_wrap ul li.on
                color #ef1010
            .item_wrap .title
                background #c6e1ff
                color #151515
                font-size 0
            .item_wrap .title ul li
                display inline-block
                width 25%
                font-size 26px
                text-align center
                line-height 50px
            .item_wrap .list
                background #fff4f0
                color #151515
                font-size 0
            .item_wrap .list ul li
                display inline-block
                vertical-align middle	
                width 25%
                font-size 18px
                text-align center
                line-height 68px
				white-space nowrap
				overflow hidden
				text-overflow ellipsis
			.item_wrap .list ul:nth-child(odd)
				background #f3f9ff
			.item_wrap .list ul:nth-child(even)
            	background #ecf4fc
.foot
	line-height 100px
	text-align center
				

</style>