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
    return (
      <div class="content">
        <span class="grey">引流量：</span>
        <span>{context.props.data.fluidSize} ml</span>
      </div>
    );
  }
};
</script>

<style lang='scss' src="./index.scss" scoped>
</style>