// Função de efeito de digitação utilizando requestAnimationFrame
function typeWriter(elementId, text, speed, callback) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`Elemento com ID "${elementId}" não encontrado.`);
    if (callback) callback();
    return;
  }

  element.textContent = "";
  let i = 0;
  let lastTime = performance.now();

  function type(currentTime) {
    if (currentTime - lastTime >= speed) {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        lastTime = currentTime;
      } else {
        if (callback) setTimeout(callback, 1000);
        return;
      }
    }
    requestAnimationFrame(type);
  }

  requestAnimationFrame(type);
}

// Carrinho de compras
const cart = [];

// Toast de feedback
function showMessage(msg) {
  const toast = document.createElement("div");
  toast.textContent = msg;
  Object.assign(toast.style, {
    position: "fixed",
    bottom: "2rem",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#333",
    color: "#fff",
    padding: "0.75rem 1.5rem",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    zIndex: "9999",
    opacity: "0",
    transition: "opacity 0.3s ease",
  });

  document.body.appendChild(toast);
  setTimeout(() => (toast.style.opacity = "1"), 10);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

function updateCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");
  const modalCartItems = document.getElementById("modal-cart-items");
  const modalCartTotal = document.getElementById("modal-cart-total");
  const cartCountEl = document.getElementById("cart-count");

  if (cartItemsContainer) cartItemsContainer.innerHTML = "";
  if (modalCartItems) modalCartItems.innerHTML = "";

  let total = 0;
  let quantity = 0;

  cart.forEach((product) => {
    total += product.price * product.quantity;
    quantity += product.quantity;

    const li = document.createElement("li");
    li.textContent = `${product.name} x ${product.quantity} - R$ ${(
      product.price * product.quantity
    ).toFixed(2)}`;

    if (modalCartItems) modalCartItems.appendChild(li);
    if (cartItemsContainer) cartItemsContainer.appendChild(li.cloneNode(true));
  });

  if (cartTotalEl) cartTotalEl.textContent = total.toFixed(2);
  if (modalCartTotal) modalCartTotal.textContent = total.toFixed(2);
  if (cartCountEl) cartCountEl.textContent = quantity;

  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
  const existing = cart.find((p) => p.name === product.name);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
  showMessage("Adicionado ao carrinho com sucesso!");
}

