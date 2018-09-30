<style scoped lang="less">
  .stgs-wrapper {
    width: 100%;
    height: 100%;
  }
  .stgs-content {
    height: calc(100% - 61px);
    width: 100%;
    position: relative;
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
      @select="handleSelect"
      active-text-color="#ffd04b">
      <el-menu-item index="0">我的策略</el-menu-item>
      <el-menu-item index="1">个人设置</el-menu-item>
      <el-menu-item index="2">帮助</el-menu-item>
    </el-menu>
    <div class="stgs-content">
      <router-view />
    </div>
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
    console.log('this.$route.name', this.$route.name)
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

  handleSelect(key, keyPath) {
    this.activeIndex = key;
    this.$router.push({
      name: routerMap[key]
    });
  }

  @Watch('$route')
  onRouterChanged(location: object) {
    console.log(location.name)
    this.activeIndex = routerMap.indexOf(location.name).toString();
  }

  created() {
  }
}
</script>
