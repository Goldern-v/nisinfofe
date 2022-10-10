<template>
 <div style="width: 100vw;height: 100vh;background-color: red">
   <div id="patView" style="display:none">
     <OBJECT id="ActiveX1"
             classid="clsid:8975B773-7CF3-4C4C-B646-DA9F6A154260"
             codebase="LCPProject.ocx#version=6,0,0,1"
             width="1000px"
             height="500px"
             align=center
             hspace=0
             vspace=0
             name="ActiveX123">
     </OBJECT>
   </div>
 </div>
</template>


<script>
export default {
  name:'ocxObject',
  data(){
    return{

    }
  },
  computed: {
    info() {
      return this.$route.query;
    }
  },
  mounted() {
    const {visitId,patientNo,cpIncludeDeptCode}=this.info
    // const str = '<?xml version=\"1.0\" encoding=\"gb2312\"?>'
    //     + '<INPUTPARA>'
    //     + `<PATIENTNO>${patientNo}_${visitId}</PATIENTNO>`
    //     + '<USERID>1966</USERID>'
    //     + '<USERNAME>张医生</USERNAME>'
    //     + '<USERTYPE>1</USERTYPE>'
    //     + '<CLIENTTYPE>0</CLIENTTYPE>'
    //     + '<MANUALTRIGGER>0</MANUALTRIGGER>'
    //     + '<MANUSHOW>0</MANUSHOW>'
    //     + '<GETSTATE>0</GETSTATE>'
    //     + `<DEPTCODE>${cpIncludeDeptCode}</DEPTCODE>`
    //     + '<HOSPITALID>45607379-3</HOSPITALID>'
    //     + '<READLONLY>0</READLONLY>'
    //     + '<CURWARDCODE>A802</CURWARDCODE>'
    //     + '<BEDNO>1502</BEDNO>'
    //     + '<BEDLABLE>1502</BEDLABLE>'
    //     + '<DISCHARGEDDATE></DISCHARGEDDATE>'
    //     + '</INPUTPARA>';
    // const active = document.getElementById("ActiveX1");
    // console.log('visitId:::',visitId, 'patientNo:::',patientNo ,'cpIncludeDeptCode:::',cpIncludeDeptCode);
    // console.log("OCX返回的患者路径状态为:" + active.LCP_GetCPState(str))
    // active.LCP_GetCPState(str);


    const str = '<?xml version=\"1.0\" encoding=\"gb2312\"?>'
        + '<INPUTPARA>'
        + '<PATIENTNO>600589558_1</PATIENTNO>'
        + '<USERID>1966</USERID>'
        + '<USERNAME>张医生</USERNAME>'
        + '<USERTYPE>1</USERTYPE>'
        + '<CLIENTTYPE>0</CLIENTTYPE>'
        + '<MANUALTRIGGER>0</MANUALTRIGGER>'
        + '<MANUSHOW>0</MANUSHOW>'
        + '<GETSTATE>0</GETSTATE>'
        + '<DEPTCODE>2400</DEPTCODE>'
        + '<HOSPITALID>76150479-9</HOSPITALID>'
        + '<READLONLY>0</READLONLY>'
        + '<CURDEPTCODE>2400</CURDEPTCODE>'
        + '<CURWARDCODE>A802</CURWARDCODE>'
        + '<BEDNO>1502</BEDNO>'
        + '<BEDLABLE>1502</BEDLABLE>'
        + '<DISCHARGEDDATE></DISCHARGEDDATE>'
        + '</INPUTPARA>';
    const active = document.getElementById("ActiveX1");
    active.LCP_GetCPState(str);//lcp_setOrder 方法
  }
}
</script>
