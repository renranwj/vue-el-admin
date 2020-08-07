<template>
  <div id="layout">
    <el-container
      style="position: absolute; left: 0; top: 0; right: 0; bottom: 0;overflow: hidden;"
    >
      <!-- 头部导航布局 -->
      <el-header style="background-color:#545c64;display:flex;align-items: center;">
        <a class="h5 text-light" style="margin-bottom: 0;">UNI-ADMIN</a>
        <!-- default-active  当前激活菜单的index -->
        <el-menu
          :default-active="navBar.active"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          style="margin-left:auto;"
        >
          <el-menu-item
            :index="index|numToString"
            v-for="(item, index) in navBar.list"
            :key="index"
          >{{item.name}}</el-menu-item>
          <el-submenu index="6">
            <template slot="title">
              <el-avatar :size="25" :src="circleUrl" style="margin-right:10px;"></el-avatar>renran
            </template>
            <el-menu-item index="2-1">修改</el-menu-item>
            <el-menu-item index="2-2">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-container>
        <!-- 侧边布局 -->
        <el-aside width="200px">
          <el-menu default-active="2" @select="slideSelect">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 主布局 -->
        <el-main></el-main>
      </el-container>
    </el-container>

    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
export default {
  name: "layout",
  data() {
    return {
      navBar: {
        active: "1",
        list: [
          { name: "首页" },
          { name: "商品" },
          { name: "订单" },
          { name: "会员" },
          { name: "设置" },
        ],
      },
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  filters: {
    numToString(val) {
      return val.toString();
    },
  },
  methods: {
    // 监听点击的是哪一个导航
    //头部导航监听
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    //侧边导航监听
    slideSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
</style>