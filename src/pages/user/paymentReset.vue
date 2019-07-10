<template>
	<div class="modify_wrap">
		<!-- 头部组件 -->
		<Name-Header custom-title="重置支付密码" custom-fixed>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</Name-Header>
        <div class="content">
            <div class="inp_wrap">
                <input type="password" maxlength='6' v-model="pwd" placeholder="设置支付密码"/>
            </div>
            <div class="inp_wrap">
                <input type="password" maxlength='6' v-model="pwd1" placeholder="确认支付密码"/>
            </div>
            <!-- 手机号码 -->
            <div class="inp_wrap">
                <input type="text" placeholder="请输入手机号" v-model="mobile" />
            </div>
            <!-- 验证码 -->
            <div class="name_wrap">
                <div class="inp_wrap" style="width:50%;float:left;">
                    <input type="text" placeholder="请输入验证码" v-model="cod" />
                </div>
                <!-- 验证码按钮 -->
                <div class="code_btn" :style="flag?'':'pointer-events:none;border-color:#ccc;color:#ccc;'" @click="code">
                    {{but}}
                </div>
            </div>
			<!-- 确认按钮 -->
			<div class="btn" @click="send">保存</div>
		</div>

	</div>
</template>

<script>
	import NameHeader from "@/pages/common/header/TopHeader"
	import { Toast } from 'vant';
	export default {
		name: "paymentReset",
		data() {
			return{
                mobile: '',
                cod: '',
                pwd:'',
                pwd1:'',
                but: '获取验证码',
                flag: true
			}
		},
		components: {
			NameHeader,
		},
		methods:{
			code(){
                // 获取验证码
                if(this.mobile==''){
                    Toast('手机号不能为空');
                    return false;
                }else if(this.mobile.length<11){
                    Toast('手机号格式错误');
                    return false;
                }
                let _this = this;
                
                console.log(_this.mobile)
                this.$axios.post('home/send_sms',{
                    token:_this.$store.state.token,
                    type:'pwd',
                    mobile:_this.mobile
                })
                .then(function(response){
                    if(response.data.status==1){
                        let s = 60;
                        let time = setInterval(function(){
                            s--;
                            _this.flag = false;
                            _this.but = s+'秒后重新获取';
                            if(s==0){
                                _this.but = '获取验证码'
                                _this.flag = true;
                                clearInterval(time)
                            }
                        },1000)
                        console.log(response);
                    }else{
                        Toast(response.data.msg)
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            send(){
                // 发送请求
                if(this.pwd.length<6){
                    Toast('请输入6位数密码');
                    return false;
                }
                let _this = this;
                this.$axios.post('home/pwd',{
                    token:_this.$store.state.token,
                    code:_this.cod,
                    pwd:_this.pwd
                })
                .then(function(response){
                    if(response.data.status==1){
                        Toast.success('重置成功');
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
                position relative
                padding 20px
                margin 26px 24px
                background #fff
                border-radius 10px
                overflow hidden
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
        .code_btn
            float left
            margin-top 26px
            padding 0 15px
            width 220px
            height 100px
            line-height 100px 
            text-align center
            color #1195e9
            background #fff
            border-radius 10px
            border 2px solid #1195e9
</style>