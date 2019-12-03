export const variables = new (class {
  /** 设备数量数量 */
  ROW_LENGTH = 17;
  /** 周天 */
  WEEK_DAYS = ["周一", "周二", "周三", "周四", "周五", "周六", '周日'];
  /** 班次 */
  APN = ["上午", "下午", "晚上"];

  /** 表头第一行 */
  THEAD_ROW_0_HEIGHT = "39px";
  THEAD_ROW_0_FONT_SIZE = "15px";
  /** 表头第二行 */
  THEAD_ROW_1_HEIGHT = "32px";
  THEAD_ROW_1_FONT_SIZE = "12px";

  /** 分区宽度 */
  FQ_WIDTH = "45px";
  /** 机号宽度 */
  JH_WIDTH = "45px";
  /** 单元格宽度 */
  CELL_WIDTH = "50px";
  /** 单元格高度 */
  CELL_HEIGHT = "36px";

  init() {
    this.CELL_WIDTH = Math.max((window.innerWidth - 390) / 18, 40) + "px";
    this.CELL_HEIGHT =
      Math.max((window.innerHeight - 230) / this.ROW_LENGTH, 28) + "px";
  }
})();
