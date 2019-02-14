import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/home/home.vue';
import Login from './views/login/login.vue';
import { getUserInfo } from "@/services/auth.service";
import study from '@/components/study/study.vue';
import teacher from '@/components/teacher/teacher.vue';
import academy from '@/components/academy/academy.vue';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [
                {
                    path: '/teacher',
                    name: 'teacher',
                    component: teacher
                },
                {
                    path: '/study',
                    name: 'study',
                    component: study
                },
                {
                    path: '/academy',
                    name: 'academy',
                    component: academy
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
    ]
});


/**
 * 路由守卫
 */
router.beforeEach((to, from, next) => {
    if (to.name === 'login') {
        next();
    } else {
        if (!getUserInfo()) {
            next({
                name: 'login'
            });
        } else {
            next();
        }
    }
});

export default router;
