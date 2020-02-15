<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <!-- 整个框是乘机人的姓名和身份证 循环双向绑定 -->
        <div
          class="member-info-item"
          v-for="(item, index) in from.users"
          :key="index"
        >
          <el-form-item label="乘机人类型">
            <el-input
              placeholder="姓名"
              class="input-with-select"
              v-model="item.username"
            >
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input
              placeholder="证件号码"
              class="input-with-select"
              v-model="item.id"
            >
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers"
        >添加乘机人</el-button
      >
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <!-- 渲染保险数据 -->
        <div
          class="insurance-item"
          v-for="(item, index) in getData.insurances"
          :key="index"
        >
          <el-checkbox
            :label="
              `${item.type}：￥${item.price}/份×1  最高赔付${item.compensation} `
            "
            @change="bx(item.id)"
            border
          >
          </el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="from.contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="from.contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="from.captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit"
          >提交订单</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { log } from "util";
export default {
  data() {
    return {
      from: {
        users: [
          {
            username: "",
            id: ""
          }
        ],
        // 保险数据
        insurances: [],
        // 联系人姓名
        contactName: "",
        // 联系人电话
        contactPhone: "",
        //验证码
        captcha: "",
        //不需要发票
        invoice: false,
        seat_xid: this.$route.query.seat_xid,
        air: this.$route.query.id
      },

      //获取从哪进条机票进来的详细信息
      getData: {}
    };
  },
  mounted() {
    //跳到此页面先取出url中的参数进行请求
    const { id, seat_xid } = this.$route.query;
    this.$axios({
      url: "/airs/" + id,
      params: { seat_xid: seat_xid }
    }).then(res => {
      this.getData = res.data;
    });
  },

  methods: {
    // 添加乘机人
    handleAddUsers() {
      // 每次点击 往这个 数组添加对象
      this.from.users.push({
        username: "",
        id: ""
      });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      //看看移除的是哪个从数组中删除这个数据就OK
      this.from.users.splice(index, 1);
    },

    // 发送手机验证码
    handleSendCaptcha() {
      //如果有手机号再发送
      if (!this.from.contactPhone) {
        this.$message.error("请输入手机号");
        return;
      }
      //调用仓库中请求验证码的方法
      this.$store
        .dispatch("user/getTelMa", this.from.contactPhone)
        .then(res => {
          this.$message.success("验证码为: 000000");
        });
    },

    //保险
    bx(id) {
      //判断数组是否有这个id  如果有 那么他点击这一下 代表是取消也就是删除
      const idd = this.from.insurances.indexOf(id);
      //idd= -1
      if (idd > -1) {
        //删除该id
        this.from.insurances.splice(idd, 1);
      } else {
        this.from.insurances.push(id);
      }
    },

    // 提交订单
    handleSubmit() {
      // 在提交前得判断有些数据是空的，由于乘机人这部分是个数组得循环来判断里面
      const rules = {
        //乘机人部分
        users: {
          errMessage: "乘机人信息不能为空",
          validator: () => {
            //定个变量 等等判断后修改返回
            let panduan = true;
            //循环这个users数组，如果有空的  他就是false  就证明他里面有些没写
            this.from.users.forEach(v => {
              // v是当前对象，这个数组如果填加多个乘机人 那就多个对象
              if (!v.username || !v.id) {
                panduan = false;
              }
            });

            return panduan;
          }
        },

        //检查联系人
        contactName: {
          errMessage: "联系人不能为空",
          validator: () => {
            //如果  这个值 如果有  那么他是true  两个感叹后他还是true  如果是false ！！他还是false
            return !!this.from.contactName;
          }
        },
        //手机号
        contactPhone: {
          errMessage: "手机号不能为空",
          validator: () => {
            //如果  这个值 如果有  那么他是true  两个感叹后他还是true  如果是false ！！他还是false
            return !!this.from.contactPhone;
          }
        },
        captcha: {
          errMessage: "验证码号不能为空",
          validator: () => {
            //如果  这个值 如果有  那么他是true  两个感叹后他还是true  如果是false ！！他还是false
            return !!this.from.captcha;
          }
        }
      };

      //   if (!buer) return;
      //检查有没有存在false  先假设true  如果有存在false 再改
      let guize = true;
      Object.keys(rules).forEach(v => {
        //v 是这个规则里的每个对象，循环，一条一条执行
        if (!guize) return;
        //取出这个规则里的每条规则  rule是每条规则
        const item = rules[v];
        //将这条数据里validator返回的布尔值赋给我们假设的变量
        guize = item.validator();
        if (!guize) {
          this.$message.error(item.errMessage);
        }
      });
      //判断是不是都为true
      if (!guize) return; //如果false 那么就不能请求
      //如果为true
      this.$axios({
        method: "post",
        url: "/airorders",
        data: this.from,
        headers: {
          Authorization: "Bearer " + [this.$store.state.user.userInfo.token]
        }
      }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>
