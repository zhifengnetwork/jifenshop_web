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
                NO:1234 5678
            </div>
        </div>
        <!-- 余额 -->
        <div class="balance" @click="balance">
            我的余额<span class="balance_num">￥5000.00</span>
            <div class="radio">
                <i class="radio_i" :class="checked?'active':''"></i>
            </div>
        </div>
        <!-- 底部菜单 -->
        <div class="menu">
            <p class="menu_item">
                实付款<span class="menu_text">￥<b class="menu_price">720.00</b></span>
            </p>
            <p class="menu_item">
                会员优惠<span class="menu_text">￥<b class="menu_price">10.00</b></span>
            </p>
            <p class="menu_item">
                立即购买
            </p>
        </div>
    </div>
</template>

<script>
    import TopHeader from "@/pages/common/header/TopHeader"
    export default {
        name: 'vip',
        data(){
            return {
                checked:true,
            }
        },
        components: {
            TopHeader
        },
        methods:{
            balance(){
                this.checked=!this.checked;
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
    position relative
    margin-top 40px
    height 100px
    line-height 100px
    text-indent 24px
    background #fff
.balance_num
    margin-left 20px
.radio
    position absolute
    right 20px
    top 0
    bottom 0
    margin auto
    width 50px
    height 50px
    border-radius 50%
    border 2px solid #151515
    background #fff
    .active
        width 70%
        height 70%
.radio_i
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    margin auto
    width 0
    height 0
    background #ff0000
    border-radius 50%
    transition .3s all
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
    width 35%
    height 100%
    float left
.menu_item:nth-child(3)
    width 30%
    color #ffffff
    font-weight bold
    background #ff0000
.menu_item:nth-child(2) .menu_text
    color #151515
.menu_text
    font-size 12px
    color #ff0000
.menu_price
    font-size 36px
</style>