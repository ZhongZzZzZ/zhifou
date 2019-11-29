<template>
    <div class="main">
        <Editor id="tinymce" v-model="tinymceHtml" :init="editorInit"></Editor>
        <div>{{}}</div>
    </div>

</template>

<script>
    import 'tinymce/skins/ui/oxide/skin.min.css'; //富文本样式
    import tinymce from 'tinymce/tinymce'; //配置富文本
    import 'tinymce/themes/silver/theme.min.js' //引入富文本的主要脚本
    import Editor from '@tinymce/tinymce-vue'; //引用富文本组件
    import 'tinymce/plugins/image'
    import 'tinymce/plugins/link'
    import 'tinymce/plugins/code'
    import 'tinymce/plugins/table'
    import 'tinymce/plugins/lists'
    import 'tinymce/plugins/contextmenu'
    import 'tinymce/plugins/wordcount'
    import 'tinymce/plugins/media'
    export default {
        name: "editBlog",
        data () {
            return {
                tinymceHtml:'请输入内容',
                editorInit: {
                    language_url: '/tinymce/zh_CN.js',
                    language: 'zh_CN',
                    skin_url: '/tinymce/skins/lightgray',
                    height: 300,
                    plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu media ',
                    toolbar:
                    'bold italic | fontsizeselect | bullist numlist | undo redo | link unlink image code media | removeformat',
                    branding: false
                }
            }
        },
        mounted() {
            tinymce.init({})
        },
        components: {Editor}
    }
</script>

<style scoped>
    .main{
        width: 940px;
        height: 1000px;
        margin: 10px auto;
        background-color: #fff;
        box-shadow: 0 1px 3px rgba(26,26,26,.1);
        padding: 50px 30px;
    }
</style>
