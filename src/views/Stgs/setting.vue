<style scoped lang="less">
  .login-wrapper {
    height: 100%;
    width: 100%;
    position: relative;
  }
  .login-form {
    width: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
<template>
  <div class="login-wrapper">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="0"><router-link to="signin">登录</router-link> </el-menu-item>
      <el-menu-item index="1"><router-link to="signup">注册</router-link> </el-menu-item>
      <el-menu-item index="2"><router-link to="reset">找回密码</router-link> </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
@Component
export default class Stgs extends Vue {
}
</script>
