let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productQuantity = document.getElementById("productQuantity");
let saveBtn = document.getElementById("saveBtn");
let message = document.getElementById("message");
let productList = document.getElementById("productList");

let products = [];
let editIndex = null;

let savedProducts = localStorage.getItem("products");

if (savedProducts !== null) {
    products = JSON.parse(savedProducts);
    displayProducts();
};

function saveProduct() {
    localStorage.setItem("products", JSON.stringify(products));
}


function displayProducts() {
    productList.innerHTML = "";
    products.forEach((product, index) => {
        productList.innerHTML += `
        <div class="product-card">
            <h3>${product.name}</h3> <!-- تم التعديل هنا -->
            <p>Price : ${product.price}</p> <!-- تم التعديل هنا -->
            <p>Quantity : ${product.quantity}</p> <!-- تم التعديل هنا -->
            <button onclick="editProduct(${index})">Edit</button>
            <button onclick="deleteProduct(${index})">Delete</button>
        </div>
        `;
    });
}

saveBtn.addEventListener("click", () => {
    let product = {
        name: productName.value,
        price: parseFloat(productPrice.value) || 0,
        quantity: parseInt(productQuantity.value) || 0,
    }

    if (editIndex === null) {
        products.push(product);
        message.textContent = "Product Added Successfully";
    }
    else {
        products[editIndex] = product;
        editIndex = null;
        saveBtn.textContent = "Save Product";
        message.textContent = "Product Updated Successfully";
    }

    saveProduct();
    displayProducts();

    productName.value = '';
    productPrice.value = '';
    productQuantity.value = '';
});

function editProduct(index) {
    productName.value = products[index].name;
    productPrice.value = products[index].price;
    productQuantity.value = products[index].quantity;

    editIndex = index;
    saveBtn.textContent = "Update Product";
}

function deleteProduct(index) {
    products.splice(index, 1);

    saveProduct();
    displayProducts();

    message.textContent = "Product Deleted Successfully";
};