function removeFromCart(name) {
  const index = cart.findIndex((p) => p.name === name);
  if (index !== -1) {
    cart.splice(index, 1);
    updateCart();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Menu Mobile
  const menuToggle = document.querySelector(".menu-toggle");
  const menuClose = document.querySelector(".menu-close");
  const navMobile = document.querySelector(".nav-mobile");

  menuToggle?.addEventListener("click", () =>
    navMobile?.classList.add("active")
  );
  menuClose?.addEventListener("click", () =>
    navMobile?.classList.remove("active")
  );

  // Digitação
  typeWriter(
    "typewriter-h1",
    "Bem-vindo a Bodegueira Charcutaria & Cia",
    100,
    () => {
      typeWriter("typewriter-h2", "A melhor do Distrito Federal!", 100, () => {
        typeWriter(
          "typewriter-p",
          "Os melhores produtos que uma bodegaria pode oferecer, não percam nossas melhores ofertas!",
          100
        );
      });
    }
  );

  // Produtos por categoria
  const categories = {
    DoceDeLeite: [
      {
        name: "Doce de Leite de Ovelha 160g",
        description: "Nosso campeão de vendas!",
        image: "./assets/produtos/DoceDeLeiteDeOvelha/doce-ovelha-160.webp",
        price: 14.9,
      },
      {
        name: "Doce de Leite de Ovelha 260g",
        description: "Nosso campeão de vendas!",
        image: "./assets/produtos/DoceDeLeiteDeOvelha/doce-ovelha-260.webp",
        price: 19.9,
      },
    ],
    Licores: [
      {
        name: "Licor de Doce de leite de ovelha com Pistache 250ml",
        description:
          "O melhor sabor de licor com doce de leite de ovelha e pistache.",
        image: "./assets/produtos/Licor/licor-com-pistache-250ml.webp",
        price: 29.9,
      },
      {
        name: "Licor de Creme de Doce de Leite de Ovelha 250ml",
        description:
          "O melhor sabor de licor creme de doce de leite de ovelha.",
        image: "./assets/produtos/licor/licor-creme-doce-ovelha-250ml.webp",
        price: 28.9,
      },
    ],
    Torrones: [
      {
        name: "Torrone Figo com Amendoas",
        description: "O melhor torrone está aqui de figo com amendoas.",
        image: "./assets/produtos/Torrones/torrone-amendoas.webp",
        price: 17.9,
      },
      {
        name: "Torrone com",
        description: "Torrone clássico com cream cheese.",
        image: "./assets/bolo-red-velvet.jpg",
        price: 16.5,
      },
    ],
  };

  const dropdownMenu = document.querySelector(".dropdown-menu");
  const dropdownButton = document.querySelector(".dropdown-button");
  const carousel = document.querySelector(".carousel");
  const prevButton = document.querySelector(".carousel-prev");
  const nextButton = document.querySelector(".carousel-next");

  let currentIndex = 0;
  let currentCategory = [];

  dropdownButton?.addEventListener("click", () => {
    dropdownMenu.style.display =
      dropdownMenu.style.display === "block" ? "none" : "block";
  });

  dropdownMenu?.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      const category = e.target.dataset.category;
      currentCategory = categories[category];
      currentIndex = 0;
      loadProducts();
      dropdownMenu.style.display = "none";
      dropdownButton.textContent = e.target.textContent;
    }
  });

  function loadProducts() {
    carousel.innerHTML = "";
    currentCategory.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h4>${product.name}</h4>
        <p>${product.description}</p>
        <p><strong>R$ ${product.price.toFixed(2)}</strong></p>
        <button>Adicionar ao Carrinho</button>
      `;
      card
        .querySelector("button")
        .addEventListener("click", () => addToCart(product));
      carousel.appendChild(card);
    });
    updateCarousel();
  }

  function updateCarousel() {
    const cardWidth = carousel.querySelector(".card")?.offsetWidth || 310;
    const offset = currentIndex * -cardWidth;
    carousel.style.transform = `translateX(${offset}px)`;
  }

  prevButton?.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextButton?.addEventListener("click", () => {
    if (currentIndex < currentCategory.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  // Modal do carrinho
  // Abrir o modal
  const cartIcon = document.getElementById("cart-icon");
  const cartModal = document.getElementById("cart-modal");
  const modalCheckoutButton = document.getElementById("modal-checkout-button");
  const closeCartModal = document.getElementById("close-cart-modal");
  const clearCartButton = document.getElementById("clear-cart-button");

  cartIcon?.addEventListener("click", () => {
    cartModal?.classList.remove("hidden"); // Remove a classe 'hidden' para exibir o modal
  });

  // Fechar o modal
  closeCartModal?.addEventListener("click", () => {
    cartModal?.classList.add("hidden"); // Adiciona a classe 'hidden' para esconder o modal
  });

  modalCheckoutButton?.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    let msg = "Olá! Gostaria de fazer um pedido:\n\n";
    cart.forEach((p) => {
      msg += `• ${p.name} x ${p.quantity} - R$ ${(p.price * p.quantity).toFixed(
        2
      )}\n`;
    });
    msg += `\nTotal: R$ ${cart
      .reduce((sum, p) => sum + p.price * p.quantity, 0)
      .toFixed(2)}`;

    const encodedMsg = encodeURIComponent(msg);
    const phone = "5561XXXXXXXX";
    window.open(`https://wa.me/${phone}?text=${encodedMsg}`, "_blank");
  });

  clearCartButton?.addEventListener("click", () => {
    cart.length = 0; // Esvazia o array sem reatribuir
    updateCart();
    showMessage("Carrinho esvaziado com sucesso!");
  });

  // Carrega carrinho salvo do localStorage
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart.push(...JSON.parse(savedCart));
    updateCart();
  }
});
