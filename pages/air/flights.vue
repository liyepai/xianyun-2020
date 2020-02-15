<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="beifen" @setNewlist="setNewlist" />

        <!-- 航班头部布局 -->
        <FlightsListHead v-if="isShow" />

        <!-- 航班信息 -->
        <FlightsItem
          v-show="isShow1"
          v-for="(item, index) in dataList"
          :key="index"
          :data="item"
        />
        <!-- :data="item" 传值给组件 组件接收进行渲染，否则数据都是相同的 -->
        <!-- 分页功能 -->
        <el-pagination
          v-if="isShow"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[8, 10, 12, 14]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
        <div v-if="isShow2" class="meiyou">
          没有您想要的航班点击撤销重新搜索
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "../../components/air/flightsListHead";
import FlightsItem from "../../components/air/flightsItem";
import FlightsFilters from "../../components/air/flightsFilters";

export default {
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters
  },
  data() {
    return {
      //获取到的机票总数据，里面有flights()info{}options{}total总数据条数
      lists: {
        //加这个info的原因是，主页在渲染是 还没有请求这个数据，这时候已经传过去给子组件是个空的
        //所以组件会报错
        info: {},
        options: {},
        flights: []
      },
      //控制是否显示分页栏
      isShow: true,
      isShow1: true,
      isShow2: false,
      beifen: {
        info: {},
        options: {},
        flights: []
      },
      pageIndex: 1,
      pageSize: 8,
      total: 0
    };
  },
  computed: {
    dataList() {
      if (!this.lists.flights) {
        //在没有值的情况下 放回一个空数组
        return [];
      }
      //   slice数组的方法 取（从哪里开始取，从哪里结束）
      //这两个变量是变化的，不可能每次都是（0-5条数据）下页就是（5-10）
      const arr = this.lists.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
      return arr;
    }
  },

  mounted() {
    //url栏上的参数只有在这个页面才能获取到  获取到 在引入的组件中 渲染 一样的
    this.$axios({
      url: "/airs",
      //axiospost请求带参是params，
      //获取路由参数：this.$router.query
      params: this.$route.query
    }).then(res => {
      this.lists = res.data;
      // 备份一个一样数据的数组传给子组件进行渲染，使用。。。展开运算符 是生成一个引用路径不一样的数组
      //如果不使用展开  这lists和beifen  本质还是同一个数组 修改一个会影响另外一个数组
      this.beifen = { ...res.data };
      this.total = this.lists.total;
    });
  },

  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
    },
    setNewlist(arr) {
      //arr是子组件 筛选过后的替换原来的数组 拿到后重新渲染
      this.lists.flights = arr;
      this.total = arr.length;
      if (arr === false) {
        this.isShow = false;
        this.isShow1 = false;
        this.isShow2=true
      } else if(arr!==false){
        this.isShow = true;
        this.isShow1 = true; 
          this.isShow2=false
      }
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
.meiyou {
  font-size: 20px;
  color: rgb(156, 108, 5);
  width: 100%;
  height: 100%;
  margin: 0 auto;
  text-align: center;
}
</style>
