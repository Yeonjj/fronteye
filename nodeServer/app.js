var express = require("express");
var bodyParser = require("body-parser");
var app = express();

// app.listen(3000, function() { //callback 함수는 다 비동기로 실행된다. 즉 요청이 들어왔을때 비동기적으로 실행이된다. 모든 동기 함수들(콜백이 아닌 함수들)을 실행시킨후에 실행이된다.
//     console.log("start! on port 3000");
// });
app.listen(3000,'192.168.0.154',function(){
 // app.close(function(){
 //   app.listen(3000,'192.168.0.154')
 // })
    console.log("start! on port 3000");
})

app.use(express.static('public'));  //static 디렉토리를 설정한다. 변하지 않는 이미지 js파일 등을 말한다.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.get('/main', function(req, res){
    let dirURL = "/public/main.html";
    res.sendFile(`${__dirname}${dirURL}`); // 응답으로 파일을 보낸다.
});

app.get('/form', function(req, res){
    let dirURL = "/public/";
    res.sendFile(`${__dirname}${dirURL}form.html`); // 응답으로 파일을 보낸다.
});

app.post('/email_post', function(req, res){
    console.log(req.body["email"]);
    //res.send(`<h1>welcome ${req.body["email"]}</h1>`);
    res.render('email.ejs',{'email': req.body.email}); //express 뷰 엔진에서 쓰는 것이 많은데 이중 하나이다. pug등이 있다. 템플렛을 만들어 준다.
});

app.post('/ajax_send_email', function(req, res){
    console.log(req.body.email);
    var responsData = {'result' : 'ok', 'email' : req.body.email};
    res.json(responsData);
});


