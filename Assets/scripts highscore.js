pushScore = function () {
    console.log(JSON.parse(localStorage.getItem('highscores')));
    let scores = JSON.parse(localStorage.getItem('highscores'));
    scores = scores.sort(function(a, b){return a - b});
    scores.reverse();
    for(i=0;i<scores.length;i++) {
        var div = document.createElement("div");               
        div.innerHTML = scores[i];                
        document.getElementById("listItems").appendChild(div);
        div.setAttribute('id','listItem')
            
    }
     
}

window.onload= pushScore;

clearButton = document.getElementById("clear");
clearButton.addEventListener('click',(function(){
    localStorage.clear();
    window.location.href = "highscores.html";
}))