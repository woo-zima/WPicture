<template>
    <div class="LoginIndex">
    <el-dialog
      v-if="$store.getters.loginBoolean"
      :close-on-click-modal="false"
      :visible="$store.getters.loginBoolean"
      width="600px"
      :title="`${loginOrSign?'登录':'注册'}`"
      center
      @close="$store.dispatch('LoginBoolean',false)"
    >
      <loginF v-show="loginOrSign" />
      <registerF v-show="!loginOrSign" /> 
    </el-dialog>
    </div>
</template>

<script>
import LoginF from './Login.vue'
import RegisterF from './Register.vue'

export default {
    name: 'LoginIndex',
    components: {
        LoginF,
        RegisterF
     },
    computed:{
    loginOrSign() {
      return this.$store.state.loginOrSign;
     },
    },
};
</script>

<style lang="scss" scoped>

</style>