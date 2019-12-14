import { router } from "./router/index";
import {getLocalStorage} from "./utils/auth";

const whiteList = ['/login','/register','/resetPassword','/sentPassword']

router.beforeEach((to,from,next)=>{
    if (getLocalStorage('token')){
        next()
    }else{
        if (whiteList.indexOf(to.path !== -1)){
            next()
        }else{
            next('/login')
        }
    }
})
