let tableModel = {
	table: {
		cols: ["30px", ""],
		tbody1: [
			[
				[
				{
					colspan: 2,
					rowspan: '',
					class: "",
					style: "padding-left: 4px;vertical-align:text-bottom;",
					children: [
						{
							type: "input",
							prev: "PICC导管放置部位:",
							name: "dgfzbw",
							style:"border-bottom:1px solid #000;width:100px;text-align:center;",
						},
						{
							type: "input",
							prev: "置管日期：",
							name: "zgrq",
							style:"border-bottom:1px solid #000;width:100px;text-align:center;",
						},
						{
							type: "radio",
							prev: "缝合固定：",
							name: "fhgd",
							children: [
								{
									type: "radio",
									value: "无",
									name: "fhgd",
									addClass: "",
								},
								{
									type: "radio",
									value: "有",
									name: "fhgd",
									addClass: "",
								},
								{
									type: "input",
									next: "针",
									name: "yjz",
									style:"border-bottom:1px solid #000;width:100px;text-align:center;",
									tasks: [{
										active: {
											fhgd: "有"
										}
									}]
								}]
						},
						{
							type: "text",
							value: "<br/>"
						},
						{
							type: "input",
							prev: "置管深度：",
							name: "zgsd",
							style:"border-bottom:1px solid #000;width:100px;text-align:center;",
							elementClass: 'mr10'
						},{
							type: "input",
							prev: "导管外露长度：",
							name: "dgwlcd",
							style:"border-bottom:1px solid #000;width:100px;text-align:center;"
						},{
							type: "input",
							prev: "基础臂围（或腿围）",
							name: "jcbwtw",
							next:"cm",
							style:"border-bottom:1px solid #000;width:100px;text-align:center;"
						},
						{
							type: "text",
							value: "<br/>"
						},{
							type: "input",
							prev: "导管末端X线定位：",
							name: "dgmdxxdw",
							style:"border-bottom:1px solid #000;width:100px;text-align:center;"
						},
					]
				}
			]
			]
		],
		tbody2: [
			[
				[{
					colspan: 2,
					rowspan: '',
					class: "",
					style: "text-align:center;vertical-align:middle;",
					children: [{
						type: "text",
						prev: "导管拔除 "
					}]
				},
				{
					colspan: 2,
					rowspan: '',
					class: "",
					style: "padding-left: 4px;vertical-align:text-bottom;",
					children: [{
							type: "radio",
							prev: "导管拔除原因： ",
							name: "dgbcyy",
							children: [{
									type: "radio",
									value: "治疗结束",
									name: "dgbcyy",
									addClass: "",
								},
								{
									type: "radio",
									value: "怀疑有感染 ",
									name: "dgbcyy",
									addClass: "",
								},{
									type: "radio",
									value: "证明有感染",
									name: "dgbcyy",
									addClass: "",
								},
								{
									type: "radio",
									value: "渗漏 ",
									name: "dgbcyy",
									addClass: "",
								},{
									type: "radio",
									value: "堵塞",
									name: "dgbcyy",
									addClass: "",
								},
								{
									type: "radio",
									value: "破损、断裂 ",
									name: "dgbcyy",
									addClass: "",
								},{
									type: "radio",
									value: "移位",
									name: "dgbcyy",
									addClass: "",
								},
								{
									type: "radio",
									value: "突然脱管 ",
									name: "dgbcyy",
									addClass: "",
								},{
									type: "radio",
									value: "出院",
									name: "dgbcyy",
									addClass: "",
								},
								{
									type: "radio",
									value: "转院",
									name: "dgbcyy",
									addClass: "",
								},{
									type: "radio",
									value: "死亡",
									name: "dgbcyy",
									addClass: "",
								},
								{
									type: "radio",
									value: "其他 ",
									name: "dgbcyy",
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
							prev: "拔管过程：",
							name: "bggc",
							children: [{
									type: "radio",
									value: "顺利",
									name: "bggc",
									addClass: "",
								},
								{
									type: "radio",
									value: "不顺利",
									name: "bggc",
									addClass: "",
								},
								{
									type: "input",
									class: "bottom-line",
									prev: "原因:",
									name: "bsldyy",
									style: "width:200px;border-bottom:1px solid #000;text-align:center;",
									tasks: [{
										active: {
											bggc: "不顺利"
										}
									}]
								},
							]
						},
						{
							type: "text",
							value: "<br/>"
						},
						{
							type: "radio",
							prev: "拔管后缝合：",
							name: "bghfh",
							children: [{
									type: "radio",
									value: "无",
									name: "bghfh",
									addClass: "",
								},
								{
									type: "radio",
									value: "有",
									name: "bghfh",
									addClass: "",
								},
								{
									type: "input",
									class: "",
									prev: "伤口位置:",
									name: "skwz",
									style: "width:200px;text-align:center;border-bottom:1px solid #000;",
									tasks: [{
										active: {
											bghfh: "有"
										}
									}]
								},
							]
						},
						{
							type: "text",
							value: "<br/>"
						},
						{
							type: "input",
							prev: "导管：总长度",
							next:"cm",
							name: "dgzcd",
							style:"border-bottom:1px solid #000;text-align:center;"
						},
						{
							type: "radio",
							prev: "拔管后缝合：",
							name: "bghfh",
							style:"color:red",
							children: [
								{
									type: "radio",
									value: "完整",
									name: "bghfh",
									addClass: "",
								},
								{
									type: "radio",
									value: "破损、断裂",
									name: "bghfh",
									addClass: "",
								},
								{
									type: "radio",
									value: "其他",
									name: "bghfh",
									addClass: "",
								}]
						},
						{
							type: "text",
							value: "<br/>"
						},
						{
							type: "radio",
							prev: "拔管后处理：",
							name: "bghcl",
							elementClass: 'mr10',
							children: [{
									type: "radio",
									value: "无菌纱块覆盖穿刺点",
									name: "bghcl",
									addClass: "",
								},
								{
									type: "radio",
									value: "导管培养",
									name: "bghcl",
									addClass: "",
								},{
									type: "radio",
									value: "血培养",
									name: "bghcl",
									addClass: "",
								},
								{
									type: "radio",
									value: "其他",
									name: "bghcl",
									addClass: "",
								},{
									type: "radio",
									value: "无",
									name: "bghcl",
									addClass: "",
								}
							]
						},
						{
							type: "text",
							value: "<br/>"
						},{
							type: "input",
							prev: "拔管时间：",
							name: "bgsj",
							style:"border-bottom:1px solid #000;width:80px;text-align:center;"
						},{
							type: "text",
							prev: "操作者:",
							value: "",
							colspan: 4,
							sign: true,
							class:'sign1',
							elementClass: 'txhtouxiqi2',
						},
						{
							type: "text",
							value: "<br/>"
						},{
							type: "input",
							prev: "审核时间：",
							name: "shsj",
							style:"border-bottom:1px solid #000;width:80px;text-align:center;"
						},{
							type: "text",
							prev: "审核者:",
							value: "",
							colspan: 4,
							sign: true,
							class:'sign2',
							elementClass: 'txhtouxiqi2',
						},
					]
				}
			]
			]
		]
	}
}

export default tableModel;
