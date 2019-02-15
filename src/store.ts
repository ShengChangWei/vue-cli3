import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 0,
        isTrue: false,
        primary: '#0BBBA3'
    },
    mutations: {
        increment(state) {
            state.count++;
        },

        tolggleTrue(state) {
            state.isTrue = !state.isTrue;
        }
    },
    actions: {},
    getters: {
        doneTodos: state => {
            return state.isTrue;
        },
        // Getter 也可以接受其他 getter 作为第二个参数：
        doneTodosCount: (state, getters) => {

        },
        toggleColor: (state) => (color: any) => {
            return state.primary = color;
        }
    }
});
