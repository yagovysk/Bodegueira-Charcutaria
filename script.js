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
        price: 51.0,
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
        price: 58.0,
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
        price: 38.9,
      },
      {
        name: "Vinagre de alho Negro",
        description: "O melhor sabor.",
        image: "./assets/produtos/AlhoNegro/vinagre-alho-negro.webp",
        price: 28.9,
      },
    ],
    Mel: [
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
      {
        name: "Bisnaga Mel silvestre",
        description: "O melhor mel.",
        image: "./assets/produtos/BrazilianFlavor/mel-flavor-silvestre.webp",
        price: 31.0,
      },
      {
        name: "Favo de Mel",
        description: "O melhor mel.",
        image: "./assets/produtos/Mbee/favo-de-mel.webp",
        price: 29.9,
      },
      {
        name: "Mel Mbee 300g",
        description: "O melhor mel.",
        image: "./assets/produtos/Mbee/mbee-mel-300g.webp",
        price: 29.9,
      },
      {
        name: "Mel Mbee Black Forest 300g",
        description: "O melhor mel.",
        image: "./assets/produtos/Mbee/mbee-mel-black-forest.webp",
        price: 29.9,
      },
      {
        name: "Mel Mbee Canions gaúchos",
        description: "O melhor mel.",
        image: "./assets/produtos/Mbee/mel-canions-gauchos.webp",
        price: 29.9,
      },
      {
        name: "Mel do Cerrado Aroeira",
        description: "O melhor mel.",
        image: "./assets/produtos/MelDoCerrado/mel-aroeira.webp",
        price: 29.9,
      },
      {
        name: "Mel do Cerrado Cipó Uva",
        description: "O melhor mel.",
        image: "./assets/produtos/MelDoCerrado/mel-cipo-uva.webp",
        price: 29.9,
      },
      {
        name: "Mel do Cerrado Laranjeira",
        description: "O melhor mel.",
        image: "./assets/produtos/MelDoCerrado/mel-laranjeira.webp",
        price: 29.9,
      },
      {
        name: "Mel do Cerrado Silvestre",
        description: "O melhor mel.",
        image: "./assets/produtos/MelDoCerrado/mel-silvestre.webp",
        price: 29.9,
      },
    ],
    DoceDeLeite: [
      {
        name: "Doce de leite de ovelha 160g",
        description: "O melhor doce de leite.",
        image: "./assets/produtos/CasaBianchi/doce-ovelha-160.webp",
        price: 35.0,
      },
      {
        name: "Doce de leite de ovelha 260g",
        description: "O melhor doce de leite.",
        image: "./assets/produtos/CasaBianchi/doce-ovelha-260.webp",
        price: 46.0,
      },
      {
        name: "Doce de leite de ovelha 660g",
        description: "O melhor doce de leite.",
        image: "./assets/produtos/CasaBianchi/doce-ovelha-660.webp",
        price: 85.0,
      },
      {
        name: "Doce de leite com raspas de limão 400g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/EmporioLessa/doce-de-leite-raspas-limao-400g.webp",
        price: 46.0,
      },
      {
        name: "Doce de Leite com ameixa Dona Lazara 400g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/doce-de-leite-ameixa-400g.webp",
        price: 29.9,
      },
      {
        name: "Doce de Leite Barra Dona Lazara 220g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/bananada-saquinhos-150g.webp",
        price: 29.9,
      },
      {
        name: "Doce de Leite com Goiabada Dona Lazara 400g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/doce-de-leite-goiabada-400g.webp",
        price: 29.9,
      },
      {
        name: "Doce de Leite com goiabada Dona Lazara saquinho 150g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/doce-de-leite-goiabada-saquinhos-150g.webp",
        price: 29.9,
      },
      {
        name: "Doce de Leite com Maracujá Dona Lazara 400g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/doce-de-leite-maracuja-400g.webp",
        price: 29.9,
      },
      {
        name: "Doce de Leite com Morango Dona Lazara 400g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/doce-de-leite-morango-400g.webp",
        price: 29.9,
      },
      {
        name: "Doce de Leite Dona Lazara saquinho 150g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/doce-de-leite-saquinhos-150g.webp",
        price: 29.9,
      },
      {
        name: "Doce de Leite Talhado Dona Lazara 400g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/doce-de-leite-talhado-400g.webp",
        price: 29.9,
      },
      {
        name: "Doce de Leite com café 400g",
        description: "O melhor doce.",
        image: "./assets/produtos/ReceitaCaipira/doce-de-leite-cafe-400g.webp",
        price: 29.9,
      },
      {
        name: "Doce de Leite Caipira 400g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ReceitaCaipira/doce-de-leite-caipira-400g.webp",
        price: 29.9,
      },
      {
        name: "Doce de Leite com Côco 400g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ReceitaCaipira/doce-de-leite-com-coco-400g.webp",
        price: 29.9,
      },
    ],
    Geleias: [
      {
        name: "Geleia de Amora com Hortelã",
        description: "A melhor Geleia.",
        image: "./assets/produtos/LetsCook/lets-cook-amora-com-hortela.webp",
        price: 29.9,
      },
      {
        name: "Geleia de Frutas Amarelas",
        description: "A melhor Geleia.",
        image: "./assets/produtos/LetsCook/lets-cook-frutas-amarelas.webp",
        price: 29.9,
      },
      {
        name: "Melado de Cana Balsamico",
        description: "O melhor melado.",
        image:
          "./assets/produtos/LetsCook/lets-cook-melado-de-cana-balsamico.webp",
        price: 29.9,
      },
      {
        name: "Geleia de Morango com Manjericão",
        description: "A melhor Geleia.",
        image:
          "./assets/produtos/LetsCook/lets-cook-morango-com-manjericao.webp",
        price: 29.9,
      },
      {
        name: "Geleia de Pimenta Defumada",
        description: "A melhor Geleia.",
        image: "./assets/produtos/LetsCook/lets-cook-pimenta-defumada.webp",
        price: 29.9,
      },
      {
        name: "Geleia Tamara com Laranja",
        description: "A melhor Geleia.",
        image: "./assets/produtos/LetsCook/lets-cook-tamara-com-laranja.webp",
        price: 29.9,
      },
      {
        name: "Geleia de Tomate com Manjericão",
        description: "A melhor Geleia.",
        image:
          "./assets/produtos/LetsCook/lets-cook-tomate-com-manjericao.webp",
        price: 29.9,
      },
      {
        name: "Bisnaga Geleia de frutas vermelhas zero",
        description: "A melhor geleia.",
        image:
          "./assets/produtos/BrazilianFlavor/geleia-flavor-frutas-vermelhas-zero.webp",
        price: 31.0,
      },
      {
        name: "Bisnaga Geleia de goiaba com pimenta amazônica",
        description: "A melhor geleia.",
        image:
          "./assets/produtos/BrazilianFlavor/geleia-flavor-goiaba-com-pimenta-amazonia.webp",
        price: 31.0,
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
        name: "Geleia MeLambuzei Damasco",
        description: "A melhor geleia.",
        image: "./assets/produtos/MeLambuzei/me-lambuzei-damasco.webp",
        price: 29.9,
      },
      {
        name: "Geleia MeLambuzei Framboesa",
        description: "A melhor geleia.",
        image: "./assets/produtos/MeLambuzei/me-lambuzei  -framboesa.webp",
        price: 29.9,
      },
      {
        name: "Geleia MeLambuzei Abacaxi",
        description: "A melhor geleia.",
        image:
          "./assets/produtos/MeLambuzei/me-lambuzei-geleia-de-abacaxi.webp",
        price: 29.9,
      },
      {
        name: "Geleia MeLambuzei Pimenta",
        description: "A melhor geleia.",
        image: "./assets/produtos/MeLambuzei/me-lambuzei-geleia-pimenta.webp",
        price: 29.9,
      },
      {
        name: "Geleia MeLambuzei Laranja",
        description: "A melhor geleia.",
        image: "./assets/produtos/MeLambuzei/me-lambuzei-laranja.webp",
        price: 29.9,
      },
      {
        name: "Geleia MeLambuzei Manga com Maracujá",
        description: "A melhor geleia.",
        image:
          "./assets/produtos/MeLambuzei/me-lambuzei-manga-com-maracuja.webp",
        price: 29.9,
      },
      {
        name: "Geleia MeLambuzei Mexerica",
        description: "A melhor geleia.",
        image: "./assets/produtos/MeLambuzei/me-lambuzei-mecerica.webp",
        price: 29.9,
      },
      {
        name: "Geleia MeLambuzei Morango",
        description: "A melhor geleia.",
        image: "./assets/produtos/MeLambuzei/me-lambuzei-morango.webp",
        price: 29.9,
      },
      {
        name: "Geleia MeLambuzei Tomate com Manjericão",
        description: "A melhor geleia.",
        image:
          "./assets/produtos/MeLambuzei/me-lambuzei-tomate-com-manjericao.webp",
        price: 29.9,
      },
      {
        name: "Geleia de Cupuaçu Sem adição de Açúcar",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/geleia-cupuacu-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Geleia de Abacaxi com Pimenta Sem adição de Açúcar",
        description: "O melhor doce.",
        image:
          "./assets/produtos/Puro&Leve/geleia-de-abacaxi-com-pimenta-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Geleia de Ameixa Sem adição de Açúcar",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/geleia-de-ameixa-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Geleia de Cereja Negra Sem adição de Açúcar",
        description: "O melhor doce.",
        image:
          "./assets/produtos/Puro&Leve/geleia-de-cereja-neegra-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Geleia de Damasco Sem adição de Açúcar",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/geleia-de-damasco-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Geleia de Framboesa Sem adição de Açúcar",
        description: "O melhor doce.",
        image:
          "./assets/produtos/Puro&Leve/geleia-de-framboesa-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Geleia de Goiaba Sem adição de Açúcar",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/geleia-de-goiaba-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Geleia de laranja Sem adição de Açúcar",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/geleia-de-laranja-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Geleia de Morango Sem adição de Açúcar",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/geleia-de-morango-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Geleia de Pimenta Sem adição de Açúcar",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/geleia-de-pimenta-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Geleia de Tangerina Sem adição de Açúcar",
        description: "O melhor doce.",
        image:
          "./assets/produtos/Puro&Leve/geleia-de-tangerina-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Geleia de Frutas Amarelas Sem adição de Açúcar",
        description: "O melhor doce.",
        image:
          "./assets/produtos/Puro&Leve/geleia-de-frutas-amarelas-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Geleia Keto de Damasco",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/geleia-keto-damasco.webp",
        price: 29.9,
      },
      {
        name: "Geleia Keto de Frutas Vermelhas",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/geleia-keto-frutas-vermelhas.webp",
        price: 29.9,
      },
      {
        name: "Geleia Keto Goiaba",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/geleia-keto-goiaba.webp",
        price: 29.9,
      },
      {
        name: "Geleia Keto de Manga com Maracujá",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/geleia-keto-manga-maracuja.webp",
        price: 29.9,
      },
      {
        name: "Geleia Keto de Morango",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/geleia-keto-morango.webp",
        price: 29.9,
      },
      {
        name: "Geleia de Kiwi Sem adição de Açúcar",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/geleia-kiwi-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Geleia de Pitaya com Amora e Morango Sem adição de Açúcar",
        description: "O melhor doce.",
        image:
          "./assets/produtos/Puro&Leve/geleia-pitaya-amora-morango-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Geleia de Uva Sem adição de Açúcar",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/geleia-uva-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Geleia da Tereza Goiaba e Pimenta",
        description: "A melhor geleia.",
        image: "./assets/produtos/TabuleiroDaChef/goiaba-e-pimenta.webp",
        price: 29.9,
      },
      {
        name: "Geleia da Tereza de Jabuticaba com Pimenta",
        description: "A melhor geleia.",
        image: "./assets/produtos/TabuleiroDaChef/jabuticaba-pimenta.webp",
        price: 29.9,
      },
      {
        name: "Geleia de Mangaba e Pimenta da Tereza",
        description: "A melhor geleia.",
        image: "./assets/produtos/TabuleiroDaChef/mangaba-e-pimenta.webp",
        price: 29.9,
      },
      {
        name: "Geleia de Pimenta da Tereza",
        description: "A melhor geleia.",
        image: "./assets/produtos/TabuleiroDaChef/pimenta-de-tereza.webp",
        price: 29.9,
      },
      {
        name: "Geleia de Umbu e Pimenta da Tereza",
        description: "A melhor geleia.",
        image: "./assets/produtos/TabuleiroDaChef/umbu-e-pimenta.webp",
        price: 29.9,
      },
      {
        name: "ZappaGeleia de Abacaxi com Pimenta",
        description: "A melhor Geleia.",
        image: "./assets/produtos/zappageleias/zappa-abacaxi-com-pimenta.webp",
        price: 29.9,
      },
      {
        name: "ZappaGeleia de Cebola Stout e Mostarda",
        description: "A melhor Geleia.",
        image:
          "./assets/produtos/zappageleias/zappa-cebola-stout-mostarda.webp",
        price: 29.9,
      },
      {
        name: "ZappaGeleia de Limão Laranja e Manjericão",
        description: "A melhor Geleia.",
        image:
          "./assets/produtos/zappageleias/zappa-limao-laranja-manjericao.webp",
        price: 29.9,
      },
      {
        name: "ZappaGeleia de Maracujá com Pimenta",
        description: "A melhor Geleia.",
        image: "./assets/produtos/zappageleias/zappa-maracuja-com-pimenta.webp",
        price: 29.9,
      },
      {
        name: "ZappaGeleia de Mexerica Clementina",
        description: "A melhor Geleia.",
        image: "./assets/produtos/zappageleias/zappa-mexerica-clementina.webp",
        price: 29.9,
      },
      {
        name: "ZappaGeleia de Morango Cumaru e Amora",
        description: "A melhor Geleia.",
        image: "./assets/produtos/zappageleias/zappa-morango-cumaru-amora.webp",
        price: 29.9,
      },
      {
        name: "ZappaGeleia de Pimenta com Mostarda",
        description: "A melhor Geleia.",
        image: "./assets/produtos/zappageleias/zappa-pimenta-com-mostarda.webp",
        price: 29.9,
      },
    ],
    Torrones: [
      {
        name: "Torrone de Amêndoas Avelã e Castanha com Mel 45g",
        description: "O melhor torrone.",
        image:
          "./assets/produtos/Torrones/torrone-amendoa-avela-castanha-mel-45g.webp",
        price: 29.9,
      },
      {
        name: "Torrone de amêndoas avelã e castanha sem Mel 45g",
        description: "O melhor torrone.",
        image:
          "./assets/produtos/Torrones/torrone-amendoa-avela-castanha-sem-mel-45g.webp",
        price: 29.9,
      },
      {
        name: "Torrone de Amêndoas com Chocolate 45g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-amendoa-choco-45g.webp",
        price: 29.9,
      },
      {
        name: "Torrone de Amêndoas com Chocolate 90g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-amendoa-chocolate.webp",
        price: 29.9,
      },
      {
        name: "Torrone de Amêndoas 90g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-amendoas.webp",
        price: 29.9,
      },
      {
        name: "Torrone de Amêndoas Avelã 90g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-amendoas.webp",
        price: 29.9,
      },
      {
        name: "Torrone de Amêndoas avelã e Castanha de Cajú 90g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-castanha.webp",
        price: 29.9,
      },
      {
        name: "Torrone de Amêndoas Avelã Damasco e Cranberry 90g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-damasco-cranberry.webp",
        price: 29.9,
      },
      {
        name: "Torrone de Frutas Vermelhas 45g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-frutas-vermelhas-45g.webp",
        price: 29.9,
      },
      {
        name: "Torrone de Frutas Vermelhas 90g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-frutas-vermelhas.webp",
        price: 29.9,
      },
      {
        name: "Torrone de Laranja com Chocolate Branco 45g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-laranja-choco-branco.webp",
        price: 29.9,
      },
      {
        name: "Torrone de Laranja com Chocolate Branco 90g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-laranja-chocolate.webp",
        price: 29.9,
      },
      {
        name: "Torrone de Amêndoas com Pistache 45g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-pistache-45g.webp",
        price: 29.9,
      },
      {
        name: "Torrone de Amêndoas com Pistache 90g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-pistache.webp",
        price: 29.9,
      },
    ],
    Doces: [
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
        name: "Bala de Goiabada",
        description: "A melhor Bala.",
        image: "./assets/produtos/Jatiboca/bala-goiabada.webp",
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
      {
        name: "Bisnaga Cebola Roxa Caramelizada",
        description: "A melhor.",
        image:
          "./assets/produtos/BrazilianFlavor/flavor-cebola-roxa-caramelizada.webp",
        price: 29.9,
      },
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
      {
        name: "Caramelo com chocolate e laranja",
        description: "O melhor doce.",
        image: "./assets/produtos/Olina/olina-caramelo-choco-com-laranja.webp",
        price: 29.9,
      },
      {
        name: "Caramelo com Mix de castanhas",
        description: "O melhor doce.",
        image: "./assets/produtos/Olina/olina-caramelo-mix-castanhas.webp",
        price: 29.9,
      },
      {
        name: "Caramelo Salgado Bourbon",
        description: "O melhor doce.",
        image: "./assets/produtos/Olina/olina-caramelo-salgado-bourbon.webp",
        price: 29.9,
      },
      {
        name: "Caramelo Salgado Flor de Sal",
        description: "O melhor doce.",
        image:
          "./assets/produtos/Olina/olina-caramelo-salgado-flor-de-sal.webp",
        price: 29.9,
      },
      {
        name: "Bananada Dona Lazara saquinho 150g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/bananada-saquinhos-150g.webp",
        price: 29.9,
      },
      {
        name: "Doce bananada Dona Lazara 250g",
        description: "O melhor doce.",
        image: "./assets/produtos/ProdutosDonaLazara/doce-bananada-250g.webp",
        price: 29.9,
      },
      {
        name: "Doce de Abóbora com Côco Dona Lazara 220g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/doce-de-abobora-com-coco-220g.webp",
        price: 29.9,
      },
      {
        name: "Doce de Café Dona Lazara saquinho 150g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/doce-de-cafe-saquinhos-150g.webp",
        price: 29.9,
      },
      {
        name: "Bananada Dona Lazara saquinho 150g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/bananada-saquinhos-150g.webp",
        price: 29.9,
      },
      {
        name: "Doce Goiabada Cascão Dona Lazara 250g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/doce-goiabada-cascao-250g.webp",
        price: 29.9,
      },
      {
        name: "Goiabada Redonda Dona Lazara 200g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/goiabada-redonda-200g.webp",
        price: 29.9,
      },
      {
        name: "Goiabada Redonda Dona Lazara 500g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/goiabada-redonda-500g.webp",
        price: 29.9,
      },
      {
        name: "Pingo de Leite com amendoim Dona Lazara Saquinho 150g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/pingo-de-leite-com-amendoim-saquinhos-150g.webp",
        price: 29.9,
      },
      {
        name: "Pingo de Leite com amendoim Dona Lazara",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/pingo-de-leite-com-amendoim.webp",
        price: 29.9,
      },
      {
        name: "Pingo de Leite Dona Lazara Saquinho 150g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/pingo-de-leite-saquinhos-150g.webp",
        price: 29.9,
      },
      {
        name: "Creme de Avelã Zero Açúcar",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/creme-de-avela-zero.webp",
        price: 29.9,
      },
      {
        name: "Bananada da Roça 400g",
        description: "O melhor doce.",
        image: "./assets/produtos/ReceitaCaipira/bananada-da-roca.webp",
        price: 29.9,
      },
      {
        name: "Cocada Mineira Branca 400g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ReceitaCaipira/cocada-mineira-branca-400g.webp",
        price: 29.9,
      },
      {
        name: "Serra Negra Bala Quebraqueixo",
        description: "O melhor doce.",
        image: "./assets/produtos/SerraNegra/bala-quebraqueixo.webp",
        price: 29.9,
      },
      {
        name: "Cocada de Abóbora",
        description: "O melhor doce.",
        image: "./assets/produtos/TabuleiroDaChef/cocada-de-abobora.webp",
        price: 29.9,
      },
      {
        name: "Cocada de Abóbora",
        description: "O melhor doce.",
        image: "./assets/produtos/TabuleiroDaChef/cocada-de-abobora.webp",
        price: 29.9,
      },
      {
        name: "Cocada de Tereza Tradicional",
        description: "O melhor doce.",
        image:
          "./assets/produtos/TabuleiroDaChef/cocada-de-tereza-tradicional.webp",
        price: 29.9,
      },
    ],
    BebidasAlcoolicas: [
      {
        name: "Licor de doce de leite com pistache 250ml",
        description: "O melhor doce de licor.",
        image: "./assets/produtos/CasaBianchi/licor-com-pistache-250ml.webp",
        price: 69.0,
      },
      {
        name: "Licor creme de doce de leite de ovelha 250ml",
        description: "O melhor doce de leite.",
        image:
          "./assets/produtos/CasaBianchi/licor-creme-doce-ovelha-250ml.webp",
        price: 54.0,
      },
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
      {
        name: "Cachaça Cana da Terra",
        description: "3 madeiras.",
        image: "./assets/produtos/CanaDaTerra/cana-da-terra-3-madeiras.webp",
        price: 120.0,
      },
      {
        name: "Flor de Moncello da Tereza",
        description: "A melhor bebida.",
        image: "./assets/produtos/TabuleiroDaChef/flor-de-mOncello.webp",
        price: 29.9,
      },
      {
        name: "Licor de Jenipapo da Tereza",
        description: "A melhor bebida.",
        image: "./assets/produtos/TabuleiroDaChef/licor-de-jenipapo.webp",
        price: 29.9,
      },
    ],
    Salames: [
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
      {
        name: "Salaminho Italiano com Azeitona",
        description: "O melhor salaminho.",
        image:
          "./assets/produtos/ImperioGourmet/salaminho-italiano-com-azeitona.webp",
        price: 29.9,
      },
      {
        name: "Salaminho Italiano com Pimenta Biquinho",
        description: "O melhor salaminho.",
        image:
          "./assets/produtos/ImperioGourmet/salaminho-italianp-com-pimenta-biquinho.webp",
        price: 29.9,
      },
      {
        name: "Calabresa Seca",
        description: "A melhor calabresa.",
        image: "./assets/produtos/Mayer/calabresa-seca.webp",
        price: 29.9,
      },
      {
        name: "Salame de Cordeiro",
        description: "O melhor salame.",
        image: "./assets/produtos/Mayer/salame-de-cordeiro.webp",
        price: 29.9,
      },
      {
        name: "Embutido de Carne Suína",
        description: "O melhor salame.",
        image:
          "./assets/produtos/SalumeriaRomani/embutido-de-carne-suina-cracovia.webp",
        price: 29.9,
      },
      {
        name: "Salame tipo Cacoatore",
        description: "O melhor salame.",
        image: "./assets/produtos/SalumeriaRomani/salame-tipo-cacoatore.webp",
        price: 29.9,
      },
      {
        name: "Salame tipo Napolitano",
        description: "O melhor salame.",
        image: "./assets/produtos/SalumeriaRomani/salame-tipo-napolitano.webp",
        price: 29.9,
      },
      {
        name: "Copa Defumada Especial",
        description: "O melhor salame.",
        image:
          "./assets/produtos/SalumeriaSrcCaminhosDePedra/copa-defumada-especial.webp",
        price: 29.9,
      },
    ],
    Queijos: [
      {
        name: "Queijo provolone desidratado com goiabada 215g",
        description: "O melhor queijo.",
        image:
          "./assets/produtos/SagradoQueijo/queijo-com-goiabada-pequeno.webp",
        price: 38.0,
      },
      {
        name: "Queijo provolone desidratado com goiabada 350g",
        description: "O melhor queijo.",
        image:
          "./assets/produtos/SagradoQueijo/queijo-com-goiabada-grande.webp",
        price: 53.0,
      },
    ],
    Manteigas: [
      {
        name: "Manteiga Ghee com Alecrim",
        description: "A melhor manteiga.",
        image:
          "./assets/produtos/ManteigariaNacional/manteiga-ghee-alecrim.webp",
        price: 29.9,
      },
      {
        name: "Manteiga Ghee com Noz Moscada e Pimenta Seca",
        description: "A melhor manteiga.",
        image:
          "./assets/produtos/ManteigariaNacional/manteiga-ghee-noz-moscada-pimenta-seca.webp",
        price: 29.9,
      },
      {
        name: "Manteiga Ghee com Tamara",
        description: "A melhor manteiga.",
        image:
          "./assets/produtos/ManteigariaNacional/manteiga-ghee-tamara.webp",
        price: 29.9,
      },
      {
        name: "Manteiga Ghee",
        description: "A melhor manteiga.",
        image: "./assets/produtos/ManteigariaNacional/manteiga-ghee.webp",
        price: 29.9,
      },
    ],
    Temperos: [
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
      {
        name: "Sal marinho defumado",
        description: "O melhor bacon.",
        image: "./assets/produtos/ColdSmoke/sal-marinho-defumado.webp",
        price: 29.9,
      },
      {
        name: "Tempero da Tereza Arrozinho",
        description: "A melhor farofa.",
        image:
          "./assets/produtos/TabuleiroDaChef/tempero-de-tereza-arrozinho.webp",
        price: 29.9,
      },
      {
        name: "Tempero da Tereza Bifinho",
        description: "A melhor farofa.",
        image:
          "./assets/produtos/TabuleiroDaChef/tempero-de-tereza-bifinho.webp",
        price: 29.9,
      },
      {
        name: "Tempero da Tereza Cordeirinho",
        description: "A melhor farofa.",
        image:
          "./assets/produtos/TabuleiroDaChef/tempero-de-tereza-cordeirinho.webp",
        price: 29.9,
      },
      {
        name: "Tempero da Tereza Feijãozinho",
        description: "A melhor farofa.",
        image:
          "./assets/produtos/TabuleiroDaChef/tempero-de-tereza-feijaozinho.webp",
        price: 29.9,
      },
      {
        name: "Tempero da Tereza Franguinho",
        description: "A melhor farofa.",
        image:
          "./assets/produtos/TabuleiroDaChef/tempero-de-tereza-franguinho.webp",
        price: 29.9,
      },
      {
        name: "Tempero da Tereza Leguminho",
        description: "A melhor farofa.",
        image:
          "./assets/produtos/TabuleiroDaChef/tempero-de-tereza-leguminho.webp",
        price: 29.9,
      },
      {
        name: "Tempero da Tereza Peixinho",
        description: "A melhor farofa.",
        image:
          "./assets/produtos/TabuleiroDaChef/tempero-de-tereza-peixinho.webp",
        price: 29.9,
      },
    ],
    Farofas: [
      {
        name: "Farinha da Tereza",
        description: "A melhor farofa.",
        image: "./assets/produtos/TabuleiroDaChef/farinha-de-tereza.webp",
        price: 29.9,
      },
      {
        name: "Farofa da Tereza Amarelinha",
        description: "A melhor farofa.",
        image: "./assets/produtos/TabuleiroDaChef/farofa-amarelinha.webp",
        price: 29.9,
      },
      {
        name: "Farofa da Tereza Branquinha",
        description: "A melhor farofa.",
        image: "./assets/produtos/TabuleiroDaChef/farofa-branquinha.webp",
        price: 29.9,
      },
      {
        name: "Farofa da Tereza Verdinha",
        description: "A melhor farofa.",
        image:
          "./assets/produtos/TabuleiroDaChef/farofa-da-tereza-verdinha.webp",
        price: 29.9,
      },
      {
        name: "Farofa da Tereza Sertaneja",
        description: "A melhor farofa.",
        image: "./assets/produtos/TabuleiroDaChef/farofa-sertaneja.webp",
        price: 29.9,
      },
    ],
    Pates: [
      {
        name: "Patê de Figado de Pato com geleia de Goiaba",
        description: "O melhor patê.",
        image:
          "./assets/produtos/LaPopote/pate-de-figado-com-geleia-de-goiaba.webp",
        price: 29.9,
      },
      {
        name: "Patê de Figado de Pato com geleia de Cebola",
        description: "O melhor patê.",
        image:
          "./assets/produtos/LaPopote/pate-de-figado-de-pato-com-geleia-de-cebola.webp",
        price: 29.9,
      },
      {
        name: "Patê de Figado de Pato",
        description: "O melhor patê.",
        image: "./assets/produtos/LaPopote/pate-de-figado-pato.webp",
        price: 29.9,
      },
      {
        name: "Patê de Ovas de Tainha",
        description: "O melhor patê.",
        image: "./assets/produtos/LaPopote/pate-de-ovas-de-tainha.webp",
        price: 29.9,
      },
      {
        name: "Patê de Pato",
        description: "O melhor patê.",
        image: "./assets/produtos/LaPopote/pate-de-pato.webp",
        price: 29.9,
      },
      {
        name: "Patê de Porco",
        description: "O melhor patê.",
        image: "./assets/produtos/LaPopote/pate-de-porco.webp",
        price: 29.9,
      },
    ],
    Risottos: [
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
    Molhos: [
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
      {
        name: "Molho de rapadura",
        description: "O melhor doce.",
        image:
          "./assets/produtos/EmporioLessa/emporio-lessa-molho-de-rapadura.webp",
        price: 43.0,
      },
    ],
    Biscoitos: [
      {
        name: "Rocêro Biscoito de polvilho Docim 80g",
        description: "O melhor biscoito.",
        image: "./assets/produtos/ProdutosRocero/biscoito-docim-80g.webp",
        price: 29.9,
      },
      {
        name: "Rocêro Biscoito de polvilho Parmesão 80g",
        description: "O melhor biscoito.",
        image: "./assets/produtos/ProdutosRocero/biscoito-parmesao-80g.webp",
        price: 29.9,
      },
      {
        name: "Rocêro Biscoito de polvilho Queijo Minas 80g",
        description: "O melhor biscoito.",
        image:
          "./assets/produtos/ProdutosRocero/biscoito-queijo-minas-80g.webp",
        price: 29.9,
      },
      {
        name: "Rocêro Biscoito de polvilho Salgadim 80g",
        description: "O melhor biscoito.",
        image: "./assets/produtos/ProdutosRocero/biscoito-salgadim-80g.webp",
        price: 29.9,
      },
      {
        name: "Grissini Alho e Salsa",
        description: "O melhor biscoito.",
        image: "./assets/produtos/L'apetisse/grissini-alho-salsa.webp",
        price: 29.9,
      },
      {
        name: "Grissini tradicional",
        description: "O melhor biscoito.",
        image: "./assets/produtos/L'apetisse/grissini-tradicional.webp",
        price: 29.9,
      },
      {
        name: "Torradas Vermont",
        description: "A melhor Torrada.",
        image: "./assets/produtos/Vermont/torradas-vermont.webp",
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
    const isOpen = dropdownMenu.classList.contains("show");

    if (isOpen) {
      dropdownMenu.classList.remove("show");
      dropdownButton.classList.remove("open");
    } else {
      dropdownMenu.classList.add("show");
      dropdownButton.classList.add("open");
    }
  });

  dropdownMenu?.addEventListener("click", (e) => {
    const target = e.target.closest("li");
    if (target) {
      const category = target.dataset.category;
      currentCategory = categories[category];
      currentIndex = 0;
      loadProducts();
      dropdownMenu.classList.remove("show");
      dropdownButton.classList.remove("open");

      // Marca a li clicada como ativa
      document
        .querySelectorAll(".dropdown-menu li")
        .forEach((li) => li.classList.remove("active"));
      target.classList.add("active");

      // Atualiza texto do botão, mantendo a seta
      dropdownButton.childNodes[0].textContent =
        target.textContent.trim().replace("›", "") + " ";

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
    const phone = "5561981894200";
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
