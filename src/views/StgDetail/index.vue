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
  .el-menu-demo {
    padding-left: 100px;
  }
  .save-goback {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
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
      <el-button class="save-goback" type="text">保存并退出</el-button>
      <el-menu-item index="0">策略详情</el-menu-item>
      <el-menu-item index="1">帮助</el-menu-item>
    </el-menu>
    <div class="stgs-content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
const routerMap = ['stgDetail', 'stgHelp'];
@Component
export default class Stgs extends Vue {
  private activeIndex: string = '-1';

  handleSelect(key: string, keyPath: string) {
    this.activeIndex = key;
    this.$router.push({
      name: routerMap[Number(key)],
    });
  }

  @Watch('$route')
  onRouterChanged(location: any) {
    this.activeIndex = routerMap.indexOf(location.name).toString();
  }

  created() {
    const name: any = this.$route.name;
    console.log(name);
    this.activeIndex = routerMap.indexOf(name).toString();
  }
}
</script>
