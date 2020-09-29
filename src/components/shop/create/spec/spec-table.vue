<template>
  <div>
    <table class="table table-sm table-bordered">
      <thead>
        <tr>
          <th
            scope="col"
            class="text-center"
            style="vertical-align:middle;"
            :rowspan="th.rowspan"
            :colspan="th.colspan"
            v-for="(th, thi) in tableThs"
            :key="thi"
          >{{th.name}}</th>
        </tr>
        <tr>
          <th
            scope="col"
            class="text-center"
            style="vertical-align:middle;"
            rowspan="1"
            colspan="1"
            v-for="(th, thi) in spec_card"
            :key="thi"
          >{{th.name}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableData" :key="index">
          <th scope="row" v-for="(spec, specI) in item.spec" :key="specI">{{spec.name}}</th>
          <td>{{item.image}}</td>
          <td>{{item.oprice}}</td>
          <td>{{item.pprice}}</td>
          <td>{{item.cprice}}</td>
          <td>{{item.weight}}</td>
          <td>{{item.volume}}</td>
          <td>{{item.stock}}</td>
          <td>{{item.code}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  created() {
    // console.log(this.tableData, this.tableData)
  },
  computed: {
    ...mapGetters(["tableThs", "tableData"]),
    ...mapState({
      spec_card: state => state.goods_create.spec_card
    })
  },
  mounted() {
    console.log(this.tableData);
  }
};
</script>

<style scoped lang="less">
</style>
