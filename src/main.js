
import Vue from 'vue'
import Vuex from "vuex"
import App from './App'
import VueRouter from 'vue-router'
import history from '@/views/history'
import Login from '@/views/Login'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
// import 'vue-material/dist/theme/default-dark.css';
import './assets/viewport.scss'
import './assets/main.css'
Vue.config.productionTip = false
Vue.use(Vuex);
Vue.use(VueRouter)
Vue.use(VueMaterial)

const store = new Vuex.Store(
  {
      state: {
          authenticated: false
      },
      mutations: {
          setAuthentication(state, status) {
              state.authenticated = status;
          }
      }
  }
);

const router=new VueRouter({
    routes: [
        {
            path: '/',
            redirect: {
                name: "login"
            }
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/history",
            name: "history",
            component: history,
            beforeEnter: (to, from, next) => {
                if(store.state.authenticated == false) {
                    next(false);
                } else {
                    next();
                }
            }
        }
    ]
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store: store
}).$mount('#app')

