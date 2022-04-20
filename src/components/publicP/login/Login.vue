<template>
     <div class="Login">
      <el-form
      ref="loginForm"
      :model="loginForm"
      status-icon
      :rules="rules"
      label-width="100px"
      label-position="left"
      >
      <el-form-item
        label="账号"
        prop="username"
      >
        <el-input v-model="loginForm.username" />
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          v-model="loginForm.password"
          :maxlength="20"
          show-password
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="验证码"
        prop="verifyCode"
      >
        <el-row
          type="flex"
          justify="space-between"
          :gutter="16"
        >
          <el-col>
            <el-input
              v-model="loginForm.verifyCode"
              :maxlength="4"
              @keyup.enter.native="submitForm('loginForm')"
            >
              <template slot="append">
                <img
                  style="width:90px"
                  :src="imageBase64"
                  @click.stop="getCode"
                >
              </template>
            </el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <!-- <el-button
          @click="resetPassword"
        >
          {{ $t('resetPassword') }}
        </el-button> -->
        <el-button
          type="primary"
          @click="submitForm('loginForm')"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    name: 'Login',
    components: { },
    data() {
         const checkName = (rule, value, callback) => {
           if (!value) {
           return callback(new Error('请输入密码用户名'));
        }
        callback();
        };
         // 密码验证
        const validatePass = (rule, value, callback) => {
           if (value === '') {
        callback(new Error('请输入密码'));
        }
        callback();
        };
        const checkCode = (rule, value, callback) => {
           if (value === '') {
           callback(new Error('请输入验证码'));
        // } else if (value.length < 4) {
        // callback(new Error('验证码应为4位'));
        // 
        } 
        else {
        callback();
       }
      };
        return {
            imageBase64:null,
            // 登录数据
            loginForm: {
            username: '',
            password: '',
            verifyCode: '',
            },
            // 验证码id
             valid: '',
            // 验证规则
             rules: {
             username: [
             { validator: checkName, trigger: 'blur' },
             ],
              password: [
             { validator: validatePass, trigger: 'blur' },
              ],
             verifyCode: [
             { validator: checkCode, trigger: 'blur' },
             ],
            },
        };
    },
    computed:{
        //  ...mapGetters(['serverAddress',]),
    },
    mounted() {
        this.getCode()
    },
    methods: {
    // 获取验证码
    getCode() {
      this.$api.user.verificationCode(new Date())
        .then((res) => {
          this.imageBase64 = res.request.responseURL;
          //this.vid = data.vid;
        });
    },
    // 表单提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //console.log('su');
          this.loginAjax();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 重置数据
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // qq登录
    // loginQQ() {
    //   window.location = QQ_LINK;
    // },
    // 登录
    async loginAjax() {
      const reqBody = {  
          username: this.loginForm.username.trim(),
          password: this.loginForm.password, 
          validateCode: this.loginForm.verifyCode,   
          rememberMe: false, 
      };
      const res = await this.$api.user.login(reqBody);
      if (res.data.code !== 0) {
        this.$message.closeAll();
        this.$message.info(res.data.msg);
        //this.loading = false;
        this.getCode();
        return;
      }
      //localStorage.setItem('',res.data)
      localStorage.setItem('user',JSON.stringify(res.data.data));
      this.$store.commit('setUser', res.data.data);
      this.$store.dispatch('LoginBoolean',false);
      // console.log("1");
      this.$message.success(res.data.msg);
     },
    },
};
</script>

<style lang="scss" scoped>
// .el-button--primary {
//     color: #EB5757;
//     background-color: #000000;
//     border-color: #000000;
// }
</style>