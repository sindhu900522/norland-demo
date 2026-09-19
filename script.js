/* ==========================================================================
   NORRLAND - ADOBE DATA LAYER
   Simple Click Tracking Version
   ========================================================================== */


/* ==========================================================================
   1. ADOBE DATA LAYER
   ========================================================================== */

window.adobeDataLayer = window.adobeDataLayer || [];


/* ==========================================================================
   2. PUSH EVENT TO ADOBE DATA LAYER
   ========================================================================== */

function pushAdobeDataLayer(data) {

    console.log("====================================");
    console.log("ADOBE DATA LAYER EVENT");
    console.log(data);
    console.log("====================================");

    window.adobeDataLayer.push(data);

}


/* ==========================================================================
   3. PAGE DATA
   ========================================================================== */

function getPageData() {

    return {

        pageName: document.title || window.location.pathname,

        pageURL: window.location.href,

        pagePath: window.location.pathname,

        pageTitle: document.title

    };

}


/* ==========================================================================
   4. BUTTON / CTA CLICK
   ========================================================================== */

function trackButtonClick(button) {

    if (!button) {

        return;

    }


    var text =
        (button.innerText ||
         button.textContent ||
         "").trim();


    var id =
        button.id || "";


    var classes =
        typeof button.className === "string"
            ? button.className
            : "";


    var href =
        button.getAttribute("href") || "";


    var productId =
        button.getAttribute("data-product-id") || "";


    var productName =
        button.getAttribute("data-product-name") || "";


    var productPrice =
        button.getAttribute("data-product-price") || "";


    var productCategory =
        button.getAttribute("data-product-category") || "";


    /* ------------------------------------------------------------------
       BUTTON CLICK
       ------------------------------------------------------------------ */

    pushAdobeDataLayer({

        event: "buttonClick",

        click: {

            clickText: text,

            clickId: id,

            clickClass: classes,

            clickURL: href

        },

        page: getPageData(),

        product: productId
            ? {

                productID: productId,

                productName: productName,

                price: productPrice
                    ? Number(productPrice)
                    : "",

                category: productCategory

            }
            : null

    });


    /* ------------------------------------------------------------------
       CTA CLICK
       ------------------------------------------------------------------ */

    if (

        button.classList.contains("btn") ||

        button.classList.contains("card__btn")

    ) {

        pushAdobeDataLayer({

            event: "ctaClick",

            cta: {

                ctaText: text,

                ctaURL: href,

                ctaID: id,

                ctaClass: classes

            },

            page: getPageData(),

            product: productId
                ? {

                    productID: productId,

                    productName: productName,

                    price: productPrice
                        ? Number(productPrice)
                        : "",

                    category: productCategory

                }
                : null

        });

    }

}


/* ==========================================================================
   5. LINK CLICK
   ========================================================================== */

function trackLinkClick(link) {

    if (!link) {

        return;

    }


    var text =
        (link.innerText ||
         link.textContent ||
         "").trim();


    var id =
        link.id || "";


    var classes =
        typeof link.className === "string"
            ? link.className
            : "";


    var href =
        link.href || "";


    pushAdobeDataLayer({

        event: "linkClick",

        click: {

            clickText: text,

            clickURL: href,

            clickId: id,

            clickClass: classes

        },

        page: getPageData()

    });

}


/* ==========================================================================
   6. PRODUCT CARD CLICK
   ========================================================================== */

function trackProductClick(card) {

    if (!card) {

        return;

    }


    var productId =
        card.getAttribute("data-id") || "";


    var productName =
        card.getAttribute("data-product-name") || "";


    var productPrice =
        card.getAttribute("data-product-price") || "";


    var productCategory =
        card.getAttribute("data-product-category") || "";


    /* ------------------------------------------------------------------
       PRODUCT CLICK
       ------------------------------------------------------------------ */

    pushAdobeDataLayer({

        event: "productClick",

        product: {

            productID: productId,

            productName: productName,

            category: productCategory,

            price: productPrice
                ? Number(productPrice)
                : ""

        },

        page: getPageData()

    });

}


/* ==========================================================================
   7. GLOBAL CLICK TRACKING
   ========================================================================== */

document.addEventListener(

    "click",

    function(event) {


        /* --------------------------------------------------------------
           DEBUG
           -------------------------------------------------------------- */

        console.log("CLICK DETECTED");

        console.log("Clicked Element:");

        console.log(event.target);


        /* --------------------------------------------------------------
           FIND CLICKED ELEMENT
           -------------------------------------------------------------- */

        var element =
            event.target.closest(
                "a, button, .btn, .card__btn"
            );


        console.log("Tracking Element:");

        console.log(element);


        if (!element) {

            console.log(
                "No trackable element found."
            );

            return;

        }


        /* ==============================================================
           BUTTON
           ============================================================== */

        if (

            element.tagName === "BUTTON"

        ) {

            console.log(
                "BUTTON CLICK"
            );


            trackButtonClick(element);

        }


        /* ==============================================================
           CTA CLASS
           ============================================================== */

        else if (

            element.classList.contains("btn") ||

            element.classList.contains("card__btn")

        ) {

            console.log(
                "CTA CLICK"
            );


            trackButtonClick(element);

        }


        /* ==============================================================
           LINK
           ============================================================== */

        else if (

            element.tagName === "A"

        ) {

            console.log(
                "LINK CLICK"
            );


            trackLinkClick(element);

        }


        /* ==============================================================
           PRODUCT CARD
           ============================================================== */

        var card =
            element.closest(
                ".card[data-id]"
            );


        if (

            card &&

            !element.classList.contains("card__btn") &&

            !element.classList.contains("btn")

        ) {

            console.log(
                "PRODUCT CARD CLICK"
            );


            trackProductClick(card);

        }


    },

    false

);


/* ==========================================================================
   8. SCRIPT LOADED MESSAGE
   ========================================================================== */

console.log(
    "================================================"
);

console.log(
    "NORRLAND ADOBE DATA LAYER SCRIPT LOADED"
);

console.log(
    "================================================"
);
