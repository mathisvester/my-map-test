import { Injectable, signal, WritableSignal } from "@angular/core";
import ArcGISMap from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";

export abstract class MapBase {
    abstract map: ArcGISMap | undefined;
    abstract view: MapView | undefined;
    abstract initalizeMap: (params: Pick<MapView, "container">) => void;
    abstract destroy: () => void;
    abstract mapLoaded: WritableSignal<boolean>; // todo: should be readonly outside class
}

@Injectable()
export class MapBaseService implements MapBase {
    map: ArcGISMap | undefined;
    view: MapView | undefined;
    mapLoaded = signal(false);

    initalizeMap(params: Pick<MapView, "container">): void {
        this.map = new ArcGISMap({
            basemap: "streets-vector"
        });
        
        this.view = new MapView({
            map: this.map,
            container: params.container,
            center: [-118.244, 34.052],
            zoom: 12
        });

        this.view.when(() => {
            this.mapLoaded.set(true);
        });
    }

    destroy(): void {
        this.map?.destroy();
    }
}