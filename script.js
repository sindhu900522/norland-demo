```javascript
/* =========================================================
   NORRLAND - Adobe Data Layer
   Final Click Tracking
   ========================================================= */

(function () {

    console.log("SCRIPT.JS LOADED");

    /* -----------------------------------------------------
       Create Adobe Data Layer
       ----------------------------------------------------- */

    window.adobeDataLayer = window.adobeDataLayer || [];


    /* -----------------------------------------------------
       Click Tracking
       Uses capture phase so clicks are detected even when
       another script handles/stops the click later.
       ----------------------------------------------------- */

    window.addEventListener(
        "click",
        function (event) {

            console.log("CLICK DETECTED");

            var element = event.target;

            /* Find nearest clickable element */
            while (
                element &&
                element !== document &&
                element.tagName !== "A" &&
                element.tagName !== "BUTTON"
            ) {
                element = element.parentElement;
            }

            if (!element || element === document) {
                console.log("Clicked element is not a link/button");
                return;
            }


            /* -------------------------------------------------
               Get click details
               ------------------------------------------------- */

            var clickText =
                (element.innerText || element.textContent || "")
                    .trim();

            var clickId =
                element.id || "";

            var clickClass =
                typeof element.className === "string"
                    ? element.className
                    : "";

            var clickURL =
                element.href || "";


            /* -------------------------------------------------
               Determine click type
               ------------------------------------------------- */

            var clickType = "link";

            if (
                element.tagName.toLowerCase() === "button" ||
                element.classList.contains("btn")
            ) {
                clickType = "button";
            }


            /* -------------------------------------------------
               Push event to Adobe Data Layer
               ------------------------------------------------- */

            var dataLayerEvent = {

                event: "buttonClick",

                click: {

                    clickText: clickText,

                    clickId: clickId,

                    clickClass: clickClass,

                    clickURL: clickURL,

                    clickType: clickType

                },

                page: {

                    pageName: document.title,

                    pageURL: window.location.href,

                    pagePath: window.location.pathname

                }

            };


            window.adobeDataLayer.push(dataLayerEvent);


            /* -------------------------------------------------
               Console validation
               ------------------------------------------------- */

            console.log("ADOBE DATALAYER EVENT PUSHED");

            console.log(dataLayerEvent);

            console.log(
                "Current Adobe Data Layer:",
                window.adobeDataLayer
            );

        },

        true
    );


    /* -----------------------------------------------------
       Confirm listener is installed
       ----------------------------------------------------- */

    console.log("CLICK TRACKING INITIALIZED");

})();
```
