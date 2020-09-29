import $util from '@/common/util'
export default {
    state: {
        spec_type: 0, //商品规格：0 单一规格；1 多规格
        title: "",
        category: [], //种类
        desc: "", //描述
        unit: "", //单位
        stock: 0, //总库存
        min_stock: 0, //库存预警
        display_stock: 0, //库存显示
        status: 0, //是否上架 0 仓库  ；1 上架
        express: "", //运费模板

        oprice: 0, //市场价格
        pprice: 0, //销售价格
        cprice: 0, //成本价格
        weight: 0, //重量
        volume: 0, //体积

        // 规格卡片
        spec_card: [{
                name: '色调',
                type: 0, // 0 无，1 颜色，2 图片
                list: [{
                        name: '红色',
                        image: '',
                        color: ''
                    },
                    {
                        name: '黄色',
                        image: '',
                        color: ''
                    },

                ]
            },
            {
                name: '类型',
                type: 0, // 0 无，1 颜色，2 图片
                list: [{
                        name: '手持',
                        image: '',
                        color: ''
                    },
                    {
                        name: '脚踏',
                        image: '',
                        color: ''
                    },
                    {
                        name: '电动',
                        image: '',
                        color: ''
                    }
                ]
            },
            {
                name: '大小',
                type: 0, // 0 无，1 颜色，2 图片
                list: [{
                        name: 'L',
                        image: '',
                        color: ''
                    },
                    {
                        name: 'XL',
                        image: '',
                        color: ''
                    },

                ]
            }
        ],
        ths: [{
                name: "商品规格",
                rowspan: 1,
                colspan: 1,
                width: ""
            },
            {
                name: "sku图片",
                rowspan: 2,
                width: "60"
            },
            {
                name: "销售价",
                rowspan: 2,
                width: "100"
            },
            {
                name: "市场价",
                rowspan: 2,
                width: "100"
            },
            {
                name: "成本价",
                rowspan: 2,
                width: "100"
            },
            {
                name: "库存",
                rowspan: 2,
                width: "100"
            },
            {
                name: "体积",
                rowspan: 2,
                width: "100"
            },
            {
                name: "重量",
                rowspan: 2,
                width: "100"
            },
            {
                name: "编码",
                rowspan: 2,
                width: "100"
            },
        ],
    },
    getters: {
        //获取表头
        tableThs(state) {
            let len = state.spec_card.length
            state.ths[0].colspan = len;
            state.ths[0].rowspan = len > 0 ? 1 : 2;
            return state.ths;
        },
        //获取规格表格数据
        tableData(state) {
            if (state.spec_card.length < 0) {
                return [];
            }
            let specList = [];
            for (let i = 0; i < state.spec_card.length; i++) {
                if (state.spec_card[i].list.length === 0) {
                    return []
                }
                specList.push(state.spec_card[i].list);
            }
            if (specList.length === 0) {
                return []
            }
            // console.log(specList)
            let arr = $util.cartesianProductOf(specList);
            return arr.map( v => {
                let obj = {
                    spec: [],
                    image: '',
                    oprice: 0, //市场价格
                    pprice: 0, //销售价格
                    cprice: 0, //成本价格
                    weight: 0, //重量
                    volume: 0, //体积
                    stock: 0,
                    code: ''
                }
                obj.spec = v;
                return obj;
            })
        }
    },
    mutations: {
        //修改state
        vModelState(state, {
            key,
            value
        }) {
            state[key] = value;
        },
        // 增加规格卡片
        addSpecCard(state) {
            state.spec_card.push({
                name: '规格名称',
                type: 0,
                list: []
            })
        },
        //删除规格卡片
        deleSpecCard(state, index) {
            state.spec_card.splice(index, 1);
        },
        // 修改规格卡片
        vModelCard(state, {
            key,
            index,
            value
        }) {
            state.spec_card[index][key] = value;
        },
        //规格卡片排序
        sortSpecCard(state, {
            action,
            index
        }) {
            $util[action](state.spec_card, index);
        },
        //增加指定规格卡片规格值
        addSpecCardValue(state, index) {
            state.spec_card[index].list.push({
                name: '规格名称',
                image: '',
                color: ''
            })
        },
        //删除指定规格卡片规格值
        delSpecCardValue(state, {
            cardIndex,
            specIndex
        }) {
            state.spec_card[cardIndex].list.splice(specIndex, 1);
        },
        //修改指定规格卡片规格值
        updateSpecCardValue(state, {
            cardIndex,
            specIndex,
            key,
            value
        }) {
            state.spec_card[cardIndex].list[specIndex][key] = value
        },
        //排序规格卡片的规格属性列表
        sortSpecValue(state, {
            index,
            value
        }) {
            state.spec_card[index].list = value;
            // console.log(state.spec_card[index].list)
        }
    },
    actions: {

    }
}