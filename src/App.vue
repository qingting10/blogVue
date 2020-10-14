<template>
  <div id="app">
	<router-view :key="key" target="_blank"></router-view>
  </div>
</template>

<script>
import login from './components/login.vue'
import Register from './components/Register.vue'
import index from './components/index.vue'
import blogDetail from './components/blogDetail.vue'
import myBlogCenter from './components/myBlogCenter.vue'
import editor from './components/editor.vue'
import message from './components/message.vue'
import collect from './components/collect.vue'
import follow from './components/follow.vue'
import myfan from './components/myfan.vue'
import collectInfo from './components/collectInfo.vue'
import beAttack from './components/beAttack.vue'
import beAppre from './components/BeAppre.vue'
import selectBlog from './components/selectBlog.vue'

export default {
	name: 'app',
	components: {
		login,
		Register,
		index,
		blogDetail,
		myBlogCenter,
		editor,
		message,
		collect,
		follow,
		myfan,
		collectInfo,
		beAttack,
		beAppre,
		selectBlog,
	},
	computed:{
		// 在 router-view上加上一个唯一的key，来保证路由切换时都会重新渲染触发钩子
		key(){
			// 使用computed属性和Date()可以保证每一次的key都是不同的，可以刷新数据
			return this.$route.name?this.$route.name+ + new Date():this.$route+ +new Date()
		}
	},
	
  
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
