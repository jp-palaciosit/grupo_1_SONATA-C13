const e = require("express")

function myFunction(e){
    let imgFull = document.querySelector("#imageBox")
    imgFull.src = e.src
}
let imgs = document.querySelector(".imgA")
