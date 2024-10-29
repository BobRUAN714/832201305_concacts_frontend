import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

/**
 * Note: 路由配置项
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现，如登录页面或一些特殊页面
 * alwaysShow: true                 // 当子路由数量大于1时会自动嵌套
 * redirect: noRedirect             // 在面包屑中不可点击
 * name: 'router-name'              // 必须填写，用于keep-alive使用
 * meta: {
 *  roles: ['admin', 'editor']     // 页面权限
 *  title: 'title'                 // 侧边栏和面包屑中的显示名称
 *  icon: 'svg-name'               // 侧边栏中的图标
 *  breadcrumb: false              // 面包屑中隐藏
 * }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/index'),
        name: 'Index',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/address-book',
    component: Layout,
    redirect: '/address-book/index',
    meta: { title: '通讯录管理', icon: 'phone' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/addressBook/index'), // 导入组件
        name: 'AddressBook',
        meta: { title: '通讯录', icon: 'phone' } // 侧边栏显示的名称和图标
      }
    ]
  }
]

// 动态路由，基于用户权限动态加载
export const dynamicRoutes = [
  {
    path: '/system/user-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [
      {
        path: 'role/:userId(\\d+)',
        component: () => import('@/views/system/user/authRole'),
        name: 'AuthRole',
        meta: { title: '分配角色', activeMenu: '/system/user' }
      }
    ]
  },
  {
    path: '/system/role-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:role:edit'],
    children: [
      {
        path: 'user/:roleId(\\d+)',
        component: () => import('@/views/system/role/authUser'),
        name: 'AuthUser',
        meta: { title: '分配用户', activeMenu: '/system/role' }
      }
    ]
  },
  {
    path: '/system/dict-data',
    component: Layout,
    hidden: true,
    permissions: ['system:dict:list'],
    children: [
      {
        path: 'index/:dictId(\\d+)',
        component: () => import('@/views/system/dict/data'),
        name: 'Data',
        meta: { title: '字典数据', activeMenu: '/system/dict' }
      }
    ]
  },
  {
    path: '/monitor/job-log',
    component: Layout,
    hidden: true,
    permissions: ['monitor:job:list'],
    children: [
      {
        path: 'index/:jobId(\\d+)',
        component: () => import('@/views/monitor/job/log'),
        name: 'JobLog',
        meta: { title: '调度日志', activeMenu: '/monitor/job' }
      }
    ]
  },
  {
    path: '/tool/gen-edit',
    component: Layout,
    hidden: true,
    permissions: ['tool:gen:edit'],
    children: [
      {
        path: 'index/:tableId(\\d+)',
        component: () => import('@/views/tool/gen/editTable'),
        name: 'GenEdit',
        meta: { title: '修改生成配置', activeMenu: '/tool/gen' }
      }
    ]
  },
]

// 防止连续点击多次路由报错
let routerPush = Router.prototype.push;
let routerReplace = Router.prototype.replace;

Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err);
}
Router.prototype.replace = function replace(location) {
  return routerReplace.call(this, location).catch(err => err);
}

const router = new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

// 添加权限逻辑
router.beforeEach((to, from, next) => {
  // 检查是否有 noAuth 标志，直接放行
  if (to.meta && to.meta.noAuth) {
    next()
    return
  }

  // 如果需要权限验证的逻辑放在这里，省略本例中具体权限检查代码
  next()
})

export default router
