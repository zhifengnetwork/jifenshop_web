<template>
    <div class="addAddress">
        <TopHeader custom-title="收货地址" custom-fixed>
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</TopHeader>

        <div class="content">
            <div class="address-info">
                <div class="form-group">
                    <div class="label">收货人</div>
                    <div class="input-group">
                        <input type="text" v-model="consignee" placeholder="收货人姓名">
                    </div>
                </div>
                <div class="form-group">
                    <div class="label">手机号码</div>
                    <div class="input-group">
                        <input type="number" v-model="mobile" placeholder="输入电话号码">
                    </div>
                </div>
                <div class="form-group" @click="to()">
                    <div class="label">收货地址 </div>
                        <!-- <div class="input-group">
                            <p v-if="!this.$route.params.poiname">点击选择地址</p>
                            <h3 v-if="this.$route.params.poiname">{{this.$route.params.poiname}}</h3>
                            <p v-if="this.$route.params.poiaddress">{{this.$route.params.poiaddress}}</p>
                        </div> -->
                            <div class="input-group">
                            <p v-if="!this.location">点击选择地址</p>
                            <template v-else>
                                <h3>{{this.location.poiname}}</h3>
                            </template>
                        </div>
                    <div class="right-arrow"></div>
                </div>
                <div class="details-address">
                    <div class="label">详细地址</div>
                    <textarea class="textarea" placeholder="输入详细地址" v-model="address" rows="3"></textarea>
                    <!-- <div class="textarea" contenteditable="true" v-html="address" @input="address=$event.target.innerHTML"></div> -->
                </div>
               
            </div>

            <!-- 设置默认地址 -->
            <div class="set-default">
                <div class="label">设置默认地址</div>
                <van-switch
                    v-model="checked"
                    size="24px"
                    @change="onCheack"
                />
            </div>

            <!-- 保存按钮 -->
            <div class="saveBtn" @click="onSave()">保存</div>
            
        </div>

    </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'addAddress',
    components: {
        TopHeader
    },
    data(){
        return {
            consignee:'',
            mobile:'',
            address:'',
            checked: false,
            location:{},
        }
    },
    created: function(){
        if(sessionStorage.getItem('data')==''){
            return false;
        }
        // 获取源数据
        let data = JSON.parse(sessionStorage.getItem('data'));
        // Object.assign方法 赋值 （目标对象， 源对象）
        Object.assign(this, data)
        // 返回的位置信息赋值
        this.location = this.$route.params.location;
        if(!this.location){
            return false;
        }
        this.address = this.location.poiaddress;
    },
    methods:{
        // 点击保存按钮时触发
        onSave(addressData){
            this.requestData();
        },
        // 请求数据
        requestData(){
            let _this = this;
            let is_default = null;
            let telStr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
            if(!_this.consignee){
                alert('收件人不能为空');
                return false;
            }else if(!_this.mobile){
                alert('手机号不能为空');
                return false;
            }else if(!_this.location){
                alert('地址不能为空');
                return false;
            }else if(!_this.address){
                alert('详细地址不能为空');
                return false;
            }
            // 检测手机号
            if (!(telStr.test(_this.mobile))){
                alert('手机号码输入不规范');
                return false;
            }
            // 判断是否为默认地址
            if(_this.checked){
                is_default = 1;
            }else{
                is_default = 0;
            }
            this.$axios.post('home/edit_address',{
                token:_this.$store.state.token,
                id:'',
                lat:_this.location.latlng.lat,   
                lng:_this.location.latlng.lng,   
                consignee:_this.consignee,
                mobile:_this.mobile,
                is_default:is_default,
                address:_this.address
            })
			.then(function(response){
                _this.$router.push({name:'Address'})
                sessionStorage.removeItem('data');
				console.log(response,'555');
			})
			.catch(function(error){
				console.log(error);
			})
        },
        //选择默认地址时触发
        onCheack(val){
            console.log(val)
        },
        to(){
            // 保存当前页面上data数据
            sessionStorage.setItem('data', JSON.stringify(this.$data))
            this.$router.push({name:'SelectPoint',params:{'router':'AddAddress'}})
        }
    }
}
</script>

<style lang="stylus" scoped>
.addAddress
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
                    width 460px
                    font-size 24px
                    input
                        width 100%
                        height 30px
                        border none
                    h3
                        font-size 24px
                        color #151515
                        font-weight normal
                    p
                        color #838383
                        font-size 22px
                        overflow hidden
                        text-overflow ellipsis
                        white-space nowrap  
                .right-arrow
                    width 8px
                    height 14px
                    background url("/static/img/user/address/right-arrow.png") no-repeat
                    background-size 100%
                    margin-left 20px
            .details-address
                min-height 56px
                display flex
                padding-top 22px
                padding-bottom 10px 
                .label
                    width 145px
                    font-size 24px
                    color #151515
                    margin-right 10px 
                .textarea
                    flex 1
                    font-size 24px
                    color #858585
                    min-height 30px
                    line-height 50px
                    max-height 140px
                    border 0
                    _height 120px
                    margin-left auto
                    margin-right auto
                    padding 3px
                    outline 0                    
                    padding 2px
                    word-wrap break-word
                    overflow-x hidden
                    overflow-y auto
                    _overflow-y visible
                    -webkit-user-modify read-write-plaintext-only // 只是编辑text文本，只能解决webkit内核里面问题，手机端适用
                    -webkit-user-select text // 解决IOS部分手机不支持contenteditable=true属性问题               
                .textarea[placeholder]:empty:before 
                    content attr(placeholder) 
                // 焦点时内容为空
                .textarea[placeholder]:empty:focus:before 
                    content ""
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
 .content >>> .van-switch--on
     background-color:red
     
</style>
