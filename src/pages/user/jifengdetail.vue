<template>
    <div class="max_div">
        <!-- 头部组件 -->
		<List-Header custom-title="积分明细" custom-fixed>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</List-Header>
        <div class="height-88"></div>
        <div class="center_box">
            <div class="center_item">
                <p><span>释放时间:</span><span>2019-06-23</span><span class="time">12:02:10</span></p>
                <p><span>已释放积分:</span><span>15</span> <span class="time">待释放积分:</span> <span>85</span></p>
            </div>
            <div class="center_item">
                <p><span>释放时间:</span><span>2019-06-23</span><span class="time">12:02:10</span></p>
                <p><span>已释放积分:</span><span>15</span> <span class="time">待释放积分:</span> <span>85</span></p>
            </div>
            <div class="center_item">
                <p><span>释放时间:</span><span>2019-06-23</span><span class="time">12:02:10</span></p>
                <p><span>已释放积分:</span><span>15</span> <span class="time">待释放积分:</span> <span>85</span></p>
            </div>
           
        </div>
        
    </div>
</template>

<script>
/**头部 */
	import ListHeader from "@/pages/common/header/TopHeader"
    export default {
		name: 'jifengdetail',
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
        font-size 28px
        background white
        margin 30px 0
        padding 40px 15px
        border-radius 20px
        .time
            padding-left 50px


</style>
