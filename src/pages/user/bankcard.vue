<template>
  <div class="bank_card">
    <With-Header custom-title="选择支付方式" custom-fixed>
      <!-- 返回按钮 -->
      <i slot="backBtn" class="iconfont iconfanhui"></i>
    </With-Header>
    <div class="bank_card_box">
      <div class="bankcard_box" :class="active == key ? 'active':''" v-for="(item,key) in data.list" :key="key" @click="select(item,key)">
        <div class="bankcard_top">
            <div class="bankcard_img"></div>
            <div class="bankcard_name">{{item.name}}</div>
            <div class="bankcard_card">储存卡</div>
        </div>
        <div class="bankcard_number">{{item.number}}</div>
      </div>
      <div class="bankcard_button" @click="send">确定</div>
    </div>
    <!-- 无银行卡支付宝账号时 -->
     <div class="embody_box">
        <router-link to="/user/addBank" v-if="data.add_card==1">
          <div class="embody_top">
              <b>+</b><span>添加银行账号</span>
          </div>
        </router-link>
        <router-link to="/user/alipay" v-if="data.alipay==1">
            <div class="embody_bottom">
                <b>+</b><span>添加支付宝账号</span>
            </div>
        </router-link>
    </div>
  </div>
</template>
<script>
import WithHeader from "@/pages/common/header/TopHeader";
import { Toast } from 'vant';
export default {
  name: 'bankcard',
  data () {
    return {
      data: '',
      type: '',
      active: -1,
      card_id: ''
    }
  },
  components: {
    WithHeader
  },
  created() {
    let that = this;
    this.$axios({
      method:'post',
            url: 'home/withdraw_way',
            data: {
                "token":that.$store.state.token
            }
            })
            .then((res) => {
                this.data = res.data.data
                // console.log(res.data.data)
            })
  },
  methods:{
    select(item,index){
      this.active = index;
      this.type = item.withdraw_type;
      this.card_id = item.card_id;
    },
    send(){
      if(!this.type||!this.card_id&&this.card_id!=0){
        Toast('请选择提现方式');
        return false;
      }
      this.$router.replace({name:'withdrawal',params:{'item':{'type':this.type,'card_id':this.card_id}}})
    }
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
            color #151515
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
    bottom 50px
    left 0
    right 0
    margin auto
    width 702px
    height 88px
    background #ff4d4d
    border-radius 44px
    color #fff
    font-size 36px
    text-align center
    line-height 88px
    letter-spacing 4px
.active
    background #66ccee !important
</style>
