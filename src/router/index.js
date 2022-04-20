import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component:() => import('../views/home/Home.vue')
  },
  {
    path: '/rank',
    name: 'rank',
    component: () => import('../views/rankingList/RankingList.vue')
  },
  {
    path: '/browsing',
    name: '/browsing',
    component: () => import('../views/browsing/browsingList.vue')
  },
  {
    path: '/keywords',
    name: 'keywords',
    component: () =>import('../views/searchResult/SearchResult.vue')
  },
  {
    path: '/users/bookmarked',
    name: 'BookMarked',
    component: () => import('../views/user/BookMarked.vue'),
  },
  {
    path: '/users/followed',
    name: 'Followed',
    component: () => import('../views/user/Followed.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
