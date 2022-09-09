var todo = [];

var input = prompt("what do you want to do?");
while(input != "exit"){
    if(input == "list"){
        list();
    }
    if(input == "add"){
        add();
    }
    if(input=="delete"){
        deletes();
    }
    var input = prompt("what do you want to do?");
}
alert("you exited the app");

//functions

function list(){
    todo.forEach(function(todos, lex){
        console.log(lex + ": " + todos);
    });
}
function add(){
    var newtodo = prompt("Enter new todo");
        todo.push(newtodo);
        console.log("you added a new todo!");
}
function deletes(){
    var num = prompt("enter index");
        var deleted = todo.splice(num,1);
        console.log("you deleted "+ deleted );
}
