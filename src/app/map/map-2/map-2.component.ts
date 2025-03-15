import { Component, ElementRef, ViewChild } from '@angular/core';
import { Map2Service } from './map-2.service';

@Component({
  selector: 'app-map-2',
  imports: [],
  template: '<div #viewDiv id="viewDiv"></div>',
  styleUrl: './map-2.component.css',
  providers: [
    Map2Service
  ]
})
export class Map2Component {
  @ViewChild('viewDiv') map: ElementRef<HTMLDivElement> | undefined;
  
  constructor(private map2Service: Map2Service) {}

  ngAfterViewInit(): void {
    if (!this.map?.nativeElement) {
      throw new Error('Please provide a map container.')
    }

    this.map2Service.initalizeMap({ container: this.map.nativeElement });
  }
}
