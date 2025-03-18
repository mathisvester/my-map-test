import { Component, ElementRef, ViewChild } from '@angular/core';
import { Map2Service } from './map-2.service';
import { Layer1Service } from '../layers/layer-1.service';
import { hightlightServiceProvider } from '../features/highlight-service.provider';
import { HightlightService } from '../features/highlight-service';

@Component({
  selector: 'app-map-2',
  imports: [],
  template: `<button (click)="selectOne()">Select</button
    ><button (click)="deselect()">Deselect</button>
    <div #viewDiv id="viewDiv"></div>`,
  styleUrl: './map-2.component.css',
  providers: [
    Map2Service,
    Layer1Service,
    {
      provide: HightlightService,
      useFactory: hightlightServiceProvider,
      deps: [Map2Service, Layer1Service],
    },
  ],
})
export class Map2Component {
  @ViewChild('viewDiv') map: ElementRef<HTMLDivElement> | undefined;

  constructor(
    private map2Service: Map2Service,
    private layer1Service: Layer1Service,
    private hightlightService: HightlightService,
  ) {
    this.map2Service.mapLoaded.then(() => {
      this.map2Service.map?.add(this.layer1Service.graphicsLayer);
    });
  }

  ngAfterViewInit(): void {
    if (!this.map?.nativeElement) {
      throw new Error('Please provide a map container.');
    }

    this.map2Service.initalizeMap({ container: this.map.nativeElement });
  }

  selectOne(): void {
    const graphic = this.layer1Service.graphicsLayer.graphics.getItemAt(0);

    if (graphic) {
      this.hightlightService.selectedGraphics.set([graphic]);
    }
  }

  deselect(): void {
    this.hightlightService.selectedGraphics.set([]);
  }
}
