<template>
    <div>
        <Nav style="position: sticky"></Nav>
        <div class="container">
            <div v-for="(item,index) in List" :key="index">
                <articleList :item="item"></articleList>
            </div>
            <pagination :total="total" @getNewList="getNewList" ></pagination>
        </div>
    </div>
</template>

<script>
    import Nav from "../../components/navBar/nav";
    import articleList from "../../components/articleList/articleList";
    import pagination from '../../components/pagination/pagination';
    import api from '../../api/article'
    export default {
        name: "searchResult",
        data(){
            return{
                List:[],
                total:0,
                page:1
            }
        },
        components:{
            Nav,
            articleList,
            pagination
        },
        created() {
           this.search()
        },
        methods:{
            search(){
                api.searchArticle(this.$route.query.q,this.page).then(res => {
                    this.List = res.article
                    this.total = res.article_count
                })
            },
            getNewList(val){
                this.page = val
                this.search()
            }
        }

    }
</script>

<style lang="scss" scoped>
.container{
    position: relative;
    margin: 15px auto;
    width: 850px;
    min-height: 980px;
    background-color: #fff;
    padding: 15px;
}
</style>
