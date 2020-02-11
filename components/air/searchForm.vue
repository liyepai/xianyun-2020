<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{ active: index === currentTab }"
      >
        <i :class="item.icon"></i>{{ item.name }}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
      
          class="el-autocomplete"
        ></el-autocomplete>
            <!-- @blur="moren" -->
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
          @blur="moren2"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          v-model="form.departDate"
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="">
        <el-button
          style="width:100%;"
          type="primary"
          icon="el-icon-search"
          @click="handleSubmit"
        >
          搜索
        </el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      },
      //存放出发地的数组
      DepartCity: [],
      //存放到达地的数组
      DestCity: [],
      arr: []
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {},

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, cb) {
      // console.log(value);
      if (!value) {
        return;
      }
      this.$store.dispatch("user/getSite", value, this.arr).then(res => {
        // this.DepartCity = res;
        //不用失焦
        this.form.departCity=res[0].value
        this.form.departCode=res[0].sort
        cb(res);
      });
      //封装了，原代码见最底下
    },

    //失焦默认选第一个
    // moren() {
    //   if (this.form.departCity !== "") {
    //     if (this.DepartCity.length === 0) {
    //       return;
    //     } else {
    //       this.form.departCity = this.DepartCity[0].value;
    //       this.form.departCode = this.DepartCity[0].sort;
    //     }
    //   } else {
    //     this.DepartCity = [];
    //   }
    // },
    moren2() {
      if (this.form.destCity !== "") {
        if (this.DestCity.length === 0) {
          return;
        } else {
          this.form.destCity = this.DestCity[0].value;
          this.form.destCode = this.DestCity[0].sort;
        }
      } else {
        this.DestCity = [];
      }
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      if (!value) {
        return;
      }
      this.$store.dispatch("user/getSite", value, this.arr).then(res => {
        this.DestCity = res;
        cb(res);
      });
      //   this.$axios({
      //     url: "/airs/city",
      //     params: {
      //       name: value
      //     }
      //   }).then(res => {
      //     const { data } = res.data;
      //     const Datanews = data.map(v => {
      //       //改造，需要带有value属性的
      //       v.value = v.name.replace("市", "");
      //       //记得返回v
      //       return v;
      //     });
      //     this.DestCity = Datanews;
      //     cb(Datanews);
      //   });
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      //获取点击到的地址
      this.form.departCity = item.value;
      this.form.departCode = item.sort;
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.form.destCity = item.value;
      this.form.destCode = item.sort;
    },

    // 确认选择日期时触发
    handleDate(value) {
      //使用moment第三方工具来格式化时间（看接口要求的）
      this.form.departDate = moment(value).format("YYYY-MM-DD");
    },

    // 触发和目标城市切换时触发
    handleReverse() {
      const { departCity, departCode, destCity, destCode } = this.form;
      this.form.departCity = destCity;
      this.form.departCode = destCode;
      this.form.destCity = departCity;
      this.form.destCode = departCode;
    },

    // 提交表单是触发
    handleSubmit() {
      if (
        !this.form.departCity ||
        !this.form.destCity ||
        !this.form.departDate
      ) {
        this.$message.error("请输入地点或时间");
        return;
      }
      //路由带参跳转query
      this.$router.push({ path: "/air/iii", query: this.form });
    }
  },
  mounted() {}
};
</script>
<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
