<template>
  <div class="page-change">
    <el-card>
      <h1>修改密码</h1>
      <el-form :model="passwordForm" :rules="rules" ref="passwordForm" label-width="100px">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input placeholder="请输入原密码" v-model.trim="passwordForm.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input placeholder="请输入新密码" type="password" v-model.trim="passwordForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            placeholder="请再次输入新密码"
            type="password"
            v-model.trim="passwordForm.confirmPassword"
          ></el-input>
        </el-form-item>
        <el-form-item class="change-button">
          <el-button type="primary" @click="submitForm('passwordForm')">确认</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    // 确认密码校验
    var validatePass = (rule, value, callback) => {
      if (this.passwordForm.newPassword !== value) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        console.log("一致");
        callback();
      }
    };
    return {
      passwordForm: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
      rules: {
        oldPassword: [
          { required: true, message: "请输入原密码", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, message: "请再次输入新密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var userId = sessionStorage.getItem("userId");
          var data = {
            uid: Number(userId),
            oldPassword: this.passwordForm.oldPassword,
            password: this.passwordForm.newPassword
          };
          // data = JSON.stringify(data);
          this.$axios({
            method: "post",
            url: this.$store.state.domain + "/manage/user/updatePassword",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            params: data
          }).then(
            response => {
              console.log("response", response);
              if (response.data.code == 0) {
                this.$message({
                  message: response.data.detail.result,
                  type: "success"
                });
              }
            },
            error => {}
          );
          //成功
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .el-form-item__content{
  margin-left: 0px;
}
.page-change {
  width: 400px;
  text-align: center;
  margin: 80px auto;
  h1 {
    margin-bottom: 30px;
    color:#666;
  }
  .change-button {
    position: relative;
    right: -80px;
    button {
      width: 80px;
    }
  }
}
</style>

