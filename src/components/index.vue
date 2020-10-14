<template>
	<div>
		<nav class="navbar navbar-default">
			<div class="container-fluid">
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
						<!-- <li><a href="#">SHARING</a></li> -->
						<li class="active"><router-link to="/">首页</router-link></li>
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
		
		<!-- 左边 -->
		<div class="card-left">
			<!-- 一个博客推荐例子 -->
			<!-- v-for="blog in blogs" -->
			<div v-for="blog in blogs">
				<div class="title" name="title">
					<a href="#" @click="gotoBDetail(blog.id)">
						<!-- <span v-text="blog.userId" v-show="false"></span> -->
						<b>{{blog.title}}</b>
					</a>
				</div>
				<div class="content" name="content">{{blog.content.replace(/<[^>]+>/g, "")}}</div>
				<div class="avatar" name="avatar">
					<div class="ava-left">
						<img :src="blog.avatar" />
						<router-link :to="`/myBlogCenter${blog.userId}`" >{{blog.username}}</router-link>
						<!-- <a href="#" class="ava-user">{{blog.username}}</a> -->
					</div>
					<div class="ava-right">
						<a><span class="glyphicon glyphicon-hand-right" aria-hidden="true"></span>{{blog.appreciate}}</a>
						 <span class="shu">|</span>
						<a><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>{{blog.visitedNumber}}</a>
						<span class="shu">|</span>
						<a><span class="glyphicon glyphicon-comment" aria-hidden="true"></span>{{blog.communicate}}</a>
					</div>
				</div>
			</div>
			
		</div>
		<!-- 右边 -->
		<div class="card-right">
			<div>
				<div class="blog-fam">
					<!-- <i class="layui-icon layui-icon-right"></i> -->
					<span class="glyphicon glyphicon-education gly-color" aria-hidden="true"></span>
					博客达人
				</div>
				<!-- 一个博客达人例子 -->
				<div class="blog-user" v-for="user in userList" @click="gotoBlogCenter(user.id)">
					<div class="blog-user-left">
						<img :src="user.avatar" />
					</div>
					<div class="blog-user-right">
						<div class="blog-user-right-name"><a href="">{{user.username}}</a></div>
						<div class="blog-user-right-detail">
							<span class="detail-title">博客</span>
							<span class="detail-num">{{user.blognum}}</span>
							<span class="detail-title">粉丝</span>
							<span class="detail-num">{{user.fans}}</span>
							<span class="detail-title">获赞</span>
							<span class="detail-num">{{user.appreciate}}</span>
							
						</div>
					</div>
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
				blogs:{},		//存储所有博客
				id:"",		//存储当前点击博客的id
				userList:{},	//最多博客数的10个人
				inputTitle:"",	//要查询的博客标题
				// inputResultNull:false,		//未查到
				unread:{},	//未读的关注消息列表
			}
		},
		mounted() {
			//判断是否要出现“我的，消息”链接
			if(localStorage.getItem("login")!=null){
				this.isLogin=true;
			}
			// console.log("localStorage.getItem(login)----"+localStorage.getItem("login"));
			// console.log("是否登录----"+this.isLogin);
			//获取所有博客
			this.getBlogs();
			//最多博客数的10个人
			this.tenUser();
			//查找未读的关注消息列表
			this.getUnread();
		},
		
		methods:{
			//查找未读的关注消息列表
			getUnread(){
				//判断用户是否登录
				if(!this.isLogin){//用户没登录就直接返回	不执行
					return;
				}
				else{
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
				}
				
			},
			//去博客中心
			gotoBlogCenter(uid){
				this.$router.push(`/myBlogCenter${uid}`);
			},
			//模糊查询博客
			likeTitle(){
				if(!this.inputTitle){
					return;
				}
				this.$router.push(`/selectBlog${this.inputTitle}`);
			},
			//最多博客数的10个人
			tenUser(){
				this.$ajax.post('/api/user/blognumUp')
				.then(response =>{
					this.userList = response.data;
				})
				.catch(error =>{
					console.log(error);
				})
			},
			// 跳转到博客详情页
			gotoBDetail(id){
				this.id = id;	//存储userid
				
				this.$router.push(`/blogDetail${this.id}`);
			},
			//退出登录
			loginOut(){
				localStorage.removeItem("login");
				this.$router.go(0);//重新刷新当前页面
			},
			//获取所有博客
			getBlogs(){
				// console.log("获取所有博客----------------");
				this.$ajax.post('/api/blog/getBlogs','blob')
				.then(response =>{
					// console.log(response.data);
					this.blogs = response.data;
				})
				.catch(error =>{
					console.log(error);
				})
			},
			
		}
	}
