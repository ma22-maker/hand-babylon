import "./index.css";

document.querySelectorAll(".try-on").forEach((button) => {
  button.addEventListener("click", async function () {
    const watchModel = (button as HTMLButtonElement).getAttribute("data-watch");
    if (!watchModel) {
      console.error("No watch model found.");
      return;
    }
    // Redirect to try.html with the watch model as a query parameter
    window.location.href = `try.html?watch=${watchModel}`;

  });
});

// Handle 'View in 3D' buttons
document.querySelectorAll(".view-3d").forEach((button) => {
  button.addEventListener("click", async  function () {
    const watchModel = (button as HTMLButtonElement).getAttribute("data-watch");
    if (!watchModel) {
      console.error("No watch model found.");
      return;
    }
    // Redirect to view.html with the watch model as a query parameter
    window.location.href = `view.html?watch=${watchModel}`;

  });
});