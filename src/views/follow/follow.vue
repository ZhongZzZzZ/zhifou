<template>
    <div class="article_container">
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="note_bg">
                    <div class="tietu_box">
                        <img src="../../assets/圣诞1.gif" class="tietu">
                    </div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="note_bg">
                    <div class="tietu_box">
                        <img src="../../assets/圣诞2.gif" class="tietu">
                    </div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="note_bg">
                    <div class="tietu_box">
                        <img src="../../assets/圣诞3.gif" class="tietu">
                    </div>
                </div>
            </el-col>
        </el-row>
        
        <el-row :gutter="20" v-for="(row,index) in rows" :key="index">
            <el-col :span="8" v-for="item of row" :key="item.id">
                <div class="note_bg">
                    <div class="note">
                        <img :src="img_url" class="avatar">
                        <span class="user_name">匿名</span>
                        <div class="note_content">{{ item.content }}</div>
                    </div>
                </div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import hehua from '../../assets/荷花.png'
    import Paho from 'paho-mqtt'
    import {getLocalStorage} from "../../utils/auth";

    export default {
        name: "follow",
        data(){
            return{
                reconnectTimeout: 2000,
                mqtt: {},
                msg:"/zhifou",
                userId:getLocalStorage('user_id'),
                img_url: hehua,
                notes: [{
                    id: 1,
                    content: '太好看了吧这网站，是哪个神仙前端做的',
                    user_name: 'LInhz'
                },
                {
                    id: 2,
                    content: '知否名字好听有好用，我好喜欢窝',
                    user_name: 'LInhz'
                },
                {
                    id: 3,
                    content: '太好看了吧这网站，是哪个神仙前端做的太好看了吧这网站，是哪个神仙前端做的太好看了吧这网站，是哪个神仙前端做的太好看了吧这网站，是哪个神仙前端做的太好看了吧这网站，是哪个神仙前端做的太好看了吧这网站，是',
                    user_name: 'LInhz'
                },
                ]
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

        },
        methods:{
            
        }
    }
    }
</script>

<style lang="scss" scoped>
    .article_container{
        position: relative;
        padding: 0px 15px;
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
        background: #8DAFFC;
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
    }
    .avatar {
        border: 1px solid #99999940;
        border-radius: 50%;
        width: 30px;
        height: 30px;
    }
    .user_name {
        margin-left: 5px;
        font-size: 16px;
        font-weight: bold;
        line-height: 30px;
    }
    .note_content {
        margin-top: 3px;
        font-size: 14px;
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
</style>

