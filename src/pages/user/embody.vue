<template>
  <div class="em_body">
    <With-Header custom-title="选择支付方式" custom-fixed>
      <!-- 返回按钮 -->
      <i slot="backBtn" class="iconfont iconfanhui"></i>
    </With-Header>
    <div class="embody_box">
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
  name: "embody",
  components: {
    WithHeader
  }
};
</script>
<style lang="stylus" scoped>
.em_body
    height 100%
    width 100%
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
</style>