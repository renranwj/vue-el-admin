let routes = [
    {
      path: '/',
      name: 'layout',
      redirect: '/index',
      component: 'layout',
      children: [
        {
          path: '/index',
          name: 'index',
          component: 'index/index'
        },
        {
            path: '/shop/goods/list',
            name: 'list',
            component: 'shop/goods/list'
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      //这个样子也可以直接引进来组件
      component: 'login/index'
    },
    {
        path: '*',
        redirect: {
            name: 'index'
        }
    }
]

//获取路由信息的方法
let getRoutes = function () {
    //自动生成路由
    createRoute(routes);

    return routes;
}

//自动生成路由
function createRoute(arr) {
    for(let i = 0; i < arr.length; i ++) {
        if(!arr[i].component) return;
        let componentFun = import(`../../views/${arr[i].component}.vue`);
        arr[i].component = () => componentFun;
        if(arr[i].children && arr[i].children.length > 0) {
            //子路由进行递归
            createRoute(arr[i].children);
        }
    }
}


export default getRoutes();