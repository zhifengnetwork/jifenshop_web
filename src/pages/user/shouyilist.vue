<template>
  <div class="max_div">
    <!-- 头部组件 -->
    <List-Header custom-title="积分转账" custom-fixed>
      <!-- 返回按钮 -->
      <i slot="backBtn" class="iconfont iconfanhui"></i>
    </List-Header>
    <div class="height-88"></div>
    <div class="top_ear">
      <div class="jifeng_ear">
        <p>我的积分</p>
        <p class="jifeng_shu">{{data.point}}</p>
      </div>
    </div>
    <div class="center_ear">
      <div class="first_zhuangei">
        <span class="zhuang">转给</span>
        <img :src="item.avatar" class="touxiang" />
        <div class="youbian">
          <p>昵称:{{item.nickname}}</p>
          <p class="idzi">DI:{{item.id}}</p>
        </div>
      </div>
      <div class="second_ear">
        <span class="jife">积分</span>
        <input class="box" placeholder="10000.00" v-model="point" type="text">
      </div>
      <div class="bottom_ear">
        <span class="jife">备注</span>
        <input class="box" type="text" v-model="tips">
      </div>
      <div class="btn" @click="surezhuang">确认转账</div>


<!-- 支付密码输入--s -->
 <div class="pay-tool"  v-show="isshow">
    <div class="pay-tool-title border-bottom">
      <img :src="item.avatar" class="touxiang" />
      <span style="float:right;margin-right:20px;font-size: 30px;line-height: 30px;margin-left:-2rem;width:20px"	@click="hello"><img src="/static/images/user/X.png" class="x"/></span>
      <span class="zh">向{{item.nickname}}转账</span>
    </div>
    <p class="jifeng">积分</p>
    <p class="qian">{{point}}</p>
    <div class="pay-tool-content">
      <div class="pay-tool-inputs">
        <div class="item" v-for="(index,i) in items" :key="i">
        		<span v-show="Span>index-1">●</span>
        </div>
      </div>
    </div>
    <div class="pay-tool-keyboard">
      <ul>
        <li @click="keyUpHandle($event,index)" v-for="(val,index) in keys" :key="index">
          {{ val }}
        </li>
        <li class="del" @click="delHandle"><span class="icon-del">删除</span></li>
      </ul>
    </div>
  </div>
<!-- 支付密码输入--e -->
<div class="mask" v-show="isshow"></div>


</div>    
    </div> 
</template>

<script>
/**头部 */
import ListHeader from "@/pages/common/header/TopHeader";
import { Toast } from 'vant';
const keys = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0]

export default {
    
  name: "shouyilist",
  data() {
    return {
        items: [0, 1, 2, 3, 4, 5],
        keys: keys(),
       	Span:-1,
        password: [],
        isshow: false,
        data:'',
        point:'',
        tips:''
       
      }
  },
  created: function(){
        // 返回的位置信息赋值
        this.item = this.$route.params.item
        console.log(this.item)
  },
  mounted(){
      this.requestData();
  },
  methods: {
    requestData(){
        let _this = this;
        this.$axios.get('home/get_user_info',{
            params:{
                token:_this.$store.state.token
            }
        })
        .then(function(response){
            console.log(response.data);
            if(response.data.status == 1){
              _this.data = response.data.data;
            }
            console.log(_this.data)
        })
        .catch(function(error){
            console.log(error);
        })
    },
    hello(){
        // this.$emit('change-type');
          this.isshow=false
    },
    keyUpHandle (e) {
      let text = e.currentTarget.innerText
      let len = this.password.length
      if (!text || len >= 6) return
      this.password.push(text)
      this.Span=len;
      this.ajaxData()
    },
    delHandle () {
      if (this.password.length <= 0) return false
      this.password.shift()
      this.Span--;
    },
    ajaxData () {
      let _this = this;
      let pwd =parseInt(this.password.join(' ').replace(/\s/g, ''))
      if (this.password.length >= 6) {
        this.$axios.post('home/point_pay',{
          token:_this.$store.state.token,
          to_user:_this.item.id,
          pwd:pwd
				})
				.then(function(response){
          console.log(response);
          Toast(response.data.msg);
          if(response.data.status===1){
            _this.$router.replace({name:'jifeng'})
          }else{
            _this.Span = -1;
            _this.password = [];
          }
				})
				.catch(function(error){
					console.log(error);
				})

      }
      return false
    },
    clearPasswordHandle: function () {
      this.password = []
    },
    surezhuang:function(){
      if(this.point>this.data.point){
        Toast('超出最大额度');
        return false;
      }
      let _this = this;
      if(this.point){
        this.$axios.post('home/point',{
          token:_this.$store.state.token,
          to_user:_this.item.id,
          point:_this.point,
          remark:_this.tips
        })
        .then(function(response){
          if(response.data.status===1){
            _this.isshow=true
          }
          console.log(response);
        })
        .catch(function(error){
          console.log(error);
        })
      }else{
        Toast('积分数量不能为空')
      }
    }
  },
        

  
  components: {
    ListHeader
  }
 
  
};
</script>

