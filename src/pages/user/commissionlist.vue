<template>
    <div class="max_div">
        <!-- 头部组件 -->
		<Comm-Header custom-title="团队列表" custom-fixed>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</Comm-Header>
        <ul class="ul">
            <li class="li">
                <span class="user_id">订单号</span><span class="user_name">用户金额</span><span class="user_phone">用户名</span>
            </li>
            <li class="li" v-for="(item,index) in data" :key="index">
                <span class="user_id">{{item.order_sn}}</span><span class="user_name">{{item.total_amount}}</span><span class="user_phone">{{item.user_id}}</span>
            </li>
        </ul>          
    </div>
</template>

<script>
	import CommHeader from "@/pages/common/header/TopHeader"
    export default {
		name: 'commissionlist',
		data(){
            return{
                data:''
            }
			
		},
        components:{
            CommHeader,
        },
        created(){
            if(!this.$route.query){
                return false;
            }
            this.user_id = this.$route.query.user_id;
        },
        mounted(){
            this.requestData();//请求数据
        },
        methods:{
            // 请求数据
            requestData(){
                if(!this.$route.query){
                    return false;
                }
			    let _this = this;
			    this.$axios.post('team/team_order_detailed',{
                    token:_this.$store.state.token,
                    user_id:_this.user_id
			    })
			    .then(function(response){
                    console.log(response);
                    if(response.data.status == 1){
                        _this.data = response.data.data;
                    }
				    console.log(_this.data)
			    })
			    .catch(function(error){
		    		console.log(error);
		    	})
            }
        }
        
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
                overflow hidden
                white-space nowrap
                text-overflow ellipsis
                display inline-block
                vertical-align top
                width 35%
                text-align center
                font-size 20px
            .user_name
                display inline-block
                vertical-align top
                width 35%
                text-align center 
                font-size 20px       
            .user_phone
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
