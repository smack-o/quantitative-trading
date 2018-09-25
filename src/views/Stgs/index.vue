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
  <div class="stgs-wrapper">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="0"><router-link to="/stgs">我的策略</router-link> </el-menu-item>
      <el-menu-item index="1"><router-link to="/stgs/setting">个人设置</router-link> </el-menu-item>
      <el-menu-item index="2"><router-link to="/stgs/help">帮助</router-link> </el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class'
const routerMap = ['stgsList', 'stgsSetting', 'stgsHelp'];
@Component({
})
export default class Stgs extends Vue {
  @Action('signin') public signin!: any
  @Action('signup') public signup!: any

  data() {
    const validateMail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'));
      }
      if (!/^[a-zA-Z0-9_\.]+@([a-zA-Z-]+\.?)+$/.test(value)) {
        return callback(new Error('请输入正确格式邮箱'));
      }
      callback();
    }
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'));
      }
      callback();
    }
    console.log(routerMap.indexOf(this.$route.name))

    return {
      type: 'signin',
      defaultActive: '1',
      activeIndex: routerMap.indexOf(this.$route.name).toString(),
      rules: {
        username: [
          { validator: validateMail, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
      },
      form: {
        username: '',
        password: '',
      }
    }
  }

  submit() {
    console.log(this.form)
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
    this.activeIndex = routerMap.indexOf(location.name).toString();
  }

  created() {
  }
}
</script>
