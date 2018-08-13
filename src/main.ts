import Vue from 'vue';
import App from './app/app.vue';
import router from './app/router';
import store from './app/store';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
