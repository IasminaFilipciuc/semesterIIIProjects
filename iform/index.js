let slideIndex = 1;
let slideIndex2 = 1;
showSlides(slideIndex);
showSlides2(slideIndex2);
setInterval(() => {showSlides(plusSlides(1))}, 5000);
const template = document.querySelector("#template").innerHTML;
// Next/previous controls
document.querySelector("#buyButton").addEventListener("click", openModal);



function plusSlides(n) {
    showSlides(slideIndex += n);
}
function plusSlides2(n) {
    showSlides2(slideIndex2 += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}
function showSlides2(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides2");
    if (n > slides.length) {slideIndex2 = 1}
    if (n < 1) {slideIndex2 = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex2-1].style.display = "block";
}
function openModal() {
    document.querySelector("#modal").style.display = "block";
    document.querySelector("#black").style.display = "block";
    document.querySelector("#nextButton").addEventListener("click", next);
}
function next() {
    document.querySelector("section").innerHTML = template;
}