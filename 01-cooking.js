


//1引入模块
const express =require("express")
const querystring=require("querystring")


//2创建express实例 对象

var app=express();

//3监视端口
app.listen(3008,()=>{
    console.log("http://127.0.0.1:3008");
})

app.get("/",(req,res)=>{
    var  cook= querystring.parse(req.headers.cookie)
  
    if(cook.isLogin && cook.isLogin=="true"){
        res.end(" welcome back")
    }else{
          res.writeHead(200, {
            // "Content-Type":"text/html;charset=utf-8",
            "Set-Cookie": "isLogin=true"
          });
    }
  
    res.end("first")
})