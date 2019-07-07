<template>
    <div class="MyTeam">
        <!-- 头部组件 -->
		<Team-Header custom-title="团队列表" custom-fixed>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</Team-Header>
        <div class="content">
            <div class="list">
                <div class="item" v-for="(item,index) in data" :key="index">
                    <div class="item_imgWrap">
                        <img class="item_img" :src="item.user_avatar" alt="">
                    </div>
                    <div class="item_info">
                        <p class="item_name">昵称:{{item.user_name}}</p>
                        <p class="item_time">成为下级时间:{{item.add_time}}</p>
                    </div>
                    <div class="item_id">
                        ID:{{item.user_id}}
                    </div>
                </div>
            </div>

            <!-- <div class="main">
                <div class="list_wrap">
                    <router-link class="look" to="/user/myTeam/commissionlist">
                        <div class="group">
                            <span>团队列表</span>
                            <i class="iconfont icon-xiangyoujiantou"></i>
                        </div>
                        <p>8</p>
                        <p>总人数</p>
                    </router-link>    
                </div>

                <div class="list_wrap_1">
                    <div class="group">
                        <span>佣金明细</span>
                        <i class="iconfont icon-xiangyoujiantou"></i>
                    </div>
                    <p>2.88</p>
                    <p>总收益</p>
                </div>

                <div class="list_wrap_2">
                    <router-link class="look" to="/user/shouyilist">
                        <div class="group">
                            <span>预计收益</span>
                            <i class="iconfont icon-xiangyoujiantou"></i>
                        </div>
                        <p>547.54</p>
                    </router-link>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
    import TeamHeader from "@/pages/common/header/TopHeader"
    export default {
	name: "myTeam",
	data() {
		return {
            data:''
        };
	},
	components: {
		TeamHeader,
    },
    mounted(){
        this.requestData();//请求数据
    },
    methods:{
        // 请求数据
        requestData(){
			let _this = this;
			this.$axios.get('team/my_team',{
				params:{
					token:_this.$store.state.token
				}
			})
			.then(function(response){
                console.log(response);
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
};
</script>

<style lang="stylus" scoped>
.list
    padding 88px 24px 0
    box-sizing border-box
.item
    position relative
    padding-top 20px
    width 100%
    height 140px
    letter-spacing 1px
    border-bottom 1px solid #ccc
    box-sizing border-box
.item_imgWrap
    position absolute
    left 0
    top 0
    bottom 0
    margin auto
    width 100px
    height 100px
.item_img
    width 100%
    height 100%
    border-radius 50%
.item_info
    float left
    margin-left 120px
    line-height 60px
.item_id
    position absolute
    right 0
    top 0
    line-height 100px
    .MyTeam
        width 100%
        height 100%
        .head
            background none
        .content
            padding-top 88px
            .main
                margin 18px 24px
                background #fff 
                .list_wrap 
                    margin-bottom 20px
                    padding 31px 36px 45px
                    background url(/static/images/user/back1.png) no-repeat
                    background-size 100% 100% 
                    .group
                        line-height 65px 
                        color #28678e
                        .icon-xiangyoujiantou
                            font-size 12px
                            vertical-align middle 
                    p 
                        font-size 30px
                        text-align center
                        line-height 65px 
                        color #151515
                .list_wrap_1 
                    margin-bottom 20px
                    padding 31px 36px 45px
                    background url(/static/images/user/back2.png) no-repeat
                    background-size 100% 100% 
                    .group
                        line-height 65px 
                        color #8e4a28
                        .icon-xiangyoujiantou
                            font-size 12px
                            vertical-align middle 
                    p 
                        font-size 30px
                        text-align center
                        line-height 65px
                        color #151515 
                .list_wrap_2
                    margin-bottom 20px
                    padding 31px 36px 105px
                    background url(/static/images/user/back3.png) no-repeat
                    background-size 100% 100% 
                    .group
                        line-height 65px 
                        color #8e2862
                        .icon-xiangyoujiantou
                            font-size 12px
                            vertical-align middle 
                    p 
                        font-size 30px
                        text-align center
                        line-height 65px 
                        color #151515

.my_look
    display block
    color #151515
                                                             
</style>