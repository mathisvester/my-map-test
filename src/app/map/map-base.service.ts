import { Injectable, OnDestroy, Signal, signal } from '@angular/core';
import ArcGISMap from '@arcgis/core/Map.js';
import MapView from '@arcgis/core/views/MapView.js';
import { MapBase } from './map-base';

@Injectable()
export class MapBaseService implements MapBase, OnDestroy {
  private _map: ArcGISMap | undefined;
  private _view: MapView | undefined;
  private _mapLoaded = signal(false);

  get mapLoaded() {
    return this._mapLoaded.asReadonly();
  }

  get map() {
    return this._map;
  }

  get view() {
    return this._view;
  }

  initalizeMap(params: Pick<MapView, 'container'>): void {
    this._map = new ArcGISMap({
      basemap: 'streets-vector',
    });

    this._view = new MapView({
      map: this._map,
      container: params.container,
      center: [-118.244, 34.052],
      zoom: 12,
    });

    this._view.when(() => {
      this._mapLoaded.set(true);
    });
  }

  ngOnDestroy(): void {
    this._map?.destroy();
  }
}
