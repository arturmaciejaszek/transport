import { Component, OnInit, AfterViewInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { } from 'googlemaps';
import { Request } from './request.model';
import { MapsAPILoader } from '@agm/core';


declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() request: Request;
  @Output() estimateEmitter = new EventEmitter<{distance: number, estimate: number}>();
  lat = 52.40375419463349;
  lng = 16.923773288726807;
  dir = undefined;
  showEstimate = false;
  distance: number;
  rate = 10;
  estimate: number;

  constructor(private mapsApi: MapsAPILoader) {}

  extractKm(string: string) {
      return string.match(/\d+/)[0];
  }

  ngOnInit() {
  }

  renderMap() {
    if (this.request.origin !== undefined && this.request.destination !== undefined) {
      this.dir = this.request;
      this.mapsApi.load().then(() => {
      const dService = new google.maps.DirectionsService();
      dService.route( this.request, ( response, status) => {
        if (status === 'OK') {
          this.showEstimate = true;
          this.distance = 0;
          response.routes[0].legs.forEach( res => {
            this.distance += +this.extractKm(res.distance.text);
            this.estimate = this.distance * this.rate * 1.05 * 2;
            this.estimateEmitter.emit({distance: this.distance, estimate: this.estimate});
          });
        }
      });
    }
    );
    }
  }

  ngAfterViewInit() {
    this.renderMap();
  }

  ngOnChanges() {
    this.renderMap();
  }


}
