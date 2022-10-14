
var recipts=[];

var links=document.querySelectorAll(".nav-link");
for(var i=0;i<links.length;i++){
  links[i].addEventListener("click",function(e){
    var curentMeal=e.target.text;
    getRecipts(curentMeal)
  })
}


getRecipts("pizza");     //call
 
function getRecipts(meal){
  var httpRequest=new XMLHttpRequest();
  httpRequest.open("GET",`https://forkify-api.herokuapp.com/api/search?q=${meal}`);
  httpRequest.send();
  httpRequest.addEventListener("readystatechange",function(){

    if(httpRequest.readyState==4&&httpRequest.status==200)
    {
      recipts= JSON.parse(httpRequest.response).recipes;
    displayRecipts();
    }
  })
}

function displayRecipts(){
  var cols='';
for(var i=0;i<recipts.length;i++){
  cols+=
  `
    <div class="col-md-3 my-3">
      <div class="receipe">
          <img class="w-100 recipe-img" src="${recipts[i].image_url}" alt="">
          <div class="receipe-caption">
          <h5>${recipts[i].title}</h5>
          </div>
          <div class="slider"></div>
      </div>

      <div class="text-center">
      <a target="_blank" href="${recipts[i].source_url}" class="btn btn-info">source</a>
      <a data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="getSingleRecipe(${recipts[i].recipe_id})" class="btn btn-warning">detalis</a>
      </div>
      
    </div>
  `
}
  document.getElementById("reciptsRow").innerHTML=cols
}



var recipeDetals;
async function getSingleRecipe(recipeId){
 var response=await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`);
 recipeDetals= await response.json();
 displaySingleRecipe()
}

function displaySingleRecipe(){
  var details=recipeDetals.recipe;
  var recipeDetalsData=
  `
    <img src="${details.image_url}" class="w-100 recipe-img">
    <h2>${details.title}</h2>
    <p>${details.ingredients}</p>
  `;
  document.getElementById("recipeData").innerHTML=recipeDetalsData
}