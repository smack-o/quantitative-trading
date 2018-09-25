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
  <div class="stgs-help">
    help
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class'
const loginRouterMap = ['signin', 'signup', 'reset'];
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
    console.log(loginRouterMap.indexOf(this.$route.name))

    return {
      type: 'signin',
      defaultActive: '1',
      activeIndex: loginRouterMap.indexOf(this.$route.name).toString(),
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
    this.activeIndex = loginRouterMap.indexOf(location.name).toString();
  }

  created() {
  }
}
</script>
