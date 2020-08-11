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
      <el-col :span="12" style="margin-top: 20px;height:370px;">
        <!-- 店铺及商品提示 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          
        </el-card>
        <!-- 交易提示 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          
        </el-card>
      </el-col>
      <el-col :span="12" style="margin-top: 20px;height:370px;">
        <!-- 统计图 -->
        <el-card class="box-card" style="height:370px;">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
         
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
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
      reminder: [
          {
              
          }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
#index {
  margin: 20px;
}
</style>