</script>

<style>
	.gly-color{
		color: #CD0000;
		margin-right: 5px;
	}
	/* 面板 */
	.card-left{
		/* position: absolute; */
		float: left;
		margin-left: 170px;
		margin-top: -10px;
		width: 52.5%;
		background-color: bisque;/* 测试 */
	}
	
	.card-left>div{
		min-height: 120px;
		background-color: white;
		/* margin-bottom: 10px; */
		padding: 18px 24px 13px 24px;
		border-bottom: 1px solid #f4f4f4;
	}
	/* 博客 */
	.card-left>div>div{
		height: 24px;
		overflow: hidden;
		text-overflow: ellipsis;/* 当对象内文本溢出时（超过width部分）显示省略标记（...） */
		word-break:keep-all;/* 强行换行,将截断英文单词 */
		white-space:nowrap;/* 文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。） */
		line-height: 24px;
		margin-bottom: 4px;
		
		
	}
	.title{
		font-size: 18px;
		color: #4F4F4F ;
		text-align: left;
		
	}
	.title>a:hover{
		text-decoration: none;
		color: #CD0000;/* 红色 */
	}
	.content{
		font-size: 14px;
		color: #8A8A8A;
		text-align: left;
	}
	/* 头像 */
	.ava-left{
		float: left;
		/* background-color: powderblue; */
		width: 100px;
		height: 24px;
		text-align: left;
		
	}
	.ava-left>img{
		margin-right: 6px;
	}
	.ava-left>img{
		height: 24px;
		width: 24px;
		border-radius: 50%;
	}
	.ava-user{
		color: #3d3d3d;
		font-size: 14px;
	}
	.ava-user:hover{
		color:#349EDF;
		text-decoration: none;
	}
	.ava-right{
		float: right;
		/* background-color: paleturquoise; */
		/* width: 100px; */
		height: 24px;
	}
	.ava-right>a{
		color: #349EDF;
		margin: 0 6px 0 6px;
	}
/* 	.ava-right>a:hover{
		text-decoration: none;
	} */
	/* .ava-right>a:hover i{
		color: #349EDF;
		
	} */
	/* 
	.ava-good{
		color: #8A8A8A;
		margin-right: 5px;
		display: inline-block;
	} */
	.ava-right>a>span{
		color: #8A8A8A;
		margin: 0 6px 0 6px;
		margin-left: -1px
	}
	.shu{
		color: darkgray;
	}
	/* 右边的博客达人布局 */
	.card-right{
		/* position: absolute; */
		float: right;
		margin-right: 170px;
		margin-top: -10px;
		width: 23%;
		background-color: antiquewhite;/* 测试 */
	}
	.card-right>div{
		background-color: white;
		
	}
	.blog-fam{
		font-size: 16px;
		margin-left: 5px;
		color: #2c3030;
		border-bottom: 0px;
		
		position: relative;
		height: 42px;
		line-height: 42px;
		padding: 0 15px;
		border-radius: 2px 2px 0 0;
		text-align: left;
	}
	.blog-fam>i{
		color: #CD0000;/* 红色 */
	}
	.blog-user{
		height: 75px;
		color: #333333;
		font-size: 16px;
		padding: 12px 20px;
		overflow: hidden;
		border-bottom: 1px solid #e9e9e9;
		/* background-color: cadetblue; */
	}
	.blog-user-left{
		float: left;
		width: 50px;
		height: 50px;
		margin-right: 8px;
		/* background-color: bisque; */
	}
	.blog-user-left>img{
		height: 50px;
		width: 50px;
		border-radius: 50%;
	}
	.blog-user-right{
		float: left;
		/* background-color: ghostwhite; */
		height: 50px;
		/* width: 234px; */
		padding-top: 4px;
	}
	.blog-user-right-name{
		height: 20px;
		color: #4d4d4d;
		font-size: 14px;font-weight: 600;
		line-height: 20px;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break:keep-all;/* (不换行） */
		white-space:nowrap;/* (不换行） */
	}
	.blog-user-right-name>a:hover{
		color: #CD0000;
		text-decoration: none;
		/* text-align: left; */
	}
	
	.blog-user-right-detail{
		margin-top: 4px;
		height: 17px;
		font-size: 12px;
		color: #6b6b6b;
	}
	.blog-user-right-detail>.detail-title{
		padding-right: 4px;
		
	}
	.blog-user-right-detail>.detail-num{
		margin-right: 12px;
	}
</style>
