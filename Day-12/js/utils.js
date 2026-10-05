/* =========================================
   FORMAT RUPEES
========================================= */

export const formatCurrency = (value) => {

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }
    ).format(value);

};


/* =========================================
   ESCAPE HTML
========================================= */

export const escapeHTML = (value) => {

    const div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

};


/* =========================================
   GET NEXT PRODUCT ID
========================================= */

export const getNextId = (products) => {

    if (products.length === 0) {

        return 1;

    }

    return Math.max(
        ...products.map(product => Number(product.id))
    ) + 1;

};


/* =========================================
   GET CATEGORY ICON
========================================= */

export const getCategoryIcon = (category) => {

    if (category === "Electronics") {

        return "💻";

    }

    if (category === "Accessories") {

        return "🎧";

    }

    return "📦";

};