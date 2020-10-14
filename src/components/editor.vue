<template>
	
	<div class="tinymce-editor" id="tinymce-editor">
		
		<!-- <div> -->
			<form class="editor-form" v-model="myBlog" onsubmit="return false">
				<!-- <span>返回</span> -->
				<span v-show="myBlog.flag">标题不能为空</span>
				<input type="text" v-model.trim="myBlog.title" placeholder="请输入标题" class="editor-title"/>
				<input @click="modelOut"  type="button" value="发布博客" class="editor-btnOut btn btn-primary" />
			</form>
		<!-- </div> -->
		
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		                <h4 class="modal-title" id="myModalLabel">发布文章</h4>
		            </div>
		            <div class="modal-body">
						<div class="form-group form-mygroup">
						    <label class="col-sm-2 control-label modal-blogclassname">博客分类</label>
						    <div class="col-sm-10">
						      <input v-model.trim="classify" type="text" class="form-control " id="classnameId" placeholder="创建新分类">
							  <button type="button" class="btn btn-primary btn-confirm" @click="addClassify">确定</button>
						    </div>
						</div>
						
						<div class="form-group form-mygroup">
							<label class="col-sm-2 control-label modal-blogclassname">选择已有</label>
							<select class="dropmenu form-control"  id="selectclass" @change="getClassname($event)">
								<option>请选择</option>
								<option  v-for="(item,index) in list" :key="index">
								  {{item}}
								</option>
							</select>
						</div>
						
					</div>
		            <div class="modal-footer">
		                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
		                <button type="button" class="btn btn-primary" @click="sell">发布文章</button>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal -->
		</div>
		
		<div class="editor-help"></div><!-- 没用的div，作用是把编辑器压下去 -->
		<editor v-model.trim="myValue"
			:init="init"
			:disabled="disabled"
			@onClick="onClick">
		</editor>
	</div>
