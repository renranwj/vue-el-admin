<template>
  <div id="app">
    <router-view></router-view>

    <!-- <el-button>el-button</el-button> -->
    <!-- 如果:label,1就为数值，如果是label，1就是字符串 -->
    <!-- <el-radio v-model="radio" :label="1">选项1</el-radio>
    <el-radio v-model="radio" :label="2">选项2</el-radio>-->
    <!-- <el-radio-group v-model="radio" size="small">
      <el-radio :label="3" @change="change" border>3</el-radio>
      <el-radio :label="6" @change="change" border>6</el-radio>
      <el-radio :label="9" @change="change" border>9</el-radio>
    </el-radio-group>-->
    <!-- <div class="container">
      <div class="card mt-5 border-primary">
        <div class="card-header bg-primary text-white">头部</div>
        <div class="card-body">身体</div>
        <div class="card-footer">尾部</div>
      </div>
    </div>-->

    <image-dialog ref="imageDialog" :max="maxChooseList"></image-dialog>
  </div>
</template>

<script>
import imageDialog from "@/components/image/image-dialog";
export default {
  data() {
    return {
      maxChooseList: ""
    };
  },
  // 依赖注入
  provide() {
    return {
      app: this
    };
  },
  name: "app",
  methods: {
    chooseImage(callback, max = 9) {
      this.maxChooseList = max;
      this.$refs.imageDialog.chooseImage(callback);
    }
  },
  components: {
    imageDialog
  }
};
</script>

<style>
/* 滚动条样式，可以在百度上面找到 */
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 0;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.25);
  transition: color 0.2s ease;
}
</style>
