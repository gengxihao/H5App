/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/activity',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/activity',
        name: 'Activity',
        component: () => import('@/views/home/activity'),
        meta: { title: '活动', keepAlive: false }
      },
      {
        path: '/recommend',
        name: 'Recommend',
        component: () => import('@/views/home/recommend'),
        meta: { title: '推荐', keepAlive: false }
      },
      {
        path: '/shoppingMall',
        name: 'ShoppingMall',
        component: () => import('@/views/home/shoppingMall'),
        meta: { title: '商城', keepAlive: false }
      },
      {
        path: '/My',
        name: 'My',
        component: () => import('@/views/home/my'),
        meta: { title: '我的', keepAlive: false }
      }
    ]
  },
  {
    path: '/DialActivity',
    name: 'DialActivity',
    component: () => import('@/views/activitys/dialActivity'),
    meta: {title: '大转盘', keepAlive: false}
  },
  {
    path: '/scratch',
    name: 'Scratch',
    component: () => import('@/views/activitys/scratch'),
    meta: {title: '刮刮乐', keepAlive: false}
  },
]
