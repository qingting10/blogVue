<template>
	
  <div id="login">
    <div class="outer">
    	<form class="form-signin" :model="myform">
    		<div class="login-head">
    			<a href="#" class="login-in"><router-link to="/">登录</router-link></a>
    			·
    			<a href="#" class="register" @click="goRegister">注册</a>
				<!-- <router-link to="/Register">注册</router-link> -->
    		</div>
    		<div class="form-item">
    			<label class="sr-only" prop="username">用户名</label>
    			<input type="text" v-model.trim="myform.username" @blur="checkusername" class="form-control" placeholder="用户名" required autofocus>
				<p id="unameText" v-text="myform.unameText"></p>
			</div>
    		<div class="form-item">
    			<label class="sr-only" prop="password">密码</label>
    			<input type="password" v-model.trim="myform.password" @blur="checkpass" class="form-control" placeholder="密码" required>
				<p id="upassText" v-text="myform.upassText"></p>
			</div>
    		<!-- <div class="checkbox">
    			<input type="checkbox" checked>
    			<span>记住我</span>
    		</div>
    		<div class="problem"><a href="#">登录遇到问题？</a></div>
    		 -->
    		<div class="form-item item-last">
    			<button class="btn btn-lg btn-primary btn-block" type="button" @click="login">登录</button>
    		</div>
    	</form>
		<!-- <router-view></router-view> -->
    </div>
  </div>
</template>
<script src="../js/vue.js" type="text/javascript" charset="utf-8"></script>
<script>
import Vue from 'vue/dist/vue.esm.js'

// jQuery.support.cors = true;
export default {
	name: 'Login',
	data(){
		return {
			myform:{
				username:"",
				password:"",
				unameText:"",
				upassText:"",
			},
			// userIp:"",
			message:"",
			userId:"",
			
		}
		
	},
	mounted() {
	},
	
	methods:{
		//检查用户名
		checkusername(){
			if(!this.myform.username){
				this.myform.unameText="用户名不能为空";
				return;
			}
			else{
				this.myform.unameText="";
			}
		},
		//检查密码
		checkpass(){
			if(!this.myform.password){
				this.myform.upassText = "密码不能为空";
				return;
			}
			else{
				this.myform.upassText = "";
			}
		},
		//登录
		login(){
			// 处理输入为空
			if(this.myform.unameText || this.myform.upassText){
				return;
			}
			//调用后台接口，判断用户的真实性
			let data = {
				username:this.myform.username,
				password:this.myform.password,
			}
			this.$ajax.post('/api/user/isLoginUser', this.$qs.stringify(data))
			.then(response => {
				if(!response.data){
					alert("用户名或密码错误,请重新输入");
					return;
				}
				else{
					this.userId=response.data;
					localStorage.setItem("login",this.userId);
					this.$router.push("/");
					// this.$router.go(-2);
				}
			})
			.catch(error => {
				console.log(error);
			})
		},
		goRegister(){
			console.log("跳转register");
			
			this.$router.push('/Register');
			
		},
		
	}
  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

body{
	background-color: #f1f1f1;
}
.outer{
	width: 400px;
	/* height: 600px; */
	margin: 0 auto;
	margin-top: 150px;
	border-radius: 5px;
	padding: 50px 50px 30px;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	background:white;
}
.login-head{
	text-align: center;
	line-height: 42px;
	font-weight: 700;
	font-size: 20px;
	margin-bottom: 30px ;
}
.login-head>a{
	padding: 0 10px 10px;
	/* color: #ea6f5a; */
}
.login-head>a:hover{
	text-decoration: none;
}
.login-in{
	/* text-decoration: underline; */
	padding-bottom: 10px;
	border-bottom: 2px solid;
	color: #ea6f5a;
}
.login-in:hover{
	color: #ea6f5a;
}
.register{
	color: #969696;
}
.register:hover{
	padding-bottom: 10px;
	border-bottom: 2px solid;
	color: #ea6f5a;
}
.form-item{
	margin-top: 20px;
}

.checkbox{
	color: #969696;
	margin-left: 20px;
	float: left;
	margin-top: 20px;
	margin-bottom: 20px;
}
.problem>a{
	float: right;
	color: #969696;
	line-height: 58px;
}
.problem>a:hover{
	color: #CD0000;
	text-decoration: none;
}

.item-last{
	margin: 20px 0;
}
</style>
