<template>
    <div>
        <Nav style="position:sticky;"></Nav>
        <div class="content">
            <el-col :span="6">
                <el-menu default-active="1" class="el-menu-vertical-demo">
                    <el-menu-item class="search_item">
                        <el-input placeholder="查找工号" prefix-icon="el-icon-search" v-model="search"></el-input>
                    </el-menu-item>
                    <el-menu-item  v-for="item in users" :key="item.id" @click="chat(item)" :index="item.id">
                        <img class="user_avatar" :src="item.url">
                        <span slot="title">{{ item.name }}</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <div class="chat_window" v-if="chatShow">
                <div class="chat_name">{{ current.name }}</div>
                <div class="chat_content" @scroll="onScroll(current.id)">
                    <div class="loadmore"><i class="el-icon-loading" v-if="!noMore"></i> {{ more_msg }}</div>
                    <div class="chat_message" v-for="item in current.message" :key="item">
                        <div class="other_side" v-if="!item.role">
                            <img :src="current.url" class="message_avatar">
                            <div class="message_content"> {{ item.content }}</div>
                            <div class="corr">
                                <em class="arrline">◆</em>
                                <span class="arrclr">◆</span>
                            </div>
                        </div>
                        <div class="my_side" v-else>
                            <div class="message_content"> {{ item.content }}</div>
                            <img :src="myimg" class="message_avatar">
                            <div class="corr">
                                <em class="arrline">◆</em>
                                <span class="arrclr">◆</span>
                            </div>
                        </div>
                    </div>
                    <div class="ready_message chat_message" v-for="item in current.readymsg" :key="item">
                        <div class="my_side">
                            <div class="tip">{{tip}}</div>
                            <div class="message_content"> {{ item.content }}</div>
                            <img :src="myimg" class="message_avatar">
                            <div class="corr">
                                <em class="arrline">◆</em>
                                <span class="arrclr">◆</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="chat_textbox">
                    <textarea v-model="mymsg" @keyup.enter="onSubmit(current.id)"></textarea>
                    <el-button type="primary" @click="onSubmit(current.id)">发送</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import imgsrc from "../../assets/avatar.jpg"
    import myimg from "../../assets/unlogin.png"
    import Nav from '../../components/navBar/nav'
    export default {
        name: "message",
        data() {
            return {
                socket: "",
                chatShow: false,
                myimg: myimg,
                mymsg: '',
                user : {id: '2'},
                users: [
                    {id: '3', name:'linhZ', url: imgsrc},
                    {id: '4', name:'hhhhh', url: imgsrc},
                    {id: '5', name:'wwwww', url: imgsrc}
                ],
                current:{
                    id: 0,
                    name:'',
                    url:'',
                    message: [ // 0代表对方，1代表自己
                        // { sequence_id: '1', from_id:'3', to_id:'2', role: 0, content: '在吗', create_time: '2019年12月6日 5：21：57'},
                        // { sequence_id: '2', from_id:'2', to_id:'3', role: 1, content: '在',create_time: '2019年12月6日 5：22：57'},
                    ],
                    readymsg: [ // 未送达的消息
                        // { content: '发给你你却收不到', from_id: 2, to_id: 3 }
                    ],
                },
                tip:'发送中…',
                more_msg: '查看更多',
                noMore: false,
                search:''
            };
        },
        methods: {
            chat(cur) { // 建立对话
                this.chatShow = true;
                this.current.id = cur.id;
                this.current.name = cur.name;
                this.current.url = cur.url;
                this.current.message = [];
                this.current.readymsg = [];
                this.more_msg = '查看更多';
                this.noMore = false;
                console.log(this.current.url);
                var path = 'ws://192.168.195.9:8123/ws/chat/' + this.user.id + '-' + cur.id + '/';
                if (typeof (WebSocket) === "undefined") {
                    alert("您的浏览器不支持socket")
                } else {
                    this.socket = new WebSocket(path) // 实例化socket
                    this.socket.onopen = this.open // 监听socket连接
                    this.socket.onerror = this.error // 监听socket错误信息
                    this.socket.onmessage = this.getMessage // 监听socket信息
                }
                // let time = new Date()
                // let chatrecord= { // 第一次请求聊天记录
                //     from_id: this.user.id,
                //     to_id: cur.id,
                //     send_type: 0,
                //     offset: 1,
                //     early_time: time.getDate()
                // }
                // let ws = this.socket;
                // ws.addEventListener('open', function () { // 监听websocket open事件
                //     ws.send(JSON.stringify(chatrecord));
                // });
            },

            open: function () {
                console.log("socket连接成功")
            },
            error: function () {
                console.log("连接错误")
            },
            close: function () {
                console.log("socket已经关闭")
            },
            getMessage: function (msg) { // 接收信息
                let data = JSON.parse(msg.data);
                console.log(data)
                this.hist_pages = data[0].hist_pages;
                if(data[0].send_type) this.addmessage(data);
                else this.addrecord(data);
            },

            addrecord(record) { // 添加聊天记录
                if(record[0].is_end) {
                    this.noMore = true;
                    this.more_msg = '没有更多了'
                } else {
                    if(record[0].is_frist_hist) {
                        this.current.message = record.concat(this.current.message);
                        this.scrollToBottom();
                    } else {
                        this.current.message = record.concat(this.current.message);
                    }
                }
            },
            addmessage(msg) { // 添加新信息
                for(let i in msg) {
                    if(msg[i].role && this.current.readymsg.length) this.current.readymsg.shift();
                    this.current.message.push(msg[i]);
                }
                this.scrollToBottom();
            },
            onSubmit(to_id) { // 发送新消息
                let curmsg = {
                    content: this.mymsg,
                    from_id: this.user.id,
                    to_id: to_id,
                    send_type: 1
                }
                console.log(curmsg);
                this.socket.send(JSON.stringify(curmsg));
                this.current.readymsg.push(curmsg)
                this.mymsg = '';
                this.scrollToBottom();
            },
            onScroll(to_id) { // 上拉加载
                let container = document.getElementsByClassName('chat_content');
                let scrollTop = container[0].scrollTop;
                //console.log('scrollTop:' + scrollTop)
                if(scrollTop == 0 && !this.noMore) {
                    let loadmore = {
                        from_id: this.user.id,
                        to_id: to_id,
                        sequence_id: this.current.message[0].sequence_id,
                        send_type: 0
                    }
                    this.socket.send(JSON.stringify(loadmore));
                }
            },
            scrollToBottom() {   // 滑动条在最下方
                this.$nextTick(() => {
                    let container = document.getElementsByClassName('chat_content');
                    container[0].scrollTop = container[0].scrollHeight;
                })
            },
        },
        created(){

        },
        destroyed() {
            // 销毁监听
            this.socket.onclose = this.close
        },
        components: {
            Nav
        }
    }
