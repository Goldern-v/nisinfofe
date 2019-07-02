function createXHR () {
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest()
  } else if (window.ActiveXObject) {
    var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp']

    for(var i = 0; i < versions.length; i++){
      try {
        return new ActiveXObject(versions[i]);
      } catch(e) {}
    }
  } else {
    throw new Error('您的浏览器不支持XHR')
  }
}

function getByClassName(root, name) {
  if (document.getElementsByClassName) {
    return root.getElementsByClassName(name)
  } else {
    var temp = root.getElementsByTagName('*')
    var els = []

    for(var i = 0; i < temp.length; i++) {
      var names = temp[i].className.split(' ')

      for (var j = 0; j < names.length; j++) {
        if (names[j] == name) els.push(temp[i])
      }
    }
    return els
  }
}

function on (el, event, handler) {
  if (!el) return

  if (el.addEventListener) {
    el.addEventListener(event, handler)
  } else if (el.attachEvent) {
    el.attachEvent('on' + event, handler)
  } else {
    el['on' + event] = handler
  }
}

var status = 'table'

var url = '/crNursing/api/noLoginApi/getSugarListWithPatientId'

var patientId = (window.location.search.match(/patientId=([^&]+)/) || [])[1] || ''
var visitId = (window.location.search.match(/visitId=([^&]+)/) || [])[1] || ''

var rows = 27

var count = 27 * 2

var wrapper = document.getElementById('wrapper')

on(document.getElementById('btn-switch'), 'click', onSwitch)

render()

function render () {
  var xhr = createXHR()

  xhr.open('post', url, true)

  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

  xhr.setRequestHeader('App-Token-Nursing', '51e827c9-d80e-40a1-a95a-1edc257596e7')

  xhr.send('patientId=' + patientId + '&visitId=' + visitId)

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = json_parse(xhr.responseText)
      
      if (status === 'table') {
        renderTable(json)
      } else {
        renderChart(json)
      }
    }
  }
}

function renderTable (data) {
  data = data.data

  var details = {
    name: data.name,
    gender: data.gender,
    age: data.age,
    deptName: data.deptName,
    bedNo: data.bedNo,
    inHosId: data.inHosId
  }

  var list = data.hisPatSugarList

  var total = Math.ceil(list.length / (count))

  for (var i = 0; i < total; i++) {
    var paper = createPaper(details, list.splice(0, count), i + 1, total)

    wrapper.appendChild(paper)
  }
}

function createPaper (details, list, page, total) {
  var paper = document.getElementById('template-paper').cloneNode(true)
  paper.className = paper.className.replace(/\s?template\s?/, '')

  for (prop in details) {
    getByClassName(paper, prop)[0].innerHTML = details[prop]
  }

  var tbody = getByClassName(paper, 'list')

  for (var i = 0; i < rows; i ++) {
    tbody[0].appendChild(createRow(list[i], list[i - 1]))
    tbody[1].appendChild(createRow(list[i + rows], i === 0 ? null : list[i + rows - 1]))
  }

  getByClassName(paper, 'page')[0].innerHTML = '第 ' + page + ' / ' + total + ' 页'

  return paper
}

function createRow (item, preItem) {
  var row = document.createElement('tr')

  item = item || {
    recordDate: '',
    sugarItem: '',
    sugarValue: '',
    riValue: '',
    nurse: ''
  }

  row.className = row.className.replace(/\s?template\s?/, '')

  var itemDate = item.recordDate.substring(5, 10)
  var itemTime = item.recordDate.substring(11, 16)

  if (preItem && preItem.recordDate.substring(5, 10) === itemDate) {
    itemDate = itemTime
  } else {
    itemDate = itemDate + ' ' + itemTime
  }
  
  row.appendChild(createTD(itemDate, 'tr'))
  row.appendChild(createTD(item.sugarItem))
  row.appendChild(createTD(item.sugarValue))
  row.appendChild(createTD(item.riValue))
  row.appendChild(createTD(item.nurse))

  return row
}

function createTD (content, className) {
  var td = document.createElement('td')
  td.title = content || ''
  td.innerHTML = content || '&nbsp;' // ie6单元格为空时，border有问题

  if (className) {
    td.className = className
  }

  return td
}

function renderChart (data) {
  var el = document.createElement('div')

  el.className = 'chart'

  wrapper.appendChild(el)

  var chart = echarts.init(el)

  var list = data.data.hisPatSugarList

  var xData = []

  var yData = []

  for (var i = 0; i < list.length; i++) {
    xData.push(list[i].recordDate)
    yData.push(parseFloat(list[i].sugarValue))
  }

  var option = {
    axisPointer: {
      link: {
        xAxisIndex: 'all'
      },
      label: {
        backgroundColor: '#777'
      }
    },
    axisPointer: {
      link: {
        xAxisIndex: 'all'
      },
      label: {
        backgroundColor: '#777'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      backgroundColor: 'rgba(245, 245, 245, 0.8)',
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      textStyle: {
        color: '#000'
      },
      extraCssText: 'width: 170px',
      formatter: function (params) {
        var i = params[0].dataIndex
        try {
          return '日期：' + list[i].recordDate.split(' ')[0] +
            '<br>时间：' + list[i].recordDate.split(' ')[1] +
            '<br>类型：' + list[i].sugarItem +
            '<br>血糖值：' + list[i].sugarValue + 'mmol/L' +
            '<br>RI剂量：' + (list[i].riValue || '--') + 'ü'
        } catch (e) {
          return ''
        }
      }
    },
    xAxis: {
      data: xData,
      splitLine: {
        show: false
      },
      axisLine: {
        show: false,
        onZero: false
      },
      axisLabel: {
        formatter: function (value) {
          return value.substring(5, 16)
        }
      }
    },
    yAxis : [
      {
        type : 'value',
        splitLine: {
          show: false
        },
        axisLine: {
          show: false,
          onZero: false
        }
      }
    ],
    series : [
      {
        name:'血糖值',
        type:'line',
        data: yData,
        symbol: "rect", //图标形状
        symbolSize: 2, //图标尺寸
        itemStyle: {
          normal: {
            color: "#87CEFA" //图标颜色
          }
        },
        lineStyle: {
          normal: {
            width: 2, //连线粗细
            color: "#87CEFA" //连线颜色
          }
        },
        markLine: {
          itemStyle: {
            normal: {
              label: {
                formatter: '{a}:{c}'
              }
            }
          },
          data: [
            [
              {name: '血糖最低值', xAxis: -1, yAxis: 3.9, value: 3.9},
              {name: '', xAxis: 99999, yAxis: 3.9}
            ],
            [
              {name: '血糖最高值', xAxis: -1, yAxis: 9.4, value: 9.4},
              {name: '', xAxis: 99999, yAxis: 9.4}
            ]
          ]
        }
      }
    ]
  }

  chart.setOption(option)
}

function onSwitch () {
  status = status === 'table' ? 'chart' : 'table'

  wrapper.innerHTML = ''
  document.body.className = status === 'table' ? '' : 'white'
  document.getElementById('btn-switch').innerHTML = status === 'table' ? '查看曲线' : '查看表格'

  render()
}
