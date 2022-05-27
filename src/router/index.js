import Vue from 'vue'
import VueRouter from 'vue-router'
import Root from '../views/Root/Root.vue'
import { authGuard, admin } from './authGuard'
import Login from "../views/Login/Login.vue";
import Register from "../views/Register/Register.vue";
import Attendance from "../views/Attendance/Attendance.vue";
import AdminAttendance from "../views/admin/Attendance/AdminAttendance.vue";
import WorkersList from "../views/admin/Workers/WorkersList.vue";
import WorkerEdit from "../views/admin/Workers/WorkerEdit.vue";
import WorkerAttendance from "../views/admin/Workers/WorkerAttendance.vue";
import WorkerListEdit from "../views/admin/Workers/WorkerListEdit.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    // component: () =>
    //   import(/* webpackChankName "login"*/ "../views/Login/Login.vue"),
    component: Login,
    name: 'Login'
  },
  {
    path: "/",
    component: Root,
    children: [
      {
        path: "/register",
        // component: () =>
        //   import(
        //     /* webpackChankName "register"*/ "../views/Register/Register.vue"
        //   ),
        component: Register,
        name: 'Register'
      },
      {
        path: "/",
        redirect: "attendance",
      },
      {
        path: "/attendance",
        beforeEnter: authGuard,
        // component: () =>
        //   import(
        //     /* webpackChankName "Attendance" */ "../views/Attendance/Attendance.vue"
        //   ),
        component: Attendance,
        name: 'Attendance'
      },
      {
        path: "/admin/attendance",
        beforeEnter: admin,
        // component: () =>
        //   import(
        //     /* webpackChankName "AdminAttendance" */ "../views/admin/Attendance/AdminAttendance.vue"
        //   ),
        component: AdminAttendance,
        name: 'AdminAttendance'
      },
      {
        path: "/workers",
        beforeEnter: admin,
        // component: () =>
        //   import(
        //     /* webpackChankName "WorkersList" */ "../views/admin/Workers/WorkersList.vue"
        //   ),
        component: WorkersList,
        name: WorkersList
      },
      {
        path: "/worker_edit",
        beforeEnter: admin,
        // component: () =>
        //   import(
        //     /* webpackChankName "WorkerEdit" */ "../views/admin/Workers/WorkerEdit.vue"
        //   ),
        component: WorkerEdit,
        name: 'WorkerEdit'
      },
      {
        path: "/worker_list",
        beforeEnter: admin,
        // component: () =>
        //   import(
        //     /* webpackChankName "WorkerAttendance" */ "../views/admin/Workers/WorkerAttendance.vue"
        //   ),
        component: WorkerAttendance,
        name: 'WorkerAttendance'
      },
      {
        path: "/worker_list/edit/:id/:year/:month/:day",
        beforeEnter: admin,
        // component: () =>
        //   import(
        //     /* webpackChankName "WorkerListEdit" */ "../views/admin/Workers/WorkerListEdit.vue"
        //   ),
        component: WorkerListEdit,
        name: 'WorkerListEdit'
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
