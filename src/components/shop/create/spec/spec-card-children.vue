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
        :value="item.name"
        style="width:80px;font-size:15px;text-align:center;"
        class="border-0"
        @input="changeInput"
      />
      <span
        class="btn btn-light p-0"
        style="right:-10px;top:-10px;position:absolute;line-height:1;"
        @click="delSpecCardValue({cardIndex, specIndex})"
      >
        <i class="el-icon-circle-close"></i>
      </span>
    </div>
  </div>
</template>
 
<script>
import { mapMutations } from "vuex";
export default {
  name: "spec-card-children",
  props: {
    type: Number,
    item: Object,
    cardIndex: Number,
    specIndex: Number
  },
  data() {
    return {
      
    };
  },
  methods: {
    ...mapMutations(["delSpecCardValue", "updateSpecCardValue"]),
    changeInput (e) {
      this.vModel('name', e.target.value)
    },
    vModel (key, value)　{
      this.updateSpecCardValue({
        cardIndex : this.cardIndex,
        specIndex : this.specIndex,
        key,
        value
      })
    },
    
  }
};
</script>
 
<style scoped lang = "less">
.spec-card-children {
  cursor: pointer;
}
</style>