<template>
  <div>
    <div
      ref="toolbarRef"
      class="tool-contain"
      :class="{'hidden-left': isGeneralCareWj}"
      @wheel.prevent="onScrollX"
    >
    <template  v-if="HOSPITAL_ID == 'whfk'">
      <div
        class="item-box"
        @click.stop="createSheet"
        v-if="!isSingleTem && !isDeputy && isShow()"
      >
        <div class="text-con">新建记录单</div>
      </div>
      <div
        class="item-box"
        @click="openStaticModal"
        v-if="showCrl && !isDeputy && !isSingleTem_LCEY && !isSingleTem_GZRY"
      >
        <div class="text-con">出入量统计</div>
      </div>
      <div
        v-if="showSetCreatePage()"
        class="item-box"
        @click="setPage"
        style="width: 110px"
      >
        <div class="text-con">设置起始页({{ sheetInfo.sheetStartPage }})</div>
      </div>
      <div
        class="item-box"
        @click="toPrint"
        v-if="
          (!['guizhou', '925'].includes(HOSPITAL_ID) && !isDeputy && isShow()) ||
          ['guizhou', '925'].includes(HOSPITAL_ID)
        "
      >
        <div class="text-con">打印预览</div>
      </div>
      <div
        v-if="!isDeputy"
        class="item-box"
        @click.stop="toPdfPrint"
        v-show="isDev && isShow()"
      >
        <div class="text-con">批量打印</div>
      </div>
      <div
        v-if="!isDeputy"
        class="item-box"
        @click.stop="delSheet"
      >
        <div class="text-con">删除整单</div>
      </div>
      <div
        class="item-box"
        @click="emit('addSheetPage')"
        v-show="limitAddPage"
      >
        <div class="text-con">添加新页</div>
      </div>
       <div
        class="item-box"
        @click="toSave"
      >
        <div class="text-con">保存</div>
      </div>
    </template>
    <template v-else-if="HOSPITAL_ID == 'huadu'">
      <div
        class="item-box"
        @click="emit('addSheetPage')"
        v-if="!isLock"
        v-show="limitAddPage"
      >
        <div class="text-con">添加新页</div>
      </div>
      <div
        class="item-box"
        @click="toSave"
        v-if="!isLock"
      >
        <div class="text-con">保存</div>
      </div>
      <template  v-if="!isLock">
        <div
        class="item-box"
        @click="openStaticModal"
        v-if="showCrl && !isDeputy && !isSingleTem_LCEY && !isSingleTem_GZRY"
         >
          <div class="text-con">出入量统计</div>
        </div>
      </template>
      <template  v-if="!isLock">
        <div
        v-if="showSetCreatePage()"
        class="item-box"
        @click="setPage"
        style="width: 110px"
         >
        <div class="text-con">设置起始页({{ sheetInfo.sheetStartPage }})</div>
      </div>
      </template>
      <div
        class="item-box"
        @click="toPrint"
        v-if="
          (!['guizhou', '925'].includes(HOSPITAL_ID) && !isDeputy && isShow()) ||
          ['guizhou', '925'].includes(HOSPITAL_ID)
        "
      >
        <div class="text-con">打印预览</div>
      </div>
      <div
        v-if="!isDeputy"
        class="item-box"
        @click.stop="toPdfPrint"
        v-show="isDev && isShow() && !showPrintAll"
      >
        <div class="text-con">批量打印</div>
      </div>
      <template  v-if="!isLock">
        <div
        v-if="!isDeputy"
        class="item-box"
        @click.stop="delSheet"
        >
          <div class="text-con">删除整单</div>
       </div>
      </template>
      <div
        class="item-box"
        @click.stop="createSheet"
        v-if="!isSingleTem && !isDeputy && isShow()"
      >
        <div class="text-con">新建记录单</div>
      </div>
    </template>
    <template v-else-if="isGeneralCareWj">
    </template>
      <template v-else-if="HOSPITAL_ID == 'dglb'">
        <div
            class="item-box"
            @click="openStaticModal"
            v-if="showCrl && !isDeputy && !isSingleTem_LCEY && !isSingleTem_GZRY"
        >
          <div class="text-con">出入量统计</div>
        </div>
        <div
            v-if="showSetCreatePage()"
            class="item-box"
            @click="setPage"
            style="width:90px"
        >
          <div class="text-con">设置起始页({{ sheetInfo.sheetStartPage }})</div>
        </div>
        <div
            class="item-box"
            @click="toPrint"
            v-if="
          (!['guizhou', '925'].includes(HOSPITAL_ID) && !isDeputy && isShow()) ||
          ['guizhou', '925'].includes(HOSPITAL_ID)
        "
        >
          <div class="text-con">打印预览</div>
        </div>
        <div
            class="item-box"
            @click="toSave"
        >
          <div class="text-con">保存</div>
        </div>
        <div
            v-if="!isDeputy"
            class="item-box"
            @click.stop="delSheet"
        >
          <div class="text-con">删除整单</div>
        </div>
        <div
            class="item-box"
            @click.stop="createSheet"
            v-if="!isSingleTem && !isDeputy && isShow()"
        >
          <div class="text-con">新建记录单</div>
        </div>
        <div
            class="item-box"
            v-show="limitAddPage"
            @click="emit('addSheetPage')"
        >
          <div class="text-con">添加新页</div>
        </div>



        <div
            v-if="!isDeputy"
            class="item-box"
            @click.stop="toPdfPrint"
            v-show="isDev && isShow()"
        >
          <div class="text-con">批量打印</div>
        </div>


        <div
            class="item-box"
            @click.stop="openSelectTmp"
            v-if="!isSingleTem && !isDeputy && isShow() && showSetAsTemplate()"
        >
          <div class="text-con">科室模板</div>
        </div>
