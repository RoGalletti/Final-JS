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

  const savedCart = localStorage.getItem("cart");
  if (savedCart) cart = JSON.parse(savedCart);

  function loadCategories(products) {
    const categories = [
      ...new Set(products.map((product) => product.category)),
    ];

    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category.replace(/^\w/, (c) => c.toUpperCase());

      categoryFilter.appendChild(option);
    });
  }

  function displayProducts(products) {
    productList.innerHTML = "";
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-info">
          <h2>${product.title}</h2>
          <p class="product-price">${product.price}</p>
          <button class="add-to-cart" onclick="addToCart(${product.id})">Agregar al carrito</button>
        </div>
      `;
      productList.appendChild(productCard);
    });
  }

  categoryFilter.addEventListener("change", () => {
    const selectedCategory = categoryFilter.value;
    const filteredProducts =
      selectedCategory === "all"
        ? products
        : products.filter((product) => product.category === selectedCategory);
    displayProducts(filteredProducts);
  });

  window.addToCart = function (productId) {
    const product = products.find((p) => p.id === productId);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    Swal.fire({
      icon: "success",
      title: "Producto agregado",
      text: `${product.title} ha sido agregado al carrito`,
    });
  };

  window.removeFromCart = function (productId) {
    cart = cart.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    Swal.fire({
      icon: "success",
      title: "Producto eliminado",
      text: "El producto ha sido eliminado del carrito",
    });
    showCart();
  };

  function showCart() {
    if (cart.length === 0) {
      return Swal.fire({
        icon: "info",
        title: "Carrito vacío",
        text: "No hay productos en el carrito",
      });
    }

    const cartItems = cart
      .map(
        (item) => `
      <li class="cart-item">
        <img src="${item.image}" class="cart-image">
        ${item.title} - ${item.price}
        <button class="remove-from-cart" onclick="removeFromCart(${item.id})">❌</button>
        </li>`
      )
      .join("");
    Swal.fire({
      icon: "info",
      title: "Carrito de compras",
      html: `<ul>${cartItems}</ul>
            <button id="clearCart" class="cart-clean">Limpiar carrito</button>`,
      didOpen: () => {
        const clearCartButton = document.getElementById("clearCart");
        clearCartButton.addEventListener("click", () => {
          cart = [];
          localStorage.removeItem("cart");
          Swal.fire({
            icon: "success",
            title: "Carrito vaciado",
            text: "Todos los productos han sido eliminados del carrito",
          });
        });
      },
    });
  }

  viewCartButton.addEventListener("click", showCart);
});