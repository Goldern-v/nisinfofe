import Mock from 'mockjs'

const Random = Mock.Random
// 设置全局延时，没有延时的话，有时候会检测不到数据变化
Mock.setup({
  timeout: '300-600'
})

// 创建一个数组用来接收模拟的数据
// const mocklist = []
// const count = 5;

// for (let i = 0; i < count; i++) {
//   mocklist.push(Mock.mock({
//     id: '@id',
//     name: '@cname',
//     'phone|1': /^1[0-9]{10}$/,
//     email: '@email',
//     'education|1': ['本科', '大专', '硕士', '博士', '中专'],
//     'graduationschool|1': ['西南财经', '北京交通大学', '重庆工商大学', '清华大学', '西南大学', '上海复旦大学'],
//     'profession|1': ['教授', '律师', '医生', '公务员', '大学老师', '警察', '白领']
//   }))
// }

//
let getUnitList = () => {
    let list = require('./nursingUnit.json')
    return list
}

// 制作各个接口
Mock.mock('/getUnitlist', 'get', getUnitList)
// Mock.mock('/getuser', 'post', getUser)
// Mock.mock('/deleteuser', 'post', deleteUser)
// Mock.mock('/adduser', 'post', addUser)
// Mock.mock('/updateuser', 'post', updateUser)

// 最后将 Mock 导出
export default Mock