<!--        <div-->
<!--            class="item-box"-->
<!--            flex="cross:center main:center"-->
<!--            @click.stop="openTemplateSlider"-->
<!--            v-if="!isSingleTem && !isDeputy && isShow()"-->
<!--        >-->
<!--          <div class="text-con">特殊情况模板</div>-->
<!--        </div>-->
<!--        <div-->
<!--            class="item-box"-->
<!--            flex="cross:center main:center"-->
<!--            @click.stop="openTitleTemplateSlide"-->
<!--            v-if="!isSingleTem && !isDeputy && isShow()"-->
<!--        >-->
<!--          <div class="text-con">自定义标题模板</div>-->
<!--        </div>-->
      </template>
      <template v-else-if="HOSPITAL_ID == 'sdlj'">
        <div
            class="item-box"
            v-show="limitAddPage"
            @click="emit('addSheetPage')"
        >
          <div class="text-con">添加新页</div>
        </div>
        <div
            class="item-box"
            @click="toSave"
        >
          <div class="text-con">保存</div>
        </div>
        <div
            class="item-box"
            @click="openStaticModal"
            v-if="showCrl && !isDeputy && !isSingleTem_LCEY && !isSingleTem_GZRY"
        >
          <div class="text-con">出入量统计</div>
        </div>
        <div
            v-if="showSetCreatePage()"
            class="item-box"
            @click="setPage"
            style="width:90px"
        >
          <div class="text-con">设置起始页({{ sheetInfo.sheetStartPage }})</div>
        </div>
        <div
            class="item-box"
            @click="toPrint"
            v-if="
          (!['guizhou', '925'].includes(HOSPITAL_ID) && !isDeputy && isShow()) ||
          ['guizhou', '925'].includes(HOSPITAL_ID)
        "
        >
          <div class="text-con">打印预览</div>
        </div>
        <div
            v-if="!isDeputy"
            class="item-box"
            @click.stop="toPdfPrint"
            v-show="isDev && isShow()"
        >
          <div class="text-con">批量打印</div>
        </div>
        <div
            v-if="!isDeputy"
            class="item-box"
            @click.stop="delSheet"
        >
          <div class="text-con">删除整单</div>
        </div>
        <div
            class="item-box"
            @click.stop="createSheet"
            v-if="!isSingleTem && !isDeputy && isShow()"
        >
          <div class="text-con">新建记录单</div>
        </div>
        <div
            class="item-box"
            @click.stop="openSelectTmp"
            v-if="!isSingleTem && !isDeputy && isShow() && showSetAsTemplate()"
        >
          <div class="text-con">科室模板</div>
        </div>
      </template>
    <template v-else>
      <div
        class="item-box"
        v-show="limitAddPage"
        @click="emit('addSheetPage')"
      >
        <div class="text-con">添加新页</div>
      </div>
      <div
        class="item-box"
        @click="toSave"
      >
        <div class="text-con">保存</div>
      </div>
      <div
        class="item-box"
        @click="openStaticModal"
        v-if="showCrl && !isDeputy && !isSingleTem_LCEY && !isSingleTem_GZRY"
      >
        <div class="text-con">出入量统计</div>
      </div>
      <div
        v-if="showSetCreatePage()"
        class="item-box"
        @click="setPage"
        style="width:90px"
      >
        <div class="text-con">设置起始页({{ sheetInfo.sheetStartPage }})</div>
      </div>
      <div
        class="item-box"
        @click="toPrint"
        v-if="
          (!['guizhou', '925'].includes(HOSPITAL_ID) && !isDeputy && isShow()) ||
          ['guizhou', '925'].includes(HOSPITAL_ID)
        "
      >
        <div class="text-con">打印预览</div>
      </div>
      <div
        class="item-box"
        @click="onPrintPdf"
        v-if="['wujing'].includes(HOSPITAL_ID)"
      >
        <div class="text-con">打印</div>
      </div>
      <div
        v-if="!isDeputy"
        class="item-box"
        @click.stop="toPdfPrint"
        v-show="isDev && isShow()"
      >
        <div class="text-con">批量打印</div>
      </div>
      <div
        v-if="!isDeputy"
        class="item-box"
        @click.stop="delSheet"
      >
        <div class="text-con">删除整单</div>
      </div>
      <div
        class="item-box"
        @click.stop="createSheet"
        v-if="!isSingleTem && !isDeputy && isShow()"
      >
        <div class="text-con">新建记录单</div>
      </div>
      <div
        class="item-box"
        @click.stop="openSelectTmp"
        v-if="!isSingleTem && !isDeputy && isShow() && showSetAsTemplate()"
      >
        <div class="text-con">科室模板</div>
      </div>
      <div
        class="item-box"
        @click.stop="openTemplateSlider"
        v-if="!isSingleTem && !isDeputy && isShow()"
      >
        <div class="text-con">特殊情况模板</div>
      </div>
      <div
        class="item-box"
        @click.stop="openTitleTemplateSlide"
        v-if="!isSingleTem && !isDeputy && isShow()"
      >
        <div class="text-con">自定义标题模板</div>
      </div>
      <div
        class="item-box"
        @click="lookMark"
        v-if='blockId'
      >
        <div class="text-con">痕迹</div>
      </div>
    </template>
      <div
        class="item-box"
        @click="openStaticModal"
        v-if="['guizhou', '925'].includes(HOSPITAL_ID) && isDeputy"
      >
        <div class="text-con">出入量统计</div>
      </div>
      <div
        class="item-box"
        @click.stop="syncVisitWithData"
        v-if="['guizhou', '925'].includes(HOSPITAL_ID)"
      >
        <div class="text-con">同步护理巡视</div>
      </div>
       <!-- 针对主副页切换，必须等到数据回来了才有显示 -->
      <div
        :class="[hisDocPreview('main') ? 'right-btn' : 'item-box']"
        :id="[hisDocPreview('main') ? 'is-deputy-btn' : '']"
        style="background: antiquewhite"
        @click.stop="backMainForm"
        v-if="isDeputy && isLoad"
      >
        <div class="text-con">
          {{['guizhou', '925'].includes(HOSPITAL_ID)  ? "护理记录单" : "切换主页" }}
        </div>
      </div>
      <div
        :class="[hisDocPreview('deputy') ? 'right-btn' : 'item-box']"
        :id="[hisDocPreview('deputy') ? 'is-deputy-btn' : '']"
        style="background: antiquewhite"
        @click.stop="addDeputyForm"
        v-if="sheetInfo.selectBlock && sheetInfo.selectBlock.additionalCode"
      >
        <div class="text-con">
          {{ ['guizhou', '925'].includes(HOSPITAL_ID) ? "出入量记录单" : "切换副页" }}
        </div>
      </div>
      <div
        class="item-box"
        @click.stop="openChart"
        v-if="
          (HOSPITAL_ID === 'huadu' ||
            HOSPITAL_ID === 'liaocheng' ||
            HOSPITAL_ID === 'wujing') &&
          this.$route.path.includes('singleTemperatureChart')
        "
      >
        <div class="text-con">体温曲线</div>
      </div>
      <!--北海的婴儿录入体温曲线-->
      <div
        class="item-box"
        @click.stop="openBabyChat()"
        v-if="
          HOSPITAL_ID === 'beihairenyi' &&
          this.$route.path.includes('Baby_sheetPage')
        "
      >
        <div class="text-con">体温曲线</div>
      </div>
      <div flex-box="1"></div>
      <el-select
        v-if=" HOSPITAL_ID == 'whfk' "
        v-model="printRecordValue"
        value-key="id"
        size="small"
        placeholder=""
        class="select-con whfk-select-con"
        @visible-change="getPrintRecordData()"
      >
        <div class="sheetSelect-con-sheet sheetSelect-con-sheet-print">
          <div class="head-con" flex="cross:stretch" >
            <div class="col-1">打印人</div>
            <div class="col-2" style="border-right:none">打印时间</div>

          </div>
          <el-option
            v-for="item in printRecord"
            :key="item.id"
            :label="item.printName+' '+item.printTime"
            :value="item"
          >
            <div class="list-con list-con-print" flex="cross:stretch" v-if="!item.nodData">
              <div class="col-1" :title="item.printName">
                {{ item.printName }}
              </div>
              <div class="col-2" :title="item.printTime" style="border-right:none">
                {{ item.printTime }}
              </div>
            </div>
            <div v-if="item.nodData" style="text-align: center;width: 562px;height: 100px;padding-top: 50px;background:#fff;background: rgb(255, 255, 255);color: #000">
                暂无打印记录
              </div>
          </el-option>
        </div>
      </el-select>
      <el-select
        v-if="!isDeputy && HOSPITAL_ID == 'whfk'"
        v-model="sheetInfo.selectBlock"
        @change="changeSelectBlock"
        value-key="id"
        placeholder="请选择护理记录单"
        class="select-con whfk-select-con"
      >
        <div class="sheetSelect-con-sheet">
          <div class="head-con" flex="cross:stretch">
            <div class="col-1">记录单标题</div>
            <div class="col-2">科室</div>
            <div class="col-3">开始时间</div>
            <div class="col-4">页码</div>
          </div>
          <el-option
            v-for="item in sheetBlockList"
            :key="item.id"
            :label="blockLabel(item, sheetBlockList.length)"
            :value="item"
          >
            <div class="list-con" flex="cross:stretch">
              <div class="col-1" :title="item.recordName">
                {{ item.recordName }}
              </div>
              <div class="col-2" :title="item.deptName">
                {{ item.deptName }}
              </div>
              <div class="col-3" :title="item.createTime">
                {{ item.createTime }}
              </div>
              <div class="col-4" :title="item.completeName">
                {{ item.pageIndex }} - {{ item.endPageIndex }}
              </div>
              <!-- <div class="col-3" :title="item.completeName">{{item.completeName}}</div> -->
            </div>
          </el-option>
        </div>
      </el-select>
      <div class="select-box" style="position:relative">
        <el-select
          v-if="!isDeputy  && HOSPITAL_ID != 'whfk'"
          v-model="sheetInfo.selectBlock"
          @change="changeSelectBlock"
          @visible-change="(val)=>changesCrollOptionFlag(val,1)"
          value-key="id"
          :placeholder="['foshanrenyi'].includes(HOSPITAL_ID)?'':'请选择护理记录单'"
          class="select-con otherType"
        >
          <div class="sheetSelect-con-sheet">
            <div class="head-con" flex="cross:stretch">
              <div class="col-1">记录单标题</div>
              <div class="col-2">科室</div>
              <div class="col-3">开始时间</div>
              <div class="col-4">页码</div>
            </div>
            <el-option
              v-for="item in sheetBlockList"
              :key="item.id"
              :label="blockLabel(item, sheetBlockList.length)"
              :value="item"
            >
              <div class="list-con" flex="cross:stretch">
                <div class="col-1" :title="item.recordName">
                  {{ item.recordName }}
                </div>
                <div class="col-2" :title="item.deptName">
                  {{ item.deptName }}
                </div>
                <div class="col-3" :title="item.createTime">
                  {{ item.createTime }}
                </div>
                <div class="col-4" :title="item.completeName">
                  {{ item.pageIndex }} - {{ item.endPageIndex }}
                </div>
                <!-- <div class="col-3" :title="item.completeName">{{item.completeName}}</div> -->
              </div>
            </el-option>
          </div>
        </el-select>
        <div class="float-text"
        v-if="['foshanrenyi'].includes(HOSPITAL_ID)"
        @click="scrollOption" v-html="selectText"></div>
      </div>
      <!-- <span class="label">页码范围:</span> -->
      <!-- 江门妇幼,佛山市一第三方地址提供需要页码选择显示 -->
      <div
        class="item-box"
        :style="{width:'80px',display:'flex !important', overflow: 'hidden'}"
        v-if="!isDeputy"
      >
        <el-autocomplete
          class="pegeSelect"
          icon="caret-bottom"
          placeholder="请输入页码"
          v-model="pageInfoObj.pageArea"
          @input="pageNumberChange"
          :fetch-suggestions="querySearch"
        ></el-autocomplete>
      </div>
      <div
      class="searchPageByDate"
      @click="searchPageByDateModal"
      v-if="!isGeneralCareWj"
      >
      <i class="el-icon-date"></i>日期
      </div>
      <!-- <div
        class="item-box"
        style="width: 85px"
        flex="cross:center main:center"
        v-if="!isDeputy && ['huadu','wujing', 'beihairenyi'].includes(HOSPITAL_ID)"
      >
        <input
          class="pegeSelect"
          style="outline: none; border: none"
          placeholder="请输入页码"
          v-model="pageNum"
          @keydown="pageNumKeyDown"
        />
      </div> -->
      <div
        class="item-box"
        style="width: 30px"
        @click="openEMR"
        v-if='HOSPITAL_ID == "beihairenyi"'
      >
        <div class="text-con">
          电子病历
        </div>
      </div>
      <div style="width: 5px"></div>
      <div
        class="right-btn"
        @click="openRltbModal"
        v-if="['guizhou', '925'].includes(HOSPITAL_ID)  && isDeputy"
      >
        <div class="text-con">
          <img src="./images/评估.png" alt />
          入量同步
        </div>
      </div>
      <div
        class="right-btn"
        @click="openRltbModal"
        v-if="showRltbN"
      >
        <div class="text-con">
          <img src="./images/评估.png" alt />
          入量同步
        </div>
      </div>
      <div class="line" v-if="!isSingleTem_LCEY && !isDeputy"></div>
      <div style="width: 5px"></div>
      <template  v-if="!isLock">
        <template v-if="HOSPITAL_ID == 'wujing'">
           <!-- 分页获取评估同步 -->
          <div
          class="right-btn"
          @click="emit('openEvalModelPaging')"
        >
          <div class="text-con">
            <img src="./images/评估.png" alt />
            评估同步
          </div>
        </div>
        </template>
        <template v-else>
          <div
            class="right-btn"
            @click="pgtbModel"
            v-if="!isSingleTem_LCEY && !isDeputy && HOSPITAL_ID != 'foshanrenyi'"
          >
          <div class="text-con">
            <img src="./images/评估.png" alt />
            评估同步
          </div>
          </div>
        </template>
      </template>
      <div class="line" v-if="!isSingleTem_LCEY && !isDeputy"></div>
      <template  v-if="!isLock">
        <div
          class="right-btn"
          @click.stop="openTztbModal"
          v-if="!isSingleTem_LCEY && !isDeputy"
         >
          <div class="text-con">
            <img src="./images/体征.png" alt />
            体征同步
          </div>
        </div>
      </template>
      <div
        class="line"
        v-if="HOSPITAL_ID == 'wujing' || HOSPITAL_ID == 'quzhou'"
      ></div>
      <div
        class="line"
        v-if="['guizhou', '925'].includes(HOSPITAL_ID) && sheetInfo.sheetType === 'common_gzry'"
      ></div>
      <div style="width: 5px"></div>
      <div
        class="right-btn"
        @click.stop="openZxdtbModal"
        v-if="
           ['wujing', 'quzhou', 'weixian', 'liaocheng', 'whfk', 'whhk', 'gdtj', 'lyxrm', 'stmz', 'lyyz','ytll','whsl', 'nfyksdyy'].includes(HOSPITAL_ID)
        "
      >
        <div class="text-con">
          <img src="./images/评估.png" alt />
          执行单同步
        </div>
      </div>
      <div
        class="right-btn"
        @click.stop="openZxdtbModal"
        v-if="['guizhou', '925'].includes(HOSPITAL_ID) && sheetInfo.sheetType === 'common_gzry'"
      >
        <div class="text-con">
          <img src="./images/评估.png" alt />
          输血同步
        </div>
      </div>
      <div style="width: 5px"></div>
    </div>
    <patientInfo
      v-if="
        patientInfo.patientId &&
        !$route.path.includes('temperature') &&
        !$route.path.includes('Baby_sheetPage') &&
        !['huadu'].includes(HOSPITAL_ID)
      "
    ></patientInfo>
    <!-- <demonstarationLevca v-if="HOSPITAL_ID == 'hj' && patientInfo.patientId &&
        !$route.path.includes('temperature') &&
        !$route.path.includes('Baby_sheetPage') "></demonstarationLevca> -->
    <newFormModal ref="newFormModal"></newFormModal>
    <setTitleModal ref="setTitleModal"></setTitleModal>
    <templateSlideFSRY ref="templateSlideFsry"></templateSlideFSRY>
    <titleTemplateSlideFS ref="titleTemplateSlideFS"></titleTemplateSlideFS>
    <templateSlide ref="templateSlide"></templateSlide>
    <tztbModal ref="tztbModal"></tztbModal>
    <rltbModal ref="rltbModal" :blockId="blockId"></rltbModal>
    <selectPageModal ref="tmpModal" @setAsTemplate="setAsTemplate"></selectPageModal>
    <zxdtbModal
      ref="zxdtbModal"
      :blockId="blockId"
      :title="titleName"
      :modalWidth="modalWidth"
      :modalHeight="modalHeight"
    ></zxdtbModal>
    <patientInfoModal ref="patientInfoModal"></patientInfoModal>
    <searchPageByDateModal ref="searchPageByDateModal" @updateCallBack="updateCallBack" :sheetStartPage="sheetInfo.sheetStartPage" :blockId="blockId"></searchPageByDateModal>
    <rltb-nfzxy-modal v-if="showRltbN" ref="rltbNfzxyModal" :blockId="blockId" />
    <!-- <sweet-modal
      ref="sheet"
      title="体温曲线"
      class="tempSweetModal"
      @close="closeModal"
    > -->
    <moveContext
      :id="'temperatureChart'"
      :titlex="'体温曲线'"
      class="babyChat"
      v-if="
        this.$route.path.includes('singleTemperatureChart') &&
        HOSPITAL_ID == 'huadu'
      "
    >
      <temperatureHD :queryTem="patientInfo"></temperatureHD>
    </moveContext>
    <PreviewPDF
      ref="previewModal"
    ></PreviewPDF>
    <!-- </sweet-modal> -->
    <MarkModal ref='markModal' :blockId="blockId"></MarkModal>
  </div>
