const screens = Array.from(document.querySelectorAll(".screen"));
const navButtons = Array.from(document.querySelectorAll("[data-go]"));
const tabButtons = Array.from(document.querySelectorAll(".tab-bar button"));
const tabBar = document.querySelector(".tab-bar");

const tabVisibleScreens = new Set([
  "screen-matches",
  "screen-map",
  "screen-auth",
  "screen-profile",
]);

function showScreen(screenId) {
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.id === screenId);
  });

  tabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.go === screenId);
  });

  if (tabBar) {
    tabBar.classList.toggle("hidden", !tabVisibleScreens.has(screenId));
  }
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextScreen = button.dataset.go;
    showScreen(nextScreen);
  });
});

showScreen("screen-welcome");
