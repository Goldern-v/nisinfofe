let tableModel = {
	table: {
		cols: ["30px", ""],
		tbody: [
			[
        [{
					colspan: '3',
					rowspan: '',
					children: [
          {
            type: "input",
            prev: "",
            class: "bottom-line",
            value: " ",
            name: "",
            addClass: "",
            style: 'width:25px;text-align:left;visibility:hidden;',
          },
          {
            type: "input",
            prev: "手术名称：",
            class: "bottom-line",
            value: " ",
            name: "shoushumingcheng",
            addClass: "",
            style: 'width:100px;text-align:left;',
            elementClass: "mr11",
          },
          {
						type: "radio",
						prev: "",
						value: "",
						name: "huikefangshi",
						style: "width:100px;text-align:left;",
						elementClass: "mr11",
						children: [{
								type: "radio",
								value: "普通",
								name: "shoushufangshi",
								addClass: "",
							},
              {
								type: "radio",
								value: "急诊",
								name: "shoushufangshi",
								addClass: "",
							},
						]
					},
          {
            type: "input",
            prev: "备注：",
            class: "bottom-line",
            value: " ",
            name: "beizhu",
            addClass: "",
            style: 'width:100px;text-align:left;',
          },
          ] 
        }],
				[{
					colspan: '3',
					rowspan: '',
					children: [{
						type: "checkbox",
						prev: "一、术前准备及指导：",
						value: "",
						name: "shuqianzhunbeijizhidao",
						style: "width:100px;text-align:left;",
						// elementClass: "mr11 txhtouxiqi",
						children: [{
								type: "checkbox",
								value: "备皮",
								name: "shuqianzhunbeijizhidao",
								addClass: "",
							},
						]
					}, 
          {
						type: "input",
						prev: "",
						class: "bottom-line",
						value: "",
						name: "bp年",
						style: "width:30px;text-align:center;margin-left:10px;",
					}, 
          {
						type: "input",
						prev: "年",
						class: "bottom-line",
						value: "",
						name: "bp月",
						style: "width:30px;text-align:center;",
					},
          {
						type: "input",
						prev: "月",
						class: "bottom-line",
						value: "",
						name: "bp日",
						style: "width:30px;text-align:center;",
					},
          {
						type: "input",
						prev: "日",
						class: "bottom-line",
						value: "",
						name: "bp时",
						style: "width:30px;text-align:center;",
					},
          {
						type: "input",
						prev: "时",
						class: "bottom-line",
						value: "",
						name: "bp分",
						style: "width:30px;text-align:center;",
					},
          {
						type: "",
						prev: "分",
						class: "bottom-line",
						value: "",
						name: "likeshijian",
						style: "width:30px;text-align:center;",
						elementClass: "mr11"
					},
          {
            type: "input",
            prev: "护士签字：",
            class: "bottom-line",
            value: " ",
            name: "youVal1",
            addClass: "",
            style: 'width:100px;text-align:left;',
            elementClass: "mr11",
            tasks: [{
              active: {
                tineiliuzhiwu: "有"
              }
            }]
          },
        ]
        }],
        [{
					colspan: '3',
					rowspan: '',
					children: [
            {
              type: "",
              prev: "",
              class: "bottom-line",
              value: " ",
              name: "youVal2",
              addClass: "",
              elementClass: "mr11",
              style: 'width:100px;text-align:left;',
            }, 
            {
						type: "checkbox",
						prev: "",
						value: "",
						name: "shuqianzhunbeijizhidao",
						style: "width:100px;text-align:left;",
						elementClass: "mr11",
						children: [{
								type: "checkbox",
								value: "讲解手术大致过程",
								name: "shuqianzhunbeijizhidao",
								addClass: "",
							},
              {
								type: "checkbox",
								value: "床上练习大小便",
								name: "shuqianzhunbeijizhidao",
								addClass: "",
							},
              {
								type: "checkbox",
								value: "饮食",
								name: "shuqianzhunbeijizhidao",
								addClass: "",
							},
              {
								type: "checkbox",
								value: "服药指导",
								name: "shuqianzhunbeijizhidao",
								addClass: "",
							},
              {
								type: "checkbox",
								value: "心理",
								name: "shuqianzhunbeijizhidao",
								addClass: "",
							},
              {
								type: "checkbox",
								value: "休息",
								name: "shuqianzhunbeijizhidao",
								addClass: "",
							},
						]
					}, 
          {
            type: "input",
            prev: "护士签字：",
            class: "bottom-line",
            value: " ",
            name: "youVal2",
            addClass: "",
            style: 'width:100px;text-align:left;',
            tasks: [{
              active: {
                tineiliuzhiwu: "有"
              }
            }]
          }]
        }],
        [{
					colspan: '3',
					rowspan: '',
					children: [
          {
						type: "input",
						prev: "二、离科时间：",
						class: "bottom-line",
						value: "",
						name: "lk年",
						style: "width:30px;text-align:center;",
					}, 
          {
						type: "input",
						prev: "年",
						class: "bottom-line",
						value: "",
						name: "lk月",
						style: "width:30px;text-align:center;",
					},
          {
						type: "input",
						prev: "月",
						class: "bottom-line",
						value: "",
						name: "lk日",
						style: "width:30px;text-align:center;",
					},
          {
						type: "input",
						prev: "日",
						class: "bottom-line",
						value: "",
						name: "lk时",
						style: "width:30px;text-align:center;",
					},
          {
						type: "input",
						prev: "时",
						class: "bottom-line",
						value: "",
						name: "lk分",
						style: "width:30px;text-align:center;",
					},
          {
						type: "",
						prev: "分",
						class: "bottom-line",
						value: "",
						name: "likeshijian",
						style: "width:30px;text-align:center;",
						elementClass: "mr11"
					}, 
          {
						type: "radio",
						prev: "离科方式：",
						value: "",
						name: "likefangshi",
						style: "width:100px;text-align:left;",
						// elementClass: "mr11 txhtouxiqi",
						children: [{
								type: "radio",
								value: "平车",
								name: "likefangshi",
								addClass: "",
							},
              {
								type: "radio",
								value: "步行",
								name: "likefangshi",
								addClass: "",
							},
              {
								type: "radio",
								value: "轮椅",
								name: "likefangshi",
								addClass: "",
							},
						]
					}]
        }],
        [{
					colspan: '3',
					rowspan: '',
					children: [
          {
            type: "input",
            prev: "三、回科时间：",
            class: "bottom-line",
            value: "",
            name: "hk年",
            style: "width:30px;text-align:center;",
          }, 
          {
            type: "input",
            prev: "年",
            class: "bottom-line",
            value: "",
            name: "hk月",
            style: "width:30px;text-align:center;",
          },
          {
            type: "input",
            prev: "月",
            class: "bottom-line",
            value: "",
            name: "hk日",
            style: "width:30px;text-align:center;",
          },
          {
            type: "input",
            prev: "日",
            class: "bottom-line",
            value: "",
            name: "hk时",
            style: "width:30px;text-align:center;",
          },
          {
            type: "input",
            prev: "时",
            class: "bottom-line",
            value: "",
            name: "hk分",
            style: "width:30px;text-align:center;",
          },
          {
            type: "",
            prev: "分",
            class: "bottom-line",
            value: "",
            name: "likeshijian",
            style: "width:30px;text-align:center;",
            elementClass: "mr11"
          },  
          {
						type: "radio",
						prev: "回科方式：",
						value: "",
						name: "huikefangshi",
						style: "width:100px;text-align:left;",
						// elementClass: "mr11 txhtouxiqi",
						children: [{
								type: "radio",
								value: "平车",
								name: "huikefangshi",
								addClass: "",
							},
              {
								type: "radio",
								value: "步行",
								name: "huikefangshi",
								addClass: "",
							},
						]
					}]
        }],
        [{
					colspan: '3',
					rowspan: '',
					children: [
          {
						type: "radio",
						prev: "四、穿刺部位：",
						value: "",
						name: "chuancibuwei",
						style: "width:100px;text-align:left;",
						elementClass: "mr11",
						children: [{
								type: "radio",
								value: "桡动脉",
								name: "chuancibuwei",
								addClass: "",
							},
              {
								type: "radio",
								value: "股动脉",
								name: "chuancibuwei",
								addClass: "",
							},
              {
								type: "radio",
								value: "股静脉",
								name: "chuancibuwei",
								addClass: "",
							},
              {
								type: "radio",
								value: "股锁骨下静脉",
								name: "chuancibuwei",
								addClass: "",
							},
						]
					},
          {
						type: "radio",
						prev: "压迫方式：",
						value: "",
						name: "yapofangshi",
						style: "width:100px;text-align:left;",
						elementClass: "mr11",
						children: [{
								type: "radio",
								value: "腕带",
								name: "yapofangshi",
								addClass: "",
							},
              {
								type: "radio",
								value: "盐袋",
								name: "yapofangshi",
								addClass: "",
							},
						]
					},
          {
						type: "radio",
						prev: "使用闭合器：",
						value: "",
						name: "shiyongbiheqi",
						style: "width:100px;text-align:left;",
						// elementClass: "mr11 txhtouxiqi",
						children: [{
								type: "radio",
								value: "无",
								name: "shiyongbiheqi",
								addClass: "",
							},
              {
								type: "radio",
								value: "有",
								name: "shiyongbiheqi",
								addClass: "",
							},
						]
					}]
        }],
			]
		]
	}
}

export default tableModel;
