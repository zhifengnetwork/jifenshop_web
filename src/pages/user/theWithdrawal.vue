<template>
  <div class="tx_wrap">
    <!-- 头部组件 -->
    <Tx-Header custom-title="提现明细" custom-fixed>
      <!-- 返回按钮 -->
      <i slot="backBtn" class="iconfont iconfanhui"></i>
    </Tx-Header>
    <div class="content">
      <div class="bd_wrap">
        <div class="title_wrap">
          <ul>
            <li>申请日期</li>
            <li>金额</li>
            <li>手续费</li>
            <li>审核状态</li>
          </ul>
        </div>
        <!-- state审核成功 -->
        <!-- status审核失败 -->
        <!-- class="attr_value {{
        attrValueObj.attrValueStatus[valueIndex]?(value==attrValueObj.selectedValue?'attr_value_active':''):'attr_value_disabled'}}"-->
        <div class="list_wrap" v-for="(item,index) in list_Data" :key="index">
          <ul>
            <li>{{item.create_time}}</li>
            <li>{{item.money}}</li>
            <li>{{item.taxfee}}</li>
            <li v-if="item.status==1" class="status">{{item.status_text}}</li>
            <li v-if="item.status==-1" class="state">{{item.status_text}}</li>
            <li v-if="item.status==0" class="sss">{{item.status_text}}</li>
          </ul>
        </div>
      </div>
      <!--  -->
      <p class="none" v-if="shuju_none">没有数据哦~~</p>
    </div>
  </div>
</template>

<script>
import TxHeader from "@/pages/common/header/TopHeader";
export default {
  name: "theWithdrawal",
  data() {
    return {
	  shuju_none: false,
	  //上拉加载更多--s
	  xixi: 0,
      dataList: [], // 数据数组
      page: 1, // 第几页
	  upLoading: true, // 是否加载数据
	  list_Data: []
	  //上拉加载更多--e
    };
  },
  components: {
    TxHeader
  },
  created() {
	 //滚动条滚动到底部
	  var that=this;
	  window.onscroll = function(){
		//变量scrollTop是滚动条滚动时，距离顶部的距离
		var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
		//变量windowHeight是可视区的高度
		var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
		//变量scrollHeight是滚动条的总高度
		var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
		//滚动条到底部的条件
		if(scrollTop+windowHeight==scrollHeight){
		//写后台加载数据的函数
		
	      that.loadMore()
		} 
		}
    this.$axios({
      method: "post",
      url: "home/withdraw_list",
      data: {
        // window.localStorage.getItem('token') 　由于是多页面应用所以token存储在本地localStorage中
        p: 1,
        token:that.$store.state.token
      }
    }).then(res => {
      if (res.data.status === 1) {
        console.log(res.data.data);
        this.list_Data = res.data.data;
      }
    });
  },
  methods: {
    loadMore() {
      this.page++;
      if (this.upLoading) {
        console.log("xixi" + this.xixi);
        let that = this
        this.$axios({
          method: "post",
          url: "home/withdraw_list?p="+this.page,
          data:{
            token:that.$store.state.token
          }
        }).then(res => {
          if (res.data.data.length > 0) {
            this.upLoading = true;
            console.log(res.data.data);
            let dataList = this.list_Data;
            for (let i = 0; i < res.data.data.length; i++) {
               dataList.push(res.data.data[i]);
            }
            console.log(dataList);
            this.list_Data = dataList;
          } else {
			this.upLoading = false;
			this.shuju_none=true
          }
        });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.tx_wrap {
  width: 100%;
  height: 100%;

  .content {
    padding: 88px 0 0;

    .bd_wrap {
      margin: 20px 24px;
      color: #151515;

      .title_wrap {
        background: #ffd7c7;
        font-size: 0;
      }

      .title_wrap ul li {
        display: inline-block;
        width: 25%;
        font-size: 26px;
        font-weight: 550;
        text-align: center;
        line-height: 50px;
      }

      .list_wrap {
        background: #fff4f0;
        font-size: 0;
      }

      .list_wrap ul li {
        display: inline-block;
        width: 25%;
        font-size: 18px;
        text-align: center;
        line-height: 68px;
      }

      .list_wrap ul:nth-child(even) {
        background: #ffede7;
      }

      .state {
        color: #f70a0a;
      }

      .status {
        color: #12eb22;
      }
    }
  }
}

.sss {
  color: #895932;
}

.none {
  margin: 20px 0 0;
  font-size: 20px;
  color: #909090;
  text-align: center;
  line-height: 75px;
  margin-bottom 20px
}
</style>