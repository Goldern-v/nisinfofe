let tableModel = {
	table: {
		cols: ["30px", "30px", ""],
		tbody: [
			[
				[
					{
						colspan: 3,
						rowspan: '',
						children: [
							{
								type: "input",
								prev: "科室/门诊：",
								class: "bottom-line",
								value: "",
								name: "keshi",
								style: "width:100px;text-align:center;"
							},
							{
								type: "input",
								prev: "住院号/ID号：",
								class: "bottom-line",
								name: "zhuyuanhao",
								value: "",
								style: "width:70px;text-align:center;"
							},
							{
								type: "input",
								prev: "记录日期：",
								class: "bottom-line",
								value: "",
								name: "jiluriqi",
								style: "width:100px;text-align:center;"
							},
							{
								type: "input",
								prev: "使用机器：",
								class: "bottom-line",
								value: "",
								name: "shiyongjiqi",
								style: "width:70px;text-align:center;"
							},
						]
					}
				],
				[
					{
						colspan: 1,
						rowspan: '',
						class: "title",
						children: [
							{
								type: "text",
								value: "透 析 前 护 理 记 录 "
							}
						]
					},
					{
						colspan: 1,
						rowspan: '',
						class: "title",
						children: [
							{
								type: "text",
								value: "一般情况 "
							}
						]
					},
					{
						colspan: 2,
						rowspan: '',
						class: "",
						style: "padding-left: 5px;",
						children: [
							{
								type: "radio",
								prev: "入科方式： ",
								name: "rukefangshi",
								children: [
									{
										type: "radio",
										value: "步行 ",
										name: "rukefangshi",
										addClass: "",
									},
									{
										type: "radio",
										value: "扶行 ",
										name: "rukefangshi",
										addClass: "",
									},
									{
										type: "radio",
										value: "轮椅 ",
										name: "rukefangshi",
										addClass: "",
									},
									{
										type: "radio",
										value: "平车 ",
										name: "rukefangshi",
										addClass: "",
									},
									{
										type: "radio",
										value: "推床 ",
										name: "rukefangshi",
										addClass: "",
									}
								]
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "input",
								prev: "上次透析日期：",
								class: "bottom-line",
								value: "",
								name: "touxiriqi",
								style: "width:100px;text-align:center;"
							},
							{
								type: "input",
								prev: "透析频次：",
								class: "bottom-line",
								value: "",
								name: "touxipinci",
								style: "width:100px;text-align:center;",
								next: "次/  周"
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "radio",
								prev: "意识：",
								name: "yishi",
								children: [
									{
										type: "radio",
										value: "清醒",
										name: "yishi",
										addClass: "",
									},
									{
										type: "radio",
										value: "嗜睡",
										name: "yishi",
										addClass: "",
									},
									{
										type: "radio",
										value: "昏迷",
										name: "yishi",
										addClass: "",
									},
									{
										type: "radio",
										value: "其他：",
										name: "yishi",
										addClass: "",
									},
									{
										type: "input",
										class: "bottom-line",
										value: "",
										name: "yishiVal",
										style: "width:100px;text-align:center;",
										tasks: [
											{
												active: {
													yishi: "其他："
												}
											}
										]
									}
								]
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "radio",
								prev: "皮肤：",
								name: "pifu",
								children: [
									{
										type: "radio",
										value: "完整",
										name: "pifu",
										addClass: "",
									},
									{
										type: "radio",
										value: "干燥",
										name: "pifu",
										addClass: "",
									},
									{
										type: "radio",
										value: "瘙痒",
										name: "pifu",
										addClass: "",
									},
									{
										type: "radio",
										value: "脱屑",
										name: "pifu",
										addClass: "",
									},
									{
										type: "radio",
										value: "菲薄",
										name: "pifu",
										addClass: "",
									},
									{
										type: "radio",
										value: "水肿",
										name: "pifu",
										addClass: "",
									},
									{
										type: "radio",
										value: "皮疹",
										name: "pifu",
										addClass: "",
									},
									{
										type: "radio",
										value: "出血点",
										name: "pifu",
										addClass: "",
									}
								]
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "input",
								prev: "压疮/抓痕/破损（部位 :",
								class: "bottom-line",
								value: "",
								name: "psunbuwei",
								style: "width:100px;text-align:center;",
							},
							{
								type: "input",
								prev: "范围",
								class: "bottom-line",
								value: "",
								name: "fanwei",
								style: "width:100px;text-align:center;",
								next: "cm）"
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "radio",
								prev: "食欲：",
								name: "shiyu",
								children: [
									{
										type: "radio",
										value: "正常",
										name: "shiyu",
										addClass: "",
									},
									{
										type: "radio",
										value: "减退",
										name: "shiyu",
										addClass: "",
									},
									{
										type: "radio",
										value: "恶心",
										name: "shiyu",
										addClass: "",
									},
									{
										type: "radio",
										value: "呕吐",
										name: "shiyu",
										addClass: "",
									}
								]
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "radio",
								prev: "饮食：",
								name: "yinshi",
								children: [
									{
										type: "radio",
										value: "普食",
										name: "yinshi",
										addClass: "",
									},
									{
										type: "radio",
										value: "优质低蛋白饮食",
										name: "yinshi",
										addClass: "",
									},
									{
										type: "radio",
										value: "优质高蛋白饮食",
										name: "yinshi",
										addClass: "",
									},
									{
										type: "radio",
										value: "糖尿病饮食",
										name: "yinshi",
										addClass: "",
									},
									{
										type: "radio",
										value: "其他：",
										name: "yinshi",
										addClass: "",
									},
									{
										type: "input",
										class: "bottom-line",
										value: "",
										name: "yinshiVal",
										style: "width:100px;text-align:center;",
										tasks: [
											{
												active: {
													yinshi: "其他："
												}
											}
										]
									}
								]
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "radio",
								prev: "入液量：",
								name: "ruyeliang",
								children: [
									{
										type: "radio",
										value: "正常",
										name: "ruyeliang",
										addClass: "",
									},
									{
										type: "radio",
										value: "限量",
										name: "ruyeliang",
										addClass: "",
									},
									{
										type: "input",
										class: "bottom-line",
										value: "",
										name: "xianliang",
										style: "width:100px;text-align:center;",
										next: "mL/d",
										tasks: [
											{
												active: {
													ruyeliang: "限量"
												}
											}
										]
									},
									{
										type: "radio",
										value: "禁饮",
										name: "ruyeliang",
										addClass: "",
									},
									{
										type: "input",
										class: "bottom-line",
										value: "",
										name: "niaoliang",
										style: "width:100px;text-align:center;",
										prev: "尿量：",
										next: "ml/d"
									}
								]
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "input",
								class: "bottom-line",
								value: "",
								name: "tiyeguoduozj",
								style: "width:100px;text-align:center;",
								prev: "体液过多相关症状：",
							},
							{
								type: "radio",
								prev: "颈静脉怒张：",
								name: "txqjingmai",
								children: [
									{
										type: "radio",
										value: "（+）",
										name: "txqjingmai",
										addClass: "",
									},
									{
										type: "radio",
										value: "（-）",
										name: "txqjingmai",
										addClass: "",
									}
								]
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "radio",
								prev: "下肢水肿",
								name: "xiazhishuizhong",
								children: [
									{
										type: "radio",
										value: "+++",
										name: "xiazhishuizhong",
										addClass: "",
									},
									{
										type: "radio",
										value: "++",
										name: "xiazhishuizhong",
										addClass: "",
									},
									{
										type: "radio",
										value: "+",
										name: "xiazhishuizhong",
										addClass: "",
									},
									{
										type: "radio",
										value: "-",
										name: "xiazhishuizhong",
										addClass: "",
									}
								]
							},
							{
								type: "radio",
								prev: "颜睑浮肿",
								name: "lianfuzhong",
								children: [
									{
										type: "radio",
										value: "+++",
										name: "lianfuzhong",
										addClass: "",
									},
									{
										type: "radio",
										value: "++",
										name: "lianfuzhong",
										addClass: "",
									},
									{
										type: "radio",
										value: "+",
										name: "lianfuzhong",
										addClass: "",
									},
									{
										type: "radio",
										value: "-",
										name: "lianfuzhong",
										addClass: "",
									}
								]
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "radio",
								prev: "失水相关因素：",
								name: "shishuiyinsu",
								children: [
									{
										type: "radio",
										value: "无",
										name: "shishuiyinsu",
										addClass: "",
									},
									{
										type: "radio",
										value: "大量反复呕吐",
										name: "shishuiyinsu",
										addClass: "",
									},
									{
										type: "radio",
										value: "腹泻",
										name: "shishuiyinsu",
										addClass: "",
									},
									{
										type: "radio",
										value: "大量出汗",
										name: "shishuiyinsu",
										addClass: "",
									},
									{
										type: "radio",
										value: "其它：",
										name: "shishuiyinsu",
										addClass: "",
									},
									{
										type: "input",
										class: "bottom-line",
										value: "",
										name: "shishuiyinsuVal",
										style: "width:100px;text-align:center;",
										tasks: [
											{
												active: {
													shishuiyinsu: "其它："
												}
											}
										]
									}
								]
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "radio",
								prev: "活动性出血：",
								name: "huodongxingchuxue",
								children: [
									{
										type: "radio",
										value: "无",
										name: "huodongxingchuxue",
										addClass: "",
									},
									{
										type: "radio",
										value: "穿刺口渗血",
										name: "huodongxingchuxue",
										addClass: "",
									},
									{
										type: "radio",
										value: "牙龈出血",
										name: "huodongxingchuxue",
										addClass: "",
									},
									{
										type: "radio",
										value: "消化道出血",
										name: "huodongxingchuxue",
										addClass: "",
									},
									{
										type: "radio",
										value: "女性经期",
										name: "huodongxingchuxue",
										addClass: "",
									},
									{
										type: "radio",
										value: "其他",
										name: "huodongxingchuxue",
										addClass: "",
									},
									{
										type: "input",
										class: "bottom-line",
										value: "",
										name: "huodongxingchuxueVal",
										style: "width:100px;text-align:center;",
										tasks: [
											{
												active: {
													huodongxingchuxue: "其他"
												}
											}
										]
									}
								]
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "radio",
								prev: "透析前使用特殊药物：",
								name: "touxiqianshiyongyaowu",
								children: [
									{
										type: "radio",
										value: "无",
										name: "touxiqianshiyongyaowu",
										addClass: "",
									},
									{
										type: "radio",
										value: "降压药",
										name: "touxiqianshiyongyaowu",
										addClass: "",
									},
									{
										type: "radio",
										value: "抗凝药",
										name: "touxiqianshiyongyaowu",
										addClass: "",
									},
									{
										type: "radio",
										value: "降糖药",
										name: "touxiqianshiyongyaowu",
										addClass: "",
									},
									{
										type: "radio",
										value: "其他",
										name: "touxiqianshiyongyaowu",
										addClass: "",
									},
									{
										type: "input",
										class: "bottom-line",
										value: "",
										name: "touxiqianshiyongyaowuVal",
										style: "width:100px;text-align:center;",
										tasks: [
											{
												active: {
													touxiqianshiyongyaowu: "其他"
												}
											}
										]
									}
								]
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "radio",
								prev: "血管通路：",
								name: "xueguantonglu",
								children: [
									{
										type: "radio",
										value: "AVF",
										name: "xueguantonglu",
										addClass: "",
									},
									{
										type: "radio",
										value: "AVG",
										name: "xueguantonglu",
										addClass: "",
									}
								]
							},
							{
								type: "radio",
								prev: "穿刺方式：",
								name: "chuancifangshi",
								children: [
									{
										type: "radio",
										value: "区域",
										name: "chuancifangshi",
										addClass: "",
									},
									{
										type: "radio",
										value: "绳梯",
										name: "chuancifangshi",
										addClass: "",
									},
									{
										type: "radio",
										value: "纽扣",
										name: "chuancifangshi",
										addClass: "",
									},
									{
										type: "radio",
										value: "定点",
										name: "chuancifangshi",
										addClass: "",
									},
									{
										type: "input",
										class: "bottom-line",
										value: "",
										name: "chuancifangshiVal",
										style: "width:60px;text-align:center;",
										prev: "位置"
									}
								]
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "radio",
								prev: "中心静脉置管",
								name: "zhongxinjingmaizg",
								children: [
									{
										type: "radio",
										value: "长期性",
										name: "zhongxinjingmaizg",
										addClass: "",
									},
									{
										type: "radio",
										value: "临时性",
										name: "zhongxinjingmaizg",
										addClass: "",
									},
									{
										type: "input",
										class: "bottom-line",
										value: "",
										name: "zhongxinjingmaizgVal",
										style: "width:100px;text-align:center;",
										prev: "位置",
									}
								]
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "radio",
								prev: "内瘘震颤和血管杂音：",
								name: "xueguanzayin",
								children: [
									{
										type: "radio",
										value: "存在",
										name: "xueguanzayin",
										addClass: "",
									},
									{
										type: "radio",
										value: "减弱",
										name: "xueguanzayin",
										addClass: "",
									},
									{
										type: "radio",
										value: "不存在",
										name: "xueguanzayin",
										addClass: "",
									}
								]
							},
							{
								type: "radio",
								prev: "感染：",
								name: "ganran",
								children: [
									{
										type: "radio",
										value: "有",
										name: "ganran",
										addClass: "",
									},
									{
										type: "radio",
										value: "无",
										name: "ganran",
										addClass: "",
									}
								]
							},
							{
								type: "text",
								value: "<br/>"
							},
						]
					}
				],
				[
					{
						colspan: 1,
						rowspan: '',
						class: "title",
						children: [
							{
								type: "text",
								value: "透 析 中 护 理 记 录"
							}
						]
					},
					{
						colspan: 1,
						rowspan: '',
						class: "title",
						children: [
							{
								type: "text",
								value: "专科记录 "
							}
						]
					},
					{
						colspan: 2,
						rowspan: '',
						class: "",
						style: "padding-left: 5px;",
						children: [
							{
								type: "radio",
								prev: "治疗方式：",
								name: "zhiliaofangshi",
								children: [
									{
										type: "radio",
										value: "HD",
										name: "zhiliaofangshi",
										addClass: "",
									},
									{
										type: "radio",
										value: "HD+HP",
										name: "zhiliaofangshi",
										addClass: "",
									},
									{
										type: "radio",
										value: "HP",
										name: "zhiliaofangshi",
										addClass: "",
									},
									{
										type: "radio",
										value: "HDF",
										name: "zhiliaofangshi",
										addClass: "",
									},
									{
										type: "radio",
										value: "其他",
										name: "zhiliaofangshi",
										addClass: "",
									},
									{
										type: "input",
										class: "bottom-line",
										value: "",
										name: "zhiliaofangshiVal",
										style: "width:100px;text-align:center;",
										tasks: [
											{
												active: {
													zhiliaofangshi: "其他"
												}
											}
										]
									}
								]
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "radio",
								prev: "透析器种类：",
								name: "touxiqizhonglei",
								children: [
									{
										type: "radio",
										value: "高通",
										name: "touxiqizhonglei",
										addClass: "",
									},
									{
										type: "radio",
										value: "低通",
										name: "touxiqizhonglei",
										addClass: "",
									},
									{
										type: "input",
										class: "bottom-line",
										value: "",
										name: "touxiqizhongleiVal1",
										style: "width:60px;text-align:center;",
										prev: "型号：",
									},
									{
										type: "input",
										class: "bottom-line",
										value: "",
										name: "touxiqizhongleiVal2",
										style: "width:60px;text-align:center;",
										prev: "灌流器：",
									},
									{
										type: "input",
										class: "bottom-line",
										value: "",
										name: "touxiqizhongleiVal3",
										style: "width:60px;text-align:center;",
										prev: "血路管：",
									},
								]
							},
							{
								type: "input",
								prev: "置换液管：",
								next: "内瘘穿刺针 A:尖针 钝针 16G 17G；  V:尖针 钝针 16G 17G",
								class: "bottom-line",
								value: "",
								name: "zhihuanyeguan",
								style: "width:100px;text-align:center;"
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "input",
								prev: "体重：干体重",
								next: "kg",
								class: "bottom-line",
								value: "",
								name: "tizhongVal1",
								style: "width:50px;text-align:center;"
							},
							{
								type: "input",
								prev: "上次透析后",
								next: "kg",
								class: "bottom-line",
								value: "",
								name: "tizhongVal2",
								style: "width:50px;text-align:center;"
							},
							{
								type: "input",
								prev: "本次透析后",
								next: "kg",
								class: "bottom-line",
								value: "",
								name: "tizhongVal3",
								style: "width:50px;text-align:center;"
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "input",
								prev: "脱水量：计算方法：",
								class: "bottom-line",
								value: "",
								name: "tuoshuiliang1",
								style: "width:150px;text-align:center;"
							},
							{
								type: "input",
								prev: "预计",
								next: "ml",
								class: "bottom-line",
								value: "",
								name: "tuoshuiliang2",
								style: "width:50px;text-align:center;"
							},
							{
								type: "input",
								prev: "实际",
								next: "ml",
								class: "bottom-line",
								value: "",
								name: "tuoshuiliang3",
								style: "width:50px;text-align:center;"
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "input",
								prev: "透析时间：计划",
								next: "h",
								class: "bottom-line",
								value: "",
								name: "touxi1",
								style: "width:35px;text-align:center;"
							},
							{
								type: "input",
								next: "min",
								class: "bottom-line",
								value: "",
								name: "touxi2",
								style: "width:35px;text-align:center;"
							},
							{
								type: "input",
								prev: "实际",
								next: "h",
								class: "bottom-line",
								value: "",
								name: "touxi3",
								style: "width:35px;text-align:center;"
							},
							{
								type: "input",
								next: "min",
								class: "bottom-line",
								value: "",
								name: "touxi4",
								style: "width:35px;text-align:center;"
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "radio",
								prev: "抗凝方式：",
								name: "kangnifangshi",
								children: [
									{
										type: "radio",
										value: "无肝素",
										name: "kangnifangshi",
										addClass: "",
									},
									{
										type: "radio",
										value: "普通肝素",
										name: "kangnifangshi",
										addClass: "",
									},
									{
										type: "radio",
										value: "低分子肝素",
										name: "kangnifangshi",
										addClass: "",
									},
									{
										type: "radio",
										value: "其他：",
										name: "kangnifangshi",
										addClass: "",
									},
									{
										type: "input",
										class: "bottom-line",
										value: "",
										name: "kangnifangshiVal",
										style: "width:100px;text-align:center;",
										tasks: [
											{
												active: {
													kangnifangshi: "其他："
												}
											}
										]
									}
								]
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "radio",
								prev: "透析液配方",
								name: "touxiyepeifang",
								children: [
									{
										type: "radio",
										value: "B液",
										name: "touxiyepeifang",
										addClass: "",
									},
									{
										type: "radio",
										value: "碳酸盐",
										name: "touxiyepeifang",
										addClass: "",
									},
									{
										type: "radio",
										value: "其他：",
										name: "touxiyepeifang",
										addClass: "",
									},
									{
										type: "input",
										class: "bottom-line",
										value: "",
										name: "touxiyepeifangVal",
										style: "width:100px;text-align:center;",
										tasks: [
											{
												active: {
													touxiyepeifang: "其他："
												}
											}
										]
									}
								]
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "radio",
								prev: "A液（mmol/l）",
								name: "aye",
								children: [
									{
										type: "radio",
										value: "低钙（1.25）",
										name: "aye",
										addClass: "",
									},
									{
										type: "radio",
										value: "普通钙（1.5）",
										name: "aye",
										addClass: "",
									},
									{
										type: "radio",
										value: "高钙（1.75）",
										name: "aye",
										addClass: "",
									},
									{
										type: "radio",
										value: "糖（5.5）",
										name: "aye",
										addClass: "",
									},
									{
										type: "radio",
										value: "其他：",
										name: "aye",
										addClass: "",
									},
									{
										type: "input",
										class: "bottom-line",
										value: "",
										name: "ayeVal",
										style: "width:100px;text-align:center;",
										tasks: [
											{
												active: {
													aye: "其他："
												}
											}
										]
									}
								]
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "input",
								prev: "预充量：",
								next: "ml",
								class: "bottom-line",
								value: "",
								name: "yuchongliang",
								style: "width:35px;text-align:center;",
							},
							{
								type: "input",
								prev: "回血量：",
								next: "ml",
								class: "bottom-line",
								value: "",
								name: "huishuiliang",
								style: "width:35px;text-align:center;",
							},
							{
								type: "input",
								prev: "补液",
								next: "ml",
								class: "bottom-line",
								value: "",
								name: "buye",
								style: "width:35px;text-align:center;",
							},
							{
								type: "input",
								prev: "输血：",
								next: "ml",
								class: "bottom-line",
								value: "",
								name: "shuxue",
								style: "width:35px;text-align:center;",
							},
							{
								type: "input",
								prev: "超滤量:",
								next: "ml",
								class: "bottom-line",
								value: "",
								name: "chaolvliang",
								style: "width:35px;text-align:center;",
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "input",
								prev: "电导率:",
								next: "ms/cm",
								class: "bottom-line",
								value: "",
								name: "diandaolv",
								style: "width:35px;text-align:center;",
							},
							{
								type: "input",
								prev: "碳酸：",
								next: "ms/cm",
								class: "bottom-line",
								value: "",
								name: "tansua",
								style: "width:35px;text-align:center;",
							},
							{
								type: "input",
								prev: "透析液流量：",
								class: "bottom-line",
								value: "",
								name: "touxiyeliuliang",
								style: "width:35px;text-align:center;",
							},
							{
								type: "input",
								prev: "透析液温度:",
								next: "℃",
								class: "bottom-line",
								value: "",
								name: "touxiyewendu",
								style: "width:35px;text-align:center;",
							}
						]
					}
				]
			],
			[
				[
					{
						colspan: 1,
						rowspan: '',
						class: "title",
						children: [
							{
								type: "text",
								value: "透析后护理记录"
							}
						]
					},
					{
						colspan: 2,
						rowspan: '',
						class: "",
						style: "padding-left: 5px;",
						children: [
							{
								type: "input",
								prev: "内瘘管拔针后压迫止血时间：",
								next: "min",
								class: "bottom-line",
								value: "",
								name: "zhixueshijian",
								style: "width:35px;text-align:center;",
							},
							{
								type: "radio",
								name: "touxihouxgzy",
								children: [
									{
										type: "radio",
										value: "需要护士/他人帮助 ",
										name: "help",
										addClass: "",
									},
									{
										type: "radio",
										value: "自己压迫  ",
										name: "help",
										addClass: "",
									},
								]
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "radio",
								prev: "内瘘震颤和血管杂音：",
								name: "touxihouxgzy",
								children: [
									{
										type: "radio",
										value: "存在",
										name: "touxihouxgzy",
										addClass: "",
									},
									{
										type: "radio",
										value: "减弱",
										name: "touxihouxgzy",
										addClass: "",
									},
									{
										type: "radio",
										value: "不存在",
										name: "touxihouxgzy",
										addClass: "",
									}
								]
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "radio",
								prev: "颈静脉怒张：",
								name: "txhjingmai",
								children: [
									{
										type: "radio",
										value: "（+）",
										name: "txhjingmai",
										addClass: "",
									},
									{
										type: "radio",
										value: "（-）",
										name: "txhjingmai",
										addClass: "",
									}
								]
							},
							{
								type: "radio",
								prev: "肺部听诊湿罗音",
								name: "txhshiluoyin",
								children: [
									{
										type: "radio",
										value: "（+）",
										name: "txhshiluoyin",
										addClass: "",
									},
									{
										type: "radio",
										value: "（-）",
										name: "txhshiluoyin",
										addClass: "",
									}
								]
							},
							{
								type: "radio",
								prev: "水肿",
								name: "txhshuizhong",
								children: [
									{
										type: "radio",
										value: "+++",
										name: "txhshuizhong",
										addClass: "",
									},
									{
										type: "radio",
										value: "++",
										name: "txhshuizhong",
										addClass: "",
									},
									{
										type: "radio",
										value: "+",
										name: "txhshuizhong",
										addClass: "",
									},
									{
										type: "radio",
										value: "-",
										name: "txhshuizhong",
										addClass: "",
									},
								]
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "text",
								value: "透析器及血路管凝血情况："
							},
							{
								type: "radio",
								prev: "动脉管道：",
								name: "txhshuizhong",
								children: [
									{
										type: "radio",
										value: "+++",
										name: "txhshuizhong",
										addClass: "",
									},
									{
										type: "radio",
										value: "++",
										name: "txhshuizhong",
										addClass: "",
									},
									{
										type: "radio",
										value: "+",
										name: "txhshuizhong",
										addClass: "",
									},
									{
										type: "radio",
										value: "无",
										name: "txhshuizhong",
										addClass: "",
									},
								]
							},
							{
								type: "radio",
								prev: "静脉管道",
								name: "txhjingmai",
								eleStyle: 'margin-right: 0;',
								children: [
									{
										type: "radio",
										value: "+++",
										name: "txhjingmai",
										addClass: "",
									},
									{
										type: "radio",
										value: "++",
										name: "txhjingmai",
										addClass: "",
									},
									{
										type: "radio",
										value: "+",
										name: "txhjingmai",
										addClass: "",
									},
									{
										type: "radio",
										value: "无",
										name: "txhjingmai",
										addClass: "",
									},
								]
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "radio",
								prev: "透析器：",
								name: "txhtouxiqi",
								children: [
									{
										type: "radio",
										value: "+++",
										name: "txhtouxiqi",
										addClass: "",
									},
									{
										type: "radio",
										value: "++",
										name: "txhtouxiqi",
										addClass: "",
									},
									{
										type: "radio",
										value: "+",
										name: "txhtouxiqi",
										addClass: "",
									},
									{
										type: "radio",
										value: "无",
										name: "txhtouxiqi",
										addClass: "",
									},
								]
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "radio",
								prev: "失衡综合征：",
								name: "txhzhonghezheng",
								children: [
									{
										type: "radio",
										value: "无",
										name: "txhzhonghezheng",
										addClass: "",
									},
									{
										type: "radio",
										value: "有：",
										name: "txhzhonghezheng",
										addClass: "",
										childType: "checkbox",
										children: [
											{
												type: "checkbox",
												value: "头晕",
												name: "txhzhonghezheng1",
												addClass: "is-disabled"
											},
											{
												type: "checkbox",
												value: "头痛",
												name: "txhzhonghezheng1",
												addClass: "is-disabled"
											},
											{
												type: "checkbox",
												value: "呕吐",
												name: "txhzhonghezheng1",
												addClass: "is-disabled"
											},
											{
												type: "checkbox",
												value: "低血压",
												name: "txhzhonghezheng1",
												addClass: "is-disabled"
											},
										]
									},
								]
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "text",
								value: "告知：1.防跌倒（跌倒/晕倒/坠床）；2.血管通路自我监护（AVF  AVG  深静脉置管）3.用药（降压药 降糖药 抗凝药 降磷药 维生素 安定类 其他                     ）；4.饮食（水 钠 钾 磷 蛋白 脂肪 ）；5.预防DVT及PTE；6.其他"
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "text",
								value: "凝血程度：无 无凝血或数条纤维凝血；+ 部分凝血，成束纤维凝血或动、静脉壶管壁、滤网见轻微凝血； ++ 严重凝血，半数以上纤维凝血或滤网出现凝血块；+++ 凝血需要更换透析器、血路管",
								class: "line"
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "radio",
								prev: "患者去向：",
								name: "huanzhequxiang",
								children: [
									{
										type: "radio",
										value: "离院",
										name: "huanzhequxiang",
										addClass: "",
									},
									{
										type: "radio",
										value: "住院",
										name: "huanzhequxiang",
										addClass: "",
									}, {
										type: "input",
										prev: "（科室",
										next: "）",
										class: "bottom-line",
										value: "",
										name: "huanzhequxiangVal",
										style: "width:100px;text-align:center;",
										tasks: [
											{
												active: {
													huanzhequxiang: "住院"
												}
											}
										]
									},
									{
										type: "input",
										prev: "下次透析时间：",
										class: "bottom-line",
										value: "",
										name: "xiacitouxisj",
										style: "width:100px;text-align:center;",
									},
									{
										type: "input",
										prev: "护士签名：",
										class: "bottom-line",
										value: "",
										name: "hushiqianming",
										style: "width:100px;text-align:center;",
									},
								]
							},
						]
					}
				]
			]

		]
	}
}

export default tableModel;