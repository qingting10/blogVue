/**
 * 路由对象模块
 */
import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '../components/HelloWorld.vue'
import login from '../components/login.vue'
import Register from '../components/Register.vue'
import index from '../components/index.vue'
import blogDetail from '../components/blogDetail.vue'
import myBlogCenter from '../components/myBlogCenter.vue'
import editor from '../components/editor.vue'
import message from '../components/message.vue'
import collect from '../components/collect.vue'
import follow from '../components/follow.vue'
import myfan from '../components/myfan.vue'
import collectInfo from '../components/collectInfo.vue'
import beAttack from '../components/beAttack.vue'
import beAppre from '../components/BeAppre.vue'
import beCom from '../components/beCom.vue'
import selectBlog from '../components/selectBlog.vue'
 
Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return routerPush.call(this, location).catch(error=> error)
}

// import markdown from '../../public/markdown.md' 
 
export default new Router({
  routes: [
    {
      path: '/login',		//登录页
      name: 'login',
      component: login
    },
	{
		path:'/Register',		//注册页
		name:'Register',
		component:Register,
	},
	{
		path:'/',		//博客首页
		name:'index',
		component:index,
		
	},
	{
		path:'/blogDetail:id',		//博客详情页	id为bid
		name:'blogDetail',
		component:blogDetail,
	},
	{
		path:'/myBlogCenter:userId',	//我的博客中心
		name:'myBlogCenter',
		component:myBlogCenter,
		
	},
	{
		path:'/editor:blogId',		//写博客
		name:'editor',
		component:editor,
		meta: {  // 需要判断是否登录的路由添加字段
			requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
		},
	},
	{
		path:'/message',	//我的资料
		component:message,
		meta: {  // 需要判断是否登录的路由添加字段
			requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
		},
	},
	{
		path:'/collect',	//我的收藏
		component:collect,
		meta: {  // 需要判断是否登录的路由添加字段
			requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
		},
	},
	{
		path:'/collectInfo:scId',	//收藏详情---博客分类详情
		component:collectInfo,
		meta: {  // 需要判断是否登录的路由添加字段
			requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
		},
	},
	{
		path:'/follow',		//我的关注
		component:follow,
		meta: {  // 需要判断是否登录的路由添加字段
			requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
		},
	},
	{
		path:'/myfan',	//我的粉丝
		component:myfan,
		meta: {  // 需要判断是否登录的路由添加字段
			requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
		},
	},
	{
		path:'/beAttack',	//关注消息
		component:beAttack,
		meta: {  // 需要判断是否登录的路由添加字段
			requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
		},
	},
	{
		path:'/beAppre',	//点赞消息
		component:beAppre,
		meta: {  // 需要判断是否登录的路由添加字段
			requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
		},
	},
	{
		path: '/beCom',		//评论消息
		component:beCom,
		meta: {  // 需要判断是否登录的路由添加字段
			requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
		},
	},
	{
		path:'/selectBlog:bloglike',	//模糊查询页
		component:selectBlog,
	},
	

  ],
  //干掉地址栏里边的#号键
  mode:"history"
})