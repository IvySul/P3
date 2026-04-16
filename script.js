const screens = Array.from(document.querySelectorAll(".screen"));
const navButtons = Array.from(document.querySelectorAll("[data-go]"));
const tabButtons = Array.from(document.querySelectorAll(".tab-bar button"));

function showScreen(screenId) {
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.id === screenId);
  });

  tabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.go === screenId);
  });
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextScreen = button.dataset.go;
    showScreen(nextScreen);
  });
});

showScreen("screen-welcome");
