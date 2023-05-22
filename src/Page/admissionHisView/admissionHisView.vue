<template>
    <div style="height:100vh">
        <sheetHospitalAdmission />
    </div>
</template>
<style lang='scss' scoped></style>
<script>
import sheetHospitalAdmission from "@/Page/sheet-hospital-admission/sheet-hospital-admission.vue"
import { autoLogin } from "@/api/login";
import Cookies from "js-cookie";
import { mapMutations } from 'vuex';
export default {
props: {},
data() {
return {};
},
methods: {
    ...mapMutations('common', [
        'setUser'
    ]),
    todo(res,next){
        let user = res.data.data.user;
        user.token = res.data.data.authToken;
        window.app.authToken = res.data.data.authToken;
        localStorage.setItem("user",JSON.stringify(res.data.data.user))
        localStorage.setItem("sso",'sso')
        this.setUser(res.data.data.user || {})
        Cookies.set(
            "NURSING_USER",
            `${res.data.data.user.id}##${res.data.data.authToken}`,
            {
            path: "/",
            }
        );
        next && next()
    }
},
created(){
},
components: {
    sheetHospitalAdmission
},
beforeRouteEnter(to,from,next){
    if(!from.path.includes('admissionHisView')){
        let {userName} = to.query
        autoLogin({empNo:userName,token:''}).then(res=>{
            // console.log(res.data);
            if(res.data.code =='402'){
            this.$confirm(resd.data.data.expireDesc, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            })
            .then(() => {
            this.todo(res,next)
            })
            .catch(()=>{
            this.todo(res,next)
            })
        }else if(res.data.code==='403'){
            this.$confirm(res.data.desc, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            })
            .then(() => {
            this.$router.go(-1)
            })
            .catch(()=>{
            this.$router.go(-1)
            })
        }else if(res.status==200&&res.data.code==200){
            this.todo(res,next)
            }
        })
    }
}
};
</script>
