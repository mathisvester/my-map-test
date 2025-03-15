import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer.js';

export abstract class BaseLayer {
  graphicsLayer: GraphicsLayer | undefined;
}
