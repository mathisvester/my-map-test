import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Map1Service } from './map-1.service';
import { Layer1Service } from '../layers/layer-1.service';
import { Layer2Service } from '../layers/layer-2.service';

@Component({
  selector: 'app-map-1',
  imports: [],
  template: '<div #viewDiv id="viewDiv"></div>',
  styleUrl: './map-1.component.css',
  providers: [Map1Service, Layer1Service, Layer2Service],
})
export class Map1Component implements AfterViewInit {
  @ViewChild('viewDiv') map: ElementRef<HTMLDivElement> | undefined;

  constructor(
    private map1Service: Map1Service,
    private layer1Service: Layer1Service,
    private layer2Service: Layer2Service,
  ) {
    effect(() => {
      if (this.map1Service.mapLoaded()) {
        this.map1Service.map?.add(this.layer1Service.graphicsLayer);
        this.map1Service.map?.add(this.layer2Service.graphicsLayer);
      }
    });
  }

  ngAfterViewInit(): void {
    if (!this.map?.nativeElement) {
      throw new Error('Please provide a map container.');
    }

    this.map1Service.initalizeMap({ container: this.map.nativeElement });
  }
}
