

export const menuRouters = [
  {
    path: '/index',
    name: 'home-index',
    component: resolve => {
      require(['@/views/index/index.vue'], resolve);
    }
  },
  {
    path: '/admin',
    name: 'home-admin',
    component: resolve => {
      require(['@/views/admin/index.vue'], resolve);
    }
  }
];


export const routers = [
  ...menuRouters
];
