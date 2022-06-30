import SockJS from "sockjs-client";
import Stomp from "stompjs";

class WebSocketService {
  constructor() {
    this.connection()
  }
  isConnection = false
  // 重连次数 最多4次
  reconnectNo = 0
  // 自增的订阅id
  subscribId = 0
  // 等待订阅队列
  waitSubscribeList = []
  //实例的订阅队列，用去取消订阅
  caseSubscribeMap = {}
  // md5队列 每一个订阅数据的唯一标识
  md5List = JSON.parse(sessionStorage.mewsMd5List || null) || []

  socket = new SockJS("/crNursing/message", null, { timeout: 10000 })
  //本地开发测试http://120.197.141.41:9091
  // socket = new SockJS("http://120.224.211.7:9094/crNursing/message", null, { timeout: 1000 })
  stompClient = Stomp.over(this.socket)
  headers = {
    login: "mylogin",
    passcode: "mypasscode",
    "client-id": "my-client-id"
  }

  connection() {
    console.log('test-1', 1)
    // 向服务器发起websocket连接
    this.stompClient.connect(
      this.headers,
      frame => {
        this.reconnectNo = 0
        this.isConnection = true
        this.handleSubscribeList()
        console.log('连接成功~~~~~')
      },
      err => {
        console.log('test-err', err)
        console.log('test-this', this)
        if (this.reconnectNo < 4) {
          this.reconnectNo += 1
          console.log('test-this.reconnectNo', this.reconnectNo)
          this.connection()
        }
       }
    );
  }


  // 发送请求
  subscribe(url, callback) {
    this.subscribId += 1
    if (this.isConnection) {
      this.caseSubscribeMap[this.subscribId] = this.stompClient.subscribe(url, callback)
    } else {
      this.waitSubscribeList.push({
        url,
        callback,
        subscribId: this.subscribId,
      })
    }
    return this.subscribId
  }

  //处理订阅队列
  handleSubscribeList() {
    for (let item of this.waitSubscribeList) {
      try {
        this.caseSubscribeMap[item.subscribId] = this.stompClient.subscribe(item.url, item.callback)
      } catch (error) {

      }
    }
    this.waitSubscribeList = []
  }

  // 根据连接id取消订阅
  unsubscribe(subscribId) {
    try {
      this.caseSubscribeMap[subscribId].unsubscribe()
      delete this.caseSubscribeMap[subscribId]
    } catch (error) {
    }

  }

  // md5 队列插入
  addMd5List(md5) {
    this.md5List.push(md5)
    // 同步数据到浏览器缓存
    sessionStorage.mewsMd5List = JSON.stringify(this.md5List)
  }

  // 判断md5是否存在
  isInMd5List(md5) {
    return this.md5List.findIndex((item) => item === md5) > -1
  }
}



export default new WebSocketService()






// let wsTool = {
//   initWebSocket() {
//     this.connection();
//     let self = this;
//     // 断开重连机制,尝试发送消息,捕获异常发生时重连
//     this.timer = setInterval(() => {
//       try {
//         self.stompClient.send("test");
//       } catch (err) {
//         console.log("断线了: " + err);
//         self.connection();
//       }
//     }, 5000);
//     return this
//   },
//   connection() {
//     // 建立连接对象
//     this.socket = new SockJS("/crNursing/message"); //连接服务端提供的通信接口，连接以后才可以订阅广播消息和个人消息
//     // 获取STOMP子协议的客户端对象
//     this.stompClient = Stomp.over(this.socket);
//     // 定义客户端的认证信息,按需求配置
//     var headers = {
//       login: "mylogin",
//       passcode: "mypasscode",
//       // additional header
//       "client-id": "my-client-id"
//     };

//     this.stompClient.subscribe("/topic/mews/0341037/3", msg => {
//       // 订阅服务端提供的某个topic
//       console.log(JSON.parse(msg.body).data, 123123123); // msg.body存放的是服务端发送给我们的信息
//     });


//     // 向服务器发起websocket连接
//     this.stompClient.connect(
//       {},
//       frame => {
//         console.log('连接成功~~~~~')
//         this.stompClient.subscribe("/topic/mews/0341037/3", msg => {
//           // 订阅服务端提供的某个topic
//           console.log(JSON.parse(msg.body).data, 123123123); // msg.body存放的是服务端发送给我们的信息
//         });
//       },
//       err => { }
//     );
//   },
//   disconnect() {
//     if (this.stompClient != null) {
//       this.stompClient.disconnect();
//       console.log("Disconnected");
//     }
//   }
// };


// export default function () {
//   wsTool.initWebSocket()
// }
