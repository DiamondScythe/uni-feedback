import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import PostView from '../views/PostView.vue'
import DetailsView from '../views/DetailsView.vue'
import Admin_User_Table from '../views/AdminView/User.vue'
import Add_User from '../views/AdminView/AddUser.vue'
import Edit_User from '../views/AdminView/EditUser.vue'
import Category_Table from '../views/AdminView/Category.vue'
import Add_Category from '../views/AdminView/AddCategory.vue'
import Edit_Category from '../views/AdminView/EditCategory.vue'
import Department_Table from '../views/AdminView/Department.vue'
import Add_Department from '../views/AdminView/AddDepartment.vue'
import Edit_Department from '../views/AdminView/EditDepartment.vue'
import Statistic from '../views/ManagerView/Statistic.vue'
import Test from '../views/Test.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/post',
    name: 'post',
    component: PostView
  },
  {
    path: '/details',
    name: 'details',
    component: DetailsView
  },
  {
    path: '/user',
    name: 'user',
    component: Admin_User_Table
  },
  {
    path:'/user/create',
    name: 'AddUser',
    component: Add_User
  },
  {
    path:'/user/edit/id=',
    name: 'EditUser',
    component: Edit_User
  },
  {
    path: '/category',
    name: 'category',
    component: Category_Table
  },
  {
    path:'/category/create',
    name: 'AddCategory',
    component: Add_Category
  },
  {
    path:'/category/edit/id=',
    name: 'EditCategory',
    component: Edit_Category
  },
  {
    path: '/department',
    name: 'department',
    component: Department_Table
  },
  {
    path:'/department/create',
    name: 'AddDepartment',
    component: Add_Department
  },
  {
    path:'/department/edit/id=',
    name: 'EditDepartment',
    component: Edit_Department
  },
  {
    path:'/manager/statistic',
    name: 'Statistic',
    component: Statistic
  },
  {
    path:'/test',
    name: 'Test',
    component: Test
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
