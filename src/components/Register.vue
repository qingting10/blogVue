<template>
	<div class="outer" id="Register">
		
		<form class="form-signin" :model="myRegister" id="myform">
			<div class="login-head">
				<a href="#" class="login-in"><router-link to="/">登录</router-link></a>
				·
				<a href="#" class="register"><router-link to="/Register">注册</router-link></a>
			</div>
			<div class="form-item">
				<label class="sr-only">用户名</label>
				<input type="text" v-model.trim="myRegister.username" @blur="checkname"  class="form-control" placeholder="用户名" required autofocus>
				<p id="unameText" v-text="myRegister.unameText"></p>
			</div>
			<div class="form-item">
				<label class="sr-only">密码</label>
				<input type="password" v-model.trim="myRegister.password" @blur="checkpass" class="form-control" placeholder="密码" required>
				<p id="upassText" v-text="myRegister.upassText"></p>
			</div>
			<div class="form-item">
				<label class="sr-only">确认密码</label>
				<input type="password" v-model.trim="myRegister.conpass" @blur="checkSecondpass" class="form-control" placeholder="密码" required>
				<p id="secongpassText" v-text="myRegister.secongpassText"></p>
			</div>
			<div class="form-item">
				<label class="sr-only">邮箱</label>
				<input type="text" v-model.trim="myRegister.email" @blur="checkEmail" class="form-control" placeholder="邮箱" required>
				<p id="emailText" v-text="myRegister.emailText"></p>
			</div>
			<div class="form-item item-last">
				<button @click="register" class="btn btn-lg btn-primary btn-block" type="button">注册</button>
			</div>
		</form>
		<router-view></router-view>
	</div>
</template>

<script>
	export default{
		name:'Register',
		data(){
			return{
				myRegister:{
					username:"",
					unameText:"",
					
					password:"",
					upassText:"",
					
					conpass:"",
					secongpassText:"",
					
					email:"",
					emailText:"",
				}
			}
		},
		methods:{
			//注册
			register(){
				//处理用户输入为空
				if(this.myRegister.unameText || this.myRegister.upassText || this.myRegister.secongpassText|| this.myRegister.emailText){
					// alert("用户名不能为空");
					return;
				}
				else{
					let data={
						username:this.myRegister.username,
						password:this.myRegister.password,
						email:this.myRegister.email,
					}
					this.$ajax.post("/api/user/addVueUser" ,this.$qs.stringify(data))
					.then(response =>{
						console.log("注册成功");
						alert("注册成功");
						this.$router.push('/login');
					})
					.catch(error =>{
						console.log(error);
					})
					
				}
				
				
			},
			//检查邮箱
			checkEmail(){
				var email = this.myRegister.email;
				if(!email){
					this.myRegister.emailText="请输入邮箱";
					return;
				}
				var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
				//调用正则验证test()函数
				
				if(!reg.test(email)) {
					this.myRegister.emailText="邮箱格式不正确，请重新输入！";
					return;
				}
				else{
					this.myRegister.emailText="";
				}
				
			},
			//检查确认密码
			checkSecondpass(){
				var password = this.myRegister.password;
				var conpass = this.myRegister.conpass;
				if(!conpass){
					this.myRegister.secongpassText="请输入确认密码";
					return;
				}
				if(conpass != password){
					this.myRegister.secongpassText="两次密码不一致";
					this.myRegister.conpass="";
					return;
				}
				this.myRegister.secongpassText="";
			},
			//检查密码
			checkpass(){
				var password = this.myRegister.password;
				if(!password){
					this.myRegister.upassText="请输入密码";
					return;
				}
				if(password.length<6 ){
					this.myRegister.upassText="密码不能少于6位";
					return;
				}
				this.myRegister.upassText="";
			},
			//检查用户名
			checkname(){
				var username = this.myRegister.username;
				if(!username){
					this.myRegister.unameText="请输入用户名";
					return;
				}
				if(username.length<2 || username.length>12){
					this.myRegister.unameText="用户名长度必须在2-12位字符之间";
					return;
				}
				let data={
					username:username,
				}
				// console.log(data);
				this.$ajax.post('/api/user/checkUsername', this.$qs.stringify(data))
				.then(response =>{
					if(response.data == "用户名已存在"){
						this.myRegister.unameText = response.data;
					}
					else{
						this.myRegister.unameText = "";
					}
					
				})
				.catch(error =>{
					console.log(error);
				})
			}
		}
		
	}
</script>

<style>
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
		margin-bottom: 20px;
	}
	.login-head>a{
		padding: 0 10px 10px;
		/* color: #ea6f5a; */
	}
	.login-head>a:hover{
		text-decoration: none;
	}
	.register{
		/* text-decoration: underline; */
		padding-bottom: 10px;
		border-bottom: 2px solid;
		color: #ea6f5a;
	}
	.register:hover{
		color: #ea6f5a;
	}
	.login-in{
		color: #969696;
	}
	.login-in:hover{
		padding-bottom: 10px;
		border-bottom: 2px solid;
		color: #ea6f5a;
	}
	.form-item{
	    margin-top: 5px;
	}
	.form-item>p{
		color: red;
		font-weight: bold;
		font-size: 10px;
		/* width: 16px; */
		/* text-align: left; */
		height: 12px;
		/* visibility: hidden; */
			/* margin-left: 0; */
		/* float: left; */
	}
	.item-last{
		margin:20px 0;
	}
</style>
