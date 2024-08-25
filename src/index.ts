import { HandEngine } from "@geenee/bodyprocessors";
import { WatchRenderer } from "./watchrenderer";
import "./index.css";
import { Watchview } from "./WatchViewer";

// Engine
const engine = new HandEngine();
const token: string =
  location.hostname === "localhost"
    ? "5zUXNTvrFMDtqB0rox5FlQf8Vg1jxtbe"
    : "iV6ssLqhZ4zTG6CXXRa28gNZOwvHje_E";

// Parameters
const urlParams = new URLSearchParams(window.location.search);
const rear: boolean = urlParams.has("rear");

async function main(watchModel?: string): Promise<void> {
  // Renderer
  const container = document.getElementById("root");
  if (!container) {
    console.error("Root container not found.");
    return;
  }

  const renderer = new WatchRenderer(container, "crop", !rear, watchModel);

  try {
    // Initialization
    await Promise.all([
      engine.addRenderer(renderer),
      engine.init({ token }),
    ]);

    await engine.setup({ size: { width: 1920, height: 1080 }, rear });
    await engine.start();
  } catch (error) {
    console.error("Error initializing the engine:", error);
  }
}

// Event listener for 'Try On' buttons
document.querySelectorAll(".try-on").forEach((button) => {
  button.addEventListener("click", async function () {
    const watchModel = (button as HTMLButtonElement).getAttribute("data-watch");
    if (!watchModel) {
      console.error("No watch model found.");
      return;
    }

    // Hide other elements
    const watchContainer = document.getElementById("watch-container");
    const header = document.querySelector("header");
    const rootElement = document.getElementById("root");

    if (watchContainer) watchContainer.classList.add("hidden");
    if (header) header.classList.add("hidden");
    if (rootElement) {
      rootElement.classList.remove("hidden");
      rootElement.style.display = "block";
    }

    // Start the main function
    await main(watchModel);
  });
});

// Handle 'View in 3D' buttons
document.querySelectorAll(".view-3d").forEach((button) => {
  button.addEventListener("click", async function () {
    const watchModel = (button as HTMLButtonElement).getAttribute("data-watch");
    if (!watchModel) {
      console.error("No watch model found.");
      return;
    }

    const watchContainer = document.getElementById("watch-container");
    const header = document.querySelector("header");
    const view3DElement = document.getElementById("view-3d");

    if (watchContainer) watchContainer.classList.add("hidden");
    if (header) header.classList.add("hidden");
    if (view3DElement) {
      view3DElement.classList.remove("hidden");
      view3DElement.style.display = "block";
    }

    try {
      await Watchview(watchModel);
    } catch (error) {
      console.error("Error displaying watch view:", error);
    }
  });
});
