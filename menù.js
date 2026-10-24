
document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
       CONFIGURAZIONE UNICA DEL MENU
    ====================================== */

    const menuData = [
        {
            title: "DOCUMENTARY",
            children: [
                {
                    label: "FATTORE UMANO",
                    href: "fattore_umano.html"
                },
                {
                    label: "YOUNG ROOTS: back to old trades",
                    href: "young_roots.html"
                }
            ]
        },
        {
            title: "COMMITTED",
            children: [
                {
                    label: "LEGAMBIENTE - DIVERSAMENTE MARINAI",
                    href: "legambiente.html"
                },
                {
                    label: "ARTKADEMY - ISTITUTO SVIZZERO",
                    href: "artkademy.html"
                },
                {
                    label: "DAR CASA",
                    href: "dar_casa.html"
                },
                {
                    label: "SOS - VILLAGGIO DEI BAMBINI",
                    href: "sos.html"
                },
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
                }
            ]
        },
        {
            title: "NEWS",
            children: [
                {
                    label: "NO TAV",
                    href: "no_tav.html"
                },
                {
                    label: "MANIFESTAZIONI PRO PAL",
                    href: "pro_pal.html"
                },
                {
                    label: "QUE VIVA ASKATASUNA",
                    href: "aska.html"
                },
                {
                    label: "NON UNA DI MENO - Milano",
                    href: "num_milano.html"
                },
                {
                    label: "NON UNA DI MENO - Roma",
                    href: "num_roma.html"
                },
                {
                    label: "BLACK LIVES MATTER",
                    href: "black_lives_matter.html"
                }
            ]
        },
        {
            title: "PERSONAL",
            children: [
                {
                    label: "ANAESTHETIC BEAUTY",
                    href: "anaesthetic_beauty.html"
                },
                {
                    label: "CARTOLINE D'ARCHIVIO",
                    href: "cartoline_d_archivio.html"
                },
                {
                    label: "FLUIDO AEREO",
                    href: "fluido_aereo.html"
                }
            ]
        },
        {
            title: "PORTRAITS"
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
       ELEMENTI HTML
    ====================================== */

    const menu = document.getElementById("site-menu");
    const secondary = document.getElementById("site-secondary");

    if (!menu || !secondary) return;

    /* ======================================
       CREA UN LINK
    ====================================== */

    function createLink(item, className = "") {
        const li = document.createElement("li");
        li.className = "menu-section";

        const link = document.createElement("a");
        link.href = item.href;
        link.textContent = item.label;

        if (className) {
            link.className = className;
        }

        li.appendChild(link);

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

        button.appendChild(title);

        // Le sezioni senza sottovoci, come PORTRAITS,
        // mantengono il comportamento del menu originale.
        if (!item.children || item.children.length === 0) {
            const arrow = document.createElement("span");
            arrow.className = "menu-arrow";
            arrow.textContent = ">";

            button.appendChild(arrow);
            li.appendChild(button);

            return li;
        }

        const arrow = document.createElement("span");
        arrow.className = "menu-arrow";
        arrow.textContent = ">";

        button.appendChild(arrow);
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

        // Apre o chiude soltanto la sezione cliccata.
        button.addEventListener("click", () => {
            const isOpen = li.classList.toggle("open");

            button.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
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

    // Mantiene lo spazio presente tra PORTRAITS
    // e PORTFOLIO nel menu originale.
    const spacer = document.createElement("li");
    spacer.className = "menu-spacer";
    spacer.setAttribute("aria-hidden", "true");

    menu.appendChild(spacer);

    mainLinks.forEach(item => {
        menu.appendChild(createLink(item, "menu-main-link"));
    });

    /* ======================================
       GENERA IL MENU SECONDARIO
    ====================================== */

    secondary.replaceChildren();

    secondaryLinks.forEach(item => {
        const link = document.createElement("a");
        link.href = item.href;
        link.textContent = item.label;

        secondary.appendChild(link);
    });

    /* ======================================
       PAGINA ATTIVA E SEZIONI GENITRICI
    ====================================== */

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    menu.querySelectorAll("a[href]").forEach(link => {
        const href = link.getAttribute("href");

        if (href !== currentPage) return;

        link.classList.add("active");

        // Apre anche tutte le sezioni genitrici
        // del link attivo, comprese quelle annidate.
        let parent = link.closest(".menu-section");

        while (parent) {
            parent.classList.add("open");

            const button = Array.from(parent.children).find(
                child => child.classList.contains("menu-toggle")
            );

            if (button) {
                button.setAttribute("aria-expanded", "true");
            }

            const parentList = parent.parentElement;

            parent = parentList
                ? parentList.closest(".menu-section")
                : null;
        }
    });

    /* ======================================
       MENU MOBILE
    ====================================== */

    const hamburger = document.getElementById("hamburger");
    const sidebar = document.getElementById("sidebar");

    if (hamburger && sidebar) {
        hamburger.setAttribute("aria-expanded", "false");

        hamburger.addEventListener("click", () => {
            const isOpen = sidebar.classList.toggle("open");

            hamburger.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        });
    }

});
