#nisinfofe(智慧护理系统)说明文档 
###一、开发技术及环境
1.  Vue2.5+axios+scss/stylus。

2.  基于element-ui框架编写

3.  启动方式 yarn run dev 或 npm run
    dev（先配置vue.config.js（pages参数）对应医院环境

###二、项目简介
1.智慧护理系统主要给医院护理人员用，主要模块有护理归档、病区动态白板、

床位一览卡、护理文书（护理评估单、病人血糖）、护理体温单管理、交班志管理（护理交班记录）、护理巡视管理、执行单管理（药品、医嘱、临嘱等）、患者信息管理、不良事件管理等模块
###三、目录结构说明

1.  Build、build-new启动、打包配置文件

2.  build/dev-server.js启动文件

3.  Build/build/build.js 打包配置

4. Config、config-new 环境配置（主要区分各个医院环境）

5.   env.all.js
    所有医院环境配置，新增医院也要在此加（路由配置会用到医院配置加载对应医院路由）

6.  Index.js 主配置文件，包括api代理

7.  启动、打包前注意配置dev.env、prod.env文件的医院
8.  Src/ 业务页面、组件


###四、 其他说明

11. 此项目是标准的vue2.x版本，需要留意的是config、config-new/build、build-new配置文件夹里的配置
12. 后端给的api地址在http://192.168.1.54:3000/（先注册yapi）  
    https://info.cr-health.com:20212/


###五、其他目录结构说明：

```
project
│   README.md
│───public
│
└───src 主代码目录
│   │───asstes 静态文件
│   │───components 公共组件
│   │      
│   └───plugin 插件
│   │     │   constant 常量
│   │     │   request axios 配置封装
│   │     │   routes 路由
│   │   
│   └───api http请求
│   │
│   └───utils 工具方法
│   │  
│   └───Page 页面
│   │      │   ...
│   │      │   ...
│   │...
│   
│   

```
