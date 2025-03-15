import { Injectable } from '@angular/core';
import Graphic from '@arcgis/core/Graphic.js';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer.js';
import { BaseLayer } from '../layer-base';

@Injectable()
export class Layer1Service implements BaseLayer {
  pointGraphic = new Graphic({
    attributes: {
      name: 'LA City Hall',
      address: '200 N Spring St, Los Angeles, CA 90012',
    },
    geometry: {
      type: 'point',
      longitude: -118.24354,
      latitude: 34.05389,
    },
    symbol: {
      type: 'simple-marker',
      color: [226, 119, 40],
      outline: {
        color: [255, 255, 255],
        width: 2,
      },
    },
    popupTemplate: {
      title: 'Places in Los Angeles',
      content: [
        {
          type: 'fields',
          fieldInfos: [
            {
              fieldName: 'name',
              label: 'Name',
              visible: true,
            },
            {
              fieldName: 'address',
              label: 'Address',
              visible: true,
            },
          ],
        },
      ],
    },
  });

  graphicsLayer = new GraphicsLayer({
    graphics: [this.pointGraphic],
  });
}
