<template>
  <div>
    <li
      class="list-group-item list-group-item-action"
      style="display:flex;align-items:center;cursor:pointer;"
      @click.stop="$emit('change', index)"
      :class="{'active sum-active': active}"
    >
      {{item.name}}
      <el-dropdown style="margin-left:auto;">
        <span class="btn btn-light border">
          {{item.num}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.stop.native="$emit('open', {item, index})">修改</el-dropdown-item>
          <el-dropdown-item @click.stop.native="$emit('del', index)">删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </li>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    index: Number,
    active: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="less">
.sum-active {
  color: #67c23a !important;
  background-color: #f0f9eb !important;
  border-color: #c2e7b0 !important;
}
</style>
