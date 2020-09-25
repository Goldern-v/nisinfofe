let tableModel = {
	table: {
		cols: ["30px", ""],
		tbody: [
			[
				[{
					colspan: '3',
					rowspan: '',
					class: 'footSign',
					children: [{
							type: "radio",
							prev: "透析器凝血情况：",
							next: "，",
							name: "ningxueqk",
							children: [{
									type: "radio",
									value: "0级",
									name: "ningxueqk",
									addClass: "",
								},
								{
									type: "radio",
									value: "1级",
									name: "ningxueqk",
									addClass: "",
								},

								{
									type: "radio",
									value: "2级",
									name: "ningxueqk",
									addClass: "",
								},
								{
									type: "radio",
									value: "3级",
									name: "ningxueqk",
									addClass: "",
								}
							]
						},
						{
							type: "input",
							prev: "总脱水量：",
							next: "ml。",
							name: "zongtsl",
							class: "bottom-line"
						},
						{
							type: "input",
							prev: "实际脱水量：",
							next: "ml。",
							name: "sjtsl",
							class: "bottom-line"
						},
						{
							type: "text",
							value: "<br/>"
						},
						{
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
							style: "text-align:left;;width:30px;margin-bottom: 5px;"
						}, {
							type: "input",
							next: "月",
							value: "",
							name: "month",
							style: "text-align:center;width:15px;margin-bottom: 5px;"
						}, {
							type: "input",
							next: "日",
							value: "",
							name: "day",
							style: "text-align:center;width:15px;margin-bottom: 5px;"
						}
					]
				}]
			]
		]
	}
}

export default tableModel;
