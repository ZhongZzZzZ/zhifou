<template>
    <div>
        <Nav></Nav>
        <div class="main">
            <Editor id="tinymce" v-model="tinymceHtml" :init="editorInit"></Editor>
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
                    plugins: 'link lists image media code table colorpicker textcolor wordcount contextmenu',
                    toolbar:
                    'bold italic | fontsizeselect | bullist numlist | undo redo | image media link unlink code | removeformat',
                    branding: false,
                    menubar: false,
                    // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片
                    images_upload_handler: (blobInfo, success, failure) => {
                        var file = blobInfo.blob();//转化为易于理解的file对象
                        console.log(file);
                        const img = 'data:image/jpeg;base64,' + blobInfo.base64()
                        success(img)
                    },
                    file_picker_types: 'media',
                    file_picker_callback: function(cb, value, meta) {
                        if(meta.filetype == 'media') {
                            // 给input加accept属性来限制上传的文件类型
                            let input = document.createElement('input');
                            input.setAttribute('type', 'file');
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
        components: {Editor,Nav}
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
