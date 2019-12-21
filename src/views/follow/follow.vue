<template>
    <div v-rainbowbg>
    <div class="article_container" v-rainbow>
        我看你打码
    </div>
        <div class="article_container" v-rainbow>我看你打码
        </div>
        <div class="article_container" v-rainbow>
            我看你打码
        </div>
        <div class="article_container" v-rainbow>
            我看你打码
        </div>
        <div class="article_container" v-rainbow>
            我看你打码
        </div>
        <div class="article_container" v-rainbow>
            我看你打码
        </div>
        <div class="article_container" v-rainbow>.
            我看你打码
        </div>
        <div class="article_container" v-rainbow>
            我看你打码
        </div>
        <div class="article_container" v-rainbow>
            我看你打码
        </div>

    </div>
</template>

<script>

export default {
     name: "follow",
     data(){
        return{

          }
        },
     created() {

        },
     methods:{

        },
    directives:{
         rainbow:{
             inserted:function (el) {
                 var str = "#";
                 //定义十六进制单个码数组好进行遍历
                 var arr = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"]
                 for(var i = 0; i < 6; i++) {
                     //想一想为什么这里的关键字Math.random()后面要乗16而不是15或者17.
                     var num = parseInt(Math.random()*16);
                     str += arr[num];
                 }
                el.style.color = str
             }
         },
         rainbowbg:{
            inserted:function (el) {
                var str = "#";
                //定义十六进制单个码数组好进行遍历
                var arr = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"]
                for(var i = 0; i < 6; i++) {
                    //想一想为什么这里的关键字Math.random()后面要乗16而不是15或者17.
                    var num = parseInt(Math.random()*16);
                    str += arr[num];
                }
                el.style.backgroundColor = str
            }
        }
    }
    }
</script>

<style lang="scss" scoped>
    .article_container{
        position: relative;
        width: 200px;
        height: 200px;
        background-color: #fff;
        box-shadow: 0 0 5px #bbb;
        display: inline-block;
        font-size: 16px;
        font-weight: 600;
        margin: 0 15px 15px 0;
        overflow: hidden;
        animation: swag 2s infinite;
    }
</style>

