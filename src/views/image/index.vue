<template>
  <div>
    <el-container style="position:absolute;top:45px;right:0;bottom:0;left:0;">
      <!-- 头部 -->
      <el-header class="d-flex align-items-center border-bottom">
        <!-- left -->
        <div class="d-flex" style="margin-right:auto;">
          <el-select
            v-model="searchForm"
            placeholder="输入相册名称"
            size="mini"
            style="width:150px;margin-right:15px;"
          >
            <el-option label="降序" value="down"></el-option>
            <el-option label="升序" value="up"></el-option>
          </el-select>
          <el-input
            v-model="input"
            placeholder="请输入内容"
            size="mini"
            style="width:150px;margin-right:15px;"
          ></el-input>
          <el-button type="success" size="mini">搜索</el-button>
        </div>
        <el-button type="warning" size="mini" @click="unChoose" v-if="chooseList.length">取消选中</el-button>
        <el-button
          type="danger"
          size="mini"
          @click="delImage({all:true})"
          v-if="chooseList.length"
        >批量删除</el-button>
        <el-button type="success" size="mini" @click="openAlbumModel(false)">创建相册</el-button>
        <el-button type="warning" size="mini" @click="uploadModel=true">上传图片</el-button>
      </el-header>
      <el-container>
        <!-- 侧边 -->
        <el-aside width="200px" style="background:#fff;height:80vh" class="border-right">
          <!-- 相册列表 -->
          <ul class="list-group list-group-flush">
            <album-item
              v-for="(item, index) in albums"
              :key="index"
              :item="item"
              :index="index"
              @change="albumsChange"
              @del="albumDel"
              @open="openAlbumModel"
              :active="index === albumsActive"
            ></album-item>
          </ul>
        </el-aside>
        <!-- 主要内容 -->
        <el-container>
          <el-main>
            <!-- 相册主内容 -->
            <el-row :gutter="9">
              <el-col
                :span="24"
                :lg="4"
                :md="6"
                :sm="8"
                v-for="(item, index) in imageList"
                :key="index"
              >
                <el-card
                  class="box-card"
                  :body-style="{padding: '0'}"
                  style="margin-bottom:20px;position:relative;cursor:pointer;"
                  shadow="hover"
                >
                  <div class="border" :class="{'border-danger': item.ischecked}">
                    <!-- 选中角标 -->
                    <el-tag
                      type="danger"
                      effect="dark"
                      style="position:absolute;top:0;right:0;"
                      size="mini"
                      v-if="item.ischecked"
                      :disable-transitions="true"
                    >{{item.checkOrder}}</el-tag>
                    <img :src="item.url" alt style="width:100%;height:100px;" @click="choose(item)" />
                    <!-- 阴影 -->
                    <div
                      style="background:rgba(0,0,0,.5);width:100%;color:#fff;position:absolute;margin-top:-25px;padding:2px 10px;font-size:14px;"
                    >{{item.name}}</div>
                    <div style="text-align:center;padding:5px 0;">
                      <el-button icon="el-icon-view" size="mini" @click="previewImage(item)"></el-button>
                      <el-button
                        icon="el-icon-edit"
                        size="mini"
                        style="margin:0;"
                        @click="imageEdit(item, index)"
                      ></el-button>
                      <el-button
                        icon="el-icon-delete"
                        size="mini"
                        style="margin:0;"
                        @click="delImage({index})"
                      ></el-button>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </el-container>
      <el-footer class="border-top d-flex align-items-center" style="padding:0;">
        <!-- 底部 -->

        <!-- 左侧分页 -->
        <div
          style="width:200px;height:100%;flex-shrink:0;"
          class="d-flex justify-content-center align-items-center border-right"
        >
          <el-button-group>
            <el-button size="mini">上一页</el-button>
            <el-button size="mini">下一页</el-button>
          </el-button-group>
        </div>

        <!-- 右侧分页 -->
        <div style="flex:1;padding-left:70px;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          ></el-pagination>
        </div>
      </el-footer>
    </el-container>

    <!-- 修改/创建相册 -->
    <el-dialog
      :title="albumModelTitle"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="albumForm" label-width="80px">
        <el-form-item label="相册名称">
          <el-input placeholder="请输入相册名称" v-model="albumForm.name" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="相册排序">
          <el-input-number v-model="albumForm.order" :min="0" size="medium"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialalogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAlbumModel">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 上传图片 -->
    <el-dialog title="上传图片" :visible.sync="uploadModel" width="50%" :before-close="handleClose">
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
        style="text-align:center;"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialalogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAlbumModel">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 预览图片 -->
    <el-dialog :visible.sync="previewModel" width="50vw" top="6vh">
      <div style="margin:-60px -20px -30px -20px">
        <img :src="previewurl" alt style="width:100%;" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import albumItem from "@/components/image/album-item";