</template>

<script>
import bus from "vue-happy-bus";
import $ from "jquery";
import templateSlide from "@/Page/sheet-page/components/modal/template-slide.vue";
import templateSlideFSRY from "@/Page/sheet-page/components/modal/template-slide-fsry.vue";
import titleTemplateSlideFS from "@/Page/sheet-page/components/modal/title-template-slide-fssy";
import setPageModal from "../modal/setPage-modal.vue";
import searchPageByDateModal from "@/Page/sheet-page/components/modal/searchPageByDate-modal.vue";
import sheetModel, { cleanData, cleanDataOnly } from "../../sheet.js";
import sheetInfo from "../config/sheetInfo/index.js";
import { sign } from "@/api/sheet.js";
import { Tr } from "../render/Body.js";
import {
  blockList,
  blockDelete,
  switchAdditionalBlock,
  setSheetTemplate,
  getPrintRecord,
  getPageIndex,
} from "../../api/index.js";
import common from "@/common/mixin/common.mixin.js";
import newFormModal from "../modal/new-sheet-modal.vue";
import setTitleModal from "../modal/set-title-modal.vue";
import tztbModal from "../modal/tztb-modal.vue";
import zxdtbModal from "../modal/zxdtb-modal.vue";
import rltbModal from "../modal/rltb-modal.vue";
import RltbNfzxyModal from "../modal/rltb-nfzxy-modal.vue";
import patientInfoModal from "./modal/patient-info-modal";

import selectPageModal from './modal/selectPageModal.vue'
import dayjs from "dayjs";
// import lodopPrint from "./lodop/lodopPrint";
import patientInfo from "./patient-info";
import temperatureHD from "../../../patientInfo/supPage/temperature/temperature-huadu";
// 演示要使用的留痕追溯
import demonstarationLevca from "./demonstaration-levca.vue"
//体温曲线窗口
import moveContext from "@/Page/temperature-chart/commonCompen/removableBox.vue";
import { getPatientInfo } from "@/api/common.js";
import { getHomePage } from "@/Page/sheet-page/api/index.js";
import PreviewPDF from './modal/preview-pdf.vue';
import MarkModal from './modal/mark-modal.vue';
import moment from 'moment'
const isWJ = 'wujing' === process.env.HOSPITAL_ID

