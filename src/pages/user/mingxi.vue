<template>
    <div class="max_div">
        <!-- 头部组件 -->
		<List-Header custom-title="积分明细" custom-fixed>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</List-Header>
        <div class="height-88"></div>
        <div class="center_box">
      
            <router-link v-for="(item,index) in data" :key="index" :to="{path:'/user/jifengdetail',query:{id:item.id}}" class="center_item">
                <p>积分类型：{{item.type}}</p>
                <p>订单编号：{{item.order_sn}}</p>
                <p><span>释放时间:</span><span>{{item.time}}</span></p>
                <p><span>已释放积分:</span><span>{{item.released}}</span> <span class="time">待释放积分:</span> <span>{{item.unreleased}}</span><img src="/static/images/user/you.png" class="you"/></p>
            </router-link>
        </div>
        
		<div class="foot" v-if="flag">我是有底线的哦~~</div>
        
       
    </div>
</template>

<script>
/**头部 */
	import ListHeader from "@/pages/common/header/TopHeader"
    export default {
		name: 'mingxi',
		data(){
            return{
                data:'',
                page:1,
                flag:false
            }
		},
        components:{
            ListHeader,
        },
        mounted(){
            this.requestData();
			window.addEventListener('scroll', this.scrollBottom);
        },
        methods:{
            requestData(){
                let _this = this;
                this.$axios.get('home/point_release',{
                    params:{
                        token:_this.$store.state.token,
                        p:_this.page,
                    }
                })
                .then(function(response){
                    console.log(response.data);
                    if(response.data.status == 1){
                        if(_this.page>1){
                            for(let i=0;i<response.data.data.length;i++){
                                if(response.data.data.length<20){
                                    _this.flag = true;
                                }
                                _this.data.push(response.data.data[i]);
                            }
                            console.log(_this.data)
                        }else{
                            _this.data = response.data.data;
                        }
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            scrollBottom(){
                let _this = this;
				let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
				let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
				if(scrollTop + windowHeight == scrollHeight){
					_this.page++;
                    _this.requestData();
				}
            }
        },
        destroyed: function () {
            window.removeEventListener('scroll', this.scrollBottom);
        },
    }
</script>

<style lang="stylus" scoped>
.center_box
    width 702px
    margin 0 auto
    .center_item
        width 702px
        font-size 28px
        background white
        margin 30px auto
        padding 40px 15px
        border-radius 20px
        color black
        display inline-block
        box-sizing border-box
        p
            padding 3px 0
        .time
            padding-left 50px
        .you
            float right
            margin-top 5px
            width 20px
            height 30px

.foot
    line-height 100px
    text-align center
</style>
