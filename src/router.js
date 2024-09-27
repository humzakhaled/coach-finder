import { createRouter, createWebHistory } from 'vue-router';
import { defineAsyncComponent } from 'vue';
import store from './store/index.js';

const CoachesList = defineAsyncComponent(() => import('./pages/coaches/CoachesList.vue'));
const CoachDetail = defineAsyncComponent(() => import('./pages/coaches/CoachDetail.vue'));
const CoachRegisteration = defineAsyncComponent(() => import('./pages/coaches/CoachRegisteration.vue'));
const ContactCoach = defineAsyncComponent(() => import('./pages/requests/ContactCoach.vue'));
const RequestReceived = defineAsyncComponent(() => import('./pages/requests/RequestReceived.vue'));
const UserAuth = defineAsyncComponent(() => import('./pages/auth/UserAuth.vue'));
const NotFound = defineAsyncComponent(() => import('./pages/NotFound.vue'));

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    {
      path: '/coaches',
      component: CoachesList,
      name: 'CoachesList'
    },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      name: 'CoachDetail',
      children: [
        { path: 'contact', component: ContactCoach, name: 'ContactCoach' }
      ]
    },
    {
      path: '/register',
      component: CoachRegisteration,
      name: 'CoachRegisteration',
      meta: { requiresAuth: true }
    },
    {
      path: '/requests',
      component: RequestReceived,
      name: 'RequestReceived',
      meta: { requiresAuth: true }
    },
    {
      path: '/auth',
      component: UserAuth,
      name: 'UserAuth',
      meta: { requiresUnAuth: true }
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
      name: 'NotFound'
    }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

// Global route guard for auth
router.beforeEach((to, _, next) => {
  const isAuthenticated = store.getters.isAuthenticated;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/auth'); // Redirect to auth page if not authenticated
  } else if (to.meta.requiresUnAuth && isAuthenticated) {
    next('/coaches'); // Redirect to coaches list if already authenticated
  } else {
    next(); // Proceed to the route
  }
});

export default router;
