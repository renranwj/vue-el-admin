<template>
  <div id="index">
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
            <el-col :span="item.list.length|getSize" v-for="(item1, index) in item.list" :key="index">
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
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
		<!-- 统计图容器 -->
		<div ref="myChart" style="width:100%;height:270px;">

		</div>

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
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
    };
  },
  filters: {
	getSize (total) {
		return 24/total;
	}
  },
  created() {},
  mounted() {
	  //dom渲染完成之后，画统计图
	  this.drawChart();
  },
  methods: {
	  drawChart () {
		//   基于dom初始化eChart实例；
		  let myChart = echarts.init(this.$refs.myChart);
		  // 指定图表的配置项及数据
		let options = {
			tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
		};
		//使用刚指定的配置项和数据显示图表
		myChart.setOption(options);
	  }
  },
};
</script>

<style scoped lang="less">
#index {
  margin: 20px;
}
</style>
