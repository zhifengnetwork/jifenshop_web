<template>
    <div class="max_div">
        <!-- 头部组件 -->
		<List-Header custom-title="积分账户" custom-fixed>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</List-Header>
        <div class="height-88"></div>
        <div class="find_search" >
            <img src="/static/images/user/find.png" class="find" v-if="status"/>
            <input type="text" placeholder="输入手机号搜索" v-model="mobile" @input="press()" class="inputzhi"/>
        </div>
        <p class="result">搜索结果</p>
        <div class="item_ear" v-if="data">
            <div class="left"><img :src="data.avatar" class="header_img"/></div>
            <div class="center"><p>昵称:{{data.nickname}}</p><p class="idzhi">DI:{{data.id}}</p></div>
            <div class="right" @click="to()">转账</div>
        </div>
       
       
    </div>
</template>

<script>
/**头部 */
	import ListHeader from "@/pages/common/header/TopHeader"
    export default {
		name: 'transfer_accounts',
		data(){
            return{
                status:true,
                data:'',
                mobile:''
            }
			
		},
        components:{
            ListHeader,
        },
        methods:{
            requestData(){
                let _this = this;
                this.$axios.post('home/point_user',{
                    token:_this.$store.state.token,
                    mobile:_this.mobile
                })
                .then(function(response){
                    console.log(response.data);
                    _this.data = response.data.data;
                    console.log(_this.data)
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            press(){
                if(this.mobile.length==11){
                    // 发送请求
                    this.requestData();
                }
            },
            to(){
                this.$router.replace({name:'shouyilist',params:{'item':this.data}})
            }
        }
    }
</script>

<style lang="stylus" scoped>
.find_search
    border 1px solid #ccc
    width 702px
    height 60px
    line-height 60px
    margin 0 auto 
    border-radius 30px
    margin-top 40px
    text-align center
    font-size 27px
    display flex
    align-items center
    .find
        width 5%
        height 40px
        vertical-align center
        margin-left 30px
    .inputzhi
        z-text-indent 15px;
        display inline-block
        margin-left 3%
        flex 1
.result
    width 702px
    margin 0 auto
    padding-top 34px
    font-size 28px
.item_ear
    width 702px;
    margin 0 auto 
    border-bottom 1px solid #ccc
    padding 30px 0 20px 0
    display flex
    align-items center
    .left 
        display inline-block
        vertical-align top
        .header_img
            width 100px;
            height 100px;
            border-radius 50%
    .center
        display inline-block
        vertical-align top
        flex 1
        margin 0 30px
        font-size 26px
        .idzhi
            padding-top 20px
    .right
        width 150px
        height 60px
        line-height 60px
        border-radius 20px
        background #3780f9
        display inline-block
        vertical-align top
        color white
        text-align center
        font-size 28px



</style>
