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
        price: 54.0,
      },
      {
        name: "Molho de alho Negro 160g",
        description: "Nosso campeão de vendas!",
        image: "./assets/produtos/AlhoNegro/molho-alho-negro-160g.webp",
        price: 54.0,
      },
      {
        name: "Molho de alho Negro 80g",
        description: "O melhot molho.",
        image: "./assets/produtos/AlhoNegro/molho-de-alho-negro.webp",
        price: 26.0,
      },
      {
        name: "Pasta de alho Negro 80g",
        description: "O melhor sabor.",
        image: "./assets/produtos/AlhoNegro/pasta-alho-negro.webp",
        price: 48.0,
      },
      {
        name: "Pesto de alho Negro 140g",
        description: "O melhor sabor.",
        image: "./assets/produtos/AlhoNegro/pesto-alho-negro.webp",
        price: 56.0,
      },
      {
        name: "Sal de umami de alho Negro 100g",
        description: "O melhor sabor.",
        image: "./assets/produtos/AlhoNegro/sal-de-umami.webp",
        price: 18.0,
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
    BrazilianFlavor: [
      {
        name: "Bisnaga Cebola Roxa Caramelizada",
        description: "A melhor.",
        image:
          "./assets/produtos/BrazilianFlavor/flavor-cebola-roxa-caramelizada.webp",
        price: 29.9,
      },
      {
        name: "Bisnaga Geleia de frutas vermelhas zero",
        description: "A melhor geleia.",
        image:
          "./assets/produtos/BrazilianFlavor/geleia-flavor-frutas-vermelhas-zero.webp",
        price: 29.9,
      },
      {
        name: "Bisnaga Geleia de goiaba com pimenta amazônica",
        description: "A melhor geleia.",
        image:
          "./assets/produtos/BrazilianFlavor/geleia-flavor-goiaba-com-pimenta-amazonia.webp",
        price: 29.9,
      },
      {
        name: "Bisnaga Geleia laranja com vinho e cravo",
        description: "A melhor geleia.",
        image:
          "./assets/produtos/BrazilianFlavor/geleia-flavor-laranja-com-vinho-cravo.webp",
        price: 29.9,
      },
      {
        name: "Bisnaga Geleia de morango com baunilha",
        description: "A melhor geleia.",
        image:
          "./assets/produtos/BrazilianFlavor/geleia-flavor-morango-com-baunilha.webp",
        price: 29.9,
      },
      {
        name: "Bisnaga Geleia de morango zero adição de açúcar",
        description: "A melhor geleia.",
        image:
          "./assets/produtos/BrazilianFlavor/geleia-flavor-morango-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Bisnaga Mel silvestre",
        description: "O melhor mel.",
        image: "./assets/produtos/BrazilianFlavor/mel-flavor-silvestre.webp",
        price: 29.9,
      },
    ],
    CanaDaTerra: [
      {
        name: "Cachaça Cana da Terra",
        description: "3 madeiras.",
        image: "./assets/produtos/CanaDaTerra/cana-da-terra-3-madeiras.webp",
        price: 29.9,
      },
    ],
    CasaBianchi: [
      {
        name: "Doce de leite de ovelha 160g",
        description: "O melhor doce de leite.",
        image: "./assets/produtos/CasaBianchi/doce-ovelha-160.webp",
        price: 29.9,
      },
      {
        name: "Doce de leite de ovelha 260g",
        description: "O melhor doce de leite.",
        image: "./assets/produtos/CasaBianchi/doce-ovelha-260.webp",
        price: 29.9,
      },
      {
        name: "Doce de leite de ovelha 660g",
        description: "O melhor doce de leite.",
        image: "./assets/produtos/CasaBianchi/doce-ovelha-660.webp",
        price: 29.9,
      },
      {
        name: "Licor de doce de leite com pistache 250ml",
        description: "O melhor doce de licor.",
        image: "./assets/produtos/CasaBianchi/licor-com-pistache-250ml.webp",
        price: 29.9,
      },
      {
        name: "Licor creme de doce de leite de ovelha 250ml",
        description: "O melhor doce de leite.",
        image:
          "./assets/produtos/CasaBianchi/licor-creme-doce-ovelha-250ml.webp",
        price: 29.9,
      },
    ],
    ChefNBoss: [
      {
        name: "Barbecue com bacon",
        description: "O melhor molho.",
        image: "./assets/produtos/ChefNBoss/barbecue-bacon.webp",
        price: 29.9,
      },
      {
        name: "Barbecue mineiro com café",
        description: "O melhor molho.",
        image: "./assets/produtos/ChefNBoss/barbecue-mineiro-cafe.webp",
        price: 29.9,
      },
      {
        name: "Barbecue mineiro com goiabada",
        description: "O melhor molho.",
        image: "./assets/produtos/ChefNBoss/barbecue-mineiro-com-goiabada.webp",
        price: 29.9,
      },
      {
        name: "Barbecue com pimenta biquinho",
        description: "O melhor molho.",
        image: "./assets/produtos/ChefNBoss/barbecue-pimenta-biquinho.webp",
        price: 29.9,
      },
      {
        name: "Berry Christmas",
        description: "O melhor molho.",
        image: "./assets/produtos/ChefNBoss/berry-christmas.webp",
        price: 29.9,
      },
      {
        name: "Chutney",
        description: "O melhor molho.",
        image: "./assets/produtos/ChefNBoss/chutney.webp",
        price: 29.9,
      },
      {
        name: "Creme agridoce",
        description: "O melhor molho.",
        image: "./assets/produtos/ChefNBoss/creme-agridoce.webp",
        price: 29.9,
      },
      {
        name: "Fumaça Líquida",
        description: "O melhor molho.",
        image: "./assets/produtos/ChefNBoss/fumaca-liquida.webp",
        price: 29.9,
      },
      {
        name: "Jalapeño com pimenta especial",
        description: "O melhor molho.",
        image: "./assets/produtos/ChefNBoss/jalapeno-pimentinha-especial.webp",
        price: 29.9,
      },
      {
        name: "Molho inglês defumado",
        description: "O melhor molho.",
        image: "./assets/produtos/ChefNBoss/molho-ingles-defumado.webp",
        price: 29.9,
      },
      {
        name: "Mostarda Tropical",
        description: "O melhor molho.",
        image: "./assets/produtos/ChefNBoss/mostarda-tropical.webp",
        price: 29.9,
      },
      {
        name: "Pimentinha com limão",
        description: "O melhor molho.",
        image: "./assets/produtos/ChefNBoss/pimentinha-com-limao.webp",
        price: 29.9,
      },
      {
        name: "Salsa Argentina",
        description: "O melhor molho.",
        image: "./assets/produtos/ChefNBoss/salsa-argentina.webp",
        price: 29.9,
      },
      {
        name: "Salsa Muerte",
        description: "O melhor molho.",
        image: "./assets/produtos/ChefNBoss/salsa-muerte.webp",
        price: 29.9,
      },
    ],
    ColdSmoke: [
      {
        name: "Sal marinho defumado",
        description: "O melhor bacon.",
        image: "./assets/produtos/ColdSmoke/sal-marinho-defumado.webp",
        price: 29.9,
      },
    ],
    DietHouse: [
      {
        name: "Doce de Abóbora com côco",
        description: "O melhor doce.",
        image: "./assets/produtos/DietHouse/diet-house-abobora-com-coco.webp",
        price: 29.9,
      },
      {
        name: "Doce de Figo",
        description: "O melhor doce.",
        image: "./assets/produtos/DietHouse/diet-house-figo.webp",
        price: 29.9,
      },
      {
        name: "Doce de goiaba",
        description: "O melhor doce.",
        image: "./assets/produtos/DietHouse/diet-house-goiaba.webp",
        price: 29.9,
      },
      {
        name: "Goiabada",
        description: "O melhor doce.",
        image: "./assets/produtos/DietHouse/diet-house-goiabada.webp",
        price: 29.9,
      },
      {
        name: "Doce de Mamão",
        description: "O melhor doce.",
        image: "./assets/produtos/DietHouse/diet-house-mamao.webp",
        price: 29.9,
      },
      {
        name: "Doce de Manga",
        description: "O melhor doce.",
        image: "./assets/produtos/DietHouse/diet-house-manga.webp",
        price: 29.9,
      },
      {
        name: "Doce de Pêssego",
        description: "O melhor doce.",
        image: "./assets/produtos/DietHouse/diet-house-pessego.webp",
        price: 29.9,
      },
    ],
    DocesFazendaDeMinas: [
      {
        name: "Ambrosia 420g",
        description: "O melhor doce.",
        image: "./assets/produtos/DocesFazendaDeMinas/ambrosia-420g.webp",
        price: 29.9,
      },
      {
        name: "Ambrosia sem adição de açúcar 430g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/DocesFazendaDeMinas/ambrosia-sem-adicao-430g.webp",
        price: 29.9,
      },
      {
        name: "Bananada sem adição de açúcar",
        description: "O melhor doce.",
        image: "./assets/produtos/DocesFazendaDeMinas/bananada-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Cocada sem adição de açúcar",
        description: "O melhor doce.",
        image: "./assets/produtos/DocesFazendaDeMinas/cocada-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Fondant de leite sem adição de açúcar e sem lactose",
        description: "O melhor doce.",
        image:
          "./assets/produtos/DocesFazendaDeMinas/fondant-de-leite-sem-adicao-sem-lactose.webp",
        price: 29.9,
      },
      {
        name: "Jam cascão sem adição de açúcar",
        description: "O melhor doce.",
        image:
          "./assets/produtos/DocesFazendaDeMinas/jam-cascao-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Pé de moça sem adição de açúcar",
        description: "O melhor doce.",
        image:
          "./assets/produtos/DocesFazendaDeMinas/pe-de-moca-sem-adicao.webp",
        price: 29.9,
      },
    ],
    EmporioLessa: [
      {
        name: "Doce de leite com raspas de limão 400g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/EmporioLessa/doce-de-leite-raspas-limao-400g.webp",
        price: 29.9,
      },
      {
        name: "Molho de rapadura",
        description: "O melhor doce.",
        image:
          "./assets/produtos/EmporioLessa/emporio-lessa-molho-de-rapadura.webp",
        price: 29.9,
      },
    ],
    FamilleChaulet: [
      {
        name: "Salame Colonial",
        description: "O melhor salame.",
        image: "./assets/produtos/FamilleChaulet/salame-colonial.webp",
        price: 29.9,
      },
      {
        name: "Salame com queijo",
        description: "O melhor salame.",
        image: "./assets/produtos/FamilleChaulet/salame-com-queijo.webp",
        price: 29.9,
      },
      {
        name: "Salame de avestruz",
        description: "O melhor salame.",
        image: "./assets/produtos/FamilleChaulet/salame-de-avestruz.webp",
        price: 29.9,
      },
      {
        name: "Salame de Carne Bovina",
        description: "O melhor salame.",
        image: "./assets/produtos/FamilleChaulet/salame-de-carne-bovina.webp",
        price: 29.9,
      },
      {
        name: "Salame de Javali",
        description: "O melhor salame.",
        image: "./assets/produtos/FamilleChaulet/salame-de-javali.webp",
        price: 29.9,
      },
      {
        name: "Salame Gaúcho",
        description: "O melhor salame.",
        image: "./assets/produtos/FamilleChaulet/salame-gaucho.webp",
        price: 29.9,
      },
      {
        name: "Salame tipo alemão",
        description: "O melhor salame.",
        image: "./assets/produtos/FamilleChaulet/salame-tipo-alemao.webp",
        price: 29.9,
      },
      {
        name: "Salame tipo argentino",
        description: "O melhor salame.",
        image: "./assets/produtos/FamilleChaulet/salame-tipo-argentino.webp",
        price: 29.9,
      },
    ],
    Frentano: [
      {
        name: "Pesto de azeitona preta",
        description: "O melhor pesto.",
        image:
          "./assets/produtos/Frentano/frentano-pesto-de-azeitona-preta.webp",
        price: 29.9,
      },
      {
        name: "Sardella",
        description: "A melhor sardella.",
        image: "./assets/produtos/Frentano/frentano-sardella.webp",
        price: 29.9,
      },
    ],
    IlCuoco: [
      {
        name: "Risotto de Abóbora sache",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-abobora-sache.webp",
        price: 29.9,
      },
      {
        name: "Risotto de Alho Poró sache",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-alho-poro-sache.webp",
        price: 29.9,
      },
      {
        name: "Risotto de Alla Carbonara pote",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-alla-carbonara.webp",
        price: 29.9,
      },
      {
        name: "Risotto de Alla milanese sache",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-alla-milanese-sache.webp",
        price: 29.9,
      },
      {
        name: "Risotto Alla Napoletana sache",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-alla-napoletana-sache.webp",
        price: 29.9,
      },
      {
        name: "Risotto Alla Napoletana Pote",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-alla-napoletana.webp",
        price: 29.9,
      },
      {
        name: "Risotto Alle Funghi pote",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-alle-funghi.webp",
        price: 29.9,
      },
      {
        name: "Risotto de Alle Verdure sache",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-alle-verdure-sache.webp",
        price: 29.9,
      },
      {
        name: "Risotto de Beterraba sache",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-beterraba-sache.webp",
        price: 29.9,
      },
      {
        name: "Risotto de Damasco com Amêndoas",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-damasco-com-amendoas.webp",
        price: 29.9,
      },
      {
        name: "Risotto de Funghi sache",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-funghi-sache.webp",
        price: 29.9,
      },
      {
        name: "Risotto de Limão Siciliano pote",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-limao-siciliano.webp",
        price: 29.9,
      },
      {
        name: "Risotto de Maçã e Castanhas pote",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-maca-e-castanhas.webp",
        price: 29.9,
      },
      {
        name: "Risotto de Pera e Nozes pote",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-pera-e-nozes.webp",
        price: 29.9,
      },
      {
        name: "Risotto Limão Siciliano sache",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-siciliano-sache.webp",
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
