<template>

    <div>
        <Nav></Nav>
        <div class="main">
<<<<<<< HEAD
            <textarea class="title" v-model="title" placeholder="请输入标题"></textarea>
            <Editor id="tinymce" v-model="tinymceHtml" :init="editorInit" placeholder="请输入正文"></Editor>
            <el-button type="primary" icon="el-icon-s-promotion" @click="send" :disabled="isNull">发布</el-button>
            <el-button class="draft_btn" icon="el-icon-takeaway-box" @click="draft" plain>存入草稿箱</el-button>
            <div class="showcontent">{{ tinymceHtml }}</div>
            <div class="showcontent" v-html="tinymceHtml">
            </div>
=======
            <Editor id="tinymce" v-model="tinymceHtml" :init="editorInit"></Editor>
            <el-button @click="uploadImg">上传</el-button>
            {{tinymceHtml}}
>>>>>>> 1d8924b33faa17467f3c73e0d1c60cb8a73c1eab
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
<<<<<<< HEAD
    import api from '../../api/article'
=======
    import 'tinymce/plugins/media'
    import api from '../../api/user'
>>>>>>> 1d8924b33faa17467f3c73e0d1c60cb8a73c1eab
    export default {
        props: {
            value: {
                type: String,
                default:''
            }
        },
        name: "editBlog",
        data () {
            return {
                tinymceHtml: this.value,
                title:'',
                isNull: true,
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
                    resize:false,
                    content_style: ` 
                    * { padding:0; margin:0; }   
                    img {max-width:90%; height:auto;}
                    `,
                    paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
                    image_dimensions: false, // 用户修改尺寸
                    maxSize: 2100000, // 文件大小2M
                    // 此处为图片上传处理函数
                    images_upload_handler: (blobInfo, success, failure) => {
<<<<<<< HEAD
                        if (blobInfo.blob().size > this.maxSize) {
                            failure('图片大小不能超过2M') 
                        }
                        //console.log('未转码');
                        // console.log(blobInfo.blob());
                        let formData = new FormData();
                        formData.append("photo", blobInfo.blob());
                        formData.append("token", '123456');
                        formData.append("article_id", 11000);
                        //console.log('已转码');
                        console.log(formData);
                        
                        // const img = 'data:image/jpeg;base64,' + blobInfo.base64() // 地址
                        console.log(img);
                        success(img)
=======
                        // tinymce.get('tinymce').insertContent('<div style="max-width:250px;display: block;margin:0 auto;overflow: hidden;"></div>');
                        var formdata = new FormData()
                        formdata.append('photo',blobInfo.blob())
                        formdata.append('token','123456')
                        formdata.append('article_id','10001')
                        api.uploadPhoto(formdata).then(res => success(res.photo_name))
                        // console.log(formdata.get('photo'))
                        // tinymce.get('tinymce').insertContent('<img style="max-width:250px;display: block;margin:0 auto;" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3620678974,412273927&fm=26&gp=0.jpg" >');

>>>>>>> 1d8924b33faa17467f3c73e0d1c60cb8a73c1eab
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
                                //假设接口接收参数为file,值为选中的文件
                                formData = new FormData();
                                formData.append('file', file);
                                console.log(file);
                            }
                        }
                    }
                }
            }
        },
        methods: {
            send() {

            },
            draft() {

            }
        },
        watch: {
            value (newValue) {
                console.log(newValue);
                this.tinymceHtml = newValue;
            },
            tinymceHtml (newValue) {
                if (newValue == '' || this.title == '') this.isNull = true;
                else this.isNull = false;
                
                this.$emit('input', newValue)
            },
            title (newValue) {
                if (newValue == '' || this.title == '') this.isNull = true;
                else this.isNull = false;
                this.title = newValue;
            }
        },
        updated() {
            $('.showcontent').find('img').css('max-width', '90%');
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
    .title {
        height: 44px;
        display: block;
        width: 100%;
        border: 0;
        font-family: 'Arial';
        font-size: 32px;
        font-weight: 600;
        line-height: 1.4;
        outline: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        resize: none;
        margin-bottom: 10px;
       
    }
    .el-button {
        float: right;
        margin-top: 10px;
    }
    .draft_btn {
        margin-right: 10px;
        color: #8DAFFC;
        border-color: #8DAFFC;
    }
    .draft_btn:hover {
        color: #8DAFFC !important;
        border-color: #8DAFFC !important;
        background-color: #f4f7ff !important; 
    }
    .showcontent {
        width: 940px;
        margin-top: 30px;
    }
    .showcontent /deep/ img {
        max-width:90%; 
        height:auto;
    }
</style>
