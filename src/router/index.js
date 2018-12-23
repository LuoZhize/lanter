import Vue from 'vue';
import Router from 'vue-router';
import Auth from 'components/auth/auth';
import User from 'components/user/user';
import Todo from 'components/todo/todo';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/user',
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
    },
    {
      path: '/user',
      name: 'user',
      component: User,
    },
    {
      path: '/todo',
      name: 'todo',
      component: Todo,
    },
  ],
});
