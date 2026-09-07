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



/* =========================
   LIGHTBOX GALLERY
   ========================= */

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");

const closeButton = document.getElementById("lightbox-close");
const prevButton = document.getElementById("lightbox-prev");
const nextButton = document.getElementById("lightbox-next");

const galleryImages = document.querySelectorAll(
    ".gallery img, .gallery-featured, .fattore-grid img"
);

let currentImage = 0;


/* CONTROLLA SE IL LIGHTBOX ESISTE */

if (
    lightbox &&
    lightboxImage &&
    closeButton &&
    prevButton &&
    nextButton &&
    galleryImages.length > 0
) {


    /* =========================
       APRI LIGHTBOX
       ========================= */

    galleryImages.forEach((image, index) => {

        image.addEventListener("click", () => {

            currentImage = index;

            showImage();

            lightbox.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });


    /* =========================
       MOSTRA FOTO
       ========================= */

    function showImage(){

        const image = galleryImages[currentImage];

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

    }


    /* =========================
       FOTO SUCCESSIVA
       ========================= */

    function nextImage(){

        currentImage++;

        if(currentImage >= galleryImages.length){
            currentImage = 0;
        }

        showImage();

    }


    /* =========================
       FOTO PRECEDENTE
       ========================= */

    function previousImage(){

        currentImage--;

        if(currentImage < 0){
            currentImage = galleryImages.length - 1;
        }

        showImage();

    }


    /* =========================
       PULSANTE NEXT
       ========================= */

    nextButton.addEventListener("click", (event) => {

        event.stopPropagation();

        nextImage();

    });


    /* =========================
       PULSANTE PREV
       ========================= */

    prevButton.addEventListener("click", (event) => {

        event.stopPropagation();

        previousImage();

    });


    /* =========================
       CHIUDI LIGHTBOX
       ========================= */

    function closeLightbox(){

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

    }


    closeButton.addEventListener("click", (event) => {

        event.stopPropagation();

        closeLightbox();

    });


    /* =========================
       CLIC FUORI DALLA FOTO
       ========================= */

    lightbox.addEventListener("click", (event) => {

        if(event.target === lightbox){

            closeLightbox();

        }

    });


    /* =========================
       TASTIERA
       ========================= */

    document.addEventListener("keydown", (event) => {

        if(!lightbox.classList.contains("active")){
            return;
        }

        if(event.key === "Escape"){
            closeLightbox();
        }

        if(event.key === "ArrowRight"){
            nextImage();
        }

        if(event.key === "ArrowLeft"){
            previousImage();
        }

    });

}






/* ==========================================================
   FATTORE UMANO — JUSTIFIED GALLERY
   ========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const gallery = document.querySelector(".fattore-grid");

    if (!gallery) return;

    const images = Array.from(
        gallery.querySelectorAll(":scope > img")
    );

    if (!images.length) return;


    /*
       Composizione delle righe.

       Ogni numero corrisponde alla classe
       g1, g2, g3 ecc.
    */

    const rows = [
        ["g1", "g2", "g3"],
        ["g4", "g5", "g6"],
        ["g7", "g8", "g9"],
        ["g10", "g11", "g12"],
        ["g13", "g14", "g15"],
        ["g16", "g17", "g18"],
        ["g19", "g20"]
    ];


    /*
       Creiamo automaticamente le righe.
    */

    rows.forEach(function (rowClasses) {

        const row = document.createElement("div");

        row.className = "fattore-row";

        rowClasses.forEach(function (className) {

            const image = images.find(function (img) {
                return img.classList.contains(className);
            });

            if (image) {
                row.appendChild(image);
            }

        });

        gallery.appendChild(row);

    });


    /*
       Calcola la composizione perfetta.
    */

    function layoutGallery() {

        const allRows = gallery.querySelectorAll(".fattore-row");

        /*
           Su mobile lasciamo che ogni immagine
           occupi tutta la larghezza.
        */

        if (window.innerWidth <= 900) {

            allRows.forEach(function (row) {

                row.style.height = "auto";

                const rowImages = row.querySelectorAll("img");

                rowImages.forEach(function (img) {

                    img.style.width = "100%";
                    img.style.height = "auto";

                });

            });

            return;
        }


        /*
           DESKTOP
        */

        allRows.forEach(function (row) {

            const rowImages = Array.from(
                row.querySelectorAll("img")
            );

            if (!rowImages.length) return;


            /*
               Recuperiamo il rapporto originale
               di ogni fotografia.
            */

            const ratios = rowImages.map(function (img) {

                if (!img.naturalWidth || !img.naturalHeight) {
                    return 1;
                }

                return img.naturalWidth / img.naturalHeight;

            });


            /*
               Somma dei rapporti.

               Esempio:

               verticale + orizzontale + orizzontale

               0.66 + 1.50 + 1.50
            */

            const totalRatio = ratios.reduce(
                function (sum, ratio) {
                    return sum + ratio;
                },
                0
            );


            /*
               Larghezza reale disponibile.
            */

            const rowWidth = gallery.clientWidth;


            /*
               Altezza perfetta della riga.

               Se:

               larghezza = 1000px
               rapporto totale = 3.66

               allora:

               altezza = 1000 / 3.66
            */

            const rowHeight = rowWidth / totalRatio;


            /*
               Impostiamo l'altezza della riga.
            */

            row.style.height = rowHeight + "px";


            /*
               Calcoliamo la larghezza esatta
               di ogni fotografia.
            */

            rowImages.forEach(function (img, index) {

                const imageWidth =
                    ratios[index] * rowHeight;

                img.style.height = rowHeight + "px";
                img.style.width = imageWidth + "px";

            });

        });

    }


    /*
       Aspettiamo che le fotografie abbiano
       caricato le loro dimensioni originali.
    */

    let loadedImages = 0;

    images.forEach(function (img) {

        if (img.complete && img.naturalWidth) {

            loadedImages++;

        } else {

            img.addEventListener(
                "load",
                function () {

                    loadedImages++;

                    if (loadedImages === images.length) {
                        layoutGallery();
                    }

                },
                { once:true }
            );

        }

    });


    /*
       Se tutte erano già caricate.
    */

    if (loadedImages === images.length) {
        layoutGallery();
    }


    /*
       Ricalcoliamo tutto quando cambia
       la larghezza della finestra.
    */

    let resizeTimer;

    window.addEventListener("resize", function () {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(function () {

            layoutGallery();

        }, 100);

    });

});

