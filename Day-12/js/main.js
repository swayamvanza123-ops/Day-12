import {
    Product,
    defaultProducts
} from "./products.js";

import {
    saveProducts,
    loadProducts
} from "./storage.js";

import {
    formatCurrency,
    escapeHTML,
    getNextId,
    getCategoryIcon
} from "./utils.js";


/* =========================================
   PRODUCTS ARRAY
========================================= */

let products = [];


/* =========================================
   DOM ELEMENTS
========================================= */

const totalProducts =
    document.getElementById("totalProducts");

const totalStock =
    document.getElementById("totalStock");

const inventoryValue =
    document.getElementById("inventoryValue");

const lowStock =
    document.getElementById("lowStock");

const productTableBody =
    document.getElementById("productTableBody");

const productGrid =
    document.getElementById("productGrid");

const categoryProductGrid =
    document.getElementById("categoryProductGrid");

const searchInput =
    document.getElementById("searchInput");

const productSearchInput =
    document.getElementById("productSearchInput");

const filterSelect =
    document.getElementById("filterSelect");

const clearFilters =
    document.getElementById("clearFilters");

const newProductButton =
    document.getElementById("newProductButton");

const viewAllButton =
    document.getElementById("viewAllButton");

const productModal =
    document.getElementById("productModal");

const closeModal =
    document.getElementById("closeModal");

const cancelButton =
    document.getElementById("cancelButton");

const productForm =
    document.getElementById("productForm");

const formTitle =
    document.getElementById("formTitle");

const saveButton =
    document.getElementById("saveButton");

const productId =
    document.getElementById("productId");

const productName =
    document.getElementById("productName");

const productCategory =
    document.getElementById("productCategory");

const productPrice =
    document.getElementById("productPrice");

const productStock =
    document.getElementById("productStock");

const pageTitle =
    document.getElementById("pageTitle");

const categoryTitle =
    document.getElementById("categoryTitle");

const categoryDescription =
    document.getElementById("categoryDescription");


/* =========================================
   INITIALIZE
========================================= */

const initializeProducts = () => {

    const storedProducts = loadProducts();

    if (storedProducts && storedProducts.length > 0) {

        /*
         * IMPORTANT:
         * LocalStorage gives us plain objects.
         *
         * We convert them back into Product
         * class objects.
         */

        products = storedProducts.map(item => {

            return new Product(
                item.id,
                item.name,
                item.category,
                item.price,
                item.stock
            );

        });

    } else {

        products = [...defaultProducts];

        saveProducts(products);

    }

};


/* =========================================
   UPDATE DASHBOARD
========================================= */

const updateDashboard = () => {

    const total = products.length;


    const stock = products.reduce(
        (sum, product) =>
            sum + product.stock,
        0
    );


    const value = products.reduce(
        (sum, product) =>
            sum + product.getInventoryValue(),
        0
    );


    const low = products.filter(
        product =>
            product.getStatus() === "Low Stock"
    ).length;


    totalProducts.textContent = total;

    totalStock.textContent = stock;

    inventoryValue.textContent =
        formatCurrency(value);

    lowStock.textContent = low;

};


/* =========================================
   DISPLAY TABLE
========================================= */

const displayProducts = (
    productsToDisplay = products
) => {

    productTableBody.innerHTML = "";


    if (productsToDisplay.length === 0) {

        productTableBody.innerHTML = `

            <tr>

                <td
                    colspan="8"
                    style="
                        text-align:center;
                        padding:40px;
                        color:#9ca3af;
                    "
                >

                    No products found.

                </td>

            </tr>

        `;

        return;

    }


    productsToDisplay.forEach(product => {

        const status =
            product.getStatus();

        const statusClass =
            status === "Low Stock"
                ? "low"
                : "available";


        const row = document.createElement("tr");


        row.innerHTML = `

            <td>
                #${product.id}
            </td>


            <td class="product-name">

                ${escapeHTML(product.name)}

            </td>


            <td class="category-text">

                ${escapeHTML(product.category)}

            </td>


            <td class="price">

                ${formatCurrency(product.price)}

            </td>


            <td>

                ${product.stock}

            </td>


            <td>

                <span class="status ${statusClass}">

                    ${status}

                </span>

            </td>


            <td class="price">

                ${formatCurrency(
                    product.getInventoryValue()
                )}

            </td>


            <td>

                <div class="action-buttons">

                    <button
                        class="action-btn edit-btn"
                        data-action="edit"
                        data-id="${product.id}"
                        title="Edit"
                    >
                        ✏️
                    </button>


                    <button
                        class="action-btn delete-btn"
                        data-action="delete"
                        data-id="${product.id}"
                        title="Delete"
                    >
                        🗑️
                    </button>

                </div>

            </td>

        `;


        productTableBody.appendChild(row);

    });

};


