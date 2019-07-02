<template>
    <div class="max_div">
        <!-- 头部组件 -->
		<List-Header custom-title="账单明细" custom-fixed>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</List-Header>
        <div class="height-88"></div>
        <!-- tab切换 -->
        <div id="app">
    <ul class="tabs">
        <li class="li-tab" v-for="(item,index) in tabsParam"  @click="toggleTabs(index)"  :class="{active:index!=nowIndex}" :key="index">{{item}}</li>
    </ul>
    <div class="divTab" v-show="nowIndex===0">
         <ul class="ul">
            <li class="li">
                <span class="user_id">订单</span><span class="user_name">日期</span><span class="user_phone">金额</span><span class="beizhu">备注</span>
            </li>
            <li class="li">
                <span class="user_id">7898958989</span><span class="user_name">2019-01-03 12:06:03</span><span class="user_phone">18488885975</span><span class="beizhu">18488885975</span>
            </li>
            <li class="li">
                <span class="user_id">789895</span><span class="user_name">冷漠之秋二小姐89</span><span class="user_phone">18488885975</span><span class="beizhu">18488885975</span>
            </li>
        </ul>     
    </div>
    <div class="divTab" v-show="nowIndex===1">

        <ul class="ul">
            <li class="li">
                <span class="user_id">订单</span><span class="user_name">日期</span><span class="user_phone">金额</span><span class="beizhu">备注</span>
            </li>
            <li class="li">
                <span class="user_id">7898855958989</span><span class="user_name">2019-01-03 12:06:03</span><span class="user_phone">184885</span><span class="beizhu">18488885975</span>
            </li>
            <li class="li">
                <span class="user_id">78229895</span><span class="user_name">冷漠之</span><span class="user_phone">18485</span><span class="beizhu">18488885975</span>
            </li>
        </ul>     



    </div>
</div>
    </div>
</template>

<script>
/**头部 */
	import ListHeader from "@/pages/common/header/TopHeader"
    export default {
		name: 'billingdetails',
		data(){
            return{
              tabsParam:['消费','赚取'],//（这个也可以用对象key，value来实现）
              nowIndex:0,//默认第一个tab为激活状态
            }
		},
        components:{
            ListHeader,
        },
        methods:{
        toggleTabs:function(index){
            this.nowIndex=index;
        },
       }
   
    }
</script>

<style lang="stylus" scoped>
.TopHeader
    background #f5f5f5 !important
.li-tab
    width 50%
    display inline-block
    text-align center
    height 80px
    line-height 80px
    font-size 30px
    background white
    color red
.active
    color black  
.ul
    width 90%
    margin 0 auto
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
        background #ffede7
    .li:nth-child(even)
        background #fff4f0 
    .li:first-child  
        background #ffc9b4



</style>
