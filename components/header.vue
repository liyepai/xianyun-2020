<template>
  <header class="header">
    <el-row type="flex" class="main" justify="space-between">
      <!-- logo -->
      <div class="logo">
        <img src="http://157.122.54.189:9093/images/logo.jpg" alt="" />
      </div>
      <!-- 导航 -->
      <el-row type="flex" class="daohan">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/ari">机票</nuxt-link>
      </el-row>
      <!-- 登录 -->
      <el-dropdown>
        <el-row
          type="flex"
          v-if="$store.state.user.userInfo.token"
          class="tupian"
        >
          <img
            :src="
              $axios.defaults.baseURL +
                $store.state.user.userInfo.user.defaultAvatar
            "
            alt=""
          />
          <i> {{ $store.state.user.userInfo.user.nickname }}</i>
          <em class="el-icon-arrow-down el-icon--right"></em>
        </el-row>
        <el-row type="flex" v-else>
          <nuxt-link to="/user/login">
            登录 / 注册
          </nuxt-link>
          <!-- 试一试能不能使用store管理得数据 -->
        </el-row>
        <span class="el-dropdown-link">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided>个人中心</el-dropdown-item>
          <el-dropdown-item @click="tuichu" divided >退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-row>
  </header>
</template>

<script>
export default {
 methods: {
   tuichu(){
   console.log(1111);
   
   }
 }
};
</script>

<style scoped lang="less">
.header {
  height: 60px;
  line-height: 60px;
  background: #fff;
  border-bottom: 1px #ddd solid;
  box-shadow: 0 3px 0 #f5f5f5;
  box-sizing: border-box;
  .main {
    width: 1000px;
    margin: 0 auto;
  }
  .logo {
    width: 156px;
    padding-top: 8px;
    img {
      display: block;
      width: 100%;
    }
  }
}
.daohan {
  flex: 1;
  margin: 0 20px;
  a {
    display: block;
    padding: 0 20px;
    box-sizing: border-box;
    &:hover {
      border-bottom: 5px #409eff solid;
      color: #409eff;
    }
  }
  /deep/ .nuxt-link-exact-active {
    background: #409eff;
    color: #fff !important;
  }
}

.tupian {
  align-items: center;
  img {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    border-radius: 16px;
  }
  &:hover{
    img{
      border: 2px solid rgb(219, 120, 39);
    }
  }
  
}
</style>
