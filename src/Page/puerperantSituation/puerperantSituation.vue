<template>
  <div class="puerperant-situation">
    <div class="search-topbar">
      <div class="float-left">
        <h3>产科分娩登记表</h3>
      </div>
      <div class="float-right">
        <span class="type-label">创建时间:</span>
        <span class="type-content">
          <el-date-picker @change="handleDateChange" v-model="query.startDate" :clearable="false" style="width:120px;"/>
          <span> - </span>
          <el-date-picker @change="handleDateChange" v-model="query.endDate" :clearable="false" style="width:120px;"/>
        </span>
        <span class="search-el">
          <el-input placeholder="姓名/住院号" v-model="query.searchingContent" @blur="handleSearch" />
        </span>
        <el-button @click="handleSearch">查询</el-button>
        <el-button @click="handleCreate">新建记录</el-button>
      </div>
    </div>
    <div class="main-contain">
      <div class="table-contain">
        <ecrm-table
          :data="tableData"
          :span-method="objectSpanMethod"
          border
          :row-class-name="rowClassName"
          :cell-class-name="cellClassName"
          :height="tableHeight"
          @cell-mouse-enter="handleCellEnter"
          @cell-mouse-leave="handleCellLeave"
          @cell-click="handleCellClick"
          @row-contextmenu="handleRowContextmenu"
          v-loading="tableLoading"
          style="width: 100%;"
        >
          <ecrm-table-column prop="hospitalizationNumber" label="住院号" width="100" fixed="left">
            <template slot-scope="scope">
              <span v-if="scope.$index%2==0">{{scope.row.hospitalizationNumber}}</span>
              <span v-else></span>
            </template>
          </ecrm-table-column>
          <ecrm-table-column prop="female" label="姓名" width="134" fixed="left">
            <template slot-scope="scope">
              <span v-if="scope.$index%2==0">
                <el-input
                  resize="none"
                  type="textarea"
                  @blur="handleEditDone(scope.$index,'female')"
                  :autosize="{ minRows: 1}"
                  v-model="scope.row.female"/>
              </span>
              <span v-else>
                <span style="margin-left:6px;">丈夫:</span>
                <el-input
                  resize="none"
                  type="textarea"
                  @blur="handleEditDone(scope.$index,'man')"
                  style="display: inline-block;vertical-align: middle;width:74px;"
                  :autosize="{ minRows: 1}"
                  v-model="scope.row.man"/>
              </span>
            </template>
          </ecrm-table-column>
          <ecrm-table-column label="产妇情况" align="center">
            <ecrm-table-column prop="femaleId" label="身份证号码" width="140">
              <template slot-scope="scope">
                <span v-if="scope.$index%2==0">
                  <el-input
                  resize="none"
                  type="textarea"
                  @blur="handleEditDone(scope.$index,'femaleId')"
                  :autosize="{ minRows: 1}"
                  v-model="scope.row.femaleId"/>
                </span>
                <span v-else>
                  <el-input
                  resize="none"
                  type="textarea"
                  @blur="handleEditDone(scope.$index,'manId')"
                  :autosize="{ minRows: 1}"
                  v-model="scope.row.manId"/>
                </span>
              </template>
            </ecrm-table-column>
            <ecrm-table-column prop="femaleAge" label="年龄" width="60">
              <template slot-scope="scope">
                <span v-if="scope.$index%2==0">
                  <el-input
                    resize="none"
                    type="textarea"
                    :class="'femaleAge'+scope.$index"
                    @change="(val)=>handleNumInput(val,scope.$index,'femaleAge')"
                    @blur="handleEditDone(scope.$index,'femaleAge')"
                    :autosize="{ minRows: 1}"
                    v-model="scope.row.femaleAge"/>
                </span>
                <span v-else>
                  <el-input
                    resize="none"
                    type="textarea"
                    :class="'manAge'+scope.$index"
                    @change="(val)=>handleNumInput(val,scope.$index,'manAge')"
                    @blur="handleEditDone(scope.$index,'manAge')"
                    :autosize="{ minRows: 1}"
                    :value="scope.row.manAge"/>
                </span>
              </template>
            </ecrm-table-column>
            <ecrm-table-column prop="femaleBrithPlace" label="籍贯" width="60">
              <template slot-scope="scope">
                <span v-if="scope.$index%2==0">
                  <el-input
                  resize="none"
                  type="textarea"
                  @blur="handleEditDone(scope.$index,'femaleBrithPlace')"
                  :autosize="{ minRows: 1}"
                  v-model="scope.row.femaleBrithPlace"/>
                </span>
                <span v-else>
                  <el-input
                  resize="none"
                  type="textarea"
                  @blur="handleEditDone(scope.$index,'manBrithPlace')"
                  :autosize="{ minRows: 1}"
                  v-model="scope.row.manBrithPlace"/>
                </span>
              </template>
            </ecrm-table-column>
            <ecrm-table-column prop="femaleJob" label="职业" width="100">
              <template slot-scope="scope">
                <span v-if="scope.$index%2==0">
                  <el-input
                  resize="none"
                  type="textarea"
                  @blur="handleEditDone(scope.$index,'femaleJob')"
                  :autosize="{ minRows: 1}"
                  v-model="scope.row.femaleJob"/>
                </span>
                <span v-else>
                  <el-input
                  resize="none"
                  type="textarea"
                  @blur="handleEditDone(scope.$index,'manJob')"
                  :autosize="{ minRows: 1}"
                  v-model="scope.row.manJob"/>
                </span>
              </template>
            </ecrm-table-column>
            <ecrm-table-column prop="femaleEdu" label="文化程度" width="90">
              <template slot-scope="scope">
                <span v-if="scope.$index%2==0">
                  <el-select v-model="scope.row.femaleEdu" @change="()=>handleEditDone(scope.$index,'femaleEdu')"  placeholder=" ">
                    <el-option v-for="(item,idx) in eduOptions" :key="idx" :value="item" :label="item"></el-option>
                  </el-select>
                </span>
                <span v-else>
                  <el-select v-model="scope.row.manEdu" @change="()=>handleEditDone(scope.$index,'manEdu')" placeholder=" ">
                    <el-option v-for="(item,idx) in eduOptions" :key="idx" :value="item" :label="item"></el-option>
                  </el-select>
                </span>
              </template>
            </ecrm-table-column>
            <ecrm-table-column prop="femaleBirthAddress" label="户口地址(市、镇、村)" width="210">
              <template slot-scope="scope">
                <span v-if="scope.$index%2==0">
                  <el-input
                  resize="none"
                  type="textarea"
                  @blur="handleEditDone(scope.$index,'femaleBirthAddress')"
                  :autosize="{ minRows: 1}"
                  v-model="scope.row.femaleBirthAddress"/>
                </span>
                <span v-else>
                  <el-input
                  resize="none"
                  type="textarea"
                  @blur="handleEditDone(scope.$index,'manBirthAddress')"
                  :autosize="{ minRows: 1}"
                  v-model="scope.row.manBirthAddress"/>
                </span>
              </template>
            </ecrm-table-column>
            <ecrm-table-column prop="nowAddress" label="现住地址" width="120">
              <template slot-scope="scope">
                <el-input
                  resize="none"
                  type="textarea"
                  @blur="handleEditDone(scope.$index,'nowAddress')"
                  :autosize="{ minRows: 1}"
                  v-model="scope.row.nowAddress"/>
              </template>
            </ecrm-table-column>
            <ecrm-table-column prop="dangerousSituation" label="高危情况" width="150" align="center">
              <template slot-scope="scope">
                <el-input
                  resize="none"
                  type="textarea"
                  @blur="handleEditDone(scope.$index,'dangerousSituation')"
                  :autosize="{ minRows: 1}"
                  v-model="scope.row.dangerousSituation"/>
              </template>
            </ecrm-table-column>
            <ecrm-table-column prop="pregnancyWeek" label="孕周" width="60" align="center">
              <template slot-scope="scope">
                <el-input
                  resize="none"
                  type="textarea"
                  :class="'pregnancyWeek'+scope.$index"
                  @change="(val)=>handleNumInput(val,scope.$index,scope.column)"
                  @blur="handleEditDone(scope.$index,'pregnancyWeek')"
                  :autosize="{ minRows: 1}"
                  v-model="scope.row.pregnancyWeek"/>
              </template>
            </ecrm-table-column>
            <ecrm-table-column prop="pregnancyTimes" label="孕次" width="60" align="center">
              <template slot-scope="scope">
                <el-input
                  resize="none"
                  type="textarea"
                  :class="'pregnancyTimes'+scope.$index"
                  @change="(val)=>handleNumInput(val,scope.$index,scope.column)"
                  @blur="handleEditDone(scope.$index,'pregnancyTimes')"
                  :autosize="{ minRows: 1}"
                  v-model="scope.row.pregnancyTimes"/>
              </template>
            </ecrm-table-column>
            <ecrm-table-column prop="birthTimes" label="产次" width="60" align="center">
              <template slot-scope="scope">
                <el-input
                  resize="none"
                  type="textarea"
                  :class="'birthTimes'+scope.$index"
                  @change="(val)=>handleNumInput(val,scope.$index,scope.column)"
                  @blur="handleEditDone(scope.$index,'birthTimes')"
                  :autosize="{ minRows: 1}"
                  v-model="scope.row.birthTimes"/>
              </template>
            </ecrm-table-column>
            <ecrm-table-column label="破膜时间" width="100" align="center">
              <ecrm-table-column prop="artiBrokenMembraneTime" label="人工" width="100" align="center">
                <template slot-scope="scope">
                  <span style="cursor:pointer;">
                    <span>{{formatDate(scope.row.artiBrokenMembraneTime,'D/M')}}</span>
                    <br />
                    <span>{{formatDate(scope.row.artiBrokenMembraneTime,'H:m')}}</span>
                  </span>
                </template>
              </ecrm-table-column>
              <ecrm-table-column prop="natureBrokenMenbraneTime" label="自然" width="100" align="center">
                <template slot-scope="scope">
                  <span style="cursor:pointer;">
                    <span>{{formatDate(scope.row.natureBrokenMenbraneTime,'D/M')}}</span>
                    <br />
                    <span>{{formatDate(scope.row.natureBrokenMenbraneTime,'H:m')}}</span>
                  </span>
                </template>
              </ecrm-table-column>
            </ecrm-table-column>
            <ecrm-table-column label="产程时间(小时)" width="100" align="center">
              <ecrm-table-column prop="productionProcess1" label="一" width="100" align="center">
                <template slot-scope="scope">
                  <el-input
                    resize="none"
                    type="textarea"
                    @blur="handleEditDone(scope.$index,'productionProcess1')"
                    :autosize="{ minRows: 1}"
                    v-model="scope.row.productionProcess1"/>
                </template>
              </ecrm-table-column>
              <ecrm-table-column prop="productionProcess2" label="二" width="100" align="center">
                <template slot-scope="scope">
                  <el-input
                    resize="none"
                    type="textarea"
                    @blur="handleEditDone(scope.$index,'productionProcess2')"
                    :autosize="{ minRows: 1}"
                    v-model="scope.row.productionProcess2"/>
                </template>
              </ecrm-table-column>
              <ecrm-table-column prop="productionProcess3" label="三" width="100" align="center">
                <template slot-scope="scope">
                  <el-input
                    resize="none"
                    type="textarea"
                    @blur="handleEditDone(scope.$index,'productionProcess3')"
                    :autosize="{ minRows: 1}"
                    v-model="scope.row.productionProcess3"/>
                </template>
              </ecrm-table-column>
              <ecrm-table-column prop="productionProcessCount" label="总产程" width="100" align="center">
                <template slot-scope="scope">
                  <el-input
                    resize="none"
                    type="textarea"
                    @blur="handleEditDone(scope.$index,'productionProcessCount')"
                    :autosize="{ minRows: 1}"
                    v-model="scope.row.productionProcessCount"/>
                </template>
              </ecrm-table-column>
            </ecrm-table-column>
            <ecrm-table-column label="产前是否点滴催产素" prop="hadOxytocin" width="60" align="center">
              <template slot-scope="scope">
                <el-select 
                  v-model="scope.row.hadOxytocin" 
                  class="align-center"
                  @change="()=>handleEditDone(scope.$index,'hadOxytocin')" 
                  placeholder=" ">
                  <el-option v-for="(item,idx) in hadOxytocinOptions" :key="idx" :value="item" :label="item"></el-option>
                </el-select>
              </template>
            </ecrm-table-column>
            <ecrm-table-column label="分娩时间" width="100" align="center">
              <ecrm-table-column label="年" prop="分娩时间-年" width="100" align="center">
                <template slot-scope="scope">
                  <span>{{formatDate(scope.row.childBirthTime,'YYYY')}}</span>
                </template>
              </ecrm-table-column>
              <ecrm-table-column label="月" prop="分娩时间-月" width="60" align="center">
                <template slot-scope="scope">
                  <span style="cursor:pointer;">{{formatDate(scope.row.childBirthTime,'M')}}</span>
                </template>
              </ecrm-table-column>
              <ecrm-table-column label="日" prop="分娩时间-日" width="60" align="center">
                <template slot-scope="scope">
                  <span style="cursor:pointer;">{{formatDate(scope.row.childBirthTime,'D')}}</span>
                </template>
              </ecrm-table-column>
              <ecrm-table-column label="时" prop="分娩时间-时" width="60" align="center">
                <template slot-scope="scope">
                  <span style="cursor:pointer;">{{formatDate(scope.row.childBirthTime,'H')}}</span>
                </template>
              </ecrm-table-column>
              <ecrm-table-column label="分" prop="分娩时间-分" width="60" align="center">
                <template slot-scope="scope">
                  <span style="cursor:pointer;">{{formatDate(scope.row.childBirthTime,'m')}}</span>
                </template>
              </ecrm-table-column>
            </ecrm-table-column>
            <ecrm-table-column label="分娩方式" prop="childBirthWay" width="100" align="center">
              <template slot-scope="scope">
                <el-select v-model="scope.row.childBirthWay" @change="()=>handleEditDone(scope.$index,'childBirthWay')" placeholder=" ">
                    <el-option v-for="(item,idx) in childBirthWayOptions" :key="idx" :value="item" :label="item"></el-option>
                </el-select>
              </template>
            </ecrm-table-column>
            <ecrm-table-column label="手术指征" prop="surgicalIndication" width="100" align="center">
              <template slot-scope="scope">
                <el-input
                  resize="none"
                  type="textarea"
                  @blur="handleEditDone(scope.$index,'surgicalIndication')"
                  :autosize="{ minRows: 1}"
                  v-model="scope.row.surgicalIndication"/>
              </template>
            </ecrm-table-column>
            <ecrm-table-column label="会阴情况" width="100" align="center">
              <ecrm-table-column label="Ⅰ" prop="perineumSituation1" width="60" align="center">
                <template slot-scope="scope">
                  <el-input
                    resize="none"
                    type="textarea"
                    @blur="handleEditDone(scope.$index,'perineumSituation1')"
                    :autosize="{ minRows: 1}"
                    v-model="scope.row.perineumSituation1"/>
                </template>
              </ecrm-table-column>
              <ecrm-table-column label="Ⅱ" prop="perineumSituation2" width="60" align="center">
                <template slot-scope="scope">
                  <el-input
                    resize="none"
                    type="textarea"
                    @blur="handleEditDone(scope.$index,'perineumSituation2')"
                    :autosize="{ minRows: 1}"
                    v-model="scope.row.perineumSituation2"/>
                </template>
              </ecrm-table-column>
              <ecrm-table-column label="Ⅲ" prop="perineumSituation3" width="60" align="center">
                <template slot-scope="scope">
                  <el-input
                    resize="none"
                    type="textarea"
                    @blur="handleEditDone(scope.$index,'perineumSituation3')"
                    :autosize="{ minRows: 1}"
                    v-model="scope.row.perineumSituation3"/>
                </template>
              </ecrm-table-column>
              <ecrm-table-column label="切开" prop="perineumSituation" width="60" align="center">
                <template slot-scope="scope">
                  <el-input
                    resize="none"
                    type="textarea"
                    @blur="handleEditDone(scope.$index,'perineumSituation')"
                    :autosize="{ minRows: 1}"
                    v-model="scope.row.perineumSituation"/>
                </template>
              </ecrm-table-column>
            </ecrm-table-column>
            <ecrm-table-column label="产后2h出血量(ml)" prop="birthBloodVolume" width="100" align="center">
              <template slot-scope="scope">
                  <el-input
                    resize="none"
                    type="textarea"
                    @blur="handleEditDone(scope.$index,'birthBloodVolume')"
                    :autosize="{ minRows: 1}"
                    v-model="scope.row.birthBloodVolume"/>
                </template>
            </ecrm-table-column>
          </ecrm-table-column>
          <ecrm-table-column label="新生儿情况" align="center">
            <ecrm-table-column label="性别" prop="newBornSex" width="45" align="center">
              <template slot-scope="scope">
                <el-select 
                  class="align-center" 
                  v-model="scope.row.newBornSex" 
                  @change="()=>handleEditDone(scope.$index,'newBornSex')" 
                  placeholder=" ">
                    <el-option v-for="(item,idx) in sexOptions" :key="idx" :value="item" :label="item"></el-option>
                </el-select>
              </template>
            </ecrm-table-column>
            <ecrm-table-column label="身长cm" prop="newBornHeight" width="60" align="center">
              <template slot-scope="scope">
                <el-input
                  resize="none"
                  type="textarea"
                  @blur="handleEditDone(scope.$index,'newBornHeight')"
                  :autosize="{ minRows: 1}"
                  v-model="scope.row.newBornHeight"/>
              </template>
            </ecrm-table-column>
            <ecrm-table-column label="体重kg" prop="newBornWeight" width="60" align="center">
              <template slot-scope="scope">
                <el-input
                  resize="none"
                  type="textarea"
                  @blur="handleEditDone(scope.$index,'newBornWeight')"
                  :autosize="{ minRows: 1}"
                  v-model="scope.row.newBornWeight"/>
              </template>
            </ecrm-table-column>
            <ecrm-table-column label="阿氏评分" width="100" align="center">
              <ecrm-table-column label="一分钟" prop="aShiScore1" width="60" align="center">
                <template slot-scope="scope">
                  <el-input
                    resize="none"
                    type="textarea"
                    @blur="handleEditDone(scope.$index,'aShiScore1')"
                    :autosize="{ minRows: 1}"
                    v-model="scope.row.aShiScore1"/>
                </template>
              </ecrm-table-column>
              <ecrm-table-column label="五分钟" prop="aShiScore5" width="60" align="center">
                <template slot-scope="scope">
                  <el-input
                    resize="none"
                    type="textarea"
                    @blur="handleEditDone(scope.$index,'aShiScore5')"
                    :autosize="{ minRows: 1}"
                    v-model="scope.row.aShiScore5"/>
                </template>
              </ecrm-table-column>
            </ecrm-table-column>
            <ecrm-table-column label="早接触" prop="earlyContact" width="100" align="center">
              <template slot-scope="scope">
                <el-input
                  resize="none"
                  type="textarea"
                  @blur="handleEditDone(scope.$index,'earlyContact')"
                  :autosize="{ minRows: 1}"
                  v-model="scope.row.earlyContact"/>
              </template>
            </ecrm-table-column>
            <ecrm-table-column label="早吮吸" prop="earlySucking" width="100" align="center">
              <template slot-scope="scope">
                <el-input
                  resize="none"
                  type="textarea"
                  @blur="handleEditDone(scope.$index,'earlySucking')"
                  :autosize="{ minRows: 1}"
                  v-model="scope.row.earlySucking"/>
              </template>
            </ecrm-table-column>
            <ecrm-table-column label="死胎" prop="deadBirth" width="100" align="center">
              <template slot-scope="scope">
                <el-input
                  resize="none"
                  type="textarea"
                  @blur="handleEditDone(scope.$index,'deadBirth')"
                  :autosize="{ minRows: 1}"
                  v-model="scope.row.deadBirth"/>
              </template>
            </ecrm-table-column>
            <ecrm-table-column label="死产" prop="deadProduce" width="100" align="center">
              <template slot-scope="scope">
                <el-input
                  resize="none"
                  type="textarea"
                  @blur="handleEditDone(scope.$index,'deadProduce')"
                  :autosize="{ minRows: 1}"
                  v-model="scope.row.deadProduce"/>
              </template>
            </ecrm-table-column>
            <ecrm-table-column label="畸形" prop="deformity" width="100" align="center">
              <template slot-scope="scope">
                <el-input
                  resize="none"
                  type="textarea"
                  @blur="handleEditDone(scope.$index,'deformity')"
                  :autosize="{ minRows: 1}"
                  v-model="scope.row.deformity"/>
              </template>
            </ecrm-table-column>
            <ecrm-table-column label="新生儿死亡" prop="newBornDead" width="100" align="center">
              <template slot-scope="scope">
                <el-input
                  resize="none"
                  type="textarea"
                  @blur="handleEditDone(scope.$index,'newBornDead')"
                  :autosize="{ minRows: 1}"
                  v-model="scope.row.newBornDead"/>
              </template>
            </ecrm-table-column>
            <ecrm-table-column label="死因" prop="deadReason" width="100" align="center">
              <template slot-scope="scope">
                <el-input
                  resize="none"
                  type="textarea"
                  @blur="handleEditDone(scope.$index,'deadReason')"
                  :autosize="{ minRows: 1}"
                  v-model="scope.row.deadReason"/>
              </template>
            </ecrm-table-column>
          </ecrm-table-column>
          <ecrm-table-column label="其他" align="center">
            <ecrm-table-column label="生育证号码" prop="birthCertificateNum" width="60" align="center">
              <template slot-scope="scope">
                <el-select 
                  class="align-center" 
                  v-model="scope.row.birthCertificateNum" 
                  @change="()=>handleEditDone(scope.$index,'birthCertificateNum')" 
                  placeholder=" ">
                  <el-option v-for="(item,idx) in birthCertificateNumOptions" :key="idx" :value="item" :label="item"></el-option>
              </el-select>
              </template>
            </ecrm-table-column>
            <ecrm-table-column label="接生者" prop="接生者" width="160" align="center">
              <template slot-scope="scope">
                <span class="sign-name" @click="()=>handleSign(scope.row,'birthAttendantName1')">{{scope.row.birthAttendantName1||''}}</span>
                <span>/</span>
                <span class="sign-name" @click="()=>handleSign(scope.row,'birthAttendantName2')">{{scope.row.birthAttendantName2||''}}</span>
              </template>
            </ecrm-table-column>
            <ecrm-table-column label="出生医学证明号码" prop="birthCertificateNumber" width="150" align="center">
              <template slot-scope="scope">
                <el-input
                  resize="none"
                  type="textarea"
                  @blur="handleEditDone(scope.$index,'birthCertificateNumber')"
                  :autosize="{ minRows: 1}"
                  v-model="scope.row.birthCertificateNumber"/>
              </template>
            </ecrm-table-column>
            <ecrm-table-column label="备注" prop="remarks" width="100" align="center">
              <template slot-scope="scope">
                <el-input
                  resize="none"
                  type="textarea"
                  @blur="handleEditDone(scope.$index,'remarks')"
                  :autosize="{ minRows: 1}"
                  v-model="scope.row.remarks"/>
              </template>
            </ecrm-table-column>
          </ecrm-table-column>
          <ecrm-table-column label="操作" align="center" fixed="right">
            <template slot-scope="scope">
              <span @click="()=>deleteRecord(scope.row)" class="operate-span">删除</span>
            </template>
          </ecrm-table-column>
        </ecrm-table>
      </div>
      <customPagenation
        :page.sync="query.pageIndex"
        :size.sync="query.pageSize"
        :total="fileTotal"
        @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
      />
    </div>
    <editModal
      :value.sync="editCfg.value"
      :title="editCfg.title"
      :name="editCfg.name"
      :type="editCfg.type"
      :options="editCfg.options"
      :visible.sync="editCfg.visible"
      @onOk="handleEditOk"
    />
    <createModal :visible.sync="createVisible" @onOk="handleCreateOk"/>
    <vue-context-menu :contextMenuData="contextMenuData" @savedata="saveData" @deleteRow="deleteRow" />
  </div>