export default {
  mixins: [common],
  name: "sheetTool",
  props: {
    isNursingPreview: {//是否为调阅界面体温单调起的护记
      type:Boolean,
      default:false
    },
    isLock:{ //护记是否被锁定
      type:Boolean,
      default:false
    },
    isLoad:{//list接口数据是否回来了，回来就显示切换在主副页
      type:Boolean,
      default:false
    },
    // 动态表头数据
    sheetTitleData: {
      type: Object,
      default: {}
    },
    // 最大页数
    maxPage: {
      type: Number | String,
    },
    sheetTagInfo: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      bus: bus(this),
      readOnlyList: [
        "fuyou","huadu","zhzxy"
      ],
      tool: "",
      showCurve: false,
      creator: "",
      user: JSON.parse(localStorage.user),
      selectList: [],
      oldSelectList:[],
      sheetModel,
      sheetInfo,
      sheetBlockList: [],
      queryTem: {},
      pageArea:'',
      pageBlockId:'',
      titleName: "",
      modalWidth: 720,
      modalHeight:350,
      pageNum: "",
      firstPage: 1,
      printRecord:[],
      babelFirst:true,
      scrollOptionFlag:false,
      scrollOptionNum:1,
      printRecordValue:'',
      checkSheetRender:null,//查询是否完成定时器
    };
  },
  methods: {
    lookMark() {
      this.$refs.markModal.markVisible = true;
      this.$refs.markModal.getLogRecordOperate();
    },
    onScrollX(e) {
      // console.log(e)
      const deltaX = -e.wheelDelta || e.deltaY + 40 || e.detail;
      const scrollRef = this.$refs.toolbarRef;
      if (scrollRef) {
        scrollRef.scrollLeft = scrollRef.scrollLeft + deltaX / 4
      }
    },
    onPrintPdf() {
      this.$refs.previewModal.open(this.sheetInfo);
    },
    pageNumberChange(){
      //每次跳转 按键或者选择页码调整 都要清空sheetPageScrollValue，这样子就会跳转到最后一页
      localStorage.setItem('sheetPageScrollValue',null)
      const { pageArea } = this.pageInfoObj
      //结束的页码
      this.updateSheetPageInfo(pageArea)
    },
    updateCallBack({startPage,endPage,addPageLength,pageByDateFlag}){
      const sheetStartPage = this.sheetInfo.sheetStartPage
      if(!pageByDateFlag){
              let maxPage = {
        'default': 50
      }
        if (
          Number(endPage) - Number(startPage) >= 0 &&
          Number(endPage) - Number(startPage) <= (maxPage[this.HOSPITAL_ID] || maxPage.default)
        ) {
          /*
           * 如果是增加页码 切换页码就初始化页码列表
           * 否则就只是刷新单子
           * upSheetPageArea 提交页码范围数据到vuex 然后sheet-page界面获取
          */
          if (addPageLength) {
            this.sheetInfo.addPage = []
            this.initSheetPageSize()
          }
        } else {
          this.$message('输入页码区间过大,请重新调整')
          return
        }
      }
      this.$store.commit('upSheetPageArea', { startPageIndex: startPage - sheetStartPage, endPageIndex: endPage - sheetStartPage })
      this.pageArea = `${startPage}-${endPage}`
      this.bus.$emit("refreshSheetPage")
      this.sheetInfo.startPage = startPage;
      this.sheetInfo.endPage = endPage;
    },
    /**
     * 为了尽量少获取数据，把原来添加在watch里面的刷新页面和页码方法抽取出来，减少数据获取和页面渲染
    */
    updateSheetPageInfo(pageArea) {
      let page = pageArea.split('-');
      const reg = /[^\d]/g
      let startPage = Number(page[0].replace(reg, '')||'0');
      let endPage = Number(page[1].replace(reg, '')||'0');
      const addPageLength = this.sheetInfo.addPage.length
      if (endPage >= startPage) {
        /**endPage 护记原本从接口拿回来的结束页码
        * maxPageIndex 目的护记的结束页码 因为有新增 所以会比接口返回的大
        * addPageLength 是新增页码的长度  如果为0则没有新增 如果有页码  就有新增
        */
        if (addPageLength) {
          this.$confirm('切页前请先保存新增页码数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //如果切页 就清空新增页码的数组
            this.updateCallBack({startPage,endPage,addPageLength})
          })
        } else {
          this.updateCallBack({startPage,endPage,pageArea})
          //刷新界面的方法里面 如果首页传参this.sheetInfo.findBlockContext.recordId 就调用这个方法
          this.positionPageFromHome()
        }
      }
    },
    changesCrollOptionFlag(val,type){
      if(type==1){
        this.scrollOptionFlag = val?false:true
        this.scrollOptionNum = val?1:2
      }else this.scrollOptionFlag =!val
    },
    scrollOption(){
      this.changesCrollOptionFlag(this.scrollOptionFlag)
      let inputScroll = document.querySelector(".otherType .el-input__inner")
      this.scrollOptionFlag || this.scrollOptionNum==2 ? inputScroll.focus() : inputScroll.blur()
    },
    openEMR() {
      // patient_id  患者id  visit_id  住院次数
      if (!this.patientInfo.patientId) {
        return this.$message.info("请选择一名患者");
      }
      let url = `http://192.168.37.203:8086?hospital_no=498784278&patient_id=${this.patientInfo.patientId}&visit_id=${this.patientInfo.visitId}&FILE_VISIT_TYPE=2`
      window.open(url, '_blank');
    },
    getPrintRecordData(){
      const fromParams = {
          patientId:this.sheetInfo.selectBlock.patientId,
          visitId:this.sheetInfo.selectBlock.visitId,
          formId:this.sheetInfo.selectBlock.id,
          formType:'record',
          formCode:this.sheetInfo.selectBlock.recordCode,
          formName:this.sheetInfo.selectBlock.recordName,
      }
      if(!this.sheetInfo.selectBlock.patientId){
        return;
      }
      getPrintRecord(fromParams)
      .then(res => {
        this.printRecord = res.data.data&&res.data.data.length>0?res.data.data:[{printName:'',printTime:'',nodData:true}];
        this.printRecordValue = this.printRecord[0]? this.printRecord[0]['printName']+' '+this.printRecord[0]['printTime']:'';
      }, err => {

      });
    },
    pageNumKeyDown(e) {
      if (e.keyCode == 13) {
        let startPage = Number(this.pageNum);
        let endPage = Number(this.pageNum);
        let tempPage = startPage;
        let count = startPage - tempPage;
        let scrollTop = 0;
        if (count != 0) {
          scrollTop = 722 * count + 20 * count;
        }
        startPage = tempPage;
        this.pageInfoObj.pageArea = `${startPage}-${endPage}`;
        setTimeout(() => {
          $(this.$parent.$refs.scrollCon).animate({
            scrollTop: scrollTop,
          });
        });
      }
    },
    //通过日期和时间，如果传起始页码 就是走根据时间定位页码的方法，如果无，则是首页任务栏跳转，拿findBlockContext的数据查询户籍记录
    getPageIndexByTime(blockStartDate,blockendDate){
      if(blockStartDate&&blockendDate){
      }else{
      const findBlockId = this.sheetInfo.findBlockContext&&this.sheetInfo.findBlockContext.blockId||this.blockId
      const findRecorDate = this.sheetInfo.findBlockContext&&this.sheetInfo.findBlockContext.recordDate
      if(!findBlockId) return
      return new Promise((resolve, reject) => {
        const params = {
            blockId: findBlockId,
            startRecordDate: findRecorDate,
            endRecordDate: findRecorDate
          }
          getPageIndex(params).then((res) => {
            if (res.data.code == 200) {
              let {startIndex , endIndex} = res.data&&res.data.data
              startIndex = startIndex + this.sheetInfo.sheetStartPage
              endIndex = endIndex + this.sheetInfo.sheetStartPage
              resolve(res.data.data)
              if (startIndex !== null && endIndex !== null && this.selectList.length) {
                for (let i = 0; i < this.selectList.length; i++) {
                  let selectListPage = this.selectList[i].value.split('-')
                  const ListStart = selectListPage[0]
                  const ListEnd = selectListPage[1]
                  if (startIndex >= ListStart && endIndex <= ListEnd){
                    this.pageArea = this.selectList[i].value
                  }
                }
                /*优先选择符合页码区间的数据，但是有时候 所选日期跨多个区间 所以直接赋值
                *比如['1-10','11-20'],查询的日期区间是  8-13 这时候没有所属的区间  所以直接pageArea = 8-13
                */
                if(!this.pageArea)
                this.pageArea = `${startIndex}-${endIndex}`
              }
            }
          })
      })
    }
    },
    //从首页进入 是无页码查询的 点击任务栏 只能拿到记录的BlockId和时间
    async positionPageFromHome() {
      const findRecordId = this.sheetInfo.findBlockContext&&this.sheetInfo.findBlockContext.recordId
      if (!findRecordId) return
      try {
        let todo = () => {
          return new Promise((resolve, reject) => {
            if (this.$parent.$refs.scrollCon && findRecordId) {
              $(this.$parent.$refs.scrollCon).animate({
                scrollTop:
                  $(`[recordId='${findRecordId}']`)
                    .eq(0)
                    .offset().top +
                  this.$parent.$refs.scrollCon.scrollTop -
                  350,
              });
              $(`[recordId='${findRecordId}']`)
                .eq(0)
                .addClass("red-border");
              resolve(true)
            }else{
              reject(false)
            }
          })
        }
        this.$nextTick(() => {
          const timer = setInterval(() => {
            if (this.sheetModel.length) {
              todo().then(() => {
                clearInterval(timer)
                //执行完成定位后 清空定位对象
                this.sheetInfo.findBlockContext = {}
                this.sheetInfo.isSave = true
              }).catch(()=>{
                clearInterval(timer)
              });
            }
          },
            200
          );
        });
      } catch (error) {
      }

    },
    //初始化页码方法
    /*护记的刷新  涉及到数据保存 删除 可能会影响到页码变化的 就调$emit("initSheetPageSize")
    *单纯需要刷新护记 的 调原来的$emit("refreshSheetPage")
    */
    async initSheetPageSize(isAddPageFlag) {
      !isAddPageFlag && await this.getHomePageInfo()
      await this.initSelectList(isAddPageFlag);
      // 判断是否存在recodeId
      // 获取被标记的页数，recordId是某一行的记录ID 如果从首页进来 就携带这个recordId ，否则走正常的页面定位
      try {
        /*this.selectList:string[] ['1-10','10-20']
        *页码会变动 如果页码数组已经变化 则取最新的，也就是this.selectList最后一个*/
        // 页码定位,如果首页点击任务进入，就是有findBlockContext.recordId
        if (this.sheetInfo.findBlockContext && this.sheetInfo.findBlockContext.recordId) {
          await this.getPageIndexByTime()
        } else {
          /**页码定位，每次初始化selectList 之前 都保存数据 selectList 到oldSelectList中
           * 如果涉及到数据增删需要初始化了页码的先判断selectList长度是否一样 ，如果一样就说明没有selectList新增 然后判断新旧页码是否一样  一样则选旧的
           * 如果找不到旧的页码了 ，则说明新删除增数据导致页码增减了  不一样则选最新的
           * */
          let pageSelectListValue = ''
          let old_list_length = this.oldSelectList.length;
          let new_list_length = this.selectList.length;
          let old_list_index = this.selectList.findIndex((item) => item.value == this.pageInfoObj.pageArea);
          pageSelectListValue = this.selectList[this.selectList.length - 1].value || "";
          if (old_list_length == new_list_length) {
            if (old_list_index != -1) {
              pageSelectListValue = this.selectList[old_list_index].value
            } else {
              //1-9 =======》 1-10  1>=1&&1<=10
              const page = this.selectList.find((list, index) => {
                const oldStart = this.pageInfoObj.pageArea.split('-')[0]
                const start = list.value.split('-')[0]
                const end = list.value.split('-')[1]
                return (+oldStart >= +start && +oldStart <= +end)
              })
              if(page&&page.value)
              pageSelectListValue = page.value
            }
          }
          this.pageArea = pageSelectListValue
          this.pageInfoObj.pageArea = pageSelectListValue
        }

        !isAddPageFlag && this.updateSheetPageInfo(this.pageArea)
      } catch (error) { }
    },
    showSetCreatePage() {
      return !this.isDeputy || ['guizhou', '925'].includes(this.HOSPITAL_ID);
    },
    //是否显示
    isShow() {
      if (
        this.HOSPITAL_ID === "beihairenyi" &&
        this.$route.path.includes("Baby_sheetPage")
      ) {
        return false;
      } else {
        return true;
      }
    },
    showPrintAll(){
        return ['huadu'].includes('this.HOSPITAL_ID')&&(!this.$route.path.includes("singleTemperatureChart")||!this.$route.path.includes("temperature"))
    },
    // 是否显示设为模板
    showSetAsTemplate() {
      if (this.HOSPITAL_ID === 'foshanrenyi' || this.HOSPITAL_ID === 'nfyksdyy') {
        return this.isRoleManage || this.isNewAdminOrNursingDepartment
      } else {
        return false
      }
    },
    /* 出入量统计弹框--花都区分 */
    openStaticModal() {
      if (!this.patientInfo.patientId) {
        return this.$message.info("请选择一名患者");
      }
      switch (process.env.HOSPITAL_ID) {
        case "huadu":
          this.bus.$emit("openHDModal");
          break;
        case "guizhou":
          this.bus.$emit("openGuizhouModal");
          break;
        case "nfyksdyy":{
          this.bus.$emit("checkChange",()=>{
            this.bus.$emit('saveSheetPage', 'noSaveSign')
          },()=>{this.bus.$emit("openHJModal")})
        }
          break;
        default: {
          if (this.sheetInfo.sheetType === 'inandout_weihai') {
            let y = moment()
              .subtract(1, "days")
              .format("YYYY-MM-DD");
            let t = moment().format("YYYY-MM-DD");
            let yt = y + " 07:00";
            let tt = t + " 07:00";
            this.bus.$emit('postWhsl', [yt, tt]);
          } else {
            this.bus.$emit("openHJModal");
          }
        }
        break;
      }
    },
    /* 打开体温曲线页面 */
    openChart() {
      this.queryTem = {
        admissionDate: this.sheetInfo.selectBlock.admissionDate,
        patientId: this.sheetInfo.selectBlock.patientId,
        visitId: this.sheetInfo.selectBlock.visitId,
      };
      this.$store.commit("newDialogVisible", true); //打开体温曲线
      this.bus.$emit("refreshImg"); //打开体温曲线

    },
    /* 打开婴儿的体温曲线页面 */
    openBabyChat() {
      this.$store.commit("showBabyChat", true);
      this.$store.commit("newDialogVisible", true);
    },

    emit(todo, value) {
      if (!this.patientInfo.patientId) {
        return this.$message.info("请选择一名患者");
      }
      if (this.sheetInfo.sheetType != "body_temperature_Hd") {
        if (this.readOnly) {
          return this.$message.warning("你无权操作此护记，仅供查阅");
        }
      }
      this.bus.$emit(todo, value);
    },

    tofull() {
      this.$store.commit("upSheetPageFullpage", !this.fullpage);
    },
    toSave() {
      if (process.env.HOSPITAL_ID == "nanfangzhongxiyi") {
        this.bus.$emit('toSheetSaveNoSign')
      }else{
        this.bus.$emit('saveSheetPage', 'noSaveSign')
      }
      this.sheetInfo.addPage = []
    },
      toPrint() {
      // 正式环境打印会打开窗口,个别医院双签名打印设置为不打开新窗口（打开窗口样式有bug）
      // 不打开窗口，打印完返回会有Bug（下拉不显示和表头不能修改）,只能重新加载页面
      const fromParams = {
          patientId:this.sheetInfo.selectBlock.patientId,
          visitId:this.sheetInfo.selectBlock.visitId,
          formId:this.sheetInfo.selectBlock.id,
          formType:'record',
          formCode:this.sheetInfo.selectBlock.recordCode,
          formName:this.sheetInfo.selectBlock.recordName,
      }
      if(['liaocheng','huadu','foshanrenyi','xiegang'].includes(this.HOSPITAL_ID)){
        this.$store.commit('upPreRouter',location.href)
      }
      if (!this.sheetInfo.selectBlock.id)
        return this.$message.warning("还没有选择护理记录单");
        //后端返回的上页或者下页数据 如果有长度 就说明打印不完整 需要调整一下页码
        const first = this.sheetInfo.extraData&&this.sheetInfo.extraData.first || []
        const last = this.sheetInfo.extraData&&this.sheetInfo.extraData.last || []
        if(['foshanrenyi'].includes(this.HOSPITAL_ID)){
          if (first.length || last.length) {
        let printArea = ''
        if (first.length && last.length) {
          printArea = `${Number(this.pageArea.split('-')[0]) - 1}-${Number(this.pageArea.split('-')[1]) + 1}`
        } else {
          if (first.length) {
            printArea = `${Number(this.pageArea.split('-')[0]) - 1}-${this.pageArea.split('-')[1]}`
          }
          if (last.length) {
            printArea = `${this.pageArea.split('-')[0]}-${Number(this.pageArea.split('-')[1]) + 1}`
          }
        }
      this.updateSheetPageInfo(printArea)
      }
        }
      /**
       * 护记加载完成后isDone会转为true 所有用循环半秒去查询一次 如果完成了 再走打印界面
      */
        this.checkSheetRender = setInterval(() => {
          if (sheetInfo.isDone) {
            clearInterval(this.checkSheetRender)
            this.checkSheetRender = null
            setTimeout(() => {
              if (
                process.env.HOSPITAL_ID == "fuyou" ||
                process.env.HOSPITAL_ID == "quzhou" ||
                process.env.HOSPITAL_ID == "huadu" ||
                process.env.HOSPITAL_ID === "foshanrenyi" ||
                process.env.HOSPITAL_ID == "liaocheng" ||
                process.env.HOSPITAL_ID == "xiegang"
              ) {
                this.bus.$emit("toSheetPrintPage");
              } else {
                if (process.env.NODE_ENV == "production") {
                  let newWid;
                  if (this.HOSPITAL_ID === 'whfk') {
                    newWid = window.open();
                    return this.bus.$emit("toSheetPrintPagewhfk", { newWid, fromParams });
                  } else {
                    if (!$(".sign-text").length) {
                      newWid = window.open();
                      return this.bus.$emit("toSheetPrintPage", newWid);
                    }
                    if (
                      $(".mark-mark-mark").length == 0 &&
                      $(".noSignRow").length == 0 &&
                      $(".multiSign").length == 0
                    ) {
                      newWid = window.open();
                    }
                    this.bus.$emit("toSheetPrintPage", newWid);
                  }
                } else {
                  this.bus.$emit("toSheetPrintPage");
                }
              }
            }, 500);
          }
        },
          200
        );
    },
    toAllPrint() {
      let pageIndex = 0;
      let pageLength = this.selectList.length;
      let htmlArr = [];
      function getHtml() {
        this.pageInfoObj.pageArea = this.selectList[pageIndex].value;
        this.$nextTick(() => {
          $(".sheet-page-container").each((index, el) => {
            let htmlText = el.outerHTML;
            htmlArr.push(htmlText);
          });
          pageIndex++;
          if (pageIndex < pageLength) {
            getHtml.call(this);
          } else {
            lodopPrint(htmlArr);
          }
        });
      }

      getHtml.call(this);
    },
    setPage() {
      if (!this.patientInfo.patientId) {
        return this.$message.info("请选择一名患者");
      }
      if (!this.sheetInfo.selectBlock.id) {
        return this.$message.warning("还没有选择护理记录单");
      }
      this.bus.$emit("openSetPageModal");
    },
    searchPageByDateModal() {
      if (!this.patientInfo.patientId) {
        return this.$message.info("请选择一名患者");
      }
      if (!this.sheetInfo.selectBlock.id) {
        return this.$message.warning("还没有选择护理记录单");
      }
      this.bus.$emit("openSearchPageByDateModal");
    },
    initSelectList(isAddPageFlag) {
      //如果是添加新页  那就再原本的数据长度上加 1
      return new Promise((resolve, reject) => {
        if(isAddPageFlag)
      this.sheetInfo.maxPageIndex = this.sheetInfo.maxPageIndex + 1
      let length = this.sheetInfo.maxPageIndex + this.sheetInfo.sheetStartPage;
      this.oldSelectList = this.selectList
      let pagelist = [];
      let rest_num = this.sheetInfo.sheetStartPage % 10;
      let num = Math.max(Math.ceil(length / 10), 1);
      for (let i = 0; i <= num; i++) {
        if (i * 10 + rest_num >= length) {
          pagelist.push(length);
          break;
        }
        if ((i + 1) * 10 >= this.sheetInfo.sheetStartPage) {
          pagelist.push(i * 10 + rest_num);
        }
      }
      pagelist[0] = this.sheetInfo.sheetStartPage;
      pagelist[pagelist.length - 1] = length;
      this.selectList = [];
      for (let i = 0; i < pagelist.length; i++) {
        if (i == pagelist.length - 1) {
        } else if (i == pagelist.length - 2) {
          this.selectList.push({
            value: `${pagelist[i]}-${pagelist[i + 1] - 1}`,
          });
        } else if (pagelist[i] <= pagelist[i + 1] - 1) {
          this.selectList.push({
            value: `${pagelist[i]}-${pagelist[i + 1] - 1}`,
          });
        }
      }
      /**数据分割后,需要将页码的计算保存，然后给有一些表头信息使用
       *
      */
      sheetInfo.selectList = this.selectList
      //不是添加新页 才刷新界面
      /* 刷新block分页信息 */
      if (
        this.patientInfo.patientId &&
        this.patientInfo.visitId &&
        this.deptCode
      ) {
        blockList(
          this.patientInfo.patientId,
          this.patientInfo.visitId,
          this.deptCode
        ).then((res) => {
          this.sheetBlockList.forEach((item) => {
            try {
              let currObj = res.data.data.list.find((obj) => obj.id == item.id);
              item.pageIndex = currObj.pageIndex;
              item.endPageIndex = currObj.endPageIndex;
              resolve(res)
            } catch (error) {}
          });

        });
      }
      })
    },
    querySearch(queryString, cb) {
      cb(this.selectList);
    },
    getPrev(index, bodyModel, val) {
      if (index < 0) return "";
      let tr = bodyModel[index];
      let value = tr.find((item) => {
        return item.key == val;
      }).value;
      if (value) {
        return value;
      } else {
        return this.getPrev(index - 1, bodyModel, val);
      }
    },
    getAllListAndCurrIndex(trArr) {
      let allList = [];
      let currIndex = 0;
      for (let i = 0; i < sheetModel.length; i++) {
        allList = allList.concat(sheetModel[i].bodyModel);
      }
      currIndex = allList.indexOf(trArr);
      return [allList, currIndex];
    },
    toMoreSign() {
      if (this.sheetInfo.selectRow.length) {
        window.openSignModal((password, empNo, signDate, dsvsRandom) => {
          let list = [];
          for (let trArr of this.sheetInfo.selectRow) {
            let trObj = {};
            for (let i = 0; i < trArr.length; i++) {
              trObj[trArr[i].key] = trArr[i].value;
            }
            let [allList, currIndex] = this.getAllListAndCurrIndex(trArr);
            list.push(
              Object.assign({}, trObj, {
                recordMonth: this.getPrev(currIndex, allList, "recordMonth"),
                recordHour: this.getPrev(currIndex, allList, "recordHour"),
                recordYear: this.getPrev(currIndex, allList, "recordYear"),
                patientId: this.patientInfo.patientId,
                visitId: this.patientInfo.visitId,
                pageIndex: this.index,
              })
            );
          }
          let data = {
            empNo,
            password,
            list,
            dsvsRandom,
          };
          sign(this.patientInfo.patientId, this.patientInfo.visitId, data).then(
            (res) => {
              for (let i = 0; i < res.data.data.length; i++) {
                let trArrClone = Tr(res.data.data[i]);
                let trArr = sheetInfo.selectRow[i];
                if (
                  trArr.find((item) => {
                    return item.key == "recordMonth";
                  }).value == ""
                ) {
                  trArrClone.find((item) => {
                    return item.key == "recordMonth";
                  }).value = "";
                }
                if (
                  trArr.find((item) => {
                    return item.key == "recordHour";
                  }).value == ""
                ) {
                  trArrClone.find((item) => {
                    return item.key == "recordHour";
                  }).value = "";
                }
                trArr.splice(0, trArr.length);
                for (let i = 0; i < trArrClone.length; i++) {
                  trArr.push(trArrClone[i]);
                }
              }
              this.sheetInfo.selectRow.splice(
                0,
                this.sheetInfo.selectRow.length
              );
              this.$notify.success({
                title: "提示",
                message: "批量签名成功",
              });
              this.bus.$emit("saveSheetPage");
            }
          );
        });
      } else {
        this.$alert("请按下 ctrl 键并单击选择需要签名的行", "批量签名提示", {
          confirmButtonText: "确定",
          callback: (action) => {},
        });
      }
    },
    toMoreAduit() {
      if (this.sheetInfo.selectRow.length) {
        window.openSignModal((password, empNo) => {
          let list = [];
          for (let trArr of this.sheetInfo.selectRow) {
            let trObj = {};
            for (let i = 0; i < trArr.length; i++) {
              trObj[trArr[i].key] = trArr[i].value;
            }
            let [allList, currIndex] = this.getAllListAndCurrIndex(trArr);
            list.push(
              Object.assign({}, trObj, {
                recordMonth: this.getPrev(currIndex, allList, "recordMonth"),
                recordHour: this.getPrev(currIndex, allList, "recordHour"),
                recordYear: this.getPrev(currIndex, allList, "recordYear"),
                patientId: this.patientInfo.patientId,
                visitId: this.patientInfo.visitId,
                pageIndex: this.index,
              })
            );
          }
          let data = {
            empNo,
            password,
            list,
            audit: true,
          };
          sign(this.patientInfo.patientId, this.patientInfo.visitId, data).then(
            (res) => {
              for (let i = 0; i < res.data.data.length; i++) {
                let trArrClone = Tr(res.data.data[i]);
                let trArr = sheetInfo.selectRow[i];
                if (
                  trArr.find((item) => {
                    return item.key == "recordMonth";
                  }).value == ""
                ) {
                  trArrClone.find((item) => {
                    return item.key == "recordMonth";
                  }).value = "";
                }
                if (
                  trArr.find((item) => {
                    return item.key == "recordHour";
                  }).value == ""
                ) {
                  trArrClone.find((item) => {
                    return item.key == "recordHour";
                  }).value = "";
                }
                trArr.splice(0, trArr.length);
                for (let i = 0; i < trArrClone.length; i++) {
                  trArr.push(trArrClone[i]);
                }
              }
              this.sheetInfo.selectRow.splice(
                0,
                this.sheetInfo.selectRow.length
              );
              this.$notify.success({
                title: "提示",
                message: "批量审核成功",
              });
              this.bus.$emit("saveSheetPage");
            }
          );
        });
      } else {
        this.$alert("请按下 ctrl 键并单击选择需要签名的行", "批量签名提示", {
          confirmButtonText: "确定",
          callback: (action) => {},
        });
      }
    },
    async getBlockList() {
      if (this.$route.path.includes("nursingPreview") || this.$route.path.includes("nursingTemperature")) {
        let { data } = await getPatientInfo(
          this.$route.query.patientId,
          this.$route.query.visitId
        );
        this.$store.commit("upDeptCode", data.data.wardCode);
      }
      if (
        this.patientInfo.patientId &&
        this.patientInfo.visitId &&
        this.deptCode
      ) {

        blockList(
          this.patientInfo.patientId,
          this.patientInfo.visitId,
          this.deptCode
        ).then((res) => {
          this.bus.$emit("setSheetTableLoading", false);
          this.oldSelectList = this.selectList
          this.selectList = [];
          let list = res.data.data.list;
          if (
            this.$route.path.includes("singleTemperatureChart") ||
            this.$route.path.includes("temperature") ||
            this.$route.path.includes("Baby_sheetPage") ||
            (this.$route.path.includes("nursingPreview") && this.isNursingPreview)
          ) {
            this.sheetBlockList = list.filter((item) => {
              switch (this.HOSPITAL_ID) {
                case "huadu":
                  return item.recordCode === "body_temperature_Hd";
                case "fuyou":
                  return item.recordCode === "body_temperature_jm";
                case "hj":
                  return item.recordCode === "body_temperature_hj";
                case "beihairenyi":
                  return item.recordCode === "infant_bh";
                // case "hengli":
                //   return item.recordCode === "body_temperature_hl";
                case "beihairenyi":
                  return item.recordCode === "body_temperature_bhry";
                case "wujing":
                  return item.recordCode === "body_temperature_wj";
                default:
                  break;
              }
            });
          } else {
            this.sheetBlockList = list.filter((item) => {
              return (
                (item.recordCode != "body_temperature_Hd") &
                (item.recordCode != "body_temperature_hj") &
                (item.recordCode != "body_temperature_hl") &
                (item.recordCode != "body_temperature_wj")
              );
            });
          }
          //选择接口最后一个护记
          this.sheetInfo.selectBlock =this.sheetBlockList[this.sheetBlockList.length - 1] || {};
          if (!this.sheetBlockList.length) {
            this.sheetInfo.relObj = {}
            this.bus.$emit('clearSheetModel')
              // 如果该病人没有护记，切换病人时需要清空分页
              setTimeout(()=>{
                this.pageArea = ''
              this.pageInfoObj.pageArea = ''
              })
            }
            if (this.patientInfo.blockId) {
              try {
                let index = this.sheetBlockList.findIndex(
                  (item) => item.id == this.patientInfo.blockId
                );
                if (index > -1) {
                  this.sheetInfo.selectBlock = this.sheetBlockList[index]
                }
              } catch (e) {
              }
          }
          this.sheetInfo.sheetType = this.sheetInfo.selectBlock.recordCode;
          if( this.HOSPITAL_ID === 'whfk'&& this.sheetInfo.selectBlock.patientId){
            this.getPrintRecordData();
          }
        });
      }
    },
    createSheet() {
      if (!this.patientInfo.patientId) {
        return this.$message.info("请选择一名患者");
      }
      this.$refs.newFormModal.open();
    },
    // 设为模板(打开选择弹框)
    openSelectTmp() {
      if (!this.patientInfo.patientId) {
        return this.$message.info("请选择一名患者");
      }
      if (this.sheetTitleData.FieldSetting && this.sheetTitleData.FieldSetting.length) {
        //设置起始页后  页码要从起始页开始
        this.$refs.tmpModal.open(this.sheetInfo.maxPageIndex,this.sheetInfo.sheetStartPage)
      } else {
        return this.$message.info("无自定义表头，无法设置为模板");
      }
    },
     openTemplateSlider() {
      //打开编辑特殊记录的弹框
      switch(this.HOSPITAL_ID){
        case "nfyksdyy":
      this.$refs.templateSlide.open();
        break;
      }
    },
    openTitleTemplateSlide() {
      if (['nfyksdyy'].includes(this.HOSPITAL_ID)) {
        this.$refs.titleTemplateSlideFS.open();
        return
      }
      this.$refs.titleTemplateSlide.open();
    },
    // 设为模板
    async setAsTemplate(selectPage) {
      //设置模板 需要把开头的
      selectPage = selectPage - this.sheetInfo.sheetStartPage
      const list = this.sheetTitleData.FieldSetting.filter(
        item => item.pageIndex === selectPage
      ).map((item, index) => {
        const options = this.sheetTitleData.Options.filter(
          (op) => op.fieldEn === item.fieldEn && op.pageIndex === selectPage
        ).map((op) => op.options).join(',')
        return {
          recordCode: this.sheetInfo.sheetType,
          deptCode: this.deptCode,
          fieldEn: item.fieldEn,
          fieldCn: item.fieldCn,
          options
        }
      })
      const res = await setSheetTemplate(list)
      this.$refs.tmpModal.close()
      this.$message.success('设置成功')
    },
    createTemperature() {
      this.$refs.newFormModal.open();
    },
    openSpecialSymbols() {
      this.$refs.templateSlide.open();
    },
    delSheet() {
      if (!this.sheetInfo.selectBlock.id)
        return this.$message.warning("还没有选择护理记录单");
      this.$confirm("此操作将永久删除该护理记录单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$emit('sheetDelete', this.sheetInfo.selectBlock)
        blockDelete(this.sheetInfo.selectBlock.id).then((res) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          // 刷新
          this.getBlockList();
        });
      });
    },
    blockLabel(item, length) {
      if(['foshanrenyi'].includes(this.HOSPITAL_ID)) return ''
      return `${item.deptName} ${dayjs(item.createTime).format(
        "MM-DD"
      )}建 共${length}张
      `;
      // }
    },
    getHomePageInfo() {
      if(!this.patientInfo.patientId||!this.patientInfo.visitId||!this.sheetInfo.selectBlock.id) return
      return new Promise((resolve, reject) => {
        getHomePage(this.patientInfo.patientId, this.patientInfo.visitId).then(
          (res) => {
            if (res.data.code == 200) {
              this.sheetInfo.sheetStartPage =
                (res.data.data && res.data.data.indexNo) || 1;
              this.sheetInfo.sheetMaxPage =
                (res.data.data && res.data.data.maxIndexNo) || 1;
              this.sheetInfo.maxPageIndex =
                (res.data.data && res.data.data.maxPageIndex + 1) || 1;
              resolve(res)
            } else {
              reject(false)
            }
          });
      })
    },
    changeSelectBlock(item) {
      localStorage.setItem('sheetPageScrollValue',null)
      //原本写在选择器里 现在搬到watch离监听调用
      // 添加护记头部标签
      if (item && typeof item !== 'boolean' && item.id) {
        this.$emit('mountSheetTag', item);
      }
    },
    /** pdf打印 */
    toPdfPrint() {
      if (sheetInfo.selectBlock.id) {

        if( this.HOSPITAL_ID === 'whfk'){
          window.open(
            `/crNursing/toPdfPrint?blockId=${sheetInfo.selectBlock.id}&patientId=${sheetInfo.selectBlock.patientId}&visitId=${sheetInfo.selectBlock.visitId}&formId=${sheetInfo.selectBlock.id}&formType=${'record'}&formCode=${sheetInfo.selectBlock.recordCode}&formName=${sheetInfo.selectBlock.recordName}`
          )
          }else{
            window.open(
              `/crNursing/toPdfPrint?blockId=${sheetInfo.selectBlock.id}`
            );
        }
      } else {
        this.$message.warning("没有可以打印的护理记录单");
      }
    },
    openTztbModal() {
      if (this.readOnly) {
        return this.$message.warning("你无权操作此护记，仅供查阅");
      }
      if(['nfyksdyy'].includes(this.HOSPITAL_ID)){
        this.bus.$emit("checkChange",()=>{
          this.bus.$emit('saveSheetPage', 'noSaveSign')
        },()=>{this.$refs.tztbModal.open()})
      }else this.$refs.tztbModal.open();
    },
    pgtbModel(){
      if(['nfyksdyy'].includes(this.HOSPITAL_ID)){
        this.bus.$emit("checkChange",()=>{
          this.bus.$emit('saveSheetPage', 'noSaveSign')
        },()=>{this.emit('openEvalModel')})
      }else this.emit('openEvalModel')
    },
    openZxdtbModal() {
      if (this.readOnly) {
        return this.$message.warning("你无权操作此护记，仅供查阅");
      }
      if (this.HOSPITAL_ID == "wujing") {
        this.modalWidth = document.body.clientWidth - 150;
        this.modalHeight = document.body.clientHeight - 100
      }
      if (this.HOSPITAL_ID == "gdtj") {
        this.modalWidth = 850;
      }
      if (['guizhou', '925'].includes(this.HOSPITAL_ID)) {
        this.titleName = "输血同步";
      } else {
        this.titleName = "执行单同步";
      }
      if(['nfyksdyy'].includes(this.HOSPITAL_ID)){
        this.bus.$emit("checkChange",()=>{
          this.bus.$emit('saveSheetPage', 'noSaveSign')
        },()=>{this.$refs.zxdtbModal.open()})
      }else this.$refs.zxdtbModal.open();

    },
    openRltbModal() {
      if (this.readOnly) {
        return this.$message.warning("你无权操作此护记，仅供查阅");
      }

      if (['nanfangzhongxiyi'].includes(this.HOSPITAL_ID)) {
        this.$refs.rltbNfzxyModal.open()
        return
      }
      this.$refs.rltbModal.open();
    },
    /* 切换主页 */
    async backMainForm() {
      if (isWJ) return this.switchPage()
      const id = this.sheetInfo.selectBlock.id;
      const { data } = await switchAdditionalBlock(id);
      this.sheetInfo.selectBlock = data.data;
      this.changeSelectBlock(false);
    },
    /* 切换副页 */
    async addDeputyForm() {
      if (isWJ) return this.switchPage()
      const id = this.sheetInfo.selectBlock.id;
      const { data } = await switchAdditionalBlock(id);
      this.sheetInfo.selectBlock = data.data;
      this.changeSelectBlock(false);
    },
    // 武警切换主副页
    switchPage() {
      const curSheetType = this.sheetInfo.sheetType
      if (!['common_wj', 'generalcare_wj'].includes(curSheetType)) return this.defSwitch()
      // 主页
      if (curSheetType === 'common_wj') {
        this.sheetInfo.sheetType = this.sheetInfo.selectBlock.recordCode = 'generalcare_wj'
        this.sheetInfo.selectBlock.additionalBlock = true
        this.sheetInfo.selectBlock.additionalCode = ""
      // 副页
      } else {
        this.sheetInfo.selectBlock.additionalBlock = false
        this.sheetInfo.selectBlock.additionalCode = curSheetType
        this.sheetInfo.sheetType = this.sheetInfo.selectBlock.recordCode = 'common_wj'
      }
      cleanData()
      this.initSheetPageSize()
    },
    async defSwitch() {
      const id = this.sheetInfo.selectBlock.id;
      const { data } = await switchAdditionalBlock(id);
      this.sheetInfo.selectBlock = data.data;
      this.changeSelectBlock(false);
    },
    // 同步护理巡视
    syncVisitWithData() {
      this.$refs.patientInfoModal.open();
    },
    hisDocPreview(type) {
      switch (type) {
        case "deputy":
          return (
            ['guizhou', '925'].includes(this.HOSPITAL_ID) &&
            !this.isDeputy &&
            this.$route.path.includes("nursingPreview")
          );
        case "main":
          return (
            ['guizhou', '925'].includes(this.HOSPITAL_ID) &&
            this.isDeputy &&
            this.$route.path.includes("nursingPreview")
          );
        default:
          return false;
      }
    },
  },
  computed: {

    limitAddPage(){
      const lastPage = this.pageArea&&this.pageArea.split('-')[1]
      return this.selectList.length && this.selectList[this.selectList.length - 1].value.split('-')[1] === lastPage
    },
    pageInfoObj: {
      get() {
        return {
          pageArea: this.pageArea,
          blockId: this.pageBlockId
        }
      },
    },
    blockId: {
      get() {
        return this.sheetInfo.selectBlock.id;
      },
      set() {},
    },

    fullpage() {
      return this.$store.state.sheet.fullpage;
    },
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
    patientId() {
      return this.$store.state.sheet.patientInfo.patientId;
    },
    showCrl() {
      switch (this.sheetInfo.sheetType) {
        // case "trauma_orthopedics":
        // case "orthopedics":
        //   return false;
        default:
          return true;
      }
    },
    /** 只读模式 */
    readOnly() {
      if(this.readOnlyList.includes(this.HOSPITAL_ID)){
        let controlReadOnly = this.sheetInfo.masterInfo.readOnly //后端控制readOnly为true只能查阅，不能修改
        if (controlReadOnly) {
          return true
        }
      } else {
        return !this.userDeptList
        .map(item => item.code)
        .includes(this.sheetInfo.selectBlock.deptCode);
      }
    },
    /* 监听路由是否是单个体温单 */
    isSingleTem() {
      return this.$route.path.includes("singleTemperatureChart");
    },
    /* 聊城二院体温单屏蔽三个功能：“出入量统计”、"评估同步"、“体征同步” */
    isSingleTem_LCEY() {
      return (
        this.HOSPITAL_ID === "liaocheng" &&
        this.$route.path.includes("singleTemperatureChart")
      );
    },
    /* 贵州人医“出入量统计”移入出入量记录单 */
    isSingleTem_GZRY() {
      return ['guizhou'].includes(this.HOSPITAL_ID);
    },
    /* 是否是副页 */
    isDeputy() {
      return (
        this.sheetInfo.selectBlock && this.sheetInfo.selectBlock.additionalBlock
      );
    },
    /* 监听体温单曲线 */
    temperatureChart() {
      switch (this.HOSPITAL_ID) {
        case "huadu":
          return temperatureHD;
        default:
          break;
      }
    },
    // 显示入量同步
    showRltbN() {
      // return ['nanfangzhongxiyi'].includes(this.HOSPITAL_ID)
    },
    // 选择表单下拉框的输入框所显示的文字
    selectText() {
      if (this.sheetInfo.selectBlock && this.sheetInfo.selectBlock.deptName) {
        const item = this.sheetInfo.selectBlock
        return `<span>${item.deptName} ${dayjs(item.createTime).format(
          "MM-DD")}建 </span><span style="color:red">共${this.sheetBlockList.length}张</span>`
      }
      return ''
    },
    // 是否为武警
    isGeneralCareWj () {
      return this.sheetInfo.sheetType === 'generalcare_wj'
    },
  },
  created() {
    this.bus.$on("initSheetPageSize", (isAddPageFlag) => {
      /**
       * isAddPageFlag:boolean
       * 因为现在从接口拿数据渲染界面 不走前端computed计算界面 所以添加新页面得加判断
       * 比如说 后端接口页面是7页 前端添加新页后为8 这时候页码改动，如果不加判断就会重新请求数据 后端为7 前端为8 页码数值就会对应不上
      */
      this.initSheetPageSize(isAddPageFlag)
    });
    this.bus.$on("openSearchPageByDateModal", () => {
      this.$refs.searchPageByDateModal.open();
    });
    this.bus.$on("toSheetMoreSign", () => {
      this.toMoreSign();
    });
    this.bus.$on("toSheetMoreAudit", () => {
      this.toMoreAduit();
    });
    this.bus.$on("getBlockList", () => {
      this.getBlockList();
    });
    document.onkeydown = (e) => {
      if (e.keyCode == 91 || e.keyCode == 17) {
        this.sheetInfo.downControl = true;
      }
    };
    document.onkeyup = (e) => {
      if (e.keyCode == 91 || e.keyCode == 17) {
        this.sheetInfo.downControl = false;
      }
    };
    this.getBlockList();

  },
  mounted() {
    if( this.HOSPITAL_ID === 'whfk' && this.sheetInfo.selectBlock.patientId){
      this.getPrintRecordData();
    }
    document.querySelector("#sheet_body_con").addEventListener("click", () => {
      if (!this.sheetInfo.downControl) {
        this.sheetInfo.selectRow.splice(0, this.sheetInfo.selectRow.length);
      }
    });
    this.bus.$emit("sheetToolLoaded");

  },
  destroyed(){
    this.checkSheetRender = null
  },
  watch: {
    sheetTagInfo: {
      handler(val) {
        if (val) {
          this.sheetInfo.selectBlock = val
        }
      }, deep: true
    },
    "sheetInfo.selectBlock":{
      deep:true,
      handler(val) {
        if (val) {
          localStorage.wardCode = val.deptCode;
          this.pageBlockId = val.id;
        }
        cleanData();
        this.sheetInfo.sheetType = this.sheetInfo.selectBlock.recordCode;
        this.initSheetPageSize()
      },
    },
    "sheetInfo.startPage"() {
      $(this.$parent.$refs.scrollCon).animate({
        scrollTop: 0,
      });
    },
    patientId:{
      handler() {
        this.oldSelectList = []
        this.selectList = [];
          this.$parent.breforeQuit(() => {
            this.bus.$emit("setSheetTableLoading", true);
            this.sheetInfo.addPage = []
            // 初始化页面区间列表
            this.getBlockList()
            if (this.sheetBlockList.length == 0)
              this.bus.$emit("setSheetTableLoading", false);
          });
          if (this.$route.path.includes("singleTemperatureChart")) {
            this.bus.$emit("refreshImg");
            this.bus.$emit("refreshVitalSignList");
          }
      },
    },

    $route(to, from) {
      if (to.name != from.name) {
        this.getBlockList();
      }
    },
    pageNum(value) {
      let temPage = parseInt(Number(value) / 10);
      let count = parseInt(Number(value) % 10);
      if (temPage && count) {
        this.firstPage = temPage * 10 + 1;
      } else if (temPage == 0 && Number(value) == 0) {
        this.firstPage = 1;
      } else if (temPage && !count) {
        this.firstPage = (temPage - 1) * 10 + 1;
      }
    },
  },
  components: {
    setPageModal,
    newFormModal,
    setTitleModal,
    tztbModal,
    zxdtbModal,
    rltbModal,
    moveContext,
    patientInfoModal,
    templateSlide,
    templateSlideFSRY,
    patientInfo,
    temperatureHD,
    RltbNfzxyModal,
    demonstarationLevca,
    selectPageModal,
    searchPageByDateModal,
    titleTemplateSlideFS,
    PreviewPDF,
    MarkModal
  },
};
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus"
  src="./tool.styl"
  scoped
