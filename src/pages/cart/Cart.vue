<template>
    <div class="cart">
      	<!-- 头部组件 -->
		<TopHeader custom-title="购物车" custom-fixed>
			<i slot="rightBtn" class="iconfont iconshanchu" @click="deletOption()"></i>
		</TopHeader>
        <div class="height-88"></div>
        <!-- No INFO START -->
        <div v-show="list.length<1" class="no-info">
            <Nodata :nodatas="nodatas"></Nodata>
        </div>
        <!-- GOODS LIST START -->
        <div class="conter">
            <div class="c-list-" v-for="(item,key) in list" :key="key">
                <van-checkbox v-model="item.selected" :check ="item.selected" @click="selectGoods($event,key,item.id)" checked-color="red" data-radius="item.id"></van-checkbox>
                <div class="-list-img">
                    <router-link to="/Details"><img :src="item.img" /></router-link>
                </div>
                <div class="goods-info">
                     <router-link to="/Details"><p class="-info-msg">{{item.goods_name}}</p></router-link>
                    <div class="-info-option"> 
                        <span class="price">
                            ￥<strong>{{item.goods_price}}</strong>
                        </span>
                        <span class="-option-">
                            <i class="subling iconfont iconjian-copy" @click="reducingNumber(key)"></i>
                            <input class="inp" type="text" :value="item.goods_num" @change="changNumber($event,key)" disabled/>
                            <i class="puls iconfont iconjia-copy" @click="addNumber(key)" ></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <!-- CART FOOT START -->
        <div class="footer-height"></div>
        <div class="footer">
            <div class="footer-a">
                <span class="f-a-a">
                     <van-checkbox ref="allCheck" v-model="allChecked" @click="selectAll(allChecked)" checked-color="red"><strong>全选</strong></van-checkbox>
                </span>
                <div class="f-a-b">
                    <p class="size-30">
                        <strong>总计：</strong>
                        <span class="colorRed">￥<strong class="size-35">{{updatePrice | numFilter}}</strong></span>
                    </p>
                    <p class="size-24">
                        节省: <span class="size-20">￥</span><span class="size-30">10.00</span>
                    </p>
                </div>
            </div>
            <div class="footer-b" @click="toPay()">结算({{updateNumber}})</div>
        </div>
        <Navigate></Navigate>
    </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader";
import Navigate from "@/pages/common/footer/Navigate";
import Nodata from "@/pages/common/nodata/Nodata";
import { Dialog } from 'vant';
export default {
    data(){
        return {
            nodatas:{
                'imgSrc':'/static/images/cart/cart_icon.png',
                'text':'购物车空空如也~',
                'link':'/Hone'
            },
            list: [],
            allChecked: 0,
            xuanze_shop:[]  //选择要删除商品的购物车id
        };
    },

    

    components: {
        [Dialog.Component.name]: Dialog.Component
    },
    computed:{
        //选中时计算总价
        updatePrice(){
            let totalPrice=0;
            this.list.forEach((data)=>{
                if(data.selected){
                    totalPrice += new Number(data.goods_price) * new Number(data.goods_num);
                }
            })
            return totalPrice;
        },
        //选中时计算总数量
        updateNumber(){
            let count =0;
            this.list.forEach((data)=>{
                if(data.selected){
                    count ++
                }
            })
            return count;
        },
        
    },
    methods:{
        
        // 全选
        selectAll(allChecked){
            console.log(allChecked)
            for(var i =0;i<this.list.length;i++){
                //当所有的selseced为0的时候，点击全选按钮将所有的selected改为1，即选中状态
                if(!allChecked){
                    this.list[i].selected = 1;
                }
                else if(allChecked){
                    this.list[i].selected = 0
                }
            }
                

        },
        // 单选
        selectGoods(ev,key,ifc){
            console.log("dsss")
            console.log(ifc)
            console.log("dsss")
            var data =this.list[key];
             console.log(data.goods_id)
             this.$set(data,'selected',!data.selected);
             console.log("------") 
             console.log(this.list)
             console.log("------") 
            if(!data.selected){
                this.allChecked=0
            }else{
                if(this.countNumberCheckBoxes().length === this.list.length){
                    this.allChecked=1
                }
            }
            //将选择的id传过去,则传购物车的id过去
                var shopid=ifc;
                let that = this;
                this.$axios({
                method: "post",
                url: "/cart/selected?cart_id="+shopid,
                 data: {
                "token":that.$store.state.token
                     }
                }).then(res => {
                    console.log(res.data)
                  if(res.data.status===1){
                     console.log("Chenggongle8888888")
                  }
                }); 

          
         
           },
        // 减
        reducingNumber(key){
            var data =this.list[key];
            var idzhi=data.id;
            var val =parseInt(data.goods_num - 1) 
            let that = this;
           if(val<=1){
               val =1
           }
           this.$set( data,'goods_num',val )
           console.log(val);
           this.$axios({
                        method:'post',
                        url: '/cart/reduce_num?cart_id='+idzhi,
                        data: {
                            "token":that.$store.state.token
                        }
                        })
                        .then((res) => {
                           console.log("resresres")
                        })
        


        },
        changNumber(e,key){
            var val =e.target.value;
            var data =this.list[key]; 
            if(val<=1){
                return;
            }
            this.$set( data,'goods_num',val);





        },
        countNumberCheckBoxes(){    //计算选中的复选框的总数
            let counts =[];
            this.list.forEach((data)=>{
                if(data.selected){
                    counts.push('a')    // a 可为任何数，在这里仅用于占位
                }
            })
            return counts;
        },
        //删除
        deletOption(){
            Dialog.confirm({
            title: '信息提醒',
            message: '亲，再考虑考虑吧?'
            }).then(() => {

                let newArry=[]; //存储没有选中的项-item
                let arrid=[];  //存储选中的id
                this.list.forEach((data,index)=>{
                    if(!data.selected){
                        newArry.push(data);
                    }
                    else{
                        arrid.push(data.id);
                    }
                    })
                    this.list =newArry;
                    let that = this;
                    var a,b;
                    // 将数组arrid,转化成字符串,并且用逗号隔开
                    b= arrid.join(",");   
                    console.log(b) 
                    this.$axios({
                        method:'post',
                        url: '/cart/delCart?cart_id='+b,
                        data: {
                            "token":that.$store.state.token
                        }
                        })
                        .then((res) => {
                            console.log("zhangyunfei")
                        })

            // on confirm
            }).catch(() => {
            // on cancel
            });
        },
        addNumber(key){
            var data =this.list[key];
            var idzhiadd=data.id
            let that = this;
            var val =parseInt(data.goods_num) 
            val =new Number(val+ 1)
            this.$set( data,'goods_num',val);
            console.log(val);
             this.$axios({
                method:'post',
                url: '/cart/change_num?cart_id='+ idzhiadd+'act=j',
                data: {
                    "token":that.$store.state.token
                }
                })
                .then((res) => {
                    console.log("resresres")
                })
        },
        //结算
        toPay(){     
            console.log("buibui")
            let newArry=[]; //存储没有选中的项-item
            let arrid=[];  //存储选中的id
            let that = this;
            this.list.forEach((data,index)=>{
                if(!data.selected){
                    newArry.push(data);
                }
                else{
                    arrid.push(data.id);
                }
                })
                this.list =newArry;
                var a,b;
                // 将数组arrid,转化成字符串,并且用逗号隔开
                b= arrid.join(",");   
                console.log(b) 
                this.$axios({
                    method:'post',
                    url: '/order/temporary?cart_id='+b,
                    data: {
                        "token":that.$store.state.token
                    }
                    })
                    .then((res) => {
                        console.log("dsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss")
                    })

            this.$router.push({path: '/pay/ConfirmOrder',name:'ConfirmOrder'})
        }
    },
    mounted() {
        var num=0;
        let that = this;
        this.$axios({
            method:'post',
            url: 'cart/cartlist',
            data: {
                "token":that.$store.state.token
            }
            })
            .then((res) => {
                this.list = res.data.data
                console.log(this.list)
                this.list.forEach((data)=>{
                if(data.selected){
                    num++   
                }
            })
            if(this.list.length==num){
                this.allChecked=1
            }


            })
    },
    // 商品总价保留小数点后两位,过滤器
    filters: {
        numFilter (value) {
            // 截取当前数据到小数点后两位
            let realVal = parseFloat(value).toFixed(2)
            return realVal
        }
    },
    components: {
        TopHeader,
        Navigate,
        Nodata
	}

}
</script>