export default {
  data() {
    return {
      //分页的默认显示
      currentPage: 1,
      // 上传相片模态框
      uploadModel: false,
      // 图片预览模态框
      previewModel: false,
      input: "",
      searchForm: {
        order: "",
        keyWord: "",
      },
      albums: [],
      albumsActive: "0",
      dialogVisible: false,
      //如果-1，就是创建相册，如果是>=0(有索引)，就是修改
      albumsEditIndex: -1,
      albumForm: {
        name: "",
        order: "",
      },
      imageList: [
        // {
        //   url:
        //     "http://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/5f153ec25682e.jpg",
        //   name: "图片2",
        //   ischecked: false,
        // },
        // {
        //   url:
        //     "http://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/5f153e9e5e7d7.jpg",
        //   name: "图片2444",
        //   ischecked: false,
        // },
      ],
      //   当前预览图片的url
      previewurl: "",
      //   照片中选中的数组
      chooseList: [],
    };
  },
  components: {
    albumItem,
  },
  created() {
    this.__init();
  },
  computed: {
    albumModelTitle() {
      return this.albumsEditIndex > -1 ? "修改相册" : "创建相册";
    },
  },
  methods: {
    __init() {
      for (let i = 1; i <= 20; i++) {
        this.albums.push({
          name: "相册" + i,
          num: Math.floor(Math.random() * 100),
          order: 0,
        });
      }

      for (let i = 0; i < 30; i++) {
        this.imageList.push({
          id: i,
          url:
            "http://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/5f153e9e5e7d7.jpg",
          name: "图片" + i,
          ischecked: false,
          checkOrder: 0,
        });
      }
    },
    //切换相册,改变样式
    albumsChange(val) {
      this.albumsActive = val;
    },
    //修改相册
    albumEdit() {
      this.albums[this.albumsEditIndex].name = this.albumForm.name;
      this.albums[this.albumsEditIndex].order = this.albumForm.order;
    },
    // 删除相册
    albumDel(index) {
      this.$confirm("是否删除该相册?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //从albums中将当前相册切出去
          this.albums.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 初始化  修改/创建相册
    openAlbumModel(obj) {
      //修改
      if (obj) {
        let { item, index } = obj;
        //初始化表单，将原相册信息显示在表单中
        this.albumForm.name = item.name;
        this.albumForm.order = item.order;
        this.albumsEditIndex = index;
        return (this.dialogVisible = true);
      }
      //创建
      this.albumForm = {
        name: "",
        order: 0,
      };
      this.albumsEditIndex = "-1";
      this.dialogVisible = true;
    },
    //点击确定修改相册
    confirmAlbumModel() {
      //判断是否为已修改
      if (this.albumsEditIndex > -1) {
        //修改相册
        this.albumEdit();
        return (this.dialogVisible = false);
      }
      //  创建相册，追加albums(添加在前面)
      this.albums.unshift({
        name: this.albumForm.name,
        order: this.albumForm.order,
        num: 0,
      });
      this.dialogVisible = false;
    },
    //  相册模态框关闭
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //预览图片
    previewImage(item) {
      this.previewModel = true;
      this.previewurl = item.url;
    },
    //图片名称编辑
    imageEdit(item, index) {
      this.$prompt("请输入新名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: item.name,
        inputValidator(val) {
          //输入框的校验函数。可以返回布尔值或字符串，若返回一个字符串, 则返回结果会被赋值给 inputErrorMessage
          if (val === "") {
            return "图片名称不能为空";
          }
        },
      }).then(({ value }) => {
        item.name = value;
        this.$message({
          type: "success",
          message: "修改成功",
        });
      });
    },
    //删除当前照片 |  批量删除
    delImage(obj) {
      this.$confirm(
        obj.all ? "是否删除选中图片?" : "是否删除该图片？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        }
      )
        .then(() => {
          if (obj.all) {
            //批量删除
            //list 是排除掉选中的图片
            let list = this.imageList.filter((item) => {
              return !this.chooseList.some((img) => img.id === item.id);
            });
            this.imageList = list;
            this.chooseList = [];
          }
          //直接删除
          this.imageList.splice(obj.index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 选中图片
    choose(item) {
      if (!item.ischecked) {
        ///之前未选中
        //加入选中(将选中的照片push进选中的数组中)
        this.chooseList.push({
          id: item.id,
          url: item.url,
        });
        item.checkOrder = this.chooseList.length;
        //修改状态
        // 每次点击选中与不选中进行切换
        item.ischecked = !item.ischecked;
        // console.log(this.imageList)
        return;
      }

      //  取消选中
      //找到在chooseList中的索引，进行删除，若没有就是还没有选中
      let i = this.chooseList.findIndex((v) => v.id === item.id);
      if (i === -1) return;
      //重新计算序号
      let len = this.chooseList.length;
      //取消选中中间部分
      if (i + 1 < len) {
        //重新计算imageList中的序号checkOrder
        //只需要改变当前选中之后的checkOrder
        for (let j = i; j < len; j++) {
          let no = this.imageList.findIndex(
            (v) => v.id === this.chooseList[j].id
          );
          if (no > -1) {
            this.imageList[no].checkOrder--;
          }
        }
      }
      //   取消选中的正好是最后一个
      this.chooseList.splice(i, 1);
      //修改状态
      item.ischecked = false;
      //重置序号
    },
    // 取消选中
    unChoose() {
      this.imageList.forEach((item) => {
        // findIndex 找到返回相应的索引，若没有返回-1
        //找到所有选中的图片
        let i = this.chooseList.findIndex((img) => {
          return img.id === item.id;
        });

        if (i > -1) {
          //取消选中样式，选中序号归零
          item.ischecked = false;
          item.checkOrder = 0;
          //从chooseList中移除
          this.chooseList.splice(i, 1);
        }
      });
    },
    // 分页方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style scoped lang="less">
</style>
