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
    策略详情帮助
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Stgs extends Vue {
}
</script>
