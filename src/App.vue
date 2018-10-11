<template>
  <div id="app">
    <router-view />
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';

@Component
export default class Stgs extends Vue {
  @Getter('loading') loading!: boolean;
  @Watch('loading')
  onLoadingChanged(loading: boolean) {
    // 加载进度条
    this.$Progress[loading ? 'start' : 'finish']();
  }
  created() {
    // 加载进度条
    this.$Progress.start();
  }
}
</script>

<style lang="less">
@import './assets/global.less';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
