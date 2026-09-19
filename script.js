console.log("SCRIPT.JS LOADED");

window.adobeDataLayer = window.adobeDataLayer || [];

document.addEventListener("click", function (event) {

    console.log("CLICK DETECTED");

    var element = event.target.closest("a, button, .btn");

    console.log("ELEMENT:", element);

    if (!element) {
        return;
    }

    var clickData = {
        event: "buttonClick",

        click: {
            clickText: (
                element.innerText ||
                element.textContent ||
                ""
            ).trim(),

            clickId: element.id || "",

            clickClass:
                typeof element.className === "string"
                    ? element.className
                    : "",

            clickURL:
                element.href ||
                element.getAttribute("href") ||
                ""
        },

        page: {
            pageName: document.title,

            pageURL: window.location.href
        }
    };

    console.log("PUSHING:", clickData);

    window.adobeDataLayer.push(clickData);

    console.log(
        "DATA LAYER:",
        window.adobeDataLayer
    );

});
