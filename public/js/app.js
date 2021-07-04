console.log("hello");
var url = "http://api.weatherstack.com/current?access_key=c1733a2a91f7899e532aff83da16e70b&query="+'boston';
url ='http://localhost:3000/products?location=';
fetchdata=(event)=>{
event.preventDefault();
var location = document.getElementById('location').value;
let updatedUrl = url+location;
fetch(updatedUrl).then((response)=>{
document.getElementById('locValue').textContent = "Loading";
   response.json().then((data)=>{
    if(data.error){
     document.getElementById('locValue').textContent = data.error;
     } else {
     document.getElementById('locValue').textContent = data.temperature;
     }
   })
})
}