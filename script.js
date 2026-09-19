/* ============================================================
   NORRLAND - SIMPLE ADOBE DATA LAYER CLICK TEST
   ============================================================ */

console.log("========================================");
console.log("NORRLAND SCRIPT.JS STARTED");
console.log("========================================");


/* ============================================================
   ADOBE DATA LAYER
   ============================================================ */

window.adobeDataLayer = window.adobeDataLayer || [];

console.log(
    "Adobe Data Layer:",
    window.adobeDataLayer
);


/* ============================================================
   CLICK TRACKING
   ============================================================ */

document.addEventListener("click", function (event) {

    console.log("----------------------------------------");
    console.log("CLICK DETECTED");
    console.log("Clicked element:", event.target);


    /* Find button, link or CTA */

    var element = event.target.closest(
        "button, a, .btn, .card__btn"
    );


    console.log(
        "Trackable element:",
        element
    );


    if (!element) {

        console.log(
            "No button/link/CTA found"
        );

        return;
    }


    /* ========================================================
       CLICK INFORMATION
       ======================================================== */

    var clickText =
        (
            element.innerText ||
            element.textContent ||
            ""
        ).trim();


    var clickId =
        element.id || "";


    var clickClass =
        typeof element.className === "string"
            ? element.className
            : "";


    var clickURL =
        element.href ||
        element.getAttribute("href") ||
        "";


    /* ========================================================
       DATA LAYER EVENT
       ======================================================== */

    var data = {

        event: "buttonClick",

        click: {

            clickText: clickText,

            clickId: clickId,

            clickClass: clickClass,

            clickURL: clickURL

        },

        page: {

            pageName: document.title,

            pageURL: window.location.href,

            pagePath: window.location.pathname

        }

    };


    console.log(
        "PUSHING EVENT:",
        data
    );


    /* ========================================================
       PUSH TO ADOBE DATA LAYER
       ======================================================== */

    window.adobeDataLayer.push(data);


    console.log(
        "EVENT PUSHED SUCCESSFULLY"
    );


    console.log(
        "Adobe Data Layer:",
        window.adobeDataLayer
    );


    console.log("----------------------------------------");

});


/* ============================================================
   SCRIPT LOADED
   ============================================================ */

console.log("========================================");
console.log("NORRLAND SCRIPT.JS LOADED SUCCESSFULLY");
console.log("========================================");
