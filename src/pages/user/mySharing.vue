<template>
    <div class="MySharing">
        <!-- 头部组件 -->
		<My-Header custom-title="我的分享" custom-fixed class="head">
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</My-Header>
        <div class="content">
            <div class="main">
                <div class="img_head">
                    <div class="img">
                        <img :src="data.avatar"/>
                    </div>
                    <div class="name">
                        <span>我是</span>
                        <span>{{data.nickname}}</span>
                    </div>
                </div>
                <div class="mark_wrap">
                    <div class="mark">
                        <div class="mark_img">
                            <img :src="data.share_img"/>
                        </div>
                    </div>
                </div>
                <!-- <p class="touch">长按二维码保存</p> -->
                <div class="share">
                    <div class="share_item">
                        <div class="share_imgWrap">
                            <img class="share_img" src="/static/images/user/weixin.png">
                        </div>
                        <div>分享好友</div>
                    </div>
                    <div class="share_item">
                        <div class="share_imgWrap">
                            <img class="share_img" src="/static/images/user/download.png">
                        </div>
                        <div>保存图片</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MyHeader from "@/pages/common/header/TopHeader"
    export default {
	name: "mySharing",
	data() {
		return {
            data:''
        };
	},
	components: {
		MyHeader,
    },
    mounted(){
        this.requestData();
    },
    methods:{
        requestData(){
            let _this = this;
            this.$axios.post('team/share',{
                token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJEQyIsImlhdCI6MTU1OTYzOTg3MCwiZXhwIjoxNTU5Njc1ODcwLCJ1c2VyX2lkIjo3Nn0.YUQ3hG3TiXzz_5U594tLOyGYUzAwfzgDD8jZFY9n1WA'
            })
            .then(function(response){
                console.log(response.data);
                if(response.data.status===1){
                    _this.data = response.data.data;
                }
                console.log(_this.data)
            })
            .catch(function(error){
                console.log(error);
            })
        },
    }
};
</script>

<style lang="stylus" scoped>
    .MySharing
        width 100%
        height 100vh
        background url(/static/images/user/bnner.png) no-repeat
        background-size 100% 100%
        .head
            color #fff
            background none
        .content
            padding 232px 0 0
            .main
                position relative
                margin 0 auto
                width 702px
                height 930px
                background rgba(255,255,255,0.9)
                border-radius 10px
                -opacity 0.9
            .img_head
                padding 82px 0 0
                .img 
                    margin 0 auto
                    position absolute
                    top -85px
                    left 271px
                    width 160px
                    height 160px
                    border 2px solid #fff
                    border-radius 50%
                    img 
                        border-radius 50%
                .name 
                    font-size 30px
                    line-height 75px
                    text-align center
                .name span:nth-child(1)
                    margin 0 20px 0 0 
                    color #ff4d4d
            .mark_wrap
                margin 107px auto 0
                padding 51px
                width 480px
                height 480px
                background #fff
                border-radius 10px
                box-sizing border-box
                -webkit-box-sizing border-box
                .mark
                    padding 28px 0
                    margin 0 auto
                    width 378px
                    height 378px
                    background url(/static/images/user/ber.png) no-repeat
                    background-size 100% 100%
                    box-sizing border-box
                    -webkit-box-sizing border-box
                    .mark_img
                        margin 0 auto
                        width 318px
                        height 318px
            .touch
                font-size 30px
                text-align center
                line-height 105px            
            .share
                width 100%
                height 160px
                text-align center
                font-size 30px
                display -webkit-box
                display  -moz-box
                display  -ms-flexbox
                display  -webkit-flex
                display  flex
                -webkit-justify-content center	
                justify-content center
                -moz-box-pack center
                box-pack center
                .share_item
                    margin 0 80px
                .share_imgWrap
                    width 70px
                    height 70px
                    margin 20px auto
                    .share_img
                        width 100%
                        height 100%
img
    display block
    margin 0 auto
    max-width 100%
    height 100%                    
</style>