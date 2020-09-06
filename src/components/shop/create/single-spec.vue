<template>
  <div>
    <el-form>
      <el-form-item label="市场价格">
        <el-input
          :value="oprice"
          @input="vModel('oprice', $event)"
          type="number"
          style="width:30%;min-width:100px;"
        >
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="销售价格">
        <el-input
          :value="pprice"
          @input="vModel('pprice', $event)"
          type="number"
          style="width:30%;"
        >
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="成本价格">
        <el-input
          :value="cprice"
          @input="vModel('cprice', $event)"
          type="number"
          style="width:30%;"
        >
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="商品重量">
        <el-input
          :value="weight"
          @input="vModel('weight', $event)"
          type="number"
          style="width:20%;"
        >
          <template slot="append">公斤</template>
        </el-input>
      </el-form-item>
      <el-form-item label="商品体积">
        <el-input
          :value="volume"
          @input="vModel('volume', $event)"
          type="number"
          style="width:20%;"
        >
          <template slot="append">立方米</template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
   computed: {
    //通过扩展运算符，映射
    ...mapState({
      oprice: (state) => state.goods_create.oprice,
      pprice: (state) => state.goods_create.pprice,
      cprice: (state) => state.goods_create.cprice,
      weight: (state) => state.goods_create.weight,
      volume: (state) => state.goods_create.volume,
    }),
  },
   methods: {
    ...mapMutations(["vModelState"]),
    // 修改form的数据
    vModel(key, value) {
      this.vModelState({ key, value });
    },
  },
};
</script>

<style scoped lang="less">
</style>
