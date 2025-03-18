import {
  effect,
  Injectable,
  Injector,
  OnDestroy,
  signal,
  WritableSignal,
} from '@angular/core';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Handle from '@arcgis/core/core/Handles';
import { Map1Service } from './map-1.service';
import { Layer1Service } from '../layers/layer-1.service';

interface Place {
  name: string;
  coords: {
    longitude: number;
    latitude: number;
  };
}

class DataService<T> {
  entities = signal<T[]>([]);
}

class LayerService {
  layer = new GraphicsLayer();

  constructor(dataService: DataService<Place>) {
    effect(() => {
      const graphics = dataService.entities().map(() => new Graphic());
      this.layer.removeAll();
      this.layer.addMany(graphics);
    });
  }
}

@Injectable()
export class HightlightService implements OnDestroy {
  selectedGraphics: WritableSignal<Graphic[]> = signal([]);
  highlights = new Handle();

  constructor(
    map1Service: Map1Service,
    layer1Service: Layer1Service,
    injector: Injector,
  ) {
    map1Service.mapLoaded.then(() => {
      effect(
        () => {
          const selectedGraphics = this.selectedGraphics();

          map1Service.view
            ?.whenLayerView(layer1Service.graphicsLayer)
            .then((layerView) => {
              this.highlights.removeAll();

              if (selectedGraphics.length >= 1) {
                this.highlights.add(layerView.highlight(selectedGraphics));
              }
            });
        },
        { injector },
      );
    });
  }

  ngOnDestroy(): void {
    this.highlights.destroy();
  }
}
