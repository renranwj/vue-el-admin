<template>
  <div class="bg-white px-3" style="position:absolute;top:45px;right:0;bottom:0;left:0;">
    <!-- tabs 标签页 -->
    <el-tabs v-model="tabIndex" @tab-click="handleClick" style="margin:0 10px;">
      <el-tab-pane :label="tab.name" v-for="(tab, tabI) in tabBars" :key="tabI">
        <button-search placeholder="要搜索的商品名称" @search="searchEvent" ref="buttonSearch">
          <template #left>
            <router-link :to="{name: 'shop_goods_create'}" style="margin-right:8px;">
              <el-button type="success" size="mini">发布商品</el-button>
            </router-link>
            <el-button type="warning" size="mini">恢复商品</el-button>
            <el-button type="danger" size="mini">批量删除</el-button>
            <el-button size="mini">上架</el-button>
            <el-button size="mini">下架</el-button>
            <el-button size="mini">推荐</el-button>
          </template>

          <template #form>
            <el-form ref="form" inline :model="form" label-width="80px">
              <el-form-item label="商品名称" style="paddding:5px 20px;margin:0;">
                <el-input v-model="form.name" size="mini" placeholder="请输入商品名称"></el-input>
              </el-form-item>
              <el-form-item label="商品编码" style="paddding:5px 20px;margin:0;">
                <el-input v-model="form.code" size="mini" placeholder="请输入商品编码"></el-input>
              </el-form-item>
              <el-form-item label="商品类型" style="paddding:5px 20px;margin:0;">
                <el-select v-model="form.type" placeholder="请选择商品分类" size="mini">
                  <el-option label="电脑" value="shanghai"></el-option>
                  <el-option label="手机" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品分类" style="paddding:5px 20px;margin:0 15px 0 0;">
                <el-input v-model="form.category" size="mini" placeholder="请输入商品分类"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="info" size="mini" @click="searchEvent">搜索</el-button>
                <el-button size="mini" @click="clearSearch">清空搜索条件</el-button>
              </el-form-item>
            </el-form>
          </template>
        </button-search>

        <!-- 表格 -->
        <el-table
          :data="tableData[tabI].list"
          style="width: 100%;margin-top:20px;margin-bottom:65px;"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="45" align="center"></el-table-column>
          <!-- 商品信息 -->
          <el-table-column label="商品" width="380">
            <template slot-scope="scope">
              <div class="media">
                <img :src="scope.row.cover" class="mr-3" style="width: 60px;height: 60px;" />
                <div class="media-body">
                  <h6 class="mt-2" style="font-size:17px;">{{scope.row.title}}</h6>
                  <p class="mb-0">分类：{{scope.row.type}}</p>
                  <p class="mb-0">时间：{{scope.row.create_time}}</p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="商品类型" align="center"></el-table-column>
          <el-table-column prop="sale_count" label="实际销量" align="center"></el-table-column>
          <el-table-column prop="order" label="商品排序" align="center"></el-table-column>
          <!-- 上架/下架 -->
          <el-table-column label="商品状态" align="center" width="120">
            <template slot-scope="scope">
              <div class="d-flex flex-column align-items-center justify-content-center">
                <el-button
                  size="mini"
                  type="success"
                  plain
                  @click="scope.row.ischeck = 1"
                  style="margin-bottom:5px;"
                >审核通过</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  plain
                  @click="scope.row.ischeck = 2"
                  style="margin-left:0;"
                >审核不通过</el-button>
              </div>

              <!-- <el-button
                size="mini"
                :type="scope.row.status ? 'success' : 'danger'"
                plain
                @click="changeStatus(scope.row)"
              >{{scope.row.status ? '上架' : '下架'}}</el-button>-->
            </template>
          </el-table-column>
          <el-table-column prop="stock" label="总库存" align="center"></el-table-column>
          <el-table-column prop="pprice" label="价格（元）" align="center" width="100"></el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary" size="mini" plain>修改</el-button>
                <el-button type="danger" size="mini" plain @click="delItem(scope.$index)">删除</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div
          class="block bg-white border-top d-flex align-items-center"
          style="position:fixed;bottom:0;left:200px;right:0;height:60px;z-index:1000;"
        >
          <el-pagination
            :current-page="tableData[tabI].currentIndex"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            :total="400"
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import buttonSearch from "@/components/common/button-search";
export default {
  components: {
    buttonSearch,
  },
  data() {
    return {
      superSearch: false,
      form: {
        name: "",
        code: "",
        type: "",
        category: "",
      },
      tabIndex: 0,
      tabBars: [
        { name: "审核中" },
        { name: "出售中" },
        { name: "已下架" },
        { name: "库存预警" },
        { name: "回收站" },
      ],
      tableData: [],
      multipleSelection: [],
    };
  },
  created() {
    this.__getData();
  },
  methods: {
    //生成数据，根据选项卡
    __getData() {
      for (let i = 0; i < this.tabBars.length; i++) {
        this.tableData.push({
          currentIndex: 1,
          list: [],
        });
        for (let j = 0; j < 20; j++) {
          this.tableData[i].list.push({
            id: j,
            title: "ch概念手机" + i + "-" + j,
            cover:
              "http://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/5f352a30bba6b.jpeg",
            category: "手机",
            type: "普通商品",
            sale_count: 20,
            order: 100,
            status: 1,
            stock: 200,
            pprice: 1000,
            create_time: "2008/9/23 12:00",
            ischeck: 1,
            // 0 未审核，1 通过，2 不通过
          });
        }
      }
      //   console.log(this.tableData)
    },
    //点击不同的tab，获取不同的数据
    handleClick(tab, event) {
      //   console.log(this.tabIndex);
    },
    //搜索事件
    searchEvent(e) {
      if (typeof e === "string") {
        //有关键字，简单搜索
        return console.log("简单搜索", e);
      }
      console.log("高级搜索");
    },
    //清空筛选条件
    clearSearch() {
      this.form = {
        name: "",
        code: "",
        type: "",
        category: "",
      };
      //   一共有5个选项卡，触发当前选项卡的
      this.$refs.buttonSearch[this.tabIndex].closeSuperSearch();
    },
    // 监听多选变化
    handleSelectionChange(val) {
      this.multipleSelection = val;
      //   console.log(val);
    },
    // 删除当前商品
    delItem(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.tableData[this.tabIndex].list.splice(index, 1);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
    //修改状态（上架/下架）
    changeStatus(obj) {
      obj.status = obj.status === 1 ? 0 : 1;
    },
  },
};
</script>

<style scoped lang="less">
</style>
