import $ from 'jquery'
import {
    radioToCheckbox,
    selectToInput,
    setFormPage,
    setPage,
    addCSS,
    printDir
} from './common-print.js'

let resetCheckbox = `input[type="checkbox"]{
    -webkit-appearance: none;
    vertical-align:middle;
    width: 14px;
    height: 14px;
    border: 1px solid #777;
    border-radius: 2px;
}
input[type="checkbox"]:checked {
    font-size:10;
    position:relative;
}
input[type="checkbox"]:checked:before{
    content: '';
    width: 8px;
    transform: rotate(45deg);
    position: absolute;
    top: 7px;
    left: -2px;
    border-top: 3px solid #000;
}
input[type="checkbox"]:checked:after{
    content: '';
    width: 14px;
    transform: rotate(-50deg) translateY(-50%) translateX(50%);
    position: absolute;
    border-top: 3px solid #000;
    top: 10px;
    left: -2px;
}`

let resetInput = `input[type="text"]{
    border:0;
    text-align:center;
    border-bottom:1px solid #777;
}
.Wdate {
    background:none;
}`

let inputNoBorder = `input[type="text"]{ 
    border:0; 
    text-align:center;
}
.Wdate {
    background:none;
}`

let inputNoCenter = `input[type="text"]{ 
    border:0;
}
.Wdate {
    background:none;
}`

let pageFormStyle = `#smartform {display:none}
.pageContent .page {
    text-align:center;
    width: 100%;
}
.pageContent:nth-of-type(1){
    padding-top: 15px;
}
.pageContent table {
    border-collapse:collapse;  
    border-spacing:0;
}
@media print{ 
    .pageContent { 
        height: 100%; 
        position:relative;
        box-sizing:border-box;
    }
    .pageContent .page{
        position:absolute;
        bottom: 0;
        left: 0;
    }
}`

let pageStyle = `
.pageContent .page {
    text-align:center;
    width: 100%;
}
@media print{ 
    .pageContent:last-child {
        margin: 0 auto;
    }
    .pageContent { 
        height: 100vh; 
        position:relative;
    }
    .pageContent .page{
        position:absolute;
        bottom: 0;
        left: 0;
    }
}`

export default function fixPrint(wid) {
    if (!wid.$) wid.$ = $
    let title = wid.document.title;
    if (title.indexOf('入院评估表') > -1) {
        setFormPage(wid, '4');
        addCSS(wid, `td {padding: 3px 5px!important;}` + resetCheckbox + resetInput + pageFormStyle);
        selectToInput(wid);
    } else if (title == 'Procidano和Heller家庭支持量表' || title == 'Zung焦虑自评量表（SAS）' || title == 'Zung抑郁自评量表（SDS）') {
        addCSS(wid, resetCheckbox + inputNoCenter);
    } else if (title == '疼痛评估表' || title == '格拉斯哥（GCS）评估表' || title == '压疮（伤口）评估表' || title == 'Morse跌倒风险评估量表') {
        addCSS(wid, pageStyle + resetCheckbox + resetInput);
        setPage(wid);
    } else if (title == '尿垫试验') {
        addCSS(wid, resetInput + `td {height: 29px!important;padding: 4px 5px!important;}`);
    } else if (title == 'Barthel指数评定量表') {
        addCSS(wid, `.pageTitle{padding: 12px 0 0;}.pageInfo{margin: 6px 0;}
        .list tr td{padding: 1px 2px!important;font-size:13px!important;}
        .printDescTr{font-size:13px;margin-top: 5px;}
        .pageContent .list tr td {padding: 0.5px 2px !important;}
        .page{font-size:13px;}` + pageStyle + resetCheckbox + resetInput);
        setPage(wid);
    } else if (title == '成人Braden压疮风险评估表') {
        addCSS(wid, `.list tr td{padding: 4px 2px!important;}` + pageStyle + resetCheckbox + resetInput);
        setPage(wid);
    } else if (title == '营养风险筛查2002') {
        addCSS(wid, resetCheckbox + inputNoBorder);
    } else if (title == '简易智力状态检查（MMSE）') {
        addCSS(wid, resetCheckbox + inputNoBorder + `td {padding: 2px 5px!important;height: 27px!important;}`);
    } else if (title == 'Smilkstein家庭功能评定量表') {
        addCSS(wid, resetCheckbox + resetInput + `.pNoBorder {border:0!important;text-align:left!important;}`);
    }

    radioToCheckbox(wid);

    if (title == 'Morse跌倒风险评估量表' || title == '成人Braden压疮风险评估表' || title == '压疮（伤口）评估表') {
        addCSS(wid, `
          .printShow{
            display: table-row !important
           }
        `)
    }

    printDir('v', wid)
}
