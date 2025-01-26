document.addEventListener("DOMContentLoaded", () =>{
const productList = document.getElementById("productList");
const categoryFilter = document.getElementById("categoryFilter");
const viewCartButton = document.getElementById("viewCartButton");

let products= [];
let cart = [];

fetch("https://fakestoreapi.com/products")
    .then((res)=> res.json())
    .then((data)=>{
        products=data;
        
    })
    .catch((error) => console.error("Error cargando productos: ", error));

});