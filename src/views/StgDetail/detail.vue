<style scoped lang="less">
  .no-stgs {
    font-size: 36px;
    text-align: center;
    padding-top: 150px;
    color: gray;
  }
  .button-wrapper {
    position: fixed;
    bottom: 10px;
    left: 20px;
  }
  .stgs-list {
    width: 990px;
    padding-bottom: 80px;
    padding-top: 20px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    .stg-card {
      position: relative;
      width: 310px;
      margin: 10px;
      padding: 30px;
      text-align: left;
      font-size: 14px;
      line-height: 2;
      &:nth-child(3n) {
        margin-right: 0;
      }
      .stg-line-left {
        width: 120px;
        display: inline-block;
      }
      .stg-options {
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        opacity: 0;
        height: 0;
        overflow: hidden;
        transition: opacity .8s;
        flex-direction: column;
        .button {
          width: 120px;
          margin: 5px 0 0 5px;
        }
      }
      &:hover {
        .stg-options {
          opacity: 1;
          height: auto;
        }
      }
    }
  }
</style>
<template>
  <div class="stgs">
    <div v-if="loading" class="global-loading"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
const loginRouterMap = ['signin', 'signup', 'reset'];
// const
@Component({})
export default class Stgs extends Vue {
  @Action('getStgReports') getStgReports!: any;

  // @Getter('reports') stgs!: [];

  private dialogVisible: boolean = false;
  private stgid: string = '';
  private loading: boolean = true;
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
    console.log(this.$route.params);
    const { reportid } = this.$route.params;
    // loading
    this.loading = true;
    await this.getStgReports({
      reportid,
    });
    this.loading = false;
    // loaded
  }
}
</script>
