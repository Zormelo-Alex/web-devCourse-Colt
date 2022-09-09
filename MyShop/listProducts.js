var fakes = require('Faker');
console.log("==========================\n WELCOME TO MY SHOP!!!! \n==========================");
for(var i = 1; i <= 10; i++){
    console.log(i + " " + fakes.Name.findName() + " - " + fakes.Internet.email());
}