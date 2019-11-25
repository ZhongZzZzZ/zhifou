import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const router = new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            redirect:'/hotPoint',
            component:  () => import('../views/index'),
            children:[
                {
                    path:'follow',
                    name:'follow',
                    component:()=> import('../views/follow/follow')
                },
                {
                    path:'hotPoint',
                    name:'hotPoint',
                    component:()=> import('../views/hotPoint/hotPoint')
                }
            ]
        },
        {
            path:'/login',
            name:'login',
            component: ()=>import('../views/login/login')
        },
        {
            path:'/interest',
            name:'interest',
            component: ()=>import('../views/interest/interest')
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
            path:'/editBlog',
            name:'editBlog',
            component: () => import('../views/editBlog/editBlog')
        },{
            path:'/articleDetail',
            name:'articleDetail',
            component:() => import('../views/articleDetail/articleDetail')
        }
    ]
})
