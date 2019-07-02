export const model = new (class Diagnosis {
  selectedRow = null;
  refreshTable = null;
  refreshBlock = null;
  /** 诊断计划单列表 */
  blockList = [];
  selectedBlockId = null;
  selectedBlock = {};

  /** modal */
  newDiagnosisModal = null;
})();
