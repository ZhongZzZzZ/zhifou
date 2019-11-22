<template>
    <div class="content">  
        <el-col :span="6">
            <el-menu default-active="1" class="el-menu-vertical-demo">
                <el-menu-item  v-for="item in users" :key="item.id" @click="chat(item)" :index="item.id">
                    <img class="user_avatar" :src="item.url">
                    <span slot="title">{{ item.name }}</span>
                </el-menu-item>
            </el-menu>
        </el-col>
        <div class="chat_window" v-if="chatShow">
            <div class="chat_name">{{ current.name }}</div>
            <div class="chat_content">
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
            </div>
            <div class="chat_textbox">
                <textarea v-model="mymsg" @keyup.enter="onSubmit"></textarea>
                <el-button type="primary" @click="onSubmit">发送</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import imgsrc from "../../assets/avatar.jpg"
    import myimg from "../../assets/unlogin.png"
    export default {
        name: "message",
        data() {
            return {
                chatShow: false,
                myimg: myimg,
                mymsg:'',
                users: [
                    {id: 1, name:'linhZ', url: imgsrc},
                    {id: 2, name:'hhhhh', url: imgsrc},
                    {id: 3, name:'wwwww', url: imgsrc}
                ],
                current:{
                    name:'',
                    url:'',
                    message: [
                        { role: 0, content: '在吗'}, // 0代表对方，1代表自己
                        { role: 1, content: '在'},
                        { role: 0, content: '有点事想找你帮忙'},
                        { role: 1, content: '才怪，不在'},
                    ]
                }
            };
        },
        methods: {
            chat(cur) {
                this.chatShow = true;
                this.current.name = cur.name;
                this.current.url = cur.url;
                console.log(this.current.url);
            },
            onSubmit() {
                this.current.message.push({
                     role: 1, content: this.mymsg
                })
                this.mymsg = '';
            }
        },
        created(){

        },
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
            overflow-y: scroll;
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
