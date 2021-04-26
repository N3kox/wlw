<template>
  <div class="app">
    <el-container>
      <el-aside width="400px">
        <el-popover placement="top" width="250" v-model="popVisible">
          <p>
            选择
            {{ toBeAggregateId >= 0 ? fromBackend[toBeAggregateId].name : "" }}
            移动目标
          </p>
          <div style="text-align: right; margin: 0">
            <el-button
              v-for="name in sqlFunc"
              :key="name"
              type="primary"
              size="mini"
              @click="addAggregate(name)"
              >{{ name }}</el-button
            >
            <el-button size="mini" type="text" @click="popVisible = false"
              >取消</el-button
            >
          </div>
        </el-popover>
        <div class="data_block" v-for="v in fromBackend" :key="v.id">
          {{ v.name }}
          <el-button
            type="success"
            icon="el-icon-view"
            circle
            @click="addGroupByItem(v.id)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-plus"
            circle
            @click="aggregateChoose(v.id)"
          ></el-button>
        </div>
      </el-aside>
      <el-container>
        <!-- <el-header>Header</el-header> -->
        <el-main>
          <div class="type_a_area">
            group by
            <el-tag
              v-for="item in setA"
              :key="item.id"
              closable
              type="info"
              @close="groupByHandleClose(item)"
            >
              {{ item.name }}
            </el-tag>
          </div>

          <div class="type_b_area">
            aggregate by
            <el-tag
              v-for="item in setB"
              :key="item.showName"
              closable
              :disable-transitions="false"
              @close="aggregateByHandleClose(item)"
            >
              {{ item.showName }}
            </el-tag>
          </div>
          <el-button type="success" @click="requestSearchResult"
            >查 询</el-button
          >
          <el-button type="success" @click="navigateTo">echars跳转</el-button>
        </el-main>
        <div id="myChart" :style="{ width: '300px', height: '300px' }"></div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data: () => ({
    fromBackend: [
      // {
      //   id: 0,
      //   name: "hello",
      //   val: 3,
      // },
      // {
      //   id: 1,
      //   name: "what",
      //   val: 4,
      // },
    ],
    toBeAggregateId: -1,
    popVisible: false,
    setA: [],
    setB: [],
    sqlFunc: ["sum", "count", "average"],
    selfAppendId: 0,
  }),
  methods: {
    searchIndexById(id, list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id == id) return i;
      }
      return -1;
    },
    addGroupByItem(id) {
      let index = this.searchIndexById(id, this.fromBackend);
      if (index >= 0 && this.searchIndexById(id, this.setA) == -1) {
        this.setA.push(this.fromBackend[index]);
        // this.$message("Add Group By Item OK!");
      }
    },
    groupByHandleClose(item) {
      let index = this.searchIndexById(item.id, this.setA);
      window.console.log(index);
      if (index >= 0) {
        this.setA.splice(index, 1);
      }
    },
    addAggregate(name) {
      let item = JSON.parse(
        JSON.stringify(this.fromBackend[this.toBeAggregateId])
      );
      item.showName = name + "(" + item.name + ")";
      item.func = name;
      this.popVisible = false;
      let i = 0;
      for (i = 0; i < this.setB.length; i++) {
        if (this.setB[i].id == item.id && this.setB[i].func == item.func) {
          break;
        }
      }
      if (i == this.setB.length) {
        this.setB.push(item);
      }
      this.toBeAggregateId = -1;
    },
    aggregateChoose(id) {
      this.toBeAggregateId = id;
      this.popVisible = true;
    },
    aggregateByHandleClose(item) {
      window.console.log(item);
      let index = this.setB.indexOf(item);
      if (index >= 0) {
        this.setB.splice(index, 1);
      }
    },
    parseImension() {
      let res = [];
      for (let i = 0; i < this.setA.length; i++) {
        res.push(this.setA[i].name);
      }
      return res;
    },
    parseQueryResult() {
      let res = [];
      for (let i = 0; i < this.setB.length; i++) {
        let item = {};
        item.field = this.setB[i].name;
        item.aggregate_function = this.setB[i].func;
        res.push(item);
      }
      return res;
    },
    // http request
    requestSearchResult() {
      let that = this
      let requestBody = {};
      requestBody.table_name = "test.income";
      requestBody.imension = this.parseImension();
      requestBody.query_result = this.parseQueryResult();
      // window.console.log(JSON.stringify(requestBody));
      if(requestBody.imension.length == 0){
        this.$message.error("imension 不能为空")
      }else if(requestBody.query_result.length == 0){
        this.$message.error("query 不能为空")
      }else{
        this.$axios.post(that.patchUrl(`normal_query`), JSON.stringify(requestBody), { emulateJSON: true })
        .then(function(res){
          window.console.log(res)
        }).catch(function(err){
          window.console.log(err);
        })
        
      }

      
      //let that = this;
      // that.$http
      //   .get(this.patchUrl(``))
      //   .then((response) => {
      //     if ((response.data = null || response.ok == false)) {
      //       that.$message.error("Error");
      //     } else {
      //       window.console.log(JSON.parse(response.bodyText));
      //     }
      //   });
    },
    navigateTo() {
      // let that = this
      this.$router.push({
        path: "./ec",
        name: "ec",
        params: {
          // node : that.nodeDetail
        },
      });
    },
    init() {

      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      // TODO
      myChart.setOption({
        title: {
          text: "wlw_title",
          link: "https://www.baidu.com",
          textStyle: {
            color: "red",
          },
        },
        xAxis: {
          type: "category", //类目轴
          data: ["小明", "小红", "小王"],
        },
        yAxis: {
          type: "value", // 数值轴
        },
        series: [
          {
            name: "语文",
            type: "bar",
            data: [100, 90, 80],
          },
          {
            name: "数学",
            type: "line",
            data: [100, 90, 80],
          },
        ],
      });
    },
    getSelfAppendId(){
      let cur = this.selfAppendId
      this.selfAppendId++
      return cur
    },
    loadData() {
      let that = this;
      this.$axios({
        method: "get",
        url: this.patchUrl("get_all_filed?table_name=test.income"),
      })
        .then(function (res) {
          // window.console.log(res)
          if(res.data == null || res.statusText != "OK"){
            that.$message.error("初始化请求数据失败,请刷新重试")
          }else{
            // let data = JSON.parse(res.data);
            for(let i = 0; i < res.data.length; i++){
              let item = {}
              item.name = res.data[i]
              item.id = that.getSelfAppendId()
              that.fromBackend.push(item)
            }
          }
        })
        .catch(function (err) {
          window.console.log(err);
        });
    },
  },
  mounted() {
    this.loadData();
    this.init();
  },
};
</script>

<style scoped>
.el-container {
  height: 100%;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-menu {
  background-color: #d3dce6;
}

html,
body,
#app {
  height: 100%;
  margin: 0px;
  padding: 0px;
}

.data_block {
  height: 80px;
  width: 90%;
  margin: 10px;
  background-color: sandybrown;
}

.type_a_area {
  background-color: rgb(101, 184, 101);
}

.type_b_area {
  background-color: antiquewhite;
}
</style>