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
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>Otto</td>
          <td>Otto</td>
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
  computed: {
    ...mapGetters(["tableThs"]),
    ...mapState({
        "spec_card": state => state.goods_create.spec_card
    })
  },
  mounted() {

  }
};
</script>

<style scoped lang="less">
</style>
