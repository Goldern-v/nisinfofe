import { variables } from "./variables";
import { thead } from "./thead";
import { tbody } from "./tbody";
import { dataModel } from "./dataModel";
class LayoutModel {
  constructor() {
    this.init();
    window.addEventListener("resize", () => {
      this.init();
    });
  }
  windowWidth = null;
  windowHeight = null;
  wrapperStyle = null;
  thead = null;
  tbody = null;

  init() {
    variables.init();
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.wrapperStyle = {
      width: this.windowWidth - 200 - 30 + "px",
      minHeight: this.windowHeight - 125 + "px"
    };
    this.updateThead();
    this.updateTbody();
  }

  /** 更新头部 */
  updateThead(startData = dataModel.startDate) {
    this.thead = thead(startData);
  }
  /** 更新body */
  updateTbody(
    areaDict = dataModel.areaDict,
    equiDict = dataModel.equiDict,
    startData = dataModel.startDate
  ) {
    this.tbody = tbody(areaDict, equiDict, startData);
  }
}

export const layoutModel = new LayoutModel();
