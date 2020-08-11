export default {
    logo: 'UNI-ADMIN',
    navBar: {
        active: "0",
        list: [
            {
                name: "首页",
                subActive: "0",
                submenu: [
                    {
                        icon: "el-icon-s-home",
                        name: "后台首页",
                        pathName: 'index'
                    },
                    {
                        icon: "el-icon-s-marketing",
                        name: "相册管理",
                        pathName: 'shop_pic_list'
                    },
                    {
                        icon: "el-icon-s-unfold",
                        name: "商品列表",
                        pathName: 'shop_goods_list'
                    },
                ],
            },
            {
                name: "商品",
                subActive: "0",
                submenu: [
                    {
                        icon: "el-icon-s-home",
                        name: "商品列表",
                        pathName: 'shop_goods_list',
                    },
                    {
                        icon: "el-icon-s-marketing",
                        name: "分类列表",
                    },
                    {
                        icon: "el-icon-s-unfold",
                        name: "商品规格",
                    },
                    {
                        icon: "el-icon-s-unfold",
                        name: "商品类型",
                    },
                    {
                        icon: "el-icon-s-unfold",
                        name: "商品评论",
                    },
                ],
            },
            {
                name: "订单",
                subActive: "0",
                submenu: [
                    {
                        icon: "el-icon-s-home",
                        name: "订单管理",
                    },
                    {
                        icon: "el-icon-s-marketing",
                        name: "发票管理",
                    },
                    {
                        icon: "el-icon-s-unfold",
                        name: "订单服务",
                    },
                ],
            },
            {
                name: "会员",
                subActive: "0",
                submenu: [
                    {
                        icon: "el-icon-s-home",
                        name: "会员列表",
                    },
                    {
                        icon: "el-icon-s-marketing",
                        name: "会员等级",
                    },
                ],
            },
            {
                name: "设置",
                subActive: "0",
                submenu: [
                    {
                        icon: "el-icon-s-home",
                        name: "基础设置",
                    },
                    {
                        icon: "el-icon-s-marketing",
                        name: "物流设置",
                    },
                    {
                        icon: "el-icon-s-unfold",
                        name: "管理员设置",
                    },
                    {
                        icon: "el-icon-s-unfold",
                        name: "交易设置",
                    },
                ],
            },
        ],
    },
}