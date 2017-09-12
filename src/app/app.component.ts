import { Component } from '@angular/core';
import { MapService } from './service/map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public mapService: MapService) {}
}
