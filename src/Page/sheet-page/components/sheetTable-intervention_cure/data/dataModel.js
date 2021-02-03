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
						prev: "药物试验结果",
						// elementClass: "txhtouxiqi",
						class: "bottom-line",
						value: "",
						name: "ywsyjg",
						style: "width:200px;text-align:left;margin-right: 160px;"
					},{
						type: "input",
						prev: "介入手术或造影名称",
						// elementClass: "txhtouxiqi",
						class: "bottom-line",
						value: "",
						name: "jrsshzymc",
						style: "width:600px;text-align:left;"
					}
					]
				}],
				[{
					colspan: '3',
					rowspan: '',
					children: [{
						type: "radio",
						prev: "穿刺血管:",
						value: "",
						name: "chuancixueguan",
						style: "width:100px;text-align:left;",
						// elementClass: "mr11 txhtouxiqi",
						children: [{
								type: "radio",
								value: "动脉",
								name: "chuancixueguan",
								addClass: "",
							},
							{
								type: "radio",
								value: "静脉 ",
								name: "chuancixueguan",
								addClass: "",
							}
						]
					}, {
						type: "input",
						prev: "部位/名称",
						class: "bottom-line",
						value: "",
						name: "buweimingcheng",
						style: "width:250px;text-align:left;",
						elementClass: "mr11"
					}, {
						type: "radio",
						prev: "体内留置物:",
						value: "",
						name: "tineiliuzhiwu",
						style: "width:100px;text-align:left;",
						children: [{
								type: "radio",
								value: "无",
								name: "tineiliuzhiwu",
								addClass: "",
							},
							{
								type: "radio",
								value: "有",
								name: "tineiliuzhiwu",
								addClass: "",
							},
							{
								type: "input",
								prev: "名称:",
								class: "bottom-line",
								value: " ",
								name: "youVal",
								addClass: "",
								style: 'width:250px;text-align:left;',
								tasks: [{
									active: {
										tineiliuzhiwu: "有"
									}
								}]
							}
						]
					}]
				}]
			]
		]
	}
}

export default tableModel;
