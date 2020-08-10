<template>
  <div id="layout">
    <el-container
      style="position: absolute; left: 0; top: 0; right: 0; bottom: 0;overflow: hidden;"
    >
      <!-- 头部导航布局 -->
      <el-header style="background-color:#545c64;display:flex;align-items: center;">
        <a class="h5 text-light" style="margin-bottom: 0;">
          <!-- 在main.js中引入的全局的配置文件，放在Vue.prototype上面，可以这样直接引入 -->
          {{$conf.logo}}
        </a>
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
          <el-menu default-active="0" @select="slideSelect" style="height:100%;">
            <el-menu-item
              :index="index|numToString"
              v-for="(item, index) in silderMenu"
              :key="index"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 主布局 -->
        <el-main style="padding: 0;">
          <!-- 面包屑导航 -->
          <div class="bread" style="border-bottom: 1px solid #e6e6e6; padding: 15px; margin-bottom: -15px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>活动管理</el-breadcrumb-item>
              <el-breadcrumb-item>活动列表</el-breadcrumb-item>
              <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-main>
      </el-container>
    </el-container>

    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import common from "@/common/mixins/common.js";
export default {
  name: "layout",
  mixins: [common],
  data() {
    return {
	  navBar: [],
	  bread: [],
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  created() {
    //初始化菜单
	this.navBar = this.$conf.navBar;
	
	// 获取面包屑导航
	this.getRouteBrea();
  },
  computed: {
    sliderMenuActive: {
      set(val) {
        this.navBar.list[this.navBar.active].subActive = val;
        //  console.log(val)
      },
      get() {
        return this.navBar.list[this.navBar.active].subActive || "0";
      },
    },
    silderMenu() {
      return this.navBar.list[this.navBar.active].submenu || [];
    },
  },
  methods: {
    // 监听点击的是哪一个导航
    //头部导航监听
    handleSelect(key, keyPath) {
      this.navBar.active = key;
    },
    //侧边导航监听
    slideSelect(key, keyPath) {
      //   this.navBar.list[this.navBar.active].subActive = key;
      this.sliderMenuActive = key;
	},
	
	// 获取面包屑导航
	getRouteBrea () {
		//过滤掉没有name属性的
		let b = this.$route.matched.filter(val => val.name);
		let arr = [];
		b.forEach((item, index) => {
			//过滤掉layout跟index（她两没有面包屑导航）
			if(item.name === 'layout' || item.name === 'index') return;
			arr.push({
				name: item.name,
				path: item.path,
				title: item.meta.title
			});
		});
		if(arr.length > 0) {
			arr.unshift({
				name: 'index',
				path: '/index',
				title: '后台首页'
			})
		}
		console.log(arr)
		this.bread = arr;
	}
  },
};
</script>

<style>
</style>