import { Injectable, signal, WritableSignal } from '@angular/core';
import ArcGISMap from '@arcgis/core/Map.js';
import MapView from '@arcgis/core/views/MapView.js';
import { MapBase } from './map-base';

@Injectable()
export class MapBaseService implements MapBase {
  map: ArcGISMap | undefined;
  view: MapView | undefined;
  mapLoaded = signal(false);

  initalizeMap(params: Pick<MapView, 'container'>): void {
    this.map = new ArcGISMap({
      basemap: 'streets-vector',
    });

    this.view = new MapView({
      map: this.map,
      container: params.container,
      center: [-118.244, 34.052],
      zoom: 12,
    });

    this.view.when(() => {
      this.mapLoaded.set(true);
    });
  }

  destroy(): void {
    this.map?.destroy();
  }
}
