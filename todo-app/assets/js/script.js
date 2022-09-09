$("ul").on('click', "li" , function(){
$(this).toggleClass("completed");    
});

$("ul").on('click', "span" , function(e){
$(this).parent().fadeOut(500,function(){
$(this).remove();
});   
e.stopPropagation(); 
});

$("input[type = 'text']").on("keypress", function(e){
    if(e.which == 13){
        var todoText = $(this).val();
        $(this).val("");
        if(todoText ==""){
            alert("can't add empty todo!")
        }else{
           $("ul").append("<li><span>X</span>"+" "+todoText+"</li>"); 
        } 
    }
});

$(".icon").on("click", function(){
    $("input[type='text']").fadeToggle(500);
    if($(".icon").text()=="+"){
       $(".icon").text("-"); 
    }else{
        $(".icon").text("+");
    }
    
});