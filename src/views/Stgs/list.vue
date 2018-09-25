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

  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class'
const loginRouterMap = ['signin', 'signup', 'reset'];
@Component({
})
export default class Stgs extends Vue {
  @Action('getStgs') public getStgs!: any
  @Action('signup') public signup!: any

  data() {

    return {
    }
  }

  submit() {
    this.$refs.form.validate((valid) => {
      if (valid) {
        const { username, password } = this.form;
        switch (this.activeIndex) {
          case '0':
            // 登录
            this.signin({
              mail: username,
              password
            }).then(() => {
              window.location.href = '/';
            });
            break;
          case '1':
            // 注册
            this.signup({
              mail: username,
              password
            }).then(() => {
              window.location.href = '/';
            });
            break;
          case '2':
            // 重置密码
            this.signup({
              mail: username,
              password
            }).then(() => {
              window.location.href = '/';
            });
            break;
          default:
        }
      } else {
        // console.log('error submit!!');
        return false;
      }
    });
  }

  @Watch('$route')
  onRouterChanged(location: object) {
    this.activeIndex = loginRouterMap.indexOf(location.name).toString();
  }

  created() {
    this.getStgs();
  }
}
</script>
