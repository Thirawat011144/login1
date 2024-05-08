import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import HomePageView from '@/views/HomePageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children:[
        {
          path:'register',
          component:RegisterView
        },
        {
          path:'login',
          component:LoginView
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    // {
    //   path:'/register',
    //   name:'register',
    //   component: RegisterView
    // },
    // {
    //   path:'/login',
    //   name:'login',
    //   component:LoginView
    // }
    ,{
      path:'/home-view',
      name:'home-view',
      component:HomePageView
    }
  ]
})

export default router
