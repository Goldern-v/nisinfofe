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
      <div class="content">
        <span>{data.startDate}</span>
        <span class="grey" style="padding: 0 10px">
          至
        </span>
        <span style="margin-right: 40px">{data.recordDate}</span>
        <span class="grey">总引流量：</span>
        <span>{data.fluidSize || 0} ml</span>
      </div>
    );
  }
};
</script>

<style lang='scss' src="./index.scss" scoped>
</style>