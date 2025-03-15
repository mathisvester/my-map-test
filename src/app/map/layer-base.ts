import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer.js';

export interface BaseLayer {
  graphicsLayer: GraphicsLayer | undefined;
}
