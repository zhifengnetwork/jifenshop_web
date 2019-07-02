<template>
    <div class="max_div">
        <!-- 头部组件 -->
		<Comm-Header custom-title="账户明细" custom-fixed>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</Comm-Header>
        <ul class="ul">
            <li class="li">
                <span class="user_id">时间</span><span class="user_name">名称</span><span class="user_phone">积分</span><span class="beizhu">备注</span>
            </li>
            <li class="li">
                <span class="user_id">2019-01-03 12:06:03</span><span class="user_name">冷漠之秋二小姐89</span><span class="user_phone">18488885975</span><span class="beizhu">18488885975</span>
            </li>
            <li class="li">
                <span class="user_id">789895</span><span class="user_name">冷漠之秋二小姐89</span><span class="user_phone">18488885975</span><span class="beizhu">18488885975</span>
            </li>
        </ul>          
    </div>
</template>

<script>
	import CommHeader from "@/pages/common/header/TopHeader"
    export default {
		name: 'accountdetail',
		data(){
            return{
                
            }
			
		},
        components:{
            CommHeader,
        },
        
    }
</script>

<style lang="stylus" scoped>
.max_div
    .ul
        width 90%
        margin 100px 0 0 5%
        .li
            width 100%
            padding 10px 0 6px 0
            .user_id
                display inline-block
                vertical-align top
                width 25%
                text-align center
                font-size 20px
            .user_name
                display inline-block
                vertical-align top
                width 20%
                text-align center 
                font-size 20px       
            .user_phone
                display inline-block
                vertical-align top
                width 25%
                text-align center 
                font-size 20px  
            .beizhu
                display inline-block
                vertical-align top
                width 30%
                text-align center 
                font-size 20px      
        .li:nth-child(odd)
            background #f3f9ff
        .li:nth-child(even)
            background #ecf4fc   
        .li:first-child  
            background #c6e1ff 

        

</style>
