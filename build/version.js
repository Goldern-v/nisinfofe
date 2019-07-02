
module.exports =
    {
        "软件名称": "宸瑞智慧护理系统",
        "版本号": "2019.07.02",
        "最近打包时间": "2019-07-02 10:15",
        "关于": {
            "研发单位": "广州宸瑞软件科技有限公司",
            "电话": "020-81192725  |  020-81192726",
            "邮箱": "gzcr@cr-health.com",
            "地址": "广州市海珠区江南大道中180号富力天域中心1301-1314室",
            "官网": "http://www.cr-health.com/",
            "投递简历": "http://www.cr-health.com/jobs12321321"
        },
        "proxyTable": {
            "/crNursing/api": {
                "target": "http://120.25.105.45:9864",
                "changeOrigin": true,
                "pathRewrite": {
                    "^/crNursing/api": "/crNursing/api"
                }
            },
            "/crNursing/formUrl": {
                "target": "http://120.25.105.45:9864",
                "changeOrigin": true,
                "pathRewrite": {
                    "^/crNursing/formUrl": "/crNursing/formUrl"
                }
            },
            "/crNursing/sheet-print": {
                "target": "http://120.25.105.45:9864",
                "changeOrigin": true,
                "pathRewrite": {
                    "^/crNursing/sheet-print": "/crNursing/sheet-print"
                }
            }
        }
    }
