<template>

    <div>
        <Nav></Nav>
        <div class="main">
            <Editor id="tinymce" v-model="tinymceHtml" :init="editorInit"></Editor>
            <el-button @click="uploadImg">上传</el-button>
            {{tinymceHtml}}
        </div>
    </div>

</template>

<script>
    import Nav from '../../components/navBar/nav'
    import 'tinymce/skins/ui/oxide/skin.min.css'; //富文本样式
    import tinymce from 'tinymce/tinymce'; //配置富文本
    import 'tinymce/themes/silver/theme.min.js' //引入富文本的主要脚本
    import Editor from '@tinymce/tinymce-vue'; //引用富文本组件
    import 'tinymce/plugins/image' // 上传图片插件
    import 'tinymce/plugins/media' // 上传视频插件
    import 'tinymce/plugins/link'
    import 'tinymce/plugins/code'
    import 'tinymce/plugins/table'
    import 'tinymce/plugins/lists'
    import 'tinymce/plugins/contextmenu'
    import 'tinymce/plugins/wordcount'
    import 'tinymce/plugins/media'
    import api from '../../api/user'
    export default {
        name: "editBlog",
        data () {
            return {
                tinymceHtml:'请输入内容',
                editorInit: {
                    language_url: '/tinymce/zh_CN.js',
                    language: 'zh_CN',
                    skin_url: '/tinymce/skins/lightgray',
                    height: 600,
                    plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu media ',
                    toolbar:
                    'bold italic | fontsizeselect | bullist numlist | undo redo | link unlink image code media | removeformat',
                    branding: false,
                    menubar: false,
                    // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片
                    images_upload_handler: (blobInfo, success, failure) => {
                        // tinymce.get('tinymce').insertContent('<div style="max-width:250px;display: block;margin:0 auto;overflow: hidden;"></div>');
                        var formdata = new FormData()
                        formdata.append('photo',blobInfo.blob())
                        formdata.append('token','123456')
                        formdata.append('article_id','10001')
                        api.uploadPhoto(formdata).then(res => success(res.photo_name))
                        // console.log(formdata.get('photo'))
                        // tinymce.get('tinymce').insertContent('<img style="max-width:250px;display: block;margin:0 auto;" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3620678974,412273927&fm=26&gp=0.jpg" >');

                    },
                    file_picker_types: 'media',
                    file_picker_callback: function(cb, value, meta) {
                        if(meta.filetype == 'media') {
                            // 给input加accept属性来限制上传的文件类型
                            let input = document.createElement('input');
                            input.setAttribute('type', 'file');0..
                            input.click();
                            let file, formData;
                            input.onchange = function() {
                                file = this.files[0];
                                formData = new FormData();
                                //假设接口接收参数为file,值为选中的文件
                                formData.append('file', file);
                                console.log(file);
                            }
                            const media = 'data:media/mp4;base64,' + file.base64()
                            cb(media)
                        }
                    }
                }
            }
        },
        mounted() {
            tinymce.init({})
        },
        methods:{
            uploadImg(){

            }
        },
        components: {Editor,Nav}
    }
</script>

<style lang="scss" scoped>
    .main{
        width: 70%;
        height: 1000px;
        margin: 10px auto;
        background-color: #fff;
        box-shadow: 0 1px 3px rgba(26,26,26,.1);
        padding: 50px 30px;
    }
</style>
