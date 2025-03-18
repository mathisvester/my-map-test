import {
  effect,
  inject,
  Injectable,
  Injector,
  OnDestroy,
  signal,
  WritableSignal,
} from '@angular/core';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Handle from '@arcgis/core/core/Handles';
import MapView from '@arcgis/core/views/MapView';
import { MapProps } from '../map-base';

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

  private injector = inject(Injector);

  constructor(mapLoaded: Promise<MapProps>, layer: GraphicsLayer) {
    mapLoaded.then(({ view }) => {
      effect(
        () => {
          const selectedGraphics = this.selectedGraphics();

          view.whenLayerView(layer).then((layerView) => {
            this.highlights.removeAll();

            if (selectedGraphics.length >= 1) {
              this.highlights.add(layerView.highlight(selectedGraphics));
            }
          });
        },
        { injector: this.injector },
      );
    });
  }

  ngOnDestroy(): void {
    this.highlights.destroy();
  }
}
