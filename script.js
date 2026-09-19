console.log("SCRIPT.JS LOADED");

window.adobeDataLayer = window.adobeDataLayer || [];

window.addEventListener("click", function (event) {

    console.log("CLICK DETECTED");
    console.log("TARGET:", event.target);

    /*
     * Find the element actually underneath the mouse pointer.
     * This handles cases where event.target is a parent section.
     */

    var element = document.elementFromPoint(
        event.clientX,
        event.clientY
    );

    console.log("ELEMENT AT CLICK:", element);

    /*
     * Find nearest link or button
     */

    if (element) {
        element = element.closest("a, button");
    }

    if (!element) {
        console.log("NOT A LINK OR BUTTON");
        return;
    }

    console.log("CLICKABLE ELEMENT:", element);

    /*
     * Get click details
     */

    var clickText = (
        element.innerText ||
        element.textContent ||
        ""
    ).trim();

    var clickId = element.id || "";

    var clickClass =
        typeof element.className === "string"
            ? element.className
            : "";

    var clickURL = element.href || "";

    /*
     * Push Adobe Data Layer event
     */

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

    window.adobeDataLayer.push(data);

    console.log("ADOBE DATALAYER EVENT PUSHED");

    console.log(data);

    console.log(
        "CURRENT DATALAYER:",
        window.adobeDataLayer
    );

}, true);

console.log("CLICK TRACKING INITIALIZED");
