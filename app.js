//1引入express 模板

const express =require("express")
const session=require("express-session")

//引入路由模块
const router= require("./router")
//2创建express实例
var bodyParser=require("body-parser")
var app=express();

//托管静态资源
app.use("/assets",express.static("assets"))
app.use("/uploads",express.static("uploads"))




//添加使用中间件配置
app.use(
  session({
    secret: "my_session_secret", //二次加密字符串 建议使用 128 个字符的随机字符串
    resave: false, //强制去保存未更改的session数据
    saveUninitialized: false //是否存储未初始化的session数据
  })
);


//所有请求都会经过下面这个中件函数处理
//我们不想每个页面请求都单独进行处理 所以 使用一个所有请求都必需经过的中间件函数
app.use((req,res,next)=>{
  //我们需要判断你之前是否登陆过 如果登陆过就继续之前的请求 否则 重定向
  //如果访问 前台页面，或者登陆页面的 请求也不需要先登录
  if(req.session.isLogin && req.session.isLogin=="true" || req.url.indexOf("/admin") ==-1 || req.url==("/admin/login")){
    next()//下一步操作，本质上就是当前用户的请求
  }else{
    res.redirect("/admin/login")
  }
})


//3监视端口

app.listen(3003,()=>{
    console.log("http://127.0.0.1:3003");
})
// 设置ejs模板
//设置让当前应用使用的ejs做模板引擎
app.set("view engine","ejs")
//2配置ejs默认的模板储存位置，意味着后期ejs渲染是自动到指定目录下查询
app.set("views",__dirname+"/views")


//4注册中间件
// 设置body-parser中间件的使用
app.use(bodyParser.urlencoded({extended:false}))
app.use(router)