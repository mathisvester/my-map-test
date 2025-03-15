import { Component } from '@angular/core';
import { Map1Component } from '../map-1/map-1.component';
import { Map2Component } from '../map-2/map-2.component';

@Component({
  selector: 'app-map',
  imports: [Map1Component, Map2Component],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {}
