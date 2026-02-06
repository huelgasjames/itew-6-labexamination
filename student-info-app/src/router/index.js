import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Students from '../pages/Students.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/students', component: Students }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
    