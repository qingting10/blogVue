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
		
		<!-- 左边 -->
		<div class="D-card-left">
			<!-- 博主详情 -->
			<div class="card-left-user">
				<!-- 头像 -->
				<div class="card-left-user-ava">
					<div class="card-left-user-ava-"><img :src="user.avatar"/></div>
					<div class="card-left-user-ava-detail">
						<div name="username" class="username"><b><a href="#"  @click="gotoBlogCenter(user.id)">{{user.username}}</a></b></div>
						<a href="#" @click="gotoBlogCenter(user.id)"><div class="gohouse">TA的博客中心<i class="layui-icon layui-icon-right"></i></div></a>
					</div>
				</div>
				<!-- 原创粉丝。。。 -->
				<div class="five-parts">
					<div class="part">
						<div>博客</div>
						<dt>{{user.blognum}}</dt>
						
					</div>
					<div class="part">
						<div>粉丝</div>
						<dt>{{user.fans}}</dt>
					</div>
					<div class="part">
						<div>获赞</div>
						<dt>{{user.appreciate}}</dt>
					</div>
					<div class="part">
						<div>评论</div>
						<dt>{{user.communicate}}</dt>
					</div class="part">
					<div class="part">
						<div>访问</div>
						<dt>{{user.visitedNumber}}</dt>
					</div>
				</div>
				<!-- 等级 -->
				<div class="sort-parts">
					<div>等级：<span><b>{{usersmark.floor}}</b></span></div>
					<div>博客排名：<span><b>{{usersmark.blogFloor}}</b></span></div>
					
				</div>
				<div class="sort-parts">
					<div>粉丝排名：<span><b>{{usersmark.fanFloor}}</b></span></div>
					<div>点赞排名：<span><b>{{usersmark.wellFloor}}</b></span></div>
					
				</div>
				<div class="sort-parts part-last">
					<div>评论排名：<span><b>{{usersmark.replyFloor}}</b></span></div>
					<div>访问排名：<span><b>{{usersmark.visitFloor}}</b></span></div>
					
				</div>
				<div class="other-more" v-show="user.id != loginUid">
					<button @click="attention" class="other-more-see">关注</button>
					<button class="other-more-msg"  @click="gotoBlogCenter(user.id)">博客</button>
				</div>
			</div>
			<!-- 最新博客 -->
			<div class="blog-last" v-show="newSixBloglist">
				<div class="blog-fam ">
					<span class="glyphicon glyphicon-tags" aria-hidden="true" style="color: #B22222; margin-right: 12px;"></span>
					
					<b>最新</b>
				</div>
				<div class="zon-title">
					<div v-for="blog in newSixBloglist">
						<a href="#" @click="gotoBlogDetail(blog.id)">{{blog.title}}</a>
					</div>
				</div>
			</div>
			<!-- 博客分类 -->
			<div class="blog-sort">
				<div class="blog-fam">
					<span class="glyphicon glyphicon-tags" aria-hidden="true" style="color: #B22222; margin-right: 12px;"></span>
					
					<b>分类</b>
				</div>
				<div class="blog-sort-each">
					<p v-for="(item, index) in classifyList" :key="index">
						<a href="#" @click="findCnameList(item.classify.id, currentUid)">
							<img class="sort-each-img" :src="`img/sortBlog/${(index+1)%10}.jpg`"/>
							<span class="sort-each-name">{{item.classify.classname}}</span>
							<span class="sort-each-num">{{item.num}}篇</span>
						</a>
					</p>
				</div>
			</div>
			
			<!-- 热门文章 -->
			<div>
				<div class="blog-fam ">
					<span class="glyphicon glyphicon-tags" aria-hidden="true" style="color: #B22222; margin-right: 12px;"></span>
					<b>热门</b>
				</div>
				<div class="blog-sort-hot">
					<div v-for="blog in sixHotBlog">
						<p class="hot-title"><a href="#" @click="gotoBlogDetail(blog.id)">{{blog.title}}</a></p>
						<p class="hot-num">阅读数 {{blog.visitedNumber}}</p>
					</div>
				</div>
			</div>
		</div>
		
		<!-- 右边 -->
		<div class="D-card-right">
			<div>
				<!-- <div class="layui-card-header blog-fam how-sort" v-if="showCname">
					
				</div> -->
				<div class="layui-card-header blog-fam how-sort" >排序：
					<span><a href="#" @click="getBlogList">默认</a></span>
					<span><a href="#" @click="timeLast">按创建时间</a></span>
					<span><a href="#" @click="byVisitnum">按访问量</a></span>
				</div>
				<!-- 全部博客显示 -->
				<div class="blog-detail" v-for="blog in blogList">
					<p class="oneline">
						<span class="glyphicon glyphicon-hand-right" aria-hidden="true" style="color: #B22222; margin-right: 8px;"></span>
						<a href="#" @click="gotoBlogDetail(blog.id)">{{blog.title}}</a>
					</p>
					<div class="blog-detail-content">
						{{blog.content.replace(/<[^>]+>/g, "")}}
					</div>
					<div style="height: 22px;">
						<div class="blog-detail-message">
							<span>{{blog.updateTime | formatDate}} </span> | &nbsp;
							阅读数<span class="num">{{blog.visitedNumber}}</span> | &nbsp;
							评论数<span class="num">{{blog.communicate}}</span>
							
						</div>
						<div class="blog-detail-operate" v-show="loginUid == currentUid">
							<a href="#" @click="gotoEditor(blog.id)" class="update" >编辑</a> | 
							<a href="#" @click="deleteBlog(blog.id)" class="delete">删除</a>
						</div>
					</div>
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
				currentUid:"",	//某个被查看用户的id
				user:"",	//当前被查看用户
				blogList:"",	//博客列表
				newSixBloglist:{},	//最新的6个博客
				classifyList:{},	//博客分类列表
				sixHotBlog:{},		//阅读数最多的6个博客
				usersmark:{},		//排名	等级
				message:{},			//公告，评论，点赞，关注
				unread:{},	//未读的关注消息列表
				// inputResultNull:false,		//未查到
				inputTitle:"",	//要查询的博客标题
				// showCname:"",
			}
		},
		mounted() {
			// this.showCname = localStorage.getItem("cname");
			//判断是否要出现“我的，消息”链接
			if(localStorage.getItem("login")!=null){
				this.isLogin=true;
			}
			//获取某个被查看用户的id
			this.currentUid = this.$router.history.current.params.userId;
			// console.log(this.currentUid);
			//获取当前的用户信息
			this.getUser();
			//最新的6个博客
			this.getSixBlogs();
			//6个最火（点击量多）blog
			this.getHotBlogs()
			//博客分类列表
			this.getClassifylist();
			//排名总运算
			this.getFloor();
			//博客列表
			if(!this.blogList){
				this.getBlogList();
				
			}
			//查找未读的关注消息列表
			this.getUnread();
			
		},
		filters: {
			formatDate: function (value) {
				// console.log(value.time);
				// return moment(moment(value).format('YYYY MM DD HH:mm:ss')).valueOf();
				return moment(value.time).format('YYYY-MM-DD HH:mm:ss');
			}
		},
		
		methods:{
			//查找博客分类表
			findCnameList(cid, curUid){
				let data={
					cid:cid,
					userId:curUid
				}
				this.$ajax.post("/api/blog/cnameBlogList", this.$qs.stringify(data))
				.then(response =>{
					this.blogList = response.data;
					//设置顶头的分类名显示
					// localStorage.setItem("cname", false);
				})
				.catch(error =>{
					console.log(error);
				})
			},
			//模糊查询博客
			likeTitle(){
				if(!this.inputTitle){
					return;
				}
				this.$router.push(`/selectBlog${this.inputTitle}`);
				
			},
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
			//排名总运算
			getFloor(){
				let data ={
					uid:this.currentUid,
				}
				this.$ajax.post('/api/user/computeFloor', this.$qs.stringify(data))
				.then(response =>{
					console.log(response.data);
					this.usersmark = response.data;
				})
				.catch(error =>{
					console.log(error);
				})
			},
			//6个最火（点击量多）blog
			getHotBlogs(){
				let data={
					userId :this.currentUid,
				}
				this.$ajax.post('/api/blog/sixHotBlogs', this.$qs.stringify(data))
				.then(response =>{
					this.sixHotBlog = response.data;
					
				})
				.catch(error =>{
					console.log(error);
				})
			},
			//博客分类
			getClassifylist(){
				let data={
					userId:this.currentUid,
				}
				this.$ajax.post('/api/classify/classnameList', this.$qs.stringify(data))
				.then(response =>{
					this.classifyList = response.data;
				})
				.catch(error =>{
					console.log(error);
				})
			},
			//最新的6个博客
			getSixBlogs(){
				let data ={
					userId:this.currentUid,
				}
				this.$ajax.post('/api/blog/sixNewList', this.$qs.stringify(data))
				.then(response =>{
					this.newSixBloglist = response.data;
				})
				.catch(error =>{
					console.log(error);
				})
			},
			//按访问量排序
			byVisitnum(){
				let data={
					userId:this.currentUid,
				}
				this.$ajax.post('/api/blog/orderByVisit', this.$qs.stringify(data))
				.then(response =>{
					this.blogList = response.data;
				})
				.catch(error =>{
					console.log(error);
				})
			},
			//按创建时间排序博客
			timeLast(){
				let data={
					userId:this.currentUid,
				}
				this.$ajax.post('/api/blog/timeLastBloglist', this.$qs.stringify(data))
				.then(response =>{
					this.blogList = response.data;
					// this.$router.go(0);
				})
				.catch(error =>{
					console.log(error);
				})
			},
			//删除博客
			deleteBlog(bid){
				let data={
					bid:bid,
					uid:this.loginUid,
				}
				this.$ajax.post('/api/blog/deleteVueBlog', this.$qs.stringify(data))
				.then(response =>{
					alert("删除成功");
					this.$router.go(0);
				})
				.catch(error =>{
					console.log(error);
				})
			},
			//编辑博客
			gotoEditor(bid){
				this.$router.push(`/editor${bid}`);
			},
			//查看博客
			gotoBlogDetail(bid){
				this.$router.push(`/blogDetail${bid}`);
			},
			//去博客中心
			gotoBlogCenter(uid){
				// alert(uid);
				this.$router.push(`/myBlogCenter${uid}`);
			},
			//添加“关注”消息记录
			setAttentionRecord(){
				let data={
					sendUserId:localStorage.getItem("login"),
					receiveUserId:this.user.id,
					type:"关注",
				}
				this.$ajax.post('/api/notice/attentionRecord', this.$qs.stringify(data))
				.then(response =>{
					console.log("关注记录");
				})
				.catch(error =>{
					console.log(error);
				})
			},
			//关注
			attention(){
				//判断登录
				if(!this.isLogin){
					this.$router.push("login");
				}
				else{
					let data={
						userId:localStorage.getItem("login"),
						byUserId:this.user.id,
					}
					this.$ajax.post('/api/attention/addAttention', this.$qs.stringify(data))
					.then(response =>{
						// 要判断有没有关注，关注的话，往通知表里加 “关注” 记录
						if(response.data=="成功关注"){
							//添加"关注"消息记录
							this.setAttentionRecord();
							// alert(response.data);
						}
						alert(response.data);
					})
					.catch(error =>{
						console.log(error);
					})
				}
				
			},
			//获取当前（被查看）用户的用户信息
			getUser(){
				let data={
					id:this.currentUid,
				}
				this.$ajax.post('/api/user/getUserById', this.$qs.stringify(data))
				.then(response =>{
					this.user=response.data;
					// console.log(response.data);
				})
				.catch(error =>{
					console.log(error);
				})
			},
			//博客列表
			getBlogList(){
				let data={
					userId:this.currentUid,
				}
				this.$ajax.post('/api/blog/getBlogList', this.$qs.stringify(data))
				.then(response =>{
					this.blogList = response.data;
					localStorage.setItem("cname", true);
					// this.$router.go(0);
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
			},
			goEditor(){
				console.log("写博客");
				this.$router.push("/editor");
			},
			// test(){		//测试
			// 	console.log("查路由--------"+this.route);
			// 	this.$router.go(-1);
			// },
		}
	}
</script>

<style>
	
	/* 右边-博客 */
	/* .D-card-right{
		float: right;
		margin-right: 140px;
		margin-top: -10px;
		width: 59.5%;
	}
	.D-card-right>div{
		background-color: white;
		
	}	 */
	.how-sort{
		color: #999999;
		border-bottom:solid 1px  #E8E8E8;
		/* margin-left: 4px; */
	}
	.how-sort>span{
		margin-left: 20px;
		color: #999999;
	}
	.how-sort>span>a{
		color: #999999;
	}
	.how-sort>span>a:hover{
		color: #CD0000;
	}
	.blog-detail{
		padding: 12px 20px;
		color: #333333;
		text-align: center;
		/* height: 144px; */
		/* padding-bottom: ; */
		border-bottom:solid 0.1px  #E8E8E8;
	}
	.blog-detail>p{
		font-size: 18px;
		text-align: left;
		color: #3D3D3D;
		font-weight: 600;
		margin-bottom: 6px;
	}
	/* 纸飞机 */
	.blog-detail>p>i{
		margin-right: 5px;
		color: #CD0000;/* 红色 */
	}
	/* 博客内容只显示两行 */
	.blog-detail-content{
		color: #6B6B6B;
		font-size: 14px;
		letter-spacing: 0.5px;/* 字与字之间的距离 */
		line-height: 22px;
		text-align: left;
		
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		
		
	}
	.blog-detail-message{
		float: left;
		color: #999999;
		line-height: 22px;
	}
	.blog-detail-message>span{
		margin-right: 5px;
	}
	.blog-detail-message>.num{
		color: #3399EA;
		margin-left: 4px;
	}
	/* 编辑删除 */
	.blog-detail-operate{
		float: right;
		color: #999999;
		line-height: 22px;
	}
	.update{
		margin-right: 5px ;
		color: #3399EA;
	}
	.delete{
		margin-left: 5px;
		color: #CD0000;/* 红色 */
	}
	.oneline{
		overflow: hidden;
		text-overflow: ellipsis;/* 当对象内文本溢出时（超过width部分）显示省略标记（...） */
		word-break:keep-all;/* 强行换行,将截断英文单词 */
		white-space:nowrap;/* 文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。） */
		
	}
	/* 提示消息 */
	/* .redCir{
		background-color: #CD0000;
		color: white;
	} */
</style>
