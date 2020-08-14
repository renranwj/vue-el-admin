<template>
  <div class="bg-white px-3">
    <el-tabs v-model="tabIndex" @tab-click="handleClick" style="margin:0 10px;">
      <el-tab-pane :label="tab.name" v-for="(tab, tabI) in tabBars" :key="tabI">
        <div class="d-flex align-items-center">
          <!-- 左边 -->
          <el-button type="success" size="mini">发布商品</el-button>
          <el-button type="danger" size="mini">批量删除</el-button>
          <!-- 右边 -->
          <div style="margin-left:auto;" v-show="!superSearch">
            <el-input
              v-model="form.name"
              placeholder="要搜索的商品名称"
              size="mini"
              style="width:150px;margin-right: 10px;"
            ></el-input>
            <el-button type="info" size="mini">搜索</el-button>
            <el-button size="mini" @click="superSearch=true">高级搜索</el-button>
          </div>
        </div>

        <!-- 高级搜索 -->
        <el-card
          class="box-card bg-light"
          shadow="always"
          v-show="superSearch"
          style="margin-top:15px;"
        >
          <div slot="header" class="clearfix" style="padding:0px 10px;">
            <span style="font-size:14px;">高级搜索</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="superSearch=false"
            >收起</el-button>
          </div>
          <!-- 表单 -->
          <el-form ref="form" inline :model="form" label-width="80px" style="height:40px;">
            <el-form-item label="商品名称" style="paddding:15px 20px;">
              <el-input v-model="form.name" size="mini" placeholder="商品名称"></el-input>
            </el-form-item>
            <el-form-item label="商品类别">
              <el-select v-model="form.type" placeholder="请选择商品分类" size="mini">
                <el-option label="电脑" value="shanghai"></el-option>
                <el-option label="手机" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="info" size="mini">搜索</el-button>
              <el-button size="mini">清空搜索条件</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      superSearch: false,
      form: {
        name: "",
        type: "",
      },
      tabIndex: 0,
      tabBars: [
        { name: "审核中" },
        { name: "出售中" },
        { name: "已下架" },
        { name: "库存预警" },
        { name: "回收站" },
      ],
    };
  },
  methods: {
    //点击不同的tab，获取不同的数据
    handleClick(tab, event) {
      console.log(this.tabIndex);
    },
  },
};
</script>

<style scoped lang="less">
</style>
