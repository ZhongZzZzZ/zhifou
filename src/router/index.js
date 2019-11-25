import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const router = new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component:  () => import('../views/index')
        },
        {
            path:'/login',
            name:'login',
            component: ()=>import('../views/login/login')
        },
        {
            path:'/register',
            name:'register',
            component: ()=>import('../views/register/register')
        },
        {
            path:'/userinfo',
            name:'userinfo',
            component: ()=>import('../views/userinfo/userinfo'),
        },
        {
            path:'/editinfo',
            name:'editinfo',
            component: ()=>import('../views/userinfo/editinfo')
        },
        {
            path:'/editpsw',
            name:'editpsw',
            component: ()=>import('../views/userinfo/editpsw')
        },
        {
            path:'/message',
            name:'message',
            component: ()=>import('../views/message/message')
        },
        {
            path:'/artdetail',
            name:'artdetail',
            component: ()=>import('../views/artdetail/artdetail')
        },
    ]
})
