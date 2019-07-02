/** 护记滚到最底部 */
import $ from "jquery";
export function sheetScrollBotton(time = 300) {
  $(this.$refs.scrollCon).animate(
    {
      scrollTop:
        this.$refs.scrollCon.scrollHeight -
        this.$refs.scrollCon.offsetHeight -
        ($(".contant").height() - 560)
    },
    time
  );
}
