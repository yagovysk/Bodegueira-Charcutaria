// Função de efeito de digitação utilizando requestAnimationFrame
function typeWriter(elementId, text, speed, callback) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`Elemento com ID "${elementId}" não encontrado.`);
    if (callback) callback();
    return;
  }

  element.textContent = ""; // Usando textContent para melhor performance
  let i = 0;
  let lastTime = performance.now();

  function type(currentTime) {
    if (currentTime - lastTime >= speed) {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        lastTime = currentTime;
      } else {
        if (callback) {
          setTimeout(callback, 1000); // Callback com um pequeno delay
        }
        return; // Termina a animação
      }
    }
    requestAnimationFrame(type);
  }
  requestAnimationFrame(type);
}

// Configuração do menu mobile e inicialização do efeito de digitação
document.addEventListener("DOMContentLoaded", () => {
  // Seleciona os elementos do menu
  const menuToggle = document.querySelector(".menu-toggle");
  const menuClose = document.querySelector(".menu-close");
  const navMobile = document.querySelector(".nav-mobile");

  // Configura eventos do menu mobile
  if (menuToggle && menuClose && navMobile) {
    menuToggle.addEventListener("click", () => {
      navMobile.classList.add("active");
    });
    menuClose.addEventListener("click", () => {
      navMobile.classList.remove("active");
    });
  } else {
    console.warn("Menu mobile ou botões de alternância não encontrados.");
  }

  // Inicializa o efeito de digitação encadeado
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

  const categories = {
    DoceDeLeite: [
      {
        name: "Doce de Leite de Ovelha 160g",
        description: "Nosso campeão de vendas!",
        image: "./assets/produtos/DoceDeLeiteDeOvelha/doce-ovelha-160.png",
      },
      {
        name: "Doce de Leite de Ovelha 260g",
        description: "Nosso campeão de vendas!.",
        image: "./assets/produtos/DoceDeLeiteDeOvelha/doce-ovelha-260.webp",
      },
    ],
    Licores: [
      {
        name: "Licor de Doce de leite de ovelha com Pistache 250ml",
        description:
          "O melhor sabor de licor com doce de leite de ovelha e pistache.",
        image: "./assets/produtos/Licor/licor-com-pistache-250ml.webp",
      },
      {
        name: "Licor de Creme de Doce de Leite de Ovelha 250ml",
        description:
          "O melhor sabor de licor creme de doce de leite de ovelha.",
        image: "./assets/produtos/licor/licor-creme-doce-ovelha-250ml.webp",
      },
    ],
    Torrones: [
      {
        name: "Torrone com Amendoas",
        description: "O melhor torrone está aqui com amendoas.",
        image: "./assets/produtos/Torrones/torrone-amendoas.jpg",
      },
      {
        name: "Torrone com",
        description: "Torrone clássico com cream cheese.",
        image: "./assets/bolo-red-velvet.jpg",
      },
    ],
  };

  const dropdownButton = document.querySelector(".dropdown-button");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const carousel = document.querySelector(".carousel");
  const prevButton = document.querySelector(".carousel-prev");
  const nextButton = document.querySelector(".carousel-next");

  let currentCategory = [];
  let currentIndex = 0;

  // Exibe/oculta o menu dropdown
  dropdownButton.addEventListener("click", () => {
    dropdownMenu.style.display =
      dropdownMenu.style.display === "block" ? "none" : "block";
  });

  // Carrega os produtos ao clicar em uma categoria
  dropdownMenu.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      const category = e.target.getAttribute("data-category");
      currentCategory = categories[category];
      currentIndex = 0;
      loadProducts();
      dropdownMenu.style.display = "none";
      dropdownButton.textContent = e.target.textContent;
    }
  });

  // Carrega os produtos no carrossel
  function loadProducts() {
    carousel.innerHTML = "";
    currentCategory.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h4>${product.name}</h4>
        <p>${product.description}</p>
      `;
      carousel.appendChild(card);
    });
    updateCarousel();
  }

  // Atualiza a posição do carrossel
  function updateCarousel() {
    const offset = currentIndex * -300; // Largura de cada card
    carousel.style.transform = `translateX(${offset}px)`;
  }

  // Navegação do carrossel
  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentIndex < currentCategory.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });
});
