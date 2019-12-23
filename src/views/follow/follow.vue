<template>
    <div class="article_container">
        <div class="mynote">
            <el-input  class="mynote_input" type="textarea" placeholder="请输入内容" v-model="mynote" maxlength="100" show-word-limit></el-input>
            <el-button class="submit_btn" type="primary" @click="onsubmit">发送</el-button>
        </div>
        <!-- 主题图 -->
        <el-row :gutter="20">
            <el-col :span="8" v-for="item in topic_img" :key="item">
                <div class="note_bg">
                    <div class="tietu_box">
                        <img :src="item" class="tietu">
                    </div>
                </div>
            </el-col>
            <!-- <el-col :span="8">
                <div class="note_bg">
                    <div class="tietu_box">
                        <img :src="topic_img.christmas_2" class="tietu">
                    </div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="note_bg">
                    <div class="tietu_box">
                        <img :src="topic_img.christmas_3" class="tietu">
                    </div>
                </div>
            </el-col> -->
        </el-row>
        <!-- 便利贴列表 -->
        <el-row :gutter="20" v-for="(row,index) in rows" :key="index">
            <el-col :span="8" v-for="item of row" :key="item.board_id">
                <div class="note_bg">
                    <div class="note">
                        <img :src="item.board_url" class="avatar">
                        <span class="user_name">匿名</span>
                        <div class="note_content">{{ item.content }}</div>
                        <div class="create_time">{{ item.create_time }}</div>
                    </div>
                    <p class="iconfont icontuding icon_tuding"></p>
                </div>
            </el-col>
        </el-row>
        <pagination :total="note_count" @getNewList="getNewList" v-if="note_count"></pagination>
    </div>
</template>

<script>
    import {getLocalStorage} from "../../utils/auth";
    import api from '../../api/article'
    import pagination from '../../components/pagination/pagination'

    export default {
        name: "follow",
        data(){
            return{
                reconnectTimeout: 2000,
                mqtt: {},
                msg:"/zhifou",
                userId:getLocalStorage('user_id'),
                mynote:'',
                notes: [],
                note_count:0,
                topic_img:[]
            }
        },
        computed: {
            rows() {
                const rows = [];
                this.notes.forEach((item, index) => {
                    const row = Math.floor(index / 3)
                    if (!rows[row]) {
                    rows[row] = []
                    }
                    rows[row].push(item)
                })
                return rows
            }
        },
        methods:{
            onsubmit(){
                api.addMessageBoard({
                    user_id: getLocalStorage('user_id'),
                    content: this.mynote,
                    token: getLocalStorage('token')
                }).then(res => {
                    console.log(res);
                    this.notes.unshift(res.board);
                    this.note_count = res.board_count;
                    this.mynote = '';
                })
            },
            getNewList(val){
                    api.getMessageBoardInfo({
                    token: getLocalStorage('token'),
                    page: val,
                }).then(res => {
                    console.log(res);
                    this.note_count = res.board_count;
                    this.notes = res.board;
                })
            }
        },
        created(){
            api.getMessageBoardInfo({
                token: getLocalStorage('token'),
                page: 1,
            }).then(res => {
                console.log(res);
                this.note_count = res.board_count;
                this.notes = res.board;
                this.topic_img = res.christmas;
            })
        },
        components: {
            pagination
        }
    }

</script>

<style lang="scss" scoped>
    .article_container{
        position: relative;
        padding: 0px 15px;
    }
    .mynote {
        height: 170px;
        .submit_btn {
            float: right;
            margin: 10px 0px;
        }
        .mynote_input /deep/ .el-textarea__inner {
            height: 100px;
        }
    }
    .el-row {
        margin-bottom: 25px;
    }
    .el-col{
        position: relative;
    }
    .note_bg {
        width: 100%;
        height: 200px;
        position: relative;;
        z-index: 1;
        background: #c6d7fe;
        box-shadow: 0 0px 5px rgba(26, 26, 26, 0.1);
    }
    .note {
        position: absolute;
        box-shadow: 0 0px 5px rgba(26, 26, 26, 0.1);
        background: #fff;
        z-index: 2;
        width: 200px;
        height: 180px;
        top: -5px;
        left: 5px;
        padding: 10px;
        .note_content {
            margin-top: 3px;
            font-size: 14px;
        } 
    }
    .avatar {
        border: 1px solid #99999940;
        border-radius: 50%;
        width: 30px;
        height: 30px;
    }
    .create_time {
        position: absolute;
        color: #909399;
        bottom: 3px;
        right: 3px;
    }
    .user_name {
        margin-left: 5px;
        font-size: 16px;
        font-weight: bold;
        vertical-align: middle;
    }
    .tietu_box {
        position: absolute;
        box-shadow: 0 0px 5px rgba(26, 26, 26, 0.1);
        background: #fff;
        z-index: 2;
        width: 220px;
        height: 200px;
        top: -5px;
        left: 5px;
        padding: 0px;
    }
    .tietu {
        width: 220px;
        height: 200px;
    }
    .icon_tuding {
        position: absolute;
        z-index:3;
        color: #8DAFFC;
        font-size: 25px;
        transform: rotateY(180deg);
        top: -20px;
        left: -10px;
    }
    @keyframes swag {
        0%{
            transform: translateX(0);
        }
        100%{
            transform: translateX(-1000px);
        }
    }
</style>