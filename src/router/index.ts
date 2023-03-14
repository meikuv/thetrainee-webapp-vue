import { createRouter, createWebHistory, RouteComponent } from 'vue-router'
import { authModuleStore }from '../store/authModule'
import { computed } from 'vue'
import { Role } from '@/helpers/role'

const routes = [
  {
    path: '/',
    name: 'login',
    component: (): Promise<RouteComponent> => import('@pages/auth/AuthorizationPage.vue'),
  }, 
  {
    path: '/register',
    name: 'register',
    component: (): Promise<RouteComponent> => import ('@pages/registration/RegistrationPage.vue'),
  },
  {
    path: '/home',
    component: (): Promise<RouteComponent> => import('@pages/home/HomePage.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: (): Promise<RouteComponent> => import('@/pages/vacancy/AllVacancyPage.vue'),
        props: true,
      },
      {
        path: 'vacancy/:id',
        name: 'vacancyPage',
        component: (): Promise<RouteComponent> => import('@/pages/vacancy/VacancyPage.vue'),
        props: castRouteParams,
      },
      {
        path: 'posts',
        name: 'posts',
        component: (): Promise<RouteComponent> => import('@pages/post/PostPage.vue'),
      },
      {
        path: 'company',
        name: 'company',
        component: (): Promise<RouteComponent> => import('@pages/company/CompanyPage.vue'),
      },
      {
        path: 'createVacancy',
        name: 'createVacancy',
        component: (): Promise<RouteComponent> => import('@pages/vacancy/CreateVacancyPage.vue'),
        meta: { authorize: [Role.COMPANY] } 
      },
      {
        path: 'createResume',
        name: 'createResume',
        component: (): Promise<RouteComponent> => import('@pages/resume/CreateResumePage.vue'),
        meta: { authorize: [Role.User] } 
      }
    ],
    meta: { authorize: [Role.User, Role.COMPANY, Role.Admin] } 
  },
  {
    path: '/profile',
    name: 'profile',
    component: (): Promise<RouteComponent> => import('@pages/profile/ProfilePage.vue'),
    children: [
      {
        path: '',
        name: 'userInfo',
        component: (): Promise<RouteComponent> => import('@pages/profile/UserInfoSubPage.vue'),
        props: true,
      },
      {
        path: 'settings',
        name: 'settings',
        component: (): Promise<RouteComponent> => import('@/pages/profile/EditProfileSubPage.vue'),
        props: true,
      },
      {
        path: 'myResumes',
        name: 'myResumes',
        component: (): Promise<RouteComponent> => import('@/pages/resume/UserResumesPage.vue'),
        meta: { authorize: ['USER_ROLE'] } 
      },
      {
        path: 'myResponds',
        name: 'myResponds',
        component: (): Promise<RouteComponent> => import('@pages/profile/RespondsSubPage.vue'),
      },
      {
        path: 'myVacancy',
        name: 'myVacancy',
        component: (): Promise<RouteComponent> => import('@pages/profile/CompanyVacancySubPage.vue'),
        meta: { authorize: ['COMPANY_ROLE'] } 
      },
    ],
    meta: { authorize: [Role.User, Role.COMPANY, Role.Admin] } 
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: (): Promise<RouteComponent> => import('@pages/notFound/404.vue'),
  }
]

function castRouteParams(route: any) {
  return {
    id: Number(route.params.id)
  };
}

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize }: any = to.meta;
  const currentUser = computed(() => authModuleStore().getCurrentUser)
  const role = computed(() => JSON.parse(authModuleStore().getUserRole))

  if (authorize) {
      if (!currentUser.value) {
          // not logged in so redirect to login page with the return url
          return next({ path: '/' });
      }

      // check if route is restricted by role
      if (authorize.length && !authorize.includes(role.value)) {
          // role not authorised so redirect to home page
          return next({ path: '/home' });
      }
  }

  next();
})
  
export default router