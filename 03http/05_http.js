var http=require('http');
var fs=require('fs');


function serve(request,response){
	
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
	//response.write(new Date().toString());//写入响应体
	//response.end();
}
//每当有请求来的时候调用serve函数对客户端进行响应
var server=http.createServer(serve);
server.listen(8080,'localhost');
