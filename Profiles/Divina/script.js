// Simple animation or interactivity script
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".hero");
  header.style.opacity = 0;
  header.style.transition = "opacity 1.2s ease-in-out";
  setTimeout(() => {
    header.style.opacity = 1;
  }, 200);
});
