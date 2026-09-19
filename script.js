console.log("SCRIPT.JS LOADED");

window.adobeDataLayer = window.adobeDataLayer || [];

document.addEventListener("click", function (event) {

    console.log("CLICK DETECTED");
    console.log("TARGET:", event.target);

    var element = event.target.closest("a, button");

    if (!element) {
        console.log("NOT A LINK OR BUTTON");
        return;
    }

    console.log("CLICKABLE ELEMENT:", element);

    var clickText =
        (element.innerText || element.textContent || "").trim();

    var clickId =
        element.id || "";

    var clickClass =
        typeof element.className === "string"
            ? element.className
            : "";

    var clickURL =
        element.href || "";

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

    console.log("PUSHING EVENT:", data);

    window.adobeDataLayer.push(data);

    console.log("ADOBE DATA LAYER:", window.adobeDataLayer);

});
