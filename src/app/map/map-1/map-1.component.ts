import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map1Service } from './map-1.service';

@Component({
  selector: 'app-map-1',
  imports: [],
  template: '<div #viewDiv id="viewDiv"></div>',
  styleUrl: './map-1.component.css',
  providers: [
    Map1Service
  ]
})
export class Map1Component implements AfterViewInit {
  @ViewChild('viewDiv') map: ElementRef<HTMLDivElement> | undefined;
  
  constructor(private map1Service: Map1Service) {}

  ngAfterViewInit(): void {
    if (!this.map?.nativeElement) {
      throw new Error('Please provide a map container.')
    }

    this.map1Service.initalizeMap({ container: this.map.nativeElement });
  }
}
