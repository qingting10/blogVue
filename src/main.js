import Vue from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import $ from 'jquery';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap" ;

//引入自定义的导航栏标签
import "./css/nav.css";

import mavonEditor from 'mavon-editor';     //markdown编辑器
import 'mavon-editor/dist/css/index.css';
Vue.use(mavonEditor);

//前后端传输
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs';
Vue.prototype.$ajax = axios;
Vue.prototype.$qs = qs;
Vue.use(VueResource);

import VueResource from 'vue-resource'
import router from './router'	//引入路由

import api from "./js/api";

window.Vue=Vue;

Vue.config.productionTip = false


// 通过路由进行拦截
router.beforeEach((to, from, next) => {
	if (to.meta.requireAuth) {
		// 判断该路由是否需要登录权限
		if (localStorage.getItem("login")) {
			// 通过localStorage获取当前的token是否存在 
			next();
		} else {
			next({
				path: "/login",
				query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
			});
		}
	} 
	else {
		next();
	}
});

// 通过请求进行拦截
axios.interceptors.request.use(
    config => {
		if (!localStorage.getItem("login")) {
			// 判断是否存在token，如果存在的话，则每个http header都加上token
			// config.headers.Authorization = `token ${store.state.token}`;
			// 设置请求拦截,直接跳转路由到登录页面
			//api 为数组,里面存放可以未登录访问的接口,比如登陆注册接口等
			// 遍历数组
			var isApi = 0;
			api.map(items => {
				// 对数组的每一个内容进行判断,如果接口地址属于未登录可访问接口,直接结束拦截
				if (items === config.url) {
					isApi=1;
					return
				}
			});
			if(isApi){
				// console.log(isApi)
				return config;
			}
			// 若没有通过判断且不属于可未登录就访问的接口,将接口拦截.不再发送请求
			// console.log("================走不走===========");
			router.replace({
				path: "/",
				// path: "/login",
				// query: { redirect: router.currentRoute.fullPath }
			});
			// console.log("==============config==========");
			// console.log(config);
			return Promise.reject(err);
		}
		
		return config;
	},
	err => {
		return Promise.reject(err);
	}
);

// http response 响应拦截器
axios.interceptors.response.use(
	response => {
		// 这边是成功的返回,可以在这里做事情,每个接口成功返回参数都会到这里
		console.log(response);
		return response;
	},
	error => {
      // 通过不同返回的状态码去做不同的事情,一般500是参数错误,400是参数名错误
		if (error.response) {
			console.log(error.response);
			switch (error.response.status) {
				// case 401:
				//   // 返回 401 清除token信息并跳转到登录页面
				//   router.replace({
				//     path: "login",
				//     query: { redirect: router.currentRoute.fullPath }
				//   });
				case 500:alert("参数传递错误") // 不要这个提示的话就把他删了
			}
		}
		return Promise.reject(error.response.data); // 返回接口返回的错误信息
	}
);

new Vue({
	router,
	$,
    render: h => h(App),
	
}).$mount('#app')
