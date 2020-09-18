<template>
  <div id="index" style="position:absolute;top:10px;right:0;bottom:0;left:0;">
    <!-- 数据统计 -->
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in count" :key="index">
        <el-card class="box-card" shadow="hover">
          <div style="display:flex;align-items:center;">
            <i
              class="text-white"
              :class="[item.icon, item.color]"
              style="width: 40px;height: 40px;line-height: 40px;text-align:center;font-size:25px;margin-right:2rem;"
            ></i>
            <div>
              <h4 style="margin-bottom: 1px;">{{item.num}}</h4>
              <small style="color:#909399;">{{item.desc}}</small>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 店铺，订单提示|统计图 -->
    <el-row :gutter="20">
      <el-col
        :span="12"
        style="margin-top:20px;height:370px;display:flex;flex-direction:column;justify-content:space-between;"
      >
        <!-- 店铺及商品提示, 交易提示 -->
        <el-card class="box-card" shadow="never" v-for="(item, index) in tips" :key="index">
          <div slot="header" class="clearfix">
            <span>{{item.title}}</span>
            <el-button style="float: right; padding: 3px 0" type="text">{{item.desc}}</el-button>
          </div>
          <el-row :gutter="20">
            <el-col
              :span="item.list.length|getSize"
              v-for="(item1, index) in item.list"
              :key="index"
            >
              <button class="btn btn-light" style="width: 100%;margin-bottom:1px;">
                <h4>{{item1.num}}</h4>
                <small style="color:#909399;">{{item1.desc}}</small>
              </button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12" style="margin-top: 20px;height:370px;">
        <!-- 统计图 -->
        <el-card class="box-card" style="height:370px;" shadow="never">
          <!-- 统计图容器 -->
          <div ref="myChart" style="width:100%;height:270px;"></div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 销售 -->
    <el-row :gutter="20" style="margin-top:20px;">
      <el-col :span="12">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>销售情况统计</span>
            <el-button style="float: right; padding: 3px 0" type="text">按周期统计商家店铺的订单量和订单金额</el-button>
          </div>
          <!-- bootstrap里面的媒体对象 -->
          <div
            class="media border"
            style="align-items:center;margin-top:15px;"
            v-for="(item, index) in sale"
            :key="index"
          >
            <span class="bg-light border-right" style="padding: 23px 14px;">{{item.title}}</span>
            <div class="media-body">
              <div class="border-bottom" style="padding:0 0 5px 15px;">
                <span>订单金额（元）</span>
                {{item.money}}
              </div>
              <div style="padding: 5px 0 0 15px;">
                <span>订单量（件）</span>
                {{item.num}}
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>单品销售排名</span>
            <el-button style="float: right; padding: 3px 0" type="text">按周期统计商家店铺的订单量和订单金额</el-button>
          </div>

          <!-- 表头固定的表格 -->
          <el-table :data="tableData" height="200" border style="width: 100%">
            <el-table-column type="index" width="50" align="center"></el-table-column>
            <el-table-column prop="name" label="商品信息" align="center"></el-table-column>
            <el-table-column prop="num" label="销量" width="50" align="center"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      tableData: [
		  {
			  name: '小天鹅（LittleSwan）滚筒洗衣机...',
			  num: '233'
		  },
		   {
			  name: '小天鹅（LittleSwan）滚筒洗衣机...',
			  num: '233'
		  },
		   {
			  name: '小天鹅（LittleSwan）滚筒洗衣机...',
			  num: '233'
		  },
		   {
			  name: '小天鹅（LittleSwan）滚筒洗衣机...',
			  num: '233'
		  },
		   {
			  name: '小天鹅（LittleSwan）滚筒洗衣机...',
			  num: '233'
		  },
		   {
			  name: '小天鹅（LittleSwan）滚筒洗衣机...',
			  num: '233'
		  },
	  ],
      count: [
        {
          icon: "el-icon-user-solid",
          num: "30",
          desc: "关注人数（个）",
          color: "bg-primary",
        },
        {
          icon: "el-icon-s-finance",
          num: "120",
          desc: "订单总数（笔）",
          color: "bg-success",
        },
        {
          icon: "el-icon-coin",
          num: "4183.80",
          desc: "今日订单总金额（元）",
          color: "bg-danger",
        },
        {
          icon: "el-icon-s-data",
          num: "100",
          desc: "本月销量（笔）",
          color: "bg-warning",
        },
      ],
      tips: [
        {
          title: "店铺及商品提示",
          desc: "需要关注的店铺信息及待处理事项",
          list: [
            {
              num: 64,
              desc: "出售中",
            },
            {
              num: 10,
              desc: "待回复",
            },
            {
              num: 0,
              desc: "库存预警",
            },
            {
              num: 3,
              desc: "仓库中",
            },
          ],
        },
        {
          title: "交易提示",
          desc: "需要立即处理的交易订单",
          list: [
            {
              num: 0,
              desc: "待付款",
            },
            {
              num: 10,
              desc: "待发货",
            },
            {
              num: 0,
              desc: "已发货",
            },
            {
              num: 3,
              desc: "已收货",
            },
            {
              num: 3,
              desc: "退款中",
            },
            {
              num: 3,
              desc: "待售后",
            },
          ],
        },
      ],
      sale: [
        {
          title: "昨日销量",
          money: "4234",
          num: "43",
        },
        {
          title: "本月销量",
          money: "1234",
          num: "22",
        },
      ],
    };
  },
  filters: {
    getSize(total) {
      return 24 / total;
    },
  },
  created() {},
  mounted() {
    //dom渲染完成之后，画统计图
    this.drawChart();
  },
  methods: {
    drawChart() {
      //   基于dom初始化eChart实例；
      let myChart = echarts.init(this.$refs.myChart);
      // 指定图表的配置项及数据
      let options = {
        title: {},
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top",
              },
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      };
      //使用刚指定的配置项和数据显示图表
      myChart.setOption(options);
    },
  },
};
</script>

<style scoped lang="less">
#index {
  margin: 20px;
}
</style>
