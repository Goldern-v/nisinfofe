let tableModel = {
	table: {
		cols: ["30px", ""],
		tbody: [
			[
				[{
					colspan: 6,
					rowspan: '',
					style: "border:0;width:100%",
					children: [{
							type: "input",
							prev: "日期：",
							next: "年",
							value: "",
							name: "nian",
							style: "text-align:left;;width:30px;margin-bottom: 5px;"
						}, {
							type: "input",
							next: "月",
							value: "",
							name: "yue",
							style: "text-align:center;width:15px;margin-bottom: 5px;"
						}, {
							type: "input",
							next: "日",
							value: "",
							name: "ri",
							style: "text-align:center;width:15px;margin-bottom: 5px;"
						}, {
							type: "input",
							prev: "第",
							next: "次",
							value: "",
							name: "dijici",
							style: "text-align:center;width:15px;margin-bottom: 5px;",
							eleStyle: "margin:0 100px;"
						},
						{
							type: "input",
							prev: "第",
							next: "页",
							value: "",
							name: "dijiye",
							style: "text-align:center;width:15px;margin-bottom: 5px;"
						}
					]
				}],
				[{
						colspan: 3,
						rowspan: '',
						class: "title",
						children: [{
							type: "text",
							prev: "病 人 情 况 评 估 "
						}]
					},
					{
						colspan: 3,
						rowspan: '',
						class: "title",
						children: [{
							type: "text",
							prev: "置 换 液 / 透 析 液 处 方 "
						}]
					}
				],
				[{
						colspan: '3',
						rowspan: '1',
						style: "vertical-align: bottom;",
						children: [{
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
										value: "浅昏",
										name: "yishi",
										addClass: "",
									},
									{
										type: "radio",
										value: "迷深",
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
							}, {
								type: "radio",
								prev: "出血倾向：",
								name: "chuxueqingxiang",
								elementClass: "mr10 ",
								children: [{
										type: "radio",
										value: "无",
										name: "chuxueqingxiang",
										addClass: "",
									},
									{
										type: "radio",
										value: "有",
										name: "chuxueqingxiang",
										addClass: "",
									}
								]
							}, {
								type: "radio",
								prev: "水肿：",
								name: "shuizhong",
								children: [{
										type: "radio",
										value: "无",
										name: "shuizhong",
										addClass: "",
									},
									{
										type: "radio",
										value: "轻",
										name: "shuizhong",
										addClass: "",
									}, {
										type: "radio",
										value: "中",
										name: "shuizhong",
										addClass: "",
									},
									{
										type: "radio",
										value: "重",
										name: "shuizhong",
										addClass: "",
									}
								]
							},
							{
								type: "text",
								value: "<br/>"
							}, {
								type: "input",
								prev: "透析前:BP",
								class: "bottom-line",
								value: "",
								name: "shuzhangya",
								style: "width:30px;text-align:center;"
							}, {
								type: "input",
								prev: "/",
								next: "mmhg",
								class: "bottom-line",
								value: "",
								name: "shousuoya",
								style: "width:30px;text-align:center;"
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "input",
								prev: "P：",
								class: "bottom-line",
								value: "",
								name: "xinlv",
								style: "width:30px;text-align:center;",
								next: "次/min",
								elementClass: "txhtouxiqi"
							},
							{
								type: "input",
								prev: "R：",
								class: "bottom-line",
								value: "",
								name: "huxi",
								style: "width:30px;text-align:center;",
								next: "次/min"
							},
						]
					},
					{
						colspan: '1',
						rowspan: '6',
						style: "width: 25%",
						children: [{
								type: "text",
								prev: "置换液/透析液流速",
								name: "",
								style: "text-align:center;position:absolute;top:0px;"
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "input",
								prev: "PBP",
								next: "ml/h",
								class: "bottom-line",
								value: "",
								name: "PBP",
								style: "width:30px;text-align:center;"
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "input",
								prev: "前稀释",
								next: "ml/h",
								class: "bottom-line",
								value: "",
								name: "qianxishi",
								style: "width:30px;text-align:center;"
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "input",
								prev: "后稀释",
								next: "ml/h",
								class: "bottom-line",
								value: "",
								name: "houxishi",
								style: "width:30px;text-align:center;"
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "input",
								prev: "透析液",
								next: "ml/h",
								class: "bottom-line",
								value: "",
								name: "touxiye",
								style: "width:30px;text-align:center;"
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "input",
								prev: "超滤率",
								next: "ml/h",
								class: "bottom-line",
								value: "",
								name: "chaolvlv",
								style: "width:30px;text-align:center;"
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "input",
								prev: "0.9%氯化钠",
								next: "ml/h",
								class: "bottom-line",
								value: "",
								name: "lvhuana",
								style: "width:30px;text-align:center;"
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "input",
								prev: "5%葡萄糖",
								next: "ml/h",
								class: "bottom-line",
								value: "",
								name: "putaotang",
								style: "width:30px;text-align:center;"
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "input",
								prev: "灭菌注射用水",
								next: "ml/h",
								class: "bottom-line",
								value: "",
								name: "miejunzsys",
								style: "width:30px;text-align:center;"
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "input",
								prev: "25%硫酸镁",
								next: "ml/h",
								class: "bottom-line",
								value: "",
								name: "liusuanmei",
								style: "width:30px;text-align:center;"
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "input",
								prev: "5%碳酸氢钠",
								next: "ml/h",
								class: "bottom-line",
								value: "",
								name: "tansuanqinna",
								style: "width:30px;text-align:center;"
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "input",
								prev: "10%氯化钾",
								next: "ml/h",
								class: "bottom-line",
								value: "",
								name: "lvhuajia",
								style: "width:30px;text-align:center;"
							},
							{
								type: "text",
								value: "<br/>"
							},
							{
								type: "input",
								prev: "10%葡萄糖酸钙",
								next: "ml/h",
								class: "bottom-line",
								value: "",
								name: "putaotangsuangai",
								style: "width:30px;text-align:center;"
							}
						]
					}, {
						colspan: '1',
						rowspan: '6',
						style: "width: 25%;",
						children: [{
								type: "text",
								prev: "备 注",
								eleStyle: "width:100%;text-align:center;border-bottom:1.5px solid #000;"
							},
							{
								type: "input",
								prev: "每小时监测血压、血温、血容量、血透（动脉压、静脉压、跨膜压、凝血情况），随时观察病情变化",
								eleStyle: "padding:5px 2px;"
							}
						]
					}
				],
				[{
					colspan: 3,
					rowspan: '',
					class: "title",
					children: [{
						type: "text",
						prev: "血 管 通 路 "
					}]
				}],
				[{
					colspan: '3',
					rowspan: '',
					children: [{
							type: "radio",
							prev: "血管通路：",
							name: "xueguantonglu",
							children: [{
									type: "radio",
									value: "股静脉插管",
									name: "xueguantonglu",
									addClass: "",
								},
								{
									type: "radio",
									value: "颈内静脉插管",
									name: "xueguantonglu",
									addClass: "",
								},

								{
									type: "radio",
									value: "长期管",
									name: "xueguantonglu",
									addClass: "",
								},
								{
									type: "radio",
									value: "内萎",
									name: "xueguantonglu",
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
							prev: "通路出血：",
							name: "tongluchuxue",
							children: [{
									type: "radio",
									value: "良好",
									name: "tongluchuxue",
									addClass: "",
								},
								{
									type: "radio",
									value: "欠佳",
									name: "tongluchuxue",
									addClass: "",
								}, {
									type: "radio",
									value: "不畅",
									name: "tongluchuxue",
									addClass: "",
								},
								{
									type: "radio",
									value: "正向接",
									name: "tongluchuxue",
									addClass: "",
								},
								{
									type: "radio",
									value: "反向接",
									name: "tongluchuxue",
									addClass: "",
								}
							]
						}
					]
				}],
				[{
					colspan: 3,
					rowspan: '',
					class: "title",
					children: [{
						type: "text",
						prev: "透 析 方 案 "
					}]
				}],
				[{
					colspan: '3',
					rowspan: '',
					children: [{
							type: "radio",
							name: "touxifangan",
							children: [{
									type: "radio",
									value: "CVVH",
									name: "touxifangan",
									addClass: "",
								},
								{
									type: "radio",
									value: "CVVHD",
									name: "touxifangan",
									addClass: "",
								},
								{
									type: "radio",
									value: "CVVHDF",
									name: "touxifangan",
									addClass: "",
								},
								{
									type: "radio",
									value: "SCUF",
									name: "touxifangan",
									addClass: "",
								},
								{
									type: "radio",
									value: "HP",
									name: "touxifangan",
									addClass: "",
								}, {
									type: "radio",
									value: "血浆置换",
									name: "touxifangan",
									addClass: "",
								},
								{
									type: "radio",
									value: "血浆分离",
									name: "touxifangan",
									addClass: "",
								}
							]
						},
						{
							type: "text",
							value: "<br/>"
						}, {
							type: "input",
							prev: "抗凝方式：低分子肝素：",
							class: "bottom-line",
							value: "",
							name: "difenzigansu",
							style: "width:30px;text-align:center;"
						},
						{
							type: "text",
							value: "<br/>"
						}, {
							type: "input",
							prev: "肝素：首剂",
							class: "bottom-line",
							value: "",
							name: "shouji",
							style: "width:30px;text-align:center;",
							elementClass: "txhtouxiqi2"
						},
						{
							type: "input",
							prev: "追加",
							class: "bottom-line",
							value: "",
							name: "xinlv",
							style: "width:30px;text-align:center;"
						},
						{
							type: "input",
							prev: "总量",
							class: "bottom-line",
							value: "",
							name: "huxi",
							style: "width:30px;text-align:center;"
						}
					]
				}],
				[{
					colspan: 3,
					rowspan: '',
					class: "title",
					children: [{
						type: "text",
						prev: "一次性CRRT治疗组件 "
					}]
				}],
				[{
					colspan: '3',
					rowspan: '',
					children: [{
						type: "text",
						name: "",
						prev: "血路管、AV600S滤器、灌流器(130HA)、血浆吸附器装置、血浆分离器"
					}]
				}, {
					colspan: '3',
					rowspan: '',
					children: [{
						type: "text",
						prev: "医师签字：",
						value: "",
						class: "bottom-line",
						name: "signerName",
						style: "display: inline-block;width:55px;min-height: 13px;text-align:left;vertical-align: middle;",
						eleStyle: "margin-left: 5px;",
						sign: true,
						otherKey: "signerNo",
						elementClass: "signerName"
					}]
				}],
				[{
					colspan: '6',
					rowspan: '',
					class: "title",
					children: [{
						type: "text",
						prev: "监测记录",
					}]
				}]
			],
			// [
			// 	[{
			// 		colspan: '3',
			// 		rowspan: '',
			// 		class: 'footSign',
			// 		children: [{
			// 				type: "radio",
			// 				prev: "透析器凝血情况：",
			// 				next: "，",
			// 				name: "ningxueqk",
			// 				children: [{
			// 						type: "radio",
			// 						value: "0级",
			// 						name: "ningxueqk",
			// 						addClass: "",
			// 					},
			// 					{
			// 						type: "radio",
			// 						value: "1级",
			// 						name: "ningxueqk",
			// 						addClass: "",
			// 					},

			// 					{
			// 						type: "radio",
			// 						value: "2级",
			// 						name: "ningxueqk",
			// 						addClass: "",
			// 					},
			// 					{
			// 						type: "radio",
			// 						value: "3级",
			// 						name: "ningxueqk",
			// 						addClass: "",
			// 					}
			// 				]
			// 			},
			// 			{
			// 				type: "input",
			// 				prev: "总脱水量：",
			// 				next: "ml。",
			// 				name: "zongtsl",
			// 				class: "bottom-line"
			// 			},
			// 			{
			// 				type: "input",
			// 				prev: "实际脱水量：",
			// 				next: "ml。",
			// 				name: "sjtsl",
			// 				class: "bottom-line"
			// 			},
			// 			{
			// 				type: "text",
			// 				value: "<br/>"
			// 			},
			// 			{
			// 				type: "text",
			// 				prev: "护士签字："
			// 			}, {
			// 				type: "text",
			// 				value: "",
			// 				name: "auditorName",
			// 				style: "display: inline-block;width:55px;min-height: 13px;text-align:left;vertical-align: middle;",
			// 				sign: true,
			// 				otherKey: "auditorNo",
			// 				elementClass: "auditorName"
			// 			}, {
			// 				type: "input",
			// 				prev: "日期：",
			// 				next: "年",
			// 				value: "",
			// 				name: "year",
			// 				style: "text-align:left;;width:30px;margin-bottom: 5px;"
			// 			}, {
			// 				type: "input",
			// 				next: "月",
			// 				value: "",
			// 				name: "month",
			// 				style: "text-align:center;width:15px;margin-bottom: 5px;"
			// 			}, {
			// 				type: "input",
			// 				next: "日",
			// 				value: "",
			// 				name: "day",
			// 				style: "text-align:center;width:15px;margin-bottom: 5px;"
			// 			}
			// 		]
			// 	}]
			// ]
		]
	}
}

export default tableModel;
