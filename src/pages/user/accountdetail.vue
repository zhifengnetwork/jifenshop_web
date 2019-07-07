<template>
    <div class="max_div">
        <!-- 头部组件 -->
		<Comm-Header custom-title="转账记录" custom-fixed>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</Comm-Header>
        <ul class="ul">
            <li class="li">
                <span class="user_id">时间</span><span class="user_name">名称</span><span class="user_phone">积分</span><span class="beizhu">备注</span>
            </li>
            <li class="li" v-for="(item,index) in data" :key="index">
                <span class="user_id">{{item.time}}</span><span class="user_name">{{item.nickname}}</span><span class="user_phone">{{item.point}}</span><span class="beizhu">{{item.remark}}</span>
            </li>
        </ul>     

        <div class="foot" v-if="flag">我是有底线的哦~~</div>     
    </div>
</template>

<script>
	import CommHeader from "@/pages/common/header/TopHeader"
    export default {
		name: 'accountdetail',
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
            this.requestData();
			window.addEventListener('scroll', this.scrollBottom);
        },
        methods:{
            requestData(){
                let _this = this;
                this.$axios.get('home/transfer_list',{
                    params:{
                        token:_this.$store.state.token,
                        p:_this.page
                    }
                })
                .then(function(response){
                    console.log(response.data);
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
                    console.log(_this.data)
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
                    _this.requestData();
					_this.page++;
				}
            }
        },
        destroyed: function () {
            window.removeEventListener('scroll', this.scrollBottom);
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
.foot
    line-height 100px
    text-align center

</style>
