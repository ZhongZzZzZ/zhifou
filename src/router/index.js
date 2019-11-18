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
        }
    ]
})
