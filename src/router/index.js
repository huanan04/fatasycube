import {createRouter, createWebHistory } from 'vue-router'
import JieLongInfo from "../page/JieLongInfo.vue";

const routes = [
    {
        path: '/jielong/info/:groupId',
        // path: '/',
        name: '接龙详情',
        meta: {
            title: '接龙详情'
        },
        component: JieLongInfo
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