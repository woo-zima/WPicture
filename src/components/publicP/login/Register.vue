<template>
<div class="Register">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
      label-position="left"
    >
      <el-form-item
        label="邮箱"
        prop="email"
      >
        <el-input v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item
        label="用户名"
        prop="username"
      >
        <el-input
          v-model="ruleForm.username"
          :maxlength="10"
        />
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          v-model="ruleForm.password"
          :maxlength="20"
          show-password
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="确定密码"
        prop="checkPass"
      >
        <el-input
          v-model="ruleForm.checkPass"
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
              v-model="ruleForm.verifyCode"
              :maxlength="4"
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
      <el-form-item
        label="手机号"
        prop="phone"
      >
        <el-row
          type="flex"
          justify="space-between"
          :gutter="16"
        >
          <el-col>
            <el-input
              v-model="ruleForm.phone"
              placeholder="手机号"
              :maxlength="11"
              @keyup.enter.native="submitForm('ruleForm')"
            >
            </el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click.native="submitForm('ruleForm')"
        >
          注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  username: 'Register',
  components: {},
  data() {
    // 邮箱验证函数
    const checkEmail = (rule, value, callback) => {
      const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (!value) {
        return callback(new Error('邮箱不能为空'));
      }
      if (!pattern.test(value)) {
        return callback(new Error('邮箱格式错误'));
      }
      callback();
    };
    // 用户名验证函数
    const checkName = (rule, value, callback) => {
      const patrn = /[`~!@#$%^&*()\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/im;
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }
      if (patrn.test(value)) {
        return callback(new Error('用户名不能包含特殊字符'));
      }
      if (value.length < 2) {
        return callback(new Error('用户名应为2-20位'));
      }
      callback();
    };
    // 密码验证
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }
      if (value.length < 5) {
        callback(new Error('密码应为5-20位'));
      }
      callback();
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    const checkCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入验证码'));
      } else {
        callback();
      }
    };
    const checkPhone = (rule, value, callback) => {
      const patrn = /^[1]([3-9])[0-9]{9}$/;
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else if (value.length !== 11 || !patrn.test(value)) {
        callback(new Error('请输入合法手机号'));
      } else {
        callback();
      }
    };
    return {
      word: '发送验证码',
      isOvertime: false,
      // 验证码数据
      imageBase64: null,
      // 登录加载
      loading: false,
      vid: '',
      // 表格数据
      ruleForm: {
        password: '',
        checkPass: '',
        email: '',
        username: '',
        verifyCode: '',
        phone: '',
      },
      // 验证规则
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' },
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' },
        ],
        email: [
          { validator: checkEmail, trigger: 'blur' },
        ],
        username: [
          { validator: checkName, trigger: 'blur' },
        ],
        verifyCode: [
          { validator: checkCode, trigger: 'blur' },
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getCode();
  },
  methods: {
    // 获取验证码
    getCode() {
      this.$api.user.verificationCode(new Date())
        .then((res) => {
          this.imageBase64 = res.request.responseURL;
        });
    },
    // 表单提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.register();
        } else {
          //console.log('error submit!!');
          return false;
        }
      });
    },
    // 重置数据
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 注册
    async register() {
        const reqBody = {
              loginName: this.ruleForm.username.trim(),
              email: this.ruleForm.email,
              password: this.ruleForm.password,
              phonenumber:this.ruleForm.phone,
              validateCode:this.ruleForm.verifyCode,
          };
          //console.log(reqBody);
          const res = await this.$api.user.register(reqBody);
          if (res.data.code !== 0) {
            this.$message.closeAll();
            this.$message.info(res.data.msg);
            this.getCode();
            return;
          }
          this.$store.dispatch('LoginBoolean',false);
          this.$message.success('注册成功了');
      },
   },
};
</script>

<style lang="scss" scoped>

</style>