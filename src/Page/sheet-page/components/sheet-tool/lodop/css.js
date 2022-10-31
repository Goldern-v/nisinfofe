export const sheetCss = `
<style type="text/css">
/*! https://github.com/lzxb/flex.css */[flex],[flex]>*,[flex]>[flex]{overflow:hidden}[flex]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}[flex]>*{display:block}[flex]>[flex]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}[flex~="dir:left"]{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}[flex~="dir:right"]{-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-webkit-flex-direction:row-reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse;-webkit-box-pack:end}[flex~="dir:top"]{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}[flex~="dir:bottom"]{-webkit-box-orient:vertical;-webkit-box-direction:reverse;-webkit-flex-direction:column-reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse;-webkit-box-pack:end}[flex~="main:left"]{-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start}[flex~="main:right"]{-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end}[flex~="main:justify"]{-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}[flex~="main:center"]{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}[flex~="cross:top"]{-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;-ms-grid-row-align:flex-start;align-items:flex-start}[flex~="cross:bottom"]{-webkit-box-align:end;-webkit-align-items:flex-end;-ms-flex-align:end;-ms-grid-row-align:flex-end;align-items:flex-end}[flex~="cross:center"]{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;-ms-grid-row-align:center;align-items:center}[flex~="cross:baseline"]{-webkit-box-align:baseline;-webkit-align-items:baseline;-ms-flex-align:baseline;-ms-grid-row-align:baseline;align-items:baseline}[flex~="cross:stretch"]{-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;-ms-grid-row-align:stretch;align-items:stretch}[flex~="box:mean"]>*,[flex~="box:first"]>*,[flex~="box:last"]>*,[flex~="box:justify"]>*{width:0;height:auto;-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;-webkit-flex-shrink:1;-ms-flex-negative:1;flex-shrink:1}[flex~="box:first"]>:first-child,[flex~="box:last"]>:last-child,[flex~="box:justify"]>:first-child,[flex~="box:justify"]>:last-child{width:auto;-webkit-box-flex:0;-webkit-flex-grow:0;-ms-flex-positive:0;flex-grow:0;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}[flex~="dir:top"][flex~="box:mean"]>*,[flex~="dir:top"][flex~="box:first"]>*,[flex~="dir:top"][flex~="box:last"]>*,[flex~="dir:top"][flex~="box:justify"]>*,[flex~="dir:bottom"][flex~="box:mean"]>*,[flex~="dir:bottom"][flex~="box:first"]>*,[flex~="dir:bottom"][flex~="box:last"]>*,[flex~="dir:bottom"][flex~="box:justify"]>*{width:auto;height:0;-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;-webkit-flex-shrink:1;-ms-flex-negative:1;flex-shrink:1}[flex~="dir:top"][flex~="box:first"]>:first-child,[flex~="dir:top"][flex~="box:last"]>:last-child,[flex~="dir:top"][flex~="box:justify"]>:first-child,[flex~="dir:top"][flex~="box:justify"]>:last-child,[flex~="dir:bottom"][flex~="box:first"]>:first-child,[flex~="dir:bottom"][flex~="box:last"]>:last-child,[flex~="dir:bottom"][flex~="box:justify"]>:first-child [flex~="dir:bottom"][flex~="box:justify"]>:last-child{height:auto;-webkit-box-flex:0;-webkit-flex-grow:0;-ms-flex-positive:0;flex-grow:0;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}[flex-box="0"]{-webkit-box-flex:0;-webkit-flex-grow:0;-ms-flex-positive:0;flex-grow:0;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}[flex-box="1"]{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;-webkit-flex-shrink:1;-ms-flex-negative:1;flex-shrink:1}[flex-box="2"]{-webkit-box-flex:2;-webkit-flex-grow:2;-ms-flex-positive:2;flex-grow:2;-webkit-flex-shrink:2;-ms-flex-negative:2;flex-shrink:2}[flex-box="3"]{-webkit-box-flex:3;-webkit-flex-grow:3;-ms-flex-positive:3;flex-grow:3;-webkit-flex-shrink:3;-ms-flex-negative:3;flex-shrink:3}[flex-box="4"]{-webkit-box-flex:4;-webkit-flex-grow:4;-ms-flex-positive:4;flex-grow:4;-webkit-flex-shrink:4;-ms-flex-negative:4;flex-shrink:4}[flex-box="5"]{-webkit-box-flex:5;-webkit-flex-grow:5;-ms-flex-positive:5;flex-grow:5;-webkit-flex-shrink:5;-ms-flex-negative:5;flex-shrink:5}[flex-box="6"]{-webkit-box-flex:6;-webkit-flex-grow:6;-ms-flex-positive:6;flex-grow:6;-webkit-flex-shrink:6;-ms-flex-negative:6;flex-shrink:6}[flex-box="7"]{-webkit-box-flex:7;-webkit-flex-grow:7;-ms-flex-positive:7;flex-grow:7;-webkit-flex-shrink:7;-ms-flex-negative:7;flex-shrink:7}[flex-box="8"]{-webkit-box-flex:8;-webkit-flex-grow:8;-ms-flex-positive:8;flex-grow:8;-webkit-flex-shrink:8;-ms-flex-negative:8;flex-shrink:8}[flex-box="9"]{-webkit-box-flex:9;-webkit-flex-grow:9;-ms-flex-positive:9;flex-grow:9;-webkit-flex-shrink:9;-ms-flex-negative:9;flex-shrink:9}[flex-box="10"]{-webkit-box-flex:10;-webkit-flex-grow:10;-ms-flex-positive:10;flex-grow:10;-webkit-flex-shrink:10;-ms-flex-negative:10;flex-shrink:10}

[flex~="wrap:wrap"]{
  flex-wrap: wrap;
}
.sheet-page-container {
  border-radius: 2px;
  position: relative;
  background: #fff;
  -webkit-box-shadow: 0px 5px 10px 0 rgba(0,0,0,0.5);
          box-shadow: 0px 5px 10px 0 rgba(0,0,0,0.5);
  padding: 0;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  width: 1100px;
  margin: 0
  -webkit-box-sizing: content-box;
          box-sizing: content-box;
}
.sheet-page-container .header-con {
  text-align: center;
}
.sheet-page-container .header-con .his-name {
  font-size: 18px;
  padding: 0 0px;
  text-align: center;
  font-weight: bold;
  font-family: simsun, 'Times New Roman', Georgia, Serif !important;
}
.sheet-page-container .header-con .title {
  font-size: 21px;
  padding: 5px 0 5px;
  text-align: center;
  font-weight: bold;
  font-family: simsun, 'Times New Roman', Georgia, Serif !important;
}
.sheet-page-container .header-con span {
  margin-right: 4px;
  font-size: 13px;
  color: #000;
}
.sheet-page-container .header-con p {
  margin: 10px 0 10px;
  text-align: left;
}
.sheet-page-container .add-btn {
  position: absolute;
  top: 60px;
  right: 20px;
}
.sheet-page-container .his-logo {
  position: absolute;
  left: 21px;
  top: 21px;
  height: 44px;
}
.sheet-page-container .diagnosis-con {
  max-width: 340px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<style type="text/css">
.sheet-page-container .sheet-table {
  border-collapse: collapse;
  margin: 15px 0px;
  font-size: 12px;
  color: #000;
}
.sheet-page-container .sheet-table,
.sheet-page-container .sheet-table tr,
.sheet-page-container .sheet-table td,
.sheet-page-container .sheet-table th {
  border: 1px solid #444;
}
.sheet-page-container .sheet-table .head-con {
  background: #f4f2f5;
}
.sheet-page-container .sheet-table td,
.sheet-page-container .sheet-table th {
  height: 30px;
  text-align: center;
  vertical-align: middle;
  line-height: 14px;
  position: relative;
}
.sheet-page-container .sheet-table .th {
  padding: 2px;
}
.sheet-page-container .sheet-table span {
  font-size: 12px;
}
.sheet-page-container .sheet-table .body-con {
  height: 29px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
}
.sheet-page-container .head-con th {
  height: 26px;
}
.sheet-page-container .canSet {
  color: #284fc2;
  cursor: pointer;
}
.sheet-page-container .canSet:hover {
  background: #fafafa;
}
.sheet-page-container .sheet-table .body-con:nth-of-type(2n - 1) {
  background: #f4f2f5;
}
.sheet-page-container .sheet-table .body-con article {
  overflow: hidden;
  line-height: 29px;
  height: 100%;
  width: 100%;
  max-height: 27px;
  resize: none;
  position: relative;
  top: 1px;
}
.sheet-page-container .sheet-table .body-con input,
.sheet-page-container .sheet-table .body-con article {
  width: calc(100% - 2px);
  border: 0;
  padding: 0;
  height: calc(100% - 2px);
  -webkit-box-sizing: border-box !important;
          box-sizing: border-box !important;
  outline: none !important;
  text-align: center;
  background: transparent;
  color: #000;
  font-size: 12px;
}
.sheet-page-container .sheet-table .body-con input:focus,
.sheet-page-container .sheet-table .body-con article:focus {
  background: #e4f1f0;
}
.sheet-page-container .sheet-table .body-con:hover,
.sheet-page-container .sheet-table .body-con.selectedRow {
  background: #e6e6e6;
}
.sheet-page-container .sheet-table .body-con.disable {
  color: #999;
  cursor: auto;
}
.sheet-page-container .sheet-table .body-con.stripeRow td {
  background: #fafafa;
}
.sheet-page-container .sheet-table .body-con.selectRow td {
  background: #e4f1f0;
}
.sheet-page-container .sheet-table .body-con .mark-cell-1 {
  background: rgba(185,89,255,0.6);
}
.sheet-page-container .sheet-table .body-con .mark-cell-2 {
  background: rgba(48,163,255,0.6);
}
.sheet-page-container .sheet-table .body-con .mark-cell-3 {
  background: rgba(162,131,94,0.6);
}
.sheet-page-container .sheet-table .body-con .mark-cell-4 {
  background: rgba(208,196,79,0.6);
}
.sheet-page-container .sheet-table .body-con .mark-cell-5 {
  background: rgba(80,208,101,0.6);
}
.sheet-page-container .sheet-table .body-con.mark-row-1 {
  background: rgba(185,89,255,0.4);
}
.sheet-page-container .sheet-table .body-con.mark-row-2 {
  background: rgba(48,163,255,0.4);
}
.sheet-page-container .sheet-table .body-con.mark-row-3 {
  background: rgba(162,131,94,0.4);
}
.sheet-page-container .sheet-table .body-con.mark-row-4 {
  background: rgba(208,196,79,0.4);
}
.sheet-page-container .sheet-table .body-con.mark-row-5 {
  background: rgba(80,208,101,0.4);
}
.sheet-page-container .sheet-table .body-con.redText input {
  color: #000;
  cursor: pointer;
}
.sheet-page-container .sheet-table .body-con.selectedTr td {
  background: #fff8b1;
}
.sheet-page-container .no-wrap {
  white-space: nowrap;
}
.sheet-page-container .table-footer {
  font-size: 12px;
  color: #000;
  text-align: center;
  margin: 10px 0 0;
  position: relative;
}
.sheet-page-container .table-footer .sh-name {
  position: absolute;
  right: 0;
}
.sheet-page-container .add-row {
  color: #00f;
  float: right;
  font-size: 12px;
  cursor: pointer;
}
.sheet-page-container .add-row:hover {
  font-weight: bold;
}
.sheet-page-container .sign-text {
  min-width: 52px;
  max-width: 52px;
  cursor: pointer;
  height: 26px;
  line-height: 26px;
}
.sheet-page-container .sign-img {
  min-width: 52px;
  max-width: 52px;
  text-align: center;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
}
.sheet-page-container .sign-img img {
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
     object-fit: cover;
  -ms-interpolation-mode:bicubic;   
  // width: 60px;
  // height: 28px;
}
.sheet-page-container td[datakey='signerNo'] {
  display: none;
}
.sheet-page-container td[datakey='sign'] {
  display: table-cell;
}
.sheet-page-container td[datakey='auditorNo'] {
  display: none;
}
.sheet-page-container td[datakey='audit'] {
  display: table-cell;
}
.sheet-page-container article {
  line-height: 24px !important;
  text-align: center !important; /*IE*/
  text-align: -moz-center !important; /*Firefox*/
  text-align: -webkit-center !important; /*Chrome*/
}
.sheet-page-container .towLine {
  line-height: 12px !important;
}
.canSet{
  color: #000 !important;
}
td[datakey="signerNo"] {
display: table-cell !important
}
td[datakey="sign"] {
display: none !important;
}
td[datakey="auditorNo"] {
display: table-cell !important;
}
td[datakey="audit"] {
display: none !important;
}
[datakey="description"] input{
  width: 100% !important;
  position: relative !important;
}
.sheet-page-container {
  width: 100% !important;
}
* {
  background: #fff !important;
}
*{
  font-family: simsun, "Times New Roman", Georgia, Serif; !important
  word-wrap:break-word;
  word-break:break-all;
}
</style>

`