<style lang="stylus" scoped>
.top_ear {
  background: url('/static/images/user/background.png');
  width: 702px;
  margin: 0 auto;
  height: 279px;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .jifeng_ear {
    color: white;
    font-size: 32px;
    text-align: center;

    .jifeng_shu {
      padding-top: 30px;
    }
  }
}

.center_ear {
  width: 702px;
  margin: 0 auto;

  .first_zhuangei {
    display: flex;
    align-items: center;
    padding: 70px 0;

    .zhuang {
      font-size: 30px;
      font-weight: bolder;
    }

    .touxiang {
      width: 105px;
      height: 105px;
      border-radius: 50%;
      display: inline-block;
      vertical-align: top;
      margin: 0 50px 0 110px;
    }

    .youbian {
      display: inline-block;
      vertical-align: top;
      font-size: 28px;

      .idzi {
        padding-top: 26px;
      }
    }
  }

  .second_ear {
    border-bottom: 1px solid #ccc;
    padding-bottom: 30px;

    .box {
      width: 600px;
      outline: none;
      display: inline-block;
      text-indent: 30px;
      font-size: 30px;
    }

    .box:empty:before {
      content: attr(placeholder);
      color: #ccc;
      font-size: 28px;
    }

    .jife {
      font-size: 30px;
      font-weight: bolder;
    }
  }

  .bottom_ear {
    border-bottom: 1px solid #ccc;
    padding: 30px 0 30px 0px;

    .box {
      width: 600px;
      outline: none;
      display: inline-block;
      text-indent: 30px;
      font-size: 30px;
      height: 40px;
      word-wrap: break-word;
      overflow-x: hidden;
      overflow-y: auto;
      _overflow-y: visible;
      -webkit-user-modify: read-write-plaintext-only; // 只是编辑text文本，只能解决webkit内核里面问题，手机端适用
      -webkit-user-select: text; // 解决IOS部分手机不支持contenteditable=true属性问题
      vertical-align: bottom;
    }

    .box:empty:before {
      content: attr(placeholder);
      color: #ccc;
      font-size: 28px;
    }

    .jife {
      font-size: 30px;
      font-weight: bolder;
    }
  }

  .btn {
    width: 702px;
    margin: 0 auto;
    background: #3780f9;
    text-align: center;
    color: white;
    font-size: 30px;
    padding: 30px 0px;
    margin-top: 61px;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border-radius: 30px;
  }
}

.max_div >>> .van-password-input__security li {
  border: 1px solid #cccccc;
  border-right: none;
}

.max_div >>> .van-password-input__security li:last-child {
  border-right: 1px solid #ccc;
}
//  密码输入框样式--s
.pay-tool {
    position: absolute;
    top:500px;
    bottom:0;
    left:0;
    right:0;
    background-color: #fff;
    overflow: hidden;
    z-index:11;
    &-title {
      width: 100%;
      height 130px
      text-align: center;
      overflow: hidden;
      .icon {
        float: left;
        margin-top: 0.72222222rem;
      }
      strong {
        font-size: 0.8rem;
      }
    }
    &-content {
      .pay-tool-inputs {
        width: 400px;
        height:80px;
        margin: 60px auto 0;
        border: 2px solid #b9b9b9;
        border-radius: 0.26666666rem;
        box-shadow: 0 0 1px #e6e6e6;
        display: flex;
        .item {
          width: 16.66666666%;
          height 80px;
          border-right: 1px solid #b9b9b9;
          line-height: 80px;
          text-align: center;
          &:last-child {
            border-right: none;
          }
          .icon_dot {
            display: inline-block;
            width: 0.51111111rem;
            height: 0.51111111rem;
           /* background: url("../../assets/images/icon_dot.png") no-repeat;*/
            background-size: cover;
          }
        }
      }
 
    }
    .pay-tool-keyboard {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li {
          width: 33%;
          height 100px;
          line-height:100px;
          text-align: center;
          border-right: 1px solid #aeaeae;
          border-bottom: 1px solid #aeaeae;
          font-size: 28px;
          font-weight: bold;
          &:nth-child(1), &:nth-child(2), &:nth-child(3) {
            border-top: 1px solid #eee;
          }
          &:nth-child(3), &:nth-child(6), &:nth-child(9), &:nth-child(12) {
            border-right: none;
          }
          &:nth-child(10), &:nth-child(11), &:nth-child(12) {
            border-bottom: none;
          }
          &:nth-child(10), &:nth-child(12), &:active {
            background-color: #d1d4dd;
          }
          &:nth-child(12):active {
            background-color: #fff;
          }
        }
      }
    }
  }
.mask{
  position absolute
  bottom 0
  top 0
  left 0
  right 0
  background rgba(0,0,0,.5)
  z-index 10
}
//  密码输入框样式--e
.touxiang
  width 80px;
  height 80px;
  margin-top 40px
  border-radius 50%
.zh
  display inline-block
  font-size 29px
  vertical-align top
  line-height 165px
  padding-left 20px
.jifeng
  text-align center
  font-size 30px
.qian
  text-align center
  font-size 40px
  font-weight bolder
  padding-top 20px
.x
  width 25px
  height 25px  
</style>
