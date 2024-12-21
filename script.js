window.onload = function() {
    generateProductList();
    renderCart();
  }  
// Lista de productos
const products = [
    { name: "Antología de Microficción", price: 500, description: "Una colección de microrelatos publicados por La Papa Ediciones." },
    { name: "Las áreas de Brodman", price: 700, description: "Un libro de poesía publicado por Abra Pampa Ediciones." }
  ];
  
  // Función para generar la lista de productos
  function generateProductList() {
    const productList = document.getElementById("product-list");
    products.forEach((product, index) => {
      const productCard = document.createElement("div");
      productCard.classList.add("book-card");
  
      productCard.innerHTML = `
        <h3>${product.name}</h3>
        <p>Precio: $${product.price}</p>
        <button onclick="showDescription(${index})">Ver más</button>
        <button onclick="addToCart('${product.name}', ${product.price})">Comprar - $${product.price}</button>
      `;
  
      productList.appendChild(productCard);
    });
  }
  
  // Mostrar descripción ampliada
  function showDescription(index) {
    const descriptionSection = document.getElementById("description");
    const expandedDescription = document.getElementById("expanded-description");
  
    expandedDescription.textContent = products[index].description;
    descriptionSection.style.display = "block";
  }
  
  // Ocultar descripción ampliada
  function hideDescription() {
    const descriptionSection = document.getElementById("description");
    descriptionSection.style.display = "none";
  }
  
  // Carrito de compras
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  function addToCart(productName, price) {
    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.find(item => item.name === productName);
  
    if (existingProduct) {
      existingProduct.quantity += 1; // Aumentar la cantidad
    } else {
      cart.push({ name: productName, price: price, quantity: 1 });
    }
  
    // Guardar el carrito en localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  
    renderCart();
  }
  
  function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
  
    cartItemsContainer.innerHTML = ""; // Limpiar carrito
  
    let totalPrice = 0;
  
    cart.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
  
      cartItem.innerHTML = `
        <p>${item.name} - $${item.price} x ${item.quantity}</p>
        <button onclick="removeFromCart(${index})">Eliminar</button>
        <button onclick="editQuantity(${index}, 1)">+</button>
        <button onclick="editQuantity(${index}, -1)">-</button>
      `;
  
      cartItemsContainer.appendChild(cartItem);
  
      totalPrice += item.price * item.quantity;
    });
  
    totalPriceElement.textContent = totalPrice;
  }
  
  function removeFromCart(index) {
    cart.splice(index, 1); // Eliminar producto del carrito
    localStorage.setItem("cart", JSON.stringify(cart)); // Actualizar localStorage
    renderCart();
  }
  
  function editQuantity(index, change) {
    const item = cart[index];
    if (item.quantity + change > 0) {
      item.quantity += change;
      localStorage.setItem("cart", JSON.stringify(cart)); // Actualizar localStorage
      renderCart();
    }
  }
  
  function clearCart() {
    cart = []; // Vaciar el carrito
    localStorage.setItem("cart", JSON.stringify(cart)); // Actualizar localStorage
    renderCart();
  }
  
  // Inicializar la lista de productos y el carrito al cargar la página
  window.onload = function() {
    generateProductList();
    renderCart();
  }
  
  // Función para verificar los campos del formulario
function validateForm(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada
  
    const nombre = document.querySelector("input[name='nombre']").value.trim();
    const email = document.querySelector("input[name='email']").value.trim();
    const mensaje = document.querySelector("textarea[name='mensaje']").value.trim();
    const errorMessageDiv = document.getElementById("error-message"); 
  
    // Verificar si los campos están vacíos
    if (!nombre || !email || !mensaje) {
      errorMessageDiv.textContent = "Por favor, completa todos los campos del formulario.";
    } else {
      errorMessageDiv.textContent = "Formulario completado correctamente.";
    }
  }
  
  // Asegurarme de que el script se ejecute cuando el documento esté completamente cargado
  window.onload = function() {
  
    // Añadir un evento al formulario
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", validateForm);
  };

    async function fetchAPIData() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=2');
            const data = await response.json();
            console.log(data); // Depurar los datos recibidos
    
            // Crear los elementos dinámicamente
            const container = document.getElementById('card-container');
            data.forEach((item) => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <img src="${item.url}" alt="${item.title}">
                    <h3>${item.title}</h3>
                `;
                container.appendChild(card);
            });
        } catch (error) {
            console.error('Error al obtener datos de la API:', error);
        }
    }
    
    // Llamar a la función cuando el documento esté completamente cargado
    document.addEventListener("DOMContentLoaded", function() {
        fetchAPIData();
    });