></style>

<style lang="stylus" scoped>
.pegeSelect {
  >>> .el-input__inner {
    width: 85px;
    border: 0 !important;
    font-size: 12px;
    color: #333333;
  }
}

.label {
  font-size: 12px;
  color: #333;
}
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.select-box {
  // /deep/ .adddiv {
  //   position: absolute;
  //   top: 7px;
  //   left:10px;
  //   .font{
  //     font-weight:700;
  //   }
  //   .addspan1{
  //     font-size: 14px;
  //     &::before {
  //       content: attr(data-content1);
  //     }
  //   }
  //   .addspan2{
  //     font-size: 15px;
  //     &::before {
  //       content: attr(data-content2);
  //       color:red;
  //     }
  //   }
  // }
  .float-text {
    position: absolute;
    z-index: 10;
    width: 100%;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    cursor: pointer;
    padding-left: 2px;
    font-size: 14px;
  }
}
.sheetSelect-con-sheet {
  background: #FFFFFF;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  width: 562px !important;
  left: auto !important;
  right: 120px;

  .el-select-dropdown__list, .el-select-dropdown__item {
    padding: 0;
    height: auto;
  }

  .el-select-dropdown__wrap {
    max-height: 500px;
  }

 .head-con {
   height: 37px;
   background: #F7FAFA;
   border-bottom: 1px solid #EAEEF1;
   font-size: 13px;
   color: #333333;
   font-weight: bold;
 }

  .col-1, .col-2, .col-3, .col-4 {
    display: flex;
    align-items: center;
  }

  .col-1 {
    width: 192px;
    padding: 0 24px;
    border-right: 1px solid #EAEEF1;
  }

  .col-2 {
    width: 126px;
    padding: 0 16px;
    border-right: 1px solid #EAEEF1;
  }

  .col-3 {
    width: 133px;
    padding: 0 14px;
    border-right: 1px solid #EAEEF1;
  }

  .col-4 {
    width: 80px;
    padding: 0 14px;
  }

  .list-con {
    font-size: 13px;
    color: #333333;
    height: 37px;
    border-bottom: 1px solid #EAEEF1;
  }

  .el-select-dropdown__item.selected {
    background: #fff;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 9px;
      height: 20px;
      width: 4px;
      background: #4bb08d;
    }
  }

  .el-select-dropdown__item.hover {
    background: #fff;
  }

  .el-select-dropdown__item:hover {
    background: #E5F1F0;
  }
}
.whfk-select-con {
  width: 80px;
  margin-right:10px;
}
>>>.whfk-select-con .el-input__inner {
  width: 85px !important;
}
.sheetSelect-con-sheet-print .el-select-dropdown__item.selected:after {
  content: '';
  position: absolute;
  left: 0;
  top: 9px;
  height: 20px;
  width: 4px;
  background: #fff;
}
.red-border {
  border: 2px solid red !important;
}
.tempSweetModal {
  /deep/ .sweet-modal {
    width: 90% !important;
    overflow: hidden !important;
  }

  /deep/ .sweet-content {
    background: #dfdfdf;
    max-height: 105vh !important;
  }
}

#is-deputy-btn {
  background: none !important;
  pointer-events: auto !important;
}
.tool-contain {
  display: flex;
  align-items: center;
  z-index: 4 !important;
  overflow-x: hidden;
  white-space: nowrap;
  overflow-y: hidden;
  &.hidden-left {
    width: 120%;
    overflow-x: hidden;
  }
  &:hover {
    overflow-x: auto; // 防止 overlay 不兼容
    overflow-x: overlay; // 滚动条不占高度
  }
}

.babyChat {
  position: absolute;
  right: 0;
  top: 15px;
  width: 85%;
  height: 100%;
  z-index: 999;
  box-shadow: -2px 0 7px -1px black; // 左边阴影;
  background-color: white;
}
.searchPageByDate {
  padding:0 0 0 3px;
  color:#606467;
  white-space: nowrap;
}
</style>
