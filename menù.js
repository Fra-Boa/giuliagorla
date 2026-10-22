
document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
       STRUTTURA DEL MENU
    ====================================== */

    const menuData = [
        {
            title: "DOCUMENTARY",
            children: [
                { label: "FATTORE UMANO", href: "fattore_umano.html" },
                { label: "YOUNG ROOTS: back to old trades", href: "young_roots.html" }
            ]
        },
        {
            title: "COMMITTED",
            children: [
                {
                    title: "CROCE ROSSA ITALIANA",
                    children: [
                        {
                            label: "Hotel CRI le Baleari - accoglienza profughi Ucraini",
                            href: "CRI.html"
                        },
                        {
                            label: "Missione Evacuazione Ucraina - arrivo",
                            href: "leopoli.html"
                        }
                    ]
                },
                { label: "DAR CASA", href: "dar_casa.html" },
                { label: "SOS - VILLAGGIO DEI BAMBINI", href: "sos.html" },
                { label: "LEGAMBIENTE - DIVERSAMENTE MARINAI", href: "legambiente.html" },
                { label: "ARTKADEMY - ISTITUTO SVIZZERO", href: "artkademy.html" }
            ]
        },
        {
            title: "NEWS",
            children: [
                { label: "BLACK LIVES MATTER", href: "black_lives_matter.html" },
                { label: "NON UNA DI MENO - Roma", href: "num_roma.html" },
                { label: "NON UNA DI MENO - Milano", href: "num_milano.html" },
                { label: "QUE VIVA ASKATASUNA", href: "aska.html" },
                { label: "MANIFESTAZIONI PRO PAL", href: "pro_pal.html" },
                { label: "NO TAV", href: "no_tav.html" }
            ]
        },
        {
            title: "PERSONAL",
            children: [
                { label: "ANAESTHETIC BEAUTY", href: "anaesthetic_beauty.html" },
                { label: "CARTOLINE D'ARCHIVIO", href: "cartoline_d_archivio.html" },
                { label: "FLUIDO AEREO", href: "fluido_aereo.html" }
            ]
        }
    ];

    const mainLinks = [
        { label: "PORTFOLIO", href: "portfolio.html" },
        { label: "TEARSHEET", href: "tearsheets.html" }
    ];

    const secondaryLinks = [
        { label: "About", href: "about.html" },
        { label: "Email", href: "mailto:info@giuliagorla.com" },
        {
            label: "Instagram",
            href: "https://www.instagram.com/giuliagoagorla_?igsh=MWZlZzcwdzlnaTl1eg=="
        }
    ];

    /* ======================================
       ELEMENTI DEL MENU
    ====================================== */

    const menu = document.getElementById("site-menu");
    const secondary = document.getElementById("site-secondary");

    if (!menu || !secondary) return;

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    /* ======================================
       CREA UN LINK
    ====================================== */

    function createLink(item, className = "") {
        const li = document.createElement("li");
        li.className = "menu-section";

        const a = document.createElement("a");
        a.href = item.href;
        a.textContent = item.label;

        if (className) a.className = className;

        li.appendChild(a);

        return li;
    }

    /* ======================================
       CREA UNA SEZIONE
    ====================================== */

    function createSection(item) {
        const li = document.createElement("li");
        li.className = "menu-section";

        const button = document.createElement("button");
        button.type = "button";
        button.className = "menu-toggle";
        button.setAttribute("aria-expanded", "false");

        const title = document.createElement("span");
        title.textContent = item.title;

        const arrow = document.createElement("span");
        arrow.className = "menu-arrow";
        arrow.textContent = ">";

        button.append(title, arrow);
        li.appendChild(button);

        const submenu = document.createElement("ul");
        submenu.className = "submenu";

        item.children.forEach(child => {
            if (child.children) {
                submenu.appendChild(createSection(child));
            } else {
                submenu.appendChild(createLink(child));
            }
        });

        li.appendChild(submenu);

        // Apertura/chiusura del sottomenu
        button.addEventListener("click", () => {
            const isOpen = li.classList.toggle("open");
            button.setAttribute("aria-expanded", String(isOpen));
        });

        return li;
    }

    /* ======================================
       GENERA IL MENU PRINCIPALE
    ====================================== */

    menu.replaceChildren();

    menuData.forEach(item => {
        menu.appendChild(createSection(item));
    });

    // Spazio prima di Portfolio e Tearsheet
    const spacer = document.createElement("li");
    spacer.className = "menu-spacer";
    spacer.setAttribute("aria-hidden", "true");
    menu.appendChild(spacer);

    mainLinks.forEach(item => {
        menu.appendChild(createLink(item, "menu-main-link"));
    });

    /* ======================================
       LINK SECONDARI
    ====================================== */

    secondary.replaceChildren();

    secondaryLinks.forEach(item => {
        const a = document.createElement("a");
        a.href = item.href;
        a.textContent = item.label;

        secondary.appendChild(a);
    });

    /* ======================================
       PAGINA ATTIVA + APERTURA GENITORI
    ====================================== */

    menu.querySelectorAll("a[href]").forEach(link => {
        const href = link.getAttribute("href");

        if (href !== currentPage) return;

        link.classList.add("active");

        let parent = link.closest(".menu-section");

        while (parent) {
            parent.classList.add("open");

            const button = Array.from(parent.children).find(
                child => child.classList.contains("menu-toggle")
            );

            if (button) {
                button.setAttribute("aria-expanded", "true");
            }

            parent = parent.parentElement.closest(".menu-section");
        }
    });

    /* ======================================
       MENU MOBILE
    ====================================== */

    const hamburger = document.getElementById("hamburger");
    const sidebar = document.getElementById("sidebar");

    if (hamburger && sidebar) {
        hamburger.addEventListener("click", () => {
            const isOpen = sidebar.classList.toggle("open");
            hamburger.setAttribute("aria-expanded", String(isOpen));
        });
    }

});
