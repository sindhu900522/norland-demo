/* ==========================================================================
   Norrland — Adobe Data Layer
   Adobe Launch / Adobe Analytics / Adobe Target ready
   ========================================================================== */

window.adobeDataLayer = window.adobeDataLayer || [];


/* ==========================================================================
   PAGE INFORMATION
   ========================================================================== */

function getPageName() {
  return document.title ||
         document.querySelector("h1")?.textContent.trim() ||
         window.location.pathname;
}


function getPageType() {

  var path = window.location.pathname.toLowerCase();

  if (path.includes("products")) {
    return "Product Listing";
  }

  if (path.includes("cart")) {
    return "Cart";
  }

  if (path.includes("checkout")) {
    return "Checkout";
  }

  if (path.includes("contact")) {
    return "Contact";
  }

  if (path.includes("about")) {
    return "About";
  }

  return "Home";
}


function getSiteSection() {

  var path = window.location.pathname.toLowerCase();

  if (path.includes("products")) {
    return "Shop";
  }

  if (path.includes("cart")) {
    return "Cart";
  }

  if (path.includes("checkout")) {
    return "Checkout";
  }

  return "Norrland";
}


function getPageData() {

  return {
    pageName: getPageName(),
    pageURL: window.location.href,
    pagePath: window.location.pathname,
    pageTitle: document.title,
    pageType: getPageType(),
    siteSection: getSiteSection(),
    language: document.documentElement.lang || "en"
  };

}


/* ==========================================================================
   GENERIC DATA LAYER PUSH
   ========================================================================== */

function pushAdobeDataLayer(data) {

  window.adobeDataLayer.push(data);

  console.log(
    "Adobe Data Layer Event:",
    data
  );

}


/* ==========================================================================
   1. PAGE VIEW
   ========================================================================== */

function pushPageData() {

  pushAdobeDataLayer({

    event: "pageView",

    page: getPageData()

  });

}


/* ==========================================================================
   2. GENERIC BUTTON CLICK
   ========================================================================== */

