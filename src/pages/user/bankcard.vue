<template>
  <div class="bank_card">
    <With-Header custom-title="选择支付方式" custom-fixed>
      <!-- 返回按钮 -->
      <i slot="backBtn" class="iconfont iconfanhui"></i>
    </With-Header>
    <div class="bank_card_box">
      <div class="bankcard_box" v-for="(item,key) in list" :key="key">
        <div class="bankcard_top">
            <div class="bankcard_img"></div>
            <div class="bankcard_name">{{item.name}}</div>
            <div class="bankcard_card">储存卡</div>
        </div>
        <div class="bankcard_number">{{item.number}}</div>
      </div>
      <div class="bankcard_button">确定</div>
    </div>
    <!-- 无银行卡支付宝账号时 -->
     <div class="embody_box" v-if="list.length>0">
        <div class="embody_top">
            <b>+</b><span>添加银行账号</span>
        </div>
        <router-link to="/user/alipay">
            <div class="embody_bottom">
                <b>+</b><span>添加支付宝账号</span>
            </div>
        </router-link>
    </div>
  </div>
</template>
<script>
import WithHeader from "@/pages/common/header/TopHeader";
export default {
  name: 'bankcard',
  data () {
    return {
      list: '',
    }
  },
  components: {
    WithHeader
  },
  created() {
    this.$axios({
      method:'post',
            url: 'home/withdraw_way',
            data: {
                "token":'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJEQyIsImlhdCI6MTU1OTYzOTg3MCwiZXhwIjoxNTU5Njc1ODcwLCJ1c2VyX2lkIjo3Nn0.YUQ3hG3TiXzz_5U594tLOyGYUzAwfzgDD8jZFY9n1WA'
            }
            })
            .then((res) => {
                this.list = res.data.data
                // console.log(res.data.data)
            })
  },
}
</script>
<style lang="stylus" scoped>
.bank_card
  height 100%
  width 100%
  .bank_card_box
      padding 88px 0 0
      .bankcard_box
        height 160px
        border-radius 12px
        background #ccc
        margin 20px
      .bankcard_top
        height 100px
        text-align center
        position relative
      .bankcard_img
        position absolute
        top 15px
        left  20px
        height 60px
        width 60px
        background pink
        border-radius 60px
        float left
      .bankcard_name
        float left
        font-size 36px
        line-height 100px
        margin-left 120px
        color #ffffff;
      .bankcard_card
        float left
        margin-left 20px
        line-height 100px
        font-size 26px
        color #ffffff;
    .bankcard_number
      text-align left
      margin-left 20px
      color #ffffff
  // 无银行卡.支付宝时
  .embody_box
        padding 88px 0 0
        .embody_top
            height 88px
            line-height 88px
            text-align center
            background #ccc
            border-radius 22px
            margin 20px
            b
                font-size 40px
                line-height 88px
            span
                margin-left 10px
                font-size 30px
        .embody_bottom
            height 88px
            line-height 88px
            text-align center
            background #ccc
            border-radius 22px
            margin 20px
            color #151515
            b
              font-size 40px
              line-height 60px
              margin-top 20px
              line-height 88px
            span 
              margin-left 10px 
              font-size 30px
  .bankcard_button
    position absolute
    bottom 20px
    width 700px
    height 88px
    background #ff6565
    line-height 88px
    text-align center
    margin 20px
    border-radius 12px
  
    
</style>
