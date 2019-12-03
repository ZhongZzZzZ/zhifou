<template>
    <div>
        <Nav></Nav>
        <div class="class_container">

            <el-tabs v-model="activeName" @tab-click="handleClick(activeName)" stretch="true">
                <el-tab-pane label="前端" name="1001">
                    <el-radio-group v-model="order" @change="orderType" class="order_type">
                        <el-radio :label="0">按时间</el-radio>
                        <el-radio :label="1">按浏览量</el-radio>
                        <el-radio :label="2">按点赞数</el-radio>
                    </el-radio-group>
                    <div v-for="(item,index) in data" :key="index">
                        <articleList :item="item"></articleList>
                    </div>
                    <pagination :total="total" @getNewList="getNewList" :currentPage="this.params.page" class="pagination"></pagination>
                </el-tab-pane>
                <el-tab-pane label="后端" name="1002">
                    <el-radio-group v-model="order" @change="orderType" class="order_type">
                        <el-radio :label="0">按时间</el-radio>
                        <el-radio :label="1">按浏览量</el-radio>
                        <el-radio :label="2">按点赞数</el-radio>
                    </el-radio-group>
                    <div v-for="(item,index) in data" :key="index">
                        <articleList :item="item"></articleList>
                    </div>
                    <pagination :total="total" @getNewList="getNewList" :currentPage="this.params.page" ></pagination>
                </el-tab-pane>
                <el-tab-pane label="移动端" name="1003">
                    <el-radio-group v-model="order" @change="orderType" class="order_type">
                        <el-radio :label="0">按时间</el-radio>
                        <el-radio :label="1">按浏览量</el-radio>
                        <el-radio :label="2">按点赞数</el-radio>
                    </el-radio-group>
                    <div v-for="(item,index) in data" :key="index">
                        <articleList :item="item"></articleList>
                    </div>
                    <pagination :total="total" @getNewList="getNewList" :currentPage="this.params.page"></pagination>
                </el-tab-pane>
                <el-tab-pane label="服务器" name="1004">
                    <el-radio-group v-model="order" @change="orderType" class="order_type">
                        <el-radio :label="0">按时间</el-radio>
                        <el-radio :label="1">按浏览量</el-radio>
                        <el-radio :label="2">按点赞数</el-radio>
                    </el-radio-group>
                    <div v-for="(item,index) in data" :key="index">
                        <articleList :item="item"></articleList>
                    </div>
                    <pagination :total="total" @getNewList="getNewList" :currentPage="this.params.page"></pagination>
                </el-tab-pane>
                <el-tab-pane label="运营" name="1005">
                    <el-radio-group v-model="order" @change="orderType" class="order_type">
                        <el-radio :label="0">按时间</el-radio>
                        <el-radio :label="1">按浏览量</el-radio>
                        <el-radio :label="2">按点赞数</el-radio>
                    </el-radio-group>
                    <div v-for="(item,index) in data" :key="index">
                        <articleList :item="item"></articleList>
                    </div>
                    <pagination :total="total" @getNewList="getNewList" :currentPage="this.params.page"></pagination></el-tab-pane>
                <el-tab-pane label="产品" name="1006">
                    <el-radio-group v-model="order" @change="orderType" class="order_type">
                        <el-radio :label="0">按时间</el-radio>
                        <el-radio :label="1">按浏览量</el-radio>
                        <el-radio :label="2">按点赞数</el-radio>
                    </el-radio-group>
                    <div v-for="(item,index) in data" :key="index">
                        <articleList :item="item"></articleList>
                    </div>
                    <pagination :total="total" @getNewList="getNewList" :currentPage="this.params.page"></pagination></el-tab-pane>
                <el-tab-pane label="测试" name="1007">
                    <el-radio-group v-model="order" @change="orderType" class="order_type">
                        <el-radio :label="0">按时间</el-radio>
                        <el-radio :label="1">按浏览量</el-radio>
                        <el-radio :label="2">按点赞数</el-radio>
                    </el-radio-group>
                    <div v-for="(item,index) in data" :key="index">
                        <articleList :item="item"></articleList>
                    </div>
                    <pagination :total="total" @getNewList="getNewList" :currentPage="this.params.page"></pagination></el-tab-pane>
                <el-tab-pane label="设计" name="1008">
                    <el-radio-group v-model="order" @change="orderType" class="order_type">
                        <el-radio :label="0">按时间</el-radio>
                        <el-radio :label="1">按浏览量</el-radio>
                        <el-radio :label="2">按点赞数</el-radio>
                    </el-radio-group>
                    <div v-for="(item,index) in data" :key="index">
                        <articleList :item="item"></articleList>
                    </div>
                    <pagination :total="total" @getNewList="getNewList" :currentPage="this.params.page"></pagination></el-tab-pane>
                <el-tab-pane label="其他" name="1009">
                    <el-radio-group v-model="order" @change="orderType" class="order_type">
                        <el-radio :label="0">按时间</el-radio>
                        <el-radio :label="1">按浏览量</el-radio>
                        <el-radio :label="2">按点赞数</el-radio>
                    </el-radio-group>
                    <div v-for="(item,index) in data" :key="index">
                        <articleList :item="item"></articleList>
                    </div>
                    <pagination :total="total" @getNewList="getNewList" :currentPage="this.params.page"></pagination></el-tab-pane>
            </el-tabs>
        <div v-if="data.length ==0">当前分类没有信息哦</div>
        </div>
    </div>
</template>

<script>
    import Nav from '../../components/navBar/nav'
    import pagination from '../../components/pagination/pagination'
    import api from '../../../src/api/article'
    import articleList from "../../components/articleList/articleList";
    export default {
        name: "classification",
        data(){
          return{
              activeName: this.$route.query.id || '1001',
              message:'',
              data:[],
              total:0,
              order:0,
              params:{type_id:this.$route.query.id || '1001',page:1,token:'123456',order_type:this.order || 0,}
          }
        },
        created() {
            this.querryList()
        },
        components:{
            Nav,
            pagination,
            articleList
        },
        methods:{
            querryList(){
                api.getQueryArticle(this.params).then(res => {
                    this.total = res.article_count;
                    this.data = res.data;
                    console.log(res)
                })
            },
            orderType(val){
              this.params.order_type = val
              this.querryList(this.params)
            },
            handleClick(val){
                if(val != this.params.typeID){
                    this.params.page = 1
                    this.message = val
                    this.params.type_id = val
                    this.querryList()
                }
            },
            getNewList(val){
                this.params.page = val
                this.querryList()
            },
        }
    }
</script>

<style lang="scss" scoped>
.class_container{
    width: 860px;
    background-color: #fff;
    margin: 8px auto;
    padding: 15px;
    position: relative;
    .order_type{
        position: absolute;
        right: 15px;
        padding-bottom: 15px;
        overflow: hidden;
    }
    .pagination{

    }
}
</style>
