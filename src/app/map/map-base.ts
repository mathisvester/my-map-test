import { WritableSignal } from '@angular/core';
import ArcGISMap from '@arcgis/core/Map.js';
import MapView from '@arcgis/core/views/MapView.js';

// todo: properties shouldn't be undefined
export abstract class MapBase {
  abstract map: ArcGISMap | undefined;
  abstract view: MapView | undefined;
  abstract initalizeMap: (params: Pick<MapView, 'container'>) => void;
  abstract destroy: () => void;
  abstract mapLoaded: WritableSignal<boolean>; // todo: should be readonly outside class
}
