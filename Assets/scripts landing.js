const logo = document.querySelectorAll("#logo path");

for(let i = 0; i<logo.length;i++) {
    console.log(`Letter ${i} is ${logo[i].getTotalLength()}`);
}

function nextPage(url,mils) {
        var obj = document.getElementById("logo");
        obj.classList.toggle('exit');

        setTimeout(function() {
            window.location.href =  url;
        }, mils)
        
}

