<template>
  <div>
    <div class="card" style="line-height:20px;margin-bottom:10px;">
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
          <spec-card-children
            :type="item.type"
            v-for="(listItem, index2) in list"
            :key="index2"
            :item="listItem"
            :cardIndex="index"
            :specIndex="index2"
            v-dragging="{ item: listItem, list: list, group: `specItem${index}`}"
          ></spec-card-children>
        </div>
        <!-- 增加规格值 -->
        <div>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="addSpecCardValue(index)"
          >增加规格值</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import specCardChildren from "./spec-card-children";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      list: this.item.list
    };
  },
  components: {
    specCardChildren
  },
  props: {
    index: Number,
    item: Object,
    spec_card: Array
  },
  mounted() {
    // 监听拖拽过程
    //   this.$dragging.$on('dragged', ({ value }) => {
    //   console.log(value.item)
    //   console.log(value.list)
    //   console.log(value.otherData)
    // })
    //监听拖拽的结束
    this.$dragging.$on("dragend", e => {
      // console.log("结束", e);
      if (e.group === `specItem${index}`) {
        this.sortSpecValue({
          index: this.index,
          value: this.list
        });
      }
    });
  },
  methods: {
    ...mapMutations([
      "addSpecCardValue",
      "deleSpecCard",
      "vModelCard",
      "sortSpecCard",
      "sortSpecValue"
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
