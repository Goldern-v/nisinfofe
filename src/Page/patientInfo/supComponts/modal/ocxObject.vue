<template>
 <div style="width: 100vw;height: 100vh;background-color: red">
   <div id="patView" style="display:none">
     <OBJECT
         id="patocx"
         classid="clsid:89753773-7CF3-4C4C-3646-DA9F6A154260"
         width=860
         height=500
         align=center
         hspace=0
         space=0
         name="patocx">
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
  created() {
    console.log("this.$route.query===",this.$route.query);
    const {visitId,patientNo,cpIncludeDeptCode}=this.info
    // const hospitalId = '45607379-3'
    var str="<?xml version=\"1.0\" encoding=\"gb2312\"?>"+
"<INPUTPARA><HOSPITALID>"+'45607379-3'+"</HOSPITALID><PATIENTNO>"+`${patientNo}_${visitId}`+"</PATIENTNO>"+
"<USERTD>99999</USERID><USERNAME>XYZ</USERNAME><USERTYPE>1</USERTYPE>"+
"‹DEPTCODE>"+cpIncludeDeptCode+"</DEPTCODE><CLIENTTYPE>O</CLIENTTYPE>"+
    "<MANUALTRIGGER>O</MANUALTRIGGER><MANUSHOW>1</MANUSHOW><GETSTATE>O</GETSTATE>"+
    "<GETDEPTPATH>0</GETDEPTPATH><READONLY>0</READONLY></INPUTPARA>"
    var active = document.getElementById("patocx");
    active.LCP_GetCPState(str);
  }
}
</script>
