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
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="login-form">
      <el-form-item label="邮箱" prop="username">
        <el-input placeholder="请输入邮箱" type="mail" v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit()">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
const loginRouterMap = ['signin', 'signup', 'reset'];
@Component({
})
export default class Login extends Vue {
  @Action('signin') signin!: any;
  @Action('signup') signup!: any;
  private form: { username: string, password: string } = {
    username: '',
    password: '',
  };

  private type: string = 'signin';
  private activeIndex: string = '-1';

  private rules: any = {
    username: [
      { validator: (rule: any, value: string, callback: (error?: Error) => void) => {
          if (!value) {
            return callback(new Error('邮箱不能为空'));
          }
          if (!/^[a-zA-Z0-9_\.]+@([a-zA-Z-]+\.?)+$/.test(value)) {
            return callback(new Error('请输入正确格式邮箱'));
          }
          callback();
        },
        trigger: 'blur',
      },
    ],
    password: [
      { validator: (rule: any, value: string, callback: (error?: Error) => void) => {
          if (!value) {
            return callback(new Error('密码不能为空'));
          }
          callback();
        },
        trigger: 'blur',
      },
    ],
  };

  submit() {
    console.log(this.form);
    const el: any = this.$refs.form;
    el.validate((valid: boolean) => {
      if (valid) {
        const { username, password } = this.form;
        switch (this.activeIndex) {
          case '0':
            // 登录
            this.signin({
              mail: username,
              password,
            }).then(() => {
              window.location.href = '/';
            });
            break;
          case '1':
            // 注册
            this.signup({
              mail: username,
              password,
            }).then(() => {
              window.location.href = '/';
            });
            break;
          case '2':
            // 重置密码
            this.signup({
              mail: username,
              password,
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
  onRouterChanged(location: any) {
    this.activeIndex = loginRouterMap.indexOf(location.name).toString();
  }

  created() {
    const name: any = this.$route.name;
    this.activeIndex = loginRouterMap.indexOf(name).toString();
  }
}
</script>
