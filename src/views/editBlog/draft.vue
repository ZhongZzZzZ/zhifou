<template>
    <div>
        <Nav style="position:sticky;"></Nav>
        <div class="main">
          
            
        </div>
    </div>
</template>

<script>
    import Nav from '../../components/navBar/nav'
    export default {
        name: "userinfo",
        data(){
            return {
                sex: 1,
                activeName: 'myarticle',
            }
        },
        components: {
            Nav
        },
        methods: {
            goEditInfo() {
                this.$router.push('/editinfo')
            },
        },
        created(){

        },
    }
</script>

<style lang="scss">
    .main{
        width: 940px;
        height: 1000px;
        margin: 10px auto;
        background-color: #fff;
        box-shadow: 0 1px 3px rgba(26,26,26,.1);
        padding: 50px 30px;
    }
    
</style>
