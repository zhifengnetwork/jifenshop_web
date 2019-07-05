<template>
    <div class="max_div">
        <!-- 头部组件 -->
		<List-Header custom-title="积分明细" custom-fixed>
			<!-- 返回按钮 -->
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</List-Header>
        <div class="height-88"></div>
        <div class="center_box">
            <div class="center_item" v-for="(item,index) in data" :key="index">
                <p><span>释放时间:</span><span>{{item.time}}</span></p>
                <p><span>已释放积分:</span><span>{{item.released}}</span> <span class="time">待释放积分:</span> <span>{{item.unreleased}}</span></p>
            </div>
        </div>
        
    </div>
</template>

<script>
/**头部 */
	import ListHeader from "@/pages/common/header/TopHeader"
    export default {
		name: 'jifengdetail',
		data(){
            return{
                id:null,
                data:''
            }
		},
        components:{
            ListHeader,
        },
        created() {
            this.id = this.$route.query.id;//获取上个页面传递的id,在下面获取数据的时候先提交id
        },
        mounted(){
            this.requestData();
        },
        methods:{
            requestData(){
                let _this = this;
                this.$axios.get('home/point_release_log',{
                    params:{
                        token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJEQyIsImlhdCI6MTU1OTYzOTg3MCwiZXhwIjoxNTU5Njc1ODcwLCJ1c2VyX2lkIjo3Nn0.YUQ3hG3TiXzz_5U594tLOyGYUzAwfzgDD8jZFY9n1WA',
                        id:_this.id,
                        p:1
                    }
                })
                .then(function(response){
                    console.log(response.data);
                    _this.data = response.data.data;
                    console.log(_this.data)
                })
                .catch(function(error){
                    console.log(error);
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
.center_box
    width 702px
    margin 0 auto
    .center_item
        font-size 28px
        background white
        margin 30px 0
        padding 40px 15px
        border-radius 20px
        .time
            padding-left 50px


</style>
