import { HandRenderer, WristTrackPlugin, OccluderMaterial } from "@geenee/bodyrenderers-babylon";
import { CanvasMode } from "@geenee/armature";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { CubeTexture } from "@babylonjs/core/Materials/Textures/cubeTexture";
import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import "@babylonjs/core/Materials/Textures/Loaders/envTextureLoader";
import "@babylonjs/loaders/glTF/2.0";


export class WatchRenderer extends HandRenderer {
    protected aligner: WristTrackPlugin;
    protected model?: TransformNode;
    protected points: TransformNode[] = [];
    protected arrowX?: TransformNode;
    protected arrowY?: TransformNode;

    constructor(
        container: HTMLElement,
        mode?: CanvasMode,
        mirror?: boolean,
        protected url: string | undefined = "watch.glb") {
        super(container, mode, mirror);
        this.aligner = new WristTrackPlugin();
        this.addPlugin(this.aligner);
    }

    async load() {
        const { scene } = this;
        if (this.loaded || !scene)
            return;
        // Lighting
        scene.environmentTexture = new CubeTexture("environment.env", scene);
        const light = new DirectionalLight("directional",
            new Vector3(0.5, 0.5, -2), scene);
        // light.intensity = 0.5;
        // Model
        await this.setModel(this.url);
        return super.load();
    }

    async setModel(url?: string) {
        this.aligner.setNode();
        this.model?.dispose(false, true);
        delete this.model;
        this.url = url;
        if (!this.url)
            return;

        const gltf = await SceneLoader.LoadAssetContainerAsync( "", url, this.scene, undefined, ".glb");

        this.model = gltf.meshes.find((m) => m.id === "__root__");
        if (!this.model)
            return;
        this.aligner.setNode(this.model);
        
        gltf.addAllToScene();

        console.log(gltf)

        const occluders = gltf.meshes.filter((m) => /Body/.test(m.name));

        console.log(occluders)

        occluders.forEach((o) => {
            o.material = new OccluderMaterial("Occluder", this.scene);
        });
    }
}
