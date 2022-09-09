var h4 = document.querySelector("h4");

h4.style.backgroundColor = "red";

h4.addEventListener('click', function(){
    console.log("dom");
})

var third = document.querySelector("#third");
third.style.backgroundColor = "blue";
third.addEventListener('click', function(){
    console.log("do something");
})