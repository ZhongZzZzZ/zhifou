<template>
    <div class="article_container">
        <el-radio-group v-model="order_type" @change="orderType" class="order_type">
            <el-radio :label="0">按时间</el-radio>
            <el-radio :label="1">按浏览量</el-radio>
            <el-radio :label="2">按点赞数</el-radio>
        </el-radio-group>
        <div v-for="(item,index) in result" :key="index">
            <articleList :item="item"></articleList>
        </div>
        <pagination :total="result.length" @getNewList="getNewList"></pagination>
    </div>
</template>

<script>
    import api from '../../api/article'
    import articleList from "../../components/articleList/articleList";
    import pagination from '../../components/pagination/pagination'
    export default {
        name: "hotPoint",
        data(){
            return{
             order_type:0,
             result:[],
                total:0
            }
        },
        created(){
            this.getIndexInfo()
        },
        methods:{
            getIndexInfo(){
                api.getIndexInfo(
                    {   page:1,
                        token:'123456',
                        order_type:this.order_type}
                ).then(res => {
                    this.result = res.data
                    this.total = res.article_count
                    console.log(this.result)
                })
            },
            goArticle(){
                console.log('goArticle')
            },
            getNewList(val){
                console.log(val)
            },
            orderType(val){
                this.order_type = val
                this.getIndexInfo()
            }
        },
        components:{
            articleList,
            pagination
        },

    }
</script>

<style lang="scss" scoped>
    .article_container{
        position: relative;
        .order_type{
            position: absolute;
            right: 15px;
        }
     }
</style>
