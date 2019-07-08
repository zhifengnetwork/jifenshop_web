<template>
    <div class="AddressView">
        <TopHeader custom-title="收货地址" custom-fixed>
			<i slot="backBtn" class="iconfont iconfanhui"></i>
		</TopHeader>

        <div class="content">
            <div class="address-list">
                <div class="address-item" v-for="(item,index) in data" :key="index" @click="select(item,index)">
                    <div class="item-name">
                        <span class="name">{{item.consignee}}</span>
                        <span class="tel">{{item.mobile}}</span>
                    </div>
                    <div class="item-address">
                        <div class="isDefault" v-if="item.is_default==1">默认</div>
                        <div class="exact-address">
                            <p>{{item.province}}&nbsp;{{item.city}}&nbsp;{{item.district}}&nbsp;{{item.address}}</p>
                        </div>
                    </div>
                    <div class="editAddress" @click="edit(item)" v-if="!type">
                        <i class="iconfont iconbianji"></i>
                    </div>
                    <i class="iconfont del-icon iconshanchu1" @click="del(item.id)" v-if="!type"></i>
                </div>
            </div>
            
            <router-link to="/user/AddAddress" replace>
                <div class="add-address">
                    <span class="plus-icon"><img src="/static/images/user/address/plus-icon.png" /></span>
                    <span>新建收货地址</span>
                </div>
            </router-link>

        </div>

    </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader"
import { Dialog } from 'vant';
export default {
    name:'AddressView',
    components: {
        TopHeader
    },
    data(){
        return {
           data:'',
           type:true
        }
    },
    created: function(){
        this.Address = this.$route.query.Address;
        if(this.Address){
            this.type = true;
        }else{
            this.type = false;
        }
    },
    mounted(){
        this.requestData();//请求数据
    },
    methods:{
        // 请求数据
        requestData(){
			let _this = this;
			this.$axios.get('home/address_list',{
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
        edit(item){
            this.$router.replace({name:'EditAddress'})
            sessionStorage.setItem('item',JSON.stringify(item))
        },
        // 删除数据
        del(id){
            let _this = this;
            Dialog.confirm({
                message: '是否删除该地址?'
            }).then(() => {
                // on close
                this.$axios.post('home/del_address',{
                    token:_this.$store.state.token,
                    id:id
                })
                .then(function(response){
                    console.log(response);
                    if(response.data.status==1){
                        location.reload();
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            });
        },
        select(item,index){
            if(!this.type){
                return false;
            }
            this.$router.replace({name:'ConfirmOrder',params:{'address_id':item}})
        }
    }

}
</script>

<style lang="stylus" scoped>
.AddressView
    min-height 100vh
    background-color #ffffff
    .content
        padding 108px 24px 0
        box-sizing border-box
        background-color #ffffff
        .address-list   
            .address-item
                width 100%
                height 205px
                font-size 30px
                box-shadow 1px 1px 8px #ccc
                padding 30px 80px 28px 30px
                box-sizing border-box
                margin-bottom 10px
                position relative
                .item-name
                    display flex
                    align-items center
                    margin-bottom 20px
                    .name   
                        margin-right 50px
                        font-size 36px
                    .tel
                        flex 1
                        font-size 28px
                .item-address
                    display flex
                    .isDefault
                        height 28px
                        line-height 28px
                        text-align center
                        font-size 24px
                        color #ffffff
                        background-color #43c439
                        border-radius 6px
                        margin-right 20px
                        margin-top 5px
                        padding 6px
                    .exact-address
                        flex 1
                        font-size 0
                        p
                            line-height 40px
                            font-size 30px
                            overflow hidden
                            display -webkit-box
                            -webkit-line-clamp 2
                            -webkit-box-orient vertical
                .editAddress
                    position absolute
                    top 10px
                    right 90px
                    display block
                    width 24px
                    height 24px
                    color #ccc
                .del-icon
                    position absolute
                    right 20px
                    top 10px 
                    width 24px
                    height 24px
                    display block
                    color #ccc
        .add-address
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
            .plus-icon
                width 37px
                display inline-block
                vertical-align middle
                margin-right 15px
                img 
                    width 100%

   

            

</style>
