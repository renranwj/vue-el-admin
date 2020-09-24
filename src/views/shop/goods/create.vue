<template>
  <div>
    <router-link :to="{name: 'shop_goods_list'}" style="position:absolute; top: 8px;left: 180px;">
      <el-button size="mini">回到商品列表</el-button>
    </router-link>

    <div
      class="bg-white px-3"
      style="position:absolute;left:0;top:47px;right:0;bottom:0;overflow:auto;"
    >
      <el-tabs @tab-click="handleClick" v-model="tabIndex" style="margin:0 10px;">
        <!-- 基础设置 -->
        <el-tab-pane label="基础设置">
          <base-create></base-create>
        </el-tab-pane>

        <!-- 商品规格 -->
        <el-tab-pane label="商品规格">
          <el-form ref="form" label-width="80px">
            <!-- 规格选项 -->
            <el-form-item label="商品规格">
              <el-radio-group :value="spec_type" @input="vModel('spec_type', $event)" size="medium">
                <!-- $event指的是下面选中的值 -->
                <el-radio-button :label="0">单规格</el-radio-button>
                <el-radio-button :label="1">多规格</el-radio-button>
              </el-radio-group>
            </el-form-item>

            <!-- 单规格 -->
            <template v-if="spec_type === 0">
              <single-spec></single-spec>
            </template>

            <!-- 多规格 -->
            <template v-else>
              <!-- 规格卡片 -->
              <el-form-item label="添加规格">
                <spec-card
                  v-for="(item, index) in spec_card"
                  :key="index"
                  :index="index"
                  :item="item"
                  :spec_card="spec_card"
                ></spec-card>
                <el-button
                  type="success"
                  style="margin-top: 20px;margin-left:70px;"
                  @click="addSpecCard"
                >添加规格</el-button>
              </el-form-item>
              <el-form-item label="批量设置">
                <el-button type="text">销售价</el-button>
                <el-button type="text">成本价</el-button>
                <el-button type="text">市场价</el-button>
                <el-button type="text">库存</el-button>
                <el-button type="text">体积</el-button>
                <el-button type="text">重量</el-button>
              </el-form-item>
              <el-form-item label="规格设置">
                
              </el-form-item>
            </template>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品属性"></el-tab-pane>
        <el-tab-pane label="媒体设置"></el-tab-pane>
        <el-tab-pane label="商品详情"></el-tab-pane>
        <el-tab-pane label="折扣设置"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import baseCreate from "@/components/shop/create/base-create";
import singleSpec from "@/components/shop/create/single-spec";
import specCard from "@/components/shop/create/spec/spec-card";

export default {
  data() {
    return {
      //当前是第几个tab页
      tabIndex: 0
    };
  },
  components: {
    baseCreate,
    singleSpec,
    specCard
  },
  computed: {
    //通过扩展运算符，映射
    ...mapState({
      spec_type: state => state.goods_create.spec_type,
      spec_card: state => state.goods_create.spec_card
    })
  },

  methods: {
    ...mapMutations(["vModelState", "addSpecCard"]),
    // 修改form的数据
    vModel(key, value) {
      this.vModelState({ key, value });
    },
    handleClick(tab, event) {
      // console.log(this.tabIndex);
    },
    onSubmit() {}
  }
};
</script>

<style scoped lang="less">
</style>
