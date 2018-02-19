var button = document.getElementById('counter');
var counter = 0;

button.onclick = function(){
    
    //Make the response to the counter endpoint
    
    //Capture the response and store it in a variable
    
    //Render the counter variable in the span count
    counter = counter + 1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
    alert(counter);
};