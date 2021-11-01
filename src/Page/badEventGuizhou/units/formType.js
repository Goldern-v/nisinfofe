export const formTypeList=[//不良事件类型
    {
        type:"病人安全通报单",//父表单，头部与尾部内容类型
        childType:"跌倒坠床不良事件",//具体表单内容类型
        funType:"type0",//类型
    },
    {
        type:"病人安全通报单",//父表单，头部与尾部内容类型
        childType:"非计划拔管不良事件",//具体表单内容类型
        funType:"type0",//类型
    },
    {
        type:"病人安全通报单",//父表单，头部与尾部内容类型
        childType:"给药错误不良事件",//具体表单内容类型
        funType:"type0",//类型
    },
    {
        type:"病人安全通报单",//父表单，头部与尾部内容类型
        childType:"压力性损伤",//具体表单内容类型
        funType:"type0",//类型
    },
    {
        type:"病人安全通报单",//父表单，头部与尾部内容类型
        childType:"压力性损伤不良事件",//具体表单内容类型、
        funType:"type0",//类型
    },
    {
        type:"病人安全通报单",//父表单，头部与尾部内容类型
        childType:"药物外渗药物渗出不良事件",//具体表单内容类型
        funType:"type0",//类型
    },
    {
        type:"病人安全通报单",//父表单，头部与尾部内容类型
        childType:"难免压疮申报表",//具体表单内容类型
        funType:"type0",//类型
    },
    {//20210926新表单
        type:"标本采集单模板",//父表单，头部与尾部内容类型
        childType:"标本采集不良事件",//具体表单内容类型
        funType:"type1",//类型
    },
    {//20210926新表单
        type:"护理管理不良事件单模板",//父表单，头部与尾部内容类型
        childType:"护理管理不良事件",//具体表单内容类型
        funType:"type1",//类型
    },
    {//20210926新表单
        type:"其他单模板",//父表单，头部与尾部内容类型
        childType:"其他不良事件",//具体表单内容类型
        funType:"type1",//类型
    },
    {//20210926新表单
        type:"实习带教单模板",//父表单，头部与尾部内容类型
        childType:"实习带教不良事件",//具体表单内容类型
        funType:"type1",//类型
    },
    {//20210926新表单
        type:"烫伤单模板",//父表单，头部与尾部内容类型
        childType:"烫伤不良事件",//具体表单内容类型
        funType:"type1",//类型
    },
    {//20210926新表单
        type:"走失单模板",//父表单，头部与尾部内容类型
        childType:"走失不良事件",//具体表单内容类型
        funType:"type1",//类型
    },
]
/**
 * 获取不良事件类型
 * @param {*} queryInfo 
 */

 const getBadEventType = (models,itemDataMap,router,type,deptData)=>{
    let findItem=formTypeList.find(item=>item.childType==queryInfo.badEventName);//查询当前不良事件类型
    (!findItem) && (findItem=formTypeList[0]);
    switch(findItem.funType){
      case 'type0':
        return initBadEventParmas0(models,itemDataMap,router,type,deptData)
      case 'type1':
        return initBadEventParmas1(models,itemDataMap,router,type,deptData);
      default:
        return initBadEventParmas0(models,itemDataMap,router,type,deptData);
    }
  }