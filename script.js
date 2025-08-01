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

const cart = [];

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
  const menuToggle = document.querySelector(".menu-toggle");
  const menuClose = document.querySelector(".menu-close");
  const navMobile = document.querySelector(".nav-mobile");

  menuToggle?.addEventListener("click", () =>
    navMobile?.classList.add("active")
  );
  menuClose?.addEventListener("click", () =>
    navMobile?.classList.remove("active")
  );

  typeWriter(
    "typewriter-h1",
    "Bem-vindo a Bodegueira Charcutaria & Cia",
    100,
    () => {
      typeWriter("typewriter-h2", "A melhor do Distrito Federal!", 100, () => {
        typeWriter(
          "typewriter-p",
          "Os melhores produtos que uma bodegaria pode oferecer, não percam nossas ofertas!",
          100
        );
      });
    }
  );

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
      {
        name: "Caixa Alho Negro",
        description: "O melhor sabor.",
        image: "./assets/produtos/AlhoNegro/caixa-alho-negro.webp",
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
      {
        name: "Ayslla Laranja desidratada com mel",
        description: "O melhor doce.",
        image: "./assets/produtos/Ayslla/laranja-desidratada-com-mel.webp",
        price: 29.9,
      },
      {
        name: "Ayslla Coco defumado com mel",
        description: "O melhor doce.",
        image: "./assets/produtos/Ayslla/coco-defumado-com-mel.webp",
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
        name: "Doce de Leite Leite tipo A 420g",
        description: "O melhor doce de leite.",
        image: "./assets/produtos/Estrelat/doce-de-leite-tipo-a-420g.webp",
        price: 85.0,
      },
      {
        name: "Doce de Leite com ameixa Dona Lazara 400g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/doce-de-leite-ameixa-400g.webp",
        price: 43.9,
      },
      {
        name: "Doce de Leite com Goiabada Dona Lazara 400g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/doce-de-leite-goiabada-400g.webp",
        price: 43.9,
      },
      {
        name: "Doce de Leite com Maracujá Dona Lazara 400g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/doce-de-leite-maracuja-400g.webp",
        price: 43.9,
      },
      {
        name: "Doce de Leite com Morango Dona Lazara 400g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/doce-de-leite-morango-400g.webp",
        price: 43.9,
      },
      {
        name: "Doce de Leite Talhado Dona Lazara 400g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/doce-de-leite-talhado-400g.webp",
        price: 41.9,
      },
      {
        name: "Doce de Leite com café 400g",
        description: "O melhor doce.",
        image: "./assets/produtos/ReceitaCaipira/doce-de-leite-cafe-400g.webp",
        price: 42.9,
      },
      {
        name: "Doce de Leite Caipira 400g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ReceitaCaipira/doce-de-leite-caipira-400g.webp",
        price: 42.9,
      },
      {
        name: "Doce de Leite com Côco 400g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ReceitaCaipira/doce-de-leite-com-coco-400g.webp",
        price: 42.9,
      },
      {
        name: "Doce de leite com raspas de limão 400g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/EmporioLessa/doce-de-leite-raspas-limao-400g.webp",
        price: 46.0,
      },
      {
        name: "Doce de Leite com goiabada Dona Lazara saquinho 150g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/doce-de-leite-goiabada-saquinhos-150g.webp",
        price: 29.8,
      },
      {
        name: "Doce de Leite Dona Lazara saquinho 150g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/doce-de-leite-saquinhos-150g.webp",
        price: 29.8,
      },
      {
        name: "Pingo de Leite com amendoim Dona Lazara Saquinho 150g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/pingo-de-leite-com-amendoim-saquinhos-150g.webp",
        price: 29.8,
      },
      {
        name: "Pingo de Leite Dona Lazara Saquinho 150g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/pingo-de-leite-saquinhos-150g.webp",
        price: 29.8,
      },
      {
        name: "Pingo de Leite com amendoim Dona Lazara",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/pingo-de-leite-com-amendoim.webp",
        price: 29.8,
      },
    ],
    Cafe: [
      {
        name: "Café gourmet Cítrico laranja torra clara 1kg",
        description: "O melho Café.",
        image:
          "./assets/produtos/Divino/cafe-gourmet-citrico-laranja-torra-clara-1kg.webp",
        price: 142.9,
      },
      {
        name: "Café gourmet Cítrico laranja torra clara",
        description: "O melho Café.",
        image: "./assets/produtos/Divino/cafe-gourmet-citrico-torra-clara.webp",
        price: 46.9,
      },
      {
        name: "Café Especial 100% Arábica",
        description: "O melhor Café.",
        image: "./assets/produtos/RignoCafe/cafe-especial-100%-arabica.webp",
        price: 88.0,
      },
      {
        name: "Café Especial Torra Clara",
        description: "O melhor Café.",
        image: "./assets/produtos/RignoCafe/cafe-especial-torra-clara.webp",
        price: 47.5,
      },
      {
        name: "Café Gourmet Torra Escura",
        description: "O melhor Café.",
        image: "./assets/produtos/RignoCafe/cafe-gourmet-torra-escura.webp",
        price: 37.5,
      },
      {
        name: "Café Gourmet Torra Média",
        description: "O melhor Café.",
        image: "./assets/produtos/RignoCafe/cafe-gourmet-torra-media.webp",
        price: 37.5,
      },
      {
        name: "Chá do Cacao 200g",
        description: "O melhor Chá.",
        image: "./assets/produtos/ChocolateDoCacao/cha-do-cacao-200g.webp",
        price: 47.5,
      },
    ],
    DefumadosMaturados: [
      {
        name: "Scp Copa Defumada Especial",
        description: "Preço por peso, consultar no WhatsApp.",
        image:
          "./assets/produtos/SalumeriaSrcCaminhosDePedra/copa-defumada-especial.webp",
        price: 0.0,
      },
      {
        name: "Scp Copa Defumada Especial 1kg",
        description: "O melhor defumado.",
        image:
          "./assets/produtos/SalumeriaSrcCaminhosDePedra/copa-defumada-especial-maior.webp",
        price: 29.9,
      },
      {
        name: "Linguiça Calabresa Defumada",
        description: "O melhor defumado.",
        image:
          "./assets/produtos/CacianCharcutaria/linguica-calabresa-defumada.webp",
        price: 29.9,
      },
      {
        name: "Calabresa Defumada",
        description: "A melhor calabresa.",
        image: "./assets/produtos/ColdSmoke/calabresa-defumada.webp",
        price: 53.0,
      },
      {
        name: "Guanciale Maturado",
        description: "O melhor guanciale.",
        image: "./assets/produtos/ColdSmoke/guanciale-maturado.webp",
        price: 53.0,
      },
      {
        name: "Pastrami Defumado",
        description: "Pastrami Defumado.",
        image: "./assets/produtos/ColdSmoke/pastrami-defumado.webp",
        price: 53.0,
      },
      {
        name: "Pastrami Defumado em fatias",
        description: "O melhor pastrami.",
        image: "./assets/produtos/ColdSmoke/pastrami-defumado-fatias.webp",
        price: 53.0,
      },
      {
        name: "Pitlord Bacon Defumado",
        description: "O melhor Bacon.",
        image: "./assets/produtos/PitLord/bacon-defumado.webp",
        price: 53.0,
      },
      {
        name: "Pitlord Bacon Especial de Pernil Defumado",
        description: "O melhor Bacon.",
        image: "./assets/produtos/PitLord/bacon-especial-de-pernil.webp",
        price: 53.0,
      },
      {
        name: "Pitlord Guanciale Defumado",
        description: "O melhor guanciale.",
        image: "./assets/produtos/PitLord/guanciale-defumado.webp",
        price: 53.0,
      },
      {
        name: "Pitlord Pancetta Rolata Defumada 1kg",
        description: "A melhor pancetta.",
        image: "./assets/produtos/PitLord/pancetta-rolata-defumada-1kg.webp",
        price: 53.0,
      },
      {
        name: "Pitlord Pancetta Rolata Defumada",
        description: "A melhor pancetta.",
        image: "./assets/produtos/PitLord/pancetta-rolata-defumada.webp",
        price: 53.0,
      },
      {
        name: "Pitlord Picanha Suína Defumada",
        description: "A melhor picanha.",
        image: "./assets/produtos/PitLord/picanha-defumada.webp",
        price: 53.0,
      },
      {
        name: "Pitlord Salsicha Artesanal Defumada",
        description: "A melhor Salsicha.",
        image: "./assets/produtos/PitLord/salsicha-artesanal-defumada.webp",
        price: 53.0,
      },
      {
        name: "Pitlord Joelho Defumado",
        description: "O melhor joelho.",
        image: "./assets/produtos/PitLord/joelho-defumado.webp",
        price: 53.0,
      },
      {
        name: "ColdSmoke Pepperoni Picante",
        description: "O melhor pepperoni.",
        image: "./assets/produtos/ColdSmoke/pepperoni-picante.webp",
        price: 29.9,
      },
      {
        name: "ColdSmoke Pulled Pork",
        description: "A melhor pulled pork.",
        image: "./assets/produtos/ColdSmoke/pulled-pork.webp",
        price: 29.9,
      },
      {
        name: "ColdSmoke Salsicha Frank Furter",
        description: "A melhor salsicha.",
        image: "./assets/produtos/ColdSmoke/salsicha-frank-furter.webp",
        price: 29.9,
      },
      {
        name: "ColdSmoke Torresmo de Rolo",
        description: "O melhor torresmo.",
        image: "./assets/produtos/ColdSmoke/torresmo-de-rolo.webp",
        price: 29.9,
      },
      {
        name: "Olho Linguiça Blumenau",
        description: "A melhor linguiça.",
        image: "./assets/produtos/Olho/linguica-blumenau.webp",
        price: 29.9,
      },
      {
        name: "Olho Linguiça Húngara",
        description: "A melhor linguiça.",
        image: "./assets/produtos/Olho/linguica-hungara.webp",
        price: 29.9,
      },
    ],
    Geleias: [
      {
        name: "LetsCook Geleia de Amora com Hortelã",
        description: "A melhor Geleia.",
        image: "./assets/produtos/LetsCook/lets-cook-amora-com-hortela.webp",
        price: 46.0,
      },
      {
        name: "LetsCook Melado de Cana Balsamico",
        description: "O melhor melado.",
        image:
          "./assets/produtos/LetsCook/lets-cook-melado-de-cana-balsamico.webp",
        price: 40.0,
      },
      {
        name: "LetsCook Geleia de Morango com Manjericão",
        description: "A melhor Geleia.",
        image:
          "./assets/produtos/LetsCook/lets-cook-morango-com-manjericao.webp",
        price: 44.0,
      },
      {
        name: "LetsCook Geleia de Pimenta Defumada",
        description: "A melhor Geleia.",
        image: "./assets/produtos/LetsCook/lets-cook-pimenta-defumada.webp",
        price: 44.0,
      },
      {
        name: "LetsCook Geleia de Tomate com Manjericão",
        description: "A melhor Geleia.",
        image:
          "./assets/produtos/LetsCook/lets-cook-tomate-com-manjericao.webp",
        price: 44.0,
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
        price: 31.0,
      },
      {
        name: "Bisnaga Geleia de morango com baunilha",
        description: "A melhor geleia.",
        image:
          "./assets/produtos/BrazilianFlavor/geleia-flavor-morango-com-baunilha.webp",
        price: 31.0,
      },
      {
        name: "Bisnaga Cebola Roxa Caramelizada",
        description: "A melhor.",
        image:
          "./assets/produtos/BrazilianFlavor/flavor-cebola-roxa-caramelizada.webp",
        price: 31.0,
      },
      {
        name: "Geleia MeLambuzei Damasco",
        description: "A melhor geleia.",
        image: "./assets/produtos/MeLambuzei/me-lambuzei-damasco.webp",
        price: 39.0,
      },
      {
        name: "Geleia MeLambuzei Framboesa",
        description: "A melhor geleia.",
        image: "./assets/produtos/MeLambuzei/me-lambuzei-framboesa.webp",
        price: 39.0,
      },
      {
        name: "Geleia MeLambuzei Abacaxi",
        description: "A melhor geleia.",
        image:
          "./assets/produtos/MeLambuzei/me-lambuzei-geleia-de-abacaxi.webp",
        price: 39.0,
      },
      {
        name: "Geleia MeLambuzei Pimenta",
        description: "A melhor geleia.",
        image: "./assets/produtos/MeLambuzei/me-lambuzei-geleia-pimenta.webp",
        price: 39.0,
      },
      {
        name: "Geleia MeLambuzei Laranja",
        description: "A melhor geleia.",
        image: "./assets/produtos/MeLambuzei/me-lambuzei-laranja.webp",
        price: 39.0,
      },
      {
        name: "Geleia MeLambuzei Manga com Maracujá",
        description: "A melhor geleia.",
        image:
          "./assets/produtos/MeLambuzei/me-lambuzei-manga-com-maracuja.webp",
        price: 39.0,
      },
      {
        name: "Geleia MeLambuzei Mexerica",
        description: "A melhor geleia.",
        image: "./assets/produtos/MeLambuzei/me-lambuzei-mecerica.webp",
        price: 39.0,
      },
      {
        name: "Geleia MeLambuzei Morango",
        description: "A melhor geleia.",
        image: "./assets/produtos/MeLambuzei/me-lambuzei-morango.webp",
        price: 39.0,
      },
      {
        name: "Geleia MeLambuzei Tomate com Manjericão",
        description: "A melhor geleia.",
        image:
          "./assets/produtos/MeLambuzei/me-lambuzei-tomate-com-manjericao.webp",
        price: 39.0,
      },
      {
        name: "Tabuleiro Da Chef Geleia da Tereza Goiaba e Pimenta",
        description: "A melhor geleia.",
        image: "./assets/produtos/TabuleiroDaChef/goiaba-e-pimenta.webp",
        price: 26.0,
      },
      {
        name: "Tabuleiro Da Chef Geleia da Tereza de Jabuticaba com Pimenta",
        description: "A melhor geleia.",
        image: "./assets/produtos/TabuleiroDaChef/jabuticaba-pimenta.webp",
        price: 26.0,
      },
      {
        name: "Tabuleiro Da Chef Geleia de Mangaba e Pimenta da Tereza",
        description: "A melhor geleia.",
        image: "./assets/produtos/TabuleiroDaChef/mangaba-e-pimenta.webp",
        price: 26.0,
      },
      {
        name: "Tabuleiro Da Chef Geleia de Umbu e Pimenta da Tereza",
        description: "A melhor geleia.",
        image: "./assets/produtos/TabuleiroDaChef/umbu-e-pimenta.webp",
        price: 26.0,
      },
      {
        name: "ZappaGeleias de Abacaxi com Pimenta",
        description: "A melhor Geleia.",
        image: "./assets/produtos/zappageleias/zappa-abacaxi-com-pimenta.webp",
        price: 38.0,
      },
      {
        name: "ZappaGeleias de Cebola Stout e Mostarda",
        description: "A melhor Geleia.",
        image:
          "./assets/produtos/zappageleias/zappa-cebola-stout-mostarda.webp",
        price: 38.0,
      },
      {
        name: "ZappaGeleias de Limão Laranja e Manjericão",
        description: "A melhor Geleia.",
        image:
          "./assets/produtos/zappageleias/zappa-limao-laranja-manjericao.webp",
        price: 38.0,
      },
      {
        name: "ZappaGeleias de Maracujá com Pimenta",
        description: "A melhor Geleia.",
        image: "./assets/produtos/zappageleias/zappa-maracuja-com-pimenta.webp",
        price: 38.0,
      },
      {
        name: "ZappaGeleias de Mexerica Clementina",
        description: "A melhor Geleia.",
        image: "./assets/produtos/zappageleias/zappa-mexerica-clementina.webp",
        price: 38.0,
      },
      {
        name: "ZappaGeleias de Morango Cumaru e Amora",
        description: "A melhor Geleia.",
        image: "./assets/produtos/zappageleias/zappa-morango-cumaru-amora.webp",
        price: 38.0,
      },
      {
        name: "ZappaGeleias de Pimenta com Mostarda",
        description: "A melhor Geleia.",
        image: "./assets/produtos/zappageleias/zappa-pimenta-com-mostarda.webp",
        price: 38.0,
      },
      {
        name: "ZappaGeleias Pimenta Defumada 160g",
        description: "A melhor Geleia.",
        image:
          "./assets/produtos/zappageleias/zappa-pimenta-defumada-160g.webp",
        price: 38.0,
      },
      {
        name: "Geleia do cacao 240g",
        description: "A melhor geleia.",
        image: "./assets/produtos/ChocolateDoCacao/geleia-do-cacao-240g.webp",
        price: 39.8,
      },
      {
        name: "Geleia Chutney de maracujá",
        description: "A melhor geleia.",
        image: "./assets/produtos/GeleiaCoroa/chutney-maracuja.webp",
        price: 39.8,
      },
      {
        name: "Geleia de Maracujá com HUB de Churrasco",
        description: "A melhor geleia.",
        image:
          "./assets/produtos/GeleiaCoroa/geleia-de-maracuja-com-hub-de-churrasco.webp",
        price: 39.8,
      },
    ],
    GeleiasZero: [
      {
        name: "Puro&Leve Geleia de Cupuaçu Sem adição de Açúcar",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/geleia-cupuacu-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Puro&Leve Geleia de Abacaxi com Pimenta Sem adição de Açúcar",
        description: "O melhor doce.",
        image:
          "./assets/produtos/Puro&Leve/geleia-de-abacaxi-com-pimenta-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Puro&Leve Geleia de Ameixa Sem adição de Açúcar",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/geleia-de-ameixa-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Puro&Leve Geleia de Cereja Negra Sem adição de Açúcar",
        description: "O melhor doce.",
        image:
          "./assets/produtos/Puro&Leve/geleia-de-cereja-neegra-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Puro&Leve Geleia de Damasco Sem adição de Açúcar",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/geleia-de-damasco-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Puro&Leve Geleia de Framboesa Sem adição de Açúcar",
        description: "O melhor doce.",
        image:
          "./assets/produtos/Puro&Leve/geleia-de-framboesa-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Puro&Leve Geleia de Goiaba Sem adição de Açúcar",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/geleia-de-goiaba-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Puro&Leve Geleia de laranja Sem adição de Açúcar",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/geleia-de-laranja-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Puro&Leve Geleia de Morango Sem adição de Açúcar",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/geleia-de-morango-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Puro&Leve Geleia de Pimenta Sem adição de Açúcar",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/geleia-de-pimenta-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Puro&Leve Geleia de Tangerina Sem adição de Açúcar",
        description: "O melhor doce.",
        image:
          "./assets/produtos/Puro&Leve/geleia-de-tangerina-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Puro&Leve Geleia de Frutas Amarelas Sem adição de Açúcar",
        description: "O melhor doce.",
        image:
          "./assets/produtos/Puro&Leve/geleia-frutas-amarelas-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Puro&Leve Geleia de Kiwi Sem adição de Açúcar",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/geleia-kiwi-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Puro&Leve Geleia Frutas do Bosque Sem adição de Açúcar",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/frutas-do-bosque-sem-adicao.webp",
        price: 32.0,
      },
      {
        name: "Puro&Leve Geleia de Frutas Vermelhas Sem adição de Açúcar",
        description: "O melhor doce.",
        image:
          "./assets/produtos/Puro&Leve/geleia-de-frutas-vermelhas-sem-adicao.webp",
        price: 32.0,
      },
      {
        name: "Puro&Leve Geleia de Pitaya com Amora e Morango Sem adição de Açúcar",
        description: "O melhor doce.",
        image:
          "./assets/produtos/Puro&Leve/geleia-pitaya-amora-morango-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Puro&Leve Geleia Keto de Damasco",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/geleia-keto-damasco.webp",
        price: 32.0,
      },
      {
        name: "Puro&Leve Geleia de Uva Sem adição de Açúcar",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/geleia-uva-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Puro&Leve Geleia de Figo Zero",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/geleia-de-figo-zero-adicao.webp",
        price: 29.9,
      },
      {
        name: "Puro&Leve Geleia Keto de Frutas Vermelhas",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/geleia-keto-frutas-vermelhas.webp",
        price: 32.0,
      },
      {
        name: "Puro&Leve Geleia Keto Goiaba",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/geleia-keto-goiaba.webp",
        price: 32.0,
      },
      {
        name: "Puro&Leve Geleia Keto de Manga com Maracujá",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/geleia-keto-manga-maracuja.webp",
        price: 32.0,
      },
      {
        name: "Puro&Leve Geleia Keto de Morango",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/geleia-keto-morango.webp",
        price: 32.0,
      },
      {
        name: "DietHouse Doce de Abóbora com côco",
        description: "O melhor doce.",
        image: "./assets/produtos/DietHouse/diet-house-abobora-com-coco.webp",
        price: 28.9,
      },
      {
        name: "DietHouse Doce de Figo",
        description: "O melhor doce.",
        image: "./assets/produtos/DietHouse/diet-house-figo.webp",
        price: 28.9,
      },
      {
        name: "DietHouse Doce de goiaba",
        description: "O melhor doce.",
        image: "./assets/produtos/DietHouse/diet-house-goiaba.webp",
        price: 28.9,
      },
      {
        name: "DietHouse Goiabada",
        description: "O melhor doce.",
        image: "./assets/produtos/DietHouse/diet-house-goiabada.webp",
        price: 28.9,
      },
      {
        name: "DietHouse Doce de Mamão",
        description: "O melhor doce.",
        image: "./assets/produtos/DietHouse/diet-house-mamao.webp",
        price: 28.9,
      },
      {
        name: "DietHouse Doce de Manga",
        description: "O melhor doce.",
        image: "./assets/produtos/DietHouse/diet-house-manga.webp",
        price: 28.9,
      },
      {
        name: "DietHouse Doce de Pêssego",
        description: "O melhor doce.",
        image: "./assets/produtos/DietHouse/diet-house-pessego.webp",
        price: 28.9,
      },
      {
        name: "Doces Fazenda De Minas Ambrosia sem adição de açúcar 430g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/DocesFazendaDeMinas/ambrosia-sem-adicao-430g.webp",
        price: 29.9,
      },
      {
        name: "Doces Fazenda De Minas Bananada sem adição de açúcar",
        description: "O melhor doce.",
        image: "./assets/produtos/DocesFazendaDeMinas/bananada-sem-adicao.webp",
        price: 41.9,
      },
      {
        name: "Doces Fazenda De Minas Cocada sem adição de açúcar",
        description: "O melhor doce.",
        image: "./assets/produtos/DocesFazendaDeMinas/cocada-sem-adicao.webp",
        price: 52.9,
      },
      {
        name: "Doces Fazenda De Minas Fondant de leite sem adição de açúcar e sem lactose",
        description: "O melhor doce.",
        image:
          "./assets/produtos/DocesFazendaDeMinas/fondant-de-leite-sem-adicao-sem-lactose.webp",
        price: 48.9,
      },
      {
        name: "Doces Fazenda De Minas Fondant de leite sem adição de açúcar com Lactose",
        description: "O melhor doce.",
        image:
          "./assets/produtos/DocesFazendaDeMinas/fondant-de-leite-sem-adicao.webp",
        price: 48.9,
      },
      {
        name: "Doces Fazenda De Minas Jam cascão sem adição de açúcar",
        description: "O melhor doce.",
        image:
          "./assets/produtos/DocesFazendaDeMinas/jam-cascao-sem-adicao.webp",
        price: 43.9,
      },
      {
        name: "Puro&Leve Goiabada Cascão sem adição de açúcar",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/goiabada-cascao-zero.webp",
        price: 25.9,
      },
      {
        name: "Doces Fazenda De Minas Pé de moça sem adição de açúcar",
        description: "O melhor doce.",
        image:
          "./assets/produtos/DocesFazendaDeMinas/pe-de-moca-sem-adicao.webp",
        price: 56.9,
      },
      {
        name: "Doces Fazenda De Minas Mamão Ralado Sem adição de açúcar",
        description: "O melhor doce.",
        image:
          "./assets/produtos/DocesFazendaDeMinas/mamao-ralado-sem-adicao.webp",
        price: 56.9,
      },
      {
        name: "Puro&Leve Creme de Avelã Zero Açúcar",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/creme-de-avela-zero.webp",
        price: 36.0,
      },
      {
        name: "Puro&Leve Creme de Avelã Adoçado com Tâmara Zero Açúcar",
        description: "O melhor doce.",
        image:
          "./assets/produtos/Puro&Leve/creme-de-avela-adocado-com-tamara.webp",
        price: 36.0,
      },
      {
        name: "Puro&Leve Figada Zero",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/figada-zero.webp",
        price: 25.9,
      },
      {
        name: "Puro&Leve Goiabada Cascão Sem adição de açúcar",
        description: "O melhor doce.",
        image: "./assets/produtos/Puro&Leve/goiabada-cascao-sem-adicao.webp",
        price: 25.9,
      },
      {
        name: "Bisnaga Geleia de morango zero adição de açúcar",
        description: "A melhor geleia.",
        image:
          "./assets/produtos/BrazilianFlavor/geleia-flavor-morango-sem-adicao.webp",
        price: 31.0,
      },
      {
        name: "Bisnaga Geleia de frutas vermelhas zero",
        description: "A melhor geleia.",
        image:
          "./assets/produtos/BrazilianFlavor/geleia-flavor-frutas-vermelhas-zero.webp",
        price: 31.0,
      },
      {
        name: "LetsCook Geleia de Frutas Amarelas",
        description: "A melhor Geleia.",
        image: "./assets/produtos/LetsCook/lets-cook-frutas-amarelas.webp",
        price: 38.0,
      },
      {
        name: "LetsCook Geleia Tamara com Laranja",
        description: "A melhor Geleia.",
        image: "./assets/produtos/LetsCook/lets-cook-tamara-com-laranja.webp",
        price: 36.0,
      },
      {
        name: "Sabor Gaúcho Biscoito de Rosas Sem adição de Açúcar",
        description: "O melhor Biscoito.",
        image:
          "./assets/produtos/SaborGaucho/biscoito-de-rosas-sem-adicao.webp",
        price: 62.4,
      },
      {
        name: "Sabor Gaúcho Biscoito de Amendoim Sem adição de Açúcar",
        description: "O melhor Biscoito.",
        image:
          "./assets/produtos/SaborGaucho/biscoito-de-amendoim-sem-adicao.webp",
        price: 62.4,
      },
      {
        name: "Sabor Gaúcho Biscoito de Cacau Sem adição de Açúcar",
        description: "O melhor Biscoito.",
        image:
          "./assets/produtos/SaborGaucho/biscoito-de-cacau-sem-adicao.webp",
        price: 62.4,
      },
      {
        name: "Sabor Gaúcho Biscoito de Café Sem adição de Açúcar",
        description: "O melhor Biscoito.",
        image: "./assets/produtos/SaborGaucho/biscoito-de-cafe-sem-adicao.webp",
        price: 62.4,
      },
      {
        name: "Sabor Gaúcho Biscoito de Camomila Sem adição de Açúcar",
        description: "O melhor Biscoito.",
        image:
          "./assets/produtos/SaborGaucho/biscoito-de-camomila-sem-adicao.webp",
        price: 62.4,
      },
      {
        name: "Sabor Gaúcho Biscoito de Lavanda Sem adição de Açúcar",
        description: "O melhor Biscoito.",
        image:
          "./assets/produtos/SaborGaucho/biscoito-de-lavanda-sem-adicao.webp",
        price: 62.4,
      },
      {
        name: "Sabor Gaúcho Biscoito de Maracujá Sem adição de Açúcar",
        description: "O melhor Biscoito.",
        image:
          "./assets/produtos/SaborGaucho/biscoito-de-maracuja-sem-adicao.webp",
        price: 62.4,
      },
      {
        name: "Sabor Gaúcho Biscoito de Morango Sem adição de Açúcar",
        description: "O melhor Biscoito.",
        image:
          "./assets/produtos/SaborGaucho/biscoito-de-morango-sem-adicao.webp",
        price: 62.4,
      },
      {
        name: "Sabor Gaúcho Biscoito de Nozes Sem adição de Açúcar",
        description: "O melhor Biscoito.",
        image:
          "./assets/produtos/SaborGaucho/biscoito-de-nozes-sem-adicao.webp",
        price: 62.4,
      },
      {
        name: "Sabor Gaúcho Broa de Milho Sem adição de Açúcar",
        description: "O melhor Biscoito.",
        image: "./assets/produtos/SaborGaucho/broa-de-milho-sem-adicao.webp",
        price: 62.4,
      },
    ],
    Torrones: [
      {
        name: "Torrone de Amêndoas Avelã e Castanha com Mel 45g",
        description: "O melhor torrone.",
        image:
          "./assets/produtos/Torrones/torrone-amendoa-avela-castanha-mel-45g.webp",
        price: 16.0,
      },
      {
        name: "Torrone de amêndoas avelã e castanha sem Mel 45g",
        description: "O melhor torrone.",
        image:
          "./assets/produtos/Torrones/torrone-amendoa-avela-castanha-sem-mel-45g.webp",
        price: 15.0,
      },
      {
        name: "Torrone de Amêndoas com Chocolate 45g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-amendoa-choco-45g.webp",
        price: 18.0,
      },
      {
        name: "Torrone de Amêndoas com Chocolate 90g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-amendoa-chocolate.webp",
        price: 28.0,
      },
      {
        name: "Torrone de Amêndoas Figo com nozes 90g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-amendoas.webp",
        price: 24.0,
      },
      {
        name: "Torrone de Amêndoas avelã e Castanha de Cajú 90g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-castanha.webp",
        price: 24.0,
      },
      {
        name: "Torrone de Amêndoas Avelã Damasco e Cranberry 45g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-damasco-cranberry-45g.webp",
        price: 24.0,
      },
      {
        name: "Torrone de Amêndoas Avelã Damasco e Cranberry 90g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-damasco-cranberry.webp",
        price: 24.0,
      },
      {
        name: "Torrone de Frutas Vermelhas 45g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-frutas-vermelhas-45g.webp",
        price: 15.0,
      },
      {
        name: "Torrone de Frutas Vermelhas 90g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-frutas-vermelhas.webp",
        price: 24.0,
      },
      {
        name: "Torrone de Laranja com Chocolate Branco 45g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-laranja-choco-branco.webp",
        price: 15.0,
      },
      {
        name: "Torrone de Laranja com Chocolate Branco 90g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-laranja-chocolate.webp",
        price: 24.0,
      },
      {
        name: "Torrone de Amêndoas com Pistache 45g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-pistache-45g.webp",
        price: 18.0,
      },
      {
        name: "Torrone de Amêndoas com Pistache 90g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-pistache.webp",
        price: 28.0,
      },
    ],
    Doces: [
      {
        name: "Jatiboca Bala de Goiabada",
        description: "A melhor Bala.",
        image: "./assets/produtos/Jatiboca/bala-goiabada.webp",
        price: 56.0,
      },
      {
        name: "Doces Fazenda De Minas Ambrosia 420g",
        description: "O melhor doce.",
        image: "./assets/produtos/DocesFazendaDeMinas/ambrosia-420g.webp",
        price: 48.9,
      },
      {
        name: "Olina Caramelo com chocolate e laranja",
        description: "No momento indisponível.",
        image: "./assets/produtos/Olina/olina-caramelo-choco-com-laranja.webp",
        price: 0.0,
      },
      {
        name: "Olina Caramelo com Mix de castanhas",
        description: "No momento indisponível.",
        image: "./assets/produtos/Olina/olina-caramelo-mix-castanhas.webp",
        price: 0.0,
      },
      {
        name: "Olina Caramelo Salgado Bourbon",
        description: "No momento indisponível.",
        image: "./assets/produtos/Olina/olina-caramelo-salgado-bourbon.webp",
        price: 0.0,
      },
      {
        name: "Olina Caramelo Salgado Flor de Sal",
        description: "No momento indisponível.",
        image:
          "./assets/produtos/Olina/olina-caramelo-salgado-flor-de-sal.webp",
        price: 0.0,
      },
      {
        name: "Bananada Dona Lazara saquinho 150g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/bananada-saquinhos-150g.webp",
        price: 29.8,
      },
      {
        name: "Doce bananada Dona Lazara 250g",
        description: "O melhor doce.",
        image: "./assets/produtos/ProdutosDonaLazara/doce-bananada-250g.webp",
        price: 29.8,
      },
      {
        name: "Doce de Abóbora com Côco Dona Lazara 220g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/doce-de-abobora-com-coco-220g.webp",
        price: 29.8,
      },
      {
        name: "Doce de Café Dona Lazara saquinho 150g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/doce-de-cafe-saquinhos-150g.webp",
        price: 29.8,
      },
      {
        name: "Doce Goiabada Cascão Dona Lazara 250g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/doce-goiabada-cascao-250g.webp",
        price: 29.8,
      },
      {
        name: "Goiabada Redonda Dona Lazara 200g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/goiabada-redonda-200g.webp",
        price: 14.8,
      },
      {
        name: "Goiabada Redonda Dona Lazara 500g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/goiabada-redonda-500g.webp",
        price: 31.9,
      },
      {
        name: "Receita Caipira Bananada da Roça 400g",
        description: "O melhor doce.",
        image: "./assets/produtos/ReceitaCaipira/bananada-da-roca-400g.webp",
        price: 42.9,
      },
      {
        name: "Receita Caipira Cocada Mineira Branca 400g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ReceitaCaipira/cocada-mineira-branca-400g.webp",
        price: 47.6,
      },
      {
        name: "Serra Negra Bala Quebraqueixo",
        description: "O melhor doce.",
        image: "./assets/produtos/SerraNegra/bala-quebraqueixo.webp",
        price: 44.0,
      },
      {
        name: "Serra Negra Bala de Doce de Leite",
        description: "O melhor doce.",
        image: "./assets/produtos/SerraNegra/bala-de-doce-de-leite.webp",
        price: 44.0,
      },
      {
        name: "Tabuleiro Da Chef Cocada de Abóbora",
        description: "O melhor doce.",
        image: "./assets/produtos/TabuleiroDaChef/cocada-de-abobora.webp",
        price: 33.4,
      },
      {
        name: "Tabuleiro Da Chef Cocada de Tereza Tradicional",
        description: "O melhor doce.",
        image:
          "./assets/produtos/TabuleiroDaChef/cocada-de-tereza-tradicional.webp",
        price: 33.4,
      },
    ],
    BebidasAlcoolicas: [
      {
        name: "Casa Bianchi Licor de doce de leite com pistache 250ml",
        description: "O melhor doce de licor.",
        image: "./assets/produtos/CasaBianchi/licor-com-pistache-250ml.webp",
        price: 69.0,
      },
      {
        name: "Casa Bianchi Licor de doce de leite com pistache 500ml",
        description: "O melhor doce de licor.",
        image: "./assets/produtos/CasaBianchi/licor-com-pistache-500ml.webp",
        price: 69.0,
      },
      {
        name: "Casa Bianchi Licor creme de doce de leite de ovelha 250ml",
        description: "O melhor doce de leite.",
        image:
          "./assets/produtos/CasaBianchi/licor-creme-doce-ovelha-250ml.webp",
        price: 54.0,
      },
      {
        name: "Casa Bianchi Licor creme de doce de leite de ovelha 500ml",
        description: "O melhor doce de leite.",
        image:
          "./assets/produtos/CasaBianchi/licor-creme-de-leite-de-ovelha-500ml.webp",
        price: 54.0,
      },
      {
        name: "Casa Bianchi Licor de Banoffee 250ml",
        description: "O melhor doce de licor.",
        image: "./assets/produtos/CasaBianchi/licor-banoffee-250ml.webp",
        price: 69.0,
      },
      {
        name: "Casa Bianchi Licor de Banoffee 500ml",
        description: "O melhor doce de licor.",
        image: "./assets/produtos/CasaBianchi/licor-banoffee-500ml.webp",
        price: 69.0,
      },
      {
        name: "AowsMininu Bananinha",
        description: "A melhor bananinha.",
        image: "./assets/produtos/AowsMininu/bananinha.webp",
        price: 66.0,
      },
      {
        name: "AowsMininu Caipirinha",
        description: "A melhor caipirinha.",
        image: "./assets/produtos/AowsMininu/caipirinha.webp",
        price: 66.0,
      },
      {
        name: "Cana Da Terra Cachaça Cana da Terra",
        description: "3 madeiras.",
        image: "./assets/produtos/CanaDaTerra/cana-da-terra-3-madeiras.webp",
        price: 120.0,
      },
      {
        name: "Cana Da Terra Cachaça Cana da Terra 700ml",
        description: "Carvalho.",
        image: "./assets/produtos/CanaDaTerra/cana-da-terra-700ml.webp",
        price: 60.0,
      },
      {
        name: "Tabuleiro Da Chef Flor de Moncello da Tereza",
        description: "A melhor bebida.",
        image: "./assets/produtos/TabuleiroDaChef/flor-de-mOncello.webp",
        price: 89.9,
      },
      {
        name: "Tabuleiro Da Chef Licor de Jenipapo da Tereza",
        description: "A melhor bebida.",
        image: "./assets/produtos/TabuleiroDaChef/licor-de-jenipapo.webp",
        price: 45.9,
      },
      {
        name: "Do Cacao Licor do Cacao 375ml",
        description: "O melhor licor.",
        image: "./assets/produtos/ChocolateDoCacao/licor-do-cacao-375ml.webp",
        price: 89.0,
      },
      {
        name: "Do Cacao Licor do Cacao 750ml",
        description: "O melhor licor.",
        image: "./assets/produtos/ChocolateDoCacao/licor-do-cacao-750ml.webp",
        price: 138.0,
      },
      {
        name: "Cachaça bodegueira",
        description: "A melhor cachaça.",
        image: "./assets/produtos/Bodegueira/cachaca-branca.webp",
        price: 138.0,
      },
      {
        name: "Cachaça bodegueira",
        description: "A melhor cachaça.",
        image: "./assets/produtos/Bodegueira/cachaca-clara.webp",
        price: 138.0,
      },
      {
        name: "Cachaça bodegueira",
        description: "A melhor cachaça.",
        image: "./assets/produtos/Bodegueira/cachaca-escura.webp",
        price: 138.0,
      },
      {
        name: "Velho Alambique Cachaça Envelhecida Blend Premium",
        description: "A melhor cachaça.",
        image:
          "./assets/produtos/VelhoAlambique/cachaca-envelhecida-blend-premium.webp",
        price: 138.0,
      },
      {
        name: "Velho Alambique Cachaça Envelhecida em Cabreúva Premium",
        description: "A melhor cachaça.",
        image:
          "./assets/produtos/VelhoAlambique/cachaca-envelhecida-em-cabreuva-premium.webp",
        price: 138.0,
      },
      {
        name: "Velho Alambique Cachaça Envelhecida em Carvalho",
        description: "A melhor cachaça.",
        image:
          "./assets/produtos/VelhoAlambique/cachaca-envelhecida-em-carvalho.webp",
        price: 138.0,
      },
      {
        name: "Velho Alambique Licor de Chocolate",
        description: "A melhor cachaça.",
        image: "./assets/produtos/VelhoAlambique/licor-de-chocolate.webp",
        price: 138.0,
      },
    ],
    Salames: [
      {
        name: "Mayer Calabresa Seca",
        description: "Valor por peso, consultar no Whatsapp.",
        image: "./assets/produtos/Mayer/calabresa-seca.webp",
        price: 0.0,
      },
      {
        name: "Mayer Salame de Cordeiro",
        description: "Valor por peso, consultar no Whatsapp.",
        image: "./assets/produtos/Mayer/salame-de-cordeiro.webp",
        price: 0.0,
      },
      {
        name: "Mayer Salame de Classico",
        description: "Valor por peso, consultar no Whatsapp.",
        image: "./assets/produtos/Mayer/salame-classico.webp",
        price: 0.0,
      },
      {
        name: "Mayer Salame com Pistache",
        description: "Valor por peso, consultar no Whatsapp.",
        image: "./assets/produtos/Mayer/salame-com-pistache.webp",
        price: 0.0,
      },
      {
        name: "Mayer Salame Misto de Cordeiro e suíno",
        description: "Valor por peso, consultar no Whatsapp.",
        image: "./assets/produtos/Mayer/salame-misto-cordeiro-suino.webp",
        price: 0.0,
      },
      {
        name: "Mayer Salame",
        description: "Valor por peso, consultar no Whatsapp.",
        image: "./assets/produtos/Mayer/salame-mayer.webp",
        price: 0.0,
      },
      {
        name: "Mayer Salame Calabrese",
        description: "Valor por peso, consultar no Whatsapp.",
        image: "./assets/produtos/Mayer/salame-tipo-calabresa.webp",
        price: 0.0,
      },
      {
        name: "Imperio Gourmet Lombo Canadense com Provolone",
        description: "O melhor lombo.",
        image:
          "./assets/produtos/ImperioGourmet/lombo-canadense-com-provolone.webp",
        price: 30.0,
      },
      {
        name: "Imperio Gourmet Salaminho tipo Italiano tradicional",
        description: "O melhor lombo.",
        image:
          "./assets/produtos/ImperioGourmet/salaminho-tipo-italiano-tradicional.webp",
        price: 30.0,
      },
      {
        name: "Imperio Gourmet Salaminho Italiano com Azeitona",
        description: "O melhor salaminho.",
        image:
          "./assets/produtos/ImperioGourmet/salaminho-italiano-com-azeitona.webp",
        price: 30.0,
      },
      {
        name: "Imperio Gourmet Salaminho Italiano com Pimenta Biquinho",
        description: "O melhor salaminho.",
        image:
          "./assets/produtos/ImperioGourmet/salaminho-italiano-com-pimenta-biquinho.webp",
        price: 30.0,
      },
      {
        name: "Imperio Gourmet Lombo Canadense com Pimenta Malagueta",
        description: "O melhor salaminho.",
        image:
          "./assets/produtos/ImperioGourmet/lombo-canadense-pimenta-malagueta.webp",
        price: 30.0,
      },
      {
        name: "Frango Defumado com Azeitona, Bacon e Pimenta Biquinho",
        description: "Valor por peso, consultar no Whatsapp.",
        image:
          "./assets/produtos/Prado&Braga/frango-defumado-azeitona-bacon-pimenta-biquinho.webp",
        price: 0.0,
      },
      {
        name: "Frango Defumado Tradicional",
        description: "Valor por peso, consultar no Whatsapp",
        image: "./assets/produtos/Prado&Braga/frango-defumado-tradicional.webp",
        price: 0.0,
      },
      {
        name: "Lombinho Defumado Especial",
        description: "Valor por peso, consultar no Whatsapp.",
        image: "./assets/produtos/Prado&Braga/lombinho-defumado-especial.webp",
        price: 0.0,
      },
      {
        name: "Salame Tipo Italiano Maturado",
        description: "Valor por peso, consultar no Whatsapp.",
        image: "./assets/produtos/Prado&Braga/salame-tipo-italiano.webp",
        price: 0.0,
      },
      {
        name: "Salaminho Defumado com Azeitona",
        description: "Valor por peso, consultar no Whatsapp.",
        image:
          "./assets/produtos/Prado&Braga/salaminho-defumado-com-azeitona.webp",
        price: 0.0,
      },
      {
        name: "Salaminho Defumado com Pimenta Biquinho",
        description: "Valor por peso, consultar no Whatsapp.",
        image:
          "./assets/produtos/Prado&Braga/salaminho-defumado-com-pimenta-biquinho.webp",
        price: 0.0,
      },
      {
        name: "Salaminho Defumado com Provolone",
        description: "Valor por peso, consultar no Whatsapp.",
        image:
          "./assets/produtos/Prado&Braga/salaminho-defumado-com-provolone.webp",
        price: 0.0,
      },
      {
        name: "Salaminho Defumado com Tomate Seco",
        description: "Valor por peso, consultar no Whatsapp.",
        image:
          "./assets/produtos/Prado&Braga/salaminho-defumado-com-tomate-seco.webp",
        price: 0.0,
      },
      {
        name: "Scp Salame de Carne Suína Defumada Apimentada",
        description: "Valor por peso, consultar no Whatsapp.",
        image:
          "./assets/produtos/SalumeriaSrcCaminhosDePedra/linguica-de-carne-suina-defumada-apimentada.webp",
        price: 0.0,
      },
      {
        name: "Scp Salame Misto Defumado Bovino e Suíno",
        description: "Valor por peso, consultar no Whatsapp.",
        image:
          "./assets/produtos/SalumeriaSrcCaminhosDePedra/linguica-mista-defumada.webp",
        price: 0.0,
      },
      {
        name: "Scp Salame Tipo Milano Defumado",
        description: "Valor por peso, consultar no Whatsapp.",
        image:
          "./assets/produtos/SalumeriaSrcCaminhosDePedra/salame-tipo-milano-defumado.webp",
        price: 0.0,
      },
      {
        name: "Scp Salame Tipo Sopressa Defumado",
        description: "Valor por peso, consultar no Whatsapp.",
        image:
          "./assets/produtos/SalumeriaSrcCaminhosDePedra/salame-tipo-sopressa-defumado.webp",
        price: 0.0,
      },
      {
        name: "Scp Salame Misto Defumado com Javali",
        description: "Valor por peso, consultar no Whatsapp.",
        image:
          "./assets/produtos/SalumeriaSrcCaminhosDePedra/linguica-mista-defumada-com-javali.webp",
        price: 0.0,
      },
      {
        name: "Scp Lombo Curado Defumado",
        description: "Valor por peso, consultar no Whatsapp.",
        image:
          "./assets/produtos/SalumeriaSrcCaminhosDePedra/lombo-curado-defumado.webp",
        price: 0.0,
      },
      {
        name: "Scp Salame Colonial Defumado",
        description: "Valor por peso, consultar no Whatsapp.",
        image:
          "./assets/produtos/SalumeriaSrcCaminhosDePedra/salame-colonial-defumado.webp",
        price: 0.0,
      },
      {
        name: "Olho Salame Tipo italiano",
        description: "Valor por peso, consultar no Whatsapp.",
        image: "./assets/produtos/Olho/salame-tipo-italiano.webp",
        price: 0.0,
      },
      {
        name: "Salumeria Romani Salame tipo Napolitano",
        description: "Produto indisponível.",
        image: "./assets/produtos/SalumeriaRomani/salame-tipo-napolitano.webp",
        price: 0.0,
      },
      {
        name: "Salame Defumado Apimentado",
        description: "Produto indisponível.",
        image:
          "./assets/produtos/CacianCharcutaria/salame-defumado-apimentado.webp",
        price: 0.0,
      },
      {
        name: "Cacian Charcutaria Salame tipo Friolano",
        description: "Produto indisponível.",
        image: "./assets/produtos/CacianCharcutaria/salame-tipo-friolano.webp",
        price: 0.0,
      },
      {
        name: "Salumeria Romani Embutido de Carne Suína",
        description: "Indisponível no momento.",
        image:
          "./assets/produtos/SalumeriaRomani/embutido-de-carne-suina-cracovia.webp",
        price: 0.0,
      },
      {
        name: "Salumeria Romani Salame tipo Caciatore",
        description: "indisponível no momento.",
        image: "./assets/produtos/SalumeriaRomani/salame-tipo-caciatore.webp",
        price: 0.0,
      },
      {
        name: "Famille Chaulet Salame Colonial",
        description: "Produto indisponível.",
        image: "./assets/produtos/FamilleChaulet/salame-colonial.webp",
        price: 0.0,
      },
      {
        name: "Famille Chaulet Salame com queijo",
        description: "Produto indisponível",
        image: "./assets/produtos/FamilleChaulet/salame-com-queijo.webp",
        price: 0.0,
      },
      {
        name: "Famille Chaulet Salame de avestruz",
        description: "Produto indisponível.",
        image: "./assets/produtos/FamilleChaulet/salame-de-avestruz.webp",
        price: 0.0,
      },
      {
        name: "Famille Chaulet Salame de Carne Bovina",
        description: "Produto indisponível.",
        image: "./assets/produtos/FamilleChaulet/salame-de-carne-bovina.webp",
        price: 0.0,
      },
      {
        name: "Famille Chaulet Salame de Javali",
        description: "Produto indisponível.",
        image: "./assets/produtos/FamilleChaulet/salame-de-javali.webp",
        price: 0.0,
      },
      {
        name: "Famille Chaulet Salame Gaúcho",
        description: "Produto indisponível.",
        image: "./assets/produtos/FamilleChaulet/salame-gaucho.webp",
        price: 0.0,
      },
      {
        name: "Famille Chaulet Salame tipo alemão",
        description: "Produto indisponível.",
        image: "./assets/produtos/FamilleChaulet/salame-tipo-alemao.webp",
        price: 0.0,
      },
      {
        name: "Famille Chaulet Salame tipo argentino",
        description: "Produto indisponível.",
        image: "./assets/produtos/FamilleChaulet/salame-tipo-argentino.webp",
        price: 0.0,
      },
      {
        name: "Charque de Cordeiro",
        description: "O Melhor charque.",
        image:
          "./assets/produtos/AgroindustriaSinuelo/charque-de-cordeiro.webp",
        price: 0.0,
      },
      {
        name: "Charque Light",
        description: "O Melhor charque.",
        image: "./assets/produtos/AgroindustriaSinuelo/charque-light.webp",
        price: 0.0,
      },
      {
        name: "Charque Tradicional",
        description: "O Melhor charque.",
        image:
          "./assets/produtos/AgroindustriaSinuelo/charque-tradicional.webp",
        price: 0.0,
      },
      {
        name: "Jais Salame",
        description: "O Melhor Salame.",
        image: "./assets/produtos/Jais/salame-jais.webp",
        price: 62.4,
      },
      {
        name: "Sabor do Chef Salame Tipo Italiano Azeitonas",
        description: "O Melhor Salame.",
        image:
          "./assets/produtos/SaborDoChef/salame-tipo-italiano-azeitonas.webp",
        price: 62.4,
      },
      {
        name: "Sabor do Chef Salame Tipo Italiano Malagueta",
        description: "O Melhor Salame.",
        image:
          "./assets/produtos/SaborDoChef/salame-tipo-italiano-malagueta.webp",
        price: 62.4,
      },
      {
        name: "Sabor do Chef Salame Tipo Italiano Pimenta Biquinho",
        description: "O Melhor Salame.",
        image:
          "./assets/produtos/SaborDoChef/salame-tipo-italiano-pimenta-biquinho.webp",
        price: 62.4,
      },
      {
        name: "Sabor do Chef Salame Tipo Italiano Provolone",
        description: "O Melhor Salame.",
        image:
          "./assets/produtos/SaborDoChef/salame-tipo-italiano-provolone.webp",
        price: 62.4,
      },
      {
        name: "Sabor do Chef Salame Tipo Italiano Tradicional",
        description: "O Melhor Salame.",
        image:
          "./assets/produtos/SaborDoChef/salame-tipo-italiano-tradicional.webp",
        price: 62.4,
      },
      {
        name: "Soeiro Salame com Funghi",
        description: "O Melhor Salame.",
        image: "./assets/produtos/Soeiro/salame-com-funghi.webp",
        price: 62.4,
      },
      {
        name: "Soeiro Salpicão Português",
        description: "O Melhor Salpicão.",
        image: "./assets/produtos/Soeiro/salpicão-portugues.webp",
        price: 62.4,
      },
      {
        name: "Vila Caipira Lombo Nobre Defumado com Alho",
        description: "O Melhor Lombo.",
        image: "./assets/produtos/VilaCaipira/lombo-nobre-defumado-alho.webp",
        price: 62.4,
      },
      {
        name: "Vila Caipira Lombo Nobre Defumado com Pimenta",
        description: "O Melhor Lombo.",
        image:
          "./assets/produtos/VilaCaipira/lombo-nobre-defumado-pimenta.webp",
        price: 62.4,
      },
      {
        name: "Vila Caipira Salame de Frango Defumado Misto",
        description: "O Melhor Salame.",
        image:
          "./assets/produtos/VilaCaipira/salame-frango-defumado-misto.webp",
        price: 62.4,
      },
    ],
    Queijos: [
      {
        name: "Sagrado Queijo Queijo provolone desidratado com goiabada 215g",
        description: "O melhor queijo.",
        image:
          "./assets/produtos/SagradoQueijo/queijo-com-goiabada-pequeno.webp",
        price: 38.0,
      },
      {
        name: "Sagrado Queijo Queijo provolone desidratado com goiabada 350g",
        description: "O melhor queijo.",
        image:
          "./assets/produtos/SagradoQueijo/queijo-com-goiabada-grande.webp",
        price: 53.0,
      },
      {
        name: "Cabríssima Queijo tipo boursin com pimenta rosa",
        description: "O melhor queijo.",
        image:
          "./assets/produtos/Cabrissima/queijo-boursin-com-pimenta-rosa.webp",
        price: 59.8,
      },
      {
        name: "Cabríssima Queijo tipo boursin com ervas finas",
        description: "O melhor queijo.",
        image: "./assets/produtos/Cabrissima/queijo-boursin-ervas-finas.webp",
        price: 59.8,
      },
      {
        name: "Cabríssima Queijo tipo boursin com chimichurry",
        description: "O melhor queijo.",
        image:
          "./assets/produtos/Cabrissima/queijo-boursin-leite-de-cabra-com-chimichurri.webp",
        price: 59.8,
      },
      {
        name: "Cabríssima Queijo tipo boursin de leite de cabra com Za'atar",
        description: "O melhor queijo.",
        image:
          "./assets/produtos/Cabrissima/queijo-tipo-boursin-leite-de-cabra-com-zaatar.webp",
        price: 59.8,
      },
      {
        name: "Cabríssima Queijo flor do cerrado",
        description: "Consultar preço no Whatsapp.",
        image: "./assets/produtos/Cabrissima/flor-do-cerrado.webp",
        price: 0.0,
      },
      {
        name: "Cabríssima Queijo maturado de leite de cabra Brasília",
        description: "Consultar preço no Whatsapp.",
        image:
          "./assets/produtos/Cabrissima/queijo-maturado-de-leite-de-cabra-brasilia.webp",
        price: 0.0,
      },
      {
        name: "Casa Bianchi Queijo Piegora colonial de leite de ovelha com chimichurri",
        description: "Consultar preço no Whatsapp.",
        image:
          "./assets/produtos/CasaBianchi/Piegora-queijo-colonial-de-leite-de-ovelha-com-chimichurri.webp",
        price: 0.0,
      },
      {
        name: "Casa Bianchi Queijo Palline di Catarina tipo boursin alecrim e pimenta",
        description: "O melhor queijo.",
        image:
          "./assets/produtos/CasaBianchi/queijo-palline-di-catarina-tipo-boursin-alecrim-e-pimenta.webp",
        price: 46.0,
      },
      {
        name: "Casa Bianchi Queijo tipo Deta de leite de ovelha",
        description: "Consultar preço no Whatsapp.",
        image:
          "./assets/produtos/CasaBianchi/queijo-tipo-deta-de-leite-de-ovelha.webp",
        price: 0.0,
      },
      {
        name: "Celero Queijo Celero",
        description: "Consultar preço no Whatsapp.",
        image: "./assets/produtos/Celero/queijo-celero.webp",
        price: 0.0,
      },
      {
        name: "Candeia Queijo Autoral",
        description: "Consultar preço no Whatsapp.",
        image: "./assets/produtos/Candeia/queijo-autoral.webp",
        price: 0.0,
      },
      {
        name: "Cremoso Queijo Autoral",
        description: "Consultar preço no Whatsapp.",
        image: "./assets/produtos/Cremoso/queijo-autoral.webp",
        price: 0.0,
      },
      {
        name: "Fazenda Generosa Queijo O enigma",
        description: "Consultar preço no Whatsapp.",
        image: "./assets/produtos/FazendaGenerosa/o-enigma.webp",
        price: 0.0,
      },
      {
        name: "Fazenda Generosa Queijo Minas meia cura premium",
        description: "Consultar preço no Whatsapp.",
        image:
          "./assets/produtos/FazendaGenerosa/queijo-minas-meia-cura-premium.webp",
        price: 0.0,
      },
      {
        name: "Fazenda Generosa Queijo Minas Padrão Zé Luiz",
        description: "Consultar preço no Whatsapp.",
        image:
          "./assets/produtos/FazendaGenerosa/queijo-minas-padrao-ze-luiz.webp",
        price: 0.0,
      },
      {
        name: "Fazenda Generosa Requeijão em Barra",
        description: "Consultar preço no Whatsapp.",
        image: "./assets/produtos/FazendaGenerosa/requeijao-em-barra.webp",
        price: 0.0,
      },
      {
        name: "Goa Queijo Mantiqueira de minas 6kg",
        description: "Consultar preço no Whatsapp.",
        image: "./assets/produtos/Goa/mantiqueira-de-minas-6kg.webp",
        price: 0.0,
      },
      {
        name: "Queijo Goa",
        description: "Consultar preço no Whatsapp.",
        image: "./assets/produtos/Goa/queijo-goa.webp",
        price: 0.0,
      },
      {
        name: "Goa Queijo Serra da Mantiqueira Goa zero lactose",
        description: "Consultar preço no Whatsapp.",
        image:
          "./assets/produtos/Goa/serra-da-mantiqueira-goa-zero-lactose.webp",
        price: 0.0,
      },
      {
        name: "Irmãos Faria Queijo Minas Canastra",
        description: "Consultar preço no Whatsapp.",
        image: "./assets/produtos/IrmaosFaria/queijo-minas-canastra.webp",
        price: 0.0,
      },
      {
        name: "Jeito De Mato Requeijão",
        description: "Consultar preço no Whatsapp.",
        image: "./assets/produtos/JeitoDeMato/requeijao.webp",
        price: 0.0,
      },
      {
        name: "Ouro Branco Quejo Coalho com Chimichurry",
        description: "Consultar preço no Whatsapp.",
        image: "./assets/produtos/OuroBranco/coalho-com-chimichurry.webp",
        price: 0.0,
      },
      {
        name: "Ouro Branco Quejo Coalho Temperado",
        description: "Consultar preço no Whatsapp.",
        image: "./assets/produtos/OuroBranco/coalho-temperado.webp",
        price: 0.0,
      },
      {
        name: "Ouro Branco Quejo Coalho Tradicional",
        description: "Consultar preço no Whatsapp.",
        image: "./assets/produtos/OuroBranco/coalho-tradicional.webp",
        price: 0.0,
      },
      {
        name: "Paladar De Minas Queijo Minas Meia Cura Defumado",
        description: "Consultar preço no Whatsapp.",
        image:
          "./assets/produtos/PaladarDeMinas/queijo-minas-meia-cura-defumado.webp",
        price: 0.0,
      },
      {
        name: "Paladar De Minas Queijo Minas Meia Cura Fracionado",
        description: "Consultar preço no Whatsapp.",
        image:
          "./assets/produtos/PaladarDeMinas/queijo-minas-meia-cura-fracionado.webp",
        price: 0.0,
      },
      {
        name: "Paladar De Minas Queijo Calambau com Cachaça",
        description: "Consultar preço no Whatsapp.",
        image: "./assets/produtos/PaladarDeMinas/calambau-com-cachaca.webp",
        price: 0.0,
      },
      {
        name: "Paladar De Minas Queijo Calamel",
        description: "Consultar preço no Whatsapp.",
        image: "./assets/produtos/PaladarDeMinas/queijo-calamel.webp",
        price: 0.0,
      },
      {
        name: "Queijaria Bolderini Borbinha Queijo Cremoso",
        description: "Consultar preço no Whatsapp.",
        image:
          "./assets/produtos/QueijariaBolderini/Borbinha-queijo-cremoso.webp",
        price: 0.0,
      },
      {
        name: "Queijaria Bolderini Malacaxeta Queijo Maturado 30 dias",
        description: "Consultar preço no Whatsapp.",
        image:
          "./assets/produtos/QueijariaBolderini/malacaxeta-queijo-maturado-30-dias.webp",
        price: 0.0,
      },
      {
        name: "Queijaria Bolderini Queijo Santa Graça",
        description: "Consultar preço no Whatsapp.",
        image: "./assets/produtos/QueijariaBolderini/queijo-santa-graca.webp",
        price: 0.0,
      },
      {
        name: "Queijo do Serjão queijo canastra",
        description: "Consultar preço no Whatsapp.",
        image: "./assets/produtos/QueijoDoSerjao/queijo-canastra.webp",
        price: 0.0,
      },
      {
        name: "Santa Clara Queijo Minas Artesanal Alba",
        description: "Consultar preço no Whatsapp.",
        image: "./assets/produtos/SantaClara/queijo-minas-artesanal-alba.webp",
        price: 0.0,
      },
      {
        name: "Santa Clara Queijo Minas Artesanal Arnaldo",
        description: "Consultar preço no Whatsapp.",
        image:
          "./assets/produtos/SantaClara/queijo-minas-artesanal-arnaldo.webp",
        price: 0.0,
      },
      {
        name: "Santa Clara Queijo Minas Artesanal Joaquina",
        description: "Consultar preço no Whatsapp.",
        image:
          "./assets/produtos/SantaClara/queijo-minas-artesanal-joaquina.webp",
        price: 0.0,
      },
      {
        name: "Serra Da Abelha Queijo Fresco Serra da Abelha",
        description: "Produto indisponível.",
        image: "./assets/produtos/SerraDaAbelha/queijo-fresco.webp",
        price: 0.0,
      },
      {
        name: "Serra Do Condado Queijo Defumado Serra do Condado",
        description: "Consultar preço no Whatsapp.",
        image: "./assets/produtos/SerraDoCondado/queijo-defumado.webp",
        price: 0.0,
      },
      {
        name: "Serra Do Condado Queijo Ovo Negro Serra do Condado",
        description: "Consultar preço no Whatsapp.",
        image:
          "./assets/produtos/SerraDoCondado/queijo-serra-do-condado-ovo-negro.webp",
        price: 0.0,
      },
      {
        name: "Vermont Queijista Cru do Testo Leite Cru",
        description: "Consultar preço no Whatsapp.",
        image:
          "./assets/produtos/Vermont/queijista-cru-do-testo-leite-cru.webp",
        price: 0.0,
      },
      {
        name: "Vermont Queijo Maturado Dos Mendes",
        description: "Consultar preço no Whatsapp.",
        image: "./assets/produtos/Vermont/queijo-maturado.webp",
        price: 0.0,
      },
      {
        name: "Vermont Queijo Tipo Brie Zero lactose 125g",
        description: "O melhor queijo.",
        image: "./assets/produtos/Vermont/queijo-tipo-brie.webp",
        price: 33.0,
      },
      {
        name: "Vermont Queijo Zero Lactose Morro Azul 125g",
        description: "O melhor queijo.",
        image: "./assets/produtos/Vermont/queijo-zero-lactose.webp",
        price: 39.9,
      },
      {
        name: "Lima Queijos Queijo Minas Artesanal",
        description: "O melhor queijo.",
        image: "./assets/produtos/LimaQueijos/lima-queijo-minas-artesanal.webp",
        price: 39.9,
      },
      {
        name: "Lima Queijos Queijo Minas Artesanal",
        description: "O melhor queijo.",
        image: "./assets/produtos/LimaQueijos/queijo-minas-artesanal.webp",
        price: 39.9,
      },
      {
        name: "Lima Queijos Queijo Rustiquim",
        description: "O melhor queijo.",
        image: "./assets/produtos/LimaQueijos/queijo-rustiquim.webp",
        price: 39.9,
      },
      {
        name: "Micro Região Serro Queijo Minas Quilombo inteiro",
        description: "O melhor queijo.",
        image:
          "./assets/produtos/MicroRegiaoSerro/queijo-minas-quilombo-inteiro.webp",
        price: 39.9,
      },
      {
        name: "Micro Região Serro Queijo Minas Quilombo metade",
        description: "O melhor queijo.",
        image:
          "./assets/produtos/MicroRegiaoSerro/queijo-minas-quilombo-metade.webp",
        price: 39.9,
      },
      {
        name: "Micro Região Serro Queijo Minas Quilombo Saco",
        description: "O melhor queijo.",
        image:
          "./assets/produtos/MicroRegiaoSerro/queijo-minas-quilombo-saco.webp",
        price: 39.9,
      },
      {
        name: "Pomedore Creme Tipo Brie Zero Lactose",
        description: "O melhor creme.",
        image: "./assets/produtos/Pomedore/creme-tipo-brie-zero-lactose.webp",
        price: 42.0,
      },
      {
        name: "Queijo Coqueiral",
        description: "O melhor queijo.",
        image: "./assets/produtos/QueijoCoqueiral/queijo-coqueiral.webp",
        price: 42.0,
      },
      {
        name: "Quinta De Sant'Ana queijo Canastra Crispy",
        description: "O melhor queijo.",
        image: "./assets/produtos/QuintaDeSant'Ana/queijo-canastra-crispy.webp",
        price: 42.0,
      },
      {
        name: "Quinta De Sant'Ana queijo Cordilheira",
        description: "O melhor queijo.",
        image: "./assets/produtos/QuintaDeSant'Ana/queijo-cordilheira.webp",
        price: 42.0,
      },
      {
        name: "Quinta De Sant'Ana queijo Marandu",
        description: "O melhor queijo.",
        image: "./assets/produtos/QuintaDeSant'Ana/queijo-marandu.webp",
        price: 42.0,
      },
      {
        name: "Rancho Maranata Queijo Mantiqueira Maranata Jovem",
        description: "O melhor queijo.",
        image:
          "./assets/produtos/RanchoMaranata/queijo-mantiqueira-maranata-jovem.webp",
        price: 42.0,
      },
      {
        name: "Rancho Maranata Queijo Maranata Jovem Capa Preta",
        description: "O melhor queijo.",
        image:
          "./assets/produtos/RanchoMaranata/queijo-maranata-jovem-capa-preta.webp",
        price: 42.0,
      },
      {
        name: "Terra Límpida Queijo Cynarella",
        description: "O melhor queijo.",
        image: "./assets/produtos/TerraLimpida/queijo-cynarella.webp",
        price: 42.0,
      },
      {
        name: "Terra Límpida Queijo Faggeta",
        description: "O melhor queijo.",
        image: "./assets/produtos/TerraLimpida/queijo-faggeta.webp",
        price: 42.0,
      },
      {
        name: "Terra Límpida Queijo Primavera",
        description: "O melhor queijo.",
        image: "./assets/produtos/TerraLimpida/queijo-primavera.webp",
        price: 42.0,
      },
      {
        name: "Terra Límpida Queijo Querciola",
        description: "O melhor queijo.",
        image: "./assets/produtos/TerraLimpida/queijo-querciola.webp",
        price: 42.0,
      },
      {
        name: "Terra Límpida Queijo Tipo Brie",
        description: "O melhor queijo.",
        image: "./assets/produtos/TerraLimpida/queijo-tipo-brie.webp",
        price: 42.0,
      },
    ],
    Chocolates: [
      {
        name: "Do Cacao Caixa de chocolate barras do Cacao",
        description: "O melhor chocolate.",
        image: "./assets/produtos/ChocolateDoCacao/caixa-do-cacao.webp",
        price: 53.0,
      },
      {
        name: "Do Cacao Caixa de 10 chocolates do Cacao",
        description: "O melhor chocolate.",
        image: "./assets/produtos/ChocolateDoCacao/caixa-do-cacao-10.webp",
        price: 53.0,
      },
      {
        name: "Do Cacao Chocolate ao Leite 40% cacau 30g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/chocolate-ao-leite-40-30g.webp",
        price: 53.0,
      },
      {
        name: "Do Cacao Chocolate ao Leite 40% cacau 85g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/chocolate-ao-leite-40-85g.webp",
        price: 53.0,
      },
      {
        name: "Do Cacao Chocolate ao Leite com castanha 40% cacau 30g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/chocolate-ao-leite-com-castanha-40-30g.webp",
        price: 53.0,
      },
      {
        name: "Do Cacao Chocolate ao Leite com castanha 40% cacau 85g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/chocolate-ao-leite-com-castanha-40-85g.webp",
        price: 53.0,
      },
      {
        name: "Do Cacao Chocolate ao Leite com cupuaçu 40% cacau 30g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/chocolate-ao-leite-com-cupuacu-40-30g.webp",
        price: 53.0,
      },
      {
        name: "Do Cacao Chocolate ao Leite com cupuaçu 40% cacau 85g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/chocolate-com-cupuacu-40-85g.webp",
        price: 53.0,
      },
      {
        name: "Do Cacao Chocolate Branco 35% cacau 30g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/chocolate-branco-35-30g.webp",
        price: 53.0,
      },
      {
        name: "Do Cacao Chocolate Branco 35% cacau 85g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/chocolate-branco-35-85g.webp",
        price: 53.0,
      },
      {
        name: "Do Cacao Chocolate Branco com amora 35% cacau 30g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/chocolate-branco-com-amora-35-30g.webp",
        price: 53.0,
      },
      {
        name: "Do Cacao Chocolate Branco com amora 35% cacau 85g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/chocolate-branco-com-amora-35-85g.webp",
        price: 53.0,
      },
      {
        name: "Do Cacao Chocolate com café 40% cacau 30g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/chocolate-com-cafe-40-30g.webp",
        price: 53.0,
      },
      {
        name: "Do Cacao Chocolate com café 40% cacau 85g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/chocolate-com-cafe-40-85g.webp",
        price: 53.0,
      },
      {
        name: "Do Cacao Chocolate Intenso 70% cacau 30g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/chocolate-intenso-70-30g.webp",
        price: 53.0,
      },
      {
        name: "Do Cacao Chocolate Intenso 70% cacau 85g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/chocolate-intenso-70-85g.webp",
        price: 53.0,
      },
      {
        name: "Amêndoa do cacao Caramelizada 130g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/amendoa-do-cacao-caramelizada-130g.webp",
        price: 53.0,
      },
      {
        name: "Nibs do cacao Caramelizado 150g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/nibs-do-cacao-caramelizado-150g.webp",
        price: 53.0,
      },
      {
        name: "Melaço do Cacao 240g",
        description: "O melhor chocolate.",
        image: "./assets/produtos/ChocolateDoCacao/melaco-do-cacao-240g.webp",
        price: 53.0,
      },
      {
        name: "Geleia do cacao 240g",
        description: "A melhor geleia.",
        image: "./assets/produtos/ChocolateDoCacao/geleia-do-cacao-240g.webp",
        price: 53.0,
      },
    ],
    Manteigas: [
      {
        name: "Manteigaria Nacional Manteiga Ghee com Alecrim",
        description: "A melhor manteiga.",
        image:
          "./assets/produtos/ManteigariaNacional/manteiga-ghee-alecrim.webp",
        price: 54.9,
      },
      {
        name: "Manteigaria Nacional Manteiga Ghee com Noz Moscada e Pimenta Seca",
        description: "A melhor manteiga.",
        image:
          "./assets/produtos/ManteigariaNacional/manteiga-ghee-noz-moscada-pimenta-seca.webp",
        price: 54.9,
      },
      {
        name: "Manteigaria Nacional Manteiga Ghee com Tamara",
        description: "A melhor manteiga.",
        image:
          "./assets/produtos/ManteigariaNacional/manteiga-ghee-tamara.webp",
        price: 59.5,
      },
      {
        name: "Manteigaria Nacional Manteiga Ghee Tradicional",
        description: "A melhor manteiga.",
        image: "./assets/produtos/ManteigariaNacional/manteiga-ghee.webp",
        price: 51.9,
      },
      {
        name: "Manteigaria Nacional Manteiga com flor de sal",
        description: "A melhor manteiga.",
        image:
          "./assets/produtos/ManteigariaNacional/manteiga-flor-de-sal.webp",
        price: 33.9,
      },
      {
        name: "Manteigaria Nacional Manteiga com flor de sal 250g",
        description: "A melhor manteiga.",
        image:
          "./assets/produtos/ManteigariaNacional/manteiga-flor-de-sal-250g.webp",
        price: 33.9,
      },
      {
        name: "Manteigaria Nacional Manteiga Jatobá",
        description: "A melhor manteiga.",
        image: "./assets/produtos/ManteigariaNacional/manteiga-jatoba.webp",
        price: 33.9,
      },
      {
        name: "Manteigaria Nacional Manteiga Tartufo 90g",
        description: "A melhor manteiga.",
        image:
          "./assets/produtos/ManteigariaNacional/manteiga-tartufo-90g.webp",
        price: 33.9,
      },
      {
        name: "Manteigaria Nacional Manteiga Tartufo",
        description: "A melhor manteiga.",
        image: "./assets/produtos/ManteigariaNacional/manteiga-tartufo.webp",
        price: 62.4,
      },
      {
        name: "Jais Manteiga com Alho Negro",
        description: "A melhor manteiga.",
        image: "./assets/produtos/Jais/manteiga-alho-negro.webp",
        price: 62.4,
      },
    ],
    Temperos: [
      {
        name: "Tabuleiro Da Chef Tempero da Tereza Arrozinho",
        description: "A melhor farofa.",
        image:
          "./assets/produtos/TabuleiroDaChef/tempero-de-tereza-arrozinho.webp",
        price: 24.2,
      },
      {
        name: "Tabuleiro Da Chef Tempero da Tereza Bifinho",
        description: "A melhor farofa.",
        image:
          "./assets/produtos/TabuleiroDaChef/tempero-de-tereza-bifinho.webp",
        price: 24.2,
      },
      {
        name: "Tabuleiro Da Chef Tempero da Tereza Cordeirinho",
        description: "A melhor farofa.",
        image:
          "./assets/produtos/TabuleiroDaChef/tempero-de-tereza-cordeirinho.webp",
        price: 24.2,
      },
      {
        name: "Tabuleiro Da Chef Tempero da Tereza Feijãozinho",
        description: "A melhor farofa.",
        image:
          "./assets/produtos/TabuleiroDaChef/tempero-de-tereza-feijaozinho.webp",
        price: 24.2,
      },
      {
        name: "Tabuleiro Da Chef Tempero da Tereza Franguinho",
        description: "A melhor farofa.",
        image:
          "./assets/produtos/TabuleiroDaChef/tempero-de-tereza-franguinho.webp",
        price: 24.2,
      },
      {
        name: "Tabuleiro Da Chef Tempero da Tereza Leguminho",
        description: "A melhor farofa.",
        image:
          "./assets/produtos/TabuleiroDaChef/tempero-de-tereza-leguminho.webp",
        price: 24.2,
      },
      {
        name: "Tabuleiro Da Chef Tempero da Tereza Peixinho",
        description: "A melhor farofa.",
        image:
          "./assets/produtos/TabuleiroDaChef/tempero-de-tereza-peixinho.webp",
        price: 24.2,
      },
      {
        name: "Tabuleiro Da Chef Pimenta da Tereza",
        description: "A melhor geleia.",
        image: "./assets/produtos/TabuleiroDaChef/pimenta-de-tereza.webp",
        price: 29.9,
      },
      {
        name: "ColdSmoke Sal marinho defumado",
        description: "O melhor bacon.",
        image: "./assets/produtos/ColdSmoke/sal-marinho-defumado.webp",
        price: 36.0,
      },
      {
        name: "ChefNBoss Fumaça Líquida",
        description: "O melhor molho.",
        image: "./assets/produtos/ChefNBoss/fumaca-liquida.webp",
        price: 29.9,
      },
      {
        name: "ChefNBoss Jalapeño com pimenta especial",
        description: "O melhor molho.",
        image: "./assets/produtos/ChefNBoss/jalapeno-pimentinha-especial.webp",
        price: 29.9,
      },
      {
        name: "L'apetisse Alho em Conserva",
        description: "O melhor alho.",
        image: "./assets/produtos/L'apetisse/alho-em-conserva.webp",
        price: 29.9,
      },
      {
        name: "Jais Mix de Cogumelos",
        description: "A melhor manteiga.",
        image: "./assets/produtos/Jais/mix-de-cogumelos.webp",
        price: 62.4,
      },
    ],
    Farofas: [
      {
        name: "Tabuleiro Da Chef Farinha da Tereza",
        description: "A melhor farofa.",
        image: "./assets/produtos/TabuleiroDaChef/farinha-de-tereza.webp",
        price: 18.0,
      },
      {
        name: "Tabuleiro Da Chef Farofa da Tereza Amarelinha",
        description: "A melhor farofa.",
        image: "./assets/produtos/TabuleiroDaChef/farofa-amarelinha.webp",
        price: 29.0,
      },
      {
        name: "Tabuleiro Da Chef Farofa da Tereza Branquinha",
        description: "A melhor farofa.",
        image: "./assets/produtos/TabuleiroDaChef/farofa-branquinha.webp",
        price: 29.0,
      },
      {
        name: "Tabuleiro Da Chef Farofa da Tereza Verdinha",
        description: "A melhor farofa.",
        image:
          "./assets/produtos/TabuleiroDaChef/farofa-da-tereza-verdinha.webp",
        price: 29.0,
      },
      {
        name: "Tabuleiro Da Chef Farofa da Tereza Sertaneja",
        description: "A melhor farofa.",
        image: "./assets/produtos/TabuleiroDaChef/farofa-sertaneja.webp",
        price: 29.0,
      },
      {
        name: "Empório Lessa Farofa Crocante",
        description: "A melhor farofa.",
        image: "./assets/produtos/EmporioLessa/farofa-crocante.webp",
        price: 29.0,
      },
    ],
    Pates: [
      {
        name: "LaPopote Patê de Figado de Pato com geleia de Goiaba",
        description: "O melhor patê.",
        image:
          "./assets/produtos/LaPopote/pate-de-figado-com-geleia-de-goiaba.webp",
        price: 49.0,
      },
      {
        name: "LaPopote Patê de Figado de Pato com geleia de Cebola",
        description: "O melhor patê.",
        image:
          "./assets/produtos/LaPopote/pate-de-figado-de-pato-com-geleia-de-cebola.webp",
        price: 49.0,
      },
      {
        name: "LaPopote Patê de Figado de Pato",
        description: "O melhor patê.",
        image: "./assets/produtos/LaPopote/pate-de-figado-pato.webp",
        price: 53.0,
      },
      {
        name: "LaPopote Patê de Ovas de Tainha",
        description: "O melhor patê.",
        image: "./assets/produtos/LaPopote/pate-de-ovas-de-tainha.webp",
        price: 53.0,
      },
      {
        name: "LaPopote Patê de Pato",
        description: "O melhor patê.",
        image: "./assets/produtos/LaPopote/pate-de-pato.webp",
        price: 53.0,
      },
      {
        name: "LaPopote Patê de Porco",
        description: "O melhor patê.",
        image: "./assets/produtos/LaPopote/pate-de-porco.webp",
        price: 53.0,
      },
    ],
    Risottos: [
      {
        name: "Il Cuoco Risotto de Abóbora sache",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-abobora-sache.webp",
        price: 32.9,
      },
      {
        name: "Il Cuoco Risotto de Alho Poró sache",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-alho-poro-sache.webp",
        price: 32.9,
      },
      {
        name: "Il Cuoco Risotto de Alla milanese sache",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-alla-milanese-sache.webp",
        price: 32.9,
      },
      {
        name: "Il Cuoco Risotto Alla Napoletana sache",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-alla-napoletana-sache.webp",
        price: 32.9,
      },
      {
        name: "Il Cuoco Risotto de Alle Verdure sache",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-alle-verdure-sache.webp",
        price: 32.9,
      },
      {
        name: "Il Cuoco Risotto de Beterraba sache",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-beterraba-sache.webp",
        price: 32.9,
      },
      {
        name: "Il Cuoco Risotto de Funghi sache",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-funghi-sache.webp",
        price: 32.9,
      },
      {
        name: "Il Cuoco Risotto Limão Siciliano sache",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-siciliano-sache.webp",
        price: 32.9,
      },
      {
        name: "Il Cuoco Risotto de Damasco com Amêndoas",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-damasco-com-amendoas.webp",
        price: 42.9,
      },
      {
        name: "Il Cuoco Risotto de Alla Carbonara pote",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-alla-carbonara.webp",
        price: 42.9,
      },
      {
        name: "Il Cuoco Risotto Alla Napoletana Pote",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-alla-napoletana.webp",
        price: 42.9,
      },
      {
        name: "Il Cuoco Risotto Alle Funghi pote",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-alle-funghi.webp",
        price: 42.9,
      },
      {
        name: "Il Cuoco Risotto de Limão Siciliano pote",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-limao-siciliano.webp",
        price: 42.9,
      },
      {
        name: "Il Cuoco Risotto de Maçã e Castanhas pote",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-maca-e-castanhas.webp",
        price: 42.9,
      },
      {
        name: "Il Cuoco Risotto de Pera e Nozes pote",
        description: "O melhor risotto.",
        image: "./assets/produtos/IlCuoco/risotto-pera-e-nozes.webp",
        price: 42.9,
      },
    ],
    Molhos: [
      {
        name: "ChefNBoss Barbecue com bacon",
        description: "O melhor molho.",
        image: "./assets/produtos/ChefNBoss/barbecue-bacon.webp",
        price: 35.0,
      },
      {
        name: "ChefNBoss Barbecue mineiro com café",
        description: "O melhor molho.",
        image: "./assets/produtos/ChefNBoss/barbecue-mineiro-cafe.webp",
        price: 35.0,
      },
      {
        name: "ChefNBoss Barbecue mineiro com goiabada",
        description: "O melhor molho.",
        image: "./assets/produtos/ChefNBoss/barbecue-mineiro-com-goiabada.webp",
        price: 32.0,
      },
      {
        name: "ChefNBoss Barbecue com pimenta biquinho",
        description: "O melhor molho.",
        image: "./assets/produtos/ChefNBoss/barbecue-pimenta-biquinho.webp",
        price: 35.0,
      },
      {
        name: "ChefNBoss Berry Christmas",
        description: "O melhor molho.",
        image: "./assets/produtos/ChefNBoss/berry-christmas.webp",
        price: 36.0,
      },
      {
        name: "ChefNBoss Chutney",
        description: "O melhor molho.",
        image: "./assets/produtos/ChefNBoss/chutney.webp",
        price: 47.0,
      },
      {
        name: "ChefNBoss Creme agridoce",
        description: "O melhor molho.",
        image: "./assets/produtos/ChefNBoss/creme-agridoce.webp",
        price: 32.0,
      },
      {
        name: "ChefNBoss Molho inglês defumado",
        description: "O melhor molho.",
        image: "./assets/produtos/ChefNBoss/molho-ingles-defumado.webp",
        price: 19.0,
      },
      {
        name: "ChefNBoss Mostarda Tropical",
        description: "O melhor molho.",
        image: "./assets/produtos/ChefNBoss/mostarda-tropical.webp",
        price: 32.0,
      },
      {
        name: "ChefNBoss Pimentinha com limão",
        description: "O melhor molho.",
        image: "./assets/produtos/ChefNBoss/pimentinha-com-limao.webp",
        price: 17.0,
      },
      {
        name: "ChefNBoss Salsa Argentina",
        description: "O melhor molho.",
        image: "./assets/produtos/ChefNBoss/salsa-argentina.webp",
        price: 32.0,
      },
      {
        name: "ChefNBoss Salsa Muerte",
        description: "O melhor molho.",
        image: "./assets/produtos/ChefNBoss/salsa-muerte.webp",
        price: 39.0,
      },
      {
        name: "EmporioLessa Molho de rapadura",
        description: "O melhor doce.",
        image:
          "./assets/produtos/EmporioLessa/emporio-lessa-molho-de-rapadura.webp",
        price: 43.0,
      },
      {
        name: "Milagre de Minas Mostarda com alho e azeitona 220g",
        description: "O melhor molho.",
        image:
          "./assets/produtos/MilagreDeMinas/mostarda-com-alho-e-azeitona.webp",
        price: 44.0,
      },
      {
        name: "Milagre de Minas Mostarda com jabuticaba 220g",
        description: "O melhor molho.",
        image:
          "./assets/produtos/MilagreDeMinas/mostarda-com-jabuticaba-220g.webp",
        price: 44.0,
      },
      {
        name: "Milagre de Minas Mostarda com Picles 220g",
        description: "O melhor molho.",
        image: "./assets/produtos/MilagreDeMinas/mostarda-com-picles-220g.webp",
        price: 40.0,
      },
      {
        name: "Milagre de Minas Mostarda com Ervas finas 220g",
        description: "O melhor molho.",
        image: "./assets/produtos/MilagreDeMinas/mostarda-de-ervas-220g.webp",
        price: 40.0,
      },
      {
        name: "Milagre de Minas Mostarda com Maracujá 220g",
        description: "O melhor molho.",
        image:
          "./assets/produtos/MilagreDeMinas/mostarda-de-maracuja-220g.webp",
        price: 42.0,
      },
      {
        name: "Milagre de Minas Mostarda com Funghi 220g",
        description: "O melhor molho.",
        image:
          "./assets/produtos/MilagreDeMinas/mostarda-de-funghi-sec-220gr.webp",
        price: 42.0,
      },
      {
        name: "Milagre de Minas Caixa com Potes",
        description: "O melhor molho.",
        image:
          "./assets/produtos/MilagreDeMinas/caixa-com-potes-milagre-de-minas.webp",
        price: 42.0,
      },
    ],
    CamponatasAntepastos: [
      {
        name: "Frentano Sardella",
        description: "A melhor sardella.",
        image: "./assets/produtos/Frentano/frentano-sardella.webp",
        price: 35.0,
      },
      {
        name: "Frentano Pesto de azeitona preta",
        description: "O melhor pesto.",
        image:
          "./assets/produtos/Frentano/frentano-pesto-de-azeitona-preta.webp",
        price: 47.0,
      },
      {
        name: "L'apetisse Antepasto de pimenta",
        description: "O melhor antepasto.",
        image: "./assets/produtos/L'apetisse/antepasto-de-pimenta.webp",
        price: 37.9,
      },
      {
        name: "L'apetisse Camponata de Abobrinha",
        description: "A melhor beringela.",
        image: "./assets/produtos/L'apetisse/capotana-de-abobrinha.webp",
        price: 37.9,
      },
      {
        name: "L'apetisse Camponata de Berinjela",
        description: "A melhor beringela.",
        image: "./assets/produtos/L'apetisse/capotana-de-berinjela.webp",
        price: 37.9,
      },
      {
        name: "L'apetisse Berinjela Filetada",
        description: "A melhor beringela.",
        image: "./assets/produtos/L'apetisse/berinjela-filetada.webp",
        price: 37.9,
      },
      {
        name: "L'apetisse Pimenta Biquinho e alho",
        description: "A melhor pimenta.",
        image: "./assets/produtos/L'apetisse/pimenta-biquinho-e-alho.webp",
        price: 37.9,
      },
      {
        name: "Ayslla Beringela Defumada 350g",
        description: "O melhor defumado.",
        image: "./assets/produtos/Ayslla/beringela-defumada-350g.webp",
        price: 59.9,
      },
      {
        name: "Ayslla Jiló com castanha-de-cajú Defumada 345g",
        description: "O melhor defumado.",
        image:
          "./assets/produtos/Ayslla/jilo-com-castanha-de-caju-defumada-345g.webp",
        price: 59.9,
      },
      {
        name: "Ayslla Tomate Defumado 350g",
        description: "O melhor defumado.",
        image: "./assets/produtos/Ayslla/tomate-defumado-350g.webp",
        price: 59.9,
      },
      {
        name: "Ayslla Pesto de manjericão crocante com amêndoas defumadas 213g",
        description: "O melhor defumado.",
        image:
          "./assets/produtos/Ayslla/pesto-manjericao-crocante-com-amendoas-defumadas-213g.webp",
        price: 59.9,
      },
    ],
    Biscoitos: [
      {
        name: "Rocêro Biscoito de polvilho Docim 80g",
        description: "O melhor biscoito.",
        image: "./assets/produtos/ProdutosRocero/biscoito-docim-80g.webp",
        price: 23.9,
      },
      {
        name: "Rocêro Biscoito de polvilho Parmesão 80g",
        description: "O melhor biscoito.",
        image: "./assets/produtos/ProdutosRocero/biscoito-parmesao-80g.webp",
        price: 23.9,
      },
      {
        name: "Rocêro Biscoito de polvilho Queijo Minas 80g",
        description: "O melhor biscoito.",
        image: "./assets/produtos/ProdutosRocero/biscoito-queijo-minas-80g.png",
        price: 23.9,
      },
      {
        name: "Rocêro Biscoito de polvilho Salgadim 80g",
        description: "Rocêro o melhor biscoito.",
        image: "./assets/produtos/ProdutosRocero/biscoito-salgadim-80g.webp",
        price: 23.9,
      },
      {
        name: "L'apetisse Grissini Alho e Salsa",
        description: "O melhor biscoito.",
        image: "./assets/produtos/L'apetisse/grissini-alho-salsa.webp",
        price: 18.0,
      },
      {
        name: "L'apetisse Grissini tradicional",
        description: "O melhor biscoito.",
        image: "./assets/produtos/L'apetisse/grissini-tradicional.webp",
        price: 18.0,
      },
      {
        name: "Vermont Torradas Vermont",
        description: "Vermont a melhor Torrada.",
        image: "./assets/produtos/Vermont/torradas-vermont.webp",
        price: 15.0,
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

      document
        .querySelectorAll(".dropdown-menu li")
        .forEach((li) => li.classList.remove("active"));
      target.classList.add("active");

      dropdownButton.childNodes[0].textContent =
        target.textContent.trim().replace("›", "") + " ";

      document.querySelector(".carousel-arrows")?.classList.remove("hidden");
    }
  });

  let carouselInterval;

  function resetCarouselLoopTemporariamente() {
    clearInterval(carouselInterval);
    setTimeout(startCarouselLoop, 1000);
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
    startCarouselLoop();
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

  const cartIcon = document.getElementById("cart-icon");
  const cartModal = document.getElementById("cart-modal");
  const modalCheckoutButton = document.getElementById("modal-checkout-button");
  const closeCartModal = document.getElementById("close-cart-modal");
  const clearCartButton = document.getElementById("clear-cart-button");

  cartIcon?.addEventListener("click", () => {
    cartModal?.classList.remove("hidden");
  });

  closeCartModal?.addEventListener("click", () => {
    cartModal?.classList.add("hidden");
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
    cart.length = 0;
    updateCart();
    showMessage("Carrinho esvaziado com sucesso!");
  });

  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart.push(...JSON.parse(savedCart));
    updateCart();
  }

  window.addEventListener("resize", () => {
    enableMobileScroll();
    startCarouselLoop();
  });

  const searchInput = document.getElementById("product-search");
  const searchButton = document.getElementById("search-button");

  searchButton?.addEventListener("click", () => {
    const query = searchInput.value.trim().toLowerCase();

    const dropdownMenu = document.querySelector(".dropdown-menu");
    const dropdownButton = document.querySelector(".dropdown-button");
    const arrowIcon = document.querySelector(".arrow-icon");

    if (dropdownMenu?.classList.contains("show")) {
      dropdownMenu.classList.remove("show");
    }

    if (dropdownButton?.classList.contains("open")) {
      dropdownButton.classList.remove("open");
    }

    if (arrowIcon) {
      arrowIcon.textContent = "▼";
    }

    if (!query) {
      loadProducts();
      return;
    }

    const allProducts = Object.values(categories).flat();
    const results = allProducts.filter((product) =>
      product.name.toLowerCase().includes(query)
    );

    if (results.length === 0) {
      showMessage("Nenhum produto encontrado.");
    }

    currentCategory = results;
    currentIndex = 0;
    loadProducts();
  });

  searchInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchButton.click();
    }
  });
});
