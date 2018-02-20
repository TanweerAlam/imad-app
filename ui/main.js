var button = document.getElementById('counter');

button.onclick = function(){
    
    //create a XMLHttpRequest object
    var request = new XMLHttpRequest();
    
    //Capture the response and store it in a variable
    request.onreadystatechange = function(){
        
        if(request.readyState === XMLHttpRequest.DONE){
            //Take some action
            if(request.status === 200){
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString(); 
            }
            
        }
        
    };
    //Make the request
    request.open('GET', 'http://tanweeralam1312.imad.hasura-app.io/', true);
    request.send();
};