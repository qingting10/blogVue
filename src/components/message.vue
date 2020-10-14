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
					个人资料
				</div>
				<div class="my-title-bottom">
					<div class="mess-header">
						<img class="mess-ava" :src="user.avatar"/>
						<p class="mess-modify" @click="modify">修改头像</p>
					</div>
					<div class="mess-right">
						<div class="mess-id">ID: {{user.username}}</div>
						<div class="mess-info">
							<span>博客 {{user.blognum}}</span>
							<span>粉丝 {{user.fans}}</span>
						</div>
						<div class="mess-info">
							<span>点赞 {{user.appreciate}}</span>
							<span>评论 {{user.communicate}}</span>
						</div>
					</div>
					
					
				</div>
			</div>
		  
		</div>
		
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		                <h4 class="modal-title" id="myModalLabel">选择图片</h4>
		            </div>
		            <div class="modal-body mess-body">
						<!-- <div class="mess-header"> -->
						<div v-for="item in imgList">
							<img  @click="getava($event)" ref="myava" class="mess-ava mess-ava-change" v-bind:src="item.url" />
							<!-- <img v-show="srcimg" :src="srcimg" class="mess-ava mess-ava-change"/> -->
						</div>
							<!-- 要做获取图片路径！！！！ -->
						
					</div>
		            <div class="modal-footer">
		                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
		                <button type="button" class="btn btn-primary" @click="modifyava">确定</button>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal -->
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				isLogin:false,
				loginUid:localStorage.getItem("login"),
				curentImg:require(`../../public/img/17.jpg`),	//存储当前的头像
				//17号图片的路径是	/img/17.a9ed5719.jpg
				imgList:[
					{
						name: "1",
						url: require(`../../public/img/1.jpg`)
					},
					{
						name: "2",
						url: require(`../../public/img/2.jpg`)
					},
					{
						name: "3",
						url: require(`../../public/img/3.jpg`)
					},
					{
						name: "4",
						url: require(`../../public/img/4.jpg`)
					},
					{
						name: "5",
						url: require(`../../public/img/5.jpg`)
					},
					{
						name: "6",
						url: require(`../../public/img/6.jpg`)
					},
					{
						name: "7",
						url: require(`../../public/img/7.jpg`)
					},
					{
						name: "8",
						url: require(`../../public/img/8.jpg`)
					},
					{
						name: "9",
						url: require(`../../public/img/9.jpg`)
					},
					{
						name: "10",
						url: require(`../../public/img/10.jpg`)
					},
					{
						name: "11",
						url: require(`../../public/img/11.jpg`)
					},
					{
						name: "12",
						url: require(`../../public/img/12.jpg`)
					},
					{
						name: "13",
						url: require(`../../public/img/13.jpg`)
					},
					{
						name: "14",
						url: require(`../../public/img/14.jpg`)
					},
					{
						name: "15",
						url: require(`../../public/img/15.jpg`)
					},
					{
						name: "16",
						url: require(`../../public/img/16.jpg`)
					},
					
				],
				srcimg:"",	//存储用户选择的图片
				user:{},	//存储当前系统用户
				id:localStorage.getItem("login"),
				unread:{},	//未读的关注消息列表
				// inputResultNull:false,		//未查到
				inputTitle:"",	//要查询的博客标题
			}
		},
		mounted() {
			//判断是否要出现“登录/注册”链接
			if(localStorage.getItem("login")!=null){
				this.isLogin=true;
			}
			this.getMessage();
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
			//退出登录
			loginOut(){
				localStorage.removeItem("login");
				console.log("localStorage=login----"+localStorage.getItem("login"));
				// this.$router.push("/");		这个会跳转当前页面，但是不会刷新
				this.$router.go(0);//重新刷新当前页面
			},
			//获取当前的基本信息
			getMessage(){
				let data={
					id:this.id
				}
				this.$ajax.post('/api/user/getUserById', this.$qs.stringify(data))
				.then(response =>{
					this.user = response.data;
				})
				.catch(error =>{
					console.log(error);
				})
			},
			//模态框显示
			modify(){
				$('#myModal').modal('show');	
			},
			//获取点击的图片对象
			getava(event){
				var target = event.target || window.event.srcElement
				//获取对应元素的id值
				var text = target.getAttribute('src');
				console.log("src----------------"+text);
				this.srcimg = text;
			},
			//修改头像
			modifyava(){
				let data={
					id:this.id,
					avatar:this.srcimg,
				}
				this.$ajax.post('/api/user/updateAva', this.$qs.stringify(data))
				.then(response =>{
					console.log("成功修改");
					this.curentImg = this.srcimg;
					$('#myModal').modal('hide');	//模态框隐藏
					this.$router.go(0);	//刷新页面
				})
				.catch(error =>{
					console.log(error);
				})
			}
			
		}
	}
</script>
	
	
<style>
	
	/* 右边-博客 */
	.m-card-right{
		/* position: absolute; */
		float: right;
		margin-right: 200px;
		margin-top: -10px;
		width: 68%;
		background-color: white;
		/* padding: 0 24px 16px 0; */
		/* background-color: antiquewhite; */
	}
	.m-card-right>div{
		background-color: white;
		/* padding: 0 24px; */
		
	}	
	/* 博客标题 */
	#my-title{
		font-size: 18px;
		color: #3d3d3d;
		height: 88px;
		line-height: 90px;
		/* border-bottom: 1px solid #e0e0e0; */
		padding: 0 24px;
		font-weight: 600;
		text-align: left;
		/* padding-top: 16px; */
		/* margin-bottom: 8px; */
		border-bottom: none;
		color: #000000;
	}
	.my-title-bottom{
		border-top: 1px solid #e0e0e0;
		padding: 0 24px;
		text-align: left;
		position: absolute;
		background-color: white;
		width: 68%;
	}
	
	.mess-header{
		float: left;
		text-align: center;
		margin-right: 16px;
		cursor: pointer;
	}
	.mess-ava{
		width: 100px;
		height: 100px;
		border-radius: 50%;
		margin: 16px auto 0;
	}
	/* 模态框的body */
	.mess-body{
		min-height: 550px;
	}
	.mess-body>div{
		padding:0 30px 0 35px ;
	}
	.mess-ava-change{
		float: left;
		margin-right: 25px;
		margin-bottom: 10px;
	}
	.mess-modify{
		font-size: 14px;
		color: #3399ea;
		margin-top: 8px;
		cursor: pointer;
	}
	/* 头像右边 */
	.mess-right{
		float: left;
	}
	.mess-id{
		margin-top: 16px;
		height: 20px;
		line-height: 20px;
		font-size: 14px;
		color: #999;
	}
	.mess-info{
		margin-top: 8px;
		margin-bottom: 16px;
	}
	.mess-info>span{
		margin-right: 16px;
		color: rgb(77, 77, 77);
		font-size: 14px;
	}
</style>
