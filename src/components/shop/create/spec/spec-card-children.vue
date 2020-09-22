<template>
  <div class="spec-card-children">
    <div
      class="py-2 px-2 mr-3 mb-2 border d-flex align-items-center"
      style="border-radius:5px;position:relative;"
    >
      <div v-if="type != 0">
        <!-- 颜色选择器 -->
        <el-color-picker size="mini" v-if="type === 1"></el-color-picker>
        <!-- 图片选择器 -->
        <span class="btn btn-light mr-2 border" v-else>
          <i class="el-icon-plus"></i>
        </span>
      </div>
      <input
        type="text"
        value="内容"
        style="width:80px;font-size:15px;text-align:center;"
        class="border-0"
      />
      <span
        class="btn btn-light p-0"
        style="right:-10px;top:-10px;position:absolute;line-height:1;"
      >
        <i class="el-icon-circle-close"></i>
      </span>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "spec-card-children",
  props: {
      type: Number,
      require: true
  },
  data() {
    return {};
  },
};
</script>
 
<style scoped lang = "less">
</style>