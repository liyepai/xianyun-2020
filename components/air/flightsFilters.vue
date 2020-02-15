<template>
  <div class="filters">
    <el-row
      type="flex"
      class="filters-top"
      justify="space-between"
      align="middle"
    >
      <el-col :span="8">
        单程： {{ data.info.departCity }} - {{ data.info.destCity }} /
        {{ data.info.departDate }}
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="airport"
          placeholder="起飞机场"
          @change="handleAirport"
        >
          <el-option
            v-for="(item, index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="flightTimes"
          placeholder="起飞时间"
          @change="handleFlightTimes"
        >
          <el-option
            v-for="(item, index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="company"
          placeholder="航空公司"
          @change="handleCompany"
        >
          <el-option
            v-for="(item, index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="airSize"
          placeholder="机型"
          @change="handleAirSize"
        >
          <el-option
            v-for="(item, index) in sizeOptions"
            :key="index"
            :label="item.name"
            :value="item.size"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button
        type="primary"
        round
        plain
        size="mini"
        @click="handleFiltersCancel"
      >
        撤销
      </el-button>
    </div>
    <!-- 渲染空的字符串，只需要监听功能 -->
    <span>{{ filter }}</span>
  </div>
</template>

<script>
export default {
  props: {
    // 数据
    data: {
      type: Object,
      // 默认是空数组
      default: {}
    },
    
  },
  computed: {
    //渲染空的字符串， 这里主要监听this的变化  airport flightTimes company airSize，一变化就执行
    filter() {
      const ishow = false;
      const arr = this.data.flights.filter(v => {
        //假设当前的数据是符合的
        let zt = true;

        //如果循环我这条数据里的机场名 不等于 我们点击的这个名字 这条数据就是false 就不会return出来
        //判断的this.airport  指的是 我们点击的这个选择  如果没点 这条数据就不会执行
        //航空公司
        if (this.company && v.airline_name !== this.company) {
          zt = false;
        }
        //机场
        if (this.airport && v.org_airport_name !== this.airport) {
          zt = false;
        }
        //飞机大小
        if (this.airSize && v.plane_size !== this.airSize) {
          zt = false;
        }
        //出发时间
        if (this.flightTimes) {
          //选中的时间
          const time = this.flightTimes.split(",");
          const hours = +v.dep_time.split(":")[0];
          if (+time[0] > hours || hours >= +time[1]) {
            //如果点击的这个开始出发时间大于 数据里的出发时间 或者 数据里的出发时间大于或者等于 点击的这个到达时间
            zt = false;
          }
        }
        //把当前这个数据为true的数据return出去
        return zt;
      });

      if (arr.length !== 0) {
        this.$emit("setNewlist", arr);
        return "";
      } else if (arr.length === 0) {
        this.$emit("setNewlist", ishow);
        return "";
      }
    }
  },
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小
      sizeOptions: [
        { name: "大", size: "L" },
        { name: "中", size: "M" },
        { name: "小", size: "S" }
      ]
    };
  },
  methods: {
    // 选择机场时候触发
    handleAirport(value) {
      //   const arr = this.data.flights.filter(v => {
      //     // v是 flights数组里的每条数据
      //     return v.org_airport_name === value;
      //   });
      //   this.$emit("setNewlist", arr);
      //--------------------------------------
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
      //让这个值变成数组
      //   const time = value.split(","); //['0','6']
      //   const arr = this.data.flights.filter(v => {
      //     //取出开始出发小时部分  做比较
      //     // 例如07:55  split起来就是 ['07':'55']
      //     //本来是字符串的  使用 +号  隐士转换为数字类型
      //     const hours = +v.dep_time.split(":")[0];
      //     return +time[0] <= hours && hours < +time[1];
      //   });
      //   this.$emit("setNewlist", arr);
    },

    // 选择航空公司时候触发
    handleCompany(value) {
      //   const arr = this.data.flights.filter(v => {
      //     return v.airline_name === value;
      //   });
      //   this.$emit("setNewlist", arr);
    },

    // 选择机型时候触发
    handleAirSize(value) {
      //   const arr = this.data.flights.filter(v => {
      //     return v.plane_size === value;
      //   });
      //   this.$emit("setNewlist", arr);
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
      (this.airport = ""), // 机场
        (this.flightTimes = ""), // 出发时间
        (this.company = ""), // 航空公司
        (this.airSize = ""), // 机型大小
        (this.sizeOptions = []);
    
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>
