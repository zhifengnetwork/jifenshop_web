<template>
	<div class="zd_wrap">
		<!-- 头部组件 -->
		<Bill-Header custom-title="账单明细" custom-fixed>
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
							<li>订单</li>
							<li>日期</li>
							<li>金额</li>
							<li>备注</li>
						</ul>
					</div>
					<div class="list" v-show="nowIndex===0">
						<ul v-for="(tes,index) in tits" :key="index">
							<li>{{tes.zhi}}</li>
							<li>{{tes.title}}</li>
							<li>{{tes.ge}}</li>
							<li>{{tes.tips}}</li>
						</ul>
					</div>
					<div class="list" v-show="nowIndex===1">
						<ul v-for="(list,index) in futits" :key="index">
							<li>{{list.zi}}</li>
							<li>{{list.itle}}</li>
							<li>{{list.gs}}</li>
							<li>{{list.tips}}</li>
						</ul>
					</div>

				</div>

			</div>
		</div>
    </div>    
</template>

<script>
	import BillHeader from "@/pages/common/header/TopHeader"
	export default {
        name: 'billingDetails',
		data() {
			return{
                tabList:[
					{
						tabTitle:"消费"
					},
					{
						tabTitle:"赚取"
					}
				],
				tits:[
					{id:1,zhi:'012345678',title:'2019-06-03',ge:'-￥4584.00',tips:'购买商品'},
					{id:2,zhi:'012345678',title:'2019-06-03',ge:'-￥4584.00',tips:'购买商品'},
					{id:3,zhi:'012345678',title:'2019-06-03',ge:'-￥4584.00',tips:'购买商品'},
					{id:4,zhi:'012345678',title:'2019-06-03',ge:'-￥4584.00',tips:'购买商品'}
				],
				futits:[
					{id:1,zi:'012345678',itle:'2019-06-03',gs:'+￥4584.00',tips:'推荐奖励'},
					{id:2,zi:'012345678',itle:'2019-06-03',gs:'+￥4584.00',tips:'推荐奖励'},
					{id:3,zi:'012345678',itle:'2019-06-03',gs:'+￥4584.00',tips:'推荐奖励'},
					{id:4,zi:'012345678',itle:'2019-06-03',gs:'+￥4584.00',tips:'推荐奖励'}
				],
				nowIndex:0,
			}
		},
		components: {
			BillHeader,
		},
		methods: {
             handleClick(index){
                this.nowIndex = index;
            },
		},
		mounted(){
			let _this = this;
			this.$axios.get('home/balance_list',{
				params:{
					token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJEQyIsImlhdCI6MTU1OTYzOTg3MCwiZXhwIjoxNTU5Njc1ODcwLCJ1c2VyX2lkIjo3Nn0.YUQ3hG3TiXzz_5U594tLOyGYUzAwfzgDD8jZFY9n1WA'
				}
			}
			)
			.then(function(response){
				console.log(response);
				// _this.data = response.data.data;
				// console.log(_this.data)
			})
			.catch(function(error){
				console.log(error);
			})
		}
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

				

</style>