<template>
    <div>
        <Nav></Nav>
        <div class="class_container">
            <el-tabs v-model="activeName" @tab-click="handleClick(activeName)" stretch="true">
                <el-tab-pane label="前端" name="1001"></el-tab-pane>
                <el-tab-pane label="后端" name="1002"></el-tab-pane>
                <el-tab-pane label="移动端" name="1003"></el-tab-pane>
                <el-tab-pane label="服务器" name="1004"></el-tab-pane>
                <el-tab-pane label="运营" name="1005"></el-tab-pane>
                <el-tab-pane label="产品" name="1006"></el-tab-pane>
                <el-tab-pane label="测试" name="1007"></el-tab-pane>
                <el-tab-pane label="设计" name="1008"></el-tab-pane>
                <el-tab-pane label="其他" name="1009"></el-tab-pane>
            </el-tabs>
            <div>{{message}}</div>
            <pagination :total="20" @getNewList="getNewList"></pagination>
        </div>
    </div>
</template>

<script>
    import Nav from '../../components/navBar/nav'
    import pagination from '../../components/pagination/pagination'
    export default {
        name: "classification",
        data(){
          return{
              activeName: this.$route.query.id,
              message:'',
              List:[],
              params:{typeID:this.$route.query.id,page:1}
          }
        },
        created() {
            this.querryList()
        },
        components:{
            Nav,
            pagination
        },
        methods:{
            handleClick(val){
                this.message = val
                this.params.typeID = val
                this.querryList()
            },
            getNewList(val){
                this.params.page = val
                this.querryList()
            },
            querryList(val){
                console.log(this.params)
            }
        }
    }
</script>

<style scoped>
.class_container{
    width: 860px;
    background-color: #fff;
    margin: 8px auto;
    padding: 15px;
}
</style>
