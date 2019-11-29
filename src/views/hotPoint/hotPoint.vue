<template>
    <div class="article_container">
        <div v-for="(item,index) in result" :key="index">
            <articleList :item="item"></articleList>
        </div>
        <pagination :total="result.length" @getNewList="getNewList"></pagination>
    </div>
</template>

<script>
    import avatar from '../../assets/avatar.jpg'
    import api from '../../api/user'
    import articleList from "../../components/articleList/articleList";
    import pagination from '../../components/pagination/pagination'
    export default {
        name: "hotPoint",
        data(){
            return{
                // article:[
                //     {
                //       avatar:avatar,
                //       name:'isMe',
                //       time:'2019-11-21',
                //       title:'你喜欢动漫吗',
                //       commentNum:'125',
                //       likes:'520',
                //       page_view:4396,
                //       isLike:1,
                //       comment:["我觉得很好","我也是这么觉得","那你呢"],
                //       picture:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=742906023,1307561759&fm=26&gp=0.jpg',
                //       content:'安昙小太郎（千叶翔也 配音）出生在一个传统的日本家庭之中，个性细腻而又温厚的他自幼喜欢读书，暗中希望能够成为一名作家，总而言之是班级中并不起眼的存在。水野茜（小原好美 配音）是田径部的种子选手，个性开朗活泼全身上下散发着积极的光芒。这样性格迥异的两人，其生命轨迹被命运推动着联系到了一起。安昙小太郎（千叶翔也 配音）出生在一个传统的日本家庭之中，个性细腻而又温厚的他自幼喜欢读书，暗中希望能够成为一名作家，总而言之是班级中并不起眼的存在。水野茜（小原好美 配音）' +
                //           '是田径部的种子选手，个性开朗活泼全身上下散发着积极的光芒。这样性格迥异的两人，其生命轨迹被命运推动着联系到了一起。安昙小太郎（千叶翔也 配音）出生在一个传统的日本家庭之中，个性细腻而又温厚的他自幼喜欢读书，暗中希望能够成为一名作家，总而言之是班级中并不起眼的存在。水野茜（小原好美 配音）是田径部的种子选手，个性开朗活泼全身上下散发着积极的光芒。这样性格迥异的两人，' +
                //           '其生命轨迹被命运推动着联系到了一起。安昙小太郎（千叶翔也 配音）出生在一个传统的日本家庭之中，个性细腻而又温厚的他自幼喜欢读书，暗中希望能够成为一名作家，总而言之是班级中并不起眼的存在。水野茜（小原好美 配音）是田径部的种子选手，个性开朗活泼全身上下散发着积极的光芒。这样性格迥异的两人，其生命轨迹被命运推动着联系到了一起。',
                //     },
                //     {
                //         avatar:avatar,
                //         name:'noMe',
                //         time:'2019-11-21',
                //         title:'你喜欢什么类型的动漫',
                //         commentNum:'125',
                //         likes:'520',
                //         isLike:1,
                //         picture:'',
                //         page_view:4396,
                //         comment:["我觉得很好","我也是这么觉得","那你呢"],
                //         content:'安昙小太郎（千叶翔也 配音）出生在一个传统的日本家庭之中，个性细腻而又温厚的他自幼喜欢读书，暗中希望能够成为一名作家，总而言之是班级中并不起眼的存在。水野茜（小原好美 配音）是田径部的种子选手，个性开朗活泼全身上下散发着积极的光芒。这样性格迥异的两人，其生命轨迹被命运推动着联系到了一起。',
                //     },
                //     {
                //         avatar:avatar,
                //         name:'isMe',
                //         time:'2019-11-21',
                //         title:'你会抽象语言吗',
                //         commentNum:'125',
                //         likes:'520',
                //         isLike:0,
                //         page_view:4396,
                //         comment:["我觉得很好","我也是这么觉得","那你呢"],
                //         picture:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2888277480,1947610928&fm=26&gp=0.jpg',
                //         content:'在计算机科学中，特别是在形式语言理论领域，术语抽象语言族是指抽象的数学概念泛化的特征，常见的有正则语言（正规语言），上下文无关语言和递归可枚举语言以及其他形式语言，简称AFL，抽象语言族是用代数方法研究形式语言理论的重要成果。',
                //     },
                //     {
                //         avatar:avatar,
                //         name:'isMe',
                //         time:'2019-11-21',
                //         title:'你喜欢动漫吗',
                //         commentNum:'125',
                //         likes:'520',
                //         page_view:4396,
                //         isLike:1,
                //         comment:["我觉得很好","我也是这么觉得","那你呢"],
                //         picture:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=742906023,1307561759&fm=26&gp=0.jpg',
                //         content:'安昙小太郎（千叶翔也 配音）出生在一个传统的日本家庭之中，个性细腻而又温厚的他自幼喜欢读书，暗中希望能够成为一名作家，总而言之是班级中并不起眼的存在。水野茜（小原好美 配音）是田径部的种子选手，个性开朗活泼全身上下散发着积极的光芒。这样性格迥异的两人，其生命轨迹被命运推动着联系到了一起。安昙小太郎（千叶翔也 配音）出生在一个传统的日本家庭之中，个性细腻而又温厚的他自幼喜欢读书，暗中希望能够成为一名作家，总而言之是班级中并不起眼的存在。水野茜（小原好美 配音）' +
                //             '是田径部的种子选手，个性开朗活泼全身上下散发着积极的光芒。这样性格迥异的两人，其生命轨迹被命运推动着联系到了一起。安昙小太郎（千叶翔也 配音）出生在一个传统的日本家庭之中，个性细腻而又温厚的他自幼喜欢读书，暗中希望能够成为一名作家，总而言之是班级中并不起眼的存在。水野茜（小原好美 配音）是田径部的种子选手，个性开朗活泼全身上下散发着积极的光芒。这样性格迥异的两人，' +
                //             '其生命轨迹被命运推动着联系到了一起。安昙小太郎（千叶翔也 配音）出生在一个传统的日本家庭之中，个性细腻而又温厚的他自幼喜欢读书，暗中希望能够成为一名作家，总而言之是班级中并不起眼的存在。水野茜（小原好美 配音）是田径部的种子选手，个性开朗活泼全身上下散发着积极的光芒。这样性格迥异的两人，其生命轨迹被命运推动着联系到了一起。',
                //     },
                // ]
             result:[]
            }
        },
        created(){
            api.getIndexInfo(
                {
                page:1,
                token:'123456',
                order_type:1}
            ).then(res => {
                this.result = res.data
                console.log(this.result)
            })
        },
        methods:{
            goArticle(){
                console.log('goArticle')
            },
            getNewList(val){
                console.log(val)
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
     }
</style>
