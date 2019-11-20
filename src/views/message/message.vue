<template>
    <div class="main">  
        <el-col :span="6">
            <el-menu default-active="1" class="el-menu-vertical-demo">
                <el-menu-item  v-for="item in users" :key="item.id" @click="chat(item)">
                    <img class="user_avatar" :src="item.url">
                    <span slot="title">{{ item.name }}</span>
                </el-menu-item>
            </el-menu>
        </el-col>
        <div class="chat_window" v-if="chatShow">
            <div class="chat_name">{{ current.name }}</div>
            <div class="chat_content">
                <div class="chat_message" v-for="item in current.message" >
                    <img :src="current.url" class="message_avatar">
                </div>
            </div>
            <div class="chat_textbox">

            </div>
        </div>
    </div>
</template>

<script>
    import imgsrc from "../../assets/avatar.jpg"
    export default {
        name: "message",
        data() {
            return {
                chatShow: false,
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
            }
        },
        created(){

        },
    }
</script>

<style lang="scss" scoped>
    .main{
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
        }
        .chat_textbox {
            height: 230px;
            border-top: 1px solid #e6e6e6;
        }
        .message_avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
    }
</style>
