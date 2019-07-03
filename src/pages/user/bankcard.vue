<template>
  <div class="bank_card">
    <With-Header custom-title="选择支付方式" custom-fixed>
      <!-- 返回按钮 -->
      <i slot="backBtn" class="iconfont iconfanhui"></i>
    </With-Header>
    <div class="bank_card_box">
      <div class="bankcard_box">
        <div class="bankcard_top">
            <div class="bankcard_img"></div>
            <div class="bankcard_name">中国工商银行</div>
            <div class="bankcard_card">储存卡</div>
        </div>
        <div class="bankcard_number">1111111111111111111111</div>
      </div>
      <div class="bankcard_box">
        <div class="bankcard_top">
            <div class="bankcard_img"></div>
            <div class="bankcard_name">中国工商银行</div>
            <div class="bankcard_card">储存卡</div>
        </div>
        <div class="bankcard_number">1111111111111111111111</div>
      </div>
      <div class="bankcard_box">
        <div class="bankcard_top">
            <div class="bankcard_img"></div>
            <div class="bankcard_name">中国工商银行</div>
            <div class="bankcard_card">储存卡</div>
        </div>
        <div class="bankcard_number">1111111111111111111111</div>
      </div>
      <div class="bankcard_box">
        <div class="bankcard_top">
            <div class="bankcard_img"></div>
            <div class="bankcard_name">中国工商银行</div>
            <div class="bankcard_card">储存卡</div>
        </div>
        <div class="bankcard_number">1111111111111111111111</div>
      </div>
      <div class="bankcard_button">确定</div>
    </div>
  </div>
</template>
<script>
import WithHeader from "@/pages/common/header/TopHeader";
export default {
  name: 'bankcard',
  components: {
    WithHeader
  }
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
  .bankcard_button{
    position absolute
    bottom 20px
    width 700px
    height 88px
    background #ff6565
    line-height 88px
    text-align center
    margin 20px
    border-radius 12px
  }
    
</style>
