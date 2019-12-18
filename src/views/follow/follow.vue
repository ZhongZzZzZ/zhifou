<template>
    <div class="article_container">
        {{msg}}
        <el-button type="primary" @click="sentMqtt(7,`文章xxx${userId}`)">点击发送信息</el-button>
    </div>
</template>

<script>
    import Paho from 'paho-mqtt'
    import {getLocalStorage} from "../../utils/auth";

    export default {
        name: "follow",
        data(){
            return{
                reconnectTimeout: 2000,
                mqtt: {},
                msg:"/zhifou",
                userId:getLocalStorage('user_id')
            }
        },
        created() {
            this.MQTTconnect()
        },
        methods:{
            sentMqtt(val,title){
                // var message = new Paho.Message('一代游戏传奇退役');
                // // // var message = new Paho.Message(`{article:${title}}`);
                // message.destinationName = `like/19`;
                // this.mqtt.send(message)
                this.mqtt.publish('like/19','一带带带',2,true);
            },
            addtopic(msg) {
                this.msg = msg;
            },
            MQTTconnect() {
                this.mqtt = new Paho.Client(  //实例化一个对象
                    '192.168.193.30',
                     9001,
                     "mqttjs" + this.getuuid() //防止多个浏览器打开，导致的问题，保证唯一性
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
                //console.log("异常掉线，掉线信息为:" + response.errorMessage);
                this.$message.error('连接失败')
            },
            //接收到消息，处理
            onMessageArrived(message) {
                console.log(message)
                var topics = message.destinationName;
                var msg = message.payloadString;
                console.log(message)
                this.$notify({
                    title: '提示',
                    message: `有用户点赞了您的文章:${msg}`,
                    type:"success",
                    duration:0
                });
                //判断主题，调用方法，这里可以订阅多个主题，在此处判断，接受不同的主题，调用不同的方法！
            },
        }
    }
</script>

<style lang="scss" scoped>
    .article_container{
        position: relative;
    }
</style>

<!--<template>-->
<!--    <div class="article_container">-->
<!--        {{msg}}-->
<!--        <el-button type="primary" @click="sentMqtt(6,`文章xxx${userId}`)">点击发送信息</el-button>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    import Paho from 'paho-mqtt'-->
<!--    import {getLocalStorage} from "../../utils/auth";-->

<!--    export default {-->
<!--        name: "follow",-->
<!--        data(){-->
<!--            return{-->
<!--                reconnectTimeout: 2000,-->
<!--                mqtt: {},-->
<!--                msg:"/zhifou",-->
<!--                userId:getLocalStorage('user_id')-->
<!--            }-->
<!--        },-->
<!--        created() {-->
<!--            this.MQTTconnect()-->
<!--        },-->
<!--        methods:{-->
<!--            sentMqtt(val,title){-->
<!--                var message = new Paho.Message('一代游戏传奇退役');-->
<!--                // var message = new Paho.Message(`{article:${title}}`);-->
<!--                message.destinationName = `like/${val}`;-->
<!--                this.mqtt.send(message);-->
<!--            },-->
<!--            addtopic(msg) {-->
<!--                this.msg = msg;-->
<!--            },-->
<!--            MQTTconnect() {-->
<!--                this.mqtt = new Paho.Client(  //实例化一个对象-->
<!--                    '192.168.193.30',-->
<!--                    9001,-->
<!--                    "client" + this.getuuid() //防止多个浏览器打开，导致的问题，保证唯一性-->
<!--                );-->
<!--                var options = {-->
<!--                    timeout: 10,-->
<!--                    useSSL: false,-->
<!--                    cleanSession: false,-->
<!--                    userName :'dave',-->
<!--                    password :'123456',-->
<!--                    onSuccess: this.onConnect,-->
<!--                    onFailure: function(message) {-->
<!--                        //连接失败定时重连-->
<!--                        setTimeout(this.MQTTconnect, this.reconnectTimeout);-->
<!--                    }-->
<!--                };-->
<!--                this.mqtt.onConnectionLost = this.onConnectionLost;-->
<!--                this.mqtt.onMessageArrived = this.onMessageArrived;-->
<!--                this.mqtt.connect(options);-->
<!--            },-->
<!--            getuuid() {-->
<!--                var uid = [];-->
<!--                var hexDigits = "0123456789abcdefghijklmnopqrst";-->
<!--                for (var i = 0; i < 32; i++) {-->
<!--                    uid[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);-->
<!--                }-->
<!--                uid[6] = "4";-->
<!--                uid[15] = hexDigits.substr((uid[15] & 0x3) | 0x8, 1);-->
<!--                var uuid = uid.join("");-->
<!--                return uuid;-->
<!--            },-->
<!--            //连接-->
<!--            onConnect() {-->
<!--                //连接成功，订阅主题-->
<!--                this.mqtt.subscribe(`like/${this.userId}`, {-->
<!--                    qos: 2-->
<!--                    //QoS0，最多一次送达。也就是发出去就fire掉，没有后面的事情了。-->
<!--                    // QoS1，至少一次送达。发出去之后必须等待ack，没有ack，就要找时机重发-->
<!--                    // QoS2，准确一次送达。消息id将拥有一个简单的生命周期。-->
<!--                });-->
<!--                console.log('connect-success')-->
<!--                //发布一个消息，再连接成功后，发送一个响应，确保连接没有问题；-->
<!--                // var message = new Paho.Message("Hello");-->
<!--                // message.destinationName = `like/${this.userId}`;-->
<!--                // this.mqtt.send(message);-->
<!--            },-->
<!--            //连接丢失-->
<!--            onConnectionLost(response) {-->
<!--                //console.log("异常掉线，掉线信息为:" + response.errorMessage);-->
<!--                window.alert("网络异常，连接已断开")-->
<!--            },-->
<!--            //接收到消息，处理-->
<!--            onMessageArrived(message) {-->
<!--                var topics = message.destinationName;-->
<!--                var msg = message.payloadString;-->
<!--                console.log(message)-->
<!--                if (msg == 'message'){-->
<!--                    return-->
<!--                }-->
<!--                this.$notify({-->
<!--                    title: '提示',-->
<!--                    message: `有用户点赞了您的文章:${msg}`,-->
<!--                    type:"success",-->
<!--                    duration:0-->
<!--                });-->
<!--                //判断主题，调用方法，这里可以订阅多个主题，在此处判断，接受不同的主题，调用不同的方法！-->
<!--            },-->
<!--        }-->
<!--    }-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--    .article_container{-->
<!--        position: relative;-->
<!--    }-->
<!--</style>-->
