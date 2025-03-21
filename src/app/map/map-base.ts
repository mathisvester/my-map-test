import ArcGISMap from '@arcgis/core/Map.js';
import MapView from '@arcgis/core/views/MapView.js';

export interface MapProps {
  map: ArcGISMap;
  view: MapView;
}

export interface MapBase {
  map: ArcGISMap | undefined;
  view: MapView | undefined;
  initalizeMap: (params: Pick<MapView, 'container'>) => void;
  mapLoaded: Promise<MapProps>;
}
