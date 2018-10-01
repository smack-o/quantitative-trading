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
    <div class="no-stgs" v-if="stgs.length === 0">暂无策略，请新建策略</div>
    <div v-else class="stgs-list">
      <el-card v-for="(stg, index) in stgs" :key="index" :body-style="{ padding: '0px' }" class="stg-card">
        <p>从 {{stg.start_dtime}} 到 {{stg.end_dtime}}</p>
        <p><span class="stg-line-left">区间内基础涨幅</span> {{stg.base_increase}}</p>
        <p><span class="stg-line-left">策略盈利幅度</span>  {{stg.profit}}</p>
        <p><span class="stg-line-left">最大回撤</span>  {{stg.drawdown}}</p>
        <p><span class="stg-line-left">买入次数</span>  {{stg.buy_time}}</p>
        <p><span class="stg-line-left">卖出次数</span>  {{stg.sell_time}}</p>
        <p><span class="stg-line-left">胜率</span>  {{stg.win_rate}}</p>
        <p><span class="stg-line-left">状态</span>  {{stgStatus[stg.status]}}</p>
        <div class="bottom clearfix">
          <el-button type="text" class="button">查看详情</el-button>
        </div>
        <div class="stg-options">
          <el-button class="button" type="primary" @click="onSimulationStgs(stg.stgid)">部署挂机</el-button>
          <el-button class="button" type="primary" @click="onCreateStgs">复制策略</el-button>
          <el-button class="button" type="primary" @click="showDeleteDialog(stg.stgid)">删除策略</el-button>
        </div>
      </el-card>
    </div>
    <div class="button-wrapper">
      <el-button type="primary" @click="onCreateStgs">新建策略</el-button>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>您确定要删除此策略？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onDeleteStgs">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
const loginRouterMap = ['signin', 'signup', 'reset'];
// const
@Component({})
export default class Stgs extends Vue {
  @Action('getStgs') getStgs!: any;
  @Action('createStgs') createStgs!: any;
  @Action('signup') signup!: any;
  @Action('deleteStgs') deleteStgs!: any;
  @Action('simulationStgs') simulationStgs!: any;

  @Getter('stgs') stgs!: [];

  private dialogVisible: boolean = false;
  private stgid: string = '';
  private loading: boolean = true;
  private stgStatus = {
    test: '测试',
    active: '挂机中',
    stop: '未挂机',
  };

  async onCreateStgs() {
    await this.createStgs();
    this.getStgs();
  }

  async onSimulationStgs(stgid: string) {
    await this.simulationStgs({ stgid });
    this.getStgs();
  }

  // 删除二次确认弹窗
  showDeleteDialog(stgid: string) {
    console.log(stgid);
    this.dialogVisible = true;
    this.stgid = stgid;
  }
  // 删除
  async onDeleteStgs() {
    this.dialogVisible = false;
    await this.deleteStgs({
      stgid: this.stgid,
    });
    this.getStgs();
  }

  async created() {
    // loading
    this.loading = true;
    await this.getStgs();
    this.loading = false;
    // loaded
  }
}
</script>
