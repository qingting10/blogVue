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
					我的收藏
				</div>
				<div class="my-title-bottom ">
					<ul class="collect-ul">
						<li v-for="item in collectList">
							<a href="#" @click="gotoCollectInfo(item.id)">
								<p class="li-name">{{item.classname}}</p>
								<!-- <p class="li-list-num">13条内容</p> -->
							</a>
							
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
				collectList:{},		//收藏列表
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
			//收藏列表
			this.getCollentList();
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
			//去博客详情页
			gotoCollectInfo(scId){
				this.$router.push(`/collectInfo${scId}`);
			},
			//收藏列表
			getCollentList(){
				let data={
					uid:localStorage.getItem("login"),
				}
				this.$ajax.post('/api/storeclass/getList', this.$qs.stringify(data))
				.then(response =>{
					this.collectList = response.data;
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
	.collect-ul{
		padding: 0;
		margin: 0;
		list-style: none;
	}
	.collect-ul>li{
		position: relative;
		padding: 16px 0;
		border-bottom: 1px solid #eaebec;
		line-height: 20px;
	}
	.li-name{
		width: 89%;
		margin-bottom: 12px;
		margin-top: 10px;
		/* padding-bottom: 4px; */
		font-size: 16px;
		color: #4d4d4d;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		font-weight: 700;
		/* margin-bottom: 10; */
	}
	/* p{
		margin-bottom: 0;
	} */
	/* .li-list-num{
		width: 85%;
		font-size: 14px;
	} */
</style>
