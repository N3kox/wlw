import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    base : process.env.BASE_URL,
    routes : [
        {
            path: '/',
            name: 'home',
            component:()=>import('./views/init.vue')
        },
        {
            path: '/ec',
            name: 'ec',
            component:()=>import('./views/ec.vue')
        }
    ]
})