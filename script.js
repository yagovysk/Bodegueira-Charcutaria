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
        price: 28.0,
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
        price: 0.0,
      },
    ],
    Mel: [
      {
        name: "Mel Black Forest 50g",
        description: "Produto indisponível.",
        image: "./assets/produtos/Amaze/mel-amaze-black-forest-50g.webp",
        price: 0.0,
      },
      {
        name: "Mel Black Forest 200g",
        description: "Produto indisponível.",
        image: "./assets/produtos/Amaze/mel-amaze-black-forest-200g.webp",
        price: 0.0,
      },
      {
        name: "Mel Cacau 70% 200g",
        description: "O melhor mel.",
        image: "./assets/produtos/Amaze/mel-amaze-cacau-70-200g.webp",
        price: 62.0,
      },
      {
        name: "Mel Cacau com laranja 200g",
        description: "O melhor mel.",
        image: "./assets/produtos/Amaze/mel-amaze-cacau-com-laranja-200g.webp",
        price: 62.0,
      },
      {
        name: "Mel Citrus 200g",
        description: "O melhor mel.",
        image: "./assets/produtos/Amaze/mel-amaze-citrus-200g.webp",
        price: 62.0,
      },
      {
        name: "Mel Orange Blossom 50g",
        description: "O melhor mel.",
        image: "./assets/produtos/Amaze/mel-amaze-orange-blossom-50g.webp",
        price: 14.0,
      },
      {
        name: "Mel Orange Blossom 200g",
        description: "O melhor mel.",
        image: "./assets/produtos/Amaze/mel-amaze-orange-blossom-200g.webp",
        price: 52.0,
      },
      {
        name: "Mel White blossom 50g",
        description: "O melhor mel.",
        image: "./assets/produtos/Amaze/mel-amaze-white-blossom-50g.webp",
        price: 14.0,
      },
      {
        name: "Mel White Blossom 200g",
        description: "O melhor mel.",
        image: "./assets/produtos/Amaze/mel-amaze-white-blossom-200g.webp",
        price: 52.0,
      },
      {
        name: "Bisnaga Mel silvestre",
        description: "O melhor mel.",
        image: "./assets/produtos/BrazilianFlavor/mel-flavor-silvestre.webp",
        price: 31.0,
      },
      {
        name: "Mel Mbee 300g",
        description: "O melhor mel.",
        image: "./assets/produtos/Mbee/mbee-mel-300g.webp",
        price: 44.0,
      },
      {
        name: "Mel Mbee black forest",
        description: "O melhor mel.",
        image: "./assets/produtos/Mbee/mbee-mel-black-forest.webp",
        price: 36.0,
      },
      {
        name: "Mel Mbee Canions gaúchos",
        description: "O melhor mel.",
        image: "./assets/produtos/Mbee/mel-canions-gauchos.webp",
        price: 59.0,
      },
      {
        name: "Mbee Mel Terroir 300g",
        description: "O melhor mel.",
        image: "./assets/produtos/Mbee/mel-torroir.webp",
        price: 59.0,
      },
      {
        name: "Mbee Mel Laranjeira",
        description: "O melhor mel.",
        image: "./assets/produtos/Mbee/mel-de-laranjeira.webp",
        price: 59.0,
      },
      {
        name: "Mbee Mel Gabriela",
        description: "O melhor mel.",
        image: "./assets/produtos/Mbee/mbee-mel-gabriela.webp",
        price: 44.0,
      },
      {
        name: "Mbee Melato Bragantina",
        description: "O melhor mel.",
        image: "./assets/produtos/Mbee/mbee-melato-bragantina.webp",
        price: 44.0,
      },
      {
        name: "Mbee Mel Silvestre 1kg",
        description: "O melhor mel.",
        image: "./assets/produtos/Mbee/mbee-silvestre-1kg.webp",
        price: 44.0,
      },
      {
        name: "Mel do Cerrado Aroeira 280g",
        description: "O melhor mel.",
        image: "./assets/produtos/MelDoCerrado/mel-aroeira.webp",
        price: 25.0,
      },
      {
        name: "Mel do Cerrado Cipó Uva 280g",
        description: "O melhor mel.",
        image: "./assets/produtos/MelDoCerrado/mel-cipo-uva.webp",
        price: 25.0,
      },
      {
        name: "Mel do Cerrado Laranjeira 280g",
        description: "O melhor mel.",
        image: "./assets/produtos/MelDoCerrado/mel-laranjeira.webp",
        price: 25.0,
      },
      {
        name: "Mel do Cerrado Silvestre",
        description: "O melhor mel.",
        image: "./assets/produtos/MelDoCerrado/mel-silvestre.webp",
        price: 29.9,
      },
      {
        name: "Favo de mel Cipó Úva",
        description: "O melhor mel.",
        image: "./assets/produtos/MelDoCerrado/favo-de-mel-cipo.webp",
        price: 29.9,
      },
      {
        name: "Favo de mel Aroeira",
        description: "O melhor mel.",
        image: "./assets/produtos/MelDoCerrado/favo-de-mel-aroeira.webp",
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
        price: 88.0,
      },
      {
        name: "Doce de Leite Leite tipo A 420g",
        description: "O melhor doce de leite.",
        image: "./assets/produtos/Estrelat/doce-de-leite-tipo-a-420g.webp",
        price: 0.0,
      },
      {
        name: "Doce de Leite com ameixa Dona Lazara 400g",
        description: "O doce de leite com ameixa...",
        longDescription:
          "O doce de leite com ameixa Dona Lázara, direto de Minas Gerais, é o autêntico doce de leite artesanal mineiro combinado com o sabor marcante da ameixa, cremosíssimo e irresistível!",
        image:
          "./assets/produtos/ProdutosDonaLazara/doce-de-leite-ameixa-400g.webp",
        price: 46.0,
      },
      {
        name: "Doce de Leite com Goiabada Dona Lazara 400g",
        description: "O melhor doce.",
        image:
          "./assets/produtos/ProdutosDonaLazara/doce-de-leite-goiabada-400g.webp",
        price: 46.0,
      },
      {
        name: "Doce de Leite com Maracujá Dona Lazara 400g",
        description: "Produto indisponível.",
        image:
          "./assets/produtos/ProdutosDonaLazara/doce-de-leite-maracuja-400g.webp",
        price: 46.0,
      },
      {
        name: "Doce de Leite com Morango Dona Lazara 400g",
        description: "Produto indisponível.",
        image:
          "./assets/produtos/ProdutosDonaLazara/doce-de-leite-morango-400g.webp",
        price: 46.0,
      },
      {
        name: "Doce de Leite Talhado Dona Lazara 400g",
        description: "Produto indisponível.",
        image:
          "./assets/produtos/ProdutosDonaLazara/doce-de-leite-talhado-400g.webp",
        price: 0.0,
      },
      {
        name: "Doce de Leite com café 400g",
        description: "Produto indisponível.",
        image: "./assets/produtos/ReceitaCaipira/doce-de-leite-cafe-400g.webp",
        price: 0.0,
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
        description: "Produto indisponível.",
        image:
          "./assets/produtos/ReceitaCaipira/doce-de-leite-com-coco-400g.webp",
        price: 0.0,
      },
      {
        name: "Doce de leite com raspas de limão 400g",
        description: "Produto indisponível.",
        image:
          "./assets/produtos/EmporioLessa/doce-de-leite-raspas-limao-400g.webp",
        price: 0.0,
      },
      {
        name: "Pingo de Leite com amendoim Dona Lazara",
        description: "Produto indisponível.",
        image:
          "./assets/produtos/ProdutosDonaLazara/pingo-de-leite-com-amendoim.webp",
        price: 0.0,
      },
      {
        name: "Doce de leite de Búfala ",
        description: "O melhor doce de leite.",
        image: "./assets/produtos/Natomatoo/doce-de-leite-de-bufala.webp",
        price: 49.0,
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
        image: "./assets/produtos/RignoCafe/cafe-especial-100-arabica.webp",
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
        name: "Duas irmãs Café Especial Torrado e moído",
        description: "O melhor Café.",
        image: "./assets/produtos/Divino/duas-irmas.webp",
        price: 37.5,
      },
      {
        name: "Café Tipo Superior Torrado e moído 250g",
        description: "O melhor Café.",
        image: "./assets/produtos/RignoCafe/cafe-tipo-superior.webp",
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
        name: "Scp Copa Lombo Maturado e Defumado Light",
        description: "Valor 100g, mais kg consultar no Whatsapp.",
        image:
          "./assets/produtos/SalumeriaSrcCaminhosDePedra/lombo-curado-defumado.webp",
        price: 15.4,
      },
      {
        name: "Scp Copa Maturada e Defumada Especial 100g",
        description: "O melhor defumado.",
        image:
          "./assets/produtos/SalumeriaSrcCaminhosDePedra/copa-defumada-especial-maior.webp",
        price: 15.4,
      },
      /*{
        name: "Linguiça Calabresa Defumada",
        description: "O melhor defumado.",
        image:
          "./assets/produtos/CacianCharcutaria/linguica-calabresa-defumada.webp",
        price: 29.9,
      },*/
      {
        name: "Calabresa Defumada",
        description: "A melhor calabresa.",
        image: "./assets/produtos/ColdSmoke/calabresa-defumada.webp",
        price: 31.8,
      },
      {
        name: "Guanciale Maturado",
        description: "O melhor guanciale.",
        image: "./assets/produtos/ColdSmoke/guanciale-maturado.webp",
        price: 43.9,
      },
      {
        name: "Pastrami Defumado",
        description: "Pastrami Defumado peça.",
        image: "./assets/produtos/ColdSmoke/pastrami-defumado.webp",
        price: 63.0,
      },
      {
        name: "Pastrami Defumado em fatias",
        description: "O melhor pastrami.",
        image: "./assets/produtos/ColdSmoke/pastrami-defumado-fatias.webp",
        price: 48.0,
      },
      {
        name: "Pitlord Bacon Defumado",
        description: "O melhor Bacon.",
        image: "./assets/produtos/PitLord/bacon-defumado.webp",
        price: 52.0,
      },
      {
        name: "Pitlord Bacon Especial de Pernil Defumado",
        description: "Verificar disponibilidade.",
        image: "./assets/produtos/PitLord/bacon-especial-de-pernil.webp",
        price: 0.0,
      },
      {
        name: "Pitlord Guanciale Defumado",
        description: "Verificar Disponibilidade.",
        image: "./assets/produtos/PitLord/guanciale-defumado.webp",
        price: 0.0,
      },
      {
        name: "Pitlord Pancetta Rolata Defumada",
        description: "A melhor pancetta.",
        image: "./assets/produtos/PitLord/pancetta-rolata-defumada.webp",
        price: 58.0,
      },
      {
        name: "Pitlord Picanha Suína Defumada",
        description: "A melhor picanha.",
        image: "./assets/produtos/PitLord/picanha-defumada.webp",
        price: 89.0,
      },
      {
        name: "Pitlord Salsicha Artesanal Defumada",
        description: "A melhor Salsicha.",
        image: "./assets/produtos/PitLord/salsicha-artesanal-defumada.webp",
        price: 38.0,
      },
      {
        name: "Pitlord Joelho Defumado",
        description: "O melhor joelho.",
        image: "./assets/produtos/PitLord/joelho-defumado.webp",
        price: 89.0,
      },
      {
        name: "ColdSmoke Pepperoni Picante",
        description: "Verificar Disponibilidade.",
        image: "./assets/produtos/ColdSmoke/pepperoni-picante.webp",
        price: 0.0,
      },
      {
        name: "ColdSmoke Pulled Pork",
        description: "A melhor pulled pork.",
        image: "./assets/produtos/ColdSmoke/pulled-pork.webp",
        price: 58.0,
      },
      {
        name: "ColdSmoke Salsicha Frank Furter",
        description: "A melhor salsicha.",
        image: "./assets/produtos/ColdSmoke/salsicha-frank-furter.webp",
        price: 48.0,
      },
      {
        name: "ColdSmoke Torresmo de Rolo",
        description: "O melhor torresmo.",
        image: "./assets/produtos/ColdSmoke/torresmo-de-rolo.webp",
        price: 31.9,
      },
      {
        name: "Olho Linguiça Blumenau",
        description: "Verificar Disponibilidade.",
        image: "./assets/produtos/Olho/linguica-blumenau.webp",
        price: 0.0,
      },
      {
        name: "Olho Linguiça Húngara",
        description: "Verificar Disponibilidade.",
        image: "./assets/produtos/Olho/linguica-hungara.webp",
        price: 0.0,
      },
    ],
    Geleias: [
      {
        name: "LetsCook Geleia de Pimenta Defumada",
        description: "A melhor Geleia.",
        image: "./assets/produtos/LetsCook/lets-cook-pimenta-defumada.webp",
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
        name: "Geleia MeLambuzei Abacaxi com Pimenta",
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
        image: "./assets/produtos/MeLambuzei/me-lambuzei-mexerica.webp",
        price: 44.0,
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
        image: "./assets/produtos/GeleiaCoroa/chutney-de-maracuja.webp",
        price: 39.8,
      },
      {
        name: "Geleia de Maracujá com HUB de Churrasco",
        description: "A melhor geleia.",
        image:
          "./assets/produtos/GeleiaCoroa/geleia-de-maracuja-com-hub-de-churrasco.webp",
        price: 39.8,
      },
      {
        name: "Melado de cana de Tereza",
        description: "O melhor melado.",
        image:
          "./assets/produtos/TabuleiroDaChef/melado-de-cana-de-teresa.webp",
        price: 39.8,
      },
    ],
    GeleiasZero: [
      {
        name: "Puro&Leve Geleia de Cupuaçu Sem adição de Açúcar",
        description: "As melhores geleias.",
        image: "./assets/produtos/Puro&Leve/geleia-cupuacu-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Puro&Leve Geleia de Abacaxi com Pimenta Sem adição de Açúcar",
        description: "As melhores geleias.",
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
        description: "As melhores geleias.",
        image: "./assets/produtos/Puro&Leve/frutas-do-bosque-sem-adicao.webp",
        price: 32.0,
      },
      {
        name: "Puro&Leve Geleia de Frutas Vermelhas Sem adição de Açúcar",
        description: "As melhores geleiras",
        image:
          "./assets/produtos/Puro&Leve/geleia-de-frutas-vermelhas-sem-adicao.png",
        price: 32.0,
      },
      {
        name: "Puro&Leve Geleia de Pitaya com Amora e Morango Sem adição de Açúcar",
        description: "As melhores geleiras",
        image:
          "./assets/produtos/Puro&Leve/geleia-pitaya-amora-morango-sem-adicao.webp",
        price: 29.9,
      },
      {
        name: "Puro&Leve Geleia Keto de Damasco",
        description: "As melhores geleias",
        image: "./assets/produtos/Puro&Leve/geleia-keto-damasco.webp",
        price: 32.0,
      },
      {
        name: "Puro&Leve Geleia de Uva Sem adição de Açúcar",
        description: "As melhores geleias",
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
        description: "As melhores geleias.",
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
        price: 24.5,
      },
      {
        name: "Sabor Gaúcho Biscoito de Amendoim Sem adição de Açúcar",
        description: "O melhor Biscoito.",
        image:
          "./assets/produtos/SaborGaucho/biscoitos-de-amendoim-sem-adicao.webp",
        price: 24.5,
      },
      {
        name: "Sabor Gaúcho Biscoito de Cacau Sem adição de Açúcar",
        description: "O melhor Biscoito.",
        image:
          "./assets/produtos/SaborGaucho/biscoitos-de-cacau-sem-adicao.webp",
        price: 24.5,
      },
      {
        name: "Sabor Gaúcho Biscoito de Café Sem adição de Açúcar",
        description: "O melhor Biscoito.",
        image:
          "./assets/produtos/SaborGaucho/biscoitos-de-cafe-sem-adicao.webp",
        price: 24.5,
      },
      {
        name: "Sabor Gaúcho Biscoito de Camomila Sem adição de Açúcar",
        description: "O melhor Biscoito.",
        image:
          "./assets/produtos/SaborGaucho/biscoitos-de-camomila-sem-adicao.webp",
        price: 24.5,
      },
      {
        name: "Sabor Gaúcho Biscoito de Lavanda Sem adição de Açúcar",
        description: "O melhor Biscoito.",
        image:
          "./assets/produtos/SaborGaucho/biscoitos-de-lavanda-sem-adicao.webp",
        price: 24.5,
      },
      {
        name: "Sabor Gaúcho Biscoito de Maracujá Sem adição de Açúcar",
        description: "O melhor Biscoito.",
        image:
          "./assets/produtos/SaborGaucho/biscoitos-de-maracuja-sem-adicao.webp",
        price: 24.5,
      },
      {
        name: "Sabor Gaúcho Biscoito de Morango Sem adição de Açúcar",
        description: "O melhor Biscoito.",
        image:
          "./assets/produtos/SaborGaucho/biscoitos-de-morango-sem-adicao.webp",
        price: 24.5,
      },
      {
        name: "Sabor Gaúcho Biscoito de Nozes Sem adição de Açúcar",
        description: "O melhor Biscoito.",
        image:
          "./assets/produtos/SaborGaucho/biscoitos-de-nozes-sem-adicao.webp",
        price: 24.5,
      },
      {
        name: "Sabor Gaúcho Broa de Milho Sem adição de Açúcar",
        description: "O melhor Biscoito.",
        image: "./assets/produtos/SaborGaucho/broa-de-milho-sem-adicao.webp",
        price: 24.5,
      },
    ],
    Torrones: [
      {
        name: "Torrone de Amêndoas Avelã e Castanha com Mel 45g",
        description: "O melhor torrone.",
        image:
          "./assets/produtos/Torrones/torrone-amendoa-avela-castanha-mel-45g.webp",
        price: 0.0,
      },
      {
        name: "Torrone de amêndoas avelã e castanha sem Mel 45g",
        description: "O melhor torrone.",
        image:
          "./assets/produtos/Torrones/torrone-amendoa-avela-castanha-sem-mel-45g.webp",
        price: 0.0,
      },
      {
        name: "Torrone de Amêndoas com Chocolate 45g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-amendoa-choco-45g.webp",
        price: 0.0,
      },
      {
        name: "Torrone de Amêndoas com Chocolate 90g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-amendoa-chocolate.webp",
        price: 0.0,
      },
      {
        name: "Torrone de Amêndoas Figo com nozes 90g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-amendoas.webp",
        price: 0.0,
      },
      {
        name: "Torrone de Amêndoas avelã e Castanha de Cajú 90g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-castanha.webp",
        price: 0.0,
      },
      {
        name: "Torrone de Amêndoas Avelã Damasco e Cranberry 45g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-damasco-cranberry-45g.webp",
        price: 0.0,
      },
      {
        name: "Torrone de Amêndoas Avelã Damasco e Cranberry 90g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-damasco-cranberry.webp",
        price: 0.0,
      },
      {
        name: "Torrone de Frutas Vermelhas 45g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-frutas-vermelhas-45g.webp",
        price: 0.0,
      },
      {
        name: "Torrone de Frutas Vermelhas 90g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-frutas-vermelhas.webp",
        price: 0.0,
      },
      {
        name: "Torrone de Laranja com Chocolate Branco 45g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-laranja-choco-branco.webp",
        price: 0.0,
      },
      {
        name: "Torrone de Laranja com Chocolate Branco 90g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-laranja-chocolate.webp",
        price: 0.0,
      },
      {
        name: "Torrone de Amêndoas com Pistache 45g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-pistache-45g.webp",
        price: 0.0,
      },
      {
        name: "Torrone de Amêndoas com Pistache 90g",
        description: "O melhor torrone.",
        image: "./assets/produtos/Torrones/torrone-pistache.webp",
        price: 0.0,
      },
    ],
    Doces: [
      {
        name: "Jatiboca Bala de Goiabada",
        description: "A melhor Bala.",
        image: "./assets/produtos/Jatiboca/bala-goiabada.webp",
        price: 49.9,
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
        price: 39.9,
      },
      {
        name: "Serra Negra Bala de Doce de Leite",
        description: "Produto indisponível.",
        image: "./assets/produtos/SerraNegra/bala-de-doce-de-leite.webp",
        price: 0.0,
      },
      {
        name: "Tabuleiro Da Chef Cocada de Abóbora",
        description: "O melhor doce.",
        image: "./assets/produtos/TabuleiroDaChef/cocada-de-abobora.webp",
        price: 0.0,
      },
      {
        name: "Tabuleiro Da Chef Cocada de Tereza Tradicional",
        description: "Produto indisponível.",
        image:
          "./assets/produtos/TabuleiroDaChef/cocada-de-tereza-tradicional.webp",
        price: 0.0,
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
        price: 129.0,
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
        price: 89.0,
      },
      {
        name: "Casa Bianchi Licor de Banoffee 250ml",
        description: "O melhor doce de licor.",
        image: "./assets/produtos/CasaBianchi/licor-banoffee-250ml.webp",
        price: 63.0,
      },
      {
        name: "Casa Bianchi Licor de Banoffee 500ml",
        description: "O melhor doce de licor.",
        image: "./assets/produtos/CasaBianchi/licor-banoffee-500ml.webp",
        price: 109.0,
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
        description: "Produto indisponível.",
        image: "./assets/produtos/TabuleiroDaChef/flor-de-mOncello.webp",
        price: 0.0,
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
        name: "Cachaça bodegueira Prata 375ml",
        description: "A melhor cachaça.",
        image: "./assets/produtos/Bodegueira/cachaca-branca.webp",
        price: 29.0,
      },
      {
        name: "Cachaça bodegueira carvalho 375ml",
        description: "A melhor cachaça.",
        image: "./assets/produtos/Bodegueira/cachaca-clara.webp",
        price: 39.0,
      },
      {
        name: "Cachaça bodegueira 3 Madeiras",
        description: "Produto indsponível.",
        image: "./assets/produtos/Bodegueira/cachaca-escura.webp",
        price: 0.0,
      },
      {
        name: "Velho Alambique Cachaça Envelhecida Blend Premium",
        description: "Produto indisponível.",
        image:
          "./assets/produtos/VelhoAlambique/cachaca-envelhecida-blend-premium.webp",
        price: 0.0,
      },
      {
        name: "Velho Alambique Cachaça Envelhecida em Cabreúva Premium",
        description: "A melhor cachaça.",
        image:
          "./assets/produtos/VelhoAlambique/cachaca-envelhecida-em-cabreuva-premium.webp",
        price: 80.0,
      },
      {
        name: "Velho Alambique Cachaça Envelhecida em Carvalho Premium",
        description: "A melhor cachaça.",
        image:
          "./assets/produtos/VelhoAlambique/cachaca-envelhecida-em-carvalho.webp",
        price: 120.0,
      },
      {
        name: "Velho Alambique Licor de Chocolate",
        description: "A melhor cachaça.",
        image: "./assets/produtos/VelhoAlambique/licor-de-chocolate.webp",
        price: 80.0,
      },
    ],
    Salames: [
      {
        name: "Mayer Calabresa Seca",
        description: "Valor das 100g, maior kg consultar no Whatsapp.",
        image: "./assets/produtos/Mayer/calabresa-seca.webp",
        price: 29.98,
      },
      {
        name: "Mayer Salame de Cordeiro",
        description: "Valor das 100g, maior kg consultar no Whatsapp.",
        image: "./assets/produtos/Mayer/salame-de-cordeiro.webp",
        price: 41.4,
      },
      {
        name: "Mayer Salame de Classico",
        description: "Valor das 100g, maior kg consultar no Whatsapp.",
        image: "./assets/produtos/Mayer/salame-classico.webp",
        price: 29.04,
      },
      {
        name: "Mayer Salame com Pistache",
        description: "Valor das 100g, maior kg consultar no Whatsapp.",
        image: "./assets/produtos/Mayer/salame-com-pistache.webp",
        price: 33.6,
      },
      {
        name: "Mayer Salame Misto de Cordeiro e suíno",
        description: "Valor das 100g, maior kg consultar no Whatsapp.",
        image: "./assets/produtos/Mayer/salame-misto-cordeiro-suino.webp",
        price: 41.4,
      },
      {
        name: "Mayer Salame da Casa",
        description: "Valor por peso, consultar no Whatsapp.",
        image: "./assets/produtos/Mayer/salame-mayer.webp",
        price: 0.0,
      },
      {
        name: "Mayer Salame Calabrese",
        description: "Valor das 100g, maior kg consultar no Whatsapp.",
        image: "./assets/produtos/Mayer/salame-tipo-calabresa.webp",
        price: 29.0,
      },
      /*
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
      */
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
        name: "Scp Copa Defumada Especial",
        description: "Preço 100g, mais kg consultar no WhatsApp.",
        image:
          "./assets/produtos/SalumeriaSrcCaminhosDePedra/copa-defumada-especial.webp",
        price: 15.4,
      },
      {
        name: "Scp Salame de Carne Suína Defumada Apimentada",
        description: "Valor 100g, mais kg consultar no Whatsapp.",
        image:
          "./assets/produtos/SalumeriaSrcCaminhosDePedra/linguica-de-carne-suina-defumada-apimentada.webp",
        price: 14.0,
      },
      {
        name: "Scp Salame de Carne Suína Defumada Erva Doce",
        description: "Valor 100g, mais kg consultar no Whatsapp.",
        image:
          "./assets/produtos/SalumeriaSrcCaminhosDePedra/linguica-de-carne-suina-defumada-apimentada.webp",
        price: 14.0,
      },
      {
        name: "Scp Salame Misto Defumado Ovino e Suíno",
        description: "Valor 100g, mais kg consultar no Whatsapp.",
        image:
          "./assets/produtos/SalumeriaSrcCaminhosDePedra/linguica-mista-defumada.webp",
        price: 19.2,
      },
      {
        name: "Scp Salame Tipo Milano Defumado",
        description: "Valor 100g, mais kg consultar no Whatsapp.",
        image:
          "./assets/produtos/SalumeriaSrcCaminhosDePedra/salame-tipo-milano-defumado.webp",
        price: 14.0,
      },
      {
        name: "Scp Salame Tipo Sopressa Defumado",
        description: "Valor 100g, mais kg consultar no Whatsapp.",
        image:
          "./assets/produtos/SalumeriaSrcCaminhosDePedra/salame-tipo-sopressa-defumado.webp",
        price: 19.8,
      },
      {
        name: "Scp Salame Misto Defumado com Javali",
        description: "Valor 100g, mais kg consultar no Whatsapp.",
        image:
          "./assets/produtos/SalumeriaSrcCaminhosDePedra/linguica-mista-defumada-com-javali.webp",
        price: 19.2,
      },
      {
        name: "Scp Lombo Curado Defumado Light",
        description: "Valor 100g, mais kg consultar no Whatsapp.",
        image:
          "./assets/produtos/SalumeriaSrcCaminhosDePedra/lombo-curado-defumado.webp",
        price: 15.4,
      },
      {
        name: "Scp Salame Colonial Defumado",
        description: "Valor 100g, mais kg consultar no Whatsapp.",
        image:
          "./assets/produtos/SalumeriaSrcCaminhosDePedra/salame-colonial-defumado.webp",
        price: 12.5,
      },
      {
        name: "Olho Salame Tipo italiano",
        description: "Valor 100g, mais kg consultar no Whatsapp.",
        image: "./assets/produtos/Olho/salame-tipo-italiano.webp",
        price: 14.0,
      },
      /*{
        name: "Salumeria Romani Salame tipo Napolitano",
        description: "Produto indisponível.",
        image: "./assets/produtos/SalumeriaRomani/salame-tipo-napolitano.webp",
        price: 0.0,
      },*/
      {
        name: "Salame Defumado Apimentado",
        description: "Produto indisponível.",
        image:
          "./assets/produtos/CacianCharcutaria/salame-defumado-apimentado.webp",
        price: 0.0,
      },
      {
        name: "Cancian Charcutaria Salame tipo Friolano",
        description: "Produto indisponível.",
        image: "./assets/produtos/CacianCharcutaria/salame-tipo-friolano.webp",
        price: 0.0,
      },
      /*{
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
        price: 65.0,
      },
      {
        name: "Charque Light",
        description: "O Melhor charque.",
        image: "./assets/produtos/AgroindustriaSinuelo/charque-light.webp",
        price: 53.0,
      },
      {
        name: "Charque Tradicional",
        description: "O Melhor charque.",
        image:
          "./assets/produtos/AgroindustriaSinuelo/charque-tradicional.webp",
        price: 49.0,
      },
      /*{
        name: "Jais Salame",
        description: "O Melhor Salame.",
        image: "./assets/produtos/Jais/salame-jais.webp",
        price: 62.4,
      },*/
      {
        name: "Sabor do Chef Salame Tipo Italiano Azeitonas",
        description: "Valor Unidade.",
        image:
          "./assets/produtos/SaborDoChef/salame-tipo-italiano-azeitonas.webp",
        price: 30.0,
      },
      {
        name: "Sabor do Chef Salame Tipo Italiano Malagueta",
        description: "Valor Unidade.",
        image:
          "./assets/produtos/SaborDoChef/salame-tipo-italiano-malagueta.webp",
        price: 30.0,
      },
      {
        name: "Sabor do Chef Salame Tipo Italiano Pimenta Biquinho",
        description: "Valor Unidade.",
        image:
          "./assets/produtos/SaborDoChef/salame-tipo-italiano-pimenta-biquinho.webp",
        price: 30.0,
      },
      {
        name: "Sabor do Chef Salame Tipo Italiano Provolone",
        description: "Valor Unidade.",
        image:
          "./assets/produtos/SaborDoChef/salame-tipo-italiano-provolone.webp",
        price: 30.0,
      },
      {
        name: "Sabor do Chef Salame Tipo Italiano Tradicional",
        description: "Valor Unidade.",
        image:
          "./assets/produtos/SaborDoChef/salame-tipo-italiano-tradicional.webp",
        price: 30.0,
      },
      {
        name: "Soeiro Salame com Funghi",
        description: "Consultar no Whatsapp.",
        image: "./assets/produtos/Soeiro/salame-com-funghi.webp",
        price: 0.0,
      },
      {
        name: "Soeiro Salpicão Português",
        description: "Consultar no Whatsapp.",
        image: "./assets/produtos/Soeiro/salpicao-portugues.webp",
        price: 0.0,
      },
      {
        name: "Vila Caipira Lombo Nobre Defumado com Alho",
        description: "Valor 100g, mais kg consultar no Whatsapp..",
        image: "./assets/produtos/VilaCaipira/lombo-nobre-defumado-alho.webp",
        price: 8.8,
      },
      {
        name: "Vila Caipira Lombo Nobre Defumado com Pimenta",
        description: "Valor 100g, mais kg consultar no Whatsapp.",
        image:
          "./assets/produtos/VilaCaipira/lombo-nobre-defumado-pimenta-calabresa.webp",
        price: 8.8,
      },
      {
        name: "Vila Caipira Salame de Frango Defumado Misto",
        description: "Valor 100g, mais kg consultar no Whatsapp.",
        image:
          "./assets/produtos/VilaCaipira/salame-frango-defumado-misto.webp",
        price: 8.8,
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
        price: 61.0,
      },
      {
        name: "Cabríssima Queijo tipo boursin com ervas finas",
        description: "O melhor queijo.",
        image: "./assets/produtos/Cabrissima/queijo-boursin-ervas-finas.webp",
        price: 61.0,
      },
      {
        name: "Cabríssima Queijo tipo boursin com chimichurry",
        description: "O melhor queijo.",
        image:
          "./assets/produtos/Cabrissima/queijo-boursin-leite-de-cabra-com-chimichurri.webp",
        price: 61.0,
      },
      {
        name: "Cabríssima Queijo tipo boursin de leite de cabra com Za'atar",
        description: "O melhor queijo.",
        image:
          "./assets/produtos/Cabrissima/queijo-tipo-boursin-leite-de-cabra-com-zaatar.webp",
        price: 61.0,
      },
      {
        name: "Cabríssima Queijo flor do cerrado",
        description: "Valor 100g.",
        image: "./assets/produtos/Cabrissima/flor-do-cerrado.webp",
        price: 33.4,
      },
      {
        name: "Cabríssima Queijo maturado de leite de cabra Brasília",
        description: "100g, mais kg Consultar preço no Whatsapp.",
        image:
          "./assets/produtos/Cabrissima/queijo-maturado-de-leite-de-cabra-brasilia.webp",
        price: 28.0,
      },
      {
        name: "Casa Bianchi Queijo Piegora colonial de leite de ovelha com chimichurri",
        description: "100g, mais kg Consultar preço no Whatsapp.",
        image:
          "./assets/produtos/CasaBianchi/Piegora-queijo-colonial-de-leite-de-ovelha-com-chimichurri.webp",
        price: 28.0,
      },
      {
        name: "Casa Bianchi Queijo Palline di Catarina tipo boursin alecrim e pimenta",
        description: "O melhor queijo.",
        image:
          "./assets/produtos/CasaBianchi/queijo-palline-di-catarina-tipo-boursin-alecrim-e-pimenta.webp",
        price: 52.0,
      },
      {
        name: "Casa Bianchi Queijo tipo Feta de leite de ovelha",
        description: "100g, mais kg Consultar preço no Whatsapp.",
        image:
          "./assets/produtos/CasaBianchi/queijo-tipo-deta-de-leite-de-ovelha.webp",
        price: 28.0,
      },
      {
        name: "Casa Bianchi Queijinho Queijo Colonial de Leite de Ovelha",
        description: "100g, mais kg Consultar preço no Whatsapp.",
        image:
          "./assets/produtos/CasaBianchi/queijinho-queijo-colonial-de-leite-de-ovelha.webp",
        price: 28.0,
      },
      {
        name: "Fazenda Celeiro do Leite Queijo Celero",
        description: "100g, mais kg Consultar preço no Whatsapp.",
        image: "./assets/produtos/Celero/queijo-celero.webp",
        price: 14.0,
      },
      {
        name: "Fazenda Celeiro do Leite Queijo Candeia Autoral",
        description: "Consultar preço no Whatsapp.",
        image: "./assets/produtos/Candeia/queijo-autoral.webp",
        price: 0.0,
      },
      {
        name: "Fazenda Celeiro do Leite Queijo Cremoso Autoral",
        description: "Valor das 100g.",
        image: "./assets/produtos/Cremoso/queijo-autoral.webp",
        price: 13.0,
      },
      {
        name: "Fazenda Generosa Queijo O enigma",
        description: "Consultar preço no Whatsapp.",
        image: "./assets/produtos/FazendaGenerosa/o-enigma.webp",
        price: 0.0,
      },
      {
        name: "Fazenda Generosa Queijo O Lendário da Generosa",
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
        description: "Valor 100g, mais kg Consultar preço no Whatsapp.",
        image: "./assets/produtos/JeitoDeMato/requeijao.webp",
        price: 12.5,
      },
      {
        name: "Jeito De Mato Requeijão com Raspas",
        description: "Valor 100g, mais kg Consultar preço no Whatsapp.",
        image: "./assets/produtos/JeitoDeMato/requeijao.webp",
        price: 12.5,
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
        description: "Valor 100g, mais kg Consultar preço no Whatsapp.",
        image: "./assets/produtos/PaladarDeMinas/calambau-com-cachaca.webp",
        price: 14.5,
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
        description: "Valor 100g, mais kg Consultar preço no Whatsapp.",
        image:
          "./assets/produtos/QueijariaBolderini/malacaxeta-queijo-maturado-30-dias.webp",
        price: 16.8,
      },
      {
        name: "Queijaria Bolderini Queijo Santa Graça",
        description: "Valor 100g, mais kg Consultar preço no Whatsapp.",
        image: "./assets/produtos/QueijariaBolderini/queijo-santa-graca.webp",
        price: 15.3,
      },
      {
        name: "Queijo do Serjão queijo canastra",
        description: "Valor 100g, mais kg Consultar preço no Whatsapp.",
        image: "./assets/produtos/QueijoDoSerjao/queijo-canastra.webp",
        price: 17.9,
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
        name: "Serra Do Condado Queijo Defumado de Alagoa",
        description: "Consultar preço no Whatsapp.",
        image: "./assets/produtos/SerraDoCondado/queijo-defumado.webp",
        price: 0.0,
      },
      {
        name: "Serra Do Condado Queijo Ovo Negro de Alagoa",
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
        price: 36.0,
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
        description: "Verificar Disponibilidade.",
        image: "./assets/produtos/LimaQueijos/queijo-rustiquim.webp",
        price: 0.0,
      },
      {
        name: "Micro Região Serro Queijo Minas Quilombo inteiro",
        description: "Verificar Disponibilidade.",
        image:
          "./assets/produtos/MicroRegiaoSerro/queijo-minas-quilombo-inteiro.webp",
        price: 88.0,
      },
      {
        name: "Micro Região Serro Queijo Minas Quilombo metade",
        description: "Valor 100g, mais kg Consultar no whatsapp.",
        image:
          "./assets/produtos/MicroRegiaoSerro/queijo-minas-quilombo-metade.webp",
        price: 15.3,
      },
      {
        name: "Micro Região Serro Queijo Minas Quilombo Saco",
        description: "Valor 100g, mais kg Consultar no whatsapp.",
        image:
          "./assets/produtos/MicroRegiaoSerro/queijo-minas-quilombo-saco.webp",
        price: 15.3,
      },
      {
        name: "Pomerode Creme Tipo Brie Zero Lactose",
        description: "O melhor creme.",
        image: "./assets/produtos/Pomedore/creme-tipo-brie-zero-lactose.webp",
        price: 28.0,
      },
      {
        name: "Pomerode Creme Gorgonzola Zero Lactose",
        description: "O melhor creme.",
        image: "./assets/produtos/Pomedore/creme-de-gorgonzola-zero.webp",
        price: 28.0,
      },
      {
        name: "Queijo Coqueiral",
        description: "Valor 100g, mais kg Consultar no whatsapp.",
        image: "./assets/produtos/QueijoCoqueiral/queijo-coqueiral.webp",
        price: 15.3,
      },
      {
        name: "Quinta De Sant'Ana queijo Canastra Crispy",
        description: "Valor Unidade.",
        image: "./assets/produtos/QuintaDeSant'Ana/queijo-canastra-crispy.webp",
        price: 35.0,
      },
      {
        name: "Quinta De Sant'Ana queijo Cordilheira",
        description: "Valor 100g, mais kg Consultar no whatsapp.",
        image: "./assets/produtos/QuintaDeSant'Ana/queijo-cordilheira.webp",
        price: 14.0,
      },
      {
        name: "Quinta De Sant'Ana queijo Marandu",
        description: "Valor 100g, mais kg Consultar no whatsapp.",
        image: "./assets/produtos/QuintaDeSant'Ana/queijo-marandu.webp",
        price: 25.4,
      },
      {
        name: "Rancho Maranata Queijo Mantiqueira Maranata Jovem",
        description: "Verificar Disponibilidade.",
        image:
          "./assets/produtos/RanchoMaranata/queijo-mantiqueira-maranata-jovem.webp",
        price: 0.0,
      },
      {
        name: "Rancho Maranata Queijo Maranata Capa Preta",
        description: "Verificar Disponibilidade.",
        image:
          "./assets/produtos/RanchoMaranata/queijo-maranata-jovem-capa-preta.webp",
        price: 0.0,
      },
      {
        name: "Terra Límpida Queijo Faggeta",
        description: "Valor 100g, mais kg Consultar no whatsapp.",
        image: "./assets/produtos/TerraLimpida/queijo-faggeta.webp",
        price: 26.3,
      },
      {
        name: "Terra Límpida Queijo Primavera",
        description: "Verificar Disponibildade.",
        image: "./assets/produtos/TerraLimpida/queijo-primavera.webp",
        price: 42.0,
      },
      {
        name: "Terra Límpida Queijo Querciola 3 Meses",
        description: "Valor 100g, mais kg Consultar no whatsapp.",
        image: "./assets/produtos/TerraLimpida/queijo-querciola.webp",
        price: 24.1,
      },
      {
        name: "Terra Límpida Queijo Tipo Brie",
        description: "Valor 100g, mais kg Consultar no whatsapp.",
        image: "./assets/produtos/TerraLimpida/queijo-tipo-brie.webp",
        price: 27.6,
      },
      {
        name: "Fazenda São Victor Queijo Do Marajó Leite de Búfala Tipo Creme",
        description: "Valor 100g, mais kg Consultar no whatsapp.",
        image: "./assets/produtos/QueijoDoMarajo/queijo-de-bufala-creme.webp",
        price: 27.6,
      },
    ],
    Chocolates: [
      {
        name: "Do Cacao Caixa de chocolate barras do Cacao",
        description: "O melhor chocolate.",
        image: "./assets/produtos/ChocolateDoCacao/caixa-do-cacao.webp",
        price: 245.0,
      },
      {
        name: "Do Cacao Chocolate ao Leite 40% cacau 30g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/chocolate-ao-leite-40-30g.webp",
        price: 19.0,
      },
      {
        name: "Do Cacao Chocolate ao Leite 40% cacau 85g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/chocolate-ao-leite-40-85g.webp",
        price: 40.0,
      },
      {
        name: "Do Cacao Chocolate ao Leite com castanha 40% cacau 30g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/chocolate-ao-leite-com-castanha-40-30g.webp",
        price: 19.0,
      },
      {
        name: "Do Cacao Chocolate ao Leite com castanha 40% cacau 85g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/chocolate-ao-leite-com-castanha-40-85g.webp",
        price: 40.0,
      },
      {
        name: "Do Cacao Chocolate ao Leite com cupuaçu 40% cacau 30g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/chocolate-ao-leite-com-cupuacu-40-30g.webp",
        price: 19.0,
      },
      {
        name: "Do Cacao Chocolate ao Leite com cupuaçu 40% cacau 85g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/chocolate-com-cupuacu-40-85g.webp",
        price: 40.0,
      },
      {
        name: "Do Cacao Chocolate Branco 35% cacau 30g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/chocolate-branco-35-30g.webp",
        price: 19.0,
      },
      {
        name: "Do Cacao Chocolate Branco 35% cacau 85g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/chocolate-branco-35-85g.webp",
        price: 40.0,
      },
      {
        name: "Do Cacao Chocolate Branco com amora 35% cacau 30g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/chocolate-branco-com-amora-35-30g.webp",
        price: 19.0,
      },
      {
        name: "Do Cacao Chocolate Branco com amora 35% cacau 85g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/chocolate-branco-com-amora-35-85g.webp",
        price: 40.0,
      },
      {
        name: "Do Cacao Chocolate com café 40% cacau 30g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/chocolate-com-cafe-40-30g.webp",
        price: 19.0,
      },
      {
        name: "Do Cacao Chocolate com café 40% cacau 85g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/chocolate-com-cafe-40-85g.webp",
        price: 40.0,
      },
      {
        name: "Do Cacao Chocolate Intenso 70% cacau 30g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/chocolate-intenso-70-30g.webp",
        price: 19.0,
      },
      {
        name: "Do Cacao Chocolate Intenso 70% cacau 85g",
        description: "O melhor chocolate.",
        image:
          "./assets/produtos/ChocolateDoCacao/chocolate-intenso-70-85g.webp",
        price: 40.0,
      },
      {
        name: "Amêndoa do cacao Caramelizada 130g",
        description: "Produto indisponível.",
        image:
          "./assets/produtos/ChocolateDoCacao/amendoa-do-cacao-caramelizada-130g.webp",
        price: 0.0,
      },
      {
        name: "Nibs do cacao Caramelizado 150g",
        description: "Produto indisponível.",
        image:
          "./assets/produtos/ChocolateDoCacao/nibs-do-cacao-caramelizado-150g.webp",
        price: 0.0,
      },
      {
        name: "Melaço do Cacao 240g",
        description: "O melhor chocolate.",
        image: "./assets/produtos/ChocolateDoCacao/melaco-do-cacao-240g.webp",
        price: 77.9,
      },
      {
        name: "Geleia do cacao 240g",
        description: "A melhor geleia.",
        image: "./assets/produtos/ChocolateDoCacao/geleia-do-cacao-240g.webp",
        price: 39.9,
      },
    ],
    Manteigas: [
      {
        name: "Manteigaria Nacional Manteiga Ghee com Alecrim",
        description: "A melhor manteiga.",
        image:
          "./assets/produtos/ManteigariaNacional/manteiga-ghee-alecrim.webp",
        price: 54.0,
      },
      {
        name: "Manteigaria Nacional Manteiga Ghee com Noz Moscada e Pimenta Seca",
        description: "A melhor manteiga.",
        image:
          "./assets/produtos/ManteigariaNacional/manteiga-ghee-noz-moscada-pimenta-seca.webp",
        price: 54.0,
      },
      {
        name: "Manteigaria Nacional Manteiga Ghee com Tamara",
        description: "A melhor manteiga.",
        image:
          "./assets/produtos/ManteigariaNacional/manteiga-ghee-tamara.webp",
        price: 57.0,
      },
      {
        name: "Manteigaria Nacional Manteiga Ghee Tradicional",
        description: "A melhor manteiga.",
        image: "./assets/produtos/ManteigariaNacional/manteiga-ghee.webp",
        price: 48.0,
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
        price: 42.9,
      },
      {
        name: "Manteigaria Nacional Manteiga Jatobá",
        description: "A melhor manteiga.",
        image: "./assets/produtos/ManteigariaNacional/manteiga-jatoba.webp",
        price: 31.9,
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
        price: 63.0,
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
        price: 29.9,
      },
      {
        name: "Tabuleiro Da Chef Farofa da Tereza Branquinha",
        description: "A melhor farofa.",
        image: "./assets/produtos/TabuleiroDaChef/farofa-branquinha.webp",
        price: 29.9,
      },
      {
        name: "Tabuleiro Da Chef Farofa da Tereza Verdinha",
        description: "A melhor farofa.",
        image:
          "./assets/produtos/TabuleiroDaChef/farofa-da-tereza-verdinha.webp",
        price: 29.9,
      },
      {
        name: "Tabuleiro Da Chef Farofa da Tereza Sertaneja",
        description: "A melhor farofa.",
        image: "./assets/produtos/TabuleiroDaChef/farofa-sertaneja.webp",
        price: 29.9,
      },
      {
        name: "Empório Lessa Farofa Crocante",
        description: "A melhor farofa.",
        image: "./assets/produtos/EmporioLessa/farofa-crocante.webp",
        price: 33.0,
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
        description: "Produto indisponível.",
        image:
          "./assets/produtos/LaPopote/pate-de-figado-de-pato-com-geleia-de-cebola.webp",
        price: 0.0,
      },
      {
        name: "LaPopote Patê de Figado de Pato",
        description: "Produto indisponível.",
        image: "./assets/produtos/LaPopote/pate-de-figado-pato.webp",
        price: 0.0,
      },
      {
        name: "LaPopote Patê de Ovas de Tainha",
        description: "O melhor patê.",
        image: "./assets/produtos/LaPopote/pate-de-ovas-de-tainha.webp",
        price: 53.0,
      },
      {
        name: "LaPopote Patê de Pato",
        description: "Produto indisponível.",
        image: "./assets/produtos/LaPopote/pate-de-pato.webp",
        price: 0.0,
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
          "./assets/produtos/MilagreDeMinas/mostarda-com-funghi-sec-220gr.webp",
        price: 44.0,
      },
      {
        name: "Milagre de Minas Caixa com Potes",
        description: "O melhor molho.",
        image:
          "./assets/produtos/MilagreDeMinas/caixa-com-potes-milagre-de-minas.webp",
        price: 63.0,
      },
      {
        name: "Tabuleiro Da Chef Dendê de Tereza",
        description: "A melhor farofa.",
        image: "./assets/produtos/TabuleiroDaChef/dende-de-tereza.webp",
        price: 24.2,
      },
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
        name: "Tabuleiro Da Chef Pimenta de Tereza",
        description: "A melhor pimenta.",
        image: "./assets/produtos/TabuleiroDaChef/pimenta-de-tereza.webp",
        price: 0.0,
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
    Biscoitos: [
      {
        name: "Sabor Gaúcho Biscoito de Rosas Sem adição de Açúcar",
        description: "O melhor Biscoito.",
        image:
          "./assets/produtos/SaborGaucho/biscoito-de-rosas-sem-adicao.webp",
        price: 24.5,
      },
      {
        name: "Sabor Gaúcho Biscoito de Amendoim Sem adição de Açúcar",
        description: "O melhor Biscoito.",
        image:
          "./assets/produtos/SaborGaucho/biscoitos-de-amendoim-sem-adicao.webp",
        price: 24.5,
      },
      {
        name: "Sabor Gaúcho Biscoito de Cacau Sem adição de Açúcar",
        description: "O melhor Biscoito.",
        image:
          "./assets/produtos/SaborGaucho/biscoitos-de-cacau-sem-adicao.webp",
        price: 24.5,
      },
      {
        name: "Sabor Gaúcho Biscoito de Café Sem adição de Açúcar",
        description: "O melhor Biscoito.",
        image:
          "./assets/produtos/SaborGaucho/biscoitos-de-cafe-sem-adicao.webp",
        price: 24.5,
      },
      {
        name: "Sabor Gaúcho Biscoito de Camomila Sem adição de Açúcar",
        description: "O melhor Biscoito.",
        image:
          "./assets/produtos/SaborGaucho/biscoitos-de-camomila-sem-adicao.webp",
        price: 24.5,
      },
      {
        name: "Sabor Gaúcho Biscoito de Lavanda Sem adição de Açúcar",
        description: "O melhor Biscoito.",
        image:
          "./assets/produtos/SaborGaucho/biscoitos-de-lavanda-sem-adicao.webp",
        price: 24.5,
      },
      {
        name: "Sabor Gaúcho Biscoito de Maracujá Sem adição de Açúcar",
        description: "O melhor Biscoito.",
        image:
          "./assets/produtos/SaborGaucho/biscoitos-de-maracuja-sem-adicao.webp",
        price: 24.5,
      },
      {
        name: "Sabor Gaúcho Biscoito de Morango Sem adição de Açúcar",
        description: "O melhor Biscoito.",
        image:
          "./assets/produtos/SaborGaucho/biscoitos-de-morango-sem-adicao.webp",
        price: 24.5,
      },
      {
        name: "Sabor Gaúcho Biscoito de Nozes Sem adição de Açúcar",
        description: "O melhor Biscoito.",
        image:
          "./assets/produtos/SaborGaucho/biscoitos-de-nozes-sem-adicao.webp",
        price: 24.5,
      },
      {
        name: "Sabor Gaúcho Broa de Milho Sem adição de Açúcar",
        description: "O melhor Biscoito.",
        image: "./assets/produtos/SaborGaucho/broa-de-milho-sem-adicao.webp",
        price: 24.5,
      },
      {
        name: "L'apetisse Grissini Alho e Salsa",
        description: "Produto indisponível.",
        image: "./assets/produtos/L'apetisse/grissini-alho-salsa.webp",
        price: 0.0,
      },
      {
        name: "L'apetisse Grissini tradicional",
        description: "Produto indisponível.",
        image: "./assets/produtos/L'apetisse/grissini-tradicional.webp",
        price: 0.0,
      },
      {
        name: "Vermont Torradas Vermont",
        description: "Vermont a melhor Torrada.",
        image: "./assets/produtos/Vermont/torradas-vermont.webp",
        price: 12.0,
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
      }, 6000);
    } else {
      clearInterval(carouselInterval);
    }
  }

  function loadProducts() {
    carousel.innerHTML = "";
    currentCategory.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("card");

      // Verifica se o produto tem preço 0 para mostrar como indisponível
      const isUnavailable = product.price === 0;
      const description = isUnavailable
        ? "Produto indisponível no momento"
        : product.description;
      const priceText = isUnavailable
        ? ""
        : `<p><strong>R$ ${product.price.toFixed(2)}</strong></p>`;

      // Botão "Saiba mais" se tiver descrição longa
      const saibaMaisButton = product.longDescription
        ? `<button class="btn-saiba-mais">Saiba Mais</button>`
        : "";

      card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h4>${product.name}</h4>
      <p>${description}</p>
      ${priceText}
      ${saibaMaisButton}
      <button class="btn-add-cart">${
        isUnavailable ? "Produto Indisponível" : "Adicionar ao Carrinho"
      }</button>
    `;

      // Handler para botão "Saiba mais"
      if (product.longDescription) {
        const saibaMaisBtn = card.querySelector(".btn-saiba-mais");
        if (saibaMaisBtn) {
          saibaMaisBtn.addEventListener("click", () =>
            openProductModal(product)
          );
        }
      }

      // attach handler explicitly and ensure button exists
      const btn =
        card.querySelector(".btn-add-cart") ||
        (() => {
          const b = document.createElement("button");
          b.className = "btn-add-cart";
          b.textContent = isUnavailable
            ? "Produto Indisponível"
            : "Adicionar ao Carrinho";
          card.appendChild(b);
          return b;
        })();

      // Se o produto estiver indisponível, desabilita o botão
      if (isUnavailable) {
        btn.disabled = true;
        btn.style.backgroundColor = "#999";
        btn.style.cursor = "not-allowed";
      } else {
        btn.addEventListener("click", () => addToCart(product));
      }

      // mark button so adjustCardStyles won't rebind unnecessarily
      btn.dataset.bound = "1";

      // Adicionar evento de clique na imagem para abrir o modal
      const img = card.querySelector("img");
      if (img) {
        img.style.cursor = "pointer";
        img.addEventListener("click", () => openProductModal(product));
      }

      carousel.appendChild(card);
    });
    // Apply layout utilities and start behaviors
    enableMobileScroll();
    adjustCardStyles();
    updateCarousel();
    startCarouselLoop();
  }

  function enableMobileScroll() {
    // Make carousel a horizontal flex container always; adapt overflow for mobile
    carousel.style.display = "flex";
    carousel.style.flexWrap = "nowrap";
    carousel.style.gap = "16px";
    carousel.style.alignItems = "stretch";
    carousel.style.padding = "1rem 0";

    if (window.innerWidth <= 480) {
      // Apenas mobile muito pequeno usa scroll
      carousel.style.overflowX = "auto";
      carousel.style.scrollSnapType = "x mandatory";
      carousel.style.webkitOverflowScrolling = "touch";
      carousel.style.scrollBehavior = "smooth";
      carousel.style.transform = "none";
    } else {
      carousel.style.overflowX = "hidden";
      carousel.style.scrollSnapType = "none";
      carousel.style.scrollBehavior = "auto";
    }
  }

  function adjustCardStyles() {
    const cards = carousel.querySelectorAll(".card");
    cards.forEach((card) => {
      // Base layout for each card
      card.style.boxSizing = "border-box";
      card.style.display = "flex";
      card.style.flexDirection = "column";
      card.style.alignItems = "stretch";
      card.style.scrollSnapAlign = "start";
      card.style.flex = "0 0 auto";
      card.style.padding = "12px";
      card.style.margin = "0";
      card.style.minWidth =
        window.innerWidth <= 480
          ? "200px"
          : window.innerWidth <= 768
          ? "240px"
          : "auto";
      card.style.maxWidth =
        window.innerWidth <= 480
          ? "250px"
          : window.innerWidth <= 768
          ? "280px"
          : "100%";
      card.style.borderRadius = card.style.borderRadius || "8px";

      // Ensure image is responsive
      const img = card.querySelector("img");
      if (img) {
        img.style.width = "100%";
        img.style.height = "auto";
        img.style.objectFit = "cover";
        img.style.maxHeight = "180px";
        img.style.borderRadius = "6px";
      }

      // Ensure button exists and is visible
      let btn = card.querySelector("button");
      if (!btn) {
        btn = document.createElement("button");
        btn.textContent = "Adicionar ao Carrinho";
        card.appendChild(btn);
      }
      btn.style.display = "block";
      btn.style.width = "100%";
      btn.style.marginTop = "auto";
      btn.style.padding = "0.6rem 0.8rem";
      btn.style.boxSizing = "border-box";
      btn.style.fontSize = "1rem";

      // Não sobrescreve cursor se o botão estiver desabilitado
      if (!btn.disabled) {
        btn.style.cursor = "pointer";
      }

      // Ensure click handler (if not already attached)
      if (!btn.dataset.bound && !btn.disabled) {
        const productName = card.querySelector("h4")?.textContent || "";
        btn.addEventListener("click", () => {
          // find product by name in currentCategory (fallback)
          const product = currentCategory.find((p) => p.name === productName);
          if (product) addToCart(product);
        });
        btn.dataset.bound = "1";
      }
    });
  }

  loadProducts();
  enableMobileScroll();

  function updateCarousel() {
    const card = carousel.querySelector(".card");
    if (!card || window.innerWidth <= 480) return; // Permite setas em tablets

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
    adjustCardStyles();
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

  // Funcionalidades do Modal de Produto
  const productModal = document.getElementById("product-image-modal");
  const closeProductModal = document.getElementById("close-product-modal");
  const modalProductImage = document.getElementById("modal-product-image");
  const modalProductTitle = document.getElementById("modal-product-title");
  const modalProductDescription = document.getElementById(
    "modal-product-description"
  );
  const modalProductPrice = document.getElementById("modal-product-price");
  const modalAddToCartButton = document.getElementById("modal-add-to-cart");

  let currentModalProduct = null;

  // Função para abrir o modal do produto
  function openProductModal(product) {
    currentModalProduct = product;

    modalProductImage.src = product.image;
    modalProductImage.alt = product.name;
    modalProductTitle.textContent = product.name;

    const isUnavailable = product.price === 0;

    // Usa longDescription se disponível, senão usa description
    const displayDescription = isUnavailable
      ? "Produto indisponível no momento"
      : product.longDescription || product.description;

    modalProductDescription.textContent = displayDescription;

    if (isUnavailable) {
      modalProductPrice.innerHTML = "";
      modalAddToCartButton.textContent = "Produto Indisponível";
      modalAddToCartButton.disabled = true;
    } else {
      modalProductPrice.innerHTML = `<strong>R$ ${product.price.toFixed(
        2
      )}</strong>`;
      modalAddToCartButton.textContent = "Adicionar ao Carrinho";
      modalAddToCartButton.disabled = false;
    }

    productModal.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Previne scroll da página
  }

  // Função para fechar o modal
  function closeProductModalHandler() {
    productModal.classList.add("hidden");
    document.body.style.overflow = "auto"; // Restaura scroll da página
    currentModalProduct = null;
  }

  // Event listeners do modal
  closeProductModal?.addEventListener("click", closeProductModalHandler);

  // Fechar modal clicando no overlay
  productModal?.addEventListener("click", (e) => {
    if (
      e.target === productModal ||
      e.target.classList.contains("product-modal-overlay")
    ) {
      closeProductModalHandler();
    }
  });

  // Fechar modal com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !productModal.classList.contains("hidden")) {
      closeProductModalHandler();
    }
  });

  // Adicionar produto ao carrinho pelo modal
  modalAddToCartButton?.addEventListener("click", () => {
    if (currentModalProduct && !modalAddToCartButton.disabled) {
      addToCart(currentModalProduct);
      closeProductModalHandler();
      showMessage(`${currentModalProduct.name} adicionado ao carrinho!`);
    }
  });

  // Expor função globalmente para uso nos cards
  window.openProductModal = openProductModal;

  // ==================== PRODUTOS EM DESTAQUE ====================

  // Lista de produtos em destaque (até 20 produtos)
  const featuredProductsData = [
    {
      name: "Queijo Minas Artesanal",
      description: "Queijo artesanal de alta qualidade",
      price: 45.9,
      image:
        "./assets/produtos/Cabrissima/queijo-maturado-de-leite-de-cabra-brasilia.webp",
      category: "Queijos",
    },
    {
      name: "Doce de Leite de Ovelha 160g",
      description: "Doce de leite cremoso feito com leite de ovelha.",
      price: 38.5,
      image: "./assets/produtos/CasaBianchi/doce-ovelha-160.webp",
      category: "Doce de Leite",
    },
    {
      name: "Geleia de Frutas Vermelhas sem adição de açúcar",
      description: "Geleia de frutas vermelhas sem adição de açúcar.",
      price: 18.9,
      image:
        "./assets/produtos/Puro&Leve/geleia-de-frutas-vermelhas-sem-adicao.png",
      category: "Geleias",
    },
    {
      name: "Mel Amaze Citrus 200g",
      description: "Mel puro e natural com notas cítricas.",
      price: 35.0,
      image: "./assets/produtos/Amaze/mel-amaze-citrus-200g.webp",
      category: "Mel",
    },
    {
      name: "Doce de Leite Tradicional",
      description: "Doce de leite cremoso",
      price: 22.9,
      image: "./assets/produtos/DoceDeLeite/doce-leite-tradicional.webp",
      category: "DoceDeLeite",
    },
    // Adicione até 20 produtos aqui
  ];

  const featuredCarousel = document.querySelector(".featured-carousel");
  const featuredPrevButton = document.querySelector(".featured-carousel-prev");
  const featuredNextButton = document.querySelector(".featured-carousel-next");

  // Carregar produtos em destaque
  function loadFeaturedProducts() {
    if (!featuredCarousel) return;

    featuredCarousel.innerHTML = "";

    featuredProductsData.forEach((product) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${product.image}" alt="${
        product.name
      }" loading="lazy" onerror="this.src='./assets/placeholder.webp'" />
        <h4>${product.name}</h4>
        <p>${product.description}</p>
        <p><strong>R$ ${product.price.toFixed(2)}</strong></p>
        <button onclick="addToCart({name: '${product.name}', price: ${
        product.price
      }})">
          Adicionar ao Carrinho
        </button>
      `;

      // Adicionar evento de clique na imagem para abrir modal
      const img = card.querySelector("img");
      img.style.cursor = "pointer";
      img.addEventListener("click", () => openProductModal(product));

      featuredCarousel.appendChild(card);
    });
  }

  // Controles do carrossel de destaque
  let featuredCurrentIndex = 0;

  function updateFeaturedCarousel() {
    if (!featuredCarousel) return;

    const cards = featuredCarousel.querySelectorAll(".card");
    if (cards.length === 0) return;

    const card = cards[0];
    const cardWidth = card.offsetWidth;
    const cardStyle = window.getComputedStyle(card);
    const marginRight = parseInt(cardStyle.marginRight) || 0;
    const gap = 24; // 1.5rem

    const scrollAmount = cardWidth + gap + marginRight;

    featuredCarousel.scrollTo({
      left: featuredCurrentIndex * scrollAmount,
      behavior: "smooth",
    });
  }

  function scrollFeaturedCarousel(direction) {
    if (!featuredCarousel) return;

    const cards = featuredCarousel.querySelectorAll(".card");
    if (cards.length === 0) return;

    const containerWidth = featuredCarousel.offsetWidth;
    const card = cards[0];
    const cardWidth = card.offsetWidth;
    const gap = 24;
    const cardsPerView = Math.floor(containerWidth / (cardWidth + gap));

    if (direction === "next") {
      featuredCurrentIndex = Math.min(
        cards.length - cardsPerView,
        featuredCurrentIndex + 1
      );
    } else {
      featuredCurrentIndex = Math.max(0, featuredCurrentIndex - 1);
    }

    updateFeaturedCarousel();
  }

  featuredPrevButton?.addEventListener("click", () => {
    scrollFeaturedCarousel("prev");
  });

  featuredNextButton?.addEventListener("click", () => {
    scrollFeaturedCarousel("next");
  });

  // Carrossel automático para produtos em destaque
  let featuredCarouselInterval;

  function startFeaturedCarouselLoop() {
    if (featuredProductsData.length <= 1 || !featuredCarousel) return;

    clearInterval(featuredCarouselInterval);

    const cards = featuredCarousel.querySelectorAll(".card");
    const containerWidth = featuredCarousel.offsetWidth;
    const cardWidth = cards[0]?.offsetWidth || 280;
    const gap = 24;
    const cardsPerView = Math.floor(containerWidth / (cardWidth + gap)) || 1;
    const maxIndex = Math.max(0, cards.length - cardsPerView);

    featuredCarouselInterval = setInterval(() => {
      if (featuredCurrentIndex >= maxIndex) {
        featuredCurrentIndex = 0;
      } else {
        featuredCurrentIndex++;
      }
      updateFeaturedCarousel();
    }, 6000);
  }

  function resetFeaturedCarouselLoop() {
    clearInterval(featuredCarouselInterval);
    setTimeout(startFeaturedCarouselLoop, 1000);
  }

  // Pausar carrossel ao interagir
  featuredPrevButton?.addEventListener("click", resetFeaturedCarouselLoop);
  featuredNextButton?.addEventListener("click", resetFeaturedCarouselLoop);

  // Reiniciar carrossel ao redimensionar a janela
  window.addEventListener("resize", () => {
    if (featuredCarousel) {
      updateFeaturedCarousel();
      resetFeaturedCarouselLoop();
    }
  });

  // Inicializar produtos em destaque
  loadFeaturedProducts();
  startFeaturedCarouselLoop();
});
