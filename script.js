/* ==========================================================================
   2. CTA / BUTTON CLICK
   ========================================================================== */

function trackButtonClick(button) {

  if (!button) {
    return;
  }

  var text =
    (button.innerText || button.textContent || "").trim();

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


  pushAdobeDataLayer({

    event: "buttonClick",

    click: {

      clickText: text,

      clickId: id,

      clickClass: classes,

      clickURL: href,

      pageName: getPageName()

    },

    page: getPageData(),

    product: productId
      ? {

          productID: productId,

          productName: productName,

          price: productPrice
            ? Number(productPrice)
            : undefined,

          category: productCategory

        }

      : undefined

  });


  /* ---------------------------------------
     CTA EVENT
     --------------------------------------- */

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
              : undefined,

            category: productCategory

          }

        : undefined

    });

  }

}


/* ==========================================================================
   3. LINK CLICK
   ========================================================================== */

function trackLinkClick(link) {

  if (!link) {
    return;
  }

  pushAdobeDataLayer({

    event: "linkClick",

    click: {

      clickText:
        (link.innerText || link.textContent || "").trim(),

      clickURL:
        link.href || "",

      clickId:
        link.id || "",

      clickClass:
        typeof link.className === "string"
          ? link.className
          : "",

      pageName:
        getPageName()

    },

    page:
      getPageData()

  });

}


/* ==========================================================================
   4. PRODUCT CLICK
   ========================================================================== */

function trackProductClick(card) {

  if (!card) {
    return;
  }

  var productId =
    card.getAttribute("data-id");

  if (!productId) {
    return;
  }

  var product =
    typeof getProductById === "function"
      ? getProductById(productId)
      : null;

  if (!product) {
    return;
  }

  pushAdobeDataLayer({

    event: "productClick",

    product: {

      productID: product.id,

      productName: product.name,

      category: product.category,

      price: product.price

    },

    page:
      getPageData()

  });

}


/* ==========================================================================
   GLOBAL CLICK TRACKING
   ========================================================================== */

document.addEventListener(
  "click",
  function(event) {

    var element =
      event.target.closest("a, button");

    if (!element) {
      return;
    }


    /* -----------------------------------
       BUTTON
       ----------------------------------- */

    if (element.tagName === "BUTTON") {

      trackButtonClick(element);

    }


    /* -----------------------------------
       LINK
       ----------------------------------- */

    if (element.tagName === "A") {

      trackLinkClick(element);

    }


    /* -----------------------------------
       PRODUCT CARD
       ----------------------------------- */

    var card =
      element.closest(".card[data-id]");

    if (
      card &&
      !element.closest(".card__btn")
    ) {

      trackProductClick(card);

    }

  }
);
