import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Element from 'element-ui';
import './element-variables.scss';
import http from '@/services/request.service.ts';


Vue.use(Element);
Vue.prototype['$http'] = http;
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