</template>
<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import 'tinymce/plugins/image'// 插入上传图片插件
import 'tinymce/plugins/media'// 插入视频插件
import 'tinymce/plugins/table'// 插入表格插件
import 'tinymce/plugins/lists'// 列表插件
import 'tinymce/plugins/wordcount'// 字数统计插件
import 'tinymce/plugins/link'// 超链接
import 'tinymce/plugins/code'	//
export default {
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    // 基本路径，默认为空根目录，如果你的项目发布后的地址为目录形式，
    // 即abc.com/tinymce，baseUrl需要配置成tinymce，不然发布后资源会找不到
    baseUrl: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
	  default: 'lists link code table wordcount'
      // default: 'lists image media table wordcount'
    },
    toolbar: {
		type: [String, Array],
		default: 'undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists link  table | removeformat'
		// default: 'undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat'
		    
	}
	
  },
  data () {
    return {
		myBlog:{
			title:"",
			flag:false,
		},
		list:[],	//数据库里当前用户的所有分类
		classify:"",	//新建的分类名
		classname:"",	//当前点击的分类名
		cid:"",		//分类表id
		bid:"",		//所点击修改的博客的bid（如果为0 的话，返回全空的editor）
		blogvo:{},	//存储修改的博客
		loginUid:localStorage.getItem("login"),
		init: {
			language_url: "/zh_CN.js",
			language: 'zh_CN',
			skin_url: "/skins/ui/oxide",
			content_css: "/skins/content/default/content.css",
			height: 800,
			plugins: this.plugins,
			toolbar: this.toolbar,
			branding: false,
			menubar: false,
			// 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
			// 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
			images_upload_handler: (blobInfo, success, failure) => {
				const img = 'data:image/jpeg;base64,' + blobInfo.base64()
				success(img)
			}
		},
		myValue: this.value
    }
  },
 //  watch: {
	// value (newValue) {
	// 	this.myValue = newValue;
	// },
	// myValue (newValue) {
	// 	this.$emit('input', newValue);
	// }
 //  }
  mounted () {
	//初始化富文本编辑器
    tinymce.init({}),
	//检查是不是点击 “编辑” 所返回的editor
	this.bid = this.$router.history.current.params.blogId;
	// console.log(this.bid);
	//获取当前修改的博客
	if(this.bid == 0){
		//是要写博客
		this.myBlog.title = "";
		this.myValue = "";
		this.classname = "";	
	}
	else{
		//获取当前修改的博客
		this.getModifyBlog();
	}
  },
  methods: {
	//获取当前修改的博客
	getModifyBlog(){
		let data={
			id:this.bid,
		}
		this.$ajax.post('/api/blog/queryBlogVo', this.$qs.stringify(data))
		.then(response =>{
			this.blogvo = response.data;
			//各单位		赋值
			this.myBlog.title = this.blogvo.title;
			// console.log(this.blogvo);
			this.myValue = this.blogvo.content;
			this.classname = this.blogvo.classname;
		})
		.catch(error =>{
			console.log(error);
		})
	},
	
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    // 需要什么事件可以自己增加
    onClick (e) {
      this.$emit('onClick', e, tinymce)
    },
	modelOut(){		//点击发布博客，弹出模态框，并验证标题、内容是否为空
		var title = this.myBlog.title;
		var content = this.myValue;
		// var that = this;
		if(!title){
			// console.log("标题-----"+title);
			this.myBlog.flag = true;
			// console.log(this.myBlog.flag);
			
		}
		else if(!content){
			alert("博客内容不能为空");
		}
		else{
			$('#myModal').modal('show');	//模态框显示
			this.queryAllClass();	//调用查看全部分类
		}
		
	},
	//新建分类名
	addClassify(){
		let data = {
			uid:localStorage.getItem("login"),
			classname:this.classify,
		}
		// console.log("新建分类----------------"+data);
		this.$ajax.post('/api/classify/addClassify', this.$qs.stringify(data))
		.then(response => {
			// console.log(response.data);
			alert("创建成功");
			this.classify="";
			// this.$router.go(-1);
		})
		.catch(error => {
			console.log(error);
		})
	},
	//获取当前点击的分类名
	getClassname(event){
		this.queryAllClass();
		this.classname = event.target.value;
		if(this.classname=="请选择"){
			alert("请选择分类");
		}
		// console.log("点击的分类名"+this.classname);
		let data = {
			classname:this.classname,
			uid:localStorage.getItem("login"),
		}
		// console.log("data-------------------"+data);
		this.$ajax.post('/api/classify/getCid', this.$qs.stringify(data))
		.then(response => {
			console.log("cid-----"+response.data);
			this.cid = response.data;
		})
		.catch(error =>{
			console.log(error);
		})
	},
	// 测试看看显示不显示新添加的
	queryAllClass(){
		console.log("queryAllClass被点击----------");
		let data = {
			uid:localStorage.getItem("login")
		}
		console.log("data------------------------"+data);
		//测试获取后端分类list
		this.$ajax.post('/api/classify/allClassify',this.$qs.stringify(data))
		.then(response => {
			// console.log(response.data);
			this.list = response.data;
		})
		.catch(error => {
			console.log(error);
		})
	},
	sell(){	//点击发布文章
		//获取分类名的对应id
		if(!this.classname){
			alert("请选择分类");
			return;
		}
		if(this.bid == 0){		//新增博客
			this.sellAddBlog();
		}
		else{		//修改博客
			this.updateBlog();
		}
		$('#myModal').modal('hide');	//模态框隐藏
		var that = this;
		// that.$router.push(`myBlogCenter${this.loginUid}`);
		this.$router.go(-1);
	},
	//编辑博客后的更新博客
	updateBlog(){
		let data={
			id:this.bid,
			// userId:localStorage.getItem("login"),
			title:this.myBlog.title,
			content:this.myValue,
			cid:this.cid,
		}
		this.$ajax.post('/api/blog/updateBlog', this.$qs.stringify(data))
		.then(response =>{
			// console.log("====================");
			// this.$router.push(`myBlogCenter${this.loginUid}`);
			this.$router.go(-1);
		})
		.catch(error =>{
			console.log(error);
		})
		
	},
	
	//----新增博客
	sellAddBlog(){
		//新增博客
		console.log("新增博客-------");
		var title = this.myBlog.title;
		var content = this.myValue;
		var cId = this.cid;
		// console.log("cId--------"+cId);
		let data ={
			userId:localStorage.getItem("login"),
			title:title,
			content:content,
			cid:cId
		}
		this.$ajax.post('/api/blog/addBlog',this.$qs.stringify(data))
		.then(response =>{
			alert("发布成功");
		})
		.catch(error =>{
			console.log(error);
		})
	},
	
	
  },
  
}
</script>

<style>
	.editor-form{
		margin: 10px 0 0 100px;
		/* width: 50%; */
	}
	.editor-form>span{
		color: red;
		font-weight: bold;
		width: 16px;
	}
	.editor-title{
		display: inline-block;
		margin-left: 20px;
		/* margin-right: 10px; */
		float: left;
		width: 83%;
		
		height: 34px;
		padding: 6px 12px;
		font-size: 14px;
		line-height: 1.42857143;
		color: #555;
		background-color: #fff;
		background-image: none;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
		transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
	}
	.editor-btnOut{
		margin-left: 10px;
		/* float: left; */
		/* float: left; */
	}
	.editor-help{
		height: 10px;
		width: 100%;
	}
	.form-mygroup{
		min-height: 45px;
	}
	/* 输入框----创建新分类 */
	
	#classnameId{
		width: 80%;
		float: left;
	}
	/* 选择已有分类 */
	#selectclass{
		width:50%;
		margin-left: 20px;
		display: inline;
		float: left;
		margin-left: 15px;
	}
	/* 按钮----确定 */
	.btn-confirm{
		float: right;
		display: inline;
	}
	/* 分类名 */
	.modal-blogclassname{
		line-height: 34px;
	}
	.choose-classname{
		/* float: left; */
		text-align: left;
		margin-left: 110px;
	}
	.dropmenu{
		min-width: 120px;
		text-align: left;
	}
	.dropmenu>li{
		text-align: left;
		padding-left: 20px;
		min-width: 80px;
	}
	
</style>
