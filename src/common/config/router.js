/**
 * 规则：
 * 一、index/index、shop/goods/index 等等，index结尾的，name与path默认去除掉index
 *二、shop/goods/list  的name为shop_goods_list
 三、填写后不会自动生成
 */


let routes = [
    {
        //   path: '/',
        //   name: 'layout',
        redirect: '/index',
        component: 'layout',
        children: [
            {
                //   path: '/index',
                //   name: 'index',
                // component: () => import('../../views/index/index.vue'),
                component: 'index/index',
                meta: { title: '后台首页' }
            },
            {
                // path: '/shop/goods/list',
                // name: 'list',
                // component: () => import('../../views/shop/goods/list.vue'),
                component: 'shop/goods/list',
                meta: { title: '商品列表' }
            },
            {
                component: 'image/index',
                meta: { title: '相册管理' }
            }
        ]
    },
    {
        //   path: '/login',
        //   name: 'login',
        //这个样子也可以直接引进来组件
        // component: () => import('../../views/login/index.vue'),
        component: 'login/index',
        meta: { title: '登录页面' }
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
    for (let i = 0; i < arr.length; i++) {
        if (!arr[i].component) return;
        //去除末尾index
        let val = outIndex(arr[i].component);
        //生成name
        // console.log(val)
        arr[i].name = arr[i].name || val.replace(/\//g, "_");//将/替换成_
        //生成path
        arr[i].path = arr[i].path || `/${val}`;
        //自动生成component
        let componentFun = import(`../../views/${arr[i].component}.vue`);
        arr[i].component = () => componentFun;
        if (arr[i].children && arr[i].children.length > 0) {
            //子路由进行递归
            createRoute(arr[i].children);
        }
    }
}

function outIndex(str) {
    //str = login/index
    //获取最后一个'/'的索引
    let index = str.lastIndexOf('/');
    //获取最后一个'/'后面的字符串
    let lastStr = str.substring(index + 1, str.length);
    if (lastStr === 'index') {
        return str.substring(index, -1);
    }
    return str;
}


export default getRoutes();