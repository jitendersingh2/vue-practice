// Libraries.
import '@/assets/scss/app.scss';

import BootstrapVue from 'bootstrap-vue';
import VeeValidate from 'vee-validate';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import 'element-ui/lib/theme-chalk/index.css';
import vClickOutside from 'v-click-outside';
import VueCroppie from 'vue-croppie';
import 'croppie/croppie.css';
import { Validator } from 'vee-validate';
import PhoneNumber from 'awesome-phonenumber';

import Vue from 'vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

// Components.
import App from './App.vue';
import VueApollo from 'vue-apollo';

Vue.use(BootstrapVue);
Vue.use(ElementUI, { locale });
Vue.use(vClickOutside);
Vue.use(VueCroppie);
Vue.use(VeeValidate, { fieldsBagName: 'veeFields' });
Vue.use(VueApollo);
// tslint:disable-next-line
Vue.use(require('vue-moment'));

Validator.extend('phone_number', {
    getMessage: (field) => `${field} is not a valid phone number`,
    validate(value) {
        return new Promise((resolve) => {
            const phone = new PhoneNumber(value);
            resolve({ valid: phone.isValid() });
        });
    },
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
