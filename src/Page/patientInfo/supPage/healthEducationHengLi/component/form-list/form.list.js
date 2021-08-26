// 护理系统表单api
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    if (parent.window.location.search.split('?')[1]) {
        var r = parent.window.location.search.split('?')[1].match(reg)
    }
    if (r != null) {
        return decodeURIComponent(r[2])
    }
    return null
}

export function initList(wid) {
    wid.addCSS = function (cssText) {
        var style = wid.document.createElement('style'),  //创建一个style元素
            head = wid.document.head || wid.document.getElementsByTagName('head')[0]; //获取head元素
        style.type = 'text/css'; //这里必须显示设置style元素的type属性为text/css，否则在ie中不起作用
        if (style.styleSheet) { //IE
            var func = function () {
                try { //防止IE中stylesheet数量超过限制而发生错误
                    style.styleSheet.cssText = cssText;
                } catch (e) {

                }
            }
            //如果当前styleSheet还不能用，则放到异步中则行
            if (style.styleSheet.disabled) {
                setTimeout(func, 10);
            } else {
                func();
            }
        } else { //w3c
            //w3c浏览器中只要创建文本节点插入到style元素中就行了
            var textNode = wid.document.createTextNode(cssText);
            style.appendChild(textNode);
        }
        head.appendChild(style); //把创建的style元素插入到head中    
    }
    let $ = wid.$
    wid.formApp = new FormApp()
    function FormApp() {
        //控制按钮
        this.controlBtn = function () {
            
            let resulte = []
            if($("#addPath").val() != '') {
                resulte.push('add')
            }
            if($("#updatePath").val() != '') {
                resulte.push('update')
            }
            if($("#printPath").val() != '') {
                resulte.push('print')
            }
            if($("#curvePath").val() != '') {
                resulte.push('curve')
            }
            return resulte

        }
        this.postForm = function () {
            $.ajax({
                type: "post",
                url: "/crNursing/api/form/save" + wid.location.search,
                data: $("#smartform").serialize(),
                success: function (data) {
                    if (data.code == 200) {
                        var path = data.data.viewPath;
                        if (data.data.formType == "1") {
                            var name = getQueryString("name");
                            var sex = getQueryString("sex");
                            var age = getQueryString("age");
                            var deptCode = getQueryString("deptCode");
                            var bedLabel = getQueryString("bedLabel");
                            var inpNo = getQueryString("inpNo");
                            var wardCode = getQueryString("wardCode");
                            path = path + '/' + name + '/' + sex + '/' + age + '/' + deptCode + '/' + bedLabel + '/' + inpNo + '/' + wardCode;
                        }
                        wid.location.href = '/crNursing/api' + path + wid.location.search
                    }
                    else {
                        //todo 1.提示优化  2.错误码提示
                        alert(data.desc);
                    }
                }
            });
        }
        //设置责任护士的签名
        this.agCharge = function (password) {
            $("input[name='createSign']").val(password)
        }
        //设置管理护士的签名
        this.agAdmin = function (password) {
            $("input[name='auditSign']").val(password)
        }
        //打印表单
        this.printForm = function () {
            var formCode = $("#printPath").val()
            var url = `${formCode}` + wid.location.search
            window.openFormBox(url)
        }
        //判断签名
        this.isZbView = function (password) {
            var viewName = $("input[name='viewName']").val();
            if (viewName == 'zb') {
                _this.agAdmin(password)
            }
            else {
                _this.agCharge(password)
            }
        }
        //修改表单数据
        this.updateForm = function () {
            var patientId = getQueryString("patientId");
            var visitId = getQueryString("visitId");
            var name = getQueryString("name");
            var sex = getQueryString("sex");
            var age = getQueryString("age");
            var deptCode = getQueryString("deptCode");
            var bedLabel = getQueryString("bedLabel");
            var inpNo = getQueryString("inpNo");
            var wardCode = getQueryString("wardCode");
            var formCode = $("#updatePath").val();
            var formId = $("input[name='dataId']:checked").val();
            if (formId != null) {
                var url = `${formCode}/${formId}/${patientId}/${visitId}/${name}/${sex}/${age}/${deptCode}/${bedLabel}/${inpNo}/${wardCode}` + wid.location.search
                try {
                    window.closeList()
                } catch(e) {

                }
                window.openFormBox(url)
                return true
            }
            else {
                alert("请选择一条记录")
                return false
            }
        }

        this.formPageBreak = function (pageNum) {
            var form = $("#pagerForm");
            $('input[name="pageNum"]').val(pageNum);
            form.attr('action', form.attr("action") + wid.location.search);
            form.submit();
        }
        //分页
        this.formPage = function () {
            var result = new Object();
            result.totalCount = $("#totalCount").val()
            result.numPerPage = $("#numPerPage").val()
            result.currentPage = $("#currentPage").val()
            return result;
        }

    }


    //修改样式
    wid.addCSS(`body {padding 0;margin: 0}`)
    wid.addCSS(`tr {cursor: pointer}`)
    wid.addCSS(`tr:hover {background: rgb(238, 246, 245)}`)
    // wid.addCSS(`
    // body {background: #fff}
    // table{border-collapse:collapse;}
    // *::-webkit-scrollbar {
    //     width: 7px;
    //     height: 10px;
    //     background-color: #F5F5F5;
    //   }
    // *::-webkit-scrollbar-track {
    //     // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    //     border-radius: 50px;
    //     background-color: #F5F5F5;
    //   }
    // *::-webkit-scrollbar-thumb {
    //     border-radius: 50px; // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    //     background-color: #ddd;
    //   }  
    // table, td, th{border:0;
    // border-top: 1px solid rgb(223, 236, 232);
    // border-bottom: 1px solid rgb(223, 236, 232);
    // font-size: 14px;
    // color: rgb(31, 61, 53)}
    // td,th{padding: 5px 10px;height:30px}
    // th{background-color: #eef1f6;text-align: left;border-bottom: 1px solid #dfe6ec;color: #1f2d3d;font-weight: bold;}
    // table{
    //     border-right: 1px solid rgb(223, 236, 232);
    //     border-left: 1px solid rgb(223, 236, 232);
    //     width: 100%;
    //     max-width: 100%;
    // }
    // .table{
    //     margin: 10px;
    // }
    // `)
}