<style lang="stylus" scoped>
        .colorRed
            color:#ff112f
        .size-35
            font-size:35px;
        .size-30
            font-size:30px;
        .van-checkbox__icon--checked .van-icon
            background-color: #f30c0c !important;
            border-color: #fff !important;
        .cart
            width:100%;
            min-height:100%;
            color:#151515;
            .conter
                margin : 10px 24px;
                .c-list-
                    width:100%;
                    margin-bottom:12px;
                    border-radius:6px;
                    padding: 20px 20px 20px 6px;
                    height:238px;
                    display:flex;
                    align-items :center;
                    box-sizing: border-box;
                    background #fff
                    border-radius 10px
                    .-list-img
                        width:201px;
                        height:176px;
                        margin-left 30px
                        img
                            width:100%;
                            height 100%;
                    .goods-info
                        width:445px;
                        margin-left:30px;
                        .-info-msg
                            width:100%;
                            height:80px;
                            font-size:24px;
                            color #151515;
                            overflow:hidden;
                            text-overflow: ellipsis;
                            -webkit-line-clamp: 2;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            margin-bottom:10px;
                            word-break: break-all;
                        .-info-option
                            display:flex;
                            justify-content:space-between;
                            align-items center;
                            .price
                                color:#ff112f;
                                font-size:20px;
                                strong
                                    font-size:30px;
                            .-option-
                                border: 2px solid #e6e6e6;
                                width: 200px;
                                height: 40px;
                                line-height :40px;
                                display :flex;
                                align-items :center;
                                justify-content:space-between;
                                border-radius: 20px;
                                text-align:center;
                                .iconfont
                                    width:41px;
                                    height:100%;
                                    font-size: 12px;
                                .puls
                                    width 48px
                                    border-left:1px solid #e6e6e6;
                                .subling
                                    width 48px
                                    border-right:1px solid #e6e6e6;
                                  
                                .inp
                                    width:94px;
                                    text-align: center;
                                    height:inherit;
                                    font-size:24px;
                                    font-weight:bold;
            .footer-height
                width :100%;
                height:220px;
            .footer
                position :fixed;
                bottom:98px;
                width :100%;
                height:120px;
                left:0;
                background:#fff;
                z-index :2;
                box-shadow: 0px 0px 5px 0px #cccccc;
                display :flex;
                .footer-a
                    width:530px;
                    display :flex;
                    padding-left:28px;
                    .f-a-a
                        display:flex;
                        margin-right:60px;
                    .f-a-b
                        margin :14px 5px 8px 0;
                    .f-a-b p:nth-child(1)  
                        margin-bottom :2px;
                .footer-b
                    width:221px;
                    background:#f30c0c;
                    color:#fff;
                    line-height:120px;
                    text-align: center;
                    font-size:30px;
                    font-weight:bold;                 
.c-list- >>> .van-checkbox__icon
    width 70px
    margin-left 10px
    
    
</style>    

