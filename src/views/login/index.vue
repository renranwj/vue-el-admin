<template>
  <div>
    <div class="login">
      <el-row :gutter="0" type="flex" justify="center" align="middle" style="margin-top:230px;">
        <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="6">
          <div class="grid-content bg-purple">
            <!-- 卡片 -->
            <el-card class="box-card" style="text-align:center;">
              <div slot="header" class="clearfix" style="text-align:center;">
                <span style="font-weight:bolder;">UNI-ADMIN</span>
              </div>
              <el-input placeholder="请输入用户名" v-model="username" clearable></el-input>
              <el-input
                placeholder="请输入密码"
                v-model="password"
                show-password
                style="margin-top:30px;"
              >
			  </el-input>
			  <el-button type="primary" style="margin:20px 0;padding:9px 18px;">立即登录</el-button>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">

.login {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	background-color: #2d3a4b;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
