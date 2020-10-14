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
				<div id="my-title" @click="goback">
					<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
					<a href="#">返回</a>
				</div>
				<div class="my-title-bottom ">
					<ul class="collectInfo-ul">
						<li v-for="blog in blogList">
							<div class="infoDiv">
								<p>
									<a class="info-title" @click="gotoBlogDetail(blog.id)">{{blog.title}}</a>
									<a href="#" class="info-cancel" @click="deleteStore(blog.id)">取消收藏</a>
								</p>
								<p class="collect-time">{{blog.updateTime.time | formatDate}}</p>
							</div>
							
						</li>
						
					</ul>
				
				</div>
			</div>
			
		</div>
		
	</div>
</template>

<script>
	import moment from 'moment'		//处理时间戳
	export default{
		data(){
			return{
				isLogin:false,
				loginUid:localStorage.getItem("login"),
				scId:"",	//收藏分类名id
				blogList:{},		//博客列表
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
			//获取url里的scid
			this.scId = this.$router.history.current.params.scId;
			//获取博客列表
			this.getBlogList();
			//查找未读的关注消息列表
			this.getUnread();
		},
		filters: {
			formatDate: function (value) {
				// console.log(value.time);
				// return moment(moment(value).format('YYYY MM DD HH:mm:ss')).valueOf();
				return moment(value).format('YYYY-MM-DD HH:mm:ss');
			},
			formatDateyy: function (value) {
				// console.log(value.time);
				// return moment(moment(value).format('YYYY MM DD HH:mm:ss')).valueOf();
				return moment(value).format('YYYY-MM-DD');
			}
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
			//取消收藏
			deleteStore(bid){
				let data={
					blogId:bid,
					userId:localStorage.getItem("login"),
					scId:this.scId,
				}
				console.log(data);
				this.$ajax.post('/api/store/deleteStore', this.$qs.stringify(data))
				.then(response =>{
					alert("已取消");
					this.$router.go(0);	//刷新页面
				})
				.catch(error =>{
					console.log(error);
				})
			},
			//去博客详情页
			gotoBlogDetail(bid){
				this.$router.push(`/blogDetail${bid}`);
			},
			//返回上一页
			goback(){
				this.$router.go(-1);
			},
			//收藏列表
			getBlogList(){
				let data={
					scId:this.scId,
					userId:localStorage.getItem("login"),
				}
				console.log(data);
				this.$ajax.post('/api/store/blogList', this.$qs.stringify(data))
				.then(response =>{
					this.blogList = response.data;
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
	.collectInfo-ul{
		padding: 0;
		    margin: 0;
		    list-style: none;
		    /* margin-top: 15px; */
		    padding-top: 8px;
		    margin-bottom: 20px;
		    border-top: 1px solid #eaebec;
	}
	.collectInfo-ul>li{
		border: none;
		    padding: 0;
		    position: relative;
		    margin-top: 0;
	}
	.infoDiv{
		position: relative;
		    margin: 8px 0 0;
		    padding: 16px 24px;
		    background-color: #fafafa;
		    -webkit-box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
		    box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
		    display: inline-block;
		    width: 100%;
			
		    /* min-height: 104px; */
	}
	.info-title{
		    /* color: #4d4d4d; */
			    width: 89%;
			    margin-bottom: 8px;
			    padding-bottom: 4px;
			    font-size: 16px;
			    color: #4d4d4d;
			    white-space: nowrap;
			    text-overflow: ellipsis;
			    overflow: hidden;
			    font-weight: 700;
	}
	.info-cancel{
		position: absolute;
		    right: 24px;
		    top: 16px;
		    font-size: 14px;
		    color: #6b6b6b;
	}
	.collect-time{
		width: 85%;
		    font-size: 14px;
			    color: #999;
	}
</style>
