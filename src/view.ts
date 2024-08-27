import { Watchview } from './watchviewer';  
// import "./index.css";


document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const watchModel = urlParams.get("watch");

  if (watchModel) {
    await Watchview(watchModel);
  } else {
    console.error("No watch model provided.");
  }
});
