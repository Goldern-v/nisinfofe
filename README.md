# 百辰源智慧护理信息系统

> 常用命令一览

## Build Setup 打包安装

```bash
# install dependencies 安装依赖
npm install
cnpm i

# serve with hot reload at localhost:8080 开发模式
npm run dev
npm run dev: houjie # 启动开发模式-东莞厚街医院
npn run dev: weixian # 启动开发模式-威县人民医院
npm run dev: wuhang # 启动开发模式-武汉市第一医院
npm run dev: guiyi # 启动开发模式-贵州医科大学附属医院
# or
yarn dev: houjie
yarn dev: weixian
yarn dev: wuhang
yarn dev: guiyi
yarn dev: 医院名

# build for production with minification 打包项目
npm run build
y # 打包东莞厚街医院
npn run build: weixian # 打包威县人民医院
npm run build: wuhang # 打包武汉市第一医院
npm run build: guiyi # 启动开发模式-贵州医科大学附属医院
# or
yarn build: houjie
yarn build: weixian
yarn build: wuhang
yarn build: guiyi
yarn build: 医院名

# 参数
yarn [build | dev]: [医院名] [打包人名]
yarn build: wuhang 林兆彬

# 新版配置的路径打包
yarn buildNew: wuhang 林兆彬
yarn buildNew: houjie 林兆彬
yarn buildNew: weixian 林兆彬

# 自动发布到45测试服务器
yarn deploy weixian 兆大彬 #打包并自动部署威县医院包到45测试服务器

# 其他
# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

开新医院时可以 搜索'新医院注意'
## 执行单接口报错
src/Page/implementation-list/api/index.js 接口没有默认接口，需要配置

## 床位一览卡同步按钮空白
src/Page/lesion/supPage/bed/component/search-con/search-con.vue
需要添加医院
