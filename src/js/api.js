const api = [
	//写不需要拦截的接口
	"/api/user/isLoginUser",	//登录
	"/api/user/checkUsername",	//检查用户名
	"/api/user/addVueUser",		//注册
	"/api/blog/likeTitleList",	//模糊查询博客
	'/api/user/blognumUp',		//最多博客数的10个人
	'/api/blog/getBlogs',		//获取所有博客
	'/api/blog/sixHotBlogs',	//6个最火（点击量多）blog
	'/api/classify/classnameList',		//博客分类
	'/api/blog/sixNewList',		//最新的6个博客
	'/api/user/computeFloor',	//排名总运算
	"/api/reply/getFirstFloor",		//获取一楼评论列表
	"/api/user/queryUserByBlogid",	//利用blogid	获取用户
	"/api/blog/queryBlogById",		//根据bid查blog和username
	'/api/blog/addVisit',		//博客访问量+1
	'/api/blog/orderByVisit',	//按访问量排序
	'/api/blog/timeLastBloglist',	//按创建时间排序博客
	'/api/user/getUserById',		//获取当前（被查看）用户的用户信息
	'/api/blog/getBlogList',		//博客列表
	"/api/blog/cnameBlogList",		//查找博客分类表
];
export default api;