<template>
    <div class="editAddress">
        <TopHeader custom-title="收货地址" custom-fixed>
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</TopHeader>

        <div class="content">
            <div class="address-info">
                <div class="form-group">
                    <div class="label">收货人</div>
                    <div class="input-group">
                        <input type="text" v-model="item.consignee">
                    </div>
                </div>
                <div class="form-group">
                    <div class="label">手机号码</div>
                    <div class="input-group">
                        <input type="number" v-model="item.mobile">
                    </div>
                </div>
                <div class="form-group" @click="to()">
                    <div class="label">收货地址</div>
                        <div class="input-group">
                            <!-- <h3 v-if="!this.location">{{item.province}}&nbsp;{{item.city}}&nbsp;{{item.district}}</h3> -->
                            <h3 v-if="this.location">{{this.location.poiname}}</h3>
                        </div>
                    <div class="right-arrow"></div>
                </div>
                <div class="form-group">
                    <div class="label">详细地址</div>
                    <div class="input-group">
                        <textarea placeholder="输入详细地址" v-model="item.address" rows="1"></textarea>
                    </div>
                </div>
            </div>

            <div class="set-default">
                <div class="label">设置默认地址</div>
                <van-switch
                    v-model="checked"
                    size="24px"
                    @change="onCheack"
                />
            </div>

            <!-- 保存按钮 -->
            <div class="saveBtn" @click="send()">保存</div>
            
        </div>

    </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'EditAddress',
    components: {
        TopHeader
    },
    data(){
        return {
            checked: false
        }
    },
    created: function(){
        // 返回的位置信息赋值
        this.location = this.$route.params.location;
        this.item = JSON.parse(sessionStorage.getItem('item'));
        if(!this.location){
            return false;
        }
        this.item.address = this.location.poiaddress;
    },
    mounted(){
        if(this.item.is_default==1){
            this.checked = true;
        }else{
            this.checked = false;
        }
    },
    methods:{
        //选择默认地址时触发
        onCheack(val){
            console.log(val)
        },
        // 发送请求
        send(){
            let _this = this;
            if(!_this.item.consignee){
                alert('收件人不能为空');
                return false;
            }else if(!_this.item.mobile){
                alert('手机号不能为空');
                return false;
            }else if(!_this.location){
                alert('地址不能为空');
                return false;
            }else if(!_this.item.address){
                alert('详细地址不能为空');
                return false;
            }
            let is_default = null;
            if(_this.checked){
                is_default = 1;
            }else{
                is_default = 0;
            }
            this.$axios.post('home/edit_address',{
                token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJEQyIsImlhdCI6MTU1OTYzOTg3MCwiZXhwIjoxNTU5Njc1ODcwLCJ1c2VyX2lkIjo3Nn0.YUQ3hG3TiXzz_5U594tLOyGYUzAwfzgDD8jZFY9n1WA',
                    id:_this.item.id,
                    lat:_this.location.latlng.lat,   
                    lng:_this.location.latlng.lng,   
                    consignee:_this.item.consignee,
                    mobile:_this.item.mobile,
                    is_default:is_default,
                    address:_this.item.address
                }
			)
			.then(function(response){
                sessionStorage.removeItem('data');
                _this.$router.push({name:'Address'})
				console.log(response);
			})
			.catch(function(error){
				console.log(error);
			})
        },
        to(){
            sessionStorage.setItem('item',JSON.stringify(this.item))
            this.$router.push({name:'SelectPoint',params:{'router':'EditAddress'}})
        }
    }

}
</script>

<style lang="stylus" scoped>
.editAddress
    min-height 100vh
    background-color #ffffff
    .content
        padding 108px 24px 0
        box-sizing border-box 
        .address-info
            padding 0 28px
            box-sizing border-box  
            box-shadow 1px 1px 8px #ccc
            margin-bottom 14px   
            .form-group
                height 56px
                display flex
                align-items center
                border-bottom 1px solid #e6e6e6
                padding-top 22px
                padding-bottom 10px
                .label
                    width 145px
                    font-size 24px
                    color #151515
                    margin-right 10px
                .input-group
                    flex 1
                    input
                        width 100%
                        height 30px
                        border none
                    textarea   
                        width 100%
                        border none
                    h3
                        color #151515
                        font-weight normal
                    p
                        color #838383  
                .right-arrow
                    width 8px
                    height 14px
                    background url("/static/img/user/address/right-arrow.png") no-repeat
                    background-size cover
                    margin-left 20px   
        .set-default
            height 88px
            display flex
            justify-content space-between
            align-items center 
            padding 0 28px
            box-sizing border-box  
            box-shadow 1px 1px 8px #ccc
            .label
                width 180px
                font-size 24px
                color #151515
                margin-right 25px 
        .saveBtn
            width 92%
            height 88px
            line-height 88px
            text-align center
            font-size 36px
            color #ffffff
            background-color #ff4d4d
            position fixed
            left 50%
            bottom 25px
            margin-left -46%
            border-radius 40px    

</style>
