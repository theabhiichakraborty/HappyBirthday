let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "flex";
    setTimeout(showSlides, 3000); // Change slide every 3 seconds
}

function plusSlides(n) {
    slideIndex += n;
    if (slideIndex > document.getElementsByClassName("slides").length) { slideIndex = 1 }
    if (slideIndex < 1) { slideIndex = document.getElementsByClassName("slides").length }
    showSlidesManual(slideIndex);
}

function showSlidesManual(n) {
    let slides = document.getElementsByClassName("slides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[n - 1].style.display = "flex";
}
