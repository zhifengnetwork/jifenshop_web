<template>
	<div class="modify_wrap">
		<!-- 头部组件 -->
		<Name-Header custom-title="修改支付密码" custom-fixed>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</Name-Header>
        <div class="content">
            <div class="inp_wrap">
                <input type="password" maxlength='6' v-model="pwd" placeholder="输入支付密码"/>
            </div>
            <div class="inp_wrap">
                <input type="password" maxlength='6' v-model="password1" placeholder="输入新密码"/>
            </div>
            <div class="inp_wrap">
                <input type="password" maxlength='6' v-model="password2" placeholder="确认新密码"/>
            </div>
			<!-- 确认按钮 -->
			<div class="btn" @click="send">确认修改</div>
		</div>

	</div>
</template>

<script>
    import NameHeader from "@/pages/common/header/TopHeader"
	import { Toast } from 'vant';
	export default {
		name: "paymentEdit",
		data() {
			return{
                pwd:'',
                password1:'',
                password2:''
			}
		},
		components: {
			NameHeader,
        },
        methods:{
            send(){
                if(this.pwd==''){
                    Toast('原密码不能为空');
                    return false;
                }else if(!this.password1||!this.password2){
                    Toast('新密码不能为空');
                    return false;
                }
                if(this.password1!=this.password2){
                    Toast('输入密码不一致');
                    return false;
                }
                // 发送请求
                let _this = this;
                this.$axios.post('home/change_pwd',{
                    token:_this.$store.state.token,
                    pwd:_this.pwd,
                    password1:_this.password1,
                    password2:_this.password2
                })
                .then(function(response){
                    if(response.data.status==1){
                        Toast.success('修改成功');
                        _this.$router.go(-1)                        
                        console.log(response);
                    }else{
                        Toast(response.data.msg)
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            }
		}
	}
</script>

<style lang="stylus" scoped>
    .modify_wrap
        .content
            padding-top 88px
            .inp_wrap
                padding 20px
                margin 26px 24px
                background #fff
                border-radius 10px
            .inp_wrap input
                width 602px
                font-size 30px
                color #151515
                line-height 65px    
            .inp_wrap input::-webkit-input-placeholder
                font-size 30px
                color #8b8b8b 
            .btn 
                position absolute
                left 0
                right 0
                bottom 27px
                margin auto
                width 702px
                height 88px
                background #ff4d4d
                border-radius 44px
                font-size 30px
                color #fff 
                text-align center
                line-height 88px  
                letter-spacing 2px       

</style>