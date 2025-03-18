import { Injectable, OnDestroy, Signal, signal } from '@angular/core';
import ArcGISMap from '@arcgis/core/Map.js';
import MapView from '@arcgis/core/views/MapView.js';
import { MapBase, MapProps } from './map-base';
import { firstValueFrom, Subject, take } from 'rxjs';

@Injectable()
export class MapBaseService implements MapBase, OnDestroy {
  private _map: ArcGISMap | undefined;
  private _view: MapView | undefined;
  private _mapLoaded = new Subject<MapProps>();

  mapLoaded: Promise<MapProps> = firstValueFrom(this._mapLoaded.pipe(take(1)));

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
      if (this._map && this._view) {
        this._mapLoaded.next({ map: this._map, view: this._view });
      }
    });
  }

  ngOnDestroy(): void {
    this._map?.destroy();
  }
}
