 
 
 
 
 
 //1引入模板
 const express=require("express")
const session=require("express-session");


//2创建express 实例对象
const app=express();

//3监听端口
app.listen(3009,()=>{
    console.log("http://127.0.0.1:3009");
})
//开启Session 处理机制
app.use(session({
    secret: 'my_session_secret', //二次加密字符串 建议使用 128 个字符的随机字符串
    resave: false,//强制去保存未更改的session数据
    saveUninitialized: false,//是否存储未初始化的session数据
}))

app.get("/",(req,res)=>{
    // console.log(req.session);
    // req.session.isLogin="ture"
    // res.end("")


    if(req.session.isLogin && req.session.isLogin == "true"){
        res.end("欢迎回来")
    }else{
        req.session.isLogin = "true"
        res.end("first")
    }
})


