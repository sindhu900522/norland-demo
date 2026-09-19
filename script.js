/* ============================================================
   NORRLAND - CLICK TRACKING
   ============================================================ */

console.log("SCRIPT.JS LOADED");

window.adobeDataLayer = window.adobeDataLayer || [];


/* ============================================================
   CLICK LISTENER
   ============================================================ */

document.addEventListener("click", function (event) {

    console.log("CLICK WORKED");
    console.log("Clicked element:", event.target);


    /* Find the actual link/button */

    var element = event.target.closest("a, button, .btn");

    console.log("Tracking element:", element);


    if (!element) {

        console.log("No trackable element");

        return;

    }


    /* ========================================================
       GET CLICK DATA
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
       CREATE EVENT
       ======================================================== */

    var eventData = {

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


    console.log("EVENT CREATED:");
    console.log(eventData);


    /* ========================================================
       PUSH TO ADOBE DATA LAYER
       ======================================================== */

    window.adobeDataLayer.push(eventData);


    console.log("EVENT PUSHED");

    console.log(
        "DATA LAYER:",
        window.adobeDataLayer
    );

});
