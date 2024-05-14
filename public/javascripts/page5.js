let ext = document.querySelector(".exit");
let tptxt = document.querySelector(".toptext");
let spc = document.querySelector("#spacing");
ext.addEventListener("click", () => {
    console.log("hello");
    tptxt.classList.add("hide")
    spc.style.height = "95px";
})