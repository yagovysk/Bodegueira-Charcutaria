function typeWriter(elementId, text, speed, callback) {
  const element = document.getElementById(elementId);

  // Verifica se o elemento existe antes de prosseguir
  if (!element) {
    console.warn(`Elemento com ID "${elementId}" não encontrado.`);
    if (callback) callback(); // Chama o callback mesmo se o elemento não existir
    return;
  }

  // Limpa o texto antes de começar
  element.innerHTML = ""; // Limpa o conteúdo do elemento

  let i = 0;

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i); // Insere a letra diretamente
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      setTimeout(callback, 1000); // Chama o callback após a digitação
    }
  }

  type();
}

// Função para alternar o menu mobile
function setupMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMobile = document.querySelector(".nav-mobile");

  if (menuToggle && navMobile) {
    menuToggle.addEventListener("click", () => {
      navMobile.classList.toggle("active");
    });
  } else {
    console.warn("Menu mobile ou botão de alternância não encontrado.");
  }
}

// Inicializa o efeito de digitação e o menu mobile
document.addEventListener("DOMContentLoaded", () => {
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

  setupMobileMenu(); // Configura o menu mobile
});
