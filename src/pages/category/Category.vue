<template>
  <div class="Category">
    <!-- 头部组件 -->
    <TopHeader custom-title="分类" custom-fixed>
      <i slot="backBtn" class="iconfont iconfanhui"></i> -->
      <i slot="rightBtn" class="iconfont icon-lajitong"></i> -->
    </TopHeader>
    <div class="height-88"></div>

    <div class="scroll-content">
      <div class="scroll-menu">
        <div
          class="menu-item"
          v-for="(item,index) in list_name"
          :key="index"
          :class="{'active': activeIndex === index}"
          @click="handleClick(item.cat_id,index)"
        >{{item.cat_name}}</div>
      </div>

      <div class="scroll-list">
        <div class="list-item" v-for="(items,index) in this.list_Data" :key="index">
          <div class="img-wrap">
            <router-link  :to="{path:'/Details',query: {id: items.goods_id}}">
              <img :src="items.img" />
            </router-link>
          </div>
          <div class="main">
            <router-link :to="{path:'/Details',query: {id: items.goods_id}}">
              <h3>{{items.goods_name}}</h3>
            </router-link>
            <p class="price">¥{{items.price}}<s style="color:#ccc;padding-left:5px" v-show="items.original_price>0">原价{{items.original_price}}</s></p>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部导航 -->
    <Navigate></Navigate>
  </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader";
import Navigate from "@/pages/common/footer/Navigate";
export default {
  name: "Category",
  components: {
    TopHeader,
    Navigate
  },
  data() {
    return {
      xixi: 1,
      dataList: [], // 数据数组
      page: 1, // 第几页
      upLoading: true, // 是否加载数据
      //--------
      activeIndex: 0,
      list_name: [],
      list_Data: [],
      morenid: 8
    };
  },
  created() {
    // 监听商品区域滚动条滚动到底部
    let that = this;
    this.$nextTick(() => {
      const el = document.querySelector(".scroll-list");
      const offsetHeight = el.offsetHeight;
      el.onscroll = () => {
        const scrollTop = el.scrollTop;
        const scrollHeight = el.scrollHeight;
        if (offsetHeight + scrollTop - scrollHeight >= -1) {
          // 需要执行的代码
          that.loadMore();
        }
      };
    });
    //默认渲染第一个数据的右边内容
    this.$axios({
      method: "get",
      url: "goods/categoryList"
    }).then(res => {
      if (res.data.status === 1) {
        console.log("dss");
        console.log(res.data.data);
        this.list_name = res.data.data;
        this.morenid = res.data.data[0].cat_id;
        this.$axios({
          method: "get",
          url:
            "goods/categoryGetGoods?cat_id=" +
            this.morenid +
            "&page=" +
            this.page
        }).then(res => {
          if (res.data.status === 1) {
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
            }
          }
        });
      }
    });
  },
  methods: {
    // 根据索引点击跳至对应内容
    handleClick(i, index) {
      // 如果点击左边的菜单栏的时候,应该将page 和 upLoading 重置为原始状态
      this.upLoading = true;
      this.page = 1;
      console.log(i);
      this.xixi = i;
      this.activeIndex = index;
      this.$axios({
        method: "get",
        url: "goods/categoryGetGoods?cat_id=" + i + "&page=1"
      }).then(res => {
        if (res.data.status === 1) {
          console.log(res.data.data);
          this.list_Data = res.data.data;
        }
      });
    },

    loadMore() {
      this.page++;
      if (this.upLoading) {
        console.log("xixi" + this.xixi);
        this.$axios({
          method: "get",
          url:
            "goods/categoryGetGoods?cat_id=" + this.xixi + "&page=" + this.page
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
            // 如果滚动条滚动到底部,没有数据的时候要将uploading为false
            this.upLoading = false;
          }
        });
      }
    }
  }
};
</script>


<style lang="stylus" scoped>
.Category {
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;

  .scroll-content {
    height: calc(100vh - 186px);
    display: flex;

    .scroll-menu {
      width: 250px;
      height: calc(100vh - 186px);
      text-align: center;
      margin-right: 30px;
      background-color: #f2f2f2;
      overflow: scroll;

      .menu-item {
        height: 80px;
        line-height: 80px;
        font-size: 30px;

        &.active {
          background-color: #fff;
        }
      }
    }

    .scroll-list {
      flex: 1;
      height: calc(100vh - 186px);
      overflow: scroll;

      .list-item {
        display: flex;
        margin-bottom: 30px;

        .img-wrap {
          width: 160px;
          height: 160px;
          overflow: hidden;
          margin-right: 20px;
          display: inline-block;
          vertical-align: top;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .main {
          width: 60%;
          display: inline-block;
          vertical-align: top;

          h3 {
            height: 70px;
            font-size: 26px;
            color: #151515;
            font-weight: normal;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            margin: 10px 0 10px;
          }

          .price {
            font-size: 26px;
            color: #f30c0c;
          }
        }
      }
    }
  }
}
</style>
