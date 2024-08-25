import { HandEngine } from "@geenee/bodyprocessors";
import { WatchRenderer } from "./watchrenderer";
import "./index.css";
import { Watchview } from "./WatchViewer";

// Engine
const engine = new HandEngine();
const token =
  location.hostname === "localhost"
    ? "5zUXNTvrFMDtqB0rox5FlQf8Vg1jxtbe"
    : "iV6ssLqhZ4zTG6CXXRa28gNZOwvHje_E";

// Parameters
const urlParams = new URLSearchParams(window.location.search);
let rear = urlParams.has("rear");

async function main() {
  // Renderer
  const container = document.getElementById("root");
  if (!container) return;

  const renderer = new WatchRenderer(container, "crop", !rear, "watch.glb");

  // Initialization
  await Promise.all([
    engine.addRenderer(renderer),
    engine.init({ token: token }),
  ]);

  await engine.setup({ size: { width: 1920, height: 1080 }, rear });
  await engine.start();

}

// Event listener for 'Try On' buttons
document.querySelectorAll(".try-on").forEach((button) => {
  button.addEventListener("click", async function () {
    // Hide other elements
    document.getElementById("watch-container")?.classList.add("hidden");
    document.querySelector("header")?.classList.add("hidden");

    // Show the main element
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.classList.remove("hidden");
      rootElement.style.display = "block";
    }

    // Start the main function
    await main();
  });
});


//  Handle 'View in 3D' buttons 
document.querySelectorAll(".view-3d").forEach((button) => {
    button.addEventListener("click", async function () {
        document.getElementById("watch-container")?.classList.add("hidden");
        document.querySelector("header")?.classList.add("hidden");

        const rootElement = document.getElementById("view-3d");
        if (rootElement) {
          rootElement.classList.remove("hidden");
          rootElement.style.display = "block";
        }
        await Watchview();
    });
});