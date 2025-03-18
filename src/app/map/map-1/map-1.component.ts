import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map1Service } from './map-1.service';
import { Layer1Service } from '../layers/layer-1.service';
import { Layer2Service } from '../layers/layer-2.service';
import { HightlightService } from './highlight-service';

@Component({
  selector: 'app-map-1',
  imports: [],
  template: `<button (click)="selectOne()">Select</button
    ><button (click)="deselect()">Deselect</button>
    <div #viewDiv id="viewDiv"></div>`,
  styleUrl: './map-1.component.css',
  providers: [Map1Service, Layer1Service, Layer2Service, HightlightService],
})
export class Map1Component implements AfterViewInit {
  @ViewChild('viewDiv') map: ElementRef<HTMLDivElement> | undefined;

  constructor(
    private map1Service: Map1Service,
    private layer1Service: Layer1Service,
    private layer2Service: Layer2Service,
    private hightlightService: HightlightService,
  ) {
    this.map1Service.mapLoaded.then(() => {
      this.map1Service.map?.add(this.layer1Service.graphicsLayer);
      this.map1Service.map?.add(this.layer2Service.graphicsLayer);
    });
  }

  ngAfterViewInit(): void {
    if (!this.map?.nativeElement) {
      throw new Error('Please provide a map container.');
    }

    this.map1Service.initalizeMap({ container: this.map.nativeElement });
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
