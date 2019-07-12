<template>
    <div class="max_div">
        <!-- 头部组件 -->
		<Comm-Header custom-title="团队列表" custom-fixed>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</Comm-Header>
        <ul class="ul">
            <li class="li">
                <span class="user_id">用户ID</span><span class="user_name">名称</span><span class="user_phone">电话</span><span class="user_order">订单</span>
            </li>
            <li class="li" v-for="(item,index) in data" :key="index" @click="to(item)">
                <span class="user_id">{{item.order_id}}</span><span class="user_name">{{item.user_name}}</span><span class="user_phone">{{item.mobile}}</span><span class="user_order">查看订单</span>
            </li>
        </ul>    
        <div class="foot" v-if="flag">我是有底线的哦~~</div>
    </div>
</template>

<script>
	import CommHeader from "@/pages/common/header/TopHeader"
    export default {
		name: 'teamList',
		data(){
            return{
                data:'',
                page:1,
                flag:false
            }
		},
        components:{
            CommHeader,
        },
        mounted(){
            this.requestData();//请求数据
            window.addEventListener('scroll', this.scrollBottom);
        },
        created(){
            if(this.$route.query==''){
                return false;
            }
            this.uid = this.$route.query.uid;
        },
        methods:{
            // 请求数据
            requestData(){
			    let _this = this;
			    this.$axios.post('team/my_team_order',{
                    token:_this.$store.state.token,
                    uid:_this.uid
			    })
			    .then(function(response){
                    console.log(response);
                    if(response.data.status == 1){
                        if(_this.page>1){
                            for(let i=0;i<response.data.data.length;i++){
                                if(response.data.data.length<20){
                                    _this.flag = true;
                                }
                                _this.data.push(response.data.data[i]);
                            }
                            console.log(_this.data)
                        }else{
                            _this.data = response.data.data;
                        }
                    }
			    })
			    .catch(function(error){
		    		console.log(error);
		    	})
            },
            to(item){
                this.$router.push({name:'commissionlist',query:{'user_id':item.user_id}})
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
                display inline-block
                vertical-align top
                width 25%
                text-align center
                font-size 20px
            .user_name
                display inline-block
                vertical-align top
                width 25%
                text-align center 
                font-size 20px       
            .user_phone
                display inline-block
                vertical-align top
                width 25%
                text-align center 
                font-size 20px  
            .user_order
                display inline-block
                vertical-align top
                width 25%
                text-align center 
                font-size 20px  
        .li:nth-child(odd)
            background #f3f9ff
        .li:nth-child(even)
            background #ecf4fc   
        .li:first-child  
            background #c6e1ff 

.foot
    line-height 100px
    text-align center
</style>
