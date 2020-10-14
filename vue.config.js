/**
 * 	Vue cli的核心配置文件
 */
const webpack = require("webpack");

module.exports = {
	
	// 引入bootstrap样式
	configureWebpack:{
		plugins:[
			new webpack.ProvidePlugin({
				$: "jquery",
				jQuery: "jquery",
				"window.jQuery": "jquery",
				Popper:["popper.js", "default"]
			}),
			// { 
			// 	src: '@/plugins/vue-mavon-editor', 
			// 	srr: false ,
			// },
		]
	},
    devServer: {
		open: true,		//自动打开浏览器
		// disableHostCheck: false,
		host: "localhost",
		port: 8081,
		https: false,
		// hotOnly: false,
		
		// 静态资源文件夹
		// assetsSubDirectory: 'static',
		
		// 发布路径
		// assetsPublicPath: '/',		这里有错
		
		// 代理配置表，在这里可以配置特定的请求代理到对应的API接口
		// 例如将'localhost:8080/api/xxx'代理到'www.example.com/api/xxx'
		// 使用方法：https://vuejs-templates.github.io/webpack/proxy.html
		proxy: {
			'/api': {
				target: 'http://localhost:8080', // 接口的域名
				// secure: false,  // 如果是https接口，需要配置这个参数
				changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
				pathRewrite: {
					'^/api': ''
				}		
			}
		},
        
    },
};
