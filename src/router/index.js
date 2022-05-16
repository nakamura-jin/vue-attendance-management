import Vue from 'vue'
import VueRouter from 'vue-router'
import Root from '../views/Root/Root.vue'
import { authGuard, admin } from './authGuard'

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    component: () =>import(/* webpackChankName "login"*/ "../views/Login/Login.vue"),
  },
  {
    path: "/",
    component: Root,
    children: [
      {
        path: "/",
        redirect: "attendance",
      },
      {
        path: "/attendance",
        beforeEnter: authGuard,
        component: () =>import(/* webpackChankName "Attendance" */ "../views/Attendance/Attendance.vue"),
      },
      {
        path: "/admin/attendance",
        beforeEnter: admin,
        component: () =>import(/* webpackChankName "AdminAttendance" */ "../views/admin/Attendance/AdminAttendance.vue"),
      },
      {
        path: "/workers",
        beforeEnter: admin,
        component: () =>import(/* webpackChankName "WorkersList" */ "../views/admin/Workers/WorkersList.vue"),
      },
      {
        path: "/worker_list",
        beforeEnter: authGuard,
        component: () =>import(/* webpackChankName "WorkerAttendance" */ "../views/admin/Workers/WorkerAttendance.vue"),
      }
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
