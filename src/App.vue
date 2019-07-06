<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    //判断是否为微信环境 --- 两行代码
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
	//  在本地获取token,如果token为空或者为null或者为null的时候,就要请求后台,获取token	
      var huoqutoken = window.sessionStorage.getItem("token");
      if (huoqutoken == "" || huoqutoken == null || huoqutoken == undefined) {
        if ( window.location.href.indexOf("code") == 0 ||window.location.href.indexOf("code") <= 0) {
          var local = window.location.href; // 获取页面url
          this.$axios({
            method: "get",
            url: "/login/get_code_url?baseUrl=" + local
          }).then(res => {
            console.log(res.data.data);
            var lianjie = res.data.data;
            window.location.href = lianjie;
          });
        } else {
          var code = this.getQueryString("code");
          // alert(code)
          this.$axios({
            method: "get",
            url: "/login/login_by_code?code=" + code
          }).then(res => {
            // alert(res.data.data.token)
            //获取token,储存到本地
            if (res.data.status == 1) {
              window.sessionStorage.setItem("token", res.data.data.token);
              this.$store.state.token = res.data.data.token;
            }
          });
        }
      }
    } else {
		 window.sessionStorage.setItem("token", "0000eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJEQyIsImlhdCI6MTU1OTYzOTg3MCwiZXhwIjoxNTU5Njc1ODcwLCJ1c2VyX2lkIjo3Nn0.YUQ3hG3TiXzz_5U594tLOyGYUzAwfzgDD8jZFY9n1WA");
    }
  },
  methods: {
    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      } else {
        return null;
      }
    }
  }
};
</script>

<style lang="stylus">
body {
  background-color: #f7f7f7;
  color: #151515;

  .height-88 {
    width: 100%;
    height: 88px;
  }
}
</style>
