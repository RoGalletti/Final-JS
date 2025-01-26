document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("productList");
  const categoryFilter = document.getElementById("categoryFilter");
  const viewCartButton = document.getElementById("viewCartButton");

  let products = [];
  let cart = [];

  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      products = data;
      displayProducts(products);
      loadCategories(products);
    })
    .catch((error) => console.error("Error cargando productos: ", error));

  function loadCategories(products) {
    const categories = [
      ...new Set(products.map((products) => products.category)),
    ];

    categories.forEach((category) =>{
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category.replace(/^\w/, (c) => c.toUpperCase());

        categoryFilter.appendChild(option);
    });
  }

  function displayProducts(products){
    productList.innerHTML ="";
    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <div class="product-image">
                <img src= "${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h2> ${product.title}</h2>
                <p class="product-price"> ${product.price}
                <button class="add-to-cart" onclick="">Agregar al carrito </button>
            </div>
        `;

        productList.appendChild(productCard);
                
    })
  }

    categoryFilter.addEventListener("change", () =>{
        const selectedCategory = categoryFilter.value;
        const filteredProducts = 
        selectedCategory === "all" 
        ? products 
        : products.filter ((product) => product.category === selectedCategory);
    displayProducts(filteredProducts);
    })  
});
