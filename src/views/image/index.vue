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
        <el-button type="success" size="mini">创建相册</el-button>
        <el-button type="warning" size="mini">上传图片</el-button>
      </el-header>
      <el-container>
        <!-- 侧边 -->
        <el-aside width="200px" style="background:#fff;" class="border-right">
          <!-- 相册列表 -->
          <ul class="list-group list-group-flush">
            <li
              class="list-group-item list-group-item-action"
              style="display:flex;align-items:center;cursor:pointer;"
              v-for="(item, index) in albums"
              :key="index"
              @click.stop="albumsChange(index)"
              :class="{'active sum-active': index === albumsActive}"
            >
              {{item.name}}
              <el-dropdown style="margin-left:auto;">
                <span class="btn btn-light border">
                  {{item.num}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>修改</el-dropdown-item>
                  <el-dropdown-item @click.stop.native="albumDel(index)">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>
        </el-aside>
        <el-container>
          <!-- 主内容 -->
          <el-main></el-main>
        </el-container>
      </el-container>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      searchForm: {
        order: "",
        keyWord: "",
      },
      albums: [],
      albumsActive: "0",
    };
  },
  created() {
    this.__init();
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
    },
    //切换相册
    albumsChange(val) {
      this.albumsActive = val;
    },
    // 删除相册
    albumDel (val) {

    }
  },
};
</script>

<style scoped lang="less">
.sum-active {
    color: #67C23A!important;
    background-color: #f0f9eb!important;
    border-color: #c2e7b0!important;
}
</style>
