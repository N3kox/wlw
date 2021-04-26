<template>
  <div id="myChart" :style="{ width: '300px', height: '300px' }"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    this.lineechars();
  },
  methods: {
    lineechars() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "成绩单",
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
  },
};
</script>

