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
            name: '颜色',
            type: 0, // 0 无，1 颜色，2 图片
            list: [
                {
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
        }]
    },
    getters: {

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
        delSpecCardValue(state, { cardIndex, specIndex }) {
            state.spec_card[cardIndex].list.splice(specIndex, 1);
        },
        //修改指定规格卡片规格值
        updateSpecCardValue(state, {cardIndex, specIndex, key, value}) {
            state.spec_card[cardIndex].list[specIndex][key] = value
        }
    },
    actions: {

    }
}