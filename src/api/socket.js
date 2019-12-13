var socket = "";
var globalcb = null;
function sendSock(from_id, to_id, callback){
    globalcb = callback;
    if(typeof(WebSocket) === "undefined") {
        alert("您的浏览器不支持socket")
    } else {
        var path = 'ws://192.168.195.9:8123/ws/chat/' + from_id + '-' + to_id + '/';
        // 实例化socket
        socket = new WebSocket(path)
        // 监听socket连接
        socket.onopen = open()
        // 监听socket错误信息
        socket.onerror = error()
        // 监听socket消息
        socket.onmessage = getMessage()
    }
    if (socket.readyState === socket.OPEN) {
        // 若是ws开启状态
        send(agentData)
    } else if (socket.readyState === socket.CONNECTING) {
        // 若是 正在开启状态，则等待1s后重新调用
        setTimeout(function () {
          sendSock(agentData, callback)
        }, 1000)
    } else {
        // 若未开启 ，则等待1s后重新调用
        setTimeout(function () {
          sendSock(agentData, callback)
        }, 1000)
    }
}

function open() {
    console.log("socket连接成功")
}

function error() {
    console.log("连接错误")
}

function getMessage(msg) { // 接收信息
    this.current.message.push(msg.data)
    console.log(msg.data)
}

function send() {
    
    console.log("socket已经关闭")
}

function close() {
    console.log("socket已经关闭")
}

export {sendSock}