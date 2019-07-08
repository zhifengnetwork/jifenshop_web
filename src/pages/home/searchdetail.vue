<template>
  <div class="Order">
        <!-- 头部组件 -->
		<TopHeader custom-title="搜索的商品" custom-fixed>
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</TopHeader>
      <div class="recommend-wrap">
			<div class="recommend-list">
				<div class="single-item" v-for="(item,index) in soushop" :key="index">
					<router-link :to="{path:'/Details',query:{id:item.goods_id}}">
						<div class="img-wrap">
							<img :src="item.picture" />
						</div>
						<div class="main">
							<h3>{{item.goods_name}}</h3>
							<div class="price">
								<p class="discount-price">￥{{item.price}}</p>
								<!-- <p class="original-price">原价:￥{{item.original_price}}</p> -->
							</div>
						</div>
					</router-link>
				</div>
			</div>
		</div>



  </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
export default {
  name: "searchdetail",
  components: {
        TopHeader
    },
  data() {
    return {
        soushop:[],
    };
  },
  mounted() {
    this.$axios({
      method: "post",
      url: "/goods/search_goods",
      data: {
        token: this.$store.state.token,
        keyword:this.$route.query.text,
        page:1,
        num:10
      }
    }).then(res => {
      console.log(res.data.data);
      this.soushop=res.data.data
    });
  },
  methods: {}
};
</script>

<style lang="stylus" scoped>
.recommend-wrap
    padding 0 .25rem
    box-sizing border-box
    margin-top 100px
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
                            text-decoration line-through
</style>