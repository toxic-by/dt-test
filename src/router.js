
import { createRouter, createWebHistory } from 'vue-router'
import main from './views/main.vue'
import convert from './views/converter.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: main,
    },
    {
      path: '/convert',
      component: convert,
      props: { rates: true }
    },
  ],
})