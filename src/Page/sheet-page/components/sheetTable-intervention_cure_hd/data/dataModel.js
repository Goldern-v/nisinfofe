let tableModel = {
	table: {
		cols: ["30px", ""],
		tbody: [
			[
				[{
					colspan: '3',
					rowspan: '',
					children: [{
							type: "input",
							prev: "诊断：",
							class: "",
							value: "",
							name: "zhenduan",
							style: "width:100px;text-align:left;"
						},
						{
							type: "input",
							prev: "手术日期：",
							class: "",
							name: "shousuriqi",
							value: "",
							style: "width:100px;text-align:left;"
						}
					]
				}],
				[{
					colspan: '3',
					rowspan: '',
					children: [{
						type: "input",
						prev: "手术名称：",
						class: "",
						value: "",
						name: "shoushumingcheng",
						style: "width:100px;text-align:left;"
					}]
				}],
				[{
						colspan: '2',
						rowspan: '',
						children: [{
							type: "input",
							prev: "手术医生：",
							elementClass: "rightStyle",
							value: "",
							name: "shoushuyisheng",
							style: "width:100px;text-align:left;"
						}]
					},
					{
						colspan: '1',
						rowspan: '',
						children: [{
							type: "input",
							prev: "麻醉医师：",
							class: "",
							name: "mazuiyishi",
							value: ""
						}]
					}
				],
				[{
					colspan: '2',
					rowspan: '',
					children: [{
						type: "input",
						prev: "手术护士：",
						elementClass: "rightStyle",
						value: "",
						name: "shoushuhushi",
						style: "width:100px;text-align:left;"
					}],
				}, {
					colspan: '1',
					rowspan: '',
					children: [{
						type: "input",
						prev: "麻醉方式：",
						class: "",
						name: "mazuifangshi",
						value: ""
					}]
				}],
				[{
					colspan: '2',
					rowspan: '',
					children: [{
						type: "input",
						prev: "入室时间：",
						elementClass: "rightStyle",
						value: "",
						name: "rushishijian",
						style: "width:150px;text-align:left;"
					}],
				}, {
					colspan: '1',
					rowspan: '',
					children: [{
						type: "input",
						prev: "手术开始时间：",
						class: "",
						name: "shoushukaishishijian",
						value: "",
						style: "width:150px;text-align:left;"
					}]
				}],
				[{
						colspan: 1,
						rowspan: '',
						class: "title",
						children: [{
							type: "text",
							prev: "术 前 "
						}]
					},
					{
						colspan: 2,
						rowspan: '',
						class: "",
						style: "padding-left: 4px;",
						children: [{
								type: "radio",
								prev: "药物过敏史： ",
								name: "yaowuguominshi",
								children: [{
										type: "radio",
										value: "无",
										name: "yaowuguominshi",
										addClass: "",
									},
									{
										type: "radio",
										value: "有 ",
										name: "yaowuguominshi",
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
								prev: "意识状态：",
								name: "yishi",
								children: [{
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
										value: "昏睡",
										name: "yishi",
										addClass: "",
									},
									{
										type: "radio",
										value: "昏迷",
										name: "yishi",
										addClass: "",
									}
								]
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "checkbox",
								prev: "足背动脉/桡动脉脉搏：",
								name: "maibo"
							},
							{
								type: "radio",
								prev: "左侧：",
								name: "left",
								elementClass: 'mr10',
								children: [{
										type: "radio",
										value: "有",
										name: "left",
										addClass: "",
									},
									{
										type: "radio",
										value: "无",
										name: "left",
										addClass: "",
									}
								]
							}, {
								type: "radio",
								prev: "右侧：",
								name: "right",
								children: [{
										type: "radio",
										value: "有",
										name: "right",
										addClass: "",
									},
									{
										type: "radio",
										value: "无",
										name: "right",
										addClass: "",
									}
								]
							},
							{
								type: "text",
								value: "<br/>"
							}, {
								type: "radio",
								prev: "皮肤情况：",
								name: "pifuqingkuang",
								children: [{
										type: "radio",
										value: "无压疮",
										name: "pifuqingkuang",
										addClass: "",
									},
									{
										type: "radio",
										value: "有压疮",
										name: "pifuqingkuang",
										addClass: "",
									},
									{
										type: "input",
										class: "",
										prev: "（描述:",
										name: "youyachuang",
										style: "width:200px;text-align:left;",
										next: "）",
										tasks: [{
											active: {
												pifuqingkuang: "有压疮"
											}
										}]
									},
								]
							},
							{
								type: "text",
								value: "<br/>"
							}, {
								type: "input",
								prev: "BP：",
								class: "",
								value: "",
								name: "shuzhangya",
								style: "width:30px;text-align:center;"
							}, {
								type: "input",
								prev: "/",
								next: "mmhg",
								class: "",
								value: "",
								name: "shousuoya",
								style: "width:30px;text-align:center;",
								elementClass: "mr11"
							},
							{
								type: "input",
								prev: "P：",
								class: "",
								value: "",
								name: "xinlv",
								style: "width:30px;text-align:center;",
								elementClass: "mr11",
								next: "次/min"
							},
							{
								type: "input",
								prev: "R：",
								class: "",
								value: "",
								name: "huxi",
								style: "width:30px;text-align:center;",
								next: "次/min"
							}
						]
					}
				],
				[{
						colspan: 1,
						rowspan: '',
						class: "title",
						children: [{
							type: "text",
							prev: "术中"
						}]
					},
					{
						colspan: 2,
						rowspan: '',
						class: "",
						style: "padding-left: 5px;",
						children: [{
								type: "radio",
								prev: "手术体位：",
								name: "shoushutiwei",
								children: [{
										type: "radio",
										value: "仰卧位",
										name: "shoushutiwei",
										addClass: "",
									},
									{
										type: "radio",
										value: "侧卧位",
										name: "shoushutiwei",
										addClass: "",
									},
									{
										type: "radio",
										value: "俯卧位",
										name: "shoushutiwei",
										addClass: "",
									},
									{
										type: "radio",
										value: "其他",
										name: "shoushutiwei",
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
								prev: "使用电刀：",
								name: "shiyongdiandao",
								children: [{
										type: "radio",
										value: "无",
										name: "shiyongdiandao",
										addClass: "",
									},
									{
										type: "radio",
										value: "有",
										name: "shiyongdiandao",
										addClass: "",
									},
									{
										type: "input",
										prev: "负极板粘贴位置：",
										name: "fujibanzhantiewz",
										value: "",
										style: "width:100px;text-align:left;",
										tasks: [{
											active: {
												shiyongdiandao: "有"
											}
										}]
									},
									{
										type: "input",
										prev: "粘贴部位皮肤情况：",
										name: "zhantiebuweipifuqk",
										value: "",
										style: "width:100px;text-align:left;",
										tasks: [{
											active: {
												shiyongdiandao: "有"
											}
										}]
									}
								]
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "radio",
								prev: "吸氧：",
								name: "xiyang",
								children: [{
										type: "radio",
										class: "",
										value: "无",
										name: "xiyang",
									},
									{
										type: "radio",
										value: "有",
										name: "xiyang",
										addClass: "",
									},
									{
										type: "input",
										next: "升/分：",
										name: "xiyangliang",
										value: "",
										style: "width:50px;text-align:center;",
										tasks: [{
											active: {
												xiyang: "有"
											}
										}]
									},
									{
										type: "input",
										prev: "术中输液总量：",
										next: "ml",
										name: "shuzhongshuyezl",
										value: "",
										style: "width:50px;text-align:center;",
										tasks: [{
											active: {
												xiyang: "有"
											}
										}]
									}
								]
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "input",
								prev: "术中出血总量：",
								next: "ml",
								value: "",
								name: "szcxzl",
								style: "width:30px;text-align:center;",
								elementClass: 'mr10',
							},
							{
								type: "input",
								prev: "红细胞：",
								next: "u",
								value: "",
								name: "szsxzlhxb",
								style: "width:30px;text-align:center;",
								elementClass: 'mr10',
							},
							{
								type: "input",
								prev: "血浆：",
								next: "ml",
								value: "",
								name: "szsxzlxj",
								style: "width:30px;text-align:center;",
								elementClass: 'mr10',
							},
							{
								type: "input",
								prev: "全血：",
								next: "ml",
								value: "",
								name: "szsxzlhqx",
								style: "width:30px;text-align:center;",
								elementClass: 'mr10',
							},
							{
								type: "input",
								prev: "血小板：",
								next: "u",
								value: "",
								name: "szsxzlxxb",
								style: "width:30px;text-align:center;",
								elementClass: 'mr10',
							},
							{
								type: "input",
								prev: "冷沉淀：",
								next: "u",
								value: "",
								name: "szsxzllcd",
								style: "width:30px;text-align:center;"
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "input",
								prev: "术中出血总量：",
								next: "ml",
								value: "",
								name: "szcxzl",
								style: "width:30px;text-align:center;",
								elementClass: 'mr10',
							},
							{
								type: "input",
								prev: "尿量：",
								next: "ml",
								value: "",
								name: "szcxzlll",
								style: "width:30px;text-align:center;",
								elementClass: 'mr10',
							},
							{
								type: "input",
								prev: "其他：",
								next: "ml",
								value: "",
								name: "szcxzlhqt",
								style: "width:30px;text-align:center;",
								elementClass: 'mr10',
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "radio",
								prev: "穿刺部位：",
								name: "chuancibuwei",
								children: [{
										type: "radio",
										value: "右侧股动脉",
										name: "chuancibuwei",
										addClass: "",
									},
									{
										type: "radio",
										value: "左侧股动脉",
										name: "chuancibuwei",
										addClass: "",
									},
									{
										type: "radio",
										value: "右侧桡动脉",
										name: "chuancibuwei",
										addClass: "",
									},
									{
										type: "radio",
										value: "左侧桡动脉",
										name: "chuancibuwei",
										addClass: "",
									},
									{
										type: "radio",
										value: "其他部位",
										name: "chuancibuwei",
										addClass: "",
									},
								]
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "input",
								prev: "术中肝素用量：",
								next: "U",
								value: "",
								name: "shuzhonggansuyl",
								style: "width:50px;text-align:center;",
								elementClass: "mr11"
							},
							{
								type: "input",
								prev: "造影剂用量：",
								next: "ml",
								value: "",
								name: "zaoyingjiyl",
								style: "width:50px;text-align:center;"
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "radio",
								prev: "介入时进行的护理操作：",
								name: "jierushijinxingdehlcz",
								children: [{
										type: "radio",
										value: "留置导尿管",
										name: "jierushijinxingdehlcz",
										addClass: "",
									},
									{
										type: "radio",
										value: "留置胃管",
										name: "jierushijinxingdehlcz",
										addClass: "",
									},
									{
										type: "radio",
										value: "其他",
										name: "jierushijinxingdehlcz",
										addClass: "",
									}
								]
							}
						]
					}
				],
				[{
						colspan: 1,
						rowspan: '',
						class: "title",
						children: [{
							type: "text",
							prev: "术后"
						}]
					},
					{
						colspan: 2,
						rowspan: '',
						class: "",
						style: "padding-left: 5px;",
						children: [{
								type: "input",
								prev: "术毕时间：",
								value: "",
								name: "shubishijian",
								style: "width:100px;text-align:center;",
								elementClass: "mr10",
								class: "line"
							},
							{
								type: "input",
								prev: "离室时间：",
								value: "",
								name: "lishishijian",
								style: "width:50px;text-align:center;"
							},
							{
								type: "text",
								value: "<br/>"
							}, {
								type: "input",
								prev: "离室BP：",
								class: "",
								value: "",
								name: "shuzhangya",
								style: "width:30px;text-align:center;"
							}, {
								type: "input",
								prev: "/",
								next: "mmhg",
								class: "",
								value: "",
								name: "shousuoya",
								style: "width:30px;text-align:center;",
								elementClass: "mr11"
							},
							{
								type: "input",
								prev: "P：",
								class: "",
								value: "",
								name: "xinlv",
								style: "width:30px;text-align:center;",
								elementClass: "mr11",
								next: "次/min"
							},
							{
								type: "input",
								prev: "R：",
								class: "",
								value: "",
								name: "huxi",
								style: "width:30px;text-align:center;",
								next: "次/min"
							},
							{
								type: "text",
								value: "<br/>"
							}, {
								type: "radio",
								prev: "术毕去向：",
								name: "shubiquxiang",
								children: [{
										type: "radio",
										value: "病房",
										name: "shubiquxiang",
										addClass: "",
									},
									{
										type: "radio",
										value: "ICU",
										name: "shubiquxiang",
										addClass: "",
									},
									{
										type: "radio",
										value: "其他",
										name: "shubiquxiang",
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
								prev: "导管/鞘管的留置情况及部位：",
								name: "dgqglzqkjbw",
								children: [{
										type: "radio",
										value: "无",
										name: "dgqglzqkjbw",
										addClass: "",
									},
									{
										type: "radio",
										value: "有",
										name: "dgqglzqkjbw",
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
								prev: "引流管的留置情况及部位：",
								name: "ylglzqkjbw",
								children: [{
										type: "radio",
										value: "无",
										name: "ylglzqkjbw",
										addClass: "",
									},
									{
										type: "radio",
										value: "有",
										name: "ylglzqkjbw",
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
								prev: "局部创口情况：",
								name: "jbckqk",
								children: [{
										type: "radio",
										value: "干燥",
										name: "jbckqk",
										addClass: "",
									},
									{
										type: "radio",
										value: "渗血",
										name: "jbckqk",
										addClass: "",
									}, {
										type: "radio",
										value: "血肿",
										name: "jbckqk",
										addClass: "",
									},
									{
										type: "radio",
										value: "出血",
										name: "jbckqk",
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
								prev: "穿刺口处理：",
								name: "cckcl",
								children: [{
										type: "radio",
										value: "无",
										name: "cckcl",
										addClass: "",
									},
									{
										type: "radio",
										value: "血管缝合器",
										name: "cckcl",
										addClass: "",
									}, {
										type: "radio",
										value: "压迫器",
										name: "cckcl",
										addClass: "",
									},
									{
										type: "radio",
										value: "弹力绷带",
										name: "cckcl",
										addClass: "",
									},
									{
										type: "radio",
										value: "沙袋",
										name: "cckcl",
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
								prev: "受压皮肤情况：",
								name: "sypfqk",
								children: [{
										type: "radio",
										value: "正常",
										name: "sypfqk",
										addClass: "",
									},
									{
										type: "radio",
										value: "颜色改变",
										name: "sypfqk",
										addClass: "",
									}, {
										type: "radio",
										value: "其他",
										name: "sypfqk",
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
								prev: "足背动脉/桡动脉搏动：",
								name: "zbdmrdmbd",
								children: [{
										type: "radio",
										value: "有",
										name: "zbdmrdmbd",
										addClass: "",
									},
									{
										type: "radio",
										value: "无",
										name: "zbdmrdmbd",
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
								prev: "健康教育（患者/家属）：",
								name: "jiankangjiaoyu",
								children: [{
										type: "radio",
										value: "术侧肢体制动6小时",
										name: "jiankangjiaoyu",
										addClass: "",
									},
									{
										type: "radio",
										value: "卧床24小时",
										name: "jiankangjiaoyu",
										addClass: "",
									}, {
										type: "radio",
										value: "沙袋压迫穿刺6小时",
										name: "jiankangjiaoyu",
										addClass: "",
									},
									{
										type: "radio",
										value: "其他",
										name: "jiankangjiaoyu",
										addClass: "",
									}
								]
							}
						]
					}
				]
			],
			[

				[{
					colspan: '3',
					rowspan: '',
					class: 'footSign',
					children: [{
						type: "text",
						prev: "护士签字："
					}, {
						type: "text",
						prev: "",
						value: "",
						name: "auditorName",
						style: "display: inline-block;width:55px;min-height: 13px;text-align:left;vertical-align: middle;",
						sign: true,
						otherKey: "auditorNo",
						elementClass: "auditorName"
					}, {
						type: "input",
						prev: "日期：",
						next: "年",
						value: "",
						name: "year",
						style: "text-align:left;;width:30px;"
					}, {
						type: "input",
						next: "月",
						value: "",
						name: "month",
						style: "text-align:center;width:15px;"
					}, {
						type: "input",
						next: "日",
						value: "",
						name: "day",
						style: "text-align:center;width:15px;"
					}]
				}]
			]

		]
	}
}

export default tableModel;
