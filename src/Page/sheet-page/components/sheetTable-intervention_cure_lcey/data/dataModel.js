let tableModel = {
	table: {
		cols: ["30px", ""],
		tbody: [
			[
				[{
					colspan: '3',
					rowspan: '',
					children: [{
						type: "radio",
						prev: "是否保留鞘管:",
						value: "",
						name: "sfblqg",
						style: "width:100px;text-align:left;",
						children: [{
								type: "radio",
								value: "是",
								name: "sfblqg",
								addClass: "",
							},
							{
								type: "radio",
								value: "否 ",
								name: "sfblqg",
								addClass: "",
							}
						]
					}, ]
				}],
				[{
					colspan: '3',
					rowspan: '',
					children: [{
						type: "checkbox",
						prev: "嘱患者:部位:",
						value: "",
						name: "zbr",
						style: "width:100px;text-align:left;",
						children: [{
								type: "checkbox",
								value: "左腕部",
								name: "zbr",
								addClass: "",
							},
							{
								type: "checkbox",
								value: "右腕部",
								name: "zbr",
								addClass: "",
							}, {
								type: "checkbox",
								value: "左下肢",
								name: "zbr",
								addClass: "",
							},
							{
								type: "checkbox",
								value: "右下肢",
								name: "zbr",
								addClass: "",
							},
						]
					}, {
						type: "radio",
						prev: "肢体制动:",
						value: "",
						name: "ztzd",
						style: "width:100px;text-align:left;",
						children: [{
								type: "radio",
								value: "12小时",
								name: "ztzd",
								addClass: "",
							},
							{
								type: "radio",
								value: "24小时",
								name: "ztzd",
								addClass: "",
							},
						]
					}, {
						type: "radio",
						prev: "平卧:",
						value: "",
						name: "pingwo",
						style: "width:100px;text-align:left;",
						children: [{
								type: "radio",
								value: "无需平卧",
								name: "pingwo",
								addClass: "",
							},
							{
								type: "radio",
								value: "平卧24小时",
								name: "pingwo",
								addClass: "",
							},
						]
					}, ]
				}],
				[{
					colspan: '1',
					rowspan: '',
					children: [{
						type: "input",
						prev: "介入诊疗结束时间:",
						class: "",
						name: "jrzljssj",
						value: "",
						style: "width:150px;text-align:left;"
					}]
				}]
			]
		]
	}
}

export default tableModel;