</template>

<script>
import commonMixin from "./../../common/mixin/common.mixin";
import customPagenation from "./components/pagination";
import editModal from "./components/editModal";
import createModal from "./components/createModal";
import moment from "moment";
import {getList,changeOrSaveForm,deleteForm} from './api/api'

export default {
  components: {
    customPagenation,
    editModal,
    createModal
  },
  mixins: [commonMixin],
  data() {
    // 设置起止时间
    let nowDate = new Date();
    let nowtDay = nowDate.getDay();
    let nowTime = nowDate.getTime();
    let reduceDay = 0;
    let addDay = 0;
    if(nowtDay==0){
      reduceDay=6;
      addDay=0;
    }else{
      reduceDay = nowtDay-1;
      addDay = 7-nowtDay;
    }

    let startDate = moment(new Date(nowTime-reduceDay*86400000)).format('YYYY-MM-DD');
    let endDate = moment(new Date(nowTime+addDay*86400000)).format('YYYY-MM-DD');

    return {
      query: {
        startDate: startDate,
        endDate: endDate,
        searchingContent:'',
        pageIndex: 1,
        pageSize: 15
      },
      activeCell: { row: "", name: "" },
      fileTotal: 0,
      tableHeight: 0,
      tableData: [],
      eduOptions:['文盲','小学','中学','大专','大专以上'],
      childBirthWayOptions:['顺产','吸引产','钳产','剖宫产','臀助产','臀牵引'],
      sexOptions:['男','女'],
      birthCertificateNumOptions:['有','无'],
      hadOxytocinOptions: ['是','否'],
      tableLoading: false,
      editCfg: {
        idx: "",
        title: "",
        value: "",
        name: "",
        type: "",
        options: [],
        visible: false
      },
      createVisible:false,
      contextMenuData: {
        // the contextmenu name(@1.4.1 updated)
        menuName: 'demo',
        // The coordinates of the display(菜单显示的位置)
        axis: {
          x: null,
          y: null
        },
        // Menu options (菜单选项)
        menulists: [{
          fnHandler: 'savedata', // Binding events(绑定事件)
          icoName: 'fa fa-home fa-fw', // icon (icon图标 )
          btnName: '选项1' // The name of the menu option (菜单名称)
        }, {
            fnHandler: 'deleteRow',
            icoName: 'fa fa-home fa-fw',
            btnName: '删除行测试'
        }],
        row: null,
        column: null
      }
    };
  },
  mounted() {
    this.handelResize = this.handelResize.bind(this);
    this.handelResize();
    window.addEventListener("resize", this.handelResize);

    this.getTableData();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handelResize);
  },
  methods: {
    getTableData(){
      this.tableLoading= true;
      let query = {...this.query};

      let startDateType = Object.prototype.toString.call(query.startDate)
      if(startDateType=='[object Date]')
        query.startDate = moment(query.startDate).format('YYYY-MM-DD')+' 00:00:00'
      else if(!query.startDate )
        query.startDate = ''

      let endDateType = Object.prototype.toString.call(query.endDate)
      if(endDateType=='[object Date]')
        query.endDate = moment(query.endDate).format('YYYY-MM-DD')+' 23:59:59'
      else if(!query.endDate )
        query.endDate = ''

      // console.log(query)

      getList(query).then(res=>{
        this.tableLoading= false;
        if(res.data.data){
          let data = res.data.data;
          this.tableData = this.formatList(data.list);
          this.fileTotal = data.totalCount
        }
      },err=>{
        this.tableLoading= false;
      })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex >= 8) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    formatList(list){
      let newList = [];

      for(let i=0;i<list.length;i++){
        newList = newList.concat([{...list[i]},{...list[i]}])
      }

      // console.log(newList)

      return newList;
    },
    handleCurrentChange(page) {
      this.getTableData();
    },
    handleSizeChange(size) {
      this.getTableData();
    },
    handelResize() {
      let tableHeight = document.querySelector(".main-contain .table-contain")
        .offsetHeight;
      this.tableHeight = tableHeight;
    },
    handleDateChange() {
      this.query.pageIndex=1;
      this.getTableData();
    },
    handleSearch(){
      this.query.pageIndex=1;
      this.getTableData();
    },
    formatDate(date, format) {
      if (!date) return "";

      format = format || "YYYY-MM-DD HH:mm:ss";
      // if (!(date instanceof Date)) date = date.replace(/\//g, "");

      return moment(date).format(format);
    },
    rowClassName(payload) {
      let rowIdx = payload.rowIndex + 1;
      if (rowIdx % 4 == 0 || rowIdx % 4 == 3) return "el-table__row--striped";

      return "";
    },
    cellClassName(payload) {
      return ''
      if (this.tableData.indexOf(payload.row) != this.activeCell.row) return "";
      if (payload.column.property != this.activeCell.name) return "";

      return "active-cell";
    },
    handleCellEnter(row, column, cell, event) {
      this.activeCell = {
        row: this.tableData.indexOf(row),
        name: column.property
      };
    },
    handleCellLeave(row, column, cell, event) {
      this.activeCell = {
        row: "",
        name: ""
      };
    },
    handleRowContextmenu(row, column, event) {
      return
      event.preventDefault();
      console.log(row, column, event);
      var x = event.clientX
      var y = event.clientY
      this.contextMenuData.axis = {x, y}
      this.contextMenuData.row = row
      this.contextMenuData.column = column
    },
    saveData(params,success,error){
      changeOrSaveForm(params)
      .then(res=>{
        success&&success(res)
      },err=>{
        error&&error(err)
      })
    },
    handleEditDone(idx,name){
      let otherIdx;
      if(idx%2==1){
        otherIdx=idx-1;
      }else{
        otherIdx=idx+1;
      }

      if(this.tableData[idx][name]!==this.tableData[otherIdx][name]){
        this.tableData[otherIdx][name]=this.tableData[idx][name];

        this.saveData(this.tableData[idx],()=>{
          this.$message.success({message:'修改成功'})
        })
      }
    },
    handleNumInput(val,idx,name){
      if(!val){
        val = '';
        this.tableData[idx][name]='';
        return
      };

      let newVal = parseInt(val).toString();
      let valChange = false;
      if(isNaN(Number(newVal))){
        newVal=this.tableData[idx][name]
        valChange = true;
      }

      if(newVal.length!==val.length)valChange = true

      this.tableData[idx][name] = newVal;

      if(valChange){
        setTimeout(_=>document.querySelector(`.${name+idx} textarea`).value=newVal)
      }
    },
    deleteRow(){
      // let idx= this.tableData.indexOf(this.contextMenuData.row);
      // if(idx%2!==0)idx = idx-1;
      // this.tableData.splice(idx,1)
      // this.tableData.splice(idx,1)
      // console.log('deleteRow')
      this.deleteRecord(this.contextMenuData.row);
    },
    deleteRecord(record){
      this.$confirm('是否删除该记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        deleteForm({
          idList:[record.id]
        })
        .then(res=>{
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.getTableData();
        })
      })
      .catch(() => {});
    },
    handleCellClick(row, column, cell, event) {
      let rowIdx = this.tableData.indexOf(row);
      let editName = column.property;
      let title = column.label;
      let editType = "input";
      let options = [];
      let editValue = null;
      let modalVisible = true;
      
      switch (column.property) {
        case "分娩时间-年":
        case "分娩时间-月":
        case "分娩时间-日":
        case "分娩时间-时":
        case "分娩时间-分":
          title = '分娩时间'
          editName = 'childBirthTime';
          editType = "dateTime";
          if(moment(row[editName]).format('YYYY-MM-DD HH:mm:ss')=='Invalid Date')editValue=''
          break;
        case "natureBrokenMenbraneTime":
        case "artiBrokenMembraneTime":
          if(moment(row[editName]).format('YYYY-MM-DD HH:mm')=='Invalid Date')editValue=''
          editType = "dateTime";
          break;
        default:
          modalVisible = false;
          return
      }

      if(modalVisible){
        if(editValue===null)editValue = (row[editName]||'').toString();

        if(column.property)this.openEditModal({
          idx: this.tableData.indexOf(row),
          name: editName,
          value: editValue,
          type: editType,
          title,
          options
        });
      }else{}

      
    },
    openEditModal(payload) {
      this.editCfg = {
        ...this.editCfg,
        ...payload,
        visible: true
      };
    },
    handleEditOk(payload) {
      let target = this.tableData[this.editCfg.idx];

      target[this.editCfg.name] = this.editCfg.value;

      payload.modal.saveLoading=true;

      this.saveData(target,()=>{
        this.getTableData()
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.editCfg.visible=false;
        payload.modal.saveLoading=false;
      },()=>{
        payload.modal.saveLoading=false;
      })
    },
    handleCreate(){
      this.createVisible = true;
    },
    handleSign(record,name){
      name = name.replace('Name','Id');
      let isCancel = false;

      if(record[name]!='')isCancel = true;

      window.openSignModal((password,empNo,signDate)=>{
        // console.log(password,empNo,signDate)
        let params = {...record}
        params[name] = isCancel?'':empNo;

        // console.log(params)
        this.saveData(params,()=>{
          this.getTableData()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        })
      },isCancel?'取消签名':'接生者签名',false)
    },
    handleCreateOk(){
      this.createVisible = false;
      this.getTableData();
    }
  }
};
</script>

<style lang="scss">
  @import './assets/puerperantSituation.scss';
</style>

<style lang="scss" scoped>
  @import './assets/puerperantSituation.scope.scss';
</style>