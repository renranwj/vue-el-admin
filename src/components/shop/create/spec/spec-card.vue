<template>
  <div>
    <div
      class="card"
      style="line-height:20px;margin-bottom:10px;"
      v-for="(item, index) in spec_card"
      :key="index"
    >
      <div class="card-header d-flex align-items-center">
        规格项：
        <el-input
          placeholder="请输入内容"
          style="width: 200px;"
          size="mini"
          :value="item.name"
          @input="vModel('name', index, $event)"
        >
          <el-button slot="append" icon="el-icon-more" size="mini"></el-button>
        </el-input>
        <el-radio-group
          size="mini"
          style="margin-left: 20px;"
          :value="item.type"
          @input="vModel('type', index, $event)"
        >
          <el-radio :label="0" style="margin-bottom:0;">无</el-radio>
          <el-radio :label="1" style="margin-bottom:0;">颜色</el-radio>
          <el-radio :label="2" style="margin-bottom:0;">图片</el-radio>
        </el-radio-group>
        <el-button
          size="mini"
          icon="el-icon-top"
          style="margin-left:auto;"
          :disabled="index === 0"
          @click="sortCard('moveUp',index)"
        ></el-button>
        <el-button
          size="mini"
          icon="el-icon-bottom"
          @click="sortCard('moveDown',index)"
          :disabled="(index + 1) === spec_card.length"
        ></el-button>
        <el-button size="mini" type="text" @click="deleSpecCard(index)">删除</el-button>
      </div>
      <div class="card-body">
        <!-- 规格属性列表 -->
        <div class="d-flex align-items-center flex-wrap">
          <div
            class="py-2 px-2 mr-3 mb-2 border d-flex align-items-center"
            style="border-radius:5px;position:relative;"
          >
            <div v-if="item.type != 0">
              <!-- 颜色选择器 -->
              <el-color-picker size="mini" v-if="item.type === 1"></el-color-picker>
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
        <!-- 增加规格值 -->
        <div>
          <el-button size="mini" type="text" icon="el-icon-plus">增加规格值</el-button>
        </div>
      </div>
    </div>
    <el-button type="success" style="margin-top: 20px;margin-left:70px;" @click="addSpecCard">添加规格</el-button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      spec_card: state => state.goods_create.spec_card
    })
  },
  methods: {
    ...mapMutations([
      "addSpecCard",
      "deleSpecCard",
      "vModelCard",
      "sortSpecCard"
    ]),
    vModel(key, index, value) {
      this.vModelCard({ key, index, value });
    },
    sortCard(action, index) {
      this.sortSpecCard({ action, index });
    }
  }
};
</script>

<style scoped lang="less">
</style>
