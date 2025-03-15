import { Component } from '@angular/core';
import { Map1Component } from './map/map-1/map-1.component';
import { Map2Component } from './map/map-2/map-2.component';

@Component({
  selector: 'app-root',
  imports: [Map1Component, Map2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-map-test';
}
