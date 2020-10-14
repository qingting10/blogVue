<template>
	<div>
		<nav class="navbar navbar-default">
			<div class="container-fluid">
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
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
							<a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
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
								<li><router-link :to="`/myBlogCenter${userId}`">博客中心</router-link></li>
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
						<div name="username" class="username">
							<b><a href=""  @click="gotoBlogCenter(user.id)">{{user.username}}</a></b>
						</div>
						<a href="" @click="gotoBlogCenter(user.id)"><div class="gohouse">TA的博客中心<i class="layui-icon layui-icon-right"></i></div></a>
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
				<div class="other-more" v-show="user.id != userId">
					<button @click="attention" class="other-more-see">关注</button>
					<button class="other-more-msg" @click="gotoBlogCenter(user.id)">博客</button>
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
						<a href="#" @click="gotoBlogCenter(user.id)">
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
		<div class="D-card-right ">
			<div>
				<div class="blog-title">
					{{blog.title}}
				</div>
				<div class="blog-title-user">
					<router-link :to="`/myBlogCenter${blog.userId}`" style="margin-right: 20px;">{{blog.username}}</router-link>
					<span>最后发布于{{blog.updateTime | formatDate}}</span>
					<span>阅读数 {{blog.visitedNumber}}</span>
					<router-link :to="`/editor${this.blogId}`" class="blog-modify" v-show="modifyFlag">编辑</router-link>
				</div>
			</div>
			<!-- 博客的具体内容 -->
			<article v-html="blog.content">
			</article>
			<!-- 点赞	收藏		举报 -->
			<div class="blogD-bottom">
				<span  @click="addAppreciate"><a href="#"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>点赞</a></span>
				<span @click="showStoreclass"><a href="#"><span class="glyphicon glyphicon-heart-empty" aria-hidden="true"></span>收藏</a></span>
				<span @click="forbid"><a href="#"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>举报</a></span>
			</div>
			<!-- 评论 -->
			<div class="com-bottom">
				<div class="com-input">
					<div class="com-user">
						<a><img :src="loginUser.avatar"/></a>
					</div>
					<form>
						<textarea class="com-textarea" v-model.trim="content" @focus="inputCheck"></textarea>
						<div style="height: 40px;">
							<input @click="addReply" type="button" value="发布评论" class=" com-btn btn btn-primary" />
						</div>
						
					</form>
				</div>
				<!-- 评论显示 -->
				<div style="display: block;">
					<div class="com-list">
						<ul  v-for="reply in firstFloor">
							<!-- 一楼回复 -->
							<li class="list-0">
								<a><img :src="reply.onelist.avatar"/></a>
								<div class="com-right">
									<a href="#" @click="gotoBlogCenter(reply.onelist.userId)">{{reply.onelist.username}}</a>
									<span class="com-right-time">{{reply.onelist.replyTime | formatDate}}</span>
									
									<span class="com-cao">
										<a href="#" v-if="reply.onelist.userId == userId" @click="deleteReply(reply.onelist.id, reply.twolist.length)">删除</a>
										<a href="#" @click="forbidReply(reply.onelist.id)">举报</a>
										<a href="#" @click="showReplyModel(reply.onelist.id)">回复</a>
										<a href="#" v-if="reply.twolist.length !=0"  @click="showsecond(reply.onelist.id)" >查看回复</a>
									</span>
									<p><span v-html="reply.onelist.content"></span></p>
								</div>
							</li>
							<li class="com-reply" :id="reply.onelist.id">
								<ul style="margin-top: 16px;margin-left: -40px;">
									<li class="list-0" v-for="(item, index) in reply.twolist" :key="index">
										<a><img :src="item.avatar"/></a>
										<div class="com-right">
											<a @click="gotoBlogCenter(item.userId)" >{{item.username}}</a>
											<span class="com-right-time">回复</span>
											<span>{{reply.onelist.username}}</span>
											<span class="com-right-time">{{item.replyTime | formatDate}}</span>
											<span v-html="item.content"></span>
											<span class="com-cao">
												<a href="#" v-if="item.userId == userId" @click="deleteReply(item.id,0)">删除</a>
												<a href='#'  @click="forbidReply(item.id)">举报</a>
												<!-- <a href="#" @click="showReplyModel(item.id)">回复</a> -->
											</span>
										</div>
									</li>
								</ul>
							</li>
							
						</ul>
					</div>
				</div>
			
				
			</div>
			
			
		</div>
		
		<!-- 评论	模态框（Modal） -->
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		                <h4 class="modal-title" id="myModalLabel">发布评论</h4>
		            </div>
		            <div class="modal-body">
						
						<textarea class="com-textarea" v-model.trim="contentSecond"></textarea>
						
					</div>
		            <div class="modal-footer">
		                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
		                <button type="button" class="btn btn-primary" @click="addReplyInfo">发布评论</button>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal -->
		</div>
		
		<!--收藏	 模态框（Modal） -->
		<div class="modal fade" id="myStore" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		                <h4 class="modal-title" id="myModalLabel">分类收藏</h4>
		            </div>
		            <div class="modal-body">
		            	<div class="form-group form-mygroup">
		            	    <label class="col-sm-2 control-label modal-blogclassname">分类收藏</label>
		            	    <div class="col-sm-10">
		            	      <input v-model="storeclass" type="text" class="form-control " id="storeclass" placeholder="创建新分类">
		            		  <button type="button" class="btn btn-primary btn-confirm" @click="addStoreclass">确定</button>
		            	    </div>
		            	</div>
		            	
		            	<div class="form-group form-mygroup">
		            		<label class="col-sm-2 control-label modal-blogclassname">选择已有</label>
		            		<select class="dropmenu form-control"  id="selectStoreclass"  @change="getStorename($event)">
		            			<option>请选择</option>
		            			<option v-for="item in storeList" >
									{{item.classname}}
		            			</option>
		            		</select>
		            	</div>
		            	
		            </div>
		            <div class="modal-footer">
		                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
		                <button type="button" class="btn btn-primary" @click="sellStore">确定</button>
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
				isLogin:false,	//判断是否登录
				modifyFlag:"",	//判断是否出现 “编辑”
				blogId:"",		//博客id
				user:"",		//存储博客用户
				blog:"",		//存储博客
				userId:localStorage.getItem("login"),		//系统当前用户
				message:"",		//存储弹出的点赞消息
				loginUser:{},	//登录用户
				firstFloor:{},	//一楼评论列表
				content:"",
				contentSecond:"",	//输入的评论内容
				replyId:"",		//点击“回复”，传过来的评论id
				storeclass:"",	//输入框的分类
				//inputResult:"",		//新建分类的返回结果
				storeList:{},	//总的收藏分类对象列表
				storename:"",	//当前点击收藏分类
				scId:"",		//收藏分类表id
				usersmark:{},		//排名	等级
				unread:{},	//未读的关注消息列表
				// inputResultNull:false,		//未查到
				inputTitle:"",	//要查询的博客标题
				
				newSixBloglist:{},	//最新的6个博客
				classifyList:{},	//博客分类列表
				sixHotBlog:{},		//阅读数最多的6个博客
				
			}
		},
		mounted() {
			//判断是否要出现“我的，消息”链接
			if(localStorage.getItem("login")!=null){
				this.isLogin=true;
			}
			
			//获取index首页传过来的博客id
			this.blogId = this.$router.history.current.params.id;
			// console.log("blogid---------"+this.blogId);
			//获取这个博客所属的用户
			this.getUserBybid();
			//访问量+1
			this.addVisit();
			//获取登录用户
			this.getLoginUser();
			//获取一楼评论列表
			this.getFirstFloor();
			//查找未读的关注消息列表
			this.getUnread();
			
		},
		filters: {
			formatDate: function (value) {
				// console.log("====================");
				// console.log(moment(value).valueOf());
				return moment(value.time).format('YYYY-MM-DD HH:mm:ss');
			},
			// formatDateyy: function (value) {
			// 	// console.log("====================");
			// 	// console.log(moment(value).valueOf());
			// 	return moment(value.time).format('YYYY-MM-DD');
			// }
		},
		
		methods:{
			//6个最火（点击量多）blog
			getHotBlogs(){
				let data={
					userId :this.user.id,
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
					userId:this.user.id,
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
					userId:this.user.id,
				}
				this.$ajax.post('/api/blog/sixNewList', this.$qs.stringify(data))
				.then(response =>{
					this.newSixBloglist = response.data;
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
				if(!this.isLogin){	//没有登录就不运行“获取未读消息”这个方法
					return;
				}
				else{
					let data={
						receiveUserId:this.userId,
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
					uid:this.user.id,
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
			//评论举报
			forbidReply(rid){
				//判断登录没，没登陆不给举报
				if(!this.isLogin){
					this.$router.push("/login");
				}
				else{
					let data={
						rid:rid,
					}
					this.$ajax.post('/api/reply/forbidReply', this.$qs.stringify(data))
					.then(response =>{
						alert("举报成功");
					})
					.catch(error =>{
						console.log(error);
					})
				}
				
			},
			//评论时，先判断是否登录
			inputCheck(){
				//没登陆转到登录页
				if(!this.isLogin){
					this.$router.push("/login");
				}
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
			//举报
			forbid(){
				//用户没登陆，直接跳转到 登录页
				if(!this.isLogin){
					this.$router.push("/login");
				}
				else{
					let data={
						id:this.blog.id,
					}
					this.$ajax.post('/api/blog/forbidBlog', this.$qs.stringify(data))
					.then(response =>{
						alert("举报成功");
					})
					.catch(error =>{
						console.log(error);
					})
				}
				
			},
			//新增收藏记录
			sellStore(){
				if(!this.storename){
					alert("请选择分类");
					return;
				}
				if(this.storename == "请选择"){
					alert("请选择分类");
					return;
				}
				let data={
					scId:this.scId,
					userId:this.userId,
					blogId:this.blog.id,
				}
				this.$ajax.post('/api/store/addStore', this.$qs.stringify(data))
				.then(response =>{
					alert(response.data);
					$('#myStore').modal('hide');
				})
				.catch(error =>{
					console.log(error);
				})
			},
			//获取当前点击的收藏分类名
			getStorename(event){
				this.getStoreList();
				this.storename = event.target.value;
				if(this.storename=="请选择"){
					alert("请选择分类");
					return;
				}
				console.log("点击的分类名"+this.storename);
				//获取分类民classname
				let data={
					uid:this.userId,
					classname:this.storename,
				}
				console.log(data);
				this.$ajax.post('/api/storeclass/getScId', this.$qs.stringify(data))
				.then(response =>{
					this.scId = response.data;
				})
				.catch(error =>{
					console.log(error);
				})
			},
			//获取所有收藏分类
			getStoreList(){
				let data={
					uid:this.userId,
				}
				this.$ajax.post('/api/storeclass/getList', this.$qs.stringify(data))
				.then(response =>{
					this.storeList = response.data;
				})
				.catch(error =>{
					console.log(error);
				})
			},
			
			//新增收藏分类
			addStoreclass(){
				//处理用户输入的新建分类为空
				if(!this.storeclass){
					return;
				}
				let data={
					uid:this.userId,
					classname:this.storeclass,
				}
				this.$ajax.post('/api/storeclass/addStoreclass', this.$qs.stringify(data))
				.then(response =>{
					alert(response.data);
					this.storeclass="";
				})
				.catch(error =>{
					console.log(error);
				})
			},
			
			//展示收藏分类
			showStoreclass(){
				//没登陆的处理
				if(!this.isLogin){
					this.$router.push("/login");
				}
				else{
					$('#myStore').modal('show');
					this.getStoreList();
				}
				
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
				//判断登录，没登录就去登录
				if(!this.isLogin){
					this.$router.push("/login");
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
						// this.$router.go(0);
					})
					.catch(error =>{
						console.log(error);
					})
				}
				
			},
			
			//删除评论
			deleteReply(rid, length){
				
				let data={
					id:rid,
					size:length,
				}
				console.log(data);
				this.$ajax.post('/api/reply/deleteReplyAndChild', this.$qs.stringify(data))
				.then(response =>{
					alert("删除成功");
					this.$router.go(0);
				})
				.catch(error =>{
					console.log(error);
				})
			},
			//是否显示查看回复
			showReply: function(twolist){
				if(twolist.size()==0){
					return false;
				}
				else{
					return true;
				}
			},
			
			//查看回复
			showsecond(id){
				if($(`#${id}`).css("display")==="none"){
					$(`#${id}`).css("display", "block");
					// $(`.${id}`).text("收起回复");
				}
				else{
					$(`#${id}`).css("display", "none");
					// $(`.${id}`).text("查看回复");
				}
				
			},
			//点击 “回复” 显示模态框
			showReplyModel(id){
				//判断登录，没登陆直接打道回府
				if(!this.isLogin){
					this.$router.push("/login");
				}
				else{
					$('#myModal').modal('show');	//模态框显示
					this.replyId = id;
				}
				
				// console.log("---------------");
				// console.log(this.replyId);
				// this.addReplyInfo(id);
			},
			
			//二次评论
			addReplyInfo(){
				if(!this.contentSecond){
					alert("评论内容不能为空");
					return;
				}
				let data={
					parentId:this.replyId,
					userId:this.userId,
					blogId:this.blogId,
					content:this.contentSecond,
				}
				this.$ajax.post('/api/reply/addReply', this.$qs.stringify(data))
				.then(response =>{
					// alert("评论成功");
					this.contentSecond="";
					$('#myModal').modal('hide');		//模态框隐藏
					//添加评论消息记录
					this.addComRecord()
					this.$router.go(0);
				})
				.catch(error =>{
					console.log(error);
				})
			},
			//获取一楼评论列表
			getFirstFloor(){
				let data={
					blogId:this.blogId,
				}
				this.$ajax.post("/api/reply/getFirstFloor", this.$qs.stringify(data))
				.then(response =>{
					this.firstFloor = response.data;
					
				})
				.catch(error =>{
					console.log(error);
				})
			},
			//添加评论消息记录
			addComRecord(){
				let data={
					sendUserId:this.userId,
					receiveUserId:this.blog.userId,
					type:"评论",
					targetId:this.blog.id,
				}
				this.$ajax.post('/api/notice/attentionRecord', this.$qs.stringify(data))
				.then(response =>{
					
				})
				.catch(error =>{
					console.log(error);
				})
			},
			//添加一级评论
			addReply(){
				//检查评论内容不容为空
				if(!this.content){
					alert("评论内容不能为空");
					return;
				}
				let data={
					userId:this.userId,
					blogId:this.blogId,
					content:this.content,
				}
				this.$ajax.post('/api/reply/addReply', this.$qs.stringify(data))
				.then(response =>{
					// alert("评论成功");
					//添加评论消息记录
					this.addComRecord()
					// this.content = " ";
					this.$router.go(0);
				})
				.catch(error =>{
					console.log(error);
				})
			},
			//获取登录用户
			getLoginUser(){
				if(!this.isLogin){
					return;
				}
				else{
					let data={
						id:this.userId,
					}
					this.$ajax.post('/api/user/getUserById',this.$qs.stringify(data))
					.then(response =>{
						this.loginUser = response.data;
					})
					.catch(error =>{
						console.log(error);
					})
				}
				
			},
			//退出登录
			loginOut(){
				localStorage.removeItem("login");
				// this.$router.push("/");		这个会跳转当前页面，但是不会刷新
				this.$router.go(0);//重新刷新当前页面
			},
			//添加点赞消息记录
			addAppreRecord(){
				let data={
					sendUserId:this.userId,		//登录用户
					receiveUserId:this.blog.userId,		//博客所属用户
					type:"点赞",
					targetId:this.blog.id,	//被点赞博客id
				}
				this.$ajax.post('/api/notice/attentionRecord', this.$qs.stringify(data))
				.then(response =>{
					// console.log()
				})
				.catch(error =>{
					console.log(error);
				})
			},
			//点赞
			addAppreciate(){
				//判断是否登录
				if(!this.isLogin){
					this.$router.push("/login");
				}
				else{
					//判断是否点赞过
					let data={
						uid:this.blog.userId,	//被点赞人
						blogId:this.blog.id,
						userId:localStorage.getItem("login"),
					}
					console.log(data);
					this.$ajax.post('/api/appreciate/addAppreciate', this.$qs.stringify(data))
					.then(response =>{
						if(response.data == "点赞成功"){
							//添加点赞消息记录
							this.addAppreRecord();
						}
						this.message = response.data;
						alert(this.message);
						this.$router.go(0);
					})
					.catch(error=>{
						console.log(error);
					})
				}
				
			},
			//利用blogid	获取用户
			getUserBybid(){
				// console.log("----------getUserBybId------------");
				let data={
					id:this.blogId,
				}
				this.$ajax.post("/api/user/queryUserByBlogid", this.$qs.stringify(data))
				.then(response =>{
					// console.log("用户--------------"+response.data);
					this.user = response.data;
					// console.log(this.user.id);
					
					//判断当前用户是不是博主，不是的话，用户没有权限修改其他博主的博客
					if(this.user.id == this.userId){
						this.modifyFlag = true;
					}
					else{
						this.modifyFlag = false;
					}
					console.log("=====要加在这里啊，不然获取不到所属博客用户========================");
					//排名总运算
					this.getFloor();
					//获取博客
					this.getBlog();
					
					//最新
					this.getSixBlogs();
					//最火
					this.getHotBlogs();
					//分类
					this.getClassifylist();
				})
				.catch(error =>{
					console.log(error);
				})
				
			},
			getBlog(){
				//根据bid查blog和username
				let data={
					id:this.blogId,
				}
				this.$ajax.post("/api/blog/queryBlogById", this.$qs.stringify(data))
				.then(response =>{
					this.blog = response.data;
				})
				.catch(error =>{
					console.log(error);
				})
			},
			//访问量+1
			addVisit(){
				let data ={
					id:this.blogId,
				}
				this.$ajax.post('/api/blog/addVisit', this.$qs.stringify(data))
				.then(response =>{
					// console.log(response.data);
				})
				.catch(error =>{
					console.log(error);
				})
			},
			
		}
	}
</script>
	
<style>
	/* 选择分类 */
	#selectStoreclass{
		width:50%;
		margin-left: 20px;
		display: inline;
		float: left;
		margin-left: 15px;
	}
	/* 收藏分类 */
	#storeclass{
		width: 80%;
		float: left;
	}
	/* 面板 */
	.D-card-left{
		/* position: absolute; */
		float: left;
		margin-left: 120px;
		margin-top: -10px;
		width: 21.5%;
		background-color: #F8F8F8;
		
	}
	
	.D-card-left>div{
		/* height: 200px; */
		padding-bottom: 10px;
		padding-top: 5px;
		margin-bottom: 10px;
		/* margin-top: 10px; */
		box-shadow: 0px 2px 4px 0 rgb(0,0,0,0.05); 
		/* border: 1px solid lightgray; */
		background-color: white;
	}
	
	.card-left-user-ava{
		height: 80px;
		padding: 20px 16px 12px 16px;
		width: 100%;
	}
	.card-left-user-ava-{
		height: 48px;
		width: 48px;
		position: relative;
		float: left;
	}
	.card-left-user-ava->img{
		height: 48px;
		width: 48px;
		border-radius: 50%;
	}
	.card-left-user-ava-detail{
		float: left;
		margin-left: 8px;
		/* background-color: darkgray; */
		position: relative;
	}
	.username{
		line-height: 20px;
		/* font-size: 20px; */
		height: 20px;
		text-align: left;
	}
	.gohouse{
		padding-top: 10px;
		color: #3399EA;
	}
	 /* 原创粉丝。。。 */
	.five-parts{
		padding: 6px 10px;
		height: 45px;
		margin-bottom: 15px;
	}
	.part{
		position: relative;
		float: left;
		width: 56px;
		/* line-height: 44px; */
		text-align: center;
	}
	.part>div{
		margin-bottom: 4px;
	}
	.part>dt{
		display: inline-block;
	}
	/* 等级 */
	.sort-parts{
		margin-top: -8px;
		margin-left: 5px;
		margin-bottom: 5px;
		padding: 16px;
		text-align: left;
	}
	
	.sort-parts>div{
		float: left;
		position: relative;
		/* text-align: center; */
		width: 50%;
		/* margin-right: 10px; */
	}
	.part-last{
		margin-bottom: 20px;
	}
	.other-more{	/* 关注/私信 */
		height: 50px;
		border-top: 0.1px solid #E8E8E8;
		/* margin-top: 20px; */
		padding: 16px 16px 0 16px;
		text-align: left;
		/* padding-bottom: -5px; */
	}
	.other-more>button{
		height: 28px;
		font-size: 12px;
		line-height: 28px;
		width: 48%;
		border-radius: 5px;
		
	}
	.other-more-see{
		background-color: #CD0000;
		color: white;
		border: none;
	}
	.other-more-see:hover{
		background-color: #B22222;
	}
	.other-more-msg{
		border: 1px solid #CD0000;
		color: #CD0000;
		background-color: white;
		float: right;
	}
	.other-more-msg:hover{
		background-color: #FFAEB9;
	}
	
	
	
	/* 最新文章 */
	.blog-last{
		/* height: 200px; */
		background-color: navajowhite;
		/* padding: 5px 0; */
	}
	.blog-fam{
		font-size: 15px;
		/* margin-left: 5px; */
		/* margin-top: 5px; */
		color: #2c3030;
		border-bottom: 0px;
	}
	.blog-fam>i{
		color: #CD0000;/* 红色 */
	}
	.zon-title{
		padding: 5px 16px 0px 16px;
		text-align: left;
	}
	.zon-title>div{
		margin-bottom: 14px;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break:keep-all;/* (不换行） */
		white-space:nowrap;/* (不换行） */
	}
	
	/* 博客分类 */
	.blog-sort{
		padding-top: 5px;
	}
	.blog-sort-each{
		padding: 0 16px;
		margin-top: 3px;
		text-align: left;
	}
	.blog-sort-each>p{
		height: 32px;
		line-height: 32px;
		margin-bottom: 16px;
	}
	.sort-each-img{
		height: 32px;
		width: 32px;
		margin-right: 16px;
		/* float: left; */
	}
	.sort-each-name{
		width: auto;
		line-height: 32px;
	}
	.sort-each-num{
		float: right;
		right: 0;
		color: #858585;
	}
	/* 时间分类 */
	.blog-sort-month-each{
		padding:0 16px;
		line-height: 22px;
		text-align: left;
	}
	.blog-sort-month-each>p{
		margin-bottom: 8px;
	}
	/* 热门 */
	.blog-sort-hot{
		padding:0 16px;
		text-align: left;
	}
	.blog-sort-hot>div{
		margin-bottom: 10px;
	}
	.hot-title{
		line-height: 22px;
		margin-bottom: 0px;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break:keep-all;/* (不换行） */
		white-space:nowrap;/* (不换行） */
	}
	.hot-num{
		color: #858585;
		font-size: 12px;
		line-height: 20px;
	}
	
	
	/* 右边-博客 */
	.D-card-right{
		/* position: absolute; */
		float: right;
		margin-right: 140px;
		margin-top: -10px;
		width: 59.5%;
		background-color: white;
		/* padding: 0 24px 16px 0; */
		/* background-color: antiquewhite; */
	}
	.D-card-right>div{
		background-color: white;
		
	}	
	/* 博客标题 */
	.blog-title{
		padding: 0 24px;
		font-size: 26px;
		font-weight: 600;
		line-height: 44px;
		text-align: left;
		padding-top: 16px;
		margin-bottom: 8px;
		border-bottom: none;
		color: #000000;
	}
	.blog-title-user{
		padding: 0 24px;
		padding-bottom: 14px;
		line-height: 26px;
		text-align: left;
		color: #858585;
		margin-right: 20px;
		border-bottom: 1px solid #F5F5F5;
	}
	.blog-title-user>span{
		margin-right: 20px;
	}
	.blog-title-user>span>a{
		color: #78A5F1;
	}
	.blog-take{
		color: #CD0000;
	}
	.blog-modify{
		color: #3399EA;
	}
	/* 博客具体内容 */
	article{
		margin-top: 16px;
		margin: 0 24px;
		padding-top: 16px;
		/* height:400px; */
		text-align: left;
	}
	/* 点赞		收藏		举报 */
	.blogD-bottom{
		padding-top: 24px;
		padding-bottom: 16px;
		display: flex;
		margin-left: 20px;
	}
	.blogD-bottom>span{
		padding: 6px 8px;
		background: #f5f6f7;
		font-size: 14px;
		font-weight: 500;
		margin-right: 8px;
		padding: 7px 10px;
	}
	.blogD-bottom>span>a>span{
		margin-right: 8px;
	}
	/* 评论 */
	.com-bottom{
		margin-top: 1px;
		    background: #fff;
			    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
			    margin-bottom: 8px;
			    padding-bottom: 8px;
	}
	.com-input{
		padding: 16px 24px 8px;
	}
	.com-user{
		    margin-right: 8px;
			float: left;
	}
	.com-user>a>img{
		    margin-top: 8px;
		    display: block;
		    width: 25px;
		    height: 25px;
		    border-radius: 50%;
		    border: 1px solid #e0e0e0;
	}
	.com-textarea{
		    display: block;
		    width: 94%;
			/* float: right; */
		    padding: 7px 8px;
		    background: #fff;
		    border: 1px solid #c1c1c1;
		    border-radius: 4px;
		    resize: none;
		    height: 60px;
		    font-size: 14px;
		    line-height: 22px;
			ox-sizing: border-box;
			transition: height .3s ease-in-out;	
	}
	.com-btn{
		margin-top: 10px;
		float: right;
		display: block;
	}
	.com-list{
		/* padding: 0 24px; */
		    overflow: hidden;
	}
	.com-list>ul{
		margin-top: 16px;
		margin-left: -20px;
		    border-bottom: 1px dashed #e0e0e0;
	}
	.list-0{
		    position: relative;
		    margin-bottom: 12px;
			list-style: none;
	}
	.list-0>a>img{
		    display: block;
		    margin-right: 8px;
		    width: 24px;
		    height: 24px;
		    border-radius: 50%;
			float: left;
	}
	.com-right{
		position: relative;
		    width: 97%;
			
			text-align: left;
			line-height: 22px;
	}
	.com-right>span{
		margin-left: 16px;
	}
	/* 时间 */
	.com-right-time{
		font-size: 12px;
		    color: #999;
		    vertical-align: top;
		    display: inline-block;
			    
	}
	/* 操作 */
	.com-cao{
		vertical-align: top;
		    display: inline-block;
		    position: absolute;
		    top: 0;
		    right: 40px;
		
	}
	.com-cao>a{
		    /* display: none; */
		    margin-right: 10px;
		    min-width: auto;
		    font-size: 12px;
		    height: 20px;
		    line-height: 20px;
			color: #79a5e5 !important;
	}
	.com-reply{
		display: none;
		margin-left: 32px;
		    padding-left: 8px;
		    border-left: 4px solid #c5c5c5;
			list-style: none;
	}
	.com-reply>ul>img{
		display: block;
		    margin-right: 8px;
		    width: 24px;
		    height: 24px;
		    border-radius: 50%;
	}
	a:hover{
		color: #CD0000;
	}
</style>
