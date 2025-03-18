import { BaseLayer } from '../layer-base';
import { MapBase } from '../map-base';
import { HightlightService } from './highlight-service';

export const hightlightServiceProvider = <
  T extends MapBase,
  K extends BaseLayer,
>(
  mapService: T,
  layerService: K,
) => new HightlightService(mapService.mapLoaded, layerService.graphicsLayer);
