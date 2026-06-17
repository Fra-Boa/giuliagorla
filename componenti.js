document.addEventListener("DOMContentLoaded", () => {

    // active link
    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".menu a").forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

    // hamburger
    const hamburger = document.getElementById("hamburger");
    const sidebar = document.getElementById("sidebar");

    hamburger.addEventListener("click", () => {
        sidebar.classList.toggle("open");
    });


});



const images = document.querySelectorAll(".carousel-track img");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

let index = 0;

function showImage(i){
    images.forEach(img => img.classList.remove("active"));
    images[i].classList.add("active");
}

function next(){
    index = (index + 1) % images.length;
    showImage(index);
}

function prev(){
    index = (index - 1 + images.length) % images.length;
    showImage(index);
}

nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);

// inizializza
showImage(index);