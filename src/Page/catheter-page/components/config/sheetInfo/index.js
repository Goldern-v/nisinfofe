export function relObjFactory() {
  return {
    nglx: '',
    ngcz: '',
    ngcz_other: '',
    ngxh: '',
    zrsn: '',
    zgz: '',
    zgzdate: '',
    dgsfwz: '',
    dgsfwzno: '',
    dgsfwzother: '',
    bgsj: '',
    pggn: '',
    bgz: ''
  }
}
export default {
  sheetType: '',
  isSave: true,
  sheetStartPage: 1,
  sheetMaxPage: 1,
  startPage: 0,
  endPage: 0,
  downControl: false,
  selectRow: [],
  selectBlock: {},
  copyRow: '',
  relObj: relObjFactory(),
  relObjs: [
    {
      pageNo: "1",
      relObj: {
        nglx: '',
        ngcz: '',
        ngcz_other: '',
        ngxh: '',
        zrsn: '',
        zgz: '',
        zgzdate: '',
        dgsfwz: '',
        dgsfwzno: '',
        dgsfwzother: '',
        bgsj: '',
        pggn: '',
        bgz: ''
      }
    }
  ]
}