console.log("SCRIPT.JS LOADED");

window.adobeDataLayer = window.adobeDataLayer || [];

window.addEventListener("click", function (event) {

    console.log("CLICK DETECTED");
    console.log("TARGET:", event.target);

    var element = event.target;

    while (
        element &&
        element !== document &&
        element.tagName !== "A" &&
        element.tagName !== "BUTTON"
    ) {
        element = element.parentElement;
    }

    if (!element || element === document) {
        console.log("NOT A LINK OR BUTTON");
        return;
    }

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
    console.log(window.adobeDataLayer);

}, true);

console.log("CLICK TRACKING INITIALIZED");
