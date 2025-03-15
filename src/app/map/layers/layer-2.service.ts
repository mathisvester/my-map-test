import { effect, Injectable } from '@angular/core';
import Graphic from '@arcgis/core/Graphic.js';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer.js';
import { BaseLayer } from '../layer-base';
import MapView from '@arcgis/core/views/MapView.js';
import { Map1Service } from '../map-1/map-1.service';

@Injectable()
export class Layer2Service implements BaseLayer {
  private pointGraphic = new Graphic({
    attributes: {
      name: 'Gloria Molina Grand Park Playground',
      address: '227 N Spring St, Los Angeles, CA 90012',
    },
    geometry: {
      type: 'point',
      longitude: -118.2452282,
      latitude: 34.053718,
    },
    symbol: {
      type: 'simple-marker',
      color: [63, 137, 138],
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

  private _graphicsLayer = new GraphicsLayer({
    graphics: [this.pointGraphic],
  });

  get graphicsLayer() {
    return this._graphicsLayer;
  }

  constructor(private map1Service: Map1Service) {
    effect(() => {
      if (
        this.map1Service.mapLoaded() &&
        this.map1Service.view instanceof MapView
      ) {
        this.map1Service.view.ui.components = ['attribution'];
      }
    });
  }
}
