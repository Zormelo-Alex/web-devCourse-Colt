var square = document.querySelectorAll(".square");
var pickedHtml = document.querySelector(".picked");
var ans = document.querySelector(".ans");
var h1 = document.querySelector("h1");
var newcolor = document.querySelector(".nc");
var easy = document.querySelector(".easy");
var hard = document.querySelector(".hard");
var numcolors = 6;
var colors = generate(numcolors);

var picked = colors[Math.floor(Math.random() * colors.length)];
pickedHtml.textContent = picked;


easy.addEventListener("click", function(){
    easy.classList.add("selected");
    hard.classList.remove("selected");
    numcolors = 3;
    colors = generate(numcolors);
    picked = colors[Math.floor(Math.random() * colors.length)];
    pickedHtml.textContent = picked;
    loopdisplay();
    for(var i = 3; i < 6; i++){
        square[i].style.display = "none";
    }
    newcolor.textContent = "New Colors";
    ans.textContent = "";
})
hard.addEventListener("click", function(){
    hard.classList.add("selected");
    easy.classList.remove("selected");
    numcolors = 6;
    colors = generate(numcolors);
    picked = colors[Math.floor(Math.random() * colors.length)];
    pickedHtml.textContent = picked;
    loopdisplay();
    rectify();
    newcolor.textContent = "New Colors";
    ans.textContent = "";
})
newcolor.addEventListener("click", function(){
    colors = generate(numcolors);
    picked = colors[Math.floor(Math.random() * colors.length)];
    pickedHtml.textContent = picked;
    loopdisplay();
    newcolor.textContent = "New Colors";
    ans.textContent = "";
})

loopdisplay();

// function generate(level){
//     var arr = [];
//     for(var i = 0; i < level; i++){
//         arr.push(random());
//     } 
//     return arr;
// }
// function random(){
//       var num1 = Math.floor(Math.random()*255);
//       var num2 = Math.floor(Math.random()*255);
//       var num3 = Math.floor(Math.random()*255);
//       return "rgb("+num1+","+num2+","+num3+")"; 
      
// }
function generate(level){
    var arr = [];
    var num1 , num2, num3;
    for(var i = 0; i < level; i++){
      num1 = Math.floor(Math.random()*255+1);
      num2 = Math.floor(Math.random()*255+1);
      num3 = Math.floor(Math.random()*255+1);
      gcolor = "rgb("+num1+", "+num2+", "+num3+")"; 
      arr.push(gcolor);
    } 
    return arr;
}

function loopdisplay(){
    for(var i = 0; i < square.length; i++){
        square[i].style.backgroundColor = colors[i];
        square[i].addEventListener("click", function(){
            if(this.style.backgroundColor ==picked){
                ans.textContent = "Correct";
                h1.style.backgroundColor = picked;
                pickedHtml.style.backgroundColor = picked;
                newcolor.textContent = "Play Again?"
                square.forEach(function(cc){
                    cc.style.backgroundColor = picked;
                    cc.style.transition = "all .3s ease-in";
                })
            }else{
                ans.textContent = "Try again";
                this.style.backgroundColor = "rgb(29, 27, 27)";
                newcolor.textContent = "New colors";
            }
        })
    }
}
function rectify(){
    for(var i = 0; i < 6; i++){
        square[i].style.display = "block";
    }
}