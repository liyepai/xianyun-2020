<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" v-model="form.username"> </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">
            发送验证码
          </el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"> </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input
        placeholder="密码"
        type="password"
        v-model="form.password"
      ></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="conrirmpassword">
      <el-input
        placeholder="确认密码"
        type="password"
        v-model="form.conrirmpassword"
      >
      </el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">
      注册
    </el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    var tel = (rule, value, callback) => {
      if (!/^1[3-9][0-9]{9}$/.test(value)) {
        callback(new Error("请输入正确手机号码"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validatePass1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (this.form.password !== value) {
        callback(new Error("请输入一致密码"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      form: {
        //手机号
        username: "",
        nickname: "",
        captcha: "",
        password: "",
        conrirmpassword: ""
      },
      // 表单规则
      rules: {
        username: [{ validator: tel, trigger: "blur" }],
        nickname: [
          { required: true, message: "请选择输入昵称", trigger: "blur" }
        ],
        captcha: [
          { required: true, message: "请选择输入正确的验证码", trigger: "blur" }
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        conrirmpassword: [{ validator: validatePass1, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
      if (this.form.username === "") {
        this.$message.error("请先输入手机号");
        return;
      } else if (
        this.form.username.length !== 11 &&
        /^1[3-9][0-9]{9}$/.test(this.form.username) === false
      ) {
        this.$message.error("请输入11位的手机号");
        return;
      } else if (/^1[3-9][0-9]{9}$/.test(this.form.username)) {
        this.$store.dispatch("user/getTelMa", this.form.username).then(res => {
          this.form.captcha = "000000";
        });
      }
    },
    // 注册
    handleRegSubmit() {
      this.$refs.form.validate(valid => {
        //如果表单里都有写且符合规则
        if (valid) {
          //请求的数据不需要确认密码这个属性 先删除
          const { conrirmpassword, ...xing } = this.form;
          console.log(xing);

          this.$axios({
            url: "/accounts/register",
            method: "POST",
            data: xing
          }).then(res => {
            const { status, data } = res;
            if (status === 200) {
              this.$store.commit("user/setuserInfo", data);
              this.$router.push("/");
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
