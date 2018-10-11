<style scoped lang="less">
  .content-wrapper {

  }
</style>
<template>
  <div class="stgs">
    <div v-if="loading" class="global-loading"></div>
    <StrategyDetailReport v-if="pageType === 0" :reports="reports" />
    <SPreDeployLinkTrader v-if="pageType === 1" :reports="reports" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import StrategyDetailReport from './_components/StrategyDetailReport.vue';
import SPreDeployLinkTrader from './_components/SPreDeployLinkTrader.vue';


// const
@Component({
  components: {
    StrategyDetailReport,
    SPreDeployLinkTrader,
  },
})

export default class Stgs extends Vue {
  @Action('getStgReports') getStgReports!: any;

  @Getter('reports') reports!: any;

  private dialogVisible: boolean = false;
  private stgid: string = '';
  private loading: boolean = true;
  private pageType: number = -1;
  private stgStatus = {
    test: '测试',
    active: '挂机中',
    stop: '未挂机',
  };

  // async onCreateStgs() {
  //   await this.createStgs();
  //   this.getStgs();
  // }

  // async onSimulationStgs(stgid: string) {
  //   await this.simulationStgs({ stgid });
  //   this.getStgs();
  // }

  // 删除二次确认弹窗
  showDeleteDialog(stgid: string) {
    console.log(stgid);
    this.dialogVisible = true;
    this.stgid = stgid;
  }
  // // 删除
  // async onDeleteStgs() {
  //   this.dialogVisible = false;
  //   await this.deleteStgs({
  //     stgid: this.stgid,
  //   });
  //   this.getStgs();
  // }

  async created() {
    const { reportid } = this.$route.params;
    // loading
    this.loading = true;
    await this.getStgReports({
      reportid,
    });
    const { real } = this.reports.report;
    this.pageType = real ? 1 : 0;
    this.loading = false;
    // loaded
  }
}
</script>
