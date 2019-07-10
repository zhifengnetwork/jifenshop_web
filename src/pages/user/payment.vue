<template>
	<div class="data_wrap">
		<!-- 头部组件 -->
		<Data-Header custom-title="支付密码设置" custom-fixed>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</Data-Header>
        <div class="content">
			<div class="nom_wrap">
                <router-link class="my_look" v-if="data.pwd==0" to="/user/modifyUserName">
                    <div class="item_wrap">
                        <div class="text">设置支付密码</div>
                        <div class="name_wrap">
                            <i class="iconfont iconyou"></i>
                        </div>
                    </div>
                </router-link>
                <router-link class="my_look" v-if="data.pwd==1" to="/user/paymentEdit">
                    <div class="item_wrap">
                        <div class="text">修改支付密码</div>
                        <div class="name_wrap">
                            <i class="iconfont iconyou"></i>
                        </div>
                    </div>
                </router-link>
                <router-link class="my_look" v-if="data.pwd==1" to="/user/paymentReset">
                    <div class="item_wrap">
                        <div class="text">重置支付密码</div>
                        <div class="name_wrap">
                            <i class="iconfont iconyou"></i>
                        </div>
                    </div>
                </router-link>
            </div>
		</div>
	</div>
</template>

<script>
	import DataHeader from "@/pages/common/header/TopHeader"
	import { Toast } from 'vant';    
    export default {
		name: "payment",
		data() {
			return{
                data:''
			}
		},
		components: {
			DataHeader,
        },
        mounted(){
            this.requestData();//请求数据
        },
        methods:{
            // 请求数据
        requestData(){
			let _this = this;
			this.$axios.get('home/get_user_info',{
				params:{
					token:_this.$store.state.token
				}
			})
			.then(function(response){
                console.log(response);
                if(response.data.status == 1){
                    _this.data = response.data.data;
                    if(_this.data.mobile==''){
                        Toast('请先绑定手机号');
                        setTimeout(function(){
                            _this.$router.replace({name:'phone'})
                        },1000);
                    }
                }
				console.log(_this.data)
			})
			.catch(function(error){
				console.log(error);
			})
        },
        }
    }
</script>

<style lang="stylus" scoped>
    .data_wrap
        width 100%
        height 100%
        .content
            padding-top 88px
            .nom_wrap
                margin 26px 24px
                .item_wrap
                    padding 15px 20px
                    margin 0 0 30px
                    background #fff
                    line-height 75px
                    border-radius 10px
                .my_look
                    display block
                    color #151515    
                .item_wrap .text,.img,.name_wrap 
                    display inline-block
                    vertical-align middle
                .text
                    font-size 30px
                    text-align-last justify
                .name_wrap
                    font-size 30px
                    float right
                .img
                    margin 5px 0 0
                    float right
                    width 68px
                    height 68px
                    border-radius 50% 
            .btn 
                position fixed
                bottom 27px
                left 24px
                width 702px
                height 88px
                background #ff4d4d
                border-radius 44px
                font-size 30px
                color #fff 
                text-align center
                line-height 88px  
                letter-spacing 2px            
                    

img
    display block
    margin 0 auto
    max-width 100%
    height 100%
    border-radius 50%
</style>