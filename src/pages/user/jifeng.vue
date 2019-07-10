<template>
    <div class="max_div">
        <!-- 头部组件 -->
		<List-Header custom-title="预计收益" custom-fixed>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</List-Header>
        <div class="height-88"></div>
        <div class="top_ear">
              <div class="jifeng_ear_left">
                
                <div class="left_nei">
                  <p class="keyong">可用积分<p>
                  <p class="jifeng">{{data.point}}</p>
                </div>
                </div>
             
              <div class="jifeng_ear_right"> 
                  <div>
                  <p class="keyong">待收积分<p>
                  <p class="jifeng">{{data.ds_point}}</p>
                  </div> 
              </div>
        </div>
        <router-link class="btn" to="/user/transfer_accounts">积分转账</router-link>
        <div class="bottom_ear">
             <!-- to="/user/jifengdetail" -->
              <router-link class="bottom_ear_item"  to="/user/mingxi">
                  <span class="to_name">积分明细</span>
                  <img src="/static/images/user/youjian.png" class="to"/>
              </router-link> 
               <router-link class="bottom_ear_item" to="/user/accountdetail">
                  <span class="to_name">转账记录</span>
                  <img src="/static/images/user/youjian.png" class="to"/>
               </router-link> 
               <router-link class="bottom_ear_item" to="/user/billingDetails">
                  <span class="to_name">积分记录</span>
                  <img src="/static/images/user/youjian.png" class="to"/>
               </router-link>  
        </div>
    </div>
</template>

<script>
/**头部 */
	import ListHeader from "@/pages/common/header/TopHeader"
    export default {
		name: 'jifeng',
		data(){
            return{
                data:''
            }
		},
        components:{
            ListHeader,
        },
        mounted(){
            this.requestData();
        },
        methods:{
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
        }
    }
</script>

<style lang="stylus" scoped>
.top_ear
    background url('/static/images/user/background.png')
    width 702px
    margin 0 auto
    height 279px
    background-size 100% 100%   
    display flex
    align-items center
    .jifeng_ear_left
        width 50%
        height 100%
        color white
        font-size 30px
        display inline-block
        text-align center
        display flex
        justify-content center
        align-items center
    .jifeng
        padding-top 30px
    .jifeng_ear_right
        width 50%
        height 100%
        float right 
        color white
        font-size 30px
        display inline-block
        text-align center
        display flex
        justify-content center
        align-items center
    .jifeng
        padding-top 30px 
.btn
    margin 0 auto 
    width 92%
    background #3780f9
    padding 30px 0
    text-align center
    color white
    margin-top 31px 
    border-radius 30px 
    display inline-block
    margin-left 4%
.bottom_ear
    width 702px
    margin 0 auto 
    font-size 30px
    margin-top 60px
    .bottom_ear_item
        height 120px
        line-height 120px
        display flex
        align-items center
        .to_name
            font-weight bolder
            width 97%
            color black
        .to
            height 20px 
            vertical-align center   


</style>
