<template>
    <div class="inner">
        <editor id='tinymce' v-model='tinymceHtml' :init='init'></editor>
    </div>
</template>

<script>
    import tinymce from 'tinymce/tinymce'
    import 'tinymce/themes/modern/theme'
    import Editor from '@tinymce/tinymce-vue'
    import 'tinymce/plugins/image'
    import 'tinymce/plugins/link'
    import 'tinymce/plugins/code'
    import 'tinymce/plugins/table'
    import 'tinymce/plugins/lists'
    import 'tinymce/plugins/contextmenu'
    import 'tinymce/plugins/wordcount'
    import 'tinymce/plugins/colorpicker'
    import 'tinymce/plugins/textcolor'
    export default {
        name: "GoodsModify",
        components: {Editor},
        data() {
            return {
                tinymceHtml: '',
                init: {
                    language_url: '/tinymce/zh_CN.js',
                    language: 'zh_CN',
                    skin_url: '/tinymce/skins/lightgray',
                    height: 300,
                    plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
                    toolbar:
                        'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
                    images_upload_handler: (blobInfo, success, failure) => {
                        const img = 'data:image/jpeg;base64,' + blobInfo.base64();
                        success(img)
                    }
                }
            }
        },
        mounted () {
            tinymce.init({});
        }
    }
</script>

<style scoped>

</style>