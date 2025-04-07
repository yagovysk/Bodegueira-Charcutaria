function typeWriter(elementId, text, speed, callback) {
  const element = document.getElementById(elementId);

  // Limpa o texto antes de começar
  element.innerHTML = ""; // Limpa o conteúdo do elemento

  let i = 0;

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i); // Insere a letra diretamente
      i++;
      setTimeout(type, speed);
    } else {
      // Chama o callback após a digitação
      if (callback) {
        setTimeout(callback, 1000);
      }
    }
  }

  type();
}

// Inicia o efeito de digitação para cada elemento
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

  // Alterna o menu mobile
  const menuToggle = document.querySelector(".menu-toggle");
  const navMobile = document.querySelector(".nav-mobile");

  menuToggle.addEventListener("click", () => {
    navMobile.classList.toggle("active");
  });
});
