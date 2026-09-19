console.log("SCRIPT.JS LOADED");

window.adobeDataLayer = window.adobeDataLayer || [];

window.addEventListener("DOMContentLoaded", function () {

    console.log("DOM LOADED");

    var shopNow = document.querySelector('a.btn[href="products.html"]');

    console.log("SHOP NOW ELEMENT:", shopNow);

    if (!shopNow) {
        console.log("SHOP NOW NOT FOUND");
        return;
    }

    shopNow.addEventListener("click", function () {

        console.log("SHOP NOW CLICKED");

        window.adobeDataLayer.push({
            event: "buttonClick",

            click: {
                clickText: this.textContent.trim(),
                clickId: this.id || "",
                clickClass: this.className || "",
                clickURL: this.href || ""
            },

            page: {
                pageName: document.title,
                pageURL: window.location.href,
                pagePath: window.location.pathname
            }
        });

        console.log(
            "DATALAYER AFTER CLICK:",
            window.adobeDataLayer
        );
    });

});
