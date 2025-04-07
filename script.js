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
  typeWriter("typewriter-h1", "Bem-vindo a Bodegueira Charcutaria & Cia", 100, () => {
    typeWriter("typewriter-h2", "A melhor do Distrito Federal!", 100, () => {
      typeWriter("typewriter-p", "Os melhores produtos que uma bodegaria pode oferecer, não percam nossas melhores ofertas!", 100);
    });
  });
});
