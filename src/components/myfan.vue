<template>
	<div>
		<nav class="navbar navbar-default">
			<div class="container-fluid">
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
						<!-- <li><a href="#">SHARING</a></li> -->
						<li><router-link to="/">首页</router-link></li>
					</ul>
					<!-- 查询 -->
					<form class="navbar-form navbar-left">
						<div class="form-group">
							<input type="text" v-model.trim="inputTitle" name="queryBlogTitle" class="form-control color" placeholder="">
						</div>
						<button type="button" @click="likeTitle" class="btn btn-default color">搜索</button>
						<!-- <span v-show="inputResultNull" style="color: red;margin-left: 10px;">未查到</span> -->
					</form>
					<ul class="nav navbar-nav navbar-right">
						<li><router-link to="/editor0">写博客</router-link></li>
						<li class="dropdown"  v-if="isLogin">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
								消息
								<span v-show="unread.allLength != 0" class="badge" style="background-color: #CD0000;">
									{{unread.allLength}}
								</span>
								<span class="caret"></span>
							</a>
							<ul class="dropdown-menu" style="text-align: left; padding-left: 20px;">
								<li>
									<a href="#" @click="gotoBlogCenter(unread.pubusers.id)">公告
										<span v-show="unread.pubLength != 0" class="badge" style="background-color: #CD0000;">{{unread.pubLength}}</span>
									</a>
								</li>
								<li>
									<router-link to="/beCom">评论
										<span v-show="unread.comLength != 0"  class="badge" style="background-color: #CD0000;">{{unread.comLength}}</span>
									</router-link>
								</li>
								<li>
									<router-link to="/beAppre">点赞
										<span v-show="unread.appreLength != 0" class="badge" style="background-color: #CD0000;">{{unread.appreLength}}</span>
									</router-link>
								</li>
								<li>
									<router-link to="/beAttack">关注
										<span v-show="unread.attenLength != 0" class="badge" style="background-color: #CD0000;">{{unread.attenLength}}</span>
										
									</router-link>
								</li>
							</ul>
						</li>
						<li class="dropdown" v-if="isLogin">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
								我的
								<span class="caret"></span>
							</a>
							<ul class="dropdown-menu">
								<li><router-link to="/message">个人资料</router-link></li>
								<li><router-link :to="`/myBlogCenter${loginUid}`">博客中心</router-link></li>
								<li><router-link to="/collect">我的收藏</router-link></li>
								<li><router-link to="/follow">我的关注</router-link></li>
								<li><router-link to="/myfan">我的粉丝</router-link></li>
								<li><a href="#" @click="loginOut">登出</a></li>
							</ul>
						</li>
						<li v-else="isLogin"><router-link to="/login">登录/注册</router-link></a></li>
					</ul>
				</div>
			</div>
		</nav>
		
		
		<!-- 右边 -->
		<div class="m-card-right ">
			<div>
				<div id="my-title">
					我的粉丝
				</div>
				<div class="my-title-bottom">
					<ul>
						<li class="item-follow" v-for="user in fanList" style="margin-top: 0;">
							<a href="#" @click="gotoBlogCenter(user.id)">
								<img :src="user.avatar" class="fol-ava"/>
							</a>
							<a href="#" @click="gotoBlogCenter(user.id)" class="fol-name">{{user.username}}</a>
							<a href="#" class="fol-btn" @click="attention(user.id)">关注</a>
						</li>
						
						
					</ul>
									
				</div>
			</div>
			
		</div>
		
	</div>
</template>

<script>
	export default{
		data(){
			return{
				isLogin:false,
				loginUid:localStorage.getItem("login"),
				fanList:{},	//粉丝集合
				unread:{},	//未读的关注消息列表
				// inputResultNull:false,		//未查到
				inputTitle:"",	//要查询的博客标题
			}
		},
		mounted() {
			//判断是否要出现“我的，消息”链接
			if(localStorage.getItem("login")!=null){
				this.isLogin=true;
			}
			//获取粉丝
			this.getFanList();
			//查找未读的关注消息列表
			this.getUnread();
		},
		methods:{
			//模糊查询博客
			likeTitle(){
				if(!this.inputTitle){
					return;
				}
				this.$router.push(`/selectBlog${this.inputTitle}`);
				
			},
			//查找未读的关注消息列表
			getUnread(){
				let data={
					receiveUserId:this.loginUid,
				}
				this.$ajax.post('/api/notice/messagelist', this.$qs.stringify(data))
				.then(response =>{
					this.unread = response.data;
				})
				.catch(error =>{
					console.log(error);
				})
			},
			//关注
			attention(uid){
				let data={
					userId:this.loginUid,
					byUserId:uid
				}
				this.$ajax.post('/api/attention/addAttention', this.$qs.stringify(data))
				.then(response =>{
					alert(response.data);
				})
				.catch(error =>{
					console.log(error);
				})
			},
			//去博客中心
			gotoBlogCenter(uid){
				this.$router.push(`/myBlogCenter${uid}`);
			},
			//获取粉丝
			getFanList(){
				let data={
					byUserId:this.loginUid,
				}
				this.$ajax.post('/api/attention/fansList', this.$qs.stringify(data))
				.then(response =>{
					this.fanList = response.data;
				})
				.catch(error =>{
					console.log(error);
				})
			},
			//退出登录
			loginOut(){
				localStorage.removeItem("login");
				console.log("localStorage=login----"+localStorage.getItem("login"));
				// this.$router.push("/");		这个会跳转当前页面，但是不会刷新
				this.$router.go(0);//重新刷新当前页面
			}
		}
	}
</script>

<style>
</style>
