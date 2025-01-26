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
    })
  }
});
