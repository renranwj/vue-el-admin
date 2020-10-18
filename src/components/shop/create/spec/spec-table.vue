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
            v-for="(th, thi) in specLable"
            :key="thi"
          >{{th.name}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="index" class="text-center">
          <th scope="row" v-for="(specM, specI) in item.spec" :key="specI">{{specM.name}}</th>
          <td width="110">
            <span class="btn btn-light mr-2 border" v-if="!item.image" @click="chooseImage(item)">
              <i class="el-icon-plus"></i>
            </span>
            <img
              :src="item.image"
              class="rounded"
              @click="chooseImage(item)"
              v-else
              style="width:50px;height:50px;cursor:pointer;"
            />
          </td>
          <td width="110">
            <input type="number" v-model="item.oprice" class="form-control text-center" />
          </td>
          <td width="110">
            <input type="number" class="form-control text-center" v-model="item.pprice" />
          </td>
          <td width="110">
            <input type="number" class="form-control text-center" v-model="item.cprice" />
          </td>
          <td width="110">
            <input type="number" class="form-control text-center" v-model="item.weight" />
          </td>
          <td width="110">
            <input type="number" class="form-control text-center" v-model="item.volume" />
          </td>
          <td width="110">
            <input type="number" class="form-control text-center" v-model="item.stock" />
          </td>
          <td width="110">
            <input type="text" class="form-control text-center" v-model="item.code" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  inject: ["app"],
  data() {
    return {
      list: []
    };
  },
  created() {
    console.log(this.tableData)
  },
  computed: {
    ...mapGetters(["tableThs", "tableData", "specLable"]),
    ...mapState({
      spec_card: state => state.goods_create.spec_card
    })
  },
  watch: {
    tableData(newValue, oldValue) {
      this.list = newValue;
    }
  },
  mounted() {
    // console.log(this.tableData);
    this.list = this.tableData;
  },
  methods: {
    chooseImage(item) {
      this.app.chooseImage(res => {
          item.image = res[0].url
      }, 1);
    }
  }
};
</script>

<style scoped lang="less">
</style>
