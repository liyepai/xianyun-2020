<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名：" prop="username">
        <el-input
          v-model="ruleForm.username"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input
          v-model="ruleForm.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">登录</el-button>
        <el-button type="primary" @click="didi">获取账号密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "13800138000", trigger: "blur" }],
        password: [{ required: true, message: "123456", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      //判断这个表单是否有填写，有为true  否则为false
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          //这里原来有请求登录接口的方法，由于后期别的地方可能需要用到这个接口，
          //把这个请求的方法放到store仓库里的actions模块里，这里像调用接口一样调用 传参
          this.$store.dispatch("user/login", this.ruleForm).then(res => {
            this.$message.success("登录成功");
            this.$router.push("/");
          });
        }
      });
    },
    didi() {
      (this.ruleForm.username = "13800138000"),
        (this.ruleForm.password = "123456");
    }
  }
};
</script>

<style scoped lang="less">
/deep/.el-input__inner {
  width: 90%;
}
/deep/.demo-ruleForm {
  margin-top: 20px;
}
</style>
