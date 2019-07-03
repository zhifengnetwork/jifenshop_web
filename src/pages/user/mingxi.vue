<template>
    <div class="max_div">
        <!-- 头部组件 -->
		<List-Header custom-title="积分明细" custom-fixed>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</List-Header>
        <div class="height-88"></div>
        <div class="center_box">
      
           <router-link to="/user/jifengdetail" class="center_item">
                <p>积分类型：购物积分</p>
                <p>订单编号：44188112252515555265</p>
                <p><span>释放时间:</span><span>2019-06-23</span><span class="time">12:02:10</span></p>
                <p><span>已释放积分:</span><span>15</span> <span class="time">待释放积分:</span> <span>85</span><img src="/static/images/user/you.png" class="you"/></p>
           </router-link>
          
             <router-link to="/user/jifengdetail" class="center_item">
                <p>积分类型：购物积分</p>
                <p>订单编号：44188112252515555265</p>
                <p><span>释放时间:</span><span>2019-06-23</span><span class="time">12:02:10</span></p>
                <p><span>已释放积分:</span><span>15</span> <span class="time">待释放积分:</span> <span>85</span><img src="/static/images/user/you.png" class="you"/></p>
            </router-link>

              <router-link to="/user/jifengdetail" class="center_item">
                <p>积分类型：购物积分</p>
                <p>订单编号：44188112252515555265</p>
                <p><span>释放时间:</span><span>2019-06-23</span><span class="time">12:02:10</span></p>
                <p><span>已释放积分:</span><span>15</span> <span class="time">待释放积分:</span> <span>85</span><img src="/static/images/user/you.png" class="you"/></p>
            </router-link>
        </div>
        
        
       
    </div>
</template>

<script>
/**头部 */
	import ListHeader from "@/pages/common/header/TopHeader"
    export default {
		name: 'mingxi',
		data(){
            return{
                
            }
			
		},
        components:{
            ListHeader,
        },
    }
</script>

<style lang="stylus" scoped>
.center_box
    width 702px
    margin 0 auto
    .center_item
        width 702px
        font-size 28px
        background white
        margin 30px auto
        padding 40px 15px
        border-radius 20px
        color black
        display inline-block
        box-sizing border-box
        p
            padding 3px 0
        .time
            padding-left 50px
        .you
            float right
            margin-top 5px
            width 20px
            height 30px


</style>
