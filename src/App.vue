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
    </div> -->
    
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      // radio: 6,
    };
  },
  components: {},
  methods: {
    // change (e) {
    // 	console.log(e);// 3 6 9
    // }
  },
};
</script>

<style>
</style>
