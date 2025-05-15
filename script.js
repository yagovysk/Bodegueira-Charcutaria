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
    AlhoNegro: [
      {
        name: "Geleia de Alho Negro",
        description: "Nosso campeão de vendas!",
        image: "./assets/produtos/AlhoNegro/geleia-de-alho-negro.webp",
        price: 14.9,
      },
      {
        name: "Molho de alho Negro 160g",
        description: "Nosso campeão de vendas!",
        image: "./assets/produtos/AlhoNegro/molho-alho-negro-160g.webp",
        price: 19.9,
      },
      {
        name: "Molho de alho Negro 80g",
        description: "O melhot molho.",
        image: "./assets/produtos/AlhoNegro/molho-de-alho-negro.webp",
        price: 29.9,
      },
      {
        name: "Pasta de alho Negro 80g",
        description: "O melhor sabor.",
        image: "./assets/produtos/AlhoNegro/pasta-alho-negro.webp",
        price: 28.9,
      },
      {
        name: "Pesto de alho Negro 80g",
        description: "O melhor sabor.",
        image: "./assets/produtos/AlhoNegro/pesto-alho-negro.webp",
        price: 28.9,
      },
      {
        name: "Sal de umami de alho Negro 100g",
        description: "O melhor sabor.",
        image: "./assets/produtos/AlhoNegro/sal-de-umami.webp",
        price: 28.9,
      },
      {
        name: "Sal grosso de alho Negro",
        description: "O melhor sabor.",
        image: "./assets/produtos/AlhoNegro/sal-grosso-de-alho-negro.webp",
        price: 28.9,
      },
      {
        name: "Vinagre de alho Negro",
        description: "O melhor sabor.",
        image: "./assets/produtos/AlhoNegro/vinagre-alho-negro.webp",
        price: 28.9,
      },
    ],
    Amaze: [
      {
        name: "Mel Black Forest 50g",
        description: "O melhor mel.",
        image: "./assets/produtos/Amaze/mel-amaze-black-forest-50g.webp",
        price: 29.9,
      },
      {
        name: "Mel Black Forest 200g",
        description: "O melhor mel.",
        image: "./assets/produtos/Amaze/mel-amaze-black-forest-200g.webp",
        price: 29.9,
      },
      {
        name: "Mel Cacau 70% 200g",
        description: "O melhor mel.",
        image: "./assets/produtos/Amaze/mel-amaze-cacau-70-200g.webp",
        price: 29.9,
      },
      {
        name: "Mel Cacau com laranja 200g",
        description: "O melhor mel.",
        image: "./assets/produtos/Amaze/mel-amaze-cacau-com-laranja-200g.webp",
        price: 29.9,
      },
      {
        name: "Mel Citrus 200g",
        description: "O melhor mel.",
        image: "./assets/produtos/Amaze/mel-amaze-citrus-200g.webp",
        price: 29.9,
      },
      {
        name: "Mel Orange Blossom 50g",
        description: "O melhor mel.",
        image: "./assets/produtos/Amaze/mel-amaze-orange-blossom-50g.webp",
        price: 29.9,
      },
      {
        name: "Mel Orange Blossom 200g",
        description: "O melhor mel.",
        image: "./assets/produtos/Amaze/mel-amaze-orange-blossom-200g.webp",
        price: 29.9,
      },
      {
        name: "Mel White blossom 50g",
        description: "O melhor mel.",
        image: "./assets/produtos/Amaze/mel-amaze-white-blossom-50g.webp",
        price: 29.9,
      },
      {
        name: "Mel White Blossom 200g",
        description: "O melhor mel.",
        image: "./assets/produtos/Amaze/mel-amaze-white-blossom-200g.webp",
        price: 29.9,
      },
    ],
    AowsMininu: [
      {
        name: "Bananinha",
        description: "A melhor bananinha.",
        image: "./assets/produtos/AowsMininu/bananinha.webp",
        price: 17.9,
      },
      {
        name: "Caipirinha",
        description: "A melhor caipirinha.",
        image: "./assets/produtos/AowsMininu/caipirinha.webp",
        price: 17.9,
      },
    ],
    Ayslla: [
      {
        name: "Coco defumado com mel",
        description: "O melhor doce.",
        image: "./assets/produtos/Ayslla/coco-defumado-com-mel.webp",
        price: 29.9,
      },
      {
        name: "Laranja desidratada com mel",
        description: "O melhor doce.",
        image: "./assets/produtos/Ayslla/laranja-desidratada-com-mel.webp",
        price: 29.9,
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

      document.querySelector(".carousel-arrows")?.classList.remove("hidden");
    }
  });

  let carouselInterval;

  function resetCarouselLoopTemporariamente() {
    clearInterval(carouselInterval);
    setTimeout(startCarouselLoop, 1000); // reinicia o loop após 1s
  }

  function startCarouselLoop() {
    if (window.innerWidth > 768 && currentCategory.length > 0) {
      clearInterval(carouselInterval);

      const card = carousel.querySelector(".card");
      const container = document.querySelector(".carousel-container");

      if (!card || !container) return;

      const cardWidth = card.offsetWidth + 16;
      const totalCards = currentCategory.length;

      const maxIndex = totalCards - 1;

      carouselInterval = setInterval(() => {
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        updateCarousel();
      }, 3000);
    } else {
      clearInterval(carouselInterval);
    }
  }

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
    enableMobileScroll();
    startCarouselLoop(); // 👈 CHAME AQUI
  }

  function enableMobileScroll() {
    if (window.innerWidth <= 768) {
      carousel.style.overflowX = "auto";
      carousel.style.scrollSnapType = "x mandatory";
      carousel.style.scrollBehavior = "smooth";
      carousel.style.transform = "none";
    } else {
      carousel.style.overflowX = "hidden";
    }
  }

  loadProducts();
  enableMobileScroll();

  function updateCarousel() {
    const card = carousel.querySelector(".card");
    if (!card || window.innerWidth <= 768) return;

    const offset = currentIndex * card.offsetWidth;
    carousel.scrollTo({ left: offset, behavior: "smooth" });
  }

  prevButton?.addEventListener("click", () => {
    resetCarouselLoopTemporariamente();

    currentIndex =
      currentIndex > 0 ? currentIndex - 1 : currentCategory.length - 1;
    updateCarousel();
  });

  nextButton?.addEventListener("click", () => {
    resetCarouselLoopTemporariamente();

    currentIndex =
      currentIndex < currentCategory.length - 1 ? currentIndex + 1 : 0;
    updateCarousel();
  });

  prevButton?.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextButton?.addEventListener("click", () => {
    const card = carousel.querySelector(".card");
    const totalCards = currentCategory.length;
    if (!card) return;

    if (currentIndex < totalCards - 1) {
      currentIndex++;
      updateCarousel();
    } else {
      currentIndex = 0;
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

  window.addEventListener("resize", () => {
    enableMobileScroll();
    startCarouselLoop();
  });
});
