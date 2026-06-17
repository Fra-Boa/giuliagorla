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

    /* =========================
       CAROUSEL + THUMBNAILS
    ========================= */

    const images = document.querySelectorAll(".carousel-track img");
    const thumbs = document.querySelectorAll(".carousel-thumbs img");
    const prevBtn = document.querySelector(".carousel-btn.prev");
    const nextBtn = document.querySelector(".carousel-btn.next");

    const thumbsContainer = document.querySelector(".carousel-thumbs");

    let index = 0;

    function showImage(i){
        images.forEach(img => img.classList.remove("active"));
        thumbs.forEach(t => t.classList.remove("active-thumb"));

        images[i].classList.add("active");

        if (thumbs[i]) {
            thumbs[i].classList.add("active-thumb");

            /* =========================
               FILMSTRIP AUTO-SCROLL (FIX DEFINITIVO)
            ========================= */
            if (thumbsContainer) {

                const containerRect = thumbsContainer.getBoundingClientRect();
                const thumbRect = thumbs[i].getBoundingClientRect();

                const containerScrollLeft = thumbsContainer.scrollLeft;

                const target =
                    containerScrollLeft +
                    (thumbRect.left - containerRect.left) -
                    (containerRect.width / 2) +
                    (thumbRect.width / 2);

                thumbsContainer.scrollTo({
                    left: target,
                    behavior: "smooth"
                });
            }
        }

        index = i;
    }

    function next(){
        index = (index + 1) % images.length;
        showImage(index);
    }

    function prev(){
        index = (index - 1 + images.length) % images.length;
        showImage(index);
    }

    // click bottoni
    if (nextBtn) nextBtn.addEventListener("click", next);
    if (prevBtn) prevBtn.addEventListener("click", prev);

    // click thumbnails → salto diretto
    thumbs.forEach((thumb, i) => {
        thumb.addEventListener("click", () => {
            showImage(i);
        });
    });

    // inizializza
    showImage(0);
});