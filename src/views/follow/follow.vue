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
        <emoji></emoji>
    </div>
</template>

<script>
    import hehua from '../../assets/荷花.png'
    import {getLocalStorage} from "../../utils/auth";
    import emoji from '../../components/emoji/Comment'

    export default {
        name: "follow",
        data(){
            return{

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
        components:{
            emoji
        }
    }
</script>

<style lang="scss" >
    .icon {
        position: relative;
        margin-top: 20px;
        .iconfont {
            cursor: pointer;
            color: #F7BA2A;
        }
        .emoji-box {
            position: absolute;
            z-index: 10;
            left: -10px;
            top: 24px;
            box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.2);
            background: white;
            .el-button {
                position: absolute;
                border: none;
                color: #FF4949;
                right: 12px;
                top: 12px;
                z-index: 10;
            }
            .arrow {
                left: 10px;
            }
        }
        .submit {
            float: right;
        }
    }
    .comment {
        margin-top: 20px;
        .item {
            margin-top: 20px;
            padding: 10px;
            border-top: 1px solid #bfcbd9;
        }
    }
    .clearfix {
        &:after {
            content: '';
            display: block;
            height: 0;
            clear: both;
            visibility: hidden;
        }
    }
    .fade-enter-active, .fade-leave-active { transition: opacity .5s; }
    .fade-enter, .fade-leave-active { opacity: 0; }
    .fade-move { transition: transform .4s; }
    .list-enter-active, .list-leave-active { transition: all .5s; }
    .list-enter, .list-leave-active { opacity: 0; transform: translateX(30px); }
    .list-leave-active { position: absolute !important; }
    .list-move { transition: all .5s;}
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
        overflow: auto;
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
    @keyframes swag {
        0%{
            transform: translateX(0);
        }
        100%{
            transform: translateX(-1000px);
        }
    }
</style>

