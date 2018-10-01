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
import { Getter, Action } from 'vuex-class';
const routerMap = ['stgsList', 'stgsSetting', 'stgsHelp'];
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
    this.activeIndex = routerMap.indexOf(name).toString();
  }
}
</script>
