<template>
  <div>
    <div class="d-flex align-items-center">
      <!-- 左边 -->
      <slot name="left"></slot>
      <!-- 右边 -->

      <div style="margin-left:auto;" v-show="!superSearch">
        <slot name="right">
          <!-- 右边如果没有传入任何插槽的话，就用这个默认值，（里面写好的这个样式），否则就自定义样式 -->
          <el-input
            v-model="keyword"
            :placeholder="placeholder"
            size="mini"
            style="width:150px;margin-right: 10px;"
          ></el-input>
          <el-button type="info" size="mini" @click="$emit('search', keyword)">搜索</el-button>
          <el-button size="mini" @click="superSearch=true">高级搜索</el-button>
        </slot>
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
        <el-button style="float: right; padding: 3px 0;" type="text" @click="closeSuperSearch">收起</el-button>
      </div>
      <!-- 表单 -->
      <slot name="form"></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      keyword: "",
      superSearch: false,
    };
  },
  methods: {
    closeSuperSearch() {
      this.superSearch = false;
    },
  },
};
</script>

<style scoped lang="less">
</style>