</script>
<style lang="scss" scoped>
    .content{
        width: 1000px;
        height: 700px;
        margin: 10px auto;
        background-color: #fff;
        box-shadow: 0 1px 3px rgba(26,26,26,.1);
    }
    .user_avatar{
        width: 35px;
        height: 35px;
        margin-right: 5px;
    }
    .el-menu {
        min-height: 700px;
    }
    .el-menu-item.is-active {
        background-color: #f4f7ff;
    }
    .el-menu-item::after {
        content: "";
        position: absolute;
        right: 36px;
        left: 20px;
        bottom: 0;
        height: 1px;
        background-color: #f7f8fa;
    }
    .search_item:hover {
        background-color: #fff;
    }
    .search_item::after {
        height: 0;
    }
    .chat_window {
        padding-left: 27%;
        padding-right: 2%;
        .chat_name {
            font-size: 20px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            border-bottom: 1px solid #e6e6e6;
        }
        .chat_content {
            height: 420px;
            overflow-y: auto;
        }
        .loadmore {
            color:#d6d6d6;
            text-align: center;
        }
        .chat_textbox {
            height: 230px;
            border-top: 1px solid #e6e6e6;
        }
        .chat_message {
            margin: 20px 0px;
            .message_avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                // border: 1px solid #8DAFFC;
            }
            .message_content {
                background-color: #f6f6f6;
                // width: 500px;
                // height: 200px;
                display: inline-block;
                vertical-align: top;
                border-radius: 10px;
                font-size: 14px;
                padding: 10px;
            }
            .corr {
                width: 13px;
                height: 14px;
                overflow: hidden;
            }
            .arrline {
                color: #f6f6f6;
                display: block;
                font-family: "SimSun";
                font-size: 15px;
                font-style: normal;
                font-weight: normal;
                height: 10px;
                line-height: normal;
                text-align: left;
            }
            .arrclr {
                color: #f6f6f6;
                display: block;
                font-family: "SimSun";
                font-size: 15px;
                font-style: normal;
                font-weight: normal;
                height: 10px;
                line-height: normal;
            }
            .other_side {
                position: relative;
                .message_content {
                    margin-left: 10px;
                }
                .corr {
                    position: absolute;
                    left: 42px;
                    top: 10px;
                }
                .arrclr {
                    margin: -10px 0 0 1px;
                }
            }
            .my_side {
                position: relative;
                margin-right: 20px;
                text-align: right;
                .message_content {
                    margin-right: 10px;
                }
                .corr {
                    position: absolute;
                    right: 44px;
                    top: 10px;
                }
                .arrclr {
                    margin: 0 0 0 10px;
                }
                .tip {
                    display: inline-block;
                    vertical-align: bottom;
                    color: #d6d6d6;
                }
            }
        }
        .chat_textbox {
            padding-top: 10px;
            textarea {
                height: 150px;
                width: 680px;
                display: block;
                padding: 5px 6px 6px;
                line-height: 19px;
                resize: none;
                overflow: auto;
                outline: none;
                border: none;
                font-size: 15px;
                font-family: inherit;
            }
            .el-button {
                float: right;
            }
        }
    }
</style>
