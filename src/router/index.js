import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Calendar from '../views/Calendar.vue'
import Admin from '../views/Admin.vue'
import Dps from '../views/DPS.vue'
import AdminUsers from '../components/AdminUsers.vue'
import AdminEvents from '../components/AdminEvents.vue'
import AdminBlog from '../components/AdminBlog.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: Login
  // },
  {
    path: '/dps',
    name: 'dps',
    component: Dps
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar
  },
  {
    path: '/admin',
    component: Admin,
    children: [
  
      {
        path: 'members',
        name: 'AdminUsers',
        component: AdminUsers
      },
      {
        path: 'events',
        name: 'AdminEvents',
        component: AdminEvents
      },
      {
        path: 'blog',
        name: 'AdminBlog',
        component: AdminBlog
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
