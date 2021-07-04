var express = require('express');
var path = require('path');
var hbs = require('hbs');
var request = require('request');

const app =express();
const port = process.env.PORT || 3000;
const directoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

app.set('views',viewsPath);
app.set('view engine','hbs');
hbs.registerPartials(partialsPath);

app.use(express.static(directoryPath));


app.get('',(req,resp)=>{
   resp.render('index',{
      title : 'Weather',
      name: 'Home',
      author : 'Ashish'
   })
})

app.get('/about',(req,resp)=>{
   resp.render('about',{
      name : 'Ashish',
      title : 'About Page',
      author : 'Ashish'
   })
})

app.get('/products',(req,resp)=>{
if(!req.query.location){
  return resp.send({
      error : 'You must provide a location'
  })
}
const query = req.query.location;
var url = "http://api.weatherstack.com/current?access_key=c1733a2a91f7899e532aff83da16e70b&query="+query;
request({url, json:true},(error,response)=>{
    if(response.body.error){
    return resp.send({
                  error : "You must provide a correct location"
                });
    }
    console.log(response.body.current.temperature);
    resp.send({
       name : "Ashish",
       age :30,
       temperature : response.body.current.temperature
    });
 })
})

app.get('/',(req,resp)=>{
resp.send("<h1>Hello Express</h1>");
})

app.get('/about/*',(req,resp)=>{
resp.render('404Page',{
    error : 'About not found'
});
})

app.get('*',(req,resp)=>{
resp.render('404Page',{
    error : 'Page Not Found'
});
})


app.listen(port,()=>{console.log("Started server")})