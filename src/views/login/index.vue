<template>
  <div>
    <div class="login">
      <el-row :gutter="0" type="flex" justify="center" align="middle" style="margin-top:230px;">
        <el-col :xs="7" :sm="8" :md="7" :lg="7" :xl="5">
          <div class="grid-content bg-purple">
            <!-- 卡片 -->
            <el-card class="box-card" style="text-align:center;">
              <div slot="header" class="clearfix" style="text-align:center;">
                <span style="font-weight:bold;font-size: 20px;" class="text-secondary">UNI-ADMIN</span>
              </div>
              <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
                <el-form-item prop="username">
                  <el-input v-model="ruleForm.username" size="medium" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input v-model="ruleForm.password" placeholder="请输入用密码" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style="width:100%" size="medium" @click="submit">立即登录</el-button>
                </el-form-item>
              </el-form>
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
      ruleForm: {
        username: "",
        password: "",
	  },
	  //表单验证规则
	  rules: {
		  username: [
			  //  必填           错误显示信息            失焦的时候触发
			  {required: true, message: '请输入用户名', trigger: 'blur'}
		  ],
		  password: [
			   {required: true, message: '请输入密码', trigger: 'blur'}
		  ]
	  }
    };
  },
  created() {},
  mounted() {},
  methods: {
	  submit () {
		//表单验证 
		//只有里面所有都验证正确，e会返回true，只要有一个错误返回false
		  this.$refs.ruleForm.validate((e) => {
			  //如果是false，直接终止
			 if (!e) return;
			 //否则，提交表单
			 this.$router.push({name: 'index'});  //跳转到name为index的页面
		  })
	  }
  },
};
</script>

<style scoped lang="less">
// .login {
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   overflow: hidden;
//   background-color: #2d3a4b;
// }
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