/* ==========================================================
   CAROSELLO FOTO VERTICALI
   ========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const carousel =
        document.querySelector(".vertical-carousel");

    if (!carousel) return;

    const viewport =
        carousel.querySelector(
            ".vertical-carousel-viewport"
        );

    const track =
        carousel.querySelector(
            ".vertical-carousel-track"
        );

    const images =
        Array.from(
            track.querySelectorAll("img")
        );

    const prevButton =
        carousel.querySelector(
            ".vertical-carousel-btn.prev"
        );

    const nextButton =
        carousel.querySelector(
            ".vertical-carousel-btn.next"
        );

    let index = 0;


    /* ======================================================
       DIMENSIONI
       ====================================================== */

    function updateDimensions(){

        const carouselWidth =
            viewport.getBoundingClientRect().width;

        const trackStyle =
            window.getComputedStyle(track);

        const gap =
            parseFloat(trackStyle.columnGap) || 0;


        /*
           VOGLIAMO 4 FOTO PRECISE
           visibili contemporaneamente.
        */

        const visibleImages = 4;

        const totalGaps =
            gap * (visibleImages - 1);


        /*
           Larghezza disponibile per ogni foto.
        */

        const imageWidth =
            (carouselWidth - totalGaps) /
            visibleImages;


        /*
           Manteniamo la proporzione originale
           delle fotografie.
        */

        images.forEach(function(img){

            img.style.width =
                imageWidth + "px";

            img.style.height =
                "300px";

        });


        return imageWidth + gap;
    }


    /* ======================================================
       AGGIORNA CAROUSEL
       ====================================================== */

    function updateCarousel(){

        const step =
            updateDimensions();

        track.style.transform =
            `translate3d(-${index * step}px, 0, 0)`;

    }


    /* ======================================================
       NEXT
       ====================================================== */

    function next(){

        const maxIndex =
            Math.max(0, images.length - 4);


        if(index < maxIndex){

            index++;

        }else{

            /*
               Arrivati alla fine,
               torniamo all'inizio.
            */

            index = 0;

        }

        updateCarousel();

    }


    /* ======================================================
       PREV
       ====================================================== */

    function prev(){

        if(index > 0){

            index--;

        }else{

            /*
               Se siamo all'inizio,
               torniamo all'ultima posizione.
            */

            index =
                Math.max(0, images.length - 4);

        }

        updateCarousel();

    }


    /* ======================================================
       BOTTONI
       ====================================================== */

    if(nextButton){

        nextButton.addEventListener(
            "click",
            next
        );

    }

    if(prevButton){

        prevButton.addEventListener(
            "click",
            prev
        );

    }


    /* ======================================================
       SWIPE MOBILE
       ====================================================== */

    let startX = 0;
    let startY = 0;


    viewport.addEventListener(
        "touchstart",
        function(event){

            startX =
                event.touches[0].clientX;

            startY =
                event.touches[0].clientY;

        },
        { passive:true }
    );


    viewport.addEventListener(
        "touchend",
        function(event){

            const endX =
                event.changedTouches[0].clientX;

            const endY =
                event.changedTouches[0].clientY;


            const differenceX =
                endX - startX;

            const differenceY =
                endY - startY;


            if(
                Math.abs(differenceX) > 40 &&
                Math.abs(differenceX) >
                Math.abs(differenceY)
            ){

                if(differenceX < 0){

                    next();

                }else{

                    prev();

                }

            }

        },
        { passive:true }
    );


    /* ======================================================
       RESIZE
       ====================================================== */

    let resizeTimer;

    window.addEventListener(
        "resize",
        function(){

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(
                function(){

                    updateCarousel();

                },
                100
            );

        }
    );


    /* ======================================================
       AVVIO
       ====================================================== */

    setTimeout(
        function(){

            updateCarousel();

        },
        50
    );

});