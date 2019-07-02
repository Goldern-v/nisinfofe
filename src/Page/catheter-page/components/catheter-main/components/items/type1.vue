<script>
export default {
  props: {
    data: {
      type: Object,
      defalut: {}
    }
  },
  functional: true,
  render(createElement, context) {
    let data = context.props.data;
    return (
      <div class="containter">
        <div class="content">
          <span class="grey">外露长度：</span>
          <span class="value-con">{data.outLength}</span>
          <span class="grey">是否通畅：</span>
          <span class="value-con">{data.catheterUnobstructe}</span>
          <span class="grey">引流高度：</span>
          <span class="value-con" style="flex: 1">
            {data.fluidHeight}
          </span>
        </div>
        <div class="content">
          <span class="grey">周围敷料：</span>
          <span class="value-con">{data.dressingPeripheral}</span>
          <span class="grey">固定情况：</span>
          <span class="value-con">{data.dressingFixed}</span>
          <span class="grey">流液性状：</span>
          <span class="value-con">{data.fluidCharacter}</span>
          <span class="grey">流液颜色：</span>
          <span class="value-con" style="color: red">
            {data.fluidColor}
          </span>
        </div>
      </div>
    );
  }
};
</script>

<style lang='scss' src="./index.scss" scoped></style>
<style lang='scss' scoped>
.value-con {
  width: 55px;
  margin-right: 7px;
  color: #333;
  display: inline-block;
}
</style>