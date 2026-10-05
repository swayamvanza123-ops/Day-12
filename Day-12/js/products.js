/* =========================================
   PRODUCT CLASS
========================================= */

export class Product {

    constructor(id, name, category, price, stock) {

        this.id = id;

        this.name = name;

        this.category = category;

        this.price = Number(price);

        this.stock = Number(stock);

    }


    /* =====================================
       GET STATUS
    ===================================== */

    getStatus() {

        if (this.stock < 10) {

            return "Low Stock";

        }

        return "Available";

    }


    /* =====================================
       GET INVENTORY VALUE
       
       Price × Stock
    ===================================== */

    getInventoryValue() {

        return this.price * this.stock;

    }

}


/* =========================================
   DEFAULT PRODUCTS
========================================= */

export const defaultProducts = [

    new Product(
        1,
        "Laptop",
        "Electronics",
        50000,
        20
    ),

    new Product(
        2,
        "Smartphone",
        "Electronics",
        30000,
        15
    ),

    new Product(
        3,
        "Monitor",
        "Electronics",
        12000,
        8
    ),

    new Product(
        4,
        "Keyboard",
        "Accessories",
        1500,
        35
    ),

    new Product(
        5,
        "Mouse",
        "Accessories",
        800,
        50
    ),

    new Product(
        6,
        "Headphones",
        "Accessories",
        2500,
        5
    )

];