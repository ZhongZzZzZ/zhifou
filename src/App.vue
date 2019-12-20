<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>
<script>
    import Paho from 'paho-mqtt'
    import {getLocalStorage} from "./utils/auth";
    import {EventBus} from "./api/busEvent";

    export default {
  name: 'App',
    data(){
      return{
          reconnectTimeout: 2000,
          mqtt: {},
          msg:"",
          userId:getLocalStorage('user_id')
      }
    },
  components: {
  },
    created() {
        this.MQTTconnect()
    },
    methods:{
        sentMqtt(val,id){
            // var message = new Paho.Message('一代游戏传奇退役');
            // // // var message = new Paho.Message(`{article:${title}}`);
            // message.destinationName = `like/6`;
            // this.mqtt.send(message)
            this.mqtt.publish(`like/${id}`,val,2,true);
        },
        MQTTconnect() {
            this.mqtt = new Paho.Client(  //实例化一个对象
                '192.168.193.30',
                9001,
                "mqttjs" + this.userId //防止多个浏览器打开，导致的问题，保证唯一性
            );
            var options = {
                timeout: 10000,
                useSSL: false,
                cleanSession: false,
                userName :'dave',
                password :'123456',
                keepAliveInterval:1000000,
                onSuccess: this.onconnect,
                onFailure: function(message) {
                    //连接失败定时重连
                    setTimeout(this.MQTTconnect, this.reconnectTimeout);
                }
            };
            this.mqtt.onConnectionLost = this.onConnectionLost;
            this.mqtt.onMessageArrived = this.onMessageArrived;
            this.mqtt.connect(options);
        },
        getuuid() {
            var uid = [];
            var hexDigits = "0123456789abcdefghijklmnopqrst";
            for (var i = 0; i < 32; i++) {
                uid[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            uid[6] = "4";
            uid[15] = hexDigits.substr((uid[15] & 0x3) | 0x8, 1);
            var uuid = uid.join("");
            return uuid;
        },
        //连接
        onconnect() {
            //连接成功，订阅主题
            this.mqtt.subscribe(`like/${this.userId}`,{qos:2})
            //发布一个消息，再连接成功后，发送一个响应，确保连接没有问题；
            // var message = new Paho.Message("Hello");
            // message.destinationName = `like/${this.userId}`;
            // this.mqtt.send(message);
        },
        //连接丢失
        onConnectionLost(response) {
        },
        //接收到消息，处理
        onMessageArrived(message) {
            console.log(message)
            var msg = message.payloadString;
            let arr = msg.split('*&^*&^')
            console.log(arr)
            if (arr[2] == 'like'){
                this.$notify({
                    title: '提示',
                    message: `${arr[1]}点赞了您的文章:${arr[0]}`,
                    type:"success",
                    duration:1500
                });
            }else{
                this.$notify({
                    title: '提示',
                    message: `${arr[1]}收藏了您的文章:${arr[0]}`,
                    type:"success",
                    duration:1500
                });
            }
            //判断主题，调用方法，这里可以订阅多个主题，在此处判断，接受不同的主题，调用不同的方法！
        },
    },
        mounted() {
          EventBus.$on('sentMqtt',(val,id)=> {
              this.sentMqtt(val,id)
          })
        }
    }
</script>
<style lang="scss">
  @import "assets/css/reset";
  body{
    background-color: #f6f6f6;
  }
</style>
