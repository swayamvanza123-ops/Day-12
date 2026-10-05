/* =========================================
   LOCAL STORAGE KEY
========================================= */

const STORAGE_KEY = "inventory_products";


/* =========================================
   SAVE PRODUCTS
========================================= */

export const saveProducts = (products) => {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(products)
    );

};


/* =========================================
   LOAD PRODUCTS
========================================= */

export const loadProducts = () => {

    const storedProducts =
        localStorage.getItem(STORAGE_KEY);

    if (!storedProducts) {

        return null;

    }

    try {

        return JSON.parse(storedProducts);

    } catch (error) {

        console.error(
            "Unable to load products:",
            error
        );

        return null;

    }

};


/* =========================================
   CLEAR PRODUCTS
========================================= */

export const clearProducts = () => {

    localStorage.removeItem(STORAGE_KEY);

};