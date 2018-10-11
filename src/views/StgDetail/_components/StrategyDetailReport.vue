<template>
  <div class="report-wrapper">
    <!-- 111111 -->
    <div class="qa">
      <h1>测试环境</h1>
      <p>BTC/USDT</p>
      <h2>日线分析</h2>
      <!-- <p>{{reports.report.start_dtime}}</p> -->
      <!-- <p>{{reports.report.end_dtime}}</p> -->
    </div>
    <div class="stg-info"></div>
    <div class="trade-info"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class StrategyDetailReport extends Vue {
  @Prop() private reports!: any;
  mounted() {
    console.log(1, this.reports);
  }
}
</script>

<style scoped lang="less">
</style>
