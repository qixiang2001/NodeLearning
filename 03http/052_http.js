var http=require('http');
var fs=require('fs');
var mime=require('mime');
var url=require('url');//对URL进行处理，把字符串转成对象


function serve(request,response){
	
	//var url=request.url;
	//true:表示query转成对象
	var urlObj=url.parse(request.url,true);
	console.log(urlObj.query.name,urlObj.query.age);
	var pathName=urlObj.pathname;
	if(pathName=="/"){
	
		console.log(request.method,request.url);//请求的方法 get/post/delete;请求的url地址
		console.log(request.headers);//请求头
		
		response.statusCode = 200;//设置状态码
		response.setHeader('Content-Type','text/html;charset=utf-8');//设置响应类型，编码为utf-8
		response.setHeader('name','zfpx');//设置响应头
		//异步读取文件,并且将读取的内容写入响应体
		fs.readFile('05_index.html',function(err,data){
			response.write(data);//写入响应体
			response.end();				
		});
	}else if(pathName=="/clock"){
		var count=0;
		var timer = setInterval(function(){
			response.write(new Date().toString());
			count++;
			if (count>=5){
				clearInterval(timer);
				response.end();
			}
		},1000)
	}
	else{
		static(pathName,response);
	}
}	
	function static(pathName,response){
		console.log(request.method,request.url);//请求的方法 get/post/delete;请求的url地址
		console.log(request.headers);//请求头
		response.setHeader('Content-Type',mime.lookup(pathName)+';charset=utf-8');//设置响应类型，编码为utf-8	
		//异步读取文件,并且将读取的内容写入响应体
		fs.readFile(pathName.slice(1),function(err,data){
			response.write(data);//写入响应体
			response.end();				
		});	
	}

//每当有请求来的时候调用serve函数对客户端进行响应
var server=http.createServer(serve);
server.listen(8080,'localhost');
