import {createRouter, createWebHistory } from 'vue-router'
import JieLongHistoryView from "../page/gushijielong/JieLongHistoryView.vue";
import JieLongHomeView from "../page/gushijielong/JieLongHomeView.vue";
import JieLongInfoView from "../page/gushijielong/JieLongInfoView.vue";

const routes = [
    {
        path: '/',
        name: 'JieLongHomeView',
        meta: {
            title:'接龙首页'
        },
        component: JieLongHomeView
    },
    {
        path: '/JieLongInfo/:groupId',
        name: 'jieLongInfoView',
        meta: {
            title: '接龙详细'
        },
        component: JieLongInfoView
    },
    {
        path: '/JieLongHistory',
        name: 'jieLongHistory',
        meta: {
            title: '历史接龙'
        },
        component: JieLongHistoryView
    }
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})
router.beforeEach((to, from, next) => {
    // 路由守卫
    let title = '四方'
    if (to.meta.title) {
        title = to.meta.title
    }
    document.title = title
    next()
})
export default router