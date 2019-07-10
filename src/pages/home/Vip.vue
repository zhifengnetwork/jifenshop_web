<template>
    <div class="vip">
        <!-- 头部组件 -->
		<TopHeader custom-title="确认订单" custom-fixed>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</TopHeader>
        <!-- 卡面 -->
        <div class="card">
            <div class="card_title">
                臻致康健康商城
            </div>
            <div class="card_code">
                NO:{{data.number}}
            </div>
        </div>
        <!-- 选择支付方式 -->
        
        <div class="balance">
            <van-radio-group v-model="radio">
                <van-cell-group>
                <van-cell :title="'余额支付 ￥'+user_info.money" clickable @click="radio = '0'">
                    <van-radio slot="right-icon" name="0" />
                </van-cell>
                <van-cell title="微信支付" clickable @click="radio = '1'">
                    <van-radio slot="right-icon" name="1" />
                </van-cell>
                </van-cell-group>
            </van-radio-group>
        </div>
        <div class="password" v-if="radio==0">
            <van-cell-group>
                <van-field v-model="pwd" placeholder="请输入支付密码" type="password" />
            </van-cell-group>
        </div>
        <!-- 底部菜单 -->
        <div class="menu">
            <p class="menu_item">
                实付款<span class="menu_text">￥<b class="menu_price">{{data.money}}</b></span>
            </p>
            <p class="menu_item" @click="buy">
                立即购买
            </p>
        </div>
    </div>
</template>

<script>
    import TopHeader from "@/pages/common/header/TopHeader"
    import { Toast } from 'vant';   
    export default {
        name: 'vip',
        data(){
            return {
                checked:true,
                data:'',
                user_info:'',
                radio:'0',
                pwd:''
            }
        },
        components: {
            TopHeader
        },
        mounted(){
            this.requestData();
        },
        methods:{
            balance(){
                this.checked=!this.checked;
            },
            // 请求数据
            requestData(){
                let _this = this;
                // 获取会员卡数据
                this.$axios.get('user/member_card',{
                    params:{
                        token:_this.$store.state.token,
                    }
                })
                .then(function(response){
                    console.log(response.data);
                    _this.data = response.data.data;
                    console.log(_this.data)
                })
                .catch(function(error){
                    console.log(error);
                })
                // 获取余额
                this.$axios.get('home/get_user_info',{
                    params:{
                        token:_this.$store.state.token,
                    }
                })
                .then(function(response){
                    console.log(response.data);
                    _this.user_info = response.data.data;
                    console.log(_this.user_info)
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            buy(){
                let _this = this;
                let type = null;
                if(_this.radio=='0'&&_this.pwd==''){
                    Toast('请输入支付密码');
                    return false;
                }
                switch(_this.radio){
                    case '0':
                        type = 1;
                        break;
                    case '1':
                        type = 2;
                        break;
                }
                // 购买
                this.$axios.post('user/member_pay',{
                    token:_this.$store.state.token,
                    type:type,
                    pwd:_this.pwd
                })
                .then(function(response){
                    if(response.data.status == 1){
                        Toast.success('购买成功')
                    }
                    console.log(response.data);
                })
                .catch(function(error){
                    console.log(error);
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
.vip
    padding 88px 24px 0
    box-sizing border-box
.card
    position relative
    margin-top 20px
    width 100%
    height 300px
    background url('/static/images/home/VIP.png')
    background-size contain
    border-radius 15px
.card_title
    position absolute
    left 50px
    top 40px
    color #692c07
.card_code
    position absolute
    right 50px
    bottom 40px
    color #867759
.balance
    margin-top 40px
    height 100px
    line-height 100px
    background #fff
.password
    margin-top 104px
.menu
    position fixed
    bottom 0
    left 0
    width 100%
    height 120px
    line-height 120px
    text-align center
    background #fff
.menu_item
    float left
    width 40%
    height 100%
.menu_item:nth-child(2)
    float right
    width 40%
    color #ffffff
    font-weight bold
    background #ff0000
.menu_text
    font-size 12px
    color #ff0000
.menu_price
    font-size 36px
</style>