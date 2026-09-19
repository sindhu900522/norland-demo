/* =========================================================
   NORRLAND - ADOBE DATA LAYER CLICK TRACKING
   ========================================================= */

console.log("SCRIPT.JS LOADED");

window.adobeDataLayer = window.adobeDataLayer || [];


/* =========================================================
   CLICK TRACKING
   ========================================================= */

document.addEventListener("click", function (event) {

    console.log("CLICK EVENT FIRED");
    console.log("Clicked element:", event.target);


    /* -----------------------------------------------------
       Find the clicked CTA/button/link
       ----------------------------------------------------- */

    var element = event.target.closest("a, button");


    if (!element) {
        console.log("Not a button or link");
        return;
    }


    console.log("CLICKABLE ELEMENT:", element);


    /* -----------------------------------------------------
       Get click information
       ----------------------------------------------------- */

    var clickText = element.textContent
        ? element.textContent.trim()
        : "";

    var clickId = element.id || "";

    var clickClass = element.className || "";

    var clickURL = element.href || "";


    /* -----------------------------------------------------
       Push to Adobe Data Layer
       ----------------------------------------------------- */

    window.adobeDataLayer.push({

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

    });


    /* -----------------------------------------------------
       Console validation
       ----------------------------------------------------- */

    console.log("BUTTON CLICK TRACKED");

    console.log({
        clickText: clickText,
        clickId: clickId,
        clickClass: clickClass,
        clickURL: clickURL
    });

    console.log(
        "ADOBE DATA LAYER:",
        window.adobeDataLayer
    );

});