/* =========================================
   DISPLAY PRODUCT CARDS
========================================= */

const displayProductCards = (
    productsToDisplay = products,
    container = productGrid
) => {

    container.innerHTML = "";


    if (productsToDisplay.length === 0) {

        container.innerHTML = `

            <div
                style="
                    grid-column:1/-1;
                    text-align:center;
                    padding:40px;
                    color:#9ca3af;
                "
            >
                No products found.
            </div>

        `;

        return;

    }


    productsToDisplay.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-card-icon">

                ${getCategoryIcon(
                    product.category
                )}

            </div>


            <h3>

                ${escapeHTML(product.name)}

            </h3>


            <p class="product-card-category">

                ${escapeHTML(product.category)}

            </p>


            <p class="product-card-price">

                ${formatCurrency(product.price)}

            </p>


            <p class="product-card-stock">

                Stock: ${product.stock}

                • ${product.getStatus()}

            </p>

        `;


        container.appendChild(card);

    });

};


/* =========================================
   SEARCH PRODUCTS
========================================= */

const searchProducts = (searchTerm) => {

    const term =
        searchTerm.trim().toLowerCase();


    let filteredProducts =
        products.filter(product => {

            return (

                product.name
                    .toLowerCase()
                    .includes(term)

                ||

                product.category
                    .toLowerCase()
                    .includes(term)

            );

        });


    const filterValue =
        filterSelect.value;


    if (filterValue === "available") {

        filteredProducts =
            filteredProducts.filter(
                product =>
                    product.getStatus() === "Available"
            );

    }


    if (filterValue === "low") {

        filteredProducts =
            filteredProducts.filter(
                product =>
                    product.getStatus() === "Low Stock"
            );

    }


    displayProducts(filteredProducts);

};


/* =========================================
   FILTER
========================================= */

const filterProducts = () => {

    searchProducts(
        searchInput.value
    );

};


/* =========================================
   OPEN ADD MODAL
========================================= */

const openAddModal = () => {

    productForm.reset();

    productId.value = "";

    formTitle.textContent =
        "Add New Product";

    saveButton.textContent =
        "Add Product";

    productModal.classList.add("show");

};


/* =========================================
   CLOSE MODAL
========================================= */

const closeProductModal = () => {

    productModal.classList.remove("show");

};


/* =========================================
   EDIT PRODUCT
========================================= */

const editProduct = (id) => {

    const product =
        products.find(
            item =>
                Number(item.id) === Number(id)
        );


    if (!product) {

        return;

    }


    productId.value =
        product.id;

    productName.value =
        product.name;

    productCategory.value =
        product.category;

    productPrice.value =
        product.price;

    productStock.value =
        product.stock;


    formTitle.textContent =
        "Edit Product";

    saveButton.textContent =
        "Update Product";


    productModal.classList.add("show");

};


/* =========================================
   DELETE PRODUCT
========================================= */

const deleteProduct = (id) => {

    const product =
        products.find(
            item =>
                Number(item.id) === Number(id)
        );


    if (!product) {

        return;

    }


    const confirmed =
        confirm(
            `Delete "${product.name}"?`
        );


    if (!confirmed) {

        return;

    }


    products =
        products.filter(
            item =>
                Number(item.id) !== Number(id)
        );


    saveProducts(products);

    updateDashboard();

    displayProducts();

    displayProductCards();

};


/* =========================================
   ADD / UPDATE PRODUCT
========================================= */

const handleProductSubmit = (event) => {

    event.preventDefault();


    const name =
        productName.value.trim();

    const category =
        productCategory.value;

    const price =
        Number(productPrice.value);

    const stock =
        Number(productStock.value);


    if (
        !name ||
        !category ||
        price < 0 ||
        stock < 0
    ) {

        alert(
            "Please enter valid product details."
        );

        return;

    }


    /* =====================================
       UPDATE PRODUCT
    ===================================== */

    if (productId.value) {

        const id =
            Number(productId.value);


        const index =
            products.findIndex(
                product =>
                    Number(product.id) === id
            );


        if (index !== -1) {

            /*
             * Create a NEW Product object.
             */

            products[index] =
                new Product(
                    id,
                    name,
                    category,
                    price,
                    stock
                );

        }

    }

    /* =====================================
       ADD PRODUCT
    ===================================== */

    else {

        const id =
            getNextId(products);


        /*
         * Product is created
         * using the Product class.
         */

        const newProduct =
            new Product(
                id,
                name,
                category,
                price,
                stock
            );


        products.push(newProduct);

    }


    saveProducts(products);

    updateDashboard();

    displayProducts();

    displayProductCards();


    closeProductModal();


    productForm.reset();

};


/* =========================================
   NAVIGATION
========================================= */

const setupNavigation = () => {

    const navItems =
        document.querySelectorAll(
            ".nav-item"
        );


    navItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const page =
                    item.dataset.page;


                navItems.forEach(nav => {

                    nav.classList.remove(
                        "active"
                    );

                });


                item.classList.add(
                    "active"
                );


                document
                    .querySelectorAll(".page")
                    .forEach(section => {

                        section.classList.remove(
                            "active-page"
                        );

                    });


                const selectedPage =
                    document.getElementById(
                        `${page}Page`
                    );


                if (selectedPage) {

                    selectedPage.classList.add(
                        "active-page"
                    );

                }


                pageTitle.textContent =
                    page.charAt(0).toUpperCase()
                    + page.slice(1);


                if (page === "products") {

                    displayProductCards();

                }

            }
        );

    });

};


/* =========================================
   CATEGORY CLICK
========================================= */

const setupCategories = () => {

    const categoryCards =
        document.querySelectorAll(
            ".category-card"
        );


    categoryCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const category =
                    card.dataset.category;


                const filteredProducts =
                    products.filter(
                        product =>
                            product.category === category
                    );


                categoryTitle.textContent =
                    `${category} Products`;


                categoryDescription.textContent =
                    `${filteredProducts.length} product(s) found`;


                displayProductCards(
                    filteredProducts,
                    categoryProductGrid
                );

            }
        );

    });

};


/* =========================================
   TABLE ACTIONS
========================================= */

productTableBody.addEventListener(
    "click",
    (event) => {

        const button =
            event.target.closest(
                ".action-btn"
            );


        if (!button) {

            return;

        }


        const id =
            Number(button.dataset.id);


        const action =
            button.dataset.action;


        if (action === "edit") {

            editProduct(id);

        }


        if (action === "delete") {

            deleteProduct(id);

        }

    }
);


/* =========================================
   EVENTS
========================================= */

newProductButton.addEventListener(
    "click",
    openAddModal
);


closeModal.addEventListener(
    "click",
    closeProductModal
);


cancelButton.addEventListener(
    "click",
    closeProductModal
);


productForm.addEventListener(
    "submit",
    handleProductSubmit
);


searchInput.addEventListener(
    "input",
    filterProducts
);


filterSelect.addEventListener(
    "change",
    filterProducts
);


productSearchInput.addEventListener(
    "input",
    () => {

        const term =
            productSearchInput.value
                .trim()
                .toLowerCase();


        const filtered =
            products.filter(product => {

                return (
                    product.name
                        .toLowerCase()
                        .includes(term)

                    ||

                    product.category
                        .toLowerCase()
                        .includes(term)
                );

            });


        displayProductCards(filtered);

    }
);


clearFilters.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        filterSelect.value = "all";

        displayProducts();

    }
);


viewAllButton.addEventListener(
    "click",
    () => {

        document
            .querySelector(
                '[data-page="products"]'
            )
            .click();

    }
);


/* =========================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================================= */

productModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target === productModal
        ) {

            closeProductModal();

        }

    }
);


/* =========================================
   START APPLICATION
========================================= */

initializeProducts();

updateDashboard();

displayProducts();

displayProductCards();

setupNavigation();

setupCategories();