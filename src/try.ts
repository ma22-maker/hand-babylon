import { HandEngine } from "@geenee/bodyprocessors";
import { WatchRenderer } from "./watchrenderer";
import "./index.css";


const engine = new HandEngine();


const tokenOne: string | undefined = process.env.TOKEN_ONE;
const tokenTwo: string | undefined = process.env.TOKEN_TWO;


const token: string | undefined = location.hostname === "localhost" ? tokenOne : tokenTwo;

const urlParams = new URLSearchParams(window.location.search);
const rear: boolean = urlParams.has("rear");


export async function main(watchModel?: string): Promise<void> {

  const container = document.getElementById("root");
  if (!container) {
    console.error("Root container not found.");
    return;
  }


  const renderer = new WatchRenderer(container, "crop", !rear, watchModel);

  try {
    // Initialize 
    if (!token) {
      throw new Error("Token is not defined.");
    }

    await Promise.all([
      engine.addRenderer(renderer),
      engine.init({ token })
    ]);

    await engine.setup({ size: { width: 1920, height: 1080 }, rear });
    await engine.start();
  } catch (error) {
    console.error("Error initializing the engine:", error);
  }
}


const watchModel = urlParams.get("watch");
if (watchModel) {
  main(watchModel);
}