function trackButtonClick(button) {

  if (!button) {
    return;
  }

  var text =
    (button.innerText || button.textContent || "").trim();

  var href =
    button.getAttribute("href") || "";

  var id =
    button.id || "";

  var classes =
    typeof button.className === "string"
      ? button.className
      : "";

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
   5. PRODUCT VIEW / PRODUCT IMPRESSION
   ========================================================================== */

function trackProductView(product) {

  if (!product) {
    return;
  }

  pushAdobeDataLayer({

    event: "productView",

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
   6. PRODUCT LIST IMPRESSIONS
   ========================================================================== */

function trackProductImpressions() {

  if (
    typeof PRODUCTS === "undefined" ||
    !Array.isArray(PRODUCTS)
  ) {
    return;
  }


  var grid =
    document.getElementById("featured-grid") ||
    document.getElementById("product-grid");

  if (!grid) {
    return;
  }


  var cards =
    grid.querySelectorAll(".card[data-id]");


  cards.forEach(function(card) {

    var productId =
      card.getAttribute("data-id");

    var product =
      getProductById(productId);

    if (product) {

      pushAdobeDataLayer({

        event: "productImpression",

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

  });

}


/* ==========================================================================
   7. ADD TO CART
   ========================================================================== */

function addToCart(id, qty) {

  qty = qty || 1;

  var product =
    typeof getProductById === "function"
      ? getProductById(id)
      : null;

  if (!product) {

    console.warn(
      "Unknown product id:",
      id
    );

    return;

  }


  var cart =
    getCart();

  var existing =
    cart.find(function(item) {

      return item.id === id;

    });


  if (existing) {

    existing.qty += qty;

  } else {

    cart.push({

      id: id,

      qty: qty

    });

  }


  saveCart(cart);


  /* ---------------------------------------
     Adobe Data Layer
     --------------------------------------- */

  pushAdobeDataLayer({

    event: "addToCart",

    product: {

      productID: product.id,

      productName: product.name,

      price: product.price,

      category: product.category,

      quantity: qty

    },

    cart: {

      cartQuantity:
        cartTotalCount(),

      cartValue:
        cartTotalPrice()

    },

    page:
      getPageData()

  });


  showToast(
    product.name +
    " added to cart"
  );

}


/* ==========================================================================
   8. REMOVE FROM CART
   ========================================================================== */

function removeFromCart(id) {

  var product =
    typeof getProductById === "function"
      ? getProductById(id)
      : null;


  var cart =
    getCart().filter(function(item) {

      return item.id !== id;

    });


  saveCart(cart);


  if (product) {

    pushAdobeDataLayer({

      event: "removeFromCart",

      product: {

        productID: product.id,

        productName: product.name,

        price: product.price,

        category: product.category

      },

      cart: {

        cartQuantity:
          cartTotalCount(),

        cartValue:
          cartTotalPrice()

      },

      page:
        getPageData()

    });

  }


  renderCartPage();

}


/* ==========================================================================
   9. QUANTITY CHANGE
   ========================================================================== */

function setQty(id, qty) {

  qty =
    parseInt(
      qty,
      10
    );


  var cart =
    getCart();


  var product =
    getProductById(id);


  var item =
    cart.find(function(i) {

      return i.id === id;

    });


  var oldQty =
    item
      ? item.qty
      : 0;


  if (
    isNaN(qty) ||
    qty < 1
  ) {

    cart =
      cart.filter(function(item) {

        return item.id !== id;

      });

  } else {

    if (item) {

      item.qty = qty;

    }

  }


  saveCart(cart);


  if (product) {

    pushAdobeDataLayer({

      event: "cartQuantityChange",

      product: {

        productID: product.id,

        productName: product.name,

        price: product.price,

        category: product.category,

        previousQuantity: oldQty,

        quantity: qty

      },

      cart: {

        cartQuantity:
          cartTotalCount(),

        cartValue:
          cartTotalPrice()

      },

      page:
        getPageData()

    });

  }


  renderCartPage();

}


/* ==========================================================================
   CART STORAGE
   ========================================================================== */

const CART_KEY =
  "norrland_cart";


function getCart() {

  try {

    const raw =
      localStorage.getItem(
        CART_KEY
      );

    return raw
      ? JSON.parse(raw)
      : [];

  } catch (e) {

    console.warn(
      "Could not read cart, resetting.",
      e
    );

    return [];

  }

}


function saveCart(cart) {

  localStorage.setItem(

    CART_KEY,

    JSON.stringify(cart)

  );

  updateCartCount();

}


function cartTotalCount() {

  return getCart().reduce(

    function(sum, item) {

      return sum + item.qty;

    },

    0

  );

}


function cartTotalPrice() {

  var cart =
    getCart();

  var total =
    0;


  cart.forEach(function(item) {

    var product =
      getProductById(item.id);

    if (product) {

      total +=
        product.price *
        item.qty;

    }

  });


  return Number(
    total.toFixed(2)
  );

}


function updateCartCount() {

  var el =
    document.getElementById(
      "cart-count"
    );

  if (el) {

    el.textContent =
      cartTotalCount();

  }

}


/* ==========================================================================
   10. CART VIEW
   ========================================================================== */

function trackCartView() {

  var cart =
    getCart();


  var products =
    cart.map(function(item) {

      var product =
        getProductById(item.id);

      if (!product) {
        return null;
      }


      return {

        productID:
          product.id,

        productName:
          product.name,

        category:
          product.category,

        price:
          product.price,

        quantity:
          item.qty,

        lineTotal:
          Number(
            (
              product.price *
              item.qty
            ).toFixed(2)
          )

      };

    }).filter(Boolean);


  pushAdobeDataLayer({

    event: "cartView",

    cart: {

      products:
        products,

      cartQuantity:
        cartTotalCount(),

      cartValue:
        cartTotalPrice()

    },

    page:
      getPageData()

  });

}


/* ==========================================================================
   PRODUCT CARD RENDERING
   ========================================================================== */

function renderProductCard(product) {

  return (

    '<article class="card" ' +

      'data-id="' +
      product.id +
      '" ' +

      'data-category="' +
      product.category +
      '">' +

      '<div class="card__img">' +

        product.label +

      '</div>' +

      '<div class="card__body">' +

        '<p class="card__eyebrow">' +

          product.category +

        '</p>' +

        '<p class="card__title">' +

          product.name +

        '</p>' +

        '<p class="card__price">$' +

          product.price.toFixed(2) +

        '</p>' +

        '<button ' +

          'class="card__btn" ' +

          'data-product-id="' +
          product.id +
          '" ' +

          'data-product-name="' +
          product.name +
          '" ' +

          'data-product-price="' +
          product.price +
          '" ' +

          'data-product-category="' +
          product.category +
          '" ' +

          'onclick="addToCart(\'' +
          product.id +
          '\', 1)">' +

          'Add to Cart' +

        '</button>' +

      '</div>' +

    '</article>'

  );

}


/* ==========================================================================
   FEATURED PRODUCTS
   ========================================================================== */

function renderFeatured() {

  var grid =
    document.getElementById(
      "featured-grid"
    );

  if (!grid) {
    return;
  }


  var featured =
    PRODUCTS.filter(
      function(p) {

        return p.featured;

      }
    );


  grid.innerHTML =
    featured
      .map(renderProductCard)
      .join("");


  trackProductImpressions();

}


/* ==========================================================================
   PRODUCT GRID
   ========================================================================== */

function renderProductGrid(filterCategory) {

  var grid =
    document.getElementById(
      "product-grid"
    );

  if (!grid) {
    return;
  }


  var list =

    filterCategory &&
    filterCategory !== "All"

      ? PRODUCTS.filter(
          function(p) {

            return (
              p.category ===
              filterCategory
            );

          }
        )

      : PRODUCTS;


  grid.innerHTML =

    list.length

      ? list
          .map(renderProductCard)
          .join("")

      : '<p class="empty-state">' +
        'No products in this category yet.' +
        '</p>';


  trackProductImpressions();

}


/* ==========================================================================
   CATEGORY FILTER
   ========================================================================== */

function renderCategoryFilters() {

  var wrap =
    document.getElementById(
      "category-filters"
    );

  if (!wrap) {
    return;
  }


  var categories =
    ["All"].concat(
      getCategories()
    );


  wrap.innerHTML =

    categories
      .map(function(cat) {

        return (

          '<button ' +

            'class="filter-btn" ' +

            'data-category="' +
            cat +
            '" ' +

            'onclick="selectCategory(\'' +
            cat +
            '\', this)">' +

            cat +

          '</button>'

        );

      })
      .join("");


  var first =
    wrap.querySelector(
      ".filter-btn"
    );


  if (first) {

    first.classList.add(
      "is-active"
    );

  }

}


function selectCategory(
  category,
  btn
) {

  document
    .querySelectorAll(
      ".filter-btn"
    )
    .forEach(function(b) {

      b.classList.remove(
        "is-active"
      );

    });


  if (btn) {

    btn.classList.add(
      "is-active"
    );

  }


  pushAdobeDataLayer({

    event: "filterClick",

    filter: {

      category:
        category,

      pageName:
        getPageName()

    },

    page:
      getPageData()

  });


  renderProductGrid(
    category
  );

}


/* ==========================================================================
   FORM SUBMISSION
   ========================================================================== */

function trackFormSubmit(
  form,
  formName
) {

  pushAdobeDataLayer({

    event: "formSubmit",

    form: {

      formName:
        formName ||
        form.getAttribute("name") ||
        form.id ||
        "unknown",

      pageName:
        getPageName()

    },

    page:
      getPageData()

  });

}


/* ==========================================================================
   NEWSLETTER
   ========================================================================== */

function handleNewsletter(event) {

  event.preventDefault();


  var form =
    event.target;


  var input =
    form.querySelector(
      'input[type="email"]'
    );


  if (
    input &&
    input.value
  ) {

    trackFormSubmit(

      form,

      "Newsletter Subscription"

    );


    showToast(
      "Subscribed with " +
      input.value
    );


    form.reset();

  }


  return false;

}


/* ==========================================================================
   CONTACT FORM
   ========================================================================== */

function handleContact(event) {

  event.preventDefault();


  var form =
    event.target;


  trackFormSubmit(

    form,

    "Contact Form"

  );


  showToast(
    "Message sent — we'll get back to you soon."
  );


  form.reset();


  return false;

}


/* ==========================================================================
   CHECKOUT EVENT
   ========================================================================== */

function trackCheckout() {

  var cart =
    getCart();


  var products =
    cart.map(function(item) {

      var product =
        getProductById(
          item.id
        );

      if (!product) {
        return null;
      }


      return {

        productID:
          product.id,

        productName:
          product.name,

        category:
          product.category,

        price:
          product.price,

        quantity:
          item.qty

      };

    }).filter(Boolean);


  pushAdobeDataLayer({

    event: "checkout",

    ecommerce: {

      products:
        products,

      cartQuantity:
        cartTotalCount(),

      cartValue:
        cartTotalPrice()

    },

    page:
      getPageData()

  });

}


/* ==========================================================================
   PURCHASE EVENT
   ==========================================================================

   Call this ONLY after a successful order.

   Example:

   trackPurchase(
      "ORD12345",
      120.50
   );

   ========================================================================== */

function trackPurchase(
  orderId,
  revenue
) {

  var cart =
    getCart();


  var products =
    cart.map(function(item) {

      var product =
        getProductById(
          item.id
        );

      if (!product) {
        return null;
      }


      return {

        productID:
          product.id,

        productName:
          product.name,

        category:
          product.category,

        price:
          product.price,

        quantity:
          item.qty

      };

    }).filter(Boolean);


  pushAdobeDataLayer({

    event: "purchase",

    transaction: {

      orderID:
        orderId,

      revenue:
        Number(revenue),

      currency:
        "USD"

    },

    ecommerce: {

      products:
        products

    },

    page:
      getPageData()

  });

}


/* ==========================================================================
   TOAST
   ========================================================================== */

function showToast(message) {

  let toast =
    document.getElementById(
      "toast"
    );


  if (!toast) {

    toast =
      document.createElement(
        "div"
      );

    toast.id =
      "toast";

    toast.className =
      "toast";

    document.body.appendChild(
      toast
    );

  }


  toast.textContent =
    message;


  toast.classList.add(
    "toast--visible"
  );


  clearTimeout(
    showToast._t
  );


  showToast._t =
    setTimeout(
      function() {

        toast.classList.remove(
          "toast--visible"
        );

      },
      2200
    );

}


/* ==========================================================================
   NAVIGATION
   ========================================================================== */

function toggleNav() {

  const links =
    document.querySelector(
      ".nav__links"
    );

  if (links) {

    links.classList.toggle(
      "nav__links--open"
    );

  }

}


/* ==========================================================================
   GLOBAL CLICK TRACKING
   ========================================================================== */

document.addEventListener(
  "click",
  function(event) {

    var button =
      event.target.closest(
        "button"
      );

    var link =
      event.target.closest(
        "a"
      );

    var card =
      event.target.closest(
        ".card[data-id]"
      );


    /* -----------------------------------
       Product click
       Don't treat Add to Cart itself
       as a product click.
       ----------------------------------- */

    if (
      card &&
      !event.target.closest(
        ".card__btn"
      )
    ) {

      trackProductClick(
        card
      );

    }


    /* -----------------------------------
       Button click
       ----------------------------------- */

    if (button) {

      trackButtonClick(
        button
      );

    }


    /* -----------------------------------
       Link click
       ----------------------------------- */

    if (link) {

      trackLinkClick(
        link
      );

    }

  }
);


/* ==========================================================================
   PAGE INITIALIZATION
   ========================================================================== */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    /* Page View */

    pushPageData();


    /* Cart Count */

    updateCartCount();


    /* Mobile Navigation */

    var toggle =
      document.querySelector(
        ".nav__toggle"
      );


    if (toggle) {

      toggle.addEventListener(
        "click",
        toggleNav
      );

    }


    /* Featured Products */

    renderFeatured();


    /* Product Listing */

    if (
      document.getElementById(
        "product-grid"
      )
    ) {

      renderCategoryFilters();

      renderProductGrid(
        "All"
      );

    }


    /* Cart */

    renderCartPage();


    /* Track Cart View */

    if (
      window.location.pathname
        .toLowerCase()
        .includes("cart")
    ) {

      trackCartView();

    }

  }
);