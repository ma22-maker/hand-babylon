import * as BABYLON from '@babylonjs/core';
import "@babylonjs/loaders/glTF/2.0";

export async function Watchview(watchModel) {
  const container = document.getElementById('view-3d');
  if (!container) return;

  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  const engine = new BABYLON.Engine(canvas, true);
  const scene = new BABYLON.Scene(engine);

  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;

  const camera = new BABYLON.ArcRotateCamera('camera', Math.PI / 2, Math.PI / 4, 5, BABYLON.Vector3.Zero(), scene);
  camera.attachControl(canvas, true);

  new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

  try {
    await BABYLON.SceneLoader.AppendAsync('', watchModel, scene);
    
    // Scale the loaded model
    scene.meshes.forEach(mesh => {
      if (mesh.name !== 'camera' && mesh.name !== 'light') {
        mesh.scaling = new BABYLON.Vector3(4, 4, 4); // Adjust the scaling factor as needed
      }
    });
  } catch (error) {
    console.error('Failed to load the 3D model:', error);
  }

  engine.runRenderLoop(() => scene.render());

  window.addEventListener('resize', () => {
    engine.resize();
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  });
}
