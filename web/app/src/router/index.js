import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import HomePageView from '@/views/admin/HomePageView.vue'
import HomePageUser from '@/views/user/HomePageUser.vue'
import config from '@/config'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      // children:[
      //   {
      //     path:'register',
      //     component:RegisterView
      //   },
      //   {
      //     path:'login',
      //     component:LoginView
      //   }
      // ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/admin-index',
      name: 'admin-index',
      component: HomePageView,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem(config.token_name);
        if (!token) {
          next('/login');
        } else {
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (payload.role === 'admin') {
            next();
          } else if(payload.role === 'user'){
            next('/user-index')
          } else {
            next('/login');
          }
        }
      }
    },
    {
      path: '/user-index',
      name: 'user-index',
      component: HomePageUser,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem(config.token_name);
        if (!token) {
          next('/login')
        } else {
          next()
        }
      }
    }
  ]
})

export default router
