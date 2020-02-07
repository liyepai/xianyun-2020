<template>
  <header class="header">
    <el-row type="flex" class="main"  justify="space-between">
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
      <el-row type="flex">
        <nuxt-link to="/user/login">
          登录 / 注册
        </nuxt-link>
      </el-row>
    </el-row>
  </header>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.header{
    height: 60px;
    line-height: 60px;
    background:#fff;
    border-bottom: 1px #ddd solid;
    box-shadow:0 3px 0 #f5f5f5;
    box-sizing: border-box;
    .main{
        width: 1000px;
        margin: 0 auto
    }
    .logo{
    width: 156px;
    padding-top:8px;
    img{
        display: block;
        width: 100%;
    }
    }
}
.daohan{
    flex: 1;
    margin: 0 20px;
    a{
         display:block;
         padding:0 20px;
         box-sizing: border-box;
         &:hover{
              border-bottom:5px #409eff solid;
              color:#409eff;
         }
    }
      /deep/ .nuxt-link-exact-active{
                background:#409eff;
                color:#fff!important;
            }
}
</